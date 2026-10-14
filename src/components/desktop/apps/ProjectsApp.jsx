import React, { useState } from 'react'
import { 
  Folder, 
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
  Smartphone
} from 'lucide-react'
import { soundFX } from '../soundEffects'
import { PROJECTS_DATA } from '../portfolioData'

// Extract unique technology tags
const ALL_TAGS = Array.from(new Set(PROJECTS_DATA.flatMap((p) => p.tech)))

export default function ProjectsApp({ onOpenApp, initialSearch = '' }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState(null)
  const [search, setSearch] = useState(initialSearch)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [inspectProject, setInspectProject] = useState(null)
  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop' | 'mobile'
  const [copiedUrl, setCopiedUrl] = useState(false)

  const categories = ['All', 'Production', 'Web', 'Systems']

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
    <div className="flex flex-col h-full bg-[#181824] text-[#dcd7ba]">
      {/* Top Toolbar */}
      <div className="p-3 bg-[#20202e] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundFX.play('click')
                setSelectedCategory(cat)
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7e9cd8] text-[#1f1f28] shadow font-bold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stack or title..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs w-44 sm:w-56 focus:outline-none focus:ring-1 focus:ring-[#7e9cd8]"
            />
          </div>

          <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-0.5">
            <button
              type="button"
              onClick={() => {
                soundFX.play('click')
                setViewMode('grid')
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
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
                viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tech Tag Filter Bar */}
      <div className="px-3.5 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Tag className="w-3 h-3 text-[#7e9cd8]" /> Filter Stack:
        </span>
        {selectedTag && (
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className="px-2 py-0.5 rounded-full bg-[#e46876]/20 text-[#e46876] border border-[#e46876]/30 text-[10px] font-mono shrink-0 cursor-pointer flex items-center gap-1"
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
                ? 'bg-[#7e9cd8] text-[#1f1f28] font-bold shadow'
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  soundFX.play('open')
                  setInspectProject(p)
                }}
                className="group rounded-2xl border border-white/10 bg-[#20202e]/60 hover:bg-[#20202e] hover:border-white/25 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer shadow-lg hover:shadow-2xl"
              >
                {/* Screenshot or Canvas Frame */}
                <div className="relative h-40 bg-[#121218] overflow-hidden border-b border-white/10 flex items-center justify-center">
                  {p.previewImg ? (
                    <img
                      src={p.previewImg}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <div className="w-12 h-12 rounded-xl bg-[#e46876]/20 border border-[#e46876]/40 flex items-center justify-center text-[#e46876] font-mono font-bold text-lg mb-2">
                        🦀
                      </div>
                      <span className="text-xs font-mono text-white/70">Rust &amp; Bevy Engine</span>
                    </div>
                  )}

                  {/* Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/15">
                    {p.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm group-hover:text-[#7e9cd8] transition-colors">
                        {p.title}
                      </h3>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[11px] text-[#938aa9] mt-1 line-clamp-2 leading-relaxed">
                      {p.headline}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-white/50">
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
          <div className="rounded-xl border border-white/10 bg-[#20202e]/40 overflow-hidden divide-y divide-white/5">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  soundFX.play('open')
                  setInspectProject(p)
                }}
                className="p-3 hover:bg-white/5 transition-colors flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {p.previewImg ? (
                      <img src={p.previewImg} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs">🦀</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">{p.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/70">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#938aa9] line-clamp-1">
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
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
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
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
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
      </div>

      {/* Project Inspection Modal */}
      {inspectProject && (
        <div 
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 pointer-events-auto"
          onClick={() => setInspectProject(null)}
        >
          <div 
            className="w-full max-w-xl rounded-2xl bg-[#20202e] border border-white/15 shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#7e9cd8]/20 border border-[#7e9cd8]/30 text-[#7e9cd8] text-xs font-mono">
                  {inspectProject.badge}
                </span>
                <h3 className="text-base font-bold text-white">{inspectProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectProject(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white cursor-pointer"
                title="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Device Viewport Toggle & Preview Frame */}
            {inspectProject.previewImg && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-white/40 uppercase">Live Viewport Preview</span>
                  <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1 rounded text-[11px] cursor-pointer flex items-center gap-1 ${
                        previewDevice === 'desktop' ? 'bg-[#7e9cd8] text-[#1f1f28] font-bold' : 'text-white/60'
                      }`}
                    >
                      <Monitor className="w-3 h-3" /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1 rounded text-[11px] cursor-pointer flex items-center gap-1 ${
                        previewDevice === 'mobile' ? 'bg-[#7e9cd8] text-[#1f1f28] font-bold' : 'text-white/60'
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
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#938aa9] block">
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
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#938aa9] block">
                Technologies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {inspectProject.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#7e9cd8]"
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7e9cd8] hover:bg-[#6c8ac6] text-[#1f1f28] font-bold text-xs transition-colors shadow cursor-pointer"
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
