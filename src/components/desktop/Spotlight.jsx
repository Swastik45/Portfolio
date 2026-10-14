import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Command, FolderOpen, Search, Sparkles, X } from 'lucide-react'
import { PROJECTS_DATA } from './portfolioData'

const APPS = [
  { id: 'about', name: 'About Swastik', detail: 'The person behind the systems', icon: 'SP', color: '#dca561', keywords: 'profile engineer biography introduction kathmandu' },
  { id: 'projects', name: 'Projects', detail: 'Explore shipped products and experiments', icon: '▧', color: '#7e9cd8', keywords: 'work portfolio production web systems code' },
  { id: 'experience', name: 'prepNep case study', detail: 'Real-time systems at production scale', icon: 'pN', color: '#76946a', keywords: 'experience engineering architecture postgres redis websocket performance' },
  { id: 'skills', name: 'System profiler', detail: 'Tools, technologies, and architecture', icon: '⌘', color: '#957fb8', keywords: 'skills stack rust react typescript backend frontend' },
  { id: 'resume', name: 'Résumé', detail: 'Experience and technical profile', icon: 'CV', color: '#dcd7ba', keywords: 'resume cv employment career download' },
  { id: 'mail', name: 'Send a message', detail: 'Start a conversation with Swastik', icon: '↗', color: '#7dbdf7', keywords: 'contact email mail collaboration hire' },
  { id: 'ask', name: 'Ask Swastik', detail: 'Get answers about projects and engineering', icon: '問', color: '#e46876', keywords: 'assistant questions ai ask' },
  { id: 'terminal', name: 'Terminal', detail: 'Explore the portfolio from the command line', icon: '>_', color: '#9cbf88', keywords: 'developer shell cli command' },
  { id: 'music', name: 'Music', detail: 'A little ambient soundtrack', icon: '♫', color: '#b8a0d8', keywords: 'audio sound chill playlist' }
]

const scoreMatch = (item, query) => {
  const normalizedQuery = query.trim().toLowerCase()
  const terms = normalizedQuery.split(/\s+/).filter(Boolean)
  const title = item.name.toLowerCase()
  const searchable = `${item.name} ${item.detail} ${item.keywords || ''} ${item.searchText || ''}`.toLowerCase()

  if (!terms.every((term) => searchable.includes(term))) return 0
  if (title === normalizedQuery) return 100
  if (title.startsWith(normalizedQuery)) return 80
  if (title.includes(normalizedQuery)) return 60
  return 20
}

export default function Spotlight({ onClose, onSelect }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const results = useMemo(() => {
    const appResults = APPS.map((app) => ({
      ...app,
      type: 'Application',
      score: query ? scoreMatch(app, query) : 0
    }))
    const projectResults = PROJECTS_DATA.map((project) => ({
      id: 'projects',
      name: project.title,
      detail: `${project.badge} · ${project.tech.slice(0, 3).join(' · ')}`,
      icon: '↗',
      color: '#dca561',
      type: 'Project',
      searchText: `${project.headline} ${project.description} ${project.category} ${project.badge} ${project.tech.join(' ')} ${project.metrics.join(' ')}`,
      projectQuery: project.title,
      score: query ? scoreMatch({
        name: project.title,
        detail: `${project.badge} ${project.category}`,
        searchText: `${project.headline} ${project.description} ${project.tech.join(' ')} ${project.metrics.join(' ')}`
      }, query) : 0
    }))

    if (!query.trim()) return [...appResults.slice(0, 5), ...projectResults.slice(0, 3)]
    return [...appResults, ...projectResults]
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, 9)
  }, [query])

  useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [])

  const selectResult = (result) => {
    onSelect(result.id, result.projectQuery || '')
    onClose()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((index) => Math.min(index + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && results[selectedIndex]) {
      event.preventDefault()
      selectResult(results[selectedIndex])
    }
  }

  return (
    <div
      className="fixed inset-0 z-[130] flex items-start justify-center px-4 pt-[12vh] sm:pt-[17vh] bg-[#080810]/55 backdrop-blur-xl animate-in fade-in duration-150"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight search"
        className="w-full max-w-[620px] overflow-hidden rounded-[24px] border border-white/15 bg-[#191923]/90 shadow-[0_36px_120px_rgba(0,0,0,0.65)] backdrop-blur-3xl animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#dca561]">
            <Search className="h-4 w-4" />
          </div>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Find a project, skill, or app..."
            aria-label="Search portfolio"
            aria-controls="spotlight-results"
            aria-activedescendant={results[selectedIndex] ? `spotlight-result-${selectedIndex}` : undefined}
            className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/35 sm:text-lg"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] font-mono text-white/45 transition-colors hover:text-white"
          >
            ESC
            <X className="h-3 w-3" />
          </button>
        </div>

        <div className="px-3 pb-3 pt-3 sm:px-4">
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/35">
              {query ? 'Search results' : 'A place to start'}
            </p>
            {!query && (
              <div className="flex items-center gap-1 text-[10px] text-white/30">
                <Sparkles className="h-3 w-3 text-[#dca561]" />
                Portfolio index
              </div>
            )}
          </div>

          <div id="spotlight-results" role="listbox" className="max-h-[min(52vh,420px)] space-y-1 overflow-y-auto">
            {results.length === 0 ? (
              <div className="flex min-h-28 flex-col items-center justify-center gap-2 text-center">
                <FolderOpen className="h-5 w-5 text-white/25" />
                <p className="text-sm text-white/65">Nothing found for “{query}”</p>
                <p className="text-xs text-white/35">Try a project, technology, or app name.</p>
              </div>
            ) : results.map((result, index) => (
              <button
                key={`${result.type}-${result.name}`}
                id={`spotlight-result-${index}`}
                type="button"
                role="option"
                aria-selected={selectedIndex === index}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => selectResult(result)}
                className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors sm:px-3.5 ${
                  selectedIndex === index ? 'bg-white/[0.09]' : 'hover:bg-white/[0.06]'
                }`}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-sm font-bold text-[#14141c] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
                  style={{ backgroundColor: result.color }}
                >
                  {result.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-white/90">{result.name}</span>
                    <span className="shrink-0 rounded-full border border-white/[0.08] px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white/35">
                      {result.type}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-white/40">{result.detail}</span>
                </span>
                {selectedIndex === index ? (
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#dca561]" />
                ) : (
                  <span className="hidden items-center gap-1 text-[10px] text-white/25 sm:flex">
                    <Command className="h-3 w-3" />
                    Enter
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-white/[0.08] bg-black/10 px-5 py-2.5 text-[10px] font-mono text-white/30 sm:px-6">
          <span>Search across apps, projects &amp; technologies</span>
          <span>↑ ↓ navigate · ↵ open</span>
        </footer>
      </section>
    </div>
  )
}
