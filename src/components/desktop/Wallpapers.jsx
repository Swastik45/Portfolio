import React from 'react'

export default function WallpaperBackground({ wallpaperId }) {
  if (wallpaperId === 'samurai') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#121217]">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c12] via-[#1a1420] to-[#2b1723]" />
        
        {/* Stars */}
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ddd, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 160px 120px, #fff, rgba(0,0,0,0))',
            backgroundSize: '250px 250px'
          }} 
        />

        {/* Crimson Blood Moon */}
        <div className="absolute top-[12%] right-[18%] sm:right-[24%] w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#982b35] via-[#dc5a55] to-[#f2ecd6] shadow-[0_0_90px_rgba(220,90,85,0.45)] opacity-90" />

        {/* Distant Mountains Silhouette */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-[45%] text-[#1a1622] opacity-80" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,224C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L0,320Z" />
        </svg>

        {/* Midground Mountain Silhouette */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-[32%] text-[#14121b]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,224L80,192C160,160,320,96,480,128C640,160,800,288,960,266.7C1120,245,1280,75,1360,32L1440,0L1440,320L0,320Z" />
        </svg>

        {/* Torii / Pagoda Silhouette accent */}
        <div className="absolute bottom-16 right-12 sm:right-28 opacity-30 text-[#0e0d13]">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 5h20v2H2zm3 2h2v14H5zm11 0h2v14h-2zm-9 3h10v2H7z" />
          </svg>
        </div>

        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </div>
    )
  }

  if (wallpaperId === 'fuji') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#141620]">
        {/* Sky Dusk Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141622] via-[#222a3f] to-[#3d3a52]" />

        {/* Ambient Twilight Sun Glow */}
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-t from-[#e46876]/40 via-[#dca561]/20 to-transparent blur-3xl opacity-75" />

        {/* Mount Fuji Vector */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[960px] h-[340px]">
          <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none">
            {/* Fuji mountain body */}
            <path d="M 120 400 L 360 80 Q 400 65 440 80 L 680 400 Z" fill="#1b1c2b" />
            {/* Snowcap */}
            <path d="M 360 80 Q 400 65 440 80 L 485 145 Q 450 170 430 145 Q 405 180 380 150 Q 350 170 315 145 Z" fill="#e8ecf2" opacity="0.85" />
          </svg>
        </div>

        {/* Base Treeline / Fog */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#10111a] via-[#10111a]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(10,12,18,0.7)_100%)]" />
      </div>
    )
  }

  if (wallpaperId === 'sakura') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#13141f]">
        {/* Deep night gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f18] via-[#171826] to-[#231e2f]" />

        {/* Moon */}
        <div className="absolute top-20 left-24 w-40 h-40 rounded-full bg-[#f2ecd6] shadow-[0_0_80px_rgba(242,236,214,0.35)] opacity-85" />

        {/* Tree branches with glowing petals */}
        <svg className="absolute top-0 right-0 w-[420px] sm:w-[600px] h-[400px] text-[#1b1c28]" viewBox="0 0 500 400" fill="none">
          <path d="M500 0 C400 40 320 80 260 180 C220 250 170 280 100 320" stroke="#1f2030" strokeWidth="18" strokeLinecap="round" />
          <path d="M350 100 C300 130 270 170 220 180" stroke="#1f2030" strokeWidth="8" strokeLinecap="round" />
          <path d="M260 180 C210 210 180 260 140 280" stroke="#1f2030" strokeWidth="6" strokeLinecap="round" />
          {/* Sakura Petals */}
          {[
            { cx: 240, cy: 170, r: 8 }, { cx: 270, cy: 190, r: 6 },
            { cx: 310, cy: 120, r: 9 }, { cx: 340, cy: 90, r: 7 },
            { cx: 210, cy: 190, r: 8 }, { cx: 160, cy: 260, r: 7 },
            { cx: 120, cy: 290, r: 9 }, { cx: 90, cy: 330, r: 6 },
            { cx: 180, cy: 240, r: 8 }, { cx: 290, cy: 150, r: 7 },
            { cx: 230, cy: 220, r: 6 }, { cx: 140, cy: 310, r: 8 }
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#d27e99" opacity="0.85" filter="drop-shadow(0 0 6px #e46876)" />
          ))}
        </svg>

        {/* Ambient Mist */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      </div>
    )
  }

  // Default: Kanagawa Minimal Theme
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#1F1F28]">
      {/* Kanagawa Dark base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181820] via-[#1F1F28] to-[#14141a]" />
      
      {/* Architectural Dot Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(220, 215, 186, 0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Subtle Kanagawa Wave Crest Accent in background */}
      <div className="absolute bottom-0 inset-x-0 h-64 opacity-10">
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,100 C150,160 350,40 500,100 C650,160 850,40 1000,100 C1100,140 1150,80 1200,100 L1200,200 L0,200 Z" fill="#7E9CD8" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,15,20,0.6)_100%)]" />
    </div>
  )
}
