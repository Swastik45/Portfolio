import React, { useState, useEffect, useRef } from 'react'
import WallpaperBackground from './Wallpapers'
import Dock from './Dock'
import Launchpad from './Launchpad'
import ControlCenter from './ControlCenter'
import DesktopIcons from './DesktopIcons'
import DesktopWorkspace from './DesktopWorkspace'
import WindowFrame from './WindowFrame'
import Spotlight from './Spotlight'
import MissionControl from './MissionControl'
import { soundFX } from './soundEffects'

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
import { useMusicPlayer } from './useMusicPlayer'

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
    icon: 'text',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 720, h: 540 }
  },
  projects: {
    id: 'projects',
    title: 'Projects — File Explorer',
    icon: 'folder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 860, h: 580 }
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — bash',
    icon: 'terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 700, h: 480 }
  },
  ask: {
    id: 'ask',
    title: 'Ask Swastik — AI Assistant',
    icon: 'assistant',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 660, h: 560 }
  },
  experience: {
    id: 'experience',
    title: 'prepNep — Engineering Case Study',
    icon: 'case',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 820, h: 580 }
  },
  skills: {
    id: 'skills',
    title: 'Systems Lab — System Information',
    icon: 'system',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 700, h: 520 }
  },
  resume: {
    id: 'resume',
    title: 'Résumé — Swastik Paudel',
    icon: 'pdf',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 760, h: 600 }
  },
  mail: {
    id: 'mail',
    title: 'Mail — New Message',
    icon: 'mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    size: { w: 660, h: 540 }
  },
  music: {
    id: 'music',
    title: 'Music Player — English Classics',
    icon: 'music',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    size: { w: 420, h: 480 }
  }
}

export default function Desktop() {
  const musicPlayer = useMusicPlayer()

  const [windows, setWindows] = useState(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false
    const initial = {}
    Object.keys(DEFAULT_APPS).forEach((key) => {
      const app = DEFAULT_APPS[key]
      initial[key] = {
        ...app,
        isMinimized: key === 'music' && isMobile ? true : app.isMinimized,
        position: getCenteredCoords(app.size.w, app.size.h),
        zIndex: key === 'music' && !isMobile ? 10 : 5
      }
    })
    return initial
  })

  const [activeWindowId, setActiveWindowId] = useState(() => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false
    return isMobile ? null : 'music'
  })
  const highestZRef = useRef(20)

  // Wallpaper persistence
  const [wallpaper, setWallpaper] = useState(() => {
    try {
      return localStorage.getItem('swastik_wallpaper') || 'kathmandu'
    } catch (e) {
      console.debug('localStorage error:', e)
      return 'kathmandu'
    }
  })

  // System trays & Sound
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const [isMissionControlOpen, setIsMissionControlOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [spotlightProjectQuery, setSpotlightProjectQuery] = useState('')
  const [projectsSearchResetKey, setProjectsSearchResetKey] = useState(0)

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
    if (appId === 'projects') setSpotlightProjectQuery('')

    soundFX.play('open')
    if (appId === 'music') {
      musicPlayer.resumeMusic()
    }
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

  const focusApp = (appId) => {
    if (!windows[appId]) return

    soundFX.play('open')
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 1024
    highestZRef.current += 1
    const nextZ = highestZRef.current

    setWindows((prev) => {
      const updated = { ...prev }
      if (isSmallScreen) {
        Object.keys(updated).forEach((key) => {
          if (key !== appId && updated[key].isOpen) {
            updated[key] = { ...updated[key], isMinimized: true }
          }
        })
      }
      updated[appId] = {
        ...updated[appId],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
      return updated
    })
    setActiveWindowId(appId)
  }

  const handleSpotlightSelect = (appId, projectQuery) => {
    setIsSpotlightOpen(false)
    if (projectQuery) {
      setSpotlightProjectQuery(projectQuery)
      setProjectsSearchResetKey((key) => key + 1)
      focusApp(appId)
    } else {
      openApp(appId)
    }
  }

  // Close app
  const closeApp = React.useCallback((appId) => {
    soundFX.play('close')
    if (appId === 'music') {
      musicPlayer.stopMusic()
    }
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], isOpen: false, isMinimized: false }
    }))
    setActiveWindowId((current) => (current === appId ? null : current))
  }, [musicPlayer])

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

  const updateSize = (appId, size) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], size }
    }))
  }

  const activeWindowIdRef = useRef(activeWindowId)
  useEffect(() => {
    activeWindowIdRef.current = activeWindowId
  }, [activeWindowId])

  // Global shortcuts for search, Task View, and overlay dismissal.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        soundFX.play('click')
        setIsSpotlightOpen((prev) => !prev)
        setIsLaunchpadOpen(false)
        setIsMissionControlOpen(false)
        setIsControlCenterOpen(false)
      } else if (e.key === 'F3' || ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp')) {
        e.preventDefault()
        soundFX.play('click')
        setIsMissionControlOpen((prev) => !prev)
        setIsSpotlightOpen(false)
        setIsLaunchpadOpen(false)
        setIsControlCenterOpen(false)
      } else if (e.key === 'Escape') {
        if (isSpotlightOpen) setIsSpotlightOpen(false)
        else if (isMissionControlOpen) setIsMissionControlOpen(false)
        else if (isLaunchpadOpen) setIsLaunchpadOpen(false)
        else if (isControlCenterOpen) setIsControlCenterOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isControlCenterOpen, isLaunchpadOpen, isMissionControlOpen, isSpotlightOpen])

  // Calculate open apps map for Dock dots
  const openAppsMap = Object.keys(windows).reduce((acc, k) => {
    acc[k] = {
      isOpen: windows[k].isOpen,
      isMinimized: windows[k].isMinimized
    }
    return acc
  }, {})

  const minimizeAll = () => {
    soundFX.play('close')
    setWindows((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((k) => {
        if (updated[k].isOpen) {
          updated[k] = { ...updated[k], isMinimized: true }
        }
      })
      return updated
    })
    setActiveWindowId(null)
  }

  return (
    <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-[#1F1F28] font-sans"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsControlCenterOpen(false)
        }
      }}
    >
      {/* 1. Wallpaper Background Canvas */}
      <WallpaperBackground wallpaperId={wallpaper} />


      {/* 2. Personal desktop home */}
      <DesktopWorkspace wallpaper={wallpaper} onOpenApp={openApp} />
      <DesktopIcons onOpenApp={openApp} />

      {/* 3. Windows Manager Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* About App */}
        <WindowFrame
          {...windows.about}
          onClose={() => closeApp('about')}
          onMinimize={() => minimizeApp('about')}
          onToggleMaximize={() => toggleMaximizeApp('about')}
          onFocus={() => bringToFront('about')}
          onUpdatePosition={(pos) => updatePosition('about', pos)}
          onUpdateSize={(size) => updateSize('about', size)}
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
          onUpdateSize={(size) => updateSize('projects', size)}
        >
          <ProjectsApp
            key={projectsSearchResetKey}
            onOpenApp={openApp}
            search={spotlightProjectQuery}
            onSearchChange={setSpotlightProjectQuery}
          />
        </WindowFrame>

        {/* Terminal App */}
        <WindowFrame
          {...windows.terminal}
          onClose={() => closeApp('terminal')}
          onMinimize={() => minimizeApp('terminal')}
          onToggleMaximize={() => toggleMaximizeApp('terminal')}
          onFocus={() => bringToFront('terminal')}
          onUpdatePosition={(pos) => updatePosition('terminal', pos)}
          onUpdateSize={(size) => updateSize('terminal', size)}
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
          onUpdateSize={(size) => updateSize('ask', size)}
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
          onUpdateSize={(size) => updateSize('experience', size)}
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
          onUpdateSize={(size) => updateSize('skills', size)}
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
          onUpdateSize={(size) => updateSize('resume', size)}
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
          onUpdateSize={(size) => updateSize('mail', size)}
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
          onUpdateSize={(size) => updateSize('music', size)}
        >
          <MusicApp musicPlayer={musicPlayer} />
        </WindowFrame>
      </div>

      {/* 5. Quick Settings Drawer */}
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        wallpaper={wallpaper}
        onSelectWallpaper={handleSelectWallpaper}
        onOpenApp={openApp}
        onToggleMissionControl={() => {
          setIsMissionControlOpen(true)
          setIsSpotlightOpen(false)
          setIsLaunchpadOpen(false)
          setIsControlCenterOpen(false)
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        musicPlayer={musicPlayer}
      />

      {/* 6. Windows-style taskbar */}
      <Dock
        openApps={openAppsMap}
        activeWindowId={activeWindowId}
        onOpenApp={openApp}
        isMusicPlaying={musicPlayer.isPlaying}
        onToggleLaunchpad={() => {
          soundFX.play('click')
          setIsLaunchpadOpen((prev) => !prev)
          setIsSpotlightOpen(false)
          setIsMissionControlOpen(false)
          setIsControlCenterOpen(false)
        }}
        isLaunchpadOpen={isLaunchpadOpen}
        onToggleSpotlight={() => {
          soundFX.play('click')
          setIsSpotlightOpen((prev) => !prev)
          setIsLaunchpadOpen(false)
          setIsMissionControlOpen(false)
          setIsControlCenterOpen(false)
        }}
        onToggleMissionControl={() => {
          soundFX.play('click')
          setIsMissionControlOpen((prev) => !prev)
          setIsSpotlightOpen(false)
          setIsLaunchpadOpen(false)
          setIsControlCenterOpen(false)
        }}
        onToggleControlCenter={() => {
          soundFX.play('click')
          setIsControlCenterOpen((prev) => !prev)
          setIsLaunchpadOpen(false)
          setIsSpotlightOpen(false)
          setIsMissionControlOpen(false)
        }}
        onShowDesktop={minimizeAll}
        isControlCenterOpen={isControlCenterOpen}
      />

      {/* 7. Start Menu */}
      <Launchpad
        key={isLaunchpadOpen ? 'open' : 'closed'}
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        onOpenApp={openApp}
        onFocusApp={focusApp}
        onToggleMissionControl={() => {
          setIsMissionControlOpen(true)
          setIsSpotlightOpen(false)
          setIsLaunchpadOpen(false)
          setIsControlCenterOpen(false)
        }}
        windows={windows}
      />

      {isSpotlightOpen && (
        <Spotlight
          onClose={() => setIsSpotlightOpen(false)}
          onSelect={handleSpotlightSelect}
        />
      )}

      <MissionControl
        isOpen={isMissionControlOpen}
        windows={windows}
        activeWindowId={activeWindowId}
        onFocusApp={focusApp}
        onLaunchApp={openApp}
        onCloseApp={closeApp}
        onClose={() => setIsMissionControlOpen(false)}
      />
    </div>
  )
}
