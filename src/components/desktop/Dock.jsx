import React, { useEffect, useState } from 'react'
import { Battery, PanelsTopLeft, Search, SlidersHorizontal, Wifi } from 'lucide-react'
import { ShortcutGlyph } from './DesktopIcons'

const DOCK_ITEMS = [
  {
    id: 'ask',
    label: 'Ask Swastik',
    appId: 'ask',
    bg: 'linear-gradient(180deg, #DC5A55 0%, #A9333B 100%)',
    badge: 'AI',
    renderIcon: () => <ShortcutGlyph type="assistant" className="h-6 w-6" />
  },
  {
    id: 'projects',
    label: 'Projects',
    appId: 'projects',
    bg: 'linear-gradient(180deg, #8FD0EA 0%, #4A86C8 100%)',
    renderIcon: () => <ShortcutGlyph type="folder" className="h-6 w-6" />
  },
  {
    id: 'terminal',
    label: 'Terminal',
    appId: 'terminal',
    bg: 'linear-gradient(180deg, #3C3C48 0%, #131318 100%)',
    renderIcon: () => <ShortcutGlyph type="terminal" className="h-6 w-6" />
  },
  {
    id: 'experience',
    label: 'prepNep',
    appId: 'experience',
    bg: 'linear-gradient(180deg, #7E9CD8 0%, #2D4F67 100%)',
    renderIcon: () => <ShortcutGlyph type="case" className="h-6 w-6" />
  },
  {
    id: 'about',
    label: 'About Swastik',
    appId: 'about',
    bg: 'linear-gradient(180deg, #FFA066 0%, #D35400 100%)',
    renderIcon: () => <ShortcutGlyph type="text" className="h-6 w-6" />
  },
  {
    id: 'skills',
    label: 'Systems Lab',
    appId: 'skills',
    bg: 'linear-gradient(180deg, #957FB8 0%, #4E3E6B 100%)',
    renderIcon: () => <ShortcutGlyph type="system" className="h-6 w-6" />
  },
  {
    id: 'music',
    label: 'Music Player',
    appId: 'music',
    bg: 'linear-gradient(180deg, #3B9FE8 0%, #1669AE 100%)',
    renderIcon: () => <ShortcutGlyph type="music" className="h-6 w-6" />
  },
  {
    id: 'resume',
    label: 'Résumé',
    appId: 'resume',
    bg: 'linear-gradient(180deg, #FCF8EC 0%, #D9D2BA 100%)',
    renderIcon: () => <ShortcutGlyph type="pdf" className="h-6 w-6" />
  },
  {
    id: 'mail',
    label: 'Mail',
    appId: 'mail',
    bg: 'linear-gradient(180deg, #7DBDF7 0%, #2E6EDD 100%)',
    renderIcon: () => <ShortcutGlyph type="mail" className="h-6 w-6" />
  }
]

const MOBILE_TASKBAR_APP_IDS = new Set(['ask', 'projects', 'music', 'terminal'])

export default function Dock({
  openApps = {},
  activeWindowId,
  onOpenApp,
  onToggleLaunchpad,
  isLaunchpadOpen,
  onToggleSpotlight,
  onToggleMissionControl,
  onToggleControlCenter,
  onShowDesktop,
  isControlCenterOpen,
  isMusicPlaying = false
}) {
  const [clock, setClock] = useState({ time: '', date: '' })

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const timeOptions = { timeZone: 'Asia/Kathmandu', hour: 'numeric', minute: '2-digit', hour12: true }
      const dateOptions = { timeZone: 'Asia/Kathmandu', month: 'numeric', day: 'numeric', year: 'numeric' }

      try {
        setClock({
          time: new Intl.DateTimeFormat('en-US', timeOptions).format(now),
          date: new Intl.DateTimeFormat('en-US', dateOptions).format(now)
        })
      } catch {
        setClock({ time: now.toLocaleTimeString(), date: now.toLocaleDateString() })
      }
    }

    updateClock()
    const timer = setInterval(updateClock, 15000)
    return () => clearInterval(timer)
  }, [])

  const apps = DOCK_ITEMS.filter((item) => item.appId)

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] h-[54px] border-t border-white/10 bg-[#171923]/90 text-white shadow-[0_-8px_32px_rgba(0,0,0,0.2)] backdrop-blur-2xl sm:h-[58px]">
      <div className="mx-auto flex h-full w-full items-center gap-1 px-1.5 sm:gap-2 sm:px-3">
        <button
          type="button"
          onClick={onToggleLaunchpad}
          aria-label={isLaunchpadOpen ? 'Close Start menu' : 'Open Start menu'}
          aria-haspopup="dialog"
          aria-expanded={isLaunchpadOpen}
          title="Start"
          className={`group flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
            isLaunchpadOpen ? 'bg-white/10' : ''
          }`}
        >
          <span className="grid grid-cols-2 gap-[2px] transition-transform duration-150 group-hover:scale-110">
            <span className="h-[9px] w-[9px] bg-[#39a9f8]" />
            <span className="h-[9px] w-[9px] bg-[#39a9f8]" />
            <span className="h-[9px] w-[9px] bg-[#39a9f8]" />
            <span className="h-[9px] w-[9px] bg-[#39a9f8]" />
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleSpotlight}
          aria-label="Search apps, projects, and technologies"
          title="Search"
          className="flex h-9 w-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] text-white/65 transition-colors hover:bg-white/10 hover:text-white sm:w-52 sm:justify-start sm:px-3 lg:w-60"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="hidden truncate text-xs sm:inline">Search apps and projects</span>
        </button>

        <div className="mx-1 h-7 w-px shrink-0 bg-white/10 sm:mx-1.5" />

        <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden sm:gap-1">
          {apps.map((item) => {
            const appState = openApps[item.appId] || {}
            const isOpen = Boolean(appState.isOpen)
            const isMinimized = isOpen && Boolean(appState.isMinimized)
            const isActive = activeWindowId === item.appId && isOpen

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenApp(item.appId)}
                aria-label={`${isOpen ? 'Switch to' : 'Open'} ${item.label}${isMinimized ? ', minimized' : ''}`}
                aria-pressed={isActive}
                title={`${item.label}${isOpen ? (isMinimized ? ' (minimized)' : ' (open)') : ''}`}
                className={`group relative h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:flex sm:w-11 ${
                  MOBILE_TASKBAR_APP_IDS.has(item.appId) ? 'flex' : 'hidden'
                } ${
                  isActive ? 'bg-white/[0.13]' : 'hover:bg-white/[0.09]'
                }`}
              >
                <span
                  className="relative flex h-7 w-7 items-center justify-center rounded-[9px] border border-white/10 shadow-md transition-transform group-hover:scale-105"
                  style={{ background: item.bg }}
                >
                  {item.renderIcon()}
                  {item.badge && (
                    <span className="absolute -right-1 -top-1 rounded-full bg-[#e46876] px-1 text-[7px] font-bold leading-3 text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.appId === 'music' && isMusicPlaying && (
                    <span
                      className="absolute -right-1 -top-1 flex items-end gap-[1.5px] h-3 px-1 rounded-full bg-emerald-500/90 shadow ring-1 ring-emerald-400/50"
                      title="Music Playing in Background"
                    >
                      <span className="w-[1.5px] h-1.5 bg-white rounded-full animate-pulse" />
                      <span className="w-[1.5px] h-2.5 bg-white rounded-full animate-pulse [animation-delay:150ms]" />
                      <span className="w-[1.5px] h-1 bg-white rounded-full animate-pulse [animation-delay:300ms]" />
                    </span>
                  )}
                </span>
                {isOpen && (
                  <span
                    className={`absolute bottom-0.5 h-[3px] rounded-full transition-all ${
                      isActive ? 'w-4 bg-[#55b6ff]' : 'w-1.5 bg-white/45'
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onToggleMissionControl}
          aria-label="Open Task View"
          title="Task View · F3"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 sm:flex"
        >
          <PanelsTopLeft className="h-[18px] w-[18px]" />
        </button>

        <button
          type="button"
          onClick={onToggleControlCenter}
          aria-label="Open quick settings"
          aria-expanded={isControlCenterOpen}
          title="Quick settings"
          className={`flex h-10 shrink-0 items-center gap-1 rounded-lg px-2 text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
            isControlCenterOpen ? 'bg-white/10 text-white' : ''
          }`}
        >
          <Wifi className="h-4 w-4" />
          <Battery className="hidden h-4 w-4 sm:block" />
          <SlidersHorizontal className="ml-0.5 h-3.5 w-3.5 text-white/50" />
        </button>

        <button
          type="button"
          onClick={onToggleControlCenter}
          aria-label={`Kathmandu time ${clock.time}, ${clock.date}. Open quick settings`}
          title="Kathmandu local time"
          className="hidden h-10 shrink-0 flex-col items-center justify-center rounded-lg px-2 text-[11px] leading-4 text-white/85 transition-colors hover:bg-white/10 sm:flex"
        >
          <span>{clock.time || 'UTC+5:45'}</span>
          <span className="text-[10px] text-white/55">{clock.date}</span>
        </button>

        <button
          type="button"
          onClick={onShowDesktop}
          aria-label="Show desktop and minimize all windows"
          title="Show desktop"
          className="h-full w-1 shrink-0 border-l border-white/20 transition-colors hover:bg-[#39a9f8]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-300"
        />
      </div>
    </div>
  )
}
