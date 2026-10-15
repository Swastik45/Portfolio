import React, { useState } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, Music, ListMusic, Sparkles } from 'lucide-react'
import { CLASSIC_TRACKS } from '../musicTracks'

export default function MusicApp({ musicPlayer }) {
  const [showPlaylist, setShowPlaylist] = useState(false)

  // Use props from persistent musicPlayer controller
  const {
    tracks = CLASSIC_TRACKS,
    track = CLASSIC_TRACKS[0],
    trackIdx = 0,
    isPlaying = false,
    currentTime = 0,
    duration = 0,
    volume = 0.65,
    isMuted = false,
    isLoading = false,
    togglePlay,
    playTrack,
    handleNext,
    handlePrev,
    handleSeek,
    setVolume,
    toggleMute
  } = musicPlayer || {}

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="flex flex-col h-full bg-[#181824] text-[#dcd7ba] select-none justify-between overflow-hidden relative">
      {/* Top Bar with Playlist Toggle */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#20202e] shrink-0">
        <div className="flex items-center gap-2">
          <Disc
            className={`w-4 h-4 transition-transform ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
            style={{ color: track.color || '#DCA561' }}
          />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-white tracking-wide">
              Stellar Classics
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
              EN
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowPlaylist((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
            showPlaylist ? 'bg-white/20 text-white' : 'bg-white/5 hover:bg-white/10 text-white/70'
          }`}
          title="Toggle Track List"
        >
          <ListMusic className="w-3.5 h-3.5" />
          <span>Tracks ({tracks.length})</span>
        </button>
      </div>

      {/* Main Body: Vinyl Display or Playlist */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-y-auto">
        {showPlaylist ? (
          <div className="w-full max-w-sm space-y-1.5 py-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/50 mb-2 px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#dca561]" /> Classic English Hits
              </span>
              <span>{tracks.length} Songs</span>
            </div>
            {tracks.map((t, idx) => {
              const isActive = idx === trackIdx
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => playTrack?.(idx)}
                  className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/15 border border-white/20 text-white shadow-sm'
                      : 'hover:bg-white/5 text-white/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate min-w-0">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow"
                      style={{ backgroundColor: t.color, color: '#181824' }}
                    >
                      {isActive && isPlaying ? '▶' : idx + 1}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate text-white">{t.title}</div>
                      <div className="text-[10px] text-white/50 truncate">{t.artist} · {t.album}</div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-0.5 ml-2 shrink-0">
                      <span className="w-1 h-3 bg-[#76946a] rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-[#76946a] rounded-full animate-pulse [animation-delay:150ms]" />
                      <span className="w-1 h-2 bg-[#76946a] rounded-full animate-pulse [animation-delay:300ms]" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 my-auto">
            {/* Spinning Vinyl Record */}
            <div className="relative group">
              <div
                className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#0a0a0f] via-[#1c1c24] to-[#0a0a0f] shadow-[0_15px_40px_rgba(0,0,0,0.8),_inset_0_0_0_4px_#2a2a38,_inset_0_0_0_12px_#14141d,_inset_0_0_0_24px_#242432] flex items-center justify-center transition-transform duration-700 ${
                  isPlaying ? 'animate-[spin_12s_linear_infinite]' : ''
                }`}
              >
                {/* Center Vinyl Label */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-tr ${track.accent || 'from-[#DCA561] to-[#8C6239]'} flex items-center justify-center shadow-lg border-2 border-white/20`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#181824] border border-white/40 shadow-inner" />
                </div>
              </div>

              {/* Tonearm needle indicator */}
              <div
                className={`absolute -top-3 -right-2 w-8 h-16 origin-top transition-transform duration-500 pointer-events-none ${
                  isPlaying ? 'rotate-12' : '-rotate-12 opacity-60'
                }`}
              >
                <div className="w-1 h-12 bg-white/40 rounded-full mx-auto" />
                <div className="w-2.5 h-3 bg-white/70 rounded-sm mx-auto shadow" />
              </div>
            </div>

            {/* Track Title and Album Info */}
            <div className="text-center space-y-1 max-w-xs px-2">
              <div className="flex items-center justify-center gap-1.5">
                <Music className="w-3.5 h-3.5" style={{ color: track.color || '#DCA561' }} />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                  {track.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#938aa9]">
                {track.artist} · <span className="text-white/50">{track.album}</span>
              </p>
            </div>

            {/* Equalizer Frequency Visualizer Bars */}
            <div className="flex items-end justify-center gap-1 h-6">
              {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{
                    height: isPlaying ? `${h}%` : '15%',
                    animationDelay: `${(i * 120) % 600}ms`,
                    backgroundColor: isPlaying ? track.color || '#DCA561' : '#3c3c4e'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Audio Controller Deck */}
      <div className="p-4 bg-[#20202e] border-t border-white/10 shrink-0 space-y-3">
        {/* Progress Bar & Timers */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => handleSeek?.(e.target.value)}
            disabled={!duration}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: track.color || '#DCA561' }}
          />
          <div className="flex justify-between text-[11px] font-mono text-[#938aa9]">
            <span>{formatTime(currentTime)}</span>
            <span>{isLoading ? 'Buffering...' : formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls & Master Volume */}
        <div className="flex items-center justify-between gap-2">
          {/* Track Switchers & Play Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="p-3 rounded-2xl text-[#181824] font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: track.color || '#DCA561' }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Master Volume Slider */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-[#e46876]" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume?.(e.target.value)}
              className="w-16 sm:w-24 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: track.color || '#DCA561' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
