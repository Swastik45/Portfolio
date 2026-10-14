import React, { useState, useEffect } from 'react'
import { Send, CheckCircle2, AlertCircle, Copy, Check, Mail as MailIcon, Sparkles, FileText } from 'lucide-react'
import { soundFX } from '../soundEffects'
import { sendContactMessage } from '../../../lib/contactApi'

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
  const [activeFolder, setActiveFolder] = useState('compose')
  const [sentMessages, setSentMessages] = useState([])
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
  const [website, setWebsite] = useState('')
  const [draftSaveError, setDraftSaveError] = useState(false)
  const hasDraft = Object.values(formData).some((value) => value.trim())

  // Auto-save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swastik_mail_draft', JSON.stringify(formData))
      setDraftSaveError(false)
    } catch (e) {
      console.error('Unable to save the mail draft locally:', e)
      setDraftSaveError(true)
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

    setIsSending(true)
    setStatus(null)

    try {
      await sendContactMessage({ ...formData, website })
      setSentMessages((messages) => [{
        subject: formData.subject.trim() || '(no subject)',
        sentAt: new Date().toISOString()
      }, ...messages])
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setWebsite('')
      try { localStorage.removeItem('swastik_mail_draft'); } catch (err) { console.debug(err); }
      soundFX.play('open')
    } catch (error) {
      console.error('Mail app submission failed:', error)
      setStatus(error.status === 429 ? 'error_rate_limit' : error.status === 503 ? 'error_config' : 'error_send')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#111820] text-[#e8edf3]">
      {/* Top Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[#303b48] bg-[#1a232d] p-3 text-xs">
        <div className="flex items-center gap-2">
          <MailIcon className="w-4 h-4 text-[#7dbdf7]" />
          <span className="font-bold text-[#e8edf3]">{activeFolder === 'compose' ? 'New message' : activeFolder}</span>
          {activeFolder === 'compose' && <span className="hidden text-[11px] text-[#91a0b1] sm:inline">&bull; To: psamarpaudel@gmail.com</span>}
        </div>
        <div className="flex items-center gap-2">
          {activeFolder !== 'compose' && <button type="button" onClick={() => { setActiveFolder('compose'); setStatus(null) }} className="rounded-md bg-[#2878d0] px-2.5 py-1.5 text-[10px] font-medium text-white hover:bg-[#1f67b8]">New message</button>}
          <button type="button" onClick={handleCopy} className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] text-[#b6c2ce] transition-colors hover:bg-[#2a3745]">
            {copiedEmail ? <Check className="h-3 w-3 text-[#368254]" /> : <Copy className="h-3 w-3" />}
            <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
          </button>
        </div>
      </div>

      <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-[#303b48] bg-[#151e27] px-2 py-1 sm:hidden" aria-label="Mail folders">
        {['inbox', 'drafts', 'sent', 'compose'].map((folder) => (
          <button key={folder} type="button" onClick={() => { setActiveFolder(folder); setStatus(null) }} className={`rounded-md px-3 py-1.5 text-[10px] capitalize ${activeFolder === folder ? 'bg-[#17324d] font-medium text-[#8bc4ff]' : 'text-[#a9b6c5]'}`}>
            {folder === 'compose' ? 'New message' : folder}
          </button>
        ))}
      </nav>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-40 shrink-0 border-r border-[#303b48] bg-[#151e27] p-3 sm:block" aria-label="Mail folders">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#202b35] p-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2878d0] text-[10px] font-bold text-white">SP</span>
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-semibold text-[#e8edf3]">Swastik Paudel</span>
              <span className="block truncate text-[9px] text-[#91a0b1]">Personal mailbox</span>
            </span>
          </div>
          <div className="space-y-1 text-[11px]">
            {[
              { id: 'inbox', label: 'Inbox', Icon: MailIcon },
              { id: 'drafts', label: 'Drafts', Icon: FileText },
              { id: 'sent', label: 'Sent', Icon: Send },
              { id: 'compose', label: 'New message', Icon: Sparkles },
            ].map(({ id, label, Icon }) => (
              <button key={id} type="button" onClick={() => { setActiveFolder(id); setStatus(null) }} aria-current={activeFolder === id ? 'page' : undefined} className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left ${activeFolder === id ? 'bg-[#17324d] font-medium text-[#8bc4ff]' : 'text-[#b6c2ce] hover:bg-[#222e3a]'}`}>
                {React.createElement(Icon, { className: 'h-3.5 w-3.5' })} {label}
                {id === 'drafts' && hasDraft && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#d99a34]" aria-label="Draft available" />}
              </button>
            ))}
          </div>
          <div className="mt-4 border-t border-[#303b48] pt-3 text-[9px] leading-relaxed text-[#91a0b1]">
            Messages are sent directly to Swastik. Drafts are saved in this browser when storage is available.
          </div>
        </aside>

      {/* Main Mail Form */}
      <div className="min-w-0 flex-1 space-y-4 overflow-y-auto bg-[#111820] p-4 sm:p-6">
        {activeFolder === 'compose' ? (
          <>
        {/* Quick Templates */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#91a0b1]">
            <Sparkles className="h-3 w-3 text-[#bd801e]" /> Templates:
          </span>
          {TEMPLATES.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyTemplate(t)}
              className="shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-[#394653] bg-[#1a232d] px-2.5 py-1 text-[11px] text-[#b6c2ce] transition-colors hover:bg-[#263442]"
            >
              {t.label}
            </button>
          ))}
        </div>

        {status === 'success' && (
          <div className="flex items-center gap-2.5 rounded-xl border border-[#315c43] bg-[#1a3024] p-3.5 text-xs text-[#b7e1c4]">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#70c78b]" />
            <span>Message dispatched successfully! Swastik will review and reply promptly.</span>
          </div>
        )}

        {status === 'error_fields' && (
          <div className="flex items-center gap-2.5 rounded-xl border border-[#63383d] bg-[#321f24] p-3.5 text-xs text-[#ffc4c7]">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#ff858c]" />
            <span>Please provide your name, valid email address, and a message.</span>
          </div>
        )}

        {status === 'error_email' && (
          <div className="flex items-center gap-2.5 rounded-xl border border-[#63383d] bg-[#321f24] p-3.5 text-xs text-[#ffc4c7]">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#ff858c]" />
            <span>Please enter a valid email address.</span>
          </div>
        )}

        {status === 'error_send' && (
          <div className="flex items-center gap-2.5 rounded-xl border border-[#63383d] bg-[#321f24] p-3.5 text-xs text-[#ffc4c7]">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#ff858c]" />
            <span>Message delivery failed. You can directly write to psamarpaudel@gmail.com</span>
          </div>
        )}

        {status === 'error_rate_limit' && (
          <div role="alert" className="flex items-center gap-2.5 rounded-xl border border-[#66512c] bg-[#31291a] p-3.5 text-xs text-[#f6d995]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Too many messages were sent recently. Please wait before trying again.</span>
          </div>
        )}

        {status === 'error_config' && (
          <div role="alert" className="flex items-center gap-2.5 rounded-xl border border-[#63383d] bg-[#321f24] p-3.5 text-xs text-[#ffc4c7]">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#ff858c]" />
            <span>The contact service is temporarily unavailable. Please email psamarpaudel@gmail.com directly.</span>
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-3 text-xs">
          <div className="absolute -left-[10000px]" aria-hidden="true">
            <label htmlFor="mail-website">Leave this field empty</label>
            <input
              id="mail-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>
          {/* To Field */}
          <div className="flex items-center gap-2 rounded-xl border border-[#394653] bg-[#1a232d] p-2">
            <span className="w-14 shrink-0 font-mono text-[#91a0b1]">To:</span>
            <span className="font-medium text-[#dbe5ef]">Swastik Paudel &lt;psamarpaudel@gmail.com&gt;</span>
          </div>

          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#394653] bg-[#1a232d] p-2">
              <span className="w-14 shrink-0 font-mono text-[#91a0b1]">From:</span>
              <input
                type="text"
                name="name"
                required
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-transparent text-[#e8edf3] placeholder-[#7b8795] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#394653] bg-[#1a232d] p-2">
              <span className="w-14 shrink-0 font-mono text-[#91a0b1]">Email:</span>
              <input
                type="email"
                name="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full bg-transparent text-[#e8edf3] placeholder-[#7b8795] focus:outline-none"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="flex items-center gap-2 rounded-xl border border-[#394653] bg-[#1a232d] p-2">
            <span className="w-14 shrink-0 font-mono text-[#91a0b1]">Subject:</span>
            <input
              type="text"
              name="subject"
              maxLength={120}
              value={formData.subject}
              onChange={handleChange}
              placeholder="Engineering Opportunity / Collaboration"
              className="w-full bg-transparent text-[#e8edf3] placeholder-[#7b8795] focus:outline-none"
            />
          </div>

          {/* Message Area */}
          <div className="space-y-1">
            <textarea
              name="message"
              required
              rows={6}
              maxLength={5000}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              className="w-full resize-none rounded-xl border border-[#394653] bg-[#1a232d] p-3 leading-relaxed text-[#e8edf3] placeholder-[#7b8795] focus:outline-none focus:ring-1 focus:ring-[#2878d0]"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <span className={`text-[11px] ${draftSaveError ? 'text-[#ff9fa5]' : 'text-[#91a0b1]'}`}>
              {draftSaveError ? 'Draft not saved · Browser storage unavailable' : 'Draft saved locally'} &bull; Kathmandu (UTC+5:45)
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
        <div className="grid grid-cols-1 gap-2.5 border-t border-[#303b48] pt-4 font-mono text-[11px] sm:grid-cols-3">
          <div className="space-y-0.5 rounded-xl border border-[#303b48] bg-[#1a232d] p-2.5">
            <span className="block text-[#91a0b1]">Phone / WhatsApp</span>
            <a href="tel:+9779767929476" className="text-[#dbe5ef] hover:text-[#72b7ff]">
              +977 976-7929476
            </a>
          </div>

          <div className="space-y-0.5 rounded-xl border border-[#303b48] bg-[#1a232d] p-2.5">
            <span className="block text-[#91a0b1]">Location</span>
            <span className="text-[#dbe5ef]">Kathmandu, Nepal</span>
          </div>

          <div className="space-y-0.5 rounded-xl border border-[#303b48] bg-[#1a232d] p-2.5">
            <span className="block text-[#91a0b1]">GitHub</span>
            <a href="https://github.com/Swastik45" target="_blank" rel="noopener noreferrer" className="text-[#8bc4ff] hover:underline">
              github.com/Swastik45
            </a>
          </div>
        </div>
          </>
        ) : activeFolder === 'inbox' ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-[#303b48] bg-[#1a232d] p-8 text-center">
            <MailIcon className="h-8 w-8 text-[#718ba4]" />
            <h2 className="mt-3 text-sm font-semibold text-[#dbe5ef]">Your inbox is empty</h2>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#a4b1bf]">Messages sent through this contact app are delivered to Swastik. This mailbox only stores drafts created in this browser.</p>
            <button type="button" onClick={() => setActiveFolder('compose')} className="mt-4 rounded-md bg-[#2878d0] px-3 py-2 text-xs font-medium text-white hover:bg-[#1f67b8]">Write a message</button>
          </div>
        ) : activeFolder === 'drafts' ? (
          <div className="overflow-hidden rounded-xl border border-[#303b48] bg-[#1a232d]">
            <div className="border-b border-[#303b48] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#dbe5ef]">Drafts</h2>
              <p className="mt-0.5 text-[10px] text-[#91a0b1]">Saved only in this browser.</p>
            </div>
            {hasDraft ? (
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 hover:bg-[#202b35]">
                <button type="button" onClick={() => setActiveFolder('compose')} className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-xs font-medium text-[#dbe5ef]">{formData.subject.trim() || '(no subject)'}</span>
                  <span className="mt-1 block truncate text-[10px] text-[#91a0b1]">{formData.name || 'New message'} · {formData.message || 'No message text'}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setActiveFolder('compose')} className="rounded-md px-2.5 py-1.5 text-[10px] text-[#8bc4ff] hover:bg-[#17324d]">Resume</button>
                  <button type="button" onClick={() => {
                    setFormData({ name: '', email: '', subject: '', message: '' })
                    setStatus(null)
                    try { localStorage.removeItem('swastik_mail_draft') } catch (error) { console.warn('Unable to clear the saved mail draft:', error) }
                  }} className="rounded-md px-2.5 py-1.5 text-[10px] text-[#ff9fa5] hover:bg-[#3a2227]">Delete</button>
                </div>
              </div>
            ) : <p className="p-6 text-center text-xs text-[#91a0b1]">No saved drafts.</p>}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#303b48] bg-[#1a232d]">
            <div className="border-b border-[#303b48] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#dbe5ef]">Sent</h2>
              <p className="mt-0.5 text-[10px] text-[#91a0b1]">Messages submitted successfully during this session.</p>
            </div>
            {sentMessages.length ? sentMessages.map((message, index) => (
              <div key={`${message.sentAt}-${index}`} className="border-b border-[#303b48] px-4 py-3 last:border-0">
                <span className="block text-xs font-medium text-[#dbe5ef]">{message.subject}</span>
                <span className="mt-1 block text-[10px] text-[#91a0b1]">To Swastik · {new Date(message.sentAt).toLocaleString()}</span>
              </div>
            )) : <p className="p-6 text-center text-xs text-[#91a0b1]">No messages sent from this session.</p>}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
