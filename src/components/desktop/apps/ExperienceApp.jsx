import React, { useState } from 'react'
import { ExternalLink, Shield, Zap, Server, Database, FileText, Printer, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGES = ['Overview', 'Architecture', 'Technology']

export default function ExperienceApp() {
  const [page, setPage] = useState(0)
  const [zoom, setZoom] = useState(100)
  const changeZoom = (delta) => setZoom((value) => Math.min(150, Math.max(70, value + delta)))

  return (
    <div className="flex h-full flex-col bg-[#111820] text-[#e8edf3]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#303b48] bg-[#1a232d] px-3 text-[#e8edf3]">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="h-4 w-4 shrink-0 text-[#d7514b]" />
          <span className="truncate text-[11px] font-medium">prepNep_Engineering_Case_Study.pdf</span>
          <span className="hidden rounded bg-[#263442] px-1.5 py-0.5 text-[9px] text-[#a9b6c5] sm:inline">Portfolio document</span>
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <button type="button" onClick={() => changeZoom(-10)} disabled={zoom <= 70} title="Zoom out" className="rounded p-1.5 hover:bg-[#2a3745] disabled:opacity-40"><ZoomOut className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={() => setZoom(100)} title="Reset zoom" className="min-w-10 rounded px-1 py-1.5 text-[#a9b6c5] hover:bg-[#2a3745]">{zoom}%</button>
          <button type="button" onClick={() => changeZoom(10)} disabled={zoom >= 150} title="Zoom in" className="rounded p-1.5 hover:bg-[#2a3745] disabled:opacity-40"><ZoomIn className="h-3.5 w-3.5" /></button>
          <span className="mx-1 h-5 border-l border-[#3a4653]" />
          <button type="button" onClick={() => window.print()} title="Print case study" className="rounded p-1.5 hover:bg-[#2a3745]"><Printer className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between border-b border-[#303b48] bg-[#151e27] px-3 py-1.5 text-[10px] text-[#a9b6c5]">
          <div className="flex min-w-0 items-center gap-1.5">
            <button type="button" onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0} aria-label="Previous page" className="rounded p-1 hover:bg-[#263442] disabled:opacity-35"><ChevronLeft className="h-3.5 w-3.5" /></button>
            <span className="min-w-24 text-center">{PAGES[page]} · {page + 1} of {PAGES.length}</span>
            <button type="button" onClick={() => setPage((value) => Math.min(PAGES.length - 1, value + 1))} disabled={page === PAGES.length - 1} aria-label="Next page" className="rounded p-1 hover:bg-[#263442] disabled:opacity-35"><ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="hidden items-center gap-1 sm:flex">
            {PAGES.map((label, index) => (
              <button type="button" key={label} onClick={() => setPage(index)} aria-current={page === index ? 'page' : undefined} className={`rounded px-2 py-1 ${page === index ? 'bg-[#17324d] text-[#8bc4ff]' : 'hover:bg-[#263442]'}`}>{label}</button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-[#111820] p-3 sm:p-6">
          <article className="mx-auto min-h-full max-w-4xl border border-[#354250] bg-[#1a232d] p-5 text-[#dbe5ef] shadow-[0_8px_30px_rgba(0,0,0,.35)] sm:p-8" style={{ zoom: `${zoom}%` }}>
            {page === 0 && (
              <div className="space-y-6">
                <header className="space-y-3 border-b border-[#354250] pb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#294d6e] bg-[#17324d] px-2.5 py-0.5 font-mono text-xs text-[#8bc4ff]">Engineering case study</span>
                    <span className="font-mono text-xs text-[#9aa9b8]">Madargaach Holdings</span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-[#f0f4f8] sm:text-3xl">prepNep — Enterprise Exam &amp; Test Engine</h1>
                    <a href="https://prepnep.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#2878d0] px-3 py-1.5 text-xs font-semibold text-white shadow transition-colors hover:bg-[#1f67b8]">
                      Visit prepnep.com <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <p className="font-mono text-xs text-[#a9b6c5]">Lead Software Engineer · Architecture, State Engine &amp; Full-Stack Infrastructure</p>
                </header>

                <div className="overflow-hidden rounded-xl border border-[#354250] bg-[#141c24]">
                  <div className="flex h-8 items-center justify-between border-b border-[#354250] bg-[#202b35] px-3 text-xs text-[#b7c4d1]">
                    <span className="font-medium">Production preview</span>
                    <span className="font-mono text-[10px]">prepnep.com</span>
                  </div>
                  <img src="./project-previews/prepnep.png" alt="prepNep production preview" className="max-h-[380px] w-full object-cover object-top" />
                </div>
                <p className="text-sm leading-relaxed text-[#c1ccd8]">A reliable digital examination platform designed to keep student work safe and the test experience responsive, even when network conditions fluctuate.</p>
              </div>
            )}

            {page === 1 && (
              <div className="space-y-5">
                <header className="border-b border-[#354250] pb-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#72b7ff]">Engineering notes · 02</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#f0f4f8]">Architecture &amp; delivery</h2>
                </header>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="space-y-2 rounded-xl border border-[#354250] bg-[#202b35] p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17324d] text-[#72b7ff]"><Zap className="h-4 w-4" /></div>
                    <h3 className="text-sm font-bold text-[#e8edf3]">Resilient state sync</h3>
                    <p className="text-xs leading-relaxed text-[#b7c4d1]">Client-server synchronization captures test answers in real time and protects progress during intermittent network fluctuations.</p>
                  </div>
                  <div className="space-y-2 rounded-xl border border-[#354250] bg-[#202b35] p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3b2b16] text-[#f0bd67]"><Server className="h-4 w-4" /></div>
                    <h3 className="text-sm font-bold text-[#e8edf3]">Concurrency at scale</h3>
                    <p className="text-xs leading-relaxed text-[#b7c4d1]">Infrastructure designed to support thousands of students taking simulated national entrance tests concurrently.</p>
                  </div>
                  <div className="space-y-2 rounded-xl border border-[#354250] bg-[#202b35] p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a3024] text-[#70c78b]"><Database className="h-4 w-4" /></div>
                    <h3 className="text-sm font-bold text-[#e8edf3]">Data &amp; analytics</h3>
                    <p className="text-xs leading-relaxed text-[#b7c4d1]">PostgreSQL indexing, Redis caching for question banks, and scoring pipelines support responsive student analytics.</p>
                  </div>
                </div>
                <div className="rounded-xl border border-[#294d6e] bg-[#172735] p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-[#d6e9fc]"><Shield className="h-4 w-4 text-[#58a8ff]" />Design priorities</h3>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#b7c4d1]">
                    <li>Keep student answer state durable and recoverable.</li>
                    <li>Make the test-taking experience responsive under concurrent load.</li>
                    <li>Build scoring and reporting into the platform workflow.</li>
                  </ul>
                </div>
              </div>
            )}

            {page === 2 && (
              <div className="space-y-5">
                <header className="border-b border-[#354250] pb-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#72b7ff]">Engineering notes · 03</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#f0f4f8]">Production technology</h2>
                  <p className="mt-2 text-sm text-[#a9b6c5]">A full-stack toolkit selected for a dependable exam and analytics workflow.</p>
                </header>
                <div className="rounded-xl border border-[#354250] bg-[#202b35] p-4">
                  <h3 className="text-sm font-semibold text-[#e8edf3]">Technology stack</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Next.js', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS', 'WebSockets', 'RESTful APIs'].map((technology) => (
                      <span key={technology} className="rounded-md border border-[#394b5d] bg-[#141c24] px-2.5 py-1.5 font-mono text-xs text-[#a7d3ff]">{technology}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-[#354250] p-4">
                  <h3 className="text-sm font-semibold text-[#e8edf3]">What I worked on</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#b7c4d1]">As Lead Software Engineer, my work covered system architecture, the exam state engine, real-time synchronization, and full-stack infrastructure for the live platform.</p>
                </div>
                <a href="https://prepnep.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#2878d0] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1f67b8]">Open live platform <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            )}
          </article>
        </div>
        <div className="flex h-7 shrink-0 items-center justify-between border-t border-[#303b48] bg-[#1a232d] px-3 text-[9px] text-[#91a0b1]">
          <span>Document preview · No source PDF provided</span>
          <span>{zoom}% · Page {page + 1} of {PAGES.length}</span>
        </div>
      </div>
    </div>
  )
}
