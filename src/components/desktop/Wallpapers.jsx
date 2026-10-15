import React, { useMemo } from 'react'

export default function WallpaperBackground({ wallpaperId = 'kathmandu' }) {
  // Generate stable random city lights for Kathmandu valley
  const kathmanduLights = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      x: 50 + (i * 37) % 1500 + ((i * 13) % 25) - 12,
      y: 720 + ((i * 29) % 125),
      r: 1 + (i % 3) * 0.45,
      delay: ((i * 310) % 3200) / 1000,
      duration: 1.8 + ((i * 470) % 2400) / 1000,
      color: i % 4 === 0 ? '#ffd0a0' : i % 3 === 0 ? '#ffea9f' : i % 2 === 0 ? '#f0c494' : '#ffffff'
    }))
  }, [])

  // Generate stable random stars
  const stars = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      x: (i * 33) % 100,
      y: (i * 19) % 65,
      size: 1 + (i % 3) * 0.6,
      delay: ((i * 410) % 4000) / 1000,
      duration: 2 + ((i * 530) % 3000) / 1000
    }))
  }, [])

  // Generate rising embers for Samurai theme
  const embers = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: 8 + (i * 4.1) % 86,
      bottom: 2 + (i * 7) % 30,
      size: 2 + (i % 3) * 1.5,
      delay: ((i * 450) % 5500) / 1000,
      duration: 4.5 + ((i * 630) % 3500) / 1000
    }))
  }, [])

  // Generate falling sakura petals for Sakura theme
  const petals = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: (i * 3.7) % 96,
      top: -5 - (i * 3) % 15,
      size: 6 + (i % 4) * 2.5,
      delay: ((i * 380) % 6000) / 1000,
      duration: 6.5 + ((i * 510) % 4000) / 1000
    }))
  }, [])

  // =========================================================================
  // THEME 1: KATHMANDU VALLEY AT DUSK (Living Scene)
  // =========================================================================
  if (wallpaperId === 'kathmandu') {
    return (
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-[#181a28]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="kathmandu-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1527" />
              <stop offset="38%" stopColor="#1e2c44" />
              <stop offset="68%" stopColor="#634458" />
              <stop offset="88%" stopColor="#b8695d" />
              <stop offset="100%" stopColor="#e59873" />
            </linearGradient>
            <linearGradient id="kathmandu-ridge-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#55647a" />
              <stop offset="100%" stopColor="#313c4c" />
            </linearGradient>
            <linearGradient id="kathmandu-ridge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#455062" />
              <stop offset="100%" stopColor="#252d3a" />
            </linearGradient>
            <linearGradient id="kathmandu-city" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#29303d" />
              <stop offset="100%" stopColor="#161b24" />
            </linearGradient>
            <linearGradient id="kathmandu-haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#edaa84" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#df9877" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1a202c" stopOpacity="0" />
            </linearGradient>
            <filter id="kathmandu-moon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="soft-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Sky Gradient */}
          <rect width="1600" height="900" fill="url(#kathmandu-sky)" />

          {/* Drifting Clouds (Upper Sky Parallax) */}
          <g className="animate-[cloud-drift-slow_60s_linear_infinite]" opacity="0.18">
            <ellipse cx="400" cy="180" rx="280" ry="32" fill="#ffd0a0" filter="url(#soft-blur)" />
            <ellipse cx="1100" cy="140" rx="360" ry="38" fill="#ffd0a0" filter="url(#soft-blur)" />
            <ellipse cx="1900" cy="170" rx="300" ry="35" fill="#ffd0a0" filter="url(#soft-blur)" />
          </g>

          {/* Evening Stars Twinkling */}
          <g>
            {stars.slice(0, 18).map((s) => (
              <circle
                key={s.id}
                cx={s.x * 16}
                cy={s.y * 5}
                r={s.size}
                fill="#fde3cf"
                className="animate-[star-twinkle_3s_ease-in-out_infinite]"
                style={{
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.duration}s`
                }}
              />
            ))}
          </g>

          {/* MOVING GOLDEN CELESTIAL BODY (Sun/Moon with Living Halo) */}
          <g className="animate-[moon-drift_18s_ease-in-out_infinite_alternate]">
            {/* Outer Breathing Corona */}
            <circle
              cx="1380"
              cy="340"
              r="135"
              fill="#edaa84"
              opacity="0.22"
              filter="url(#kathmandu-moon-glow)"
              className="animate-[moon-pulse_8s_ease-in-out_infinite]"
            />
            {/* Middle Warm Corona */}
            <circle cx="1380" cy="340" r="70" fill="#ffd0a0" opacity="0.35" filter="url(#soft-blur)" />
            {/* Inner Glowing Body */}
            <circle cx="1380" cy="340" r="44" fill="#fff4e0" opacity="0.88" />
            <circle cx="1375" cy="336" r="40" fill="#ffdfb0" opacity="0.95" />
          </g>

          {/* Tier 1: Far Himalayan Peaks */}
          <path
            d="M0 485 L140 420 L280 475 L450 395 L620 460 L800 380 L960 450 L1180 370 L1350 440 L1500 390 L1600 435 L1600 900 L0 900 Z"
            fill="url(#kathmandu-ridge-far)"
            opacity="0.52"
          />

          {/* Tier 2: Drifting Valley Haze Wave */}
          <g className="animate-[cloud-drift-reverse_48s_linear_infinite]" opacity="0.6">
            <path d="M-400 540 Q0 510 400 550 T1200 535 T2000 550 L2000 700 L-400 700 Z" fill="url(#kathmandu-haze)" />
          </g>

          {/* Tier 3: Midground Mountain Ridge */}
          <path
            d="M0 580 Q200 510 420 565 T880 540 T1320 550 Q1480 520 1600 560 L1600 900 L0 900 Z"
            fill="url(#kathmandu-ridge)"
            opacity="0.82"
          />

          {/* Tier 4: Lower Valley Ridge */}
          <path
            d="M0 665 Q220 620 480 655 T960 640 T1420 650 Q1520 630 1600 660 L1600 900 L0 900 Z"
            fill="url(#kathmandu-city)"
            opacity="0.92"
          />

          {/* LIVING KATHMANDU VALLEY FLOOR LIGHTS (Organically Twinkling) */}
          <g>
            {kathmanduLights.map((light) => (
              <circle
                key={light.id}
                cx={light.x}
                cy={light.y}
                r={light.r}
                fill={light.color}
                className="animate-[city-light-twinkle_2s_ease-in-out_infinite]"
                style={{
                  animationDelay: `${light.delay}s`,
                  animationDuration: `${light.duration}s`
                }}
              />
            ))}
          </g>

          {/* Tier 5: Foreground Valley Floor */}
          <path
            d="M0 830 Q260 795 540 825 T1120 810 Q1380 795 1600 820 L1600 900 L0 900 Z"
            fill="#12161e"
            opacity="0.88"
          />
        </svg>

        {/* Floating Ambient Sun Dust Motes */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#fed8b1]/60 blur-[0.5px] animate-[dust-float_6s_ease-in-out_infinite]"
              style={{
                width: `${2 + (i % 3) * 1.5}px`,
                height: `${2 + (i % 3) * 1.5}px`,
                left: `${15 + (i * 7.3) % 75}%`,
                top: `${40 + (i * 5.2) % 45}%`,
                animationDelay: `${(i * 0.7) % 4}s`,
                animationDuration: `${5 + (i * 0.8) % 4}s`
              }}
            />
          ))}
        </div>

        {/* Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118]/60 via-transparent to-[#0a0e18]/25" />
      </div>
    )
  }

  // =========================================================================
  // THEME 2: SAMURAI AT DUSK (Living Scene)
  // =========================================================================
  if (wallpaperId === 'samurai') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0e0d14]">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090810] via-[#1c121e] to-[#351624]" />

        {/* Twinkling Cosmic Stars */}
        <div className="absolute inset-0">
          {stars.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white/70 animate-[star-twinkle_3s_ease-in-out_infinite]"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                left: `${s.x}%`,
                top: `${s.y}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`
              }}
            />
          ))}
        </div>

        {/* LIVING CRIMSON BLOOD MOON (Drifting & Breathing) */}
        <div className="absolute top-[10%] right-[16%] sm:right-[22%] animate-[moon-drift_16s_ease-in-out_infinite_alternate]">
          {/* Pulsing Crimson Halo */}
          <div className="w-52 h-52 sm:w-68 sm:h-68 rounded-full bg-gradient-to-tr from-[#982b35] via-[#dc5a55] to-[#f47278] blur-2xl opacity-60 animate-[moon-pulse_7s_ease-in-out_infinite]" />
          {/* Moon Body */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#7c1d26] via-[#dc5a55] to-[#fae1b8] shadow-[0_0_80px_rgba(220,90,85,0.65)] overflow-hidden">
            {/* Crater shadows */}
            <div className="absolute top-6 left-8 w-14 h-14 rounded-full bg-black/15 blur-[2px]" />
            <div className="absolute bottom-10 right-12 w-20 h-20 rounded-full bg-black/20 blur-[3px]" />
            <div className="absolute top-16 right-20 w-8 h-8 rounded-full bg-black/12 blur-[1px]" />
          </div>
        </div>

        {/* Distant Mountain Ridges */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-[46%] text-[#1a1422] opacity-85" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,224C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L0,320Z" />
        </svg>

        {/* Midground Mountain Silhouette with Rolling Wind Fog */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-[34%] text-[#120f18]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L80,192C160,160,320,96,480,128C640,160,800,288,960,266.7C1120,245,1280,75,1360,32L1440,0L1440,320L0,320Z" />
        </svg>

        {/* Torii / Pagoda Silhouette */}
        <div className="absolute bottom-16 right-10 sm:right-24 opacity-35 text-[#0a0810]">
          <svg width="130" height="130" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 5h20v2H2zm3 2h2v14H5zm11 0h2v14h-2zm-9 3h10v2H7z" />
          </svg>
        </div>

        {/* RISING EMBERS & SPARKS (Living Motion) */}
        <div className="absolute inset-0 overflow-hidden">
          {embers.map((em) => (
            <div
              key={em.id}
              className="absolute rounded-full bg-gradient-to-t from-[#dc5a55] to-[#ffd0a0] shadow-[0_0_8px_#dc5a55] animate-[ember-float_6s_ease-in_infinite]"
              style={{
                left: `${em.left}%`,
                bottom: `${em.bottom}%`,
                width: `${em.size}px`,
                height: `${em.size * 1.5}px`,
                animationDelay: `${em.delay}s`,
                animationDuration: `${em.duration}s`
              }}
            />
          ))}
        </div>

        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>
    )
  }

  // =========================================================================
  // THEME 3: FUJI AT TWILIGHT (Living Scene)
  // =========================================================================
  if (wallpaperId === 'fuji') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#11131c]">
        {/* Sky Dusk Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f111d] via-[#1d2337] to-[#3a2f44]" />

        {/* Twinkling Constellations */}
        <div className="absolute inset-0">
          {stars.slice(0, 36).map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-[#f4f7fc]/75 animate-[star-twinkle_3.5s_ease-in-out_infinite]"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                left: `${s.x}%`,
                top: `${s.y}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`
              }}
            />
          ))}
        </div>

        {/* Periodic Shooting Star */}
        <div className="absolute top-[18%] left-[25%] w-24 h-0.5 bg-gradient-to-r from-transparent via-[#ffd0a0] to-white rounded-full animate-[shooting-star_18s_ease-out_infinite]" />

        {/* LIVING TWILIGHT AURORA & SUN GLOW (Breathing behind Fuji) */}
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-gradient-to-t from-[#e46876]/45 via-[#dca561]/25 to-transparent blur-3xl opacity-80 animate-[fuji-aurora_11s_ease-in-out_infinite]" />

        {/* Delicate Crescent Moon Floating */}
        <div className="absolute top-[14%] left-[16%] animate-[moon-drift_15s_ease-in-out_infinite_alternate]">
          <div className="w-12 h-12 rounded-full bg-[#fff5de] shadow-[0_0_30px_rgba(255,245,222,0.6)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <div className="w-10 h-10 rounded-full bg-[#171c2b] translate-x-2 -translate-y-1" />
          </div>
        </div>

        {/* Mount Fuji Vector */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95vw] max-w-[760px] sm:w-[980px] h-[360px]">
          <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none">
            {/* Fuji mountain body */}
            <path d="M 110 400 L 360 75 Q 400 60 440 75 L 690 400 Z" fill="#181a29" />
            {/* Snowcap with Twilight Highlight */}
            <path d="M 360 75 Q 400 60 440 75 L 490 148 Q 455 175 432 148 Q 405 185 380 152 Q 348 175 310 148 Z" fill="#f0f3f8" opacity="0.9" />
            <path d="M 360 75 Q 400 60 440 75 L 460 110 Q 420 120 400 95 Q 380 120 340 110 Z" fill="#ffffff" opacity="0.95" />
          </svg>
        </div>

        {/* LIVING SEA OF CLOUDS (Unkai rolling across base of Fuji) */}
        <div className="absolute bottom-6 inset-x-0 h-36 overflow-hidden opacity-60">
          <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-[#2b354f]/50 to-transparent blur-md animate-[cloud-drift-slow_32s_linear_infinite]" />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-28 overflow-hidden opacity-50">
          <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-[#1a2133]/60 to-transparent blur-lg animate-[cloud-drift-reverse_42s_linear_infinite]" />
        </div>

        {/* Base Fog Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0e0f17] via-[#0e0f17]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(10,12,18,0.72)_100%)]" />
      </div>
    )
  }

  // =========================================================================
  // THEME 4: MOONLIT SAKURA (Living Scene)
  // =========================================================================
  if (wallpaperId === 'sakura') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0e0f18]">
        {/* Deep night gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090a12] via-[#141523] to-[#251b2c]" />

        {/* Stars */}
        <div className="absolute inset-0">
          {stars.slice(0, 30).map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full bg-white/70 animate-[star-twinkle_3s_ease-in-out_infinite]"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                left: `${s.x}%`,
                top: `${s.y}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`
              }}
            />
          ))}
        </div>

        {/* LIVING PEARL FULL MOON (Floating with Luminous Halo) */}
        <div className="absolute top-16 left-16 sm:left-28 animate-[moon-drift_16s_ease-in-out_infinite_alternate]">
          {/* Lunar Halo */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#f2ecd6] blur-2xl opacity-35 animate-[moon-pulse_7s_ease-in-out_infinite]" />
          {/* Moon Core */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#dfd7be] via-[#f7f2e1] to-[#ffffff] shadow-[0_0_90px_rgba(242,236,214,0.5)]">
            <div className="absolute top-8 left-8 w-10 h-10 rounded-full bg-[#c9bf9e]/20 blur-[2px]" />
            <div className="absolute bottom-10 right-10 w-14 h-14 rounded-full bg-[#c9bf9e]/25 blur-[3px]" />
          </div>
        </div>

        {/* Sakura Tree branches */}
        <svg className="absolute top-0 right-0 w-[95vw] max-w-[450px] sm:w-[620px] h-[420px] text-[#1b1c28]" viewBox="0 0 500 400" fill="none">
          <path d="M500 0 C400 40 320 80 260 180 C220 250 170 280 100 320" stroke="#1c1c2b" strokeWidth="20" strokeLinecap="round" />
          <path d="M350 100 C300 130 270 170 220 180" stroke="#1c1c2b" strokeWidth="9" strokeLinecap="round" />
          <path d="M260 180 C210 210 180 260 140 280" stroke="#1c1c2b" strokeWidth="7" strokeLinecap="round" />
          {/* Static Branch Blossoms */}
          {[
            { cx: 240, cy: 170, r: 8 }, { cx: 270, cy: 190, r: 6 },
            { cx: 310, cy: 120, r: 9 }, { cx: 340, cy: 90, r: 7 },
            { cx: 210, cy: 190, r: 8 }, { cx: 160, cy: 260, r: 7 },
            { cx: 120, cy: 290, r: 9 }, { cx: 90, cy: 330, r: 6 },
            { cx: 180, cy: 240, r: 8 }, { cx: 290, cy: 150, r: 7 }
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#d27e99" opacity="0.9" filter="drop-shadow(0 0 8px #e46876)" />
          ))}
        </svg>

        {/* LIVING FALLING SAKURA PETALS (Swirling Across Scene) */}
        <div className="absolute inset-0 overflow-hidden">
          {petals.map((pet) => (
            <div
              key={pet.id}
              className="absolute animate-[petal-swirl_9s_ease-in-out_infinite]"
              style={{
                left: `${pet.left}%`,
                top: `${pet.top}%`,
                animationDelay: `${pet.delay}s`,
                animationDuration: `${pet.duration}s`
              }}
            >
              <div
                className="rounded-full bg-gradient-to-tr from-[#d27e99] via-[#f2a8be] to-[#ffccd9] shadow-[0_0_6px_rgba(228,104,118,0.4)]"
                style={{
                  width: `${pet.size}px`,
                  height: `${pet.size * 0.7}px`,
                  borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Ambient Mist */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.58)_100%)]" />
      </div>
    )
  }

  // =========================================================================
  // THEME 5: KANAGAWA MINIMAL (Living Scene)
  // =========================================================================
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#171720]">
      {/* Kanagawa Dark base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#13131a] via-[#1a1a24] to-[#121217]" />

      {/* Living Dot Grid with ambient pulsing wave */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(220, 215, 186, 0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* LIVING MINIMALIST CELESTIAL MOON & ORBITAL RING */}
      <div className="absolute top-[14%] right-[20%] animate-[moon-drift_16s_ease-in-out_infinite_alternate]">
        {/* Soft Ambient Cyan Halo */}
        <div className="w-48 h-48 rounded-full bg-[#7e9cd8]/20 blur-3xl animate-[moon-pulse_8s_ease-in-out_infinite]" />
        {/* Luminous Eclipse Core */}
        <div className="absolute inset-6 rounded-full border border-white/25 bg-gradient-to-tr from-[#2d4f67] via-[#54799c] to-[#98bbd9] shadow-[0_0_50px_rgba(126,156,216,0.35)]" />
        {/* Rotating Orbital Arc */}
        <div className="absolute -inset-3 rounded-full border border-[#7e9cd8]/30 border-dashed animate-[spin_35s_linear_infinite]" />
      </div>

      {/* LIVING OCEAN WAVES (Multi-layered undulation) */}
      <div className="absolute bottom-0 inset-x-0 h-72 opacity-25 overflow-hidden">
        {/* Wave 1: Background slow swell */}
        <svg
          viewBox="0 0 1200 240"
          className="absolute inset-0 w-[120%] h-full animate-[wave-undulate-1_10s_ease-in-out_infinite]"
          preserveAspectRatio="none"
        >
          <path d="M0,120 C200,180 400,60 600,120 C800,180 1000,60 1200,120 L1200,240 L0,240 Z" fill="#4d6b8b" />
        </svg>

        {/* Wave 2: Foreground counter-flow */}
        <svg
          viewBox="0 0 1200 240"
          className="absolute inset-0 w-[120%] h-full opacity-70 animate-[wave-undulate-2_14s_ease-in-out_infinite]"
          preserveAspectRatio="none"
        >
          <path d="M0,140 C180,90 380,180 580,130 C780,80 980,170 1200,130 L1200,240 L0,240 Z" fill="#7E9CD8" />
        </svg>
      </div>

      {/* Floating Cyan Oceanic Motes */}
      <div className="absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#8fd0ea]/50 blur-[0.5px] animate-[dust-float_7s_ease-in-out_infinite]"
            style={{
              width: `${2 + (i % 3) * 1.5}px`,
              height: `${2 + (i % 3) * 1.5}px`,
              left: `${10 + (i * 6.5) % 80}%`,
              top: `${50 + (i * 4) % 45}%`,
              animationDelay: `${(i * 0.8) % 5}s`,
              animationDuration: `${6 + (i * 0.6) % 4}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,15,20,0.65)_100%)]" />
    </div>
  )
}
