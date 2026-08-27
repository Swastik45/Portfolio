import React, { useState } from 'react'
import { User, Briefcase, FolderGit2, Cpu, Mail } from 'lucide-react'

const sections = [
  { id: 'about',      num: '01', label: 'About',    Icon: User },
  { id: 'experience', num: '02', label: 'Experience', Icon: Briefcase },
  { id: 'projects',   num: '03', label: 'Projects', Icon: FolderGit2 },
  { id: 'skills',     num: '04', label: 'Skills',   Icon: Cpu },
  { id: 'contact',    num: '05', label: 'Contact',  Icon: Mail },
]

const total = sections.length

export default function SideNav({ activeSection, onSelectSection }) {
  const activeIndex = Math.max(0, sections.findIndex(s => s.id === activeSection))
  const fillPct     = (activeIndex / (total - 1)) * 100

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP  —  vertical dot rail
          ══════════════════════════════════════ */}
      <div className="hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-50 select-none">
        <div className="relative flex flex-col" style={{ gap: 0 }}>

          {/* Ghost rail */}
          <div
            className="absolute w-0.5 bg-slate-800 rounded-full"
            style={{ left: 9, top: 20, bottom: 20 }}
          />

          {/* Filled rail */}
          <div
            className="absolute w-0.5 rounded-full transition-all duration-700 ease-out"
            style={{
              left:       9,
              top:        20,
              height:     `calc(${fillPct / 100} * (100% - 40px))`,
              background: 'linear-gradient(to bottom, #3b82f6, #6366f1, #06b6d4)',
              boxShadow:  '0 0 8px rgba(99,102,241,0.6)',
            }}
          />

          {sections.map((sec, idx) => {
            const isActive = idx === activeIndex

            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className="relative flex items-center gap-4 group text-left"
                style={{ paddingBlock: 22 }}
              >
                {/* Dot */}
                <span className="relative z-10 flex-shrink-0 flex items-center justify-center"
                  style={{ width: 20, height: 20 }}>
                  {isActive && (
                    <span
                      className="absolute rounded-full animate-ping"
                      style={{
                        inset: -4,
                        background: 'rgba(59,130,246,0.25)',
                      }}
                    />
                  )}
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width:     isActive ? 18 : 10,
                      height:    isActive ? 18 : 10,
                      background: isActive
                        ? 'radial-gradient(circle, #60a5fa, #3b82f6)'
                        : '#334155',
                      boxShadow: isActive
                        ? '0 0 16px rgba(59,130,246,0.9), 0 0 32px rgba(59,130,246,0.4)'
                        : 'none',
                    }}
                  />
                </span>

                {/* Text — always shown */}
                <span className="flex flex-col leading-tight">
                  <span
                    className="font-black tracking-[0.18em] uppercase transition-colors duration-300"
                    style={{
                      fontSize:    9,
                      color:       isActive ? '#60a5fa' : '#475569',
                      letterSpacing: '0.18em',
                    }}
                  >
                    {sec.num}
                  </span>
                  <span
                    className="font-semibold transition-all duration-300"
                    style={{
                      fontSize: 13,
                      color:    isActive ? '#f1f5f9' : '#64748b',
                    }}
                  >
                    {sec.label}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE  —  bottom dock
          ══════════════════════════════════════ */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-50"
        style={{ background: 'rgba(8,10,20,0.96)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        {/* top border glow */}
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5), transparent)' }} />

        <div className="flex items-center justify-around"
          style={{ height: 68, paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {sections.map((sec, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className="flex flex-col items-center justify-center gap-1 transition-all duration-300"
                style={{
                  minWidth:  56,
                  transform: isActive ? 'translateY(-3px)' : 'none',
                  opacity:   isActive ? 1 : 0.45,
                }}
              >
                {/* Active glow pip above icon */}
                <span
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      isActive ? 24 : 0,
                    height:     2,
                    marginBottom: 4,
                    background: '#60a5fa',
                    boxShadow:  isActive ? '0 0 10px rgba(96,165,250,0.9)' : 'none',
                  }}
                />
                <sec.Icon
                  style={{
                    width:  22,
                    height: 22,
                    color:  isActive ? '#60a5fa' : '#94a3b8',
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
                <span
                  style={{
                    fontSize:    10,
                    fontWeight:  700,
                    letterSpacing: '0.1em',
                    color:       isActive ? '#93c5fd' : '#475569',
                    transition:  'color 0.3s',
                  }}
                >
                  {sec.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
