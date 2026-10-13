// Lightweight Web Audio API sound synthesizer
// Requires zero external audio files, works offline, 100% reliable.

class SoundFX {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  play(type = 'click') {
    if (!this.enabled) return
    try {
      this.init()
      if (!this.ctx) return

      const now = this.ctx.currentTime

      if (type === 'click') {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(600, now)
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.03)

        gain.gain.setValueAtTime(0.08, now)
        gain.gain.linearRampToValueAtTime(0.001, now + 0.03)

        osc.start(now)
        osc.stop(now + 0.03)
      } else if (type === 'open') {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(260, now)
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.07)

        gain.gain.setValueAtTime(0.08, now)
        gain.gain.linearRampToValueAtTime(0.001, now + 0.07)

        osc.start(now)
        osc.stop(now + 0.07)
      } else if (type === 'close') {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.type = 'sine'
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.06)

        gain.gain.setValueAtTime(0.08, now)
        gain.gain.linearRampToValueAtTime(0.001, now + 0.06)

        osc.start(now)
        osc.stop(now + 0.06)
      }
    } catch {
      // Audio playback blocked before user interaction, silent fallback
    }
  }
}

export const soundFX = new SoundFX()
