export async function sendContactMessage({ name, email, subject, message, website = '' }) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message, website })
  })

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error('The contact service returned an invalid response.')
  }

  if (!result || typeof result !== 'object') {
    throw new Error('The contact service returned an invalid response.')
  }

  if (!response.ok) {
    const error = new Error(typeof result.error === 'string' ? result.error : 'message_delivery_failed')
    error.status = response.status
    throw error
  }

  return result
}
