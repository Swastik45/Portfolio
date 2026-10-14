import React, { useRef, useState } from 'react'
import { Printer, ExternalLink, Check, Copy, Briefcase, Code2, Sparkles, MapPin, Mail, Phone, Github, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

export default function ResumeApp() {
  const [copied, setCopied] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [zoom, setZoom] = useState(100)
  const sheetRef = useRef(null)
  const sections = ['Profile', 'Experience', 'Projects', 'Skills']

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

  const goToSection = (nextIndex) => {
    const boundedIndex = Math.max(0, Math.min(sections.length - 1, nextIndex))
    setSectionIndex(boundedIndex)
    sheetRef.current?.querySelector(`[data-resume-section="${boundedIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className="flex h-full flex-col bg-[#111820] text-[#e8edf3]">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#303b48] bg-[#1a232d] px-3 text-[11px]">
        <span className="flex h-full items-center gap-2 border-b-2 border-[#4da3ff] px-2 font-medium text-[#e8edf3]">
          <span className="rounded-sm bg-[#d94a45] px-1 py-0.5 text-[8px] font-bold leading-none text-white">PDF</span>
          Swastik_Paudel_Resume.pdf
        </span>
        <span className="ml-auto hidden text-[9px] text-[#91a0b1] sm:block">Resume document preview</span>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[#303b48] bg-[#151e27] px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goToSection(sectionIndex - 1)} disabled={sectionIndex === 0} aria-label="Previous resume section" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ChevronLeft className="h-3.5 w-3.5" /></button>
          <span className="min-w-28 text-center text-[10px] text-[#b6c2ce]">{sections[sectionIndex]} · {sectionIndex + 1} of {sections.length}</span>
          <button type="button" onClick={() => goToSection(sectionIndex + 1)} disabled={sectionIndex === sections.length - 1} aria-label="Next resume section" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ChevronRight className="h-3.5 w-3.5" /></button>
          <div className="hidden items-center gap-0.5 border-l border-[#394653] pl-2 lg:flex">
            {sections.map((section, index) => (
              <button type="button" key={section} onClick={() => goToSection(index)} aria-current={sectionIndex === index ? 'location' : undefined} className={`rounded px-2 py-1 text-[9px] ${sectionIndex === index ? 'bg-[#17324d] text-[#8bc4ff]' : 'text-[#91a0b1] hover:bg-[#263442]'}`}>{section}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setZoom((value) => Math.max(70, value - 10))} disabled={zoom <= 70} title="Zoom out" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ZoomOut className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={() => setZoom(100)} title="Reset zoom" className="min-w-10 rounded px-1 py-1.5 text-[10px] text-[#b6c2ce] hover:bg-[#263442]">{zoom}%</button>
          <button type="button" onClick={() => setZoom((value) => Math.min(150, value + 10))} disabled={zoom >= 150} title="Zoom in" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ZoomIn className="h-3.5 w-3.5" /></button>
          <button
            type="button"
            onClick={handleCopyMd}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#394653] bg-[#202b35] px-2.5 py-1.5 text-[#c8d2de] transition-colors hover:bg-[#2a3745]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#76946a]" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden text-[10px] sm:inline">{copied ? 'Copied' : 'Copy text'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2878d0] px-3 py-1.5 font-semibold text-white transition-colors hover:bg-[#1f67b8]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="text-[10px]">Print / Save PDF</span>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-[#111820] p-3 sm:p-6">
        <div ref={sheetRef} className="mx-auto max-w-3xl space-y-6 rounded-sm border border-[#354250] bg-[#1a232d] p-5 shadow-[0_8px_30px_rgba(0,0,0,.35)] sm:p-8" style={{ zoom: `${zoom}%` }}>
          
          {/* Header Card */}
          <div data-resume-section="0" className="scroll-mt-3 space-y-3 rounded-xl border border-[#354250] bg-[#202b35] p-6">
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
          <div data-resume-section="1" className="scroll-mt-3 space-y-3">
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
          <div data-resume-section="2" className="scroll-mt-3 space-y-3">
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
          <div data-resume-section="3" className="scroll-mt-3 space-y-3 rounded-xl border border-[#354250] bg-[#202b35] p-5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#dca561] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#dca561]" />
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-white/60 block font-mono text-[11px] mb-1">Languages:</span>
                <span className="text-white font-medium">TypeScript, JavaScript (ESNext), Rust, Python, C/C++, SQL</span>
              </div>
              <div className="flex h-7 shrink-0 items-center justify-between border-t border-[#303b48] bg-[#1a232d] px-3 text-[9px] text-[#91a0b1]">
                <span>PDF-style preview · Use Print / Save PDF to export</span>
                <span>{zoom}% · {sections[sectionIndex]}</span>
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
