import React, { useState, useEffect, useRef } from 'react'
import { Search, ArrowUpRight, Github, Mail, Globe, Layers, User, Briefcase, FolderGit2, Cpu, Copy, Check, X } from 'lucide-react'

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('psamarpaudel@gmail.com')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 1200)
  }

  const navigateTo = (id) => {
    onClose()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const commands = [
    {
      group: 'Navigation',
      items: [
        { label: 'About & Introduction', icon: User, action: () => navigateTo('about') },
        { label: 'Work Experience (prepNep)', icon: Briefcase, action: () => navigateTo('experience') },
        { label: 'Selected Projects', icon: FolderGit2, action: () => navigateTo('projects') },
        { label: 'Technical Stack', icon: Cpu, action: () => navigateTo('skills') },
        { label: 'Contact', icon: Mail, action: () => navigateTo('contact') },
      ],
    },
    {
      group: 'Live Deployments',
      items: [
        { label: 'Visit prepNep (prepnep.com)', icon: Globe, action: () => window.open('https://prepnep.com', '_blank') },
        { label: 'Open ShareAudit (share-audit.vercel.app)', icon: ArrowUpRight, action: () => window.open('https://share-audit.vercel.app/', '_blank') },
        { label: 'Open GovAudit NP (gova-audit-np.vercel.app)', icon: ArrowUpRight, action: () => window.open('https://gova-audit-np.vercel.app/', '_blank') },
        { label: 'Open CarbonCredit (carbon-credit1.vercel.app)', icon: ArrowUpRight, action: () => window.open('https://carbon-credit1.vercel.app/', '_blank') },
        { label: 'Open Lumino (lumino-five.vercel.app)', icon: ArrowUpRight, action: () => window.open('https://lumino-five.vercel.app/', '_blank') },
        { label: 'Open 2D Shooting Game (Rust Engine)', icon: ArrowUpRight, action: () => window.open('https://github.com/Swastik45/2D-Shooting-Game', '_blank') },
      ],
    },
    {
      group: 'Quick Actions',
      items: [
        { label: copied ? 'Email Copied!' : 'Copy Email (psamarpaudel@gmail.com)', icon: copied ? Check : Copy, action: handleCopyEmail },
        { label: 'View GitHub Profile (github.com/Swastik45)', icon: Github, action: () => window.open('https://github.com/Swastik45', '_blank') },
        { label: 'Call / WhatsApp (+977 976-7929476)', icon: Mail, action: () => window.open('tel:+9779767929476', '_self') },
      ],
    },
  ]

  const filtered = commands
    .map((grp) => ({
      ...grp,
      items: grp.items.filter((it) =>
        it.label.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((grp) => grp.items.length > 0)

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-4">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-zinc-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((grp) => (
              <div key={grp.group} className="space-y-1">
                <p className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  {grp.group}
                </p>
                {grp.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400">
                        Jump ↵
                      </span>
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigation &amp; Actions</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  )
}
