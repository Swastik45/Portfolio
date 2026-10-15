import React, { useState, useMemo, useEffect } from 'react'
import { 
  Folder, 
  BriefcaseBusiness,
  ExternalLink, 
  Github, 
  Search, 
  LayoutGrid, 
  List, 
  ArrowUpRight,
  CheckCircle2,
  X, 
  Copy, 
  Check, 
  Tag, 
  Monitor, 
  Smartphone, 
  Cpu, 
  HardDrive, 
  Globe2, 
  ChevronRight, 
  RefreshCw,
  Zap
} from 'lucide-react'
import { soundFX } from '../soundEffects'
import { PROJECTS_DATA } from '../portfolioData'

// Extract all unique technology tags across projects
const ALL_TAGS = Array.from(new Set(PROJECTS_DATA.flatMap((p) => p.tech)))

const CATEGORIES = [
  { id: 'All', label: 'All Projects', icon: Folder },
  { id: 'Production', label: 'Production', icon: BriefcaseBusiness },
  { id: 'Web', label: 'Web Apps', icon: Globe2 },
  { id: 'Systems', label: 'Systems & Engine', icon: Cpu }
]

function getCategoryBadge(category) {
  switch (category) {
    case 'Production':
      return {
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-400'
      }
    case 'Web':
      return {
        bg: 'bg-sky-500/15',
        text: 'text-sky-400',
        border: 'border-sky-500/30',
        dot: 'bg-sky-400'
      }
    case 'Systems':
      return {
        bg: 'bg-amber-500/15',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        dot: 'bg-amber-400'
      }
    default:
      return {
        bg: 'bg-blue-500/15',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        dot: 'bg-blue-400'
      }
  }
}

export default function ProjectsApp({ onOpenApp, search = '', onSearchChange }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [inspectProject, setInspectProject] = useState(null)
  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop' | 'mobile'
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  // Close inspector on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && inspectProject) {
        setInspectProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inspectProject])

  const openProject = (project) => {
    soundFX.play('open')
    setInspectProject(project)
    setSelectedProjectId(project.id)
  }

  const handleCopyUrl = (url) => {
    if (!url) return
    navigator.clipboard.writeText(url)
    setCopiedUrl(true)
    soundFX.play('click')
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const clearAllFilters = () => {
    soundFX.play('click')
    setSelectedCategory('All')
    setSelectedTag(null)
    onSearchChange?.('')
    setSelectedProjectId(null)
  }

  // Count projects per category
  const categoryCounts = useMemo(() => {
    const counts = { All: PROJECTS_DATA.length }
    PROJECTS_DATA.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  // Filter projects by category, tag, and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
      const matchesTag = !selectedTag || p.tech.includes(selectedTag)
      const q = (search || '').toLowerCase().trim()
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.headline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        (p.badge && p.badge.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      return matchesCategory && matchesTag && matchesSearch
    })
  }, [selectedCategory, selectedTag, search])

  const hasActiveFilters = selectedCategory !== 'All' || selectedTag !== null || (search && search.trim() !== '')

  return (
    <div className="flex h-full w-full flex-col bg-[#0f141c] text-[#e2e8f0] select-none">
      {/* 1. Explorer Navigation & Breadcrumbs Bar */}
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-[#253040] bg-[#141b24] px-3 text-xs">
        {/* Left: Path Breadcrumbs */}
        <div className="flex min-w-0 items-center gap-1.5 overflow-hidden text-[#8e9cae]">
          <HardDrive className="h-4 w-4 shrink-0 text-[#4da3ff]" />
          <span className="shrink-0 font-medium text-[#c0ccdc]">This PC</span>
          <ChevronRight className="h-3 w-3 shrink-0 text-[#4e5d71]" />
          <button 
            type="button" 
            onClick={() => {
              setSelectedCategory('All')
              setSelectedTag(null)
            }}
            className="flex items-center gap-1 font-semibold text-[#f0f6fc] hover:text-[#4da3ff] transition-colors"
          >
            <Folder className="h-3.5 w-3.5 text-[#e5b84c]" />
            Projects
          </button>

          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="h-3 w-3 shrink-0 text-[#4e5d71]" />
              <span className="truncate font-medium text-[#4da3ff]">{selectedCategory}</span>
            </>
          )}

          {selectedTag && (
            <>
              <ChevronRight className="h-3 w-3 shrink-0 text-[#4e5d71]" />
              <span className="truncate font-mono text-[11px] text-[#8bc4ff]">#{selectedTag}</span>
            </>
          )}
        </div>

        {/* Right: View Switcher & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              title="Clear all filters & search"
              className="flex items-center gap-1 rounded-md bg-[#1f2937] px-2 py-1 text-[11px] text-[#93a4b8] hover:bg-[#2b394c] hover:text-white transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Grid vs List View Toggle */}
          <div className="flex items-center rounded-lg border border-[#2b3748] bg-[#0f151e] p-0.5">
            <button
              type="button"
              onClick={() => {
                soundFX.play('click')
                setViewMode('grid')
              }}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[#243345] text-[#60a5fa] shadow-sm' 
                  : 'text-[#8292a5] hover:text-[#d5e0ee]'
              }`}
              title="Grid View (Visual Cards)"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                soundFX.play('click')
                setViewMode('list')
              }}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[#243345] text-[#60a5fa] shadow-sm' 
                  : 'text-[#8292a5] hover:text-[#d5e0ee]'
              }`}
              title="List View (Compact Rows)"
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="hidden text-[11px] font-mono text-[#7b8ca0] sm:inline">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </header>

      {/* 2. Responsive Category Navigation & Search Bar */}
      <nav className="flex shrink-0 flex-wrap items-center justify-between gap-2.5 border-b border-[#253040] bg-[#121922] px-3 py-2.5">
        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundFX.play('click')
                  setSelectedCategory(cat.id)
                  setSelectedProjectId(null)
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#2878d0] text-white shadow-sm font-semibold'
                    : 'text-[#94a3b8] hover:bg-[#1a2330] hover:text-[#e2e8f0]'
                }`}
              >
                {React.createElement(cat.icon, {
                  className: `h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-[#64748b]'}`
                })}
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#1e293b] text-[#64748b]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Instant Search Box */}
        <div className="relative min-w-[160px] flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              onSearchChange?.(e.target.value)
              setSelectedProjectId(null)
            }}
            placeholder="Search projects or tech..."
            aria-label="Search projects"
            className="w-full rounded-lg border border-[#2d3a4d] bg-[#0c1117] py-1.5 pl-8 pr-7 text-xs text-[#e2e8f0] placeholder-[#64748b] transition-all focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange?.('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#e2e8f0]"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </nav>

      {/* 3. Tech Stack Quick Filters Bar */}
      <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-[#202a38] bg-[#0e141d] px-3.5 py-1.5 no-scrollbar text-xs">
        <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#64748b]">
          <Tag className="h-3 w-3 text-[#38bdf8]" /> Stack:
        </span>

        {selectedTag && (
          <button
            type="button"
            onClick={() => {
              soundFX.play('click')
              setSelectedTag(null)
            }}
            className="flex shrink-0 items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            Clear ({selectedTag}) &times;
          </button>
        )}

        {ALL_TAGS.map((tag) => {
          const isTagActive = selectedTag === tag
          return (
            <button
              key={tag}
              type="button"
              onClick={() => {
                soundFX.play('click')
                setSelectedTag(isTagActive ? null : tag)
                setSelectedProjectId(null)
              }}
              className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] whitespace-nowrap transition-all ${
                isTagActive
                  ? 'border border-[#38bdf8]/50 bg-[#172c44] font-semibold text-[#38bdf8] shadow-sm'
                  : 'border border-[#232f3f] bg-[#121924] text-[#8e9eb3] hover:border-[#38485e] hover:bg-[#1a2332] hover:text-white'
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* 4. Fluid, Responsive Projects View Area */}
      <main className="min-h-0 flex-1 overflow-y-auto p-3.5 sm:p-5">
        {filteredProjects.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#2b3749] bg-[#121922]/50 p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e293b] text-[#64748b]">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-[#f1f5f9]">No matching projects found</h3>
            <p className="mt-1 max-w-sm text-xs text-[#94a3b8]">
              No projects matched your criteria{search ? ` for "${search}"` : ''}{selectedTag ? ` with tag "${selectedTag}"` : ''}.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#1d4ed8] transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ================================================================= */
          /* GRID VIEW: Fluid, Auto-Filling Cards (Responsive at any dimension) */
          /* ================================================================= */
          <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 sm:gap-5">
            {filteredProjects.map((p) => {
              const categoryBadge = getCategoryBadge(p.category)
              const isSelected = selectedProjectId === p.id

              return (
                <article
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  onDoubleClick={() => openProject(p)}
                  onKeyDown={(e) => {
                    if (e.target !== e.currentTarget) return
                    if (e.key === 'Enter') openProject(p)
                    if (e.key === ' ') {
                      e.preventDefault()
                      setSelectedProjectId(p.id)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${p.title} project details`}
                  className={`group relative flex flex-col rounded-2xl border bg-[#141b24] overflow-hidden transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] ${
                    isSelected 
                      ? 'border-[#38bdf8] ring-1 ring-[#38bdf8]' 
                      : 'border-[#243142] hover:border-[#3d506a]'
                  }`}
                >
                  {/* Card Banner / Preview Media */}
                  <div className="aspect-[16/10] relative w-full overflow-hidden bg-[#0a0f16]">
                    {p.previewImg ? (
                      <>
                        <img
                          src={p.previewImg}
                          alt={`${p.title} screenshot`}
                          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141b24] via-[#141b24]/25 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      /* Systems / Engine Visual Canvas (Rust / Bevy ECS) */
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#161f2f] via-[#101724] to-[#0c111a] p-4 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                          <Cpu className="h-6 w-6" />
                        </div>
                        <span className="mt-2.5 font-mono text-xs font-bold tracking-wider text-amber-300">
                          Rust &bull; Bevy ECS
                        </span>
                        <span className="text-[10px] text-[#8e9eb3]">
                          Deterministic Simulation
                        </span>
                      </div>
                    )}

                    {/* Top Floating Category & Badge Pills */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md ${categoryBadge.bg} ${categoryBadge.text} ${categoryBadge.border}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${categoryBadge.dot}`} />
                        {p.category}
                      </span>

                      {p.badge && (
                        <span className="rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-mono font-medium text-white/90 backdrop-blur-md shadow-sm">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-4 space-y-3.5">
                    <div>
                      {/* Title & Popout Indicator */}
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-[#f1f5f9] group-hover:text-[#38bdf8] transition-colors truncate">
                          {p.title}
                        </h4>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#64748b] group-hover:text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      {/* Headline / Summary */}
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#94a3b8]">
                        {p.headline}
                      </p>
                    </div>

                    {/* Key Engineering Deliverable / Highlight */}
                    {p.metrics && p.metrics.length > 0 && (
                      <div className="flex items-center gap-1.5 rounded-lg border border-[#232f3f] bg-[#0d131b] px-2.5 py-1 text-[11px] text-[#cbd5e1]">
                        <Zap className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                        <span className="truncate">{p.metrics[0]}</span>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[#263548] bg-[#101721] px-2 py-0.5 font-mono text-[10px] text-[#93c5fd]"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 3 && (
                        <span className="rounded-md border border-[#263548] bg-[#101721] px-1.5 py-0.5 font-mono text-[10px] text-[#64748b]">
                          +{p.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex items-center justify-between border-t border-[#202b3a] pt-3 text-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openProject(p)
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
                      >
                        Inspect Details &rarr;
                      </button>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-[#1d4ed8]/20 border border-[#1d4ed8]/40 px-2 py-1 text-[10px] font-semibold text-[#93c5fd] hover:bg-[#1d4ed8] hover:text-white transition-all"
                            title="Open live site"
                          >
                            Live <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}

                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-[#2b3749] bg-[#1a2330] p-1 text-[#94a3b8] hover:bg-[#253245] hover:text-white transition-colors"
                            title="View source on GitHub"
                          >
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {p.id === 'prepnep' && (
                          <button
                            type="button"
                            onClick={() => onOpenApp?.('experience')}
                            className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-300 hover:bg-amber-500/20 transition-colors"
                            title="Open full prepNep engineering case study"
                          >
                            Case Study
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* ================================================================= */
          /* LIST VIEW: High-density, clean rows for quick inspection          */
          /* ================================================================= */
          <div className="overflow-hidden rounded-2xl border border-[#243142] bg-[#141b24] divide-y divide-[#202b3a]">
            {filteredProjects.map((p) => {
              const categoryBadge = getCategoryBadge(p.category)
              const isSelected = selectedProjectId === p.id

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  onDoubleClick={() => openProject(p)}
                  onKeyDown={(e) => {
                    if (e.target !== e.currentTarget) return
                    if (e.key === 'Enter') openProject(p)
                    if (e.key === ' ') {
                      e.preventDefault()
                      setSelectedProjectId(p.id)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  className={`flex cursor-pointer items-center justify-between gap-3 p-3 transition-colors ${
                    isSelected ? 'bg-[#1a2a3e]' : 'hover:bg-[#1a2330]'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Thumbnail */}
                    <div className="flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#2b3848] bg-[#0c1117]">
                      {p.previewImg ? (
                        <img src={p.previewImg} alt={p.title} className="h-full w-full object-cover object-top" />
                      ) : (
                        <Cpu className="h-5 w-5 text-amber-400" />
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-[#f1f5f9] text-xs sm:text-sm">{p.title}</span>
                        <span className={`inline-flex items-center rounded px-1.5 py-0.2 text-[9px] font-semibold ${categoryBadge.bg} ${categoryBadge.text}`}>
                          {p.category}
                        </span>
                        {p.badge && (
                          <span className="rounded bg-[#1e293b] px-1.5 py-0.2 font-mono text-[9px] text-[#94a3b8]">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-[11px] text-[#94a3b8]">
                        {p.headline}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-[#2b3848] bg-[#16202c] p-1.5 text-[#93c5fd] hover:bg-[#1e2e42] transition-colors"
                        title="Open live site"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-[#2b3848] bg-[#16202c] p-1.5 text-[#94a3b8] hover:bg-[#1e2e42] hover:text-white transition-colors"
                        title="View GitHub repository"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => openProject(p)}
                      className="rounded-lg bg-[#2563eb] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* 5. Explorer Status Bar (Bottom) */}
      <footer className="flex h-7 shrink-0 items-center justify-between border-t border-[#202b3a] bg-[#111721] px-3 text-[10px] text-[#718298]">
        <div className="flex items-center gap-2 truncate">
          <span>
            Showing <strong className="text-[#cbd5e1]">{filteredProjects.length}</strong> of {PROJECTS_DATA.length} projects
          </span>
          {selectedProjectId && (
            <span className="hidden sm:inline text-[#38bdf8]">
              &bull; Selected: {PROJECTS_DATA.find((p) => p.id === selectedProjectId)?.title}
            </span>
          )}
        </div>
        <span className="hidden sm:inline">
          Double-click card or click Inspect to view full details
        </span>
      </footer>

      {/* 6. Comprehensive Project Details Inspector Modal */}
      {inspectProject && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-5 pointer-events-auto animate-in fade-in duration-150"
          onClick={() => setInspectProject(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-[#2f3d50] bg-[#141b24] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <header className="flex shrink-0 items-center justify-between border-b border-[#243142] bg-[#18212d] px-5 py-3.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getCategoryBadge(inspectProject.category).bg} ${getCategoryBadge(inspectProject.category).text}`}>
                  {inspectProject.category}
                </span>
                <span className="rounded-full bg-[#101722] border border-[#2b3848] px-2 py-0.5 font-mono text-[11px] text-[#94a3b8]">
                  {inspectProject.badge}
                </span>
                <h3 className="text-base font-bold text-white truncate">{inspectProject.title}</h3>
              </div>

              <button
                type="button"
                onClick={() => setInspectProject(null)}
                aria-label="Close dialog"
                className="rounded-lg p-1.5 text-[#94a3b8] hover:bg-[#253245] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[#cbd5e1] leading-relaxed">
              {/* Preview Banner Frame */}
              {inspectProject.previewImg ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748b]">
                      Live Visual Preview
                    </span>
                    <div className="flex items-center rounded-lg border border-[#2a3648] bg-[#0d131c] p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('desktop')}
                        className={`flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                          previewDevice === 'desktop' ? 'bg-[#253245] font-semibold text-[#38bdf8]' : 'text-[#8e9eb3]'
                        }`}
                      >
                        <Monitor className="h-3 w-3" /> Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice('mobile')}
                        className={`flex items-center gap-1 rounded px-2 py-1 transition-colors ${
                          previewDevice === 'mobile' ? 'bg-[#253245] font-semibold text-[#38bdf8]' : 'text-[#8e9eb3]'
                        }`}
                      >
                        <Smartphone className="h-3 w-3" /> Mobile
                      </button>
                    </div>
                  </div>

                  <div
                    className={`mx-auto overflow-hidden rounded-xl border border-[#2b3848] bg-[#0c1117] shadow-inner transition-all duration-300 ${
                      previewDevice === 'mobile' ? 'max-w-[280px] h-64' : 'w-full max-h-60'
                    }`}
                  >
                    <img
                      src={inspectProject.previewImg}
                      alt={inspectProject.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              ) : (
                /* Systems Engine Highlights */
                <div className="rounded-xl border border-[#2b3848] bg-gradient-to-br from-[#121924] to-[#0c1118] p-4 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-amber-300">Rust &bull; Bevy ECS Engine Prototype</h4>
                  <p className="mt-1 text-xs text-[#94a3b8]">
                    Deterministic real-time systems programming, zero-allocation game loop, and spatial hashing physics.
                  </p>
                </div>
              )}

              {/* Engineering Overview */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#64748b]">
                  Overview &amp; Architecture
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-[#e2e8f0] leading-relaxed">
                  {inspectProject.description}
                </p>
              </div>

              {/* Key Deliverables & Highlights */}
              {inspectProject.metrics && inspectProject.metrics.length > 0 && (
                <div className="rounded-xl border border-[#232f3f] bg-[#0d141e] p-3.5 space-y-2">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-[#38bdf8]">
                    Key Deliverables &amp; Metrics
                  </span>
                  <div className="space-y-1.5">
                    {inspectProject.metrics.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies Applied */}
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#64748b]">
                  Technologies Applied
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {inspectProject.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-[#27364a] bg-[#111924] px-2.5 py-1 font-mono text-xs text-[#93c5fd]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <footer className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-[#243142] bg-[#18212d] px-5 py-3.5">
              <div className="flex items-center gap-2">
                {inspectProject.liveUrl && (
                  <>
                    <a
                      href={inspectProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#1d4ed8] transition-colors"
                    >
                      Open Live Site <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyUrl(inspectProject.liveUrl)}
                      className="rounded-xl border border-[#2d3a4d] bg-[#131b26] p-2 text-[#cbd5e1] hover:bg-[#202c3d] hover:text-white transition-colors"
                      title="Copy URL"
                    >
                      {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </>
                )}

                {inspectProject.githubUrl && (
                  <a
                    href={inspectProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#2d3a4d] bg-[#131b26] px-3.5 py-2 text-xs font-medium text-[#e2e8f0] hover:bg-[#202c3d] hover:text-white transition-colors"
                  >
                    GitHub Code <Github className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {inspectProject.id === 'prepnep' && (
                <button
                  type="button"
                  onClick={() => {
                    setInspectProject(null)
                    onOpenApp?.('experience')
                  }}
                  className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  Deep-Dive prepNep Case Study &rarr;
                </button>
              )}
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
