import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Mail, Terminal } from 'lucide-react'

function TypingSimple({ texts = [], typingSpeed = 80, deletingSpeed = 45, pause = 1300 }) {
  const [index, setIndex]           = useState(0)
  const [charIndex, setCharIndex]   = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!texts.length) return
    const current = texts[index] || ''
    let t
    if (!isDeleting) {
      if (charIndex < current.length) t = setTimeout(() => setCharIndex(p => p + 1), typingSpeed)
      else t = setTimeout(() => setIsDeleting(true), pause)
    } else {
      if (charIndex > 0) t = setTimeout(() => setCharIndex(p => p - 1), deletingSpeed)
      else { setIsDeleting(false); setIndex(p => (p + 1) % texts.length); setCharIndex(0) }
    }
    return () => clearTimeout(t)
  }, [charIndex, isDeleting, index, texts, typingSpeed, deletingSpeed, pause])

  return (
    <div className="flex items-center h-6">
      <span className="text-[10px] lg:text-sm font-bold text-blue-300 font-mono">
        {(texts[index] || '').slice(0, charIndex)}
      </span>
      <span className="w-0.5 h-3 ml-1 bg-blue-400 animate-pulse" />
    </div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Explicit flex row — ALWAYS side by side on every screen size */}
      <div
        className="flex flex-row lg:pl-52 xl:pl-64"
        style={{ minHeight: '100svh' }}
      >

        {/* ── LEFT: text ── */}
        <div
          className="flex flex-col justify-center py-12 space-y-3 lg:space-y-5 shrink-0"
          style={{ width: '50%', paddingInline: 'clamp(12px, 4vw, 48px)' }}
        >
          <span
            className="font-black text-blue-400 uppercase tracking-widest"
            style={{ fontSize: 'clamp(8px, 1.8vw, 12px)' }}
          >
            Software Engineer
          </span>

          <h1
            className="font-black text-white tracking-tight leading-tight"
            style={{ fontSize: 'clamp(20px, 5.5vw, 72px)' }}
          >
            Swastik{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Paudel
            </span>
          </h1>

          <p
            className="text-slate-400 leading-relaxed"
            style={{ fontSize: 'clamp(10px, 1.8vw, 18px)' }}
          >
            Full-Stack Systems &amp; Web Application Developer
          </p>

          <div className="flex items-center gap-1.5">
            <Terminal className="shrink-0 text-blue-400" style={{ width: 'clamp(10px, 2vw, 16px)', height: 'clamp(10px, 2vw, 16px)' }} />
            <TypingSimple
              texts={[
                'Full-Stack Software Engineer',
                'Systems Architect & OSINT Dev',
                'Game Engineer · Rust & Bevy',
              ]}
            />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-1">
            <a
              href="https://github.com/Swastik45"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg"
              style={{ padding: 'clamp(6px,1.5vw,14px) clamp(10px,3vw,28px)', fontSize: 'clamp(9px,1.6vw,14px)' }}
            >
              GitHub <ArrowUpRight style={{ width: 'clamp(9px,1.5vw,16px)', height: 'clamp(9px,1.5vw,16px)' }} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1 bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg font-semibold transition-all duration-300"
              style={{ padding: 'clamp(6px,1.5vw,14px) clamp(10px,3vw,28px)', fontSize: 'clamp(9px,1.6vw,14px)' }}
            >
              <Mail className="text-blue-400" style={{ width: 'clamp(9px,1.5vw,16px)', height: 'clamp(9px,1.5vw,16px)' }} />
              Contact
            </a>
          </div>
        </div>

        {/* ── RIGHT: photo fills the other half ── */}
        <div
          className="relative overflow-hidden shrink-0"
          style={{ width: '50%' }}
        >
          {/* Subtle glow behind photo */}
          <div className="absolute inset-0 bg-gradient-to-l from-blue-600/10 via-transparent to-transparent pointer-events-none" />

          <img
            src="./swastik-cutout.png"
            alt="Swastik Paudel"
            className="absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none"
            style={{ filter: 'drop-shadow(-12px 0 32px rgba(0,0,0,0.7))' }}
          />

          {/* bottom vignette */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: '20%', background: 'linear-gradient(to top, #080a14, transparent)' }}
          />
        </div>

      </div>
    </section>
  )
}