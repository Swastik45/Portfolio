import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle2, AlertCircle, Copy, Check, Mail as MailIcon, Sparkles } from 'lucide-react'
import { soundFX } from '../soundEffects'

const TEMPLATES = [
  {
    label: '💼 Full-Time Role',
    subject: 'Senior Engineering Role Opportunity',
    message: 'Hi Swastik,\n\nWe came across your portfolio and prepNep engineering work. We are currently looking for a Senior / Full-Stack Engineer and would love to connect for a conversation.'
  },
  {
    label: '🚀 Contract Project',
    subject: 'High-Impact Contract Project Inquiry',
    message: 'Hi Swastik,\n\nI have a project requiring robust systems and web architecture. I would like to discuss scope, timeline, and availability.'
  },
  {
    label: '💡 Technical Query',
    subject: 'Question on prepNep Architecture / Rust',
    message: 'Hi Swastik,\n\nI was reviewing your prepNep test engine and Rust projects on your portfolio and wanted to reach out regarding your technical setup.'
  }
]

export default function MailApp() {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('swastik_mail_draft')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.debug('localStorage error:', e)
    }
    return { name: '', email: '', subject: '', message: '' }
  })

  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Auto-save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swastik_mail_draft', JSON.stringify(formData))
    } catch (e) {
      console.debug('localStorage error:', e)
    }
  }, [formData])

  const handleCopy = () => {
    navigator.clipboard.writeText('psamarpaudel@gmail.com')
    setCopiedEmail(true)
    soundFX.play('click')
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const applyTemplate = (tpl) => {
    soundFX.play('click')
    setFormData((prev) => ({
      ...prev,
      subject: tpl.subject,
      message: tpl.message
    }))
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

    soundFX.play('click')

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      window.location.href = `mailto:psamarpaudel@gmail.com?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(formData.message)}`
      setStatus('success')
      try { localStorage.removeItem('swastik_mail_draft'); } catch (err) { console.debug(err); }
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
      setFormData({ name: '', email: '', subject: '', message: '' })
      try { localStorage.removeItem('swastik_mail_draft'); } catch (err) { console.debug(err); }
      soundFX.play('open')
    } catch (err) {
      console.error('EmailJS send error:', err)
      setStatus('error_send')
    }

    setIsSending(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#181824] text-[#dcd7ba]">
      {/* Top Header */}
      <div className="p-3 bg-[#20202e] border-b border-white/10 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <MailIcon className="w-4 h-4 text-[#7dbdf7]" />
          <span className="font-bold text-white">Compose Mail</span>
          <span className="text-[#938aa9] text-[11px] hidden sm:inline">&bull; To: psamarpaudel@gmail.com</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors text-[11px] cursor-pointer"
        >
          {copiedEmail ? <Check className="w-3 h-3 text-[#76946a]" /> : <Copy className="w-3 h-3" />}
          <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
        </button>
      </div>

      {/* Main Mail Form */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {/* Quick Templates */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#dca561]" /> Templates:
          </span>
          {TEMPLATES.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyTemplate(t)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-colors shrink-0 whitespace-nowrap cursor-pointer"
            >
              {t.label}
            </button>
          ))}
        </div>

        {status === 'success' && (
          <div className="p-3.5 rounded-xl bg-[#76946a]/20 border border-[#76946a]/30 text-white flex items-center gap-2.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#76946a] shrink-0" />
            <span>Message dispatched successfully! Swastik will review and reply promptly.</span>
          </div>
        )}

        {status === 'error_fields' && (
          <div className="p-3.5 rounded-xl bg-[#e46876]/20 border border-[#e46876]/30 text-white flex items-center gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-[#e46876] shrink-0" />
            <span>Please provide your name, valid email address, and a message.</span>
          </div>
        )}

        {status === 'error_email' && (
          <div className="p-3.5 rounded-xl bg-[#e46876]/20 border border-[#e46876]/30 text-white flex items-center gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-[#e46876] shrink-0" />
            <span>Please enter a valid email address.</span>
          </div>
        )}

        {status === 'error_send' && (
          <div className="p-3.5 rounded-xl bg-[#e46876]/20 border border-[#e46876]/30 text-white flex items-center gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-[#e46876] shrink-0" />
            <span>Transmission error. You can directly write to psamarpaudel@gmail.com</span>
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-3 text-xs">
          {/* To Field */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="font-mono text-[#938aa9] w-14 shrink-0">To:</span>
            <span className="text-white font-medium">Swastik Paudel &lt;psamarpaudel@gmail.com&gt;</span>
          </div>

          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="font-mono text-[#938aa9] w-14 shrink-0">From:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="font-mono text-[#938aa9] w-14 shrink-0">Email:</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="font-mono text-[#938aa9] w-14 shrink-0">Subject:</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Engineering Opportunity / Collaboration"
              className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          {/* Message Area */}
          <div className="space-y-1">
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#7e9cd8] resize-none leading-relaxed"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#938aa9]">
              Draft saved locally &bull; Kathmandu (UTC+5:45)
            </span>

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2e6edd] hover:bg-[#255bc0] disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-lg cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
            </button>
          </div>
        </form>

        {/* Direct Channels */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
            <span className="text-white/40 block">Phone / WhatsApp</span>
            <a href="tel:+9779767929476" className="text-white hover:text-[#7e9cd8]">
              +977 976-7929476
            </a>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
            <span className="text-white/40 block">Location</span>
            <span className="text-white">Kathmandu, Nepal</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
            <span className="text-white/40 block">GitHub</span>
            <a href="https://github.com/Swastik45" target="_blank" rel="noopener noreferrer" className="text-[#7e9cd8] hover:underline">
              github.com/Swastik45
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
