import { createHash } from 'node:crypto'
import { isIP } from 'node:net'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import nodemailer from 'nodemailer'

const MAX_BODY_BYTES = 10 * 1024
const MAX_NAME_LENGTH = 100
const MAX_SUBJECT_LENGTH = 120
const MAX_MESSAGE_LENGTH = 5000

const sendJson = (res, status, payload) => {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const getAllowedOrigins = () =>
  (process.env.CONTACT_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

const getRateLimiter = () => {
  const redis = Redis.fromEnv()
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: false,
    prefix: 'portfolio-contact'
  })
}

const parseBody = (body) => {
  if (typeof body === 'string') return JSON.parse(body)
  return body
}

const cleanSingleLine = (value) =>
  value.trim().replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return sendJson(res, 405, { error: 'method_not_allowed' })
  }

  const gmailUser = process.env.CONTACT_GMAIL_USER
  const gmailAppPassword = process.env.CONTACT_GMAIL_APP_PASSWORD
  const recipient = process.env.CONTACT_TO_EMAIL
  const allowedOrigins = getAllowedOrigins()

  if (
    !gmailUser ||
    !gmailAppPassword ||
    !recipient ||
    allowedOrigins.length === 0 ||
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    console.error('Contact API is missing required Gmail, rate-limit, or origin configuration')
    return sendJson(res, 503, { error: 'contact_service_unavailable' })
  }

  const origin = req.headers.origin
  if (!origin || !allowedOrigins.includes(origin)) {
    return sendJson(res, 403, { error: 'origin_not_allowed' })
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return sendJson(res, 413, { error: 'request_too_large' })
  }

  let body
  try {
    body = parseBody(req.body)
  } catch {
    return sendJson(res, 400, { error: 'invalid_request' })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return sendJson(res, 400, { error: 'invalid_request' })
  }

  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES) {
    return sendJson(res, 413, { error: 'request_too_large' })
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return sendJson(res, 400, { error: 'invalid_request' })
  }

  if (
    typeof body.name !== 'string' ||
    typeof body.email !== 'string' ||
    typeof body.subject !== 'string' ||
    typeof body.message !== 'string'
  ) {
    return sendJson(res, 400, { error: 'invalid_request' })
  }

  const name = cleanSingleLine(body.name)
  const email = body.email.trim()
  const subject = cleanSingleLine(body.subject)
  const message = body.message.trim()

  if (
    !name ||
    name.length > MAX_NAME_LENGTH ||
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    subject.length > MAX_SUBJECT_LENGTH ||
    !message ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return sendJson(res, 400, { error: 'invalid_request' })
  }

  const forwardedFor = req.headers['x-forwarded-for']
  const ip = typeof forwardedFor === 'string'
    ? forwardedFor.split(',').pop().trim()
    : req.headers['x-real-ip']

  if (typeof ip !== 'string' || !isIP(ip)) {
    console.error('Contact API could not identify the request IP for rate limiting')
    return sendJson(res, 503, { error: 'contact_service_unavailable' })
  }

  const rateLimitKey = createHash('sha256').update(ip).digest('hex')

  let rateLimiter
  try {
    rateLimiter = getRateLimiter()
  } catch (error) {
    console.error('Contact API rate limiter configuration failed', error)
    return sendJson(res, 503, { error: 'contact_service_unavailable' })
  }

  let limit
  try {
    limit = await rateLimiter.limit(rateLimitKey)
  } catch (error) {
    console.error('Contact API rate limiter request failed', error)
    return sendJson(res, 503, { error: 'contact_service_unavailable' })
  }

  if (!limit.success) {
    res.setHeader('Retry-After', String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000))))
    return sendJson(res, 429, { error: 'rate_limit_exceeded' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword.replace(/\s/g, '')
    }
  })

  try {
    await transporter.sendMail({
      from: {
        name: 'Swastik Portfolio',
        address: gmailUser
      },
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact: ${subject || 'New message'}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  } catch (error) {
    console.error('Contact email delivery failed', {
      code: error.code,
      responseCode: error.responseCode
    })
    return sendJson(res, 502, { error: 'message_delivery_failed' })
  }

  return sendJson(res, 202, { status: 'accepted' })
}
