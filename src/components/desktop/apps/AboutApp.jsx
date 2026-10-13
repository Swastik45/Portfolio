import React, { useState, useEffect } from 'react'
import { MapPin, Globe, Sparkles, Code2, ArrowRight, Mail, Terminal, Layers, Clock } from 'lucide-react'

export default function AboutApp({ onOpenApp }) {
  const [localTime, setLocalTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      try {
        const str = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kathmandu',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now)
        setLocalTime(str)
      } catch {
        setLocalTime(now.toLocaleTimeString())
      }
    }
    updateTime()
    const t = setInterval(updateTime, 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto text-[#dcd7ba]">
      {/* Header Profile Title */}
      <div className="space-y-2 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#7e9cd8]/20 text-[#7e9cd8] border border-[#7e9cd8]/30">
            Senior Engineering Profile
          </span>
          <span className="text-xs font-mono text-white/40">Kathmandu, Nepal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Swastik Paudel
        </h1>
        <p className="text-sm font-mono text-[#938aa9]">
          Software Engineer · Full-Stack Systems &amp; Web Platform Developer
        </p>
      </div>

      {/* Main Prose */}
      <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#dcd7ba]/90 font-sans">
        <p>
          I am a Software Engineer based in Kathmandu, Nepal, specializing in building high-availability web platforms, real-time synchronization engines, and performance-critical systems.
        </p>
        <p>
          Currently, I lead engineering on <strong className="text-white">prepNep</strong> (<a href="https://prepnep.com" target="_blank" rel="noopener noreferrer" className="text-[#7e9cd8] hover:underline">prepnep.com</a>) under Madargaach Holdings. I architected our concurrent exam test platform from the ground up, implementing low-latency state synchronization, resilient database sharding, and automated scoring pipelines for thousands of Nepali students.
        </p>
        <p>
          Beyond web platforms, I have a deep passion for low-level systems and deterministic software. I experiment extensively with <strong className="text-white">Rust</strong>, game engines (Bevy), ECS architectures, and distributed microservices.
        </p>
      </div>

      {/* Bento Meta Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#938aa9]">
            <Globe className="w-3.5 h-3.5 text-[#7e9cd8]" />
            <span>Current Role</span>
          </div>
          <div className="text-xs font-bold text-white">prepNep</div>
          <div className="text-[11px] text-white/60">Madargaach Holdings</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#938aa9]">
            <MapPin className="w-3.5 h-3.5 text-[#e46876]" />
            <span>Location &amp; TZ</span>
          </div>
          <div className="text-xs font-bold text-white">Kathmandu, Nepal</div>
          <div className="text-[11px] font-mono text-[#7e9cd8]">{localTime || 'UTC+5:45'}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#938aa9]">
            <Sparkles className="w-3.5 h-3.5 text-[#76946a]" />
            <span>Availability</span>
          </div>
          <div className="text-xs font-bold text-[#76946a]">Open for Roles</div>
          <div className="text-[11px] text-white/60">Contract &amp; Full-Time</div>
        </div>
      </div>

      {/* Engineering Principles */}
      <div className="space-y-3 pt-2 border-t border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#938aa9]">
          Engineering Principles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#7e9cd8]" />
              Zero AI-Generic Facades
            </div>
            <p className="text-[11px] text-[#938aa9] leading-relaxed">
              Real human engineering with thoughtful typography, strict type safety, clean abstractions, and high execution speed.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#dca561]" />
              Resilient Architecture
            </div>
            <p className="text-[11px] text-[#938aa9] leading-relaxed">
              Designing databases, caching layers, and frontends that gracefully handle high concurrency and network drops.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2.5">
        <button
          onClick={() => onOpenApp('experience')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7e9cd8] hover:bg-[#6c8ac6] text-[#1f1f28] font-bold text-xs transition-colors shadow"
        >
          View prepNep Case Study
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onOpenApp('projects')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors"
        >
          Browse All Projects
        </button>

        <button
          onClick={() => onOpenApp('mail')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          Send Message
        </button>
      </div>
    </div>
  )
}
