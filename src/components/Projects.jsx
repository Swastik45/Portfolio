import React, { useState } from 'react'
import { ArrowUpRight, Github, ExternalLink, Terminal, LayoutGrid, List, Search, X, Layers } from 'lucide-react'

const projects = [
  {
    title: 'prepNep',
    domain: 'prepnep.com',
    category: 'EdTech Platform',
    role: 'Lead Full-Stack Developer',
    description: 'An interactive entrance preparation platform serving thousands of engineering and medical students in Nepal. Features timed mock tests, personalized analytics, revision tools, and Android mobile releases.',
    details: 'Architected end-to-end full stack architecture for multi-track entrance prep (IOE, MECEE-BL, MECEE-PG, NMCLE). Engineered mock test evaluation engines, Redis caching layers to reduce database load, and Capacitor Android builds.',
    link: 'https://prepnep.com',
    github: 'https://github.com/Madargaach-Holdings',
    githubLabel: 'Org',
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Capacitor'],
    screenshot: './project-previews/prepnep.png',
  },
  {
    title: 'ShareAudit',
    domain: 'share-audit.vercel.app',
    category: 'FinTech & Intelligence',
    role: 'Systems Architect',
    description: 'A financial auditing dashboard for analyzing stock portfolio risk concentration, capital gains tax, and weighted average cost of capital (WACC) with automated NEPSE market scraping.',
    details: 'Transforms raw transaction histories into actionable intelligence. Calculates WACC, capital gains tax breakdown, sector exposure concentration, and real-time scrapers for Nepal\'s NEPSE market data.',
    link: 'https://share-audit.vercel.app/',
    github: 'https://github.com/Swastik45/ShareAudit',
    githubLabel: 'Source',
    technologies: ['Next.js', 'TypeScript', 'Tremor UI', 'Tailwind CSS', 'Supabase'],
    screenshot: './project-previews/shareaudit.png',
  },
  {
    title: 'GovAudit NP',
    domain: 'gova-audit-np.vercel.app',
    category: 'OSINT & Accountability',
    role: 'Lead Architect',
    description: 'An accountability dashboard tracking government reform milestones through automated OSINT public data collection, milestone verification, and programmatic PDF reporting.',
    details: 'Collects public records to independently verify and measure government reform progress. Generates client-side vector PDF reports and archives historical progress snapshots.',
    link: 'https://gova-audit-np.vercel.app/',
    github: 'https://github.com/Swastik45/GovaAuditNP',
    githubLabel: 'Source',
    technologies: ['Next.js', 'TypeScript', 'Python', 'jsPDF', 'Tailwind CSS'],
    screenshot: './project-previews/govaudit.png',
  },
  {
    title: 'CarbonCredit',
    domain: 'carbon-credit1.vercel.app',
    category: 'Decentralized Market',
    role: 'Full-Stack Developer',
    description: 'A carbon credit verification and trading marketplace integrating satellite-derived NDVI vegetation index analysis for transparent, verifiable environmental credits.',
    details: 'Enables landowners and buyers to trade verified carbon offsets. Integrates satellite imagery NDVI data pipelines to automatically assess plantation density and carbon capture metrics.',
    link: 'https://carbon-credit1.vercel.app/',
    github: 'https://github.com/Swastik45/CarbonCredit',
    githubLabel: 'Source',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Leaflet', 'Tailwind CSS'],
    screenshot: './project-previews/carboncredit.png',
  },
  {
    title: 'Lumino',
    domain: 'lumino-five.vercel.app',
    category: 'AI Visuals & Discovery',
    role: 'Full-Stack Developer',
    description: 'An image exploration and discovery platform pairing curated photography search with generative AI visuals and fluid masonry layout architectures.',
    details: 'Combines Unsplash photo search with generative artwork generated from natural language prompts. Features dark/light mode and low-latency client state management.',
    link: 'https://lumino-five.vercel.app/',
    github: 'https://github.com/Swastik45/Lumino',
    githubLabel: 'Source',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Pollinations AI'],
    screenshot: './project-previews/lumino.png',
  },
  {
    title: '2D Shooting Game',
    domain: 'github.com/Swastik45/2D-Shooting-Game',
    category: 'Systems & Game Dev',
    role: 'Game Developer',
    description: 'A high-performance action game built in Rust using the Bevy Engine. Leverages data-driven Entity Component System (ECS) architecture, collision physics, and wave progression.',
    details: 'Explores native systems programming and game loop architecture in Rust. Features custom collision detection, procedural wave spawning, and ECS state separation.',
    link: null,
    github: 'https://github.com/Swastik45/2D-Shooting-Game',
    githubLabel: 'Source',
    technologies: ['Rust', 'Bevy Engine', 'ECS', 'Cargo'],
    screenshot: null,
  },
]

const filterTabs = ['All', 'Web & Platforms', 'FinTech & OSINT', 'Systems']

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = projects.filter((p) => {
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Web & Platforms' && (p.category.includes('EdTech') || p.category.includes('Market') || p.category.includes('AI'))) ||
      (activeTab === 'FinTech & OSINT' && (p.category.includes('FinTech') || p.category.includes('OSINT'))) ||
      (activeTab === 'Systems' && p.category.includes('Systems'))

    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <section id="projects" className="py-20 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with Multi-Feature Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              02 / Selected Works
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Projects &amp; Deployments
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-500">
              Live web applications, financial auditing tools, and systems software
            </p>
          </div>

          {/* Interactive Feature Controls Bar (Tabs + View Toggle + Search) */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search Input Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter tech/keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 w-36 sm:w-44"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Grid vs Table (Choice loved by senior UI devs) */}
            <div className="flex items-center p-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-200'}`}
                title="Grid visual view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-200'}`}
                title="Dense table view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* VIEW MODE 1: GRID VIEW WITH LIVE SCREENSHOTS */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filtered.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 shadow-xl group"
              >
                <div>
                  {/* Screenshot Header */}
                  {project.screenshot ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-800">
                      {/* Browser Address Bar */}
                      <div className="absolute top-0 inset-x-0 z-10 px-3.5 py-2 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/60 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>https://{project.domain}</span>
                        </span>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-zinc-200 transition-colors"
                            title="Open live site"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Screenshot */}
                      <div
                        className="pt-7 h-full w-full cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                        title="Click to inspect project details"
                      >
                        <img
                          src={project.screenshot}
                          alt={`${project.title} live interface`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative aspect-[16/9] p-6 bg-zinc-950 border-b border-zinc-800 flex flex-col justify-between font-mono cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex items-center justify-between text-[11px] text-zinc-500">
                        <span>{project.category}</span>
                        <span>Rust / Bevy</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-zinc-100">{project.title}</h4>
                          <p className="text-xs text-zinc-500">ECS Game Engine Architecture</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-lg font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-zinc-500 shrink-0">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Tech Stack & Action Links */}
                <div className="px-6 pb-6 pt-2 space-y-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/60 text-xs font-mono">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Inspect Details
                    </button>

                    <div className="flex items-center gap-3 ml-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{project.githubLabel}</span>
                      </a>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors font-medium"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE 2: DENSE TABLE / LIST VIEW (Classic senior developer portfolio choice) */}
        {viewMode === 'table' && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden font-mono text-xs shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/80 text-zinc-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Role / Category</th>
                    <th className="py-3 px-4 hidden md:table-cell">Stack</th>
                    <th className="py-3 px-4 text-right">Links</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  {filtered.map((project) => (
                    <tr
                      key={project.title}
                      className="hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                      onClick={() => setSelectedProject(project)}
                    >
                      <td className="py-3.5 px-4 font-semibold text-zinc-100 group-hover:text-white">
                        <div className="flex items-center gap-2">
                          <span>{project.title}</span>
                          <span className="text-[10px] text-zinc-500 font-normal">({project.domain})</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-zinc-400">
                        {project.category}
                      </td>
                      <td className="py-3.5 px-4 hidden md:table-cell text-zinc-500 text-[11px]">
                        {project.technologies.slice(0, 4).join(', ')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-zinc-200 hover:text-white transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INTERACTIVE PROJECT DETAIL INSPECTION MODAL */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {selectedProject.role} · {selectedProject.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {selectedProject.screenshot && (
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/9]">
                    <img
                      src={selectedProject.screenshot}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Overview &amp; Solution
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {selectedProject.details || selectedProject.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {selectedProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between text-xs font-mono">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{selectedProject.githubLabel} Repository</span>
                </a>

                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-sans font-semibold transition-colors"
                  >
                    <span>Open Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}