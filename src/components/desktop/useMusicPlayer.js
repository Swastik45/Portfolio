import { useState, useEffect, useRef, useCallback } from 'react'
import { CLASSIC_TRACKS } from './musicTracks'

let persistentAudio = null

function getAudio() {
  if (typeof window === 'undefined') return null
  if (!persistentAudio) {
    persistentAudio = new Audio()
    persistentAudio.preload = 'auto'
  }
  return persistentAudio
}

export function useMusicPlayer() {
  const [trackIdx, setTrackIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.65)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const hasUserClosedRef = useRef(false)
  const isInitializedRef = useRef(false)
  const track = CLASSIC_TRACKS[trackIdx] || CLASSIC_TRACKS[0]

  // Synchronize audio volume and mute state
  useEffect(() => {
    const audio = getAudio()
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Track change effect
  useEffect(() => {
    const audio = getAudio()
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
    }
    const handleEnded = () => {
      // Loop to next track automatically
      setTrackIdx((prev) => (prev + 1) % CLASSIC_TRACKS.length)
    }
    const handleLoadStart = () => setIsLoading(true)
    const handleWaiting = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = (e) => {
      console.warn('Audio error loading track:', track.src, e)
      setIsLoading(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    const targetSrc = track.src
    if (!audio.src.endsWith(targetSrc)) {
      audio.src = targetSrc
      audio.load()
    }

    if (isPlaying) {
      audio.play().catch((err) => {
        console.debug('Playback prevented:', err)
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

  // Initial autoplay on page load + gesture fallback
  useEffect(() => {
    const audio = getAudio()
    if (!audio || isInitializedRef.current) return
    isInitializedRef.current = true

    audio.src = track.src
    audio.volume = volume

    const attemptAutoplay = () => {
      if (hasUserClosedRef.current) return
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Browser policy blocked immediate autoplay: start on first user interaction
            const onFirstInteraction = () => {
              if (hasUserClosedRef.current) return
              const a = getAudio()
              if (a) {
                a.play()
                  .then(() => setIsPlaying(true))
                  .catch((e) => console.debug('Play on gesture prevented:', e))
              }
              cleanup()
            }

            const events = ['pointerdown', 'touchstart', 'keydown', 'click']
            const cleanup = () => {
              events.forEach((evt) => window.removeEventListener(evt, onFirstInteraction))
            }
            events.forEach((evt) => window.addEventListener(evt, onFirstInteraction, { once: true, passive: true }))
          })
      }
    }

    attemptAutoplay()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    const audio = getAudio()
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      hasUserClosedRef.current = false
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.debug('Play failed:', e))
    }
  }, [isPlaying])

  const playTrack = useCallback((idx) => {
    hasUserClosedRef.current = false
    setTrackIdx(idx)
    setIsPlaying(true)
    const audio = getAudio()
    if (audio) {
      const target = CLASSIC_TRACKS[idx]
      if (target && !audio.src.endsWith(target.src)) {
        audio.src = target.src
        audio.load()
      }
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.debug('Play failed:', e))
    }
  }, [])

  const handleNext = useCallback(() => {
    hasUserClosedRef.current = false
    setTrackIdx((prev) => (prev + 1) % CLASSIC_TRACKS.length)
    setIsPlaying(true)
  }, [])

  const handlePrev = useCallback(() => {
    hasUserClosedRef.current = false
    const audio = getAudio()
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
    } else {
      setTrackIdx((prev) => (prev - 1 + CLASSIC_TRACKS.length) % CLASSIC_TRACKS.length)
      setIsPlaying(true)
    }
  }, [])

  const handleSeek = useCallback((time) => {
    const newTime = typeof time === 'number' ? time : parseFloat(time)
    setCurrentTime(newTime)
    const audio = getAudio()
    if (audio) {
      audio.currentTime = newTime
    }
  }, [])

  const setVolume = useCallback((v) => {
    const val = Math.max(0, Math.min(1, parseFloat(v)))
    setVolumeState(val)
    if (isMuted) setIsMuted(false)
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  // Explicitly called when user clicks the CROSS (X) on the Music Player window
  const stopMusic = useCallback(() => {
    hasUserClosedRef.current = true
    setIsPlaying(false)
    const audio = getAudio()
    if (audio) {
      audio.pause()
    }
  }, [])

  // Explicitly called when user re-opens the Music Player window
  const resumeMusic = useCallback(() => {
    hasUserClosedRef.current = false
    setIsPlaying(true)
    const audio = getAudio()
    if (audio) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.debug('Resume failed:', e))
    }
  }, [])

  return {
    tracks: CLASSIC_TRACKS,
    track,
    trackIdx,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    togglePlay,
    playTrack,
    handleNext,
    handlePrev,
    handleSeek,
    setVolume,
    toggleMute,
    stopMusic,
    resumeMusic
  }
}
