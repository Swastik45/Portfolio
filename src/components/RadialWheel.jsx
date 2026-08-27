import React from 'react'
import { User, Briefcase, FolderGit2, Cpu, Mail } from 'lucide-react'

const sections = [
  { id: 'about',      label: '01. About',    Icon: User },
  { id: 'experience', label: '02. Experience', Icon: Briefcase },
  { id: 'projects',   label: '03. Projects', Icon: FolderGit2 },
  { id: 'skills',     label: '04. Skills',   Icon: Cpu },
  { id: 'contact',    label: '05. Contact',  Icon: Mail },
]

const total = sections.length

export default function RadialWheel({ activeSection, onSelectSection }) {
  const activeIndex = sections.findIndex(s => s.id === activeSection)
  const safeActive  = activeIndex >= 0 ? activeIndex : 0

  return (
    <>
      {/* DESKTOP — large arc */}
      <div className="hidden lg:block relative select-none" style={{ width: 320, height: 600 }}>
        <VerticalArc
          W={320} H={600}
          cx={300} R={240}
          spreadDeg={26}
          activeIndex={safeActive}
          onSelect={onSelectSection}
          gradId="arcGradDesktop"
          small={false}
        />
      </div>

      {/* MOBILE — same arc, tighter dimensions */}
      <div className="lg:hidden relative select-none" style={{ width: 210, height: 400 }}>
        <VerticalArc
          W={210} H={400}
          cx={200} R={140}
          spreadDeg={24}
          activeIndex={safeActive}
          onSelect={onSelectSection}
          gradId="arcGradMobile"
          small={true}
        />
      </div>
    </>
  )
}

/**
 * VerticalArc
 *
 * Geometry:
 *   The arc is a left-curving semicircle:
 *     Start:  (cx, cy − R)  ← top
 *     Apex:   (cx − R, cy)  ← leftmost, center vertically  ← NODES CENTERED HERE
 *     End:    (cx, cy + R)  ← bottom
 *
 *   Nodes are placed along this arc by angle measured from the POSITIVE-X axis:
 *     180°  = apex (leftmost point)   ← center node lives here
 *     180° + spread * k  = above apex (SVG y decreases → upper half of arc)
 *     180° − spread * k  = below apex (SVG y increases → lower half of arc)
 */
function VerticalArc({ W, H, cx, R, spreadDeg, activeIndex, onSelect, gradId, small }) {
  const cy      = H / 2
  const arcPath = `M ${cx} ${cy - R} A ${R} ${R} 0 0 0 ${cx} ${cy + R}`

  return (
    <>
      {/* SVG arc track */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={W} height={H}
        viewBox={`0 0 ${W} ${H}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* dashed ghost track */}
        <path d={arcPath} fill="none"
          stroke="rgba(51,65,85,0.4)"
          strokeWidth={small ? 1.5 : 2}
          strokeDasharray="5 7"
        />
        {/* glowing arc */}
        <path d={arcPath} fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={small ? 2 : 3}
        />
      </svg>

      {/* Nodes — centered on the arc at their computed (nx, ny) */}
      {sections.map((sec, idx) => {
        const isActive = idx === activeIndex

        /*
         * Center node (idx = 2) → 180°
         * Nodes above center   → 180° + positive offset  (SVG y decreases = visually higher)
         * Nodes below center   → 180° − positive offset  (SVG y increases = visually lower)
         */
        const offsetSteps = idx - (total - 1) / 2          // −2 … +2
        const angleDeg    = 180 + offsetSteps * spreadDeg  // base 180° = left apex
        const angleRad    = angleDeg * (Math.PI / 180)

        const nx = cx + R * Math.cos(angleRad)
        const ny = cy + R * Math.sin(angleRad)

        return (
          <button
            key={sec.id}
            onClick={() => onSelect(sec.id)}
            style={{
              position:  'absolute',
              left:      nx,
              top:       ny,
              transform: 'translate(-50%, -50%)',
            }}
            className={`
              flex items-center whitespace-nowrap font-bold
              transition-all duration-300 shadow-lg rounded-full
              ${small
                ? 'gap-1.5 px-2.5 py-1.5 text-[10px]'
                : 'gap-2.5 px-4    py-2.5 text-xs'}
              ${isActive
                ? 'bg-blue-600 text-white border-2 border-blue-400 scale-110 z-30 shadow-blue-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 hover:scale-105 z-20'}
            `}
          >
            <span className={`
              rounded-full
              ${isActive ? 'bg-blue-500/30' : 'bg-slate-950'}
              ${small ? 'p-0.5' : 'p-1'}
            `}>
              <sec.Icon className={small ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            </span>
            <span>{sec.label}</span>
          </button>
        )
      })}
    </>
  )
}
