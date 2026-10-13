import React, { useState } from 'react'

const DOCK_ITEMS = [
  {
    id: 'launchpad',
    label: 'Launchpad',
    isLauncher: true,
    bg: 'linear-gradient(180deg, #5A5A70 0%, #2C2C3A 100%)',
    renderIcon: () => (
      <div className="grid grid-cols-3 gap-0.5 p-1 w-full h-full items-center justify-center">
        {['#E46876', '#7E9CD8', '#76946A', '#DCA561', '#957FB8', '#D27E99', '#7AA89F', '#FFA066', '#E6C384'].map((c, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: c }} />
        ))}
      </div>
    )
  },
  {
    id: 'ask',
    label: 'Ask Swastik',
    appId: 'ask',
    bg: 'linear-gradient(180deg, #DC5A55 0%, #A9333B 100%)',
    badge: 'AI',
    renderIcon: () => (
      <div className="flex items-center justify-center w-full h-full text-white font-bold text-lg select-none">
        問
      </div>
    )
  },
  {
    id: 'projects',
    label: 'Projects',
    appId: 'projects',
    bg: 'linear-gradient(180deg, #8FD0EA 0%, #4A86C8 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
        <path d="M6 14a3 3 0 0 1 3-3h6l3 3h16a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V14z" fill="#F7FBFF" />
        <path d="M6 19h28" stroke="#4A86C8" strokeWidth="1.5" opacity="0.4" />
      </svg>
    )
  },
  {
    id: 'terminal',
    label: 'Terminal',
    appId: 'terminal',
    bg: 'linear-gradient(180deg, #3C3C48 0%, #131318 100%)',
    renderIcon: () => (
      <div className="flex items-center justify-center w-full h-full font-mono font-bold text-white text-xs">
        <span className="text-[#76946a] mr-0.5">&gt;</span>_
      </div>
    )
  },
  {
    id: 'experience',
    label: 'prepNep',
    appId: 'experience',
    bg: 'linear-gradient(180deg, #7E9CD8 0%, #2D4F67 100%)',
    renderIcon: () => (
      <div className="flex items-center justify-center w-full h-full font-black text-white text-sm">
        pN
      </div>
    )
  },
  {
    id: 'skills',
    label: 'Skills',
    appId: 'skills',
    bg: 'linear-gradient(180deg, #957FB8 0%, #4E3E6B 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    )
  },
  {
    id: 'music',
    label: 'Music Player',
    appId: 'music',
    bg: 'linear-gradient(180deg, #2BE57A 0%, #129A48 100%)',
    renderIcon: () => (
      <div className="flex items-end justify-center gap-0.5 w-full h-full pb-2">
        <div className="w-1 h-3 bg-[#0B1F12] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1 h-5 bg-[#0B1F12] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1 h-4 bg-[#0B1F12] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        <div className="w-1 h-2 bg-[#0B1F12] rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
      </div>
    )
  },
  {
    id: 'divider',
    isDivider: true
  },
  {
    id: 'resume',
    label: 'Résumé',
    appId: 'resume',
    bg: 'linear-gradient(180deg, #FCF8EC 0%, #D9D2BA 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2A2A37]" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    )
  },
  {
    id: 'mail',
    label: 'Mail',
    appId: 'mail',
    bg: 'linear-gradient(180deg, #7DBDF7 0%, #2E6EDD 100%)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
]

export default function Dock({
  openApps = {},
  onOpenApp,
  onToggleLaunchpad,
  isLaunchpadOpen
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <div className="fixed bottom-1.5 sm:bottom-2.5 inset-x-0 mx-auto w-fit max-w-[calc(100vw-8px)] z-[85] pointer-events-none select-none px-1 sm:px-2 flex justify-center">
      <div 
        className="pointer-events-auto flex items-end rounded-2xl sm:rounded-[22px] px-1.5 sm:px-2.5 pb-1.5 sm:pb-2 gap-1 sm:gap-2 shadow-[0_16px_40px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-200 overflow-x-auto no-scrollbar max-w-full"
        style={{
          background: 'rgba(54, 54, 70, 0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.16)'
        }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {DOCK_ITEMS.map((item, idx) => {
          if (item.isDivider) {
            return (
              <span
                key={item.id}
                className="w-px h-5 sm:h-8 mb-1 sm:mb-2 bg-white/20 self-center shrink-0 mx-0.5"
                aria-hidden="true"
              />
            )
          }

          const isHovered = hoveredIdx === idx
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1
          const isOpen = item.appId ? openApps[item.appId] : (item.isLauncher && isLaunchpadOpen)

          // Magnification scale (desktop only)
          const scaleClass = isHovered 
            ? 'scale-110 sm:scale-125 -translate-y-1 sm:-translate-y-2' 
            : isNeighbor 
            ? 'scale-105 sm:scale-110 -translate-y-0.5 sm:-translate-y-1' 
            : 'scale-100'

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group shrink-0"
              onMouseEnter={() => setHoveredIdx(idx)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-9 sm:-top-10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#22222e]/90 text-white text-[10px] sm:text-[11px] font-medium font-sans border border-white/15 backdrop-blur-md whitespace-nowrap shadow-xl pointer-events-none z-50">
                  {item.label}
                </div>
              )}

              {/* Icon Capsule Button */}
              <button
                type="button"
                onClick={() => {
                  if (item.isLauncher) onToggleLaunchpad()
                  else if (item.appId) onOpenApp(item.appId)
                }}
                className={`relative w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-[14px] flex items-center justify-center shadow-lg transition-transform duration-150 ease-out active:scale-95 cursor-pointer ${scaleClass}`}
                style={{ background: item.bg }}
              >
                {item.renderIcon()}

                {/* AI / Custom Badge */}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-[#e46876] text-white text-[7px] sm:text-[8px] font-mono font-bold leading-none shadow">
                    {item.badge}
                  </span>
                )}
              </button>

              {/* Active Indicator Dot */}
              <div className="h-1 flex items-center justify-center mt-0.5 sm:mt-1">
                {isOpen && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_6px_white]" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
