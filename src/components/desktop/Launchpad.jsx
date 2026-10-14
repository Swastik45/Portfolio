import React, { useState } from 'react'
import { Search, X, LayoutGrid, PanelsTopLeft } from 'lucide-react'

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

const PINNED_APP_IDS = ['projects', 'experience', 'about', 'skills', 'resume', 'mail']

export default function Launchpad({
  isOpen,
  onClose,
  onOpenApp,
  onFocusApp,
  onToggleMissionControl,
  windows = {}
}) {
  const [search, setSearch] = useState('')
  const [showAllApps, setShowAllApps] = useState(false)

  if (!isOpen) return null

  const query = search.trim().toLowerCase()
  const filteredApps = LAUNCHPAD_APPS.filter((app) =>
    app.name.toLowerCase().includes(query) ||
    app.category.toLowerCase().includes(query)
  )
  const displayedApps = filteredApps.filter((app) =>
    query || showAllApps || PINNED_APP_IDS.includes(app.id)
  )
  const openApps = Object.values(windows).filter((app) => app.isOpen).slice(0, 3)

  const launchApp = (appId) => {
    if (windows[appId]?.isOpen) onFocusApp?.(appId)
    else onOpenApp(appId)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[88] text-white"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-label="Start menu"
        className="absolute bottom-[62px] left-2 flex max-h-[calc(100dvh-78px)] w-[min(640px,calc(100vw-16px))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#171a23]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2 duration-150 sm:bottom-[66px] sm:left-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="shrink-0 border-b border-white/10 px-4 pb-4 pt-4 sm:px-6 sm:pt-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
            <LayoutGrid className="h-3.5 w-3.5 text-[#39a9f8]" />
            Swastik’s PC
          </div>
          <label className="relative block">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search apps..."
              aria-label="Search Start menu apps"
              autoFocus
              className="w-full rounded-lg border border-white/10 bg-[#242832] py-2.5 pl-10 pr-10 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-[#39a9f8]/70 focus:ring-2 focus:ring-[#39a9f8]/25"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear Start menu search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-white/45 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-sm font-semibold text-white/90">
              {query ? 'Search results' : showAllApps ? 'All apps' : 'Pinned'}
            </h1>
            {!query && (
              <button
                type="button"
                onClick={() => setShowAllApps((current) => !current)}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {showAllApps ? 'Pinned' : 'All apps'}
              </button>
            )}
          </div>

          {displayedApps.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2">
              {displayedApps.map((app) => {
                const isOpen = Boolean(windows[app.id]?.isOpen)
                const isMinimized = windows[app.id]?.isMinimized
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => launchApp(app.id)}
                    aria-label={`${isOpen ? 'Switch to' : 'Open'} ${app.name}`}
                    className="group flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-xl px-1.5 py-3 text-center transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39a9f8] active:bg-white/[0.12]"
                  >
                    <span
                      className="relative flex h-11 w-11 items-center justify-center rounded-[13px] border border-white/10 shadow-lg transition-transform group-hover:scale-105 sm:h-12 sm:w-12"
                      style={{ background: app.bg }}
                    >
                      {app.renderIcon()}
                      {isOpen && (
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#171a23] bg-[#39a9f8]" />
                      )}
                    </span>
                    <span className="max-w-full truncate text-[11px] text-white/85 group-hover:text-white">
                      {app.name}
                    </span>
                    {isMinimized && <span className="-mt-1 text-[9px] text-white/35">Minimized</span>}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center">
              <p className="text-sm font-medium text-white/75">No apps found</p>
              <p className="mt-1 text-xs text-white/40">Try another app or project name.</p>
            </div>
          )}

          {!query && openApps.length > 0 && (
            <section className="mt-4 border-t border-white/[0.08] pt-4" aria-labelledby="start-open-apps">
              <h2 id="start-open-apps" className="mb-2 text-[11px] font-semibold text-white/65">Open now</h2>
              <div className="space-y-1">
                {openApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => launchApp(app.id)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.07] text-sm">{app.icon}</span>
                    <span className="min-w-0 flex-1 truncate">{app.title}</span>
                    <span className="text-[10px] text-white/35">{app.isMinimized ? 'Minimized' : 'Running'}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-white/[0.035] px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#272b35]">
              <img src="/swastik-cutout.png" alt="" className="h-full w-full object-cover object-top" />
            </span>
            <span className="min-w-0 truncate">
              <span className="block truncate text-xs font-medium text-white/85">Swastik Paudel</span>
              <span className="block truncate text-[10px] text-white/40">Kathmandu, Nepal</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => {
                onToggleMissionControl()
                onClose()
              }}
              title="Task View"
              aria-label="Open Task View"
              className="rounded-lg p-2 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <PanelsTopLeft className="h-4 w-4" />
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}
