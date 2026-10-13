import React, { useState } from 'react'
import { Code, Server, Cpu, Layers, Search, Check, Copy } from 'lucide-react'
import { soundFX } from '../soundEffects'

const SKILLS_CATEGORIES = [
  {
    title: 'Languages',
    icon: Code,
    skills: [
      { name: 'TypeScript', level: 'Primary', desc: 'Strict typing, modern generics, enterprise codebase scale', usedIn: 'prepNep, ShareAudit, GovAudit NP' },
      { name: 'JavaScript (ESNext)', level: 'Primary', desc: 'Asynchronous event loops, DOM APIs, modern runtime features', usedIn: 'prepNep, Lumino' },
      { name: 'Rust', level: 'Systems', desc: 'Memory safety, zero-cost abstractions, Bevy game engine', usedIn: '2D Shooting Game' },
      { name: 'Python', level: 'Secondary', desc: 'Automation scripts, data manipulation, backend utilities', usedIn: 'Tooling & Data Scripts' },
      { name: 'C / C++', level: 'Foundational', desc: 'Systems programming fundamentals, memory allocation', usedIn: 'Systems Foundations' },
      { name: 'SQL', level: 'Primary', desc: 'Relational data modeling, indexing, query optimization', usedIn: 'prepNep, PostgreSQL' }
    ]
  },
  {
    title: 'Frontend Architecture',
    icon: Layers,
    skills: [
      { name: 'React 19', level: 'Expert', desc: 'Server components, concurrent hooks, state management', usedIn: 'prepNep, Lumino, ShareAudit' },
      { name: 'Next.js', level: 'Expert', desc: 'App router, SSR/SSG, edge rendering, API routes', usedIn: 'prepNep, CarbonCredit' },
      { name: 'Tailwind CSS', level: 'Expert', desc: 'Design systems, responsive desktop UI, micro-interactions', usedIn: 'All Web Projects' },
      { name: 'Redux Toolkit', level: 'Advanced', desc: 'Predictable state stores, normalized entity adapters', usedIn: 'prepNep Exam State' },
      { name: 'WebSockets', level: 'Advanced', desc: 'Bidirectional low-latency real-time client sync', usedIn: 'prepNep Test Sessions' }
    ]
  },
  {
    title: 'Backend & Data',
    icon: Server,
    skills: [
      { name: 'Node.js & Express', level: 'Primary', desc: 'High-throughput microservices, REST APIs', usedIn: 'prepNep APIs' },
      { name: 'PostgreSQL', level: 'Primary', desc: 'Complex relational schemas, transactions, indexing', usedIn: 'prepNep Database' },
      { name: 'Redis', level: 'Advanced', desc: 'In-memory caching, session storage, pub/sub', usedIn: 'prepNep Cache & Sharding' },
      { name: 'RESTful APIs', level: 'Expert', desc: 'Clean resource design, authentication, OpenAPI specs', usedIn: 'All Backend Systems' },
      { name: 'GraphQL', level: 'Working', desc: 'Type-safe queries, schema federation', usedIn: 'API Prototypes' }
    ]
  },
  {
    title: 'Systems & Infrastructure',
    icon: Cpu,
    skills: [
      { name: 'Docker', level: 'Advanced', desc: 'Containerization, multi-stage builds, compose networks', usedIn: 'prepNep Deployments' },
      { name: 'Linux / Unix', level: 'Primary', desc: 'Shell scripting, bash workflows, system monitoring', usedIn: 'DevOps & Server Environments' },
      { name: 'Git & GitHub', level: 'Expert', desc: 'Version control, atomic commits, PR code review', usedIn: 'All Workflows' },
      { name: 'CI / CD & Vercel', level: 'Advanced', desc: 'Automated test runners, continuous deployment pipelines', usedIn: 'Production Pipelines' },
      { name: 'Bevy Engine (Rust)', level: 'Systems', desc: 'ECS architecture, deterministic physics simulation', usedIn: '2D Shooting Game' }
    ]
  }
]

export default function SkillsApp({ onOpenApp }) {
  const [activeTab, setActiveTab] = useState('visual') // 'visual' | 'json'
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedJson, setCopiedJson] = useState(false)

  const categories = ['All', 'Languages', 'Frontend Architecture', 'Backend & Data', 'Systems & Infrastructure']

  const rawJson = JSON.stringify(
    SKILLS_CATEGORIES.reduce((acc, cat) => {
      acc[cat.title] = cat.skills.map((s) => ({
        name: s.name,
        level: s.level,
        description: s.desc,
        usedIn: s.usedIn
      }))
      return acc
    }, {}),
    null,
    2
  )

  const handleCopyJson = () => {
    navigator.clipboard.writeText(rawJson)
    setCopiedJson(true)
    soundFX.play('click')
    setTimeout(() => setCopiedJson(false), 2000)
  }

  const filteredCategories = SKILLS_CATEGORIES.map((cat) => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) return null

    const matchingSkills = cat.skills.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase()) ||
      s.usedIn.toLowerCase().includes(search.toLowerCase())
    )

    if (matchingSkills.length === 0) return null
    return { ...cat, skills: matchingSkills }
  }).filter(Boolean)

  return (
    <div className="flex flex-col h-full bg-[#181824] text-[#dcd7ba]">
      {/* Header bar */}
      <div className="p-3 bg-[#20202e] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#957fb8]" />
          <span className="text-xs font-mono font-medium text-white">System Profiler &bull; Skills &amp; Stack</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search technology..."
              className="pl-8 pr-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs w-36 sm:w-48 focus:outline-none focus:ring-1 focus:ring-[#7e9cd8]"
            />
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => {
                soundFX.play('click')
                setActiveTab('visual')
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                activeTab === 'visual' ? 'bg-[#7e9cd8] text-[#1f1f28] font-bold shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              Visual
            </button>
            <button
              type="button"
              onClick={() => {
                soundFX.play('click')
                setActiveTab('json')
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                activeTab === 'json' ? 'bg-[#7e9cd8] text-[#1f1f28] font-bold shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      {activeTab === 'visual' && (
        <div className="px-3.5 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundFX.play('click')
                setSelectedCategory(cat)
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white/15 text-white font-medium border border-white/20'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Main body */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {activeTab === 'visual' ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredCategories.map((cat, idx) => {
              const Icon = cat.icon
              return (
                <div key={idx} className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#938aa9] uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5 text-[#7e9cd8]" />
                    <span>{cat.title} ({cat.skills.length})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {cat.skills.map((s, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => onOpenApp?.('projects')}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-all flex flex-col justify-between space-y-2 cursor-pointer"
                        title="Click to view related projects"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{s.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-[#7e9cd8]">
                            {s.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#938aa9] leading-relaxed font-sans">
                          {s.desc}
                        </p>
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                          <span>Applied in:</span>
                          <span className="text-[#dca561] font-medium">{s.usedIn}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-white/50">skills_manifest.json</span>
              <button
                type="button"
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-[#76946a]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#121218] border border-white/10 font-mono text-xs text-[#76946a] overflow-x-auto shadow-inner leading-relaxed">
              <pre>{rawJson}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
