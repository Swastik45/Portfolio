import React, { useState } from 'react'
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
  FolderOpen,
  RefreshCw,
  FileCode2,
  FileText,
  Image as ImageIcon
} from 'lucide-react'
import { soundFX } from '../soundEffects'
import { PROJECTS_DATA } from '../portfolioData'

// Extract unique technology tags
const ALL_TAGS = Array.from(new Set(PROJECTS_DATA.flatMap((p) => p.tech)))

export default function ProjectsApp({ onOpenApp, search = '', onSearchChange }) {
  const [folderHistory, setFolderHistory] = useState({ entries: ['All'], index: 0 })
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [inspectProject, setInspectProject] = useState(null)
  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop' | 'mobile'
  const [copiedUrl, setCopiedUrl] = useState(false)

  const selectedCategory = folderHistory.entries[folderHistory.index]
  const selectedProject = PROJECTS_DATA.find((project) => project.id === selectedProjectId) || null

  const navigateFolder = (category) => {
    setFolderHistory((history) => {
      if (history.entries[history.index] === category) return history
      const entries = history.entries.slice(0, history.index + 1)
      entries.push(category)
      return { entries, index: entries.length - 1 }
    })
    setSelectedProjectId(null)
    setSelectedTag(null)
  }

  const moveInHistory = (direction) => {
    setFolderHistory((history) => ({
      ...history,
      index: Math.max(0, Math.min(history.entries.length - 1, history.index + direction))
    }))
    setSelectedProjectId(null)
  }

  const openProject = (project) => {
    soundFX.play('open')
    setInspectProject(project)
  }

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(true)
    soundFX.play('click')
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesTag = !selectedTag || p.tech.includes(selectedTag)
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.headline.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchesCategory && matchesTag && matchesSearch
  })

  return (
    <div className="flex h-full flex-col bg-[#111820] text-[#e8edf3]">
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-[#303b48] bg-[#1a232d] px-3 text-[11px]">
        <div className="flex items-center gap-1.5 text-[#a9b6c5]">
          <button type="button" aria-label="Back" onClick={() => moveInHistory(-1)} disabled={folderHistory.index === 0} className="rounded p-1.5 hover:bg-[#2a3745] disabled:opacity-35">‹</button>
          <button type="button" aria-label="Forward" onClick={() => moveInHistory(1)} disabled={folderHistory.index >= folderHistory.entries.length - 1} className="rounded p-1.5 hover:bg-[#2a3745] disabled:opacity-35">›</button>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1 rounded-md border border-[#394653] bg-[#141c24] px-2 py-1.5 text-[#a9b6c5]">
          <HardDrive className="h-3.5 w-3.5 shrink-0 text-[#58a8ff]" />
          <button type="button" onClick={() => navigateFolder('All')} className="truncate hover:text-[#2878d0]">This PC</button>
          <ChevronRight className="h-3 w-3 shrink-0 text-[#647487]" />
          <span className="truncate font-medium text-[#e8edf3]">Projects</span>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="h-3 w-3 shrink-0 text-[#647487]" />
              <span className="truncate font-medium text-[#e8edf3]">{selectedCategory}</span>
            </>
          )}
        </div>
        <button type="button" onClick={() => { onSearchChange(''); setSelectedTag(null); setSelectedProjectId(null) }} title="Clear search and filters" aria-label="Clear search and filters" className="rounded p-1.5 text-[#91a0b1] hover:bg-[#2a3745]"><RefreshCw className="h-3.5 w-3.5" /></button>
        <span className="hidden text-[10px] text-[#91a0b1] sm:block">{filteredProjects.length} items</span>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-44 shrink-0 border-r border-[#303b48] bg-[#151e27] p-2 md:block" aria-label="Project folders">
          <p className="px-2 pb-2 pt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7b8795]">Quick access</p>
          <div className="space-y-0.5 text-[11px]">
            {[
              { name: 'All', label: 'Projects', Icon: Folder },
              { name: 'Production', label: 'Production', Icon: BriefcaseBusiness },
              { name: 'Web', label: 'Web', Icon: Globe2 },
              { name: 'Systems', label: 'Systems', Icon: Cpu },
            ].map(({ name, label, Icon }) => (
              <button key={label} type="button" onClick={() => navigateFolder(name)} aria-current={selectedCategory === name ? 'page' : undefined} className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left ${selectedCategory === name ? 'bg-[#17324d] font-medium text-[#8bc4ff]' : 'text-[#b6c2ce] hover:bg-[#222e3a]'}`}>
                {React.createElement(Icon, { className: 'h-3.5 w-3.5' })} {label}
              </button>
            ))}
          </div>
          <div className="mx-2 my-3 border-t border-[#303b48]" />
          <p className="px-2 pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7b8795]">Storage</p>
          <div className="flex items-center gap-2 px-2 py-1.5 text-[11px] text-[#b6c2ce]"><HardDrive className="h-3.5 w-3.5" /> Local projects <span className="ml-auto text-[9px]">{PROJECTS_DATA.length}</span></div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
      {/* Top Toolbar */}
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-b border-[#303b48] bg-[#1a232d] p-3">
        {/* Search & View Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#7b8795]" />
            <input
              type="text"
              value={search}
            onChange={(e) => {
              onSearchChange(e.target.value)
              setSelectedProjectId(null)
            }}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-40 rounded-lg border border-[#394653] bg-[#111820] py-1.5 pl-8 pr-3 text-xs text-[#e8edf3] placeholder-[#7b8795] focus:outline-none focus:ring-1 focus:ring-[#2878d0] sm:w-56"
            />
          </div>

          <div className="flex items-center rounded-lg border border-[#394653] bg-[#141c24] p-0.5">
            <button
              type="button"
              onClick={() => {
                soundFX.play('click')
                setViewMode('grid')
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#263442] text-[#8bc4ff] shadow-sm' : 'text-[#91a0b1] hover:text-[#e8edf3]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                soundFX.play('click')
                setViewMode('list')
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#263442] text-[#8bc4ff] shadow-sm' : 'text-[#91a0b1] hover:text-[#e8edf3]'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          <button type="button" disabled={!selectedProject} onClick={() => selectedProject && openProject(selectedProject)} className="inline-flex items-center gap-1.5 rounded-lg bg-[#2878d0] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1f67b8] disabled:cursor-not-allowed disabled:opacity-45">
            <FolderOpen className="h-3.5 w-3.5" /> Open
          </button>
        </div>
      </div>

      {/* Interactive Tech Tag Filter Bar */}
      <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-[#303b48] bg-[#151e27] px-3.5 py-2 no-scrollbar">
        <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#91a0b1]">
          <Tag className="h-3 w-3 text-[#2878d0]" /> Filter Stack:
        </span>
        {selectedTag && (
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-[#693b40] bg-[#3a2227] px-2 py-0.5 font-mono text-[10px] text-[#ff9fa5]"
          >
            Clear ({selectedTag}) &times;
          </button>
        )}
        {ALL_TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              soundFX.play('click')
              setSelectedTag(selectedTag === t ? null : t)
            }}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              selectedTag === t
                ? 'bg-[#17324d] font-bold text-[#8bc4ff] shadow-sm'
                  : 'border border-[#394653] bg-[#1a232d] text-[#b6c2ce] hover:bg-[#263442]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#111820] p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProjectId(p.id)
                }}
                onDoubleClick={() => openProject(p)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return
                  if (event.key === 'Enter') openProject(p)
                  if (event.key === ' ') {
                    event.preventDefault()
                    setSelectedProjectId(p.id)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedProjectId === p.id}
                className={`explorer-project group flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-[#1a232d] transition-all duration-200 hover:shadow-md ${
                  selectedProjectId === p.id ? 'border-[#4da3ff] ring-1 ring-[#4da3ff]' : 'border-[#303b48] hover:border-[#526477]'
                }`}
                aria-label={`${p.title} project folder`}
              >
                <div className="explorer-folder-view border-b border-[#303b48] bg-[#141c24] p-2.5">
                  <div className="mb-2 flex items-center gap-1.5 truncate rounded-md border border-[#303b48] bg-[#111820] px-2 py-1.5 font-mono text-[9px] text-[#91a0b1]">
                    <FolderOpen className="h-3 w-3 shrink-0 text-[#e8bd63]" />
                    <span className="shrink-0">Projects</span>
                    <span className="text-[#526174]">/</span>
                    <span className="truncate text-[#dbe5ef]">{p.id}</span>
                  </div>

                  <div className="grid min-h-[112px] grid-cols-[minmax(0,1fr)_minmax(72px,0.82fr)] gap-2">
                    <div className="space-y-1 rounded-md border border-[#303b48] bg-[#18222c] p-1.5">
                      <div className="mb-1 px-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[#718092]">Project files</div>
                      <div className="flex items-center gap-1.5 rounded px-1 py-1 text-[9px] text-[#d5dee8] group-hover:bg-[#263442]">
                        <Folder className="h-3 w-3 shrink-0 text-[#e8bd63]" />
                        <span className="truncate">src</span>
                        <span className="ml-auto text-[8px] text-[#718092]">DIR</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded px-1 py-1 text-[9px] text-[#c1ccd8] group-hover:bg-[#263442]">
                        <FileText className="h-3 w-3 shrink-0 text-[#82b7e8]" />
                        <span className="truncate">README.md</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded px-1 py-1 text-[9px] text-[#c1ccd8] group-hover:bg-[#263442]">
                        <FileCode2 className="h-3 w-3 shrink-0 text-[#b9a0e8]" />
                        <span className="truncate">package.json</span>
                      </div>
                    </div>

                    <div className="relative flex min-w-0 flex-col overflow-hidden rounded-md border border-[#394653] bg-[#10171e]">
                      <div className="flex h-5 shrink-0 items-center gap-1 border-b border-[#303b48] px-1.5 font-mono text-[8px] text-[#91a0b1]">
                        <ImageIcon className="h-2.5 w-2.5 shrink-0 text-[#9fbd77]" />
                        <span className="truncate">preview.png</span>
                      </div>
                      {p.previewImg ? (
                        <img
                          src={p.previewImg}
                          alt={`${p.title} project preview`}
                          className="min-h-0 flex-1 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex min-h-0 flex-1 items-center justify-center bg-[#171f28]">
                          <div className="flex flex-col items-center gap-1 text-[#e8bd63]">
                            <FolderOpen className="h-7 w-7" />
                            <span className="font-mono text-[8px] text-[#91a0b1]">Rust / Bevy</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between space-y-3 p-3.5">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#e8edf3] transition-colors group-hover:text-[#72b7ff]">
                        {p.title}
                      </h3>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#8b96a4] transition-colors group-hover:text-[#2878d0]" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#a4b1bf]">
                      {p.headline}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-[#394653] bg-[#202b35] px-2 py-0.5 font-mono text-[10px] text-[#b7c4d1]"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && (
                      <span className="rounded-md bg-[#202b35] px-1.5 py-0.5 font-mono text-[10px] text-[#91a0b1]">
                        +{p.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="overflow-hidden rounded-xl border border-[#303b48] bg-[#1a232d] divide-y divide-[#303b48]">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProjectId(p.id)
                }}
                onDoubleClick={() => openProject(p)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return
                  if (event.key === 'Enter') openProject(p)
                  if (event.key === ' ') {
                    event.preventDefault()
                    setSelectedProjectId(p.id)
                  }
                }}
                role="group"
                aria-label={`Select ${p.title}`}
                tabIndex={0}
                aria-current={selectedProjectId === p.id ? 'true' : undefined}
                className={`flex cursor-pointer items-center justify-between gap-4 p-3 transition-colors ${
                  selectedProjectId === p.id ? 'bg-[#1b3146]' : 'hover:bg-[#222e3a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#394653] bg-[#141c24]">
                    {p.previewImg ? (
                      <img src={p.previewImg} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs">🦀</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#e8edf3] sm:text-sm">{p.title}</span>
                      <span className="rounded bg-[#263442] px-1.5 py-0.2 font-mono text-[10px] text-[#b7c4d1]">
                        {p.badge}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-[11px] text-[#a4b1bf]">
                      {p.headline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer rounded-lg p-1.5 text-[#91a0b1] transition-colors hover:bg-[#17324d] hover:text-[#8bc4ff]"
                      title="Open Live Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer rounded-lg p-1.5 text-[#91a0b1] transition-colors hover:bg-[#17324d] hover:text-[#8bc4ff]"
                      title="View GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {filteredProjects.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#465566] bg-[#1a232d] p-10 text-center">
            <Search className="mx-auto h-6 w-6 text-[#718092]" />
            <p className="mt-3 text-sm font-medium text-[#dbe5ef]">No projects found</p>
            <p className="mt-1 text-xs text-[#91a0b1]">Try a different name, technology, or folder.</p>
          </div>
        )}
      </div>
      <div className="flex min-h-8 shrink-0 items-center justify-between border-t border-[#303b48] bg-[#1a232d] px-3 py-1 text-[9px] text-[#91a0b1]">
        <span>{filteredProjects.length} items{selectedProject ? ` · ${selectedProject.title} selected` : ''}</span>
        <span>Double-click an item to inspect · {viewMode === 'grid' ? 'Icon view' : 'Details view'}</span>
      </div>
        </div>
      </div>

      {/* Project Inspection Modal */}
      {inspectProject && (
        <div 
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto"
          onClick={() => setInspectProject(null)}
        >
          <div 
            className="w-full max-w-xl space-y-4 overflow-y-auto rounded-2xl border border-[#354250] bg-[#1a232d] p-5 shadow-2xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-[#294d6e] bg-[#17324d] px-2 py-0.5 font-mono text-xs text-[#8bc4ff]">
                  {inspectProject.badge}
                </span>
                <h3 className="text-base font-bold text-white">{inspectProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectProject(null)}
                className="cursor-pointer rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                title="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Device Viewport Toggle & Preview Frame */}
            {inspectProject.previewImg && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] uppercase text-[#91a0b1]">Project preview</span>
                  <div className="flex items-center gap-1 rounded-lg border border-[#394653] bg-[#141c24] p-0.5">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1 rounded text-[11px] cursor-pointer flex items-center gap-1 ${
                        previewDevice === 'desktop' ? 'bg-[#263442] font-bold text-[#8bc4ff]' : 'text-[#a9b6c5]'
                      }`}
                    >
                      <Monitor className="w-3 h-3" /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1 rounded text-[11px] cursor-pointer flex items-center gap-1 ${
                        previewDevice === 'mobile' ? 'bg-[#263442] font-bold text-[#8bc4ff]' : 'text-[#a9b6c5]'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" /> Mobile
                    </button>
                  </div>
                </div>

                <div className={`rounded-xl overflow-hidden border border-white/10 transition-all mx-auto ${
                  previewDevice === 'mobile' ? 'max-w-[280px] h-64' : 'w-full max-h-56'
                }`}>
                  <img
                    src={inspectProject.previewImg}
                    alt={inspectProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#dcd7ba] leading-relaxed">
              {inspectProject.description}
            </p>

            {/* Key Engineering Deliverables */}
            <div className="space-y-1.5 bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#91a0b1]">
                Highlights &amp; Architecture:
              </span>
              {inspectProject.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-white/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76946a] shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="space-y-1.5">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#91a0b1]">
                Technologies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {inspectProject.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-[#394653] bg-[#202b35] px-2.5 py-1 font-mono text-xs text-[#8bc4ff]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {inspectProject.liveUrl && (
                  <>
                    <a
                      href={inspectProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#2878d0] px-3.5 py-2 text-xs font-bold text-white shadow transition-colors hover:bg-[#1f67b8]"
                    >
                      Open Live Site
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyUrl(inspectProject.liveUrl)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#76946a]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </>
                )}
                {inspectProject.githubUrl && (
                  <a
                    href={inspectProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
                  >
                    GitHub Code
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {inspectProject.id === 'prepnep' && (
                <button
                  type="button"
                  onClick={() => {
                    setInspectProject(null)
                    onOpenApp('experience')
                  }}
                  className="text-xs text-[#dca561] hover:underline cursor-pointer"
                >
                  View prepNep Case Study &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
