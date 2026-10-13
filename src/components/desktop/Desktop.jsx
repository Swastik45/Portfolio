import React, { useState, useEffect, useRef } from 'react'
import WallpaperBackground from './Wallpapers'
import TopMenuBar from './TopMenuBar'
import Dock from './Dock'
import Launchpad from './Launchpad'
import ControlCenter from './ControlCenter'
import DesktopIcons from './DesktopIcons'
import WindowFrame from './WindowFrame'
import { soundFX } from './soundEffects'
import { StickyNote, X, Check } from 'lucide-react'

// Apps
import AboutApp from './apps/AboutApp'
import ProjectsApp from './apps/ProjectsApp'
import TerminalApp from './apps/TerminalApp'
import AskSwastikApp from './apps/AskSwastikApp'
import ExperienceApp from './apps/ExperienceApp'
import SkillsApp from './apps/SkillsApp'
import ResumeApp from './apps/ResumeApp'
import MailApp from './apps/MailApp'
import MusicApp from './apps/MusicApp'

const getCenteredCoords = (w, h) => {
  if (typeof window === 'undefined') return { x: 60, y: 50 }
  const x = Math.max(16, Math.floor((window.innerWidth - w) / 2))
  const y = Math.max(42, Math.floor((window.innerHeight - 84 - h) / 2))
  return { x, y }
}

const DEFAULT_APPS = {
  about: {
    id: 'about',
    title: 'About Swastik Paudel',
    icon: '👤',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    size: { w: 720, h: 540 }
  },
  projects: {
    id: 'projects',
    title: 'Projects — Finder',
    icon: '📁',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 860, h: 580 }
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — bash',
    icon: '💻',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 700, h: 480 }
  },
  ask: {
    id: 'ask',
    title: 'Ask Swastik — AI Assistant',
    icon: '問',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 660, h: 560 }
  },
  experience: {
    id: 'experience',
    title: 'prepNep — Engineering Case Study',
    icon: '💼',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 820, h: 580 }
  },
  skills: {
    id: 'skills',
    title: 'Skills & Architecture — System Profiler',
    icon: '⚡',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 700, h: 520 }
  },
  resume: {
    id: 'resume',
    title: 'Résumé — Swastik Paudel',
    icon: '📄',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 760, h: 600 }
  },
  mail: {
    id: 'mail',
    title: 'Mail — New Message',
    icon: '✉️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 660, h: 540 }
  },
  music: {
    id: 'music',
    title: 'Music Player — Chillhop',
    icon: '🎵',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 420, h: 480 }
  }
}

export default function Desktop() {
  const [windows, setWindows] = useState(() => {
    const initial = {}
    Object.keys(DEFAULT_APPS).forEach((key) => {
      const app = DEFAULT_APPS[key]
      initial[key] = {
        ...app,
        position: getCenteredCoords(app.size.w, app.size.h),
        zIndex: key === 'about' ? 10 : 5
      }
    })
    return initial
  })

  const [activeWindowId, setActiveWindowId] = useState('about')
  const highestZRef = useRef(20)

  // Wallpaper persistence
  const [wallpaper, setWallpaper] = useState(() => {
    try {
      return localStorage.getItem('swastik_wallpaper') || 'samurai'
    } catch (e) {
      console.debug('localStorage error:', e)
      return 'samurai'
    }
  })

  // System trays & Sound
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Desktop Sticky Note State
  const [showStickyNote, setShowStickyNote] = useState(true)
  const [noteContent, setNoteContent] = useState(() => {
    try {
      return localStorage.getItem('swastik_desktop_note') || '💡 Quick Memo:\n- Lead Engineer @ prepNep (prepnep.com)\n- Building high-concurrency systems & Rust\n- Contact: psamarpaudel@gmail.com'
    } catch {
      return ''
    }
  })

  // Save sticky note
  const handleNoteChange = (text) => {
    setNoteContent(text)
    try {
      localStorage.setItem('swastik_desktop_note', text)
    } catch (e) {
      console.debug('localStorage error:', e)
    }
  }

  // Toggle sound
  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev
      soundFX.enabled = next
      return next
    })
  }

  // Update wallpaper
  const handleSelectWallpaper = (newWp) => {
    setWallpaper(newWp)
    soundFX.play('click')
    try {
      localStorage.setItem('swastik_wallpaper', newWp)
    } catch (e) {
      console.debug('localStorage setItem error:', e)
    }
  }

  // Bring window to front
  const bringToFront = (appId) => {
    setActiveWindowId(appId)
    highestZRef.current += 1
    const nextZ = highestZRef.current
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        zIndex: nextZ
      }
    }))
  }

  // Open or toggle app from Dock / Desktop
  const openApp = (appId) => {
    if (!windows[appId]) return

    soundFX.play('open')
    const target = windows[appId]
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 1024

    // If already open and active on desktop, minimize it (toggle)
    if (target.isOpen && !target.isMinimized && activeWindowId === appId) {
      minimizeApp(appId)
      return
    }

    // Always center the window on open
    const centeredPos = getCenteredCoords(target.size.w, target.size.h)
    highestZRef.current += 1
    const nextZ = highestZRef.current

    setWindows((prev) => {
      const updated = { ...prev }

      // On split/mobile screens, minimize background windows to prevent clutter
      if (isSmallScreen) {
        Object.keys(updated).forEach((k) => {
          if (k !== appId && updated[k].isOpen) {
            updated[k] = { ...updated[k], isMinimized: true }
          }
        })
      }

      updated[appId] = {
        ...updated[appId],
        isOpen: true,
        isMinimized: false,
        position: centeredPos,
        zIndex: nextZ
      }
      return updated
    })

    setActiveWindowId(appId)
  }

  // Close app
  const closeApp = React.useCallback((appId) => {
    soundFX.play('close')
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], isOpen: false }
    }))
    setActiveWindowId((current) => (current === appId ? null : current))
  }, [])

  // Minimize app
  const minimizeApp = (appId) => {
    soundFX.play('close')
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], isMinimized: true }
    }))
    if (activeWindowId === appId) {
      setActiveWindowId(null)
    }
  }

  // Toggle maximize
  const toggleMaximizeApp = (appId) => {
    soundFX.play('click')
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], isMaximized: !prev[appId].isMaximized }
    }))
    bringToFront(appId)
  }

  // Update window position on drag
  const updatePosition = (appId, pos) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], position: pos }
    }))
  }

  // Close active window shortcut
  const closeActiveWindow = () => {
    if (activeWindowId) {
      closeApp(activeWindowId)
    }
  }

  const activeWindowIdRef = useRef(activeWindowId)
  useEffect(() => {
    activeWindowIdRef.current = activeWindowId
  }, [activeWindowId])

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        soundFX.play('click')
        setIsLaunchpadOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsLaunchpadOpen(false)
        setIsControlCenterOpen(false)
        if (activeWindowIdRef.current) {
          closeApp(activeWindowIdRef.current)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeApp])

  // Calculate open apps map for Dock dots
  const openAppsMap = Object.keys(windows).reduce((acc, k) => {
    acc[k] = windows[k].isOpen && !windows[k].isMinimized
    return acc
  }, {})

  // Active App Name display in top menubar
  const activeAppObj = activeWindowId ? windows[activeWindowId] : null
  const activeAppName = activeAppObj ? activeAppObj.title.split('—')[0].trim() : 'Swastik Paudel'

  const minimizeAll = () => {
    soundFX.play('close')
    setWindows((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((k) => {
        updated[k] = { ...updated[k], isMinimized: true }
      })
      return updated
    })
    setActiveWindowId(null)
  }

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-[#1F1F28] font-sans"
      onClick={() => {
        setIsControlCenterOpen(false)
      }}
    >
      {/* 1. Wallpaper Background Canvas */}
      <WallpaperBackground wallpaperId={wallpaper} />

      {/* 2. Top System Menu Bar */}
      <TopMenuBar
        activeAppName={activeAppName}
        onToggleLaunchpad={() => {
          soundFX.play('click')
          setIsLaunchpadOpen((prev) => !prev)
        }}
        onToggleControlCenter={() => {
          soundFX.play('click')
          setIsControlCenterOpen((prev) => !prev)
        }}
        isControlCenterOpen={isControlCenterOpen}
        onOpenApp={openApp}
        onCloseActiveWindow={closeActiveWindow}
        onMinimizeAll={minimizeAll}
      />

      {/* 3. Streamlined Desktop Shortcuts */}
      <DesktopIcons onOpenApp={openApp} />

      {/* 4. Desktop Quick Sticky Note (Persistent Memo) */}
      {showStickyNote && (
        <div 
          className="absolute bottom-20 right-4 z-10 hidden sm:block w-64 p-3.5 rounded-2xl bg-[#fff8db]/90 text-[#3d3725] border border-amber-200/60 shadow-xl backdrop-blur-md pointer-events-auto transition-transform hover:scale-[1.02]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-amber-900/10 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-950">
              <StickyNote className="w-3.5 h-3.5 text-amber-700" />
              <span>Desktop Note</span>
            </div>
            <button
              type="button"
              onClick={() => setShowStickyNote(false)}
              className="p-0.5 rounded hover:bg-black/10 text-amber-900/60 hover:text-amber-950 cursor-pointer"
              title="Hide note"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <textarea
            value={noteContent}
            onChange={(e) => handleNoteChange(e.target.value)}
            rows={4}
            className="w-full bg-transparent text-xs font-mono text-[#3d3725] placeholder-amber-900/40 resize-none focus:outline-none leading-relaxed"
          />
        </div>
      )}

      {/* 5. Windows Manager Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* About App */}
        <WindowFrame
          {...windows.about}
          onClose={() => closeApp('about')}
          onMinimize={() => minimizeApp('about')}
          onToggleMaximize={() => toggleMaximizeApp('about')}
          onFocus={() => bringToFront('about')}
          onUpdatePosition={(pos) => updatePosition('about', pos)}
        >
          <AboutApp onOpenApp={openApp} />
        </WindowFrame>

        {/* Projects App */}
        <WindowFrame
          {...windows.projects}
          onClose={() => closeApp('projects')}
          onMinimize={() => minimizeApp('projects')}
          onToggleMaximize={() => toggleMaximizeApp('projects')}
          onFocus={() => bringToFront('projects')}
          onUpdatePosition={(pos) => updatePosition('projects', pos)}
        >
          <ProjectsApp onOpenApp={openApp} />
        </WindowFrame>

        {/* Terminal App */}
        <WindowFrame
          {...windows.terminal}
          onClose={() => closeApp('terminal')}
          onMinimize={() => minimizeApp('terminal')}
          onToggleMaximize={() => toggleMaximizeApp('terminal')}
          onFocus={() => bringToFront('terminal')}
          onUpdatePosition={(pos) => updatePosition('terminal', pos)}
        >
          <TerminalApp 
            onOpenApp={openApp} 
            onSelectWallpaper={handleSelectWallpaper}
            onClose={() => closeApp('terminal')} 
            currentWallpaper={wallpaper}
          />
        </WindowFrame>

        {/* Ask Swastik AI App */}
        <WindowFrame
          {...windows.ask}
          onClose={() => closeApp('ask')}
          onMinimize={() => minimizeApp('ask')}
          onToggleMaximize={() => toggleMaximizeApp('ask')}
          onFocus={() => bringToFront('ask')}
          onUpdatePosition={(pos) => updatePosition('ask', pos)}
        >
          <AskSwastikApp onOpenApp={openApp} />
        </WindowFrame>

        {/* Experience / prepNep Case Study */}
        <WindowFrame
          {...windows.experience}
          onClose={() => closeApp('experience')}
          onMinimize={() => minimizeApp('experience')}
          onToggleMaximize={() => toggleMaximizeApp('experience')}
          onFocus={() => bringToFront('experience')}
          onUpdatePosition={(pos) => updatePosition('experience', pos)}
        >
          <ExperienceApp />
        </WindowFrame>

        {/* Skills App */}
        <WindowFrame
          {...windows.skills}
          onClose={() => closeApp('skills')}
          onMinimize={() => minimizeApp('skills')}
          onToggleMaximize={() => toggleMaximizeApp('skills')}
          onFocus={() => bringToFront('skills')}
          onUpdatePosition={(pos) => updatePosition('skills', pos)}
        >
          <SkillsApp onOpenApp={openApp} />
        </WindowFrame>

        {/* Resume App */}
        <WindowFrame
          {...windows.resume}
          onClose={() => closeApp('resume')}
          onMinimize={() => minimizeApp('resume')}
          onToggleMaximize={() => toggleMaximizeApp('resume')}
          onFocus={() => bringToFront('resume')}
          onUpdatePosition={(pos) => updatePosition('resume', pos)}
        >
          <ResumeApp />
        </WindowFrame>

        {/* Mail App */}
        <WindowFrame
          {...windows.mail}
          onClose={() => closeApp('mail')}
          onMinimize={() => minimizeApp('mail')}
          onToggleMaximize={() => toggleMaximizeApp('mail')}
          onFocus={() => bringToFront('mail')}
          onUpdatePosition={(pos) => updatePosition('mail', pos)}
        >
          <MailApp />
        </WindowFrame>

        {/* Music App */}
        <WindowFrame
          {...windows.music}
          onClose={() => closeApp('music')}
          onMinimize={() => minimizeApp('music')}
          onToggleMaximize={() => toggleMaximizeApp('music')}
          onFocus={() => bringToFront('music')}
          onUpdatePosition={(pos) => updatePosition('music', pos)}
        >
          <MusicApp />
        </WindowFrame>
      </div>

      {/* 6. Control Center Dropdown Drawer */}
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        wallpaper={wallpaper}
        onSelectWallpaper={handleSelectWallpaper}
        onOpenApp={openApp}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 7. macOS Bottom Floating Dock */}
      <Dock
        openApps={openAppsMap}
        onOpenApp={openApp}
        onToggleLaunchpad={() => {
          soundFX.play('click')
          setIsLaunchpadOpen((prev) => !prev)
        }}
        isLaunchpadOpen={isLaunchpadOpen}
      />

      {/* 8. Fullscreen Launchpad Overlay */}
      <Launchpad
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        onOpenApp={openApp}
      />
    </div>
  )
}
