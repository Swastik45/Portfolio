import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Github, Mail, MapPin, Check, Copy, Clock, Globe, Terminal, Sparkles, Search } from 'lucide-react'

export default function About({ onOpenCommandPalette }) {
  const [copied, setCopied] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const email = 'psamarpaudel@gmail.com'

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kathmandu',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date())
        setLocalTime(timeStr)
      } catch {
        setLocalTime('UTC+5:45')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Interactive Bento Grid (Photo completely removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Main Hero Card (8 cols on desktop) */}
          <div className="md:col-span-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for software engineering roles</span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
                  Swastik Paudel
                </h1>
                <p className="text-base sm:text-lg text-zinc-400 font-mono">
                  Full-Stack Software Engineer &amp; Systems Developer
                </p>
              </div>

              {/* High-Signal Bio */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-normal">
                I design and build resilient web applications, financial auditing engines, and distributed systems.
                Focused on clean architecture, low-latency performance, and intuitive interfaces. Currently lead developer on{' '}
                <a
                  href="https://prepnep.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-100 underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-200 transition-colors font-medium"
                >
                  prepNep
                </a>{' '}
                (prepnep.com), alongside active works in financial analytics and systems engineering.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-sans font-semibold transition-colors shadow-sm"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Swastik45"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-zinc-400" />
                <span>GitHub Profile</span>
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
                title="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-zinc-500" />
                <span>Search (⌘K)</span>
              </button>
            </div>
          </div>

          {/* Right Column Bento Tiles (4 cols on desktop) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            
            {/* Tile 2: Flagship Product Highlight */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3 shadow-lg flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="uppercase tracking-wider">Current Focus</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-800 text-[10px]">
                    Production
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-100 tracking-tight">
                  prepNep Platform
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Nepal's multi-track entrance prep ecosystem. Built with Next.js, React 19, Redis, and PostgreSQL.
                </p>
              </div>

              <a
                href="https://prepnep.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>prepnep.com</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

            {/* Tile 3: Live Telemetry & Location */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3 shadow-lg font-mono text-xs">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 block">
                Telemetry &amp; Local Time
              </span>

              <div className="space-y-2 text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Location</span>
                  </span>
                  <span>Kathmandu, Nepal</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Local Time</span>
                  </span>
                  <span className="text-zinc-200">{localTime || 'UTC+5:45'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                <span>Contact: psamarpaudel@gmail.com</span>
              </div>
            </div>

          </div>

        </div>

        {/* Core Engineering Pillars Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-1">
            <span className="text-zinc-300 font-semibold block">Full-Stack Architecture</span>
            <p className="text-zinc-500 text-[11px] font-sans">Next.js 16, React 19, TypeScript, PostgreSQL &amp; Redis</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-1">
            <span className="text-zinc-300 font-semibold block">FinTech &amp; Systems</span>
            <p className="text-zinc-500 text-[11px] font-sans">NEPSE scraping, tax &amp; risk analytics, OSINT data pipelines</p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 space-y-1">
            <span className="text-zinc-300 font-semibold block">Mobile &amp; Engine Dev</span>
            <p className="text-zinc-500 text-[11px] font-sans">Capacitor Android releases, Rust &amp; Bevy Engine (ECS)</p>
          </div>
        </div>

      </div>
    </section>
  )
}