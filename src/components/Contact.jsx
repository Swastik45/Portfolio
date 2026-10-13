import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, Github, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('psamarpaudel@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  const handleSend = async (e) => {
    e.preventDefault()

    if (isSending) return

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error_fields')
      return
    }

    if (!validateEmail(formData.email)) {
      setStatus('error_email')
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn('Missing EmailJS environment configuration')
      setStatus('error_config')
      return
    }

    setIsSending(true)
    setStatus(null)

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || 'Portfolio Inquiry',
      message: formData.message
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error_send')
    }

    setIsSending(false)
  }

  return (
    <section id="contact" className="py-20 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            04 / Contact
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Get in Touch
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-xl">
            Have an engineering role, contract project, or technical question? Reach out directly.
          </p>
        </div>

        {/* Widescreen 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Channels (5 cols on Desktop) */}
          <div className="lg:col-span-5 space-y-3 font-mono text-xs">
            
            {/* Email Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Email</span>
                <a
                  href="mailto:psamarpaudel@gmail.com"
                  className="text-sm text-zinc-200 hover:text-white transition-colors block font-sans font-medium"
                >
                  psamarpaudel@gmail.com
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-1">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Phone / WhatsApp</span>
              <a
                href="tel:+9779767929476"
                className="text-sm text-zinc-200 hover:text-white transition-colors block font-sans font-medium"
              >
                +977 976-7929476
              </a>
            </div>

            {/* Location Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-1">
              <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">Location</span>
              <p className="text-sm text-zinc-200 font-sans font-medium">
                Kathmandu, Nepal
              </p>
            </div>

            {/* GitHub Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider block">GitHub</span>
                <a
                  href="https://github.com/Swastik45"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-200 hover:text-white transition-colors block font-sans font-medium"
                >
                  github.com/Swastik45
                </a>
              </div>
              <a
                href="https://github.com/Swastik45"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Minimalist Message Form (7 cols on Desktop) */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-7 shadow-xl">
            <h3 className="text-base font-bold text-zinc-100 tracking-tight mb-5">
              Send a Message
            </h3>

            <form onSubmit={handleSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  placeholder="Role inquiry / Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Share details about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {isSending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Toast states */}
              {status === 'success' && (
                <div className="p-3 rounded-lg bg-zinc-900 border border-emerald-800/80 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message sent successfully. I will get back to you shortly.</span>
                </div>
              )}

              {status === 'error_fields' && (
                <div className="p-3 rounded-lg bg-zinc-900 border border-red-800/80 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Please fill in your name, email, and message.</span>
                </div>
              )}

              {status === 'error_email' && (
                <div className="p-3 rounded-lg bg-zinc-900 border border-red-800/80 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Please provide a valid email address.</span>
                </div>
              )}

              {status === 'error_send' && (
                <div className="p-3 rounded-lg bg-zinc-900 border border-red-800/80 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Failed to send. Please reach out directly at psamarpaudel@gmail.com</span>
                </div>
              )}

            </form>
          </div>

        </div>

      </div>
    </section>
  )
}