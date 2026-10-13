import React from 'react'
import { ExternalLink, CheckCircle2, Shield, Zap, Server, Database, Globe } from 'lucide-react'

export default function ExperienceApp() {
  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto text-[#dcd7ba]">
      {/* Header */}
      <div className="space-y-3 border-b border-white/10 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#7e9cd8]/20 text-[#7e9cd8] border border-[#7e9cd8]/30 text-xs font-mono">
            Flagship Engineering Case Study
          </span>
          <span className="text-xs font-mono text-white/50">Madargaach Holdings</span>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            prepNep — Enterprise Exam &amp; Test Engine
          </h1>
          <a
            href="https://prepnep.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7e9cd8] hover:bg-[#6c8ac6] text-[#1f1f28] font-bold text-xs transition-colors shadow"
          >
            Visit prepnep.com
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-xs sm:text-sm text-[#938aa9] font-mono">
          Lead Software Engineer · Architecture, State Engine &amp; Full-Stack Infrastructure
        </p>
      </div>

      {/* Production Live Screenshot Frame */}
      <div className="rounded-2xl border border-white/15 bg-black/40 overflow-hidden shadow-2xl space-y-0">
        <div className="h-8 bg-[#20202e] border-b border-white/10 px-3 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e46876]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#dca561]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#76946a]" />
          </div>
          <div className="font-mono text-[11px] text-white/70 px-3 py-0.5 rounded-md bg-white/5 border border-white/10">
            https://prepnep.com
          </div>
          <div className="w-10" />
        </div>
        <div className="max-h-[380px] overflow-hidden bg-[#121218]">
          <img
            src="./project-previews/prepnep.png"
            alt="prepNep Production Live Preview"
            className="w-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </div>

      {/* High-Level Engineering Deliverables (IP Safe) */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-[#938aa9] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#76946a]" />
          Key Architectural Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#7e9cd8]/20 flex items-center justify-center text-[#7e9cd8]">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">Sub-50ms State Sync</h3>
            <p className="text-[11px] text-[#938aa9] leading-relaxed">
              Designed resilient client-server synchronization capturing student test answers in real time, preventing data loss during intermittent network fluctuations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#dca561]/20 flex items-center justify-center text-[#dca561]">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">High Concurrency Scale</h3>
            <p className="text-[11px] text-[#938aa9] leading-relaxed">
              Engineered scalable infrastructure capable of serving thousands of simultaneous students taking simulated national entrance tests with zero lag.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#76946a]/20 flex items-center justify-center text-[#76946a]">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">PostgreSQL &amp; Redis Cache</h3>
            <p className="text-[11px] text-[#938aa9] leading-relaxed">
              Implemented query indexing, tiered caching for question banks, and automated scoring pipelines providing instant student analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
        <span className="text-[11px] font-mono text-[#938aa9] block uppercase tracking-wider">
          Production Technology Stack
        </span>
        <div className="flex flex-wrap gap-2">
          {['Next.js', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS', 'WebSockets', 'RESTful APIs'].map((t, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#7e9cd8]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
