import React, { useState, useEffect, useRef } from 'react'
import { Wifi, Battery, SlidersHorizontal, Terminal, Sparkles, Command, Search } from 'lucide-react'

export default function TopMenuBar({
  activeAppName = 'Swastik Paudel',
  onToggleLaunchpad,
  onToggleControlCenter,
  isControlCenterOpen,
  onOpenApp,
  onCloseActiveWindow,
  onMinimizeAll
}) {
  const [currentTime, setCurrentTime] = useState('')
  const [compactTime, setCompactTime] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const menuRef = useRef(null)

  // Live Kathmandu Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      // Kathmandu is UTC+5:45
      const fullOptions = {
        timeZone: 'Asia/Kathmandu',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }
      const compactOptions = {
        timeZone: 'Asia/Kathmandu',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }
      try {
        setCurrentTime(new Intl.DateTimeFormat('en-US', fullOptions).format(now))
        setCompactTime(new Intl.DateTimeFormat('en-US', compactOptions).format(now))
      } catch {
        setCurrentTime(now.toLocaleTimeString())
        setCompactTime(now.toLocaleTimeString())
      }
    }

    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    {
      label: 'File',
      children: [
        { label: 'New Terminal', action: () => onOpenApp('terminal') },
        { label: 'Browse Projects', action: () => onOpenApp('projects') },
        { label: 'prepNep Case Study', action: () => onOpenApp('experience') },
        { label: 'Compose Mail', action: () => onOpenApp('mail') },
        { divider: true },
        { label: 'Close Active Window', action: () => onCloseActiveWindow() }
      ]
    },
    {
      label: 'View',
      children: [
        { label: 'Launchpad', action: () => onToggleLaunchpad() },
        { label: 'Ask Swastik AI', action: () => onOpenApp('ask') },
        { label: 'Skills Matrix', action: () => onOpenApp('skills') },
        { label: 'View Résumé', action: () => onOpenApp('resume') }
      ]
    },
    {
      label: 'Window',
      children: [
        { label: 'Close Active Window', action: () => onCloseActiveWindow() },
        { label: 'Show Desktop (Minimize All)', action: () => onMinimizeAll?.() },
        { divider: true },
        { label: 'About Swastik', action: () => onOpenApp('about') }
      ]
    },
    {
      label: 'Help',
      children: [
        { label: 'About Swastik Paudel', action: () => onOpenApp('about') },
        { label: 'Interactive Terminal Help', action: () => onOpenApp('terminal') },
        { label: 'Quick Q&A (Ask AI)', action: () => onOpenApp('ask') }
      ]
    }
  ]

  return (
    <header className="fixed top-0 inset-x-0 h-7 sm:h-8 bg-[#1f1f28]/85 backdrop-blur-md border-b border-white/10 z-[90] text-xs px-2.5 sm:px-4 flex items-center justify-between text-[#dcd7ba] select-none">
      {/* Left Menu Items */}
      <div className="flex items-center gap-1 sm:gap-3" ref={menuRef}>
        {/* Apple/Swastik Brand Icon */}
        <button
          onClick={onToggleLaunchpad}
          className="p-1 rounded hover:bg-white/10 transition-colors flex items-center gap-1.5 text-white/90"
          title="Launchpad"
        >
          <div className="w-4 h-4 rounded bg-[#e46876] flex items-center justify-center text-[#1f1f28] font-black text-[10px]">
            S
          </div>
        </button>

        {/* Active Application Name in Bold */}
        <span className="font-semibold text-white tracking-tight px-1.5 py-0.5 rounded text-xs hidden sm:inline-block">
          {activeAppName}
        </span>

        {/* Top Dropdown Menus */}
        <div className="hidden md:flex items-center gap-0.5 relative">
          {menuItems.map((menu) => {
            const isOpen = activeDropdown === menu.label
            return (
              <div key={menu.label} className="relative">
                <button
                  onClick={() => setActiveDropdown(isOpen ? null : menu.label)}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    isOpen ? 'bg-white/15 text-white' : 'text-[#dcd7ba]/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {menu.label}
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-[#22222e]/95 border border-white/15 backdrop-blur-2xl py-1 shadow-2xl z-50 text-xs">
                    {menu.children.map((child, idx) => {
                      if (child.divider) {
                        return <div key={idx} className="my-1 border-t border-white/10" />
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            child.action()
                            setActiveDropdown(null)
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-[#7e9cd8]/20 hover:text-[#7e9cd8] text-white/90 transition-colors"
                        >
                          {child.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Right System Tray */}
      <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono text-[#dcd7ba]/90">
        {/* Spotlight Search Launcher */}
        <button
          type="button"
          onClick={onToggleLaunchpad}
          className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/5"
          title="Spotlight Search / Launchpad (Cmd+K / Ctrl+K)"
        >
          <Search className="w-3 h-3 text-[#7e9cd8]" />
          <span className="text-[10px] font-mono">⌘K</span>
        </button>

        {/* Availability indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#76946a]/15 border border-[#76946a]/30 text-[#76946a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#76946a] animate-pulse" />
          <span className="text-[10px] font-sans font-medium">Available</span>
        </div>

        {/* Wi-Fi & Battery */}
        <div className="flex items-center gap-2 text-white/70">
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5 hidden sm:block" />
        </div>

        {/* Kathmandu Local Time */}
        <span className="font-sans text-xs text-white/90 font-medium px-1 hidden sm:inline">
          {currentTime || 'Nepal UTC+5:45'}
        </span>
        <span className="font-sans text-xs text-white/90 font-medium px-1 sm:hidden">
          {compactTime || 'UTC+5:45'}
        </span>

        {/* Control Center Launcher Toggle */}
        <button
          onClick={onToggleControlCenter}
          className={`p-1 rounded-md transition-colors ${
            isControlCenterOpen ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'
          }`}
          title="Control Center"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  )
}
