import React, { useState } from 'react'
import { Printer, Download, ExternalLink, Check, Copy, Briefcase, GraduationCap, Code2, Sparkles, MapPin, Mail, Phone, Github } from 'lucide-react'

export default function ResumeApp() {
  const [copied, setCopied] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleCopyMd = () => {
    const md = `# Swastik Paudel
Software Engineer & Full-Stack Systems Developer
Kathmandu, Nepal | psamarpaudel@gmail.com | +977 976-7929476 | github.com/Swastik45

## Professional Summary
Software Engineer specializing in high-concurrency web platforms, real-time synchronization, and distributed systems. Currently engineering prepNep (prepnep.com) under Madargaach Holdings.

## Experience
Software Engineer — Madargaach Holdings (prepNep · prepnep.com)
- Architected enterprise exam preparation and test engine serving thousands of active students.
- Implemented sub-50ms test session state synchronization and auto-evaluation pipelines.
- Maintained 99.9% uptime during peak exam cycles with PostgreSQL query optimization & Redis caching.

## Key Projects
- prepNep (prepnep.com) — Enterprise exam preparation & testing platform
- ShareAudit (share-audit.vercel.app) — Financial portfolio auditing & dividend analytics
- GovAudit NP (gova-audit-np.vercel.app) — Civic expenditure & municipal budget watchdog
- CarbonCredit (carbon-credit1.vercel.app) — Carbon offset registry & ecological credit ledger
- Lumino (lumino-five.vercel.app) — High-performance responsive web platform
- 2D Shooting Game (GitHub) — Deterministic game engine in Rust with Bevy ECS

## Technical Skills
- Languages: TypeScript, JavaScript, Rust, Python, C/C++, SQL
- Frontend: React 19, Next.js, Tailwind CSS, Redux Toolkit, WebSockets
- Backend: Node.js, Express, PostgreSQL, Redis, REST APIs, GraphQL
- Systems & Cloud: Docker, Linux, Git, CI/CD, Vercel`

    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full bg-[#181824] text-[#dcd7ba]">
      {/* Top Document Toolbar */}
      <div className="p-3 bg-[#20202e] border-b border-white/10 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-white font-medium">Swastik_Paudel_Resume.pdf</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#76946a]/20 text-[#76946a] border border-[#76946a]/30">
            Active / 2026
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#76946a]" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{copied ? 'Copied MD' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7e9cd8] hover:bg-[#6c8ac6] text-[#1f1f28] font-bold transition-colors shadow cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="text-[11px]">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Resume Document Sheet */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Swastik Paudel
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[#7e9cd8] mt-0.5">
                  Software Engineer &bull; Full-Stack Systems &amp; Web Platform Developer
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#76946a]/20 border border-[#76946a]/30 text-[#76946a] text-xs font-mono font-medium">
                🟢 Open to Roles
              </span>
            </div>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap gap-2 text-xs pt-1">
              <a
                href="mailto:psamarpaudel@gmail.com"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors border border-white/5"
              >
                <Mail className="w-3.5 h-3.5 text-[#7e9cd8]" />
                psamarpaudel@gmail.com
              </a>
              <a
                href="tel:+9779767929476"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors border border-white/5"
              >
                <Phone className="w-3.5 h-3.5 text-[#76946a]" />
                +977 976-7929476
              </a>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-white/80 border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-[#e46876]" />
                Kathmandu, Nepal
              </span>
              <a
                href="https://github.com/Swastik45"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors border border-white/5"
              >
                <Github className="w-3.5 h-3.5" />
                github.com/Swastik45
              </a>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dca561] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#dca561]" />
              Work Experience
            </h2>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-white">Software Engineer</h3>
                  <div className="text-xs text-[#7e9cd8] font-mono">
                    Madargaach Holdings &bull; Product: <a href="https://prepnep.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">prepNep (prepnep.com)</a>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#938aa9]">2024 &ndash; Present</span>
              </div>

              <p className="text-xs sm:text-[13px] text-[#dcd7ba]/90 leading-relaxed">
                Lead engineer architecting the high-concurrency exam preparation and mock test platform serving thousands of active students across Nepal.
              </p>

              <div className="space-y-1.5 text-xs text-[#dcd7ba]/80 pt-1">
                <div className="flex items-start gap-2">
                  <span className="text-[#76946a] mt-0.5">&bull;</span>
                  <span>Engineered sub-50ms test question synchronization with offline recovery to protect student progress during unstable connections.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#76946a] mt-0.5">&bull;</span>
                  <span>Optimized PostgreSQL query latency and Redis caching layers for high-throughput automated test evaluation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#76946a] mt-0.5">&bull;</span>
                  <span>Maintained 99.9% platform availability across peak national examination windows.</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {['Next.js', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'].map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-[#7e9cd8]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flagship Projects Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dca561] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#dca561]" />
              Flagship Engineering Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs">ShareAudit</h3>
                  <a href="https://share-audit.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-[#7e9cd8] hover:underline flex items-center gap-1">
                    Live <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-[#938aa9] leading-relaxed">
                  Portfolio analytics, dividend tracking, and automated asset auditing dashboard for retail equity investors.
                </p>
                <div className="text-[10px] font-mono text-white/50">React &bull; Chart.js &bull; TypeScript &bull; Tailwind</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs">GovAudit NP</h3>
                  <a href="https://gova-audit-np.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-[#7e9cd8] hover:underline flex items-center gap-1">
                    Live <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-[#938aa9] leading-relaxed">
                  Civic watchdog platform aggregating municipal budgets and public expenditures for government transparency.
                </p>
                <div className="text-[10px] font-mono text-white/50">React &bull; Open Government Data &bull; TypeScript</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs">CarbonCredit</h3>
                  <a href="https://carbon-credit1.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-[#7e9cd8] hover:underline flex items-center gap-1">
                    Live <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-[#938aa9] leading-relaxed">
                  Decentralized ecological registry for verifiable corporate carbon emissions accounting and certificate retirement.
                </p>
                <div className="text-[10px] font-mono text-white/50">Next.js &bull; React &bull; Web3 Ledger Sync</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-xs">2D Arcade Game (Rust)</h3>
                  <a href="https://github.com/Swastik45" target="_blank" rel="noopener noreferrer" className="text-xs text-[#7e9cd8] hover:underline flex items-center gap-1">
                    Code <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-[#938aa9] leading-relaxed">
                  Deterministic arcade shooter built from scratch in Rust using Bevy Engine and ECS architecture with 120 FPS frame timing.
                </p>
                <div className="text-[10px] font-mono text-white/50">Rust &bull; Bevy ECS &bull; Systems Programming</div>
              </div>
            </div>
          </div>

          {/* Technical Skills Section */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dca561] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#dca561]" />
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-white/60 block font-mono text-[11px] mb-1">Languages:</span>
                <span className="text-white font-medium">TypeScript, JavaScript (ESNext), Rust, Python, C/C++, SQL</span>
              </div>
              <div>
                <span className="text-white/60 block font-mono text-[11px] mb-1">Frontend:</span>
                <span className="text-white font-medium">React 19, Next.js, Tailwind CSS, Redux Toolkit, WebSockets</span>
              </div>
              <div>
                <span className="text-white/60 block font-mono text-[11px] mb-1">Backend &amp; Data:</span>
                <span className="text-white font-medium">Node.js, Express, PostgreSQL, Redis, REST APIs, GraphQL</span>
              </div>
              <div>
                <span className="text-white/60 block font-mono text-[11px] mb-1">Infrastructure:</span>
                <span className="text-white font-medium">Docker, Linux, Git, CI/CD pipelines, Vercel, Microservices</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
