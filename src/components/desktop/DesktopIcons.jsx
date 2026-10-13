import React, { useState } from 'react'

const DESKTOP_SHORTCUTS = [
  {
    id: 'about',
    label: 'About Me',
    appId: 'about',
    badge: 'Bio',
    bg: 'from-[#FFA066] to-[#D35400]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    id: 'projects',
    label: 'Projects',
    appId: 'projects',
    badge: 'Finder',
    bg: 'from-[#8FD0EA] to-[#4A86C8]',
    icon: (
      <svg viewBox="0 0 40 40" className="w-5 h-5" fill="none">
        <path d="M6 14a3 3 0 0 1 3-3h6l3 3h16a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V14z" fill="#F7FBFF" />
      </svg>
    )
  },
  {
    id: 'experience',
    label: 'prepNep',
    appId: 'experience',
    badge: 'Case Study',
    bg: 'from-[#7E9CD8] to-[#2D4F67]',
    icon: <span className="text-white font-black text-xs">pN</span>
  },
  {
    id: 'terminal',
    label: 'Terminal',
    appId: 'terminal',
    badge: 'CLI',
    bg: 'from-[#3C3C48] to-[#131318]',
    icon: <span className="font-mono font-bold text-white text-xs">&gt;_</span>
  },
  {
    id: 'resume',
    label: 'Résumé',
    appId: 'resume',
    badge: 'CV',
    bg: 'from-[#FCF8EC] to-[#D9D2BA]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2A2A37]" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  },
  {
    id: 'ask',
    label: 'Ask AI',
    appId: 'ask',
    badge: 'Q&A',
    bg: 'from-[#DC5A55] to-[#A9333B]',
    icon: <span className="text-white font-bold text-sm">問</span>
  }
]

export default function DesktopIcons({ onOpenApp }) {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div 
      className="absolute top-11 left-3 sm:left-6 z-10 grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-3 select-none pointer-events-auto"
      onClick={() => setSelectedId(null)}
    >
      {DESKTOP_SHORTCUTS.map((item) => {
        const isSelected = selectedId === item.id

        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedId(item.id)
              onOpenApp(item.appId)
            }}
            className={`w-20 sm:w-22 p-2 rounded-xl flex flex-col items-center gap-1.5 cursor-pointer text-center group transition-all duration-150 ${
              isSelected ? 'bg-white/20 ring-1 ring-[#7e9cd8]' : 'hover:bg-white/10'
            }`}
          >
            <div 
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-b ${item.bg} flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 active:scale-95 transition-transform`}
            >
              {item.icon}
            </div>
            <span className="text-[11px] font-sans font-medium text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate max-w-full px-0.5">
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
