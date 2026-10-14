import React from 'react'
import { MapPin } from 'lucide-react'

export default function DesktopWorkspace() {
  return (
    <main className="absolute inset-x-0 bottom-[54px] top-0 z-[5] overflow-hidden text-white sm:bottom-[58px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#101522]/50 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#101522]/20 via-transparent to-[#101522]/30 sm:hidden" />
      <img
        src="/swastik-cutout.png"
        alt="Swastik Paudel"
        className="pointer-events-none absolute bottom-0 right-[-9%] z-0 h-[62%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_18px_48px_rgba(8,12,22,0.45)] min-[380px]:right-[-4%] sm:right-[4%] sm:h-[82%] sm:max-w-[48%]"
      />

      <section className="absolute left-5 top-[13%] z-[1] max-w-[72%] sm:left-[12%] sm:top-1/2 sm:max-w-[40%] sm:-translate-y-1/2">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] text-white/70 sm:mb-4 sm:text-xs">
          <MapPin className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
          Kathmandu, Nepal
        </div>
        <h1         className="text-4xl font-semibold tracking-[-0.06em] text-white drop-shadow-[0_2px_18px_rgba(10,14,24,0.35)] sm:text-7xl">
          Swastik<span className="text-[#e5ae73]">.</span>
        </h1>
        <p className="mt-1.5 text-xs text-white/80 drop-shadow sm:mt-3 sm:text-base">
          Software engineer
        </p>
      </section>
    </main>
  )
}
