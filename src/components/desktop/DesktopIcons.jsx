import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export function ShortcutGlyph({ type, className = 'h-9 w-9' }) {
  if (type === 'folder') {
    return (
      <svg viewBox="0 0 48 40" className={`${className} drop-shadow-[0_2px_2px_rgba(0,0,0,.3)]`} aria-hidden="true">
        <path d="M3 8a4 4 0 0 1 4-4h12l4 5h18a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" fill="#E7A82F" />
        <path d="M3 14a3 3 0 0 1 3-3h36a3 3 0 0 1 3 3v18a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V14Z" fill="#FFD66B" />
        <path d="M3 17h42v4H3z" fill="#F5BE48" />
      </svg>
    )
  }

  if (type === 'text' || type === 'pdf' || type === 'case') {
    const isPdf = type === 'pdf'
    const isCase = type === 'case'
    const accent = isPdf ? '#D94A45' : isCase ? '#2878D0' : '#2379B9'
    return (
      <svg viewBox="0 0 40 48" className={`${className} drop-shadow-[0_2px_2px_rgba(0,0,0,.3)]`} aria-hidden="true">
        <path d="M7 2h17l11 11v29a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z" fill="#F8FAFC" />
        <path d="M24 2v9a3 3 0 0 0 3 3h8L24 2Z" fill="#DCE5EF" />
        {isPdf ? (
          <>
            <path d="M9 23h22v12H9z" rx="2" fill={accent} />
            <text x="20" y="32" fill="white" fontSize="8" textAnchor="middle" fontWeight="700">PDF</text>
          </>
        ) : isCase ? (
          <>
            <path d="M11 23h18v12H11z" fill="#D9EAFB" />
            <path d="M15 23v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" fill="none" stroke={accent} strokeWidth="2" />
            <path d="M11 27h18" stroke={accent} strokeWidth="2" />
          </>
        ) : (
          <>
            <path d="M10 21h19M10 26h19M10 31h14M10 36h17" stroke={accent} strokeWidth="2" strokeLinecap="round" />
            <path d="M7 18h2M7 23h2M7 28h2M7 33h2M7 38h2" stroke="#B6C5D5" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </svg>
    )
  }

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 48 40" className={`${className} drop-shadow-[0_2px_2px_rgba(0,0,0,.3)]`} aria-hidden="true">
        <rect x="3" y="5" width="42" height="30" rx="5" fill="#1473C9" />
        <path d="m6 10 18 14 18-14" fill="none" stroke="#F7FBFF" strokeWidth="4" strokeLinejoin="round" />
        <path d="M6 31 19 20m23 11L29 20" fill="none" stroke="#C9E5FF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'system') {
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9 drop-shadow-[0_2px_2px_rgba(0,0,0,.3)]" aria-hidden="true">
        <rect x="13" y="13" width="22" height="22" rx="4" fill="#8C6CC8" />
        <rect x="19" y="19" width="10" height="10" rx="2" fill="#E8DFFF" />
        <path d="M18 5v8m12-8v8M18 35v8m12-8v8M5 18h8m-8 12h8m22-12h8m-8 12h8" stroke="#D4C1F5" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'terminal') {
    return (
      <svg viewBox="0 0 48 48" className={`${className} drop-shadow-[0_2px_2px_rgba(0,0,0,.3)]`} aria-hidden="true">
        <rect x="3" y="6" width="42" height="34" rx="5" fill="#253442" />
        <path d="m12 17 6 5-6 5m11 1h9" fill="none" stroke="#D9ECFB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 44h16m-8-4v4" stroke="#A7C1D8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'music') {
    return (
      <svg viewBox="0 0 48 48" className={`${className} drop-shadow-[0_2px_2px_rgba(0,0,0,.3)]`} aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="9" fill="#2878D0" />
        <circle cx="24" cy="24" r="13" fill="#EAF6FF" />
        <path d="M22 17v14l11-7-11-7Z" fill="#1769AA" />
        <path d="M12 37h24" stroke="#B8E2FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9 drop-shadow-[0_2px_2px_rgba(0,0,0,.3)]" aria-hidden="true">
      <rect x="4" y="4" width="40" height="40" rx="9" fill={type === 'assistant' ? '#B73E4A' : '#2878D0'} />
      {type === 'assistant' ? (
        <path d="M15 17a9 9 0 0 1 16 6l4 5-6-1a9 9 0 0 1-14-10Zm4 4h.1m6 0h.1" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <>
          <path d="M13 12h9v10h-9zm13 0h9v10h-9zM13 26h9v10h-9zm13 0h9v10h-9z" fill="#EAF4FF" />
          <path d="M23 12v24" stroke="#A9D4FF" strokeWidth="1.5" />
        </>
      )}
    </svg>
  )
}

const DESKTOP_FILES = [
  {
    id: 'about',
    label: 'About Swastik.txt',
    appId: 'about',
    kind: 'TXT file',
    iconType: 'text',
    extension: 'TXT'
  },
  {
    id: 'projects',
    label: 'Projects',
    appId: 'projects',
    kind: 'Folder',
    iconType: 'folder'
  },
  {
    id: 'experience',
    label: 'prepNep case study',
    appId: 'experience',
    kind: 'Case study',
    iconType: 'case',
    extension: 'CASE'
  },
  {
    id: 'skills',
    label: 'Systems Lab',
    appId: 'skills',
    kind: 'App',
    iconType: 'system'
  },
  {
    id: 'resume',
    label: 'Résumé.pdf',
    appId: 'resume',
    kind: 'PDF document',
    iconType: 'pdf',
    extension: 'PDF'
  },
  {
    id: 'ask',
    label: 'Ask Swastik',
    appId: 'ask',
    kind: 'Assistant app',
    iconType: 'assistant'
  },
  {
    id: 'mail',
    label: 'Contact',
    appId: 'mail',
    kind: 'Mail app',
    iconType: 'mail'
  }
]

export default function DesktopIcons({ onOpenApp }) {
  const openShortcut = (appId) => {
    onOpenApp(appId)
  }

  return (
    <div
      className="absolute left-2 top-2 z-10 hidden select-none sm:bottom-[68px] sm:left-3 sm:top-3 sm:flex sm:flex-col sm:gap-1.5"
      aria-label="Desktop files and shortcuts"
    >
      {DESKTOP_FILES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => openShortcut(item.appId)}
          aria-label={`Open ${item.label} (${item.kind})`}
          title={`Open ${item.label}`}
          className="group flex w-[88px] flex-col items-center gap-1 rounded-lg px-1.5 py-2 text-center transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:bg-white/[0.2]"
        >
          <span className="relative flex h-12 w-12 items-center justify-center transition duration-150 group-hover:-translate-y-0.5">
            <ShortcutGlyph type={item.iconType} />
            {item.extension ? (
              <span className="absolute -bottom-1 -right-1 rounded-[4px] border border-[#20242d] bg-[#e9edf2] px-1 py-0.5 text-[7px] font-bold leading-none tracking-tight text-[#293343] shadow">
                {item.extension}
              </span>
            ) : (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#20242d] bg-[#e9edf2] text-[#293343] shadow">
                <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
              </span>
            )}
          </span>
          <span className="max-w-full rounded-[4px] bg-black/25 px-1.5 py-0.5 text-[10px] leading-tight text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] group-hover:bg-black/45">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  )
}
