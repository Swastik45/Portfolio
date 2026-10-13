import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, Music, ListMusic } from 'lucide-react'

const TRACKS = [
  {
    id: 'apple-juice',
    title: 'Apple Juice',
    artist: 'Chillhop Music',
    album: 'Chillhop Essentials',
    src: '/audio/apple-juice.mp3',
    fallbackSrc: 'https://stream.chillhop.com/mp3/9476',
    color: '#DCA561',
    accent: 'from-[#DCA561] to-[#8C6239]'
  },
  {
    id: 'tozen',
    title: 'Tôzen',
    artist: 'Chillhop Music',
    album: 'Lofi Horizons',
    src: '/audio/tozen.mp3',
    fallbackSrc: 'https://stream.chillhop.com/mp3/8448',
    color: '#7E9CD8',
    accent: 'from-[#7E9CD8] to-[#2D4F67]'
  },
  {
    id: 'swiss',
    title: 'Swiss',
    artist: 'Chillhop Music',
    album: 'Alps & Rain',
    src: '/audio/swiss.mp3',
    fallbackSrc: 'https://stream.chillhop.com/mp3/8878',
    color: '#76946A',
    accent: 'from-[#76946A] to-[#2E4F28]'
  },
  {
    id: 'like-this-one',
    title: 'Like This One',
    artist: 'Chillhop Music',
    album: 'Afternoon Solitude',
    src: 'https://stream.chillhop.com/mp3/8603',
    fallbackSrc: '/audio/apple-juice.mp3',
    color: '#957FB8',
    accent: 'from-[#957FB8] to-[#43325B]'
  },
  {
    id: 'secret-meetings',
    title: 'Secret Meetings',
    artist: 'Chillhop Music',
    album: 'Midnight Tokyo',
    src: 'https://stream.chillhop.com/mp3/8598',
    fallbackSrc: '/audio/tozen.mp3',
    color: '#E46876',
    accent: 'from-[#E46876] to-[#7A2832]'
  }
]

export default function MusicApp() {
  const [trackIdx, setTrackIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const audioRef = useRef(null)
  const track = TRACKS[trackIdx]

  // Initialize and handle track source changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
    }
    const handleEnded = () => {
      setTrackIdx((prev) => (prev + 1) % TRACKS.length)
    }
    const handleLoadStart = () => setIsLoading(true)
    const handleWaiting = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = () => {
      // If primary src fails, attempt fallback
      if (audio.src !== track.fallbackSrc && track.fallbackSrc) {
        audio.src = track.fallbackSrc
        if (isPlaying) {
          audio.play().catch((e) => { void e })
        }
      }
      setIsLoading(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    // Load current track
    audio.src = track.src
    audio.load()

    if (isPlaying) {
      audio.play().catch((e) => {
        void e
        setIsPlaying(false)
      })
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
    }
  }, [trackIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle Play/Pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((e) => {
        void e
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Handle Volume & Mute
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const handleNext = () => {
    setTrackIdx((prev) => (prev + 1) % TRACKS.length)
  }

  const handlePrev = () => {
    // If playing past 3s, restart track
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0
    } else {
      setTrackIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    }
  }

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="flex flex-col h-full bg-[#181824] text-[#dcd7ba] select-none justify-between overflow-hidden relative">
      <audio ref={audioRef} preload="metadata" />

      {/* Top Bar with Playlist Toggle */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#20202e] shrink-0">
        <div className="flex items-center gap-2">
          <Disc className={`w-4 h-4 text-[${track.color}] ${isPlaying ? 'animate-spin' : ''}`} style={{ color: track.color }} />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            Chillhop OS Player
          </span>
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
          <span>Tracks ({TRACKS.length})</span>
        </button>
      </div>

      {/* Main Body: Vinyl Display or Playlist */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-y-auto">
        {showPlaylist ? (
          <div className="w-full max-w-sm space-y-1.5 py-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-2 px-1">
              Select Chillhop Track:
            </div>
            {TRACKS.map((t, idx) => {
              const isActive = idx === trackIdx
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTrackIdx(idx)
                    setIsPlaying(true)
                  }}
                  className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white/15 border border-white/20 text-white'
                      : 'hover:bg-white/5 text-white/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
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
                    <div className="flex items-center gap-0.5 ml-2">
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
            {/* Spinning Vinyl Record with Album Cover Art */}
            <div className="relative group">
              <div
                className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#0a0a0f] via-[#1c1c24] to-[#0a0a0f] shadow-[0_15px_40px_rgba(0,0,0,0.8),_inset_0_0_0_4px_#2a2a38,_inset_0_0_0_12px_#14141d,_inset_0_0_0_24px_#242432] flex items-center justify-center transition-transform duration-700 ${
                  isPlaying ? 'animate-[spin_12s_linear_infinite]' : ''
                }`}
              >
                {/* Center Vinyl Label */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-tr ${track.accent} flex items-center justify-center shadow-lg border-2 border-white/20`}
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
                <Music className="w-3.5 h-3.5" style={{ color: track.color }} />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                  {track.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-[#938aa9]">
                {track.artist} · <span className="text-white/40">{track.album}</span>
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
                    backgroundColor: isPlaying ? track.color : '#3c3c4e'
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
            onChange={handleSeek}
            disabled={!duration}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7e9cd8]"
            style={{ accentColor: track.color }}
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
              style={{ backgroundColor: track.color }}
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
              onClick={() => setIsMuted((prev) => !prev)}
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
              onChange={(e) => {
                setVolume(parseFloat(e.target.value))
                if (isMuted) setIsMuted(false)
              }}
              className="w-16 sm:w-24 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7e9cd8]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
