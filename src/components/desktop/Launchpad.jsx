import React, { useState } from 'react'
import { Search, X } from 'lucide-react'

const LAUNCHPAD_APPS = [
  {
    id: 'ask',
    name: 'Ask Swastik',
    category: 'AI / Assistant',
    bg: 'linear-gradient(180deg, #DC5A55 0%, #A9333B 100%)',
    renderIcon: () => <span className="text-2xl font-bold text-white">問</span>
  },
  {
    id: 'projects',
    name: 'Projects',
    category: 'Finder / Work',
    bg: 'linear-gradient(180deg, #8FD0EA 0%, #4A86C8 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <path d="M6 14a3 3 0 0 1 3-3h6l3 3h16a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V14z" fill="#F7FBFF" />
        <path d="M6 19h28" stroke="#4A86C8" strokeWidth="1.5" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'terminal',
    name: 'Terminal',
    category: 'Developer CLI',
    bg: 'linear-gradient(180deg, #3C3C48 0%, #131318 100%)',
    renderIcon: () => <span className="font-mono font-bold text-white text-lg">&gt;_</span>
  },
  {
    id: 'experience',
    name: 'prepNep',
    category: 'Case Study',
    bg: 'linear-gradient(180deg, #7E9CD8 0%, #2D4F67 100%)',
    renderIcon: () => <span className="font-black text-white text-xl">pN</span>
  },
  {
    id: 'about',
    name: 'About Swastik',
    category: 'Biography',
    bg: 'linear-gradient(180deg, #FFA066 0%, #D35400 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    id: 'skills',
    name: 'Skills & Tech',
    category: 'System Profiler',
    bg: 'linear-gradient(180deg, #957FB8 0%, #4E3E6B 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
      </svg>
    )
  },
  {
    id: 'resume',
    name: 'Résumé',
    category: 'Curriculum Vitae',
    bg: 'linear-gradient(180deg, #FCF8EC 0%, #D9D2BA 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#2A2A37]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  },
  {
    id: 'mail',
    name: 'Mail',
    category: 'Contact',
    bg: 'linear-gradient(180deg, #7DBDF7 0%, #2E6EDD 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  },
  {
    id: 'music',
    name: 'Music Player',
    category: 'Ambient Audio',
    bg: 'linear-gradient(180deg, #2BE57A 0%, #129A48 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#0B1F12]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )
  }
]

export default function Launchpad({
  isOpen,
  onClose,
  onOpenApp
}) {
  const [search, setSearch] = useState('')

  if (!isOpen) return null

  const filteredApps = LAUNCHPAD_APPS.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div 
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-2xl flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Search Bar */}
      <div 
        className="w-full max-w-md relative mb-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Search className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search applications..."
          autoFocus
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#7e9cd8] backdrop-blur-xl"
        />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* App Grid */}
      <div 
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 sm:gap-10 max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              onOpenApp(app.id)
              onClose()
            }}
            className="flex flex-col items-center group transition-transform duration-150 hover:scale-105 active:scale-95 text-center"
          >
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] flex items-center justify-center shadow-2xl border border-white/10 group-hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-all"
              style={{ background: app.bg }}
            >
              {app.renderIcon()}
            </div>
            <span className="mt-2.5 text-xs sm:text-sm font-medium text-white/90 group-hover:text-white drop-shadow">
              {app.name}
            </span>
            <span className="text-[10px] text-white/40">
              {app.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
