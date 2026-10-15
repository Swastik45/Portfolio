import React, { useState, useEffect } from 'react'
import { WALLPAPERS } from './wallpapersData'
import { Terminal, Folder, Mail, Github, Volume2, VolumeX, Check, Sparkles, Maximize, Minimize, PanelsTopLeft, Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react'
import { soundFX } from './soundEffects'

export default function ControlCenter({
  isOpen,
  onClose,
  wallpaper,
  onSelectWallpaper,
  onOpenApp,
  onToggleMissionControl,
  soundEnabled,
  onToggleSound,
  musicPlayer
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  if (!isOpen) return null

  const toggleFullscreen = () => {
    soundFX.play('click')
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <div 
      className="fixed bottom-[62px] right-2 z-[100] max-h-[calc(100dvh-78px)] w-[min(20rem,calc(100vw-16px))] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#20242d]/95 p-4 text-[#dcd7ba] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl pointer-events-auto select-none animate-in fade-in zoom-in-95 duration-150 sm:bottom-[66px] sm:right-3 sm:max-h-[calc(100dvh-82px)]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#76946a] animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-wide text-[#e6e2cc]">
            Control Center
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
          Nepal UTC+5:45
        </span>
      </div>

      {/* Availability Status Card */}
      <div className="my-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#76946a]/20 border border-[#76946a]/30 flex items-center justify-center text-[#76946a] shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">Status: Available</div>
          <div className="text-[10px] text-[#938aa9] leading-tight">
            Open to software engineering roles &amp; high-impact contracts
          </div>
        </div>
      </div>

      {/* Wallpaper Switcher */}
      <div className="space-y-2 my-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#938aa9]">
          <span>Desktop Wallpapers</span>
          <span className="text-[10px] text-white/50">{WALLPAPERS.length} live themes</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {WALLPAPERS.map((wp) => {
            const isSelected = wp.id === wallpaper
            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => {
                  soundFX.play('click')
                  onSelectWallpaper(wp.id)
                }}
                className={`relative p-2 rounded-xl text-left border transition-all flex flex-col justify-end h-16 overflow-hidden cursor-pointer ${
                  isSelected 
                    ? 'border-[#7e9cd8] ring-1 ring-[#7e9cd8]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
                style={{ background: wp.thumbnailColor }}
              >
                <div className="absolute inset-0 bg-black/25" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="text-[10px] font-medium text-white drop-shadow">
                    {wp.name}
                  </span>
                  {isSelected && (
                    <div className="w-3.5 h-3.5 rounded-full bg-[#7e9cd8] flex items-center justify-center text-[#1f1f28]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Background Music Card */}
      {musicPlayer && (
        <div className="my-3 p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#938aa9]">
            <span className="flex items-center gap-1.5 text-white/90 font-medium">
              <span className={`w-2 h-2 rounded-full ${musicPlayer.isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'}`} />
              Background Music
            </span>
            <button
              type="button"
              onClick={() => {
                soundFX.play('open')
                onOpenApp('music')
                onClose()
              }}
              className="text-[10px] text-[#7e9cd8] hover:underline cursor-pointer"
            >
              Open Player →
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="truncate min-w-0 flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow text-xs"
                style={{ backgroundColor: musicPlayer.track?.color || '#DCA561', color: '#181824' }}
              >
                <Music className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">
                  {musicPlayer.track?.title || 'Classic Music'}
                </div>
                <div className="text-[10px] text-white/50 truncate">
                  {musicPlayer.track?.artist || 'English Classic'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundFX.play('click')
                  musicPlayer.handlePrev?.()
                }}
                className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.play('click')
                  musicPlayer.togglePlay?.()
                }}
                className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                title={musicPlayer.isPlaying ? 'Pause' : 'Play'}
              >
                {musicPlayer.isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.play('click')
                  musicPlayer.handleNext?.()
                }}
                className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real Quick Toggles */}
      <div className="grid grid-cols-2 gap-2 my-3">
        {/* Sound FX Toggle */}
        <button
          type="button"
          onClick={() => {
            soundFX.play('click')
            onToggleSound()
          }}
          className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-colors cursor-pointer ${
            soundEnabled 
              ? 'bg-[#7e9cd8]/20 border-[#7e9cd8]/40 text-[#7e9cd8]' 
              : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
          }`}
          title="Toggle synthesized click sound effects"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-[11px] font-medium">
            {soundEnabled ? 'Sound FX On' : 'Sound Muted'}
          </span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Toggle native fullscreen mode"
        >
          {isFullscreen ? <Minimize className="w-4 h-4 text-[#dca561]" /> : <Maximize className="w-4 h-4 text-[#dca561]" />}
          <span className="text-[11px] font-medium">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </span>
        </button>
      </div>

      {/* Quick App Launchers */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={() => {
            soundFX.play('open')
            onToggleMissionControl()
            onClose()
          }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Open Task View"
        >
          <PanelsTopLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => { soundFX.play('open'); onOpenApp('terminal'); onClose(); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Launch Terminal"
        >
          <Terminal className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => { soundFX.play('open'); onOpenApp('projects'); onClose(); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Launch Projects Finder"
        >
          <Folder className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => { soundFX.play('open'); onOpenApp('mail'); onClose(); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Compose Email"
        >
          <Mail className="w-4 h-4" />
        </button>
        <a
          href="https://github.com/Swastik45"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
