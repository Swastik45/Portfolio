import React, { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'

const THEME_ADAPTATIONS = {
  kathmandu: {
    name: 'Kathmandu Valley at Dusk',
    rimFilter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.6)) drop-shadow(0 0 28px rgba(237,170,132,0.42)) drop-shadow(0 0 8px rgba(255,208,160,0.32))',
    colorGrading: 'sepia(10%) saturate(106%) contrast(103%) brightness(96%)',
    backlightColor: 'radial-gradient(ellipse at 75% 55%, rgba(237,170,132,0.35) 0%, rgba(184,105,93,0.18) 45%, transparent 70%)',
    particleColor: '#ffd0a0',
    particleType: 'dust'
  },
  samurai: {
    name: 'Samurai at Dusk',
    rimFilter: 'drop-shadow(0 22px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 32px rgba(220,90,85,0.52)) drop-shadow(0 0 10px rgba(152,43,53,0.42))',
    colorGrading: 'saturate(112%) contrast(108%) brightness(93%)',
    backlightColor: 'radial-gradient(ellipse at 80% 45%, rgba(220,90,85,0.38) 0%, rgba(152,43,53,0.2) 50%, transparent 75%)',
    particleColor: '#dc5a55',
    particleType: 'ember'
  },
  fuji: {
    name: 'Fuji at Twilight',
    rimFilter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.65)) drop-shadow(0 0 30px rgba(126,156,216,0.42)) drop-shadow(0 0 10px rgba(228,104,118,0.28))',
    colorGrading: 'hue-rotate(-4deg) saturate(102%) contrast(104%) brightness(95%)',
    backlightColor: 'radial-gradient(ellipse at 70% 60%, rgba(126,156,216,0.28) 0%, rgba(228,104,118,0.16) 48%, transparent 72%)',
    particleColor: '#7e9cd8',
    particleType: 'mist'
  },
  sakura: {
    name: 'Moonlit Sakura',
    rimFilter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.65)) drop-shadow(0 0 30px rgba(210,126,153,0.42)) drop-shadow(0 0 10px rgba(242,236,214,0.32))',
    colorGrading: 'hue-rotate(4deg) saturate(105%) contrast(103%) brightness(96%)',
    backlightColor: 'radial-gradient(ellipse at 75% 45%, rgba(210,126,153,0.28) 0%, rgba(242,236,214,0.15) 45%, transparent 70%)',
    particleColor: '#d27e99',
    particleType: 'petal'
  },
  kanagawa: {
    name: 'Kanagawa Minimal',
    rimFilter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.65)) drop-shadow(0 0 28px rgba(126,156,216,0.38)) drop-shadow(0 0 8px rgba(85,182,255,0.25))',
    colorGrading: 'saturate(98%) contrast(105%) brightness(95%)',
    backlightColor: 'radial-gradient(ellipse at 80% 60%, rgba(85,182,255,0.22) 0%, rgba(126,156,216,0.12) 50%, transparent 70%)',
    particleColor: '#8fd0ea',
    particleType: 'cyan'
  }
}

export default function DesktopWorkspace({ wallpaper = 'kathmandu' }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const theme = THEME_ADAPTATIONS[wallpaper] || THEME_ADAPTATIONS.kathmandu

  // Smooth mouse parallax tracking
  useEffect(() => {
    let rafId
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2 // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2 // -1 to 1
        setMouseOffset({ x, y })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <main className="absolute inset-x-0 bottom-[54px] top-0 z-[5] overflow-hidden text-white sm:bottom-[58px] pointer-events-none">
      {/* 1. Left Vignette for Typography Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101522]/55 via-[#101522]/15 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#101522]/25 via-transparent to-[#101522]/35 sm:hidden pointer-events-none" />

      {/* 2. THEME-ADAPTIVE ATMOSPHERIC BACKLIGHT (Projects depth behind Swastik) */}
      <div
        className="absolute bottom-0 right-0 w-[55vw] sm:w-[48vw] h-[85vh] transition-all duration-1000 ease-out pointer-events-none"
        style={{ background: theme.backlightColor }}
      />

      {/* 3. SWASTIK'S PHOTO — LIVING WITHIN THE SCENE */}
      <div
        className="absolute bottom-0 right-[-9%] z-0 h-[64%] w-auto max-w-none min-[380px]:right-[-4%] sm:right-[4%] sm:h-[84%] sm:max-w-[48%] transition-transform duration-300 ease-out pointer-events-none select-none"
        style={{
          transform: `translate3d(${mouseOffset.x * -14}px, ${mouseOffset.y * -8}px, 0)`
        }}
      >
        {/* Breathing Subject Wrapper */}
        <div className="relative w-full h-full animate-[subject-breathe_7s_ease-in-out_infinite]">
          {/* Portrait Cutout with Theme Adaptation & Feathered Ground Contact */}
          <img
            src="/swastik-cutout.png"
            alt="Swastik Paudel"
            className="h-full w-auto object-contain object-bottom transition-all duration-1000 ease-out"
            style={{
              filter: `${theme.colorGrading} ${theme.rimFilter}`,
              maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 5%, black 14%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 5%, black 14%, black 100%)'
            }}
          />

          {/* Ground Horizon Fog Blend (Anchors silhouette seamlessly into the earth) */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* FOREGROUND ENVIRONMENTAL PARTICLES (Layered IN FRONT OF Swastik) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {theme.particleType === 'dust' && (
              <>
                {[
                  { left: '25%', top: '45%', size: 3, delay: '0.2s', dur: '5.5s' },
                  { left: '60%', top: '35%', size: 2.5, delay: '1.4s', dur: '6s' },
                  { left: '40%', top: '65%', size: 3.5, delay: '2.1s', dur: '4.8s' },
                  { left: '75%', top: '55%', size: 2, delay: '0.8s', dur: '5.2s' },
                  { left: '30%', top: '25%', size: 2, delay: '2.8s', dur: '6.2s' },
                  { left: '50%', top: '78%', size: 3, delay: '1.8s', dur: '5s' }
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-full bg-[#fed8b1]/75 blur-[0.4px] animate-[dust-float_6s_ease-in-out_infinite]"
                    style={{
                      left: p.left,
                      top: p.top,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      animationDelay: p.delay,
                      animationDuration: p.dur
                    }}
                  />
                ))}
              </>
            )}

            {theme.particleType === 'ember' && (
              <>
                {[
                  { left: '28%', bottom: '20%', size: 2.5, delay: '0.4s', dur: '4.8s' },
                  { left: '65%', bottom: '15%', size: 3, delay: '1.6s', dur: '5.2s' },
                  { left: '45%', bottom: '30%', size: 2, delay: '2.3s', dur: '4.5s' },
                  { left: '72%', bottom: '25%', size: 3.5, delay: '0.9s', dur: '5.5s' },
                  { left: '35%', bottom: '40%', size: 2, delay: '3.1s', dur: '5s' }
                ].map((em, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-full bg-gradient-to-t from-[#dc5a55] to-[#ffd0a0] shadow-[0_0_10px_#dc5a55] animate-[ember-float_5s_ease-in_infinite]"
                    style={{
                      left: em.left,
                      bottom: em.bottom,
                      width: `${em.size}px`,
                      height: `${em.size * 1.5}px`,
                      animationDelay: em.delay,
                      animationDuration: em.dur
                    }}
                  />
                ))}
              </>
            )}

            {theme.particleType === 'petal' && (
              <>
                {[
                  { left: '20%', top: '10%', size: 8, delay: '0.3s', dur: '7s' },
                  { left: '62%', top: '25%', size: 6.5, delay: '1.8s', dur: '8.2s' },
                  { left: '38%', top: '48%', size: 9, delay: '3.2s', dur: '6.8s' },
                  { left: '78%', top: '35%', size: 7, delay: '1.1s', dur: '7.5s' },
                  { left: '48%', top: '70%', size: 8.5, delay: '2.5s', dur: '7.2s' }
                ].map((pet, idx) => (
                  <div
                    key={idx}
                    className="absolute animate-[petal-swirl_8s_ease-in-out_infinite]"
                    style={{
                      left: pet.left,
                      top: pet.top,
                      animationDelay: pet.delay,
                      animationDuration: pet.dur
                    }}
                  >
                    <div
                      className="rounded-full bg-gradient-to-tr from-[#d27e99] via-[#f2a8be] to-[#ffccd9] shadow-[0_0_8px_rgba(228,104,118,0.5)]"
                      style={{
                        width: `${pet.size}px`,
                        height: `${pet.size * 0.7}px`,
                        borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%'
                      }}
                    />
                  </div>
                ))}
              </>
            )}

            {theme.particleType === 'mist' && (
              <div className="absolute bottom-4 inset-x-0 h-24 bg-gradient-to-r from-transparent via-[#7e9cd8]/20 to-transparent blur-md animate-[cloud-drift-slow_24s_linear_infinite]" />
            )}

            {theme.particleType === 'cyan' && (
              <>
                {[
                  { left: '30%', top: '40%', size: 3, delay: '0.5s', dur: '6s' },
                  { left: '65%', top: '55%', size: 2.5, delay: '1.9s', dur: '5.5s' },
                  { left: '42%', top: '70%', size: 3.5, delay: '2.7s', dur: '6.5s' }
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-full bg-[#8fd0ea]/60 blur-[0.4px] animate-[dust-float_6s_ease-in-out_infinite]"
                    style={{
                      left: p.left,
                      top: p.top,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      animationDelay: p.delay,
                      animationDuration: p.dur
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 4. HERO TYPOGRAPHY */}
      <section className="absolute left-5 top-[13%] z-[1] max-w-[72%] sm:left-[12%] sm:top-1/2 sm:max-w-[40%] sm:-translate-y-1/2 pointer-events-auto">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] text-white/70 sm:mb-4 sm:text-xs font-mono">
          <MapPin className="h-3 w-3 shrink-0 text-[#e5ae73] sm:h-3.5 sm:w-3.5" />
          <span>Kathmandu, Nepal</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.06em] text-white drop-shadow-[0_2px_22px_rgba(10,14,24,0.45)] sm:text-7xl">
          Swastik<span className="text-[#e5ae73]">.</span>
        </h1>
        <p className="mt-1.5 text-xs text-white/85 drop-shadow sm:mt-3 sm:text-base font-light tracking-wide">
          Software engineer
        </p>
      </section>
    </main>
  )
}
