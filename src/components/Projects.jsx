import React, { useState, useEffect, useCallback } from 'react'
import { FolderGit2, ExternalLink, Github, ChevronDown, ChevronUp, Filter } from 'lucide-react'

const personalProjects = [
  {
    title: 'ShareAudit',
    category: 'FinTech & Auditing',
    description: 'A high-performance financial auditing dashboard designed to analyze stock portfolio risk concentration and growth metrics. Built with automated scraping logic for Nepal\'s NEPSE market.',
    link: 'https://share-audit.vercel.app/', 
    technologies: ['Next.js', 'TypeScript', 'Tremor', 'Tailwind CSS'],
    github: 'https://github.com/Swastik45/ShareAudit',
    date: '2026',
    role: 'Systems Architect',
    features: [
      'Tax & WACC auditing logic',
      'Risk concentration analysis',
      'Privacy-first data processing'
    ],
    techHighlights: [
      'High-performance NEPSE scraping',
      'Real-time financial dashboarding',
      'Self-healing data pipeline'
    ]
  },
  {
    title: 'GovAudit NP',
    category: 'FinTech & Auditing',
    description: 'An autonomous accountability dashboard leveraging OSINT data collection to verify and track government reform agendas. Built to provide real-time, data-driven insights into governance milestones.',
    link: 'https://gova-audit-np.vercel.app/', 
    technologies: ['Next.js', 'TypeScript', 'Python', 'jsPDF'],
    github: 'https://github.com/Swastik45/GovaAuditNP',
    date: '2026',
    role: 'Lead Systems Architect',
    features: [
      'Autonomous OSINT verification engine',
      'Real-time accountability metrics',
      'Programmatic PDF report generation'
    ],
    techHighlights: [
      'Automated public data parsing',
      'Archive snapshots for historical review',
      'Mission-critical data tracking'
    ]
  },
  {
    title: 'CarbonCredit',
    category: 'Web & Decentralized',
    description: 'A decentralized marketplace for tracking and trading verified carbon credits. Uses satellite-derived NDVI analysis to automate plantation health verification and ensure data-driven transparency.',
    link: 'https://carbon-credit-opal.vercel.app/', 
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Leaflet'],
    github: 'https://github.com/Swastik45/CarbonCredit',
    date: '2026',
    role: 'Full-Stack Developer',
    features: [
      'Multi-role authentication system',
      'Interactive plantation mapping',
      'NDVI satellite verification'
    ],
    techHighlights: [
      'Satellite data integration',
      'Real-time verification workflow',
      'Farmer & Business dashboards'
    ]
  },
  {
    title: 'Lumino',
    category: 'Web & Decentralized',
    description: 'An AI-powered image discovery platform combining curated stock photography with generative AI visuals. Search millions of photos or create unique artwork from text prompts.',
    link: 'https://lumino-five.vercel.app/',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Swastik45/Lumino',
    date: '2026',
    role: 'Full-Stack Developer',
    features: ['Unsplash stock photo search', 'AI image generation', 'Theme system'],
    techHighlights: ['Pollinations.ai integration', 'Responsive masonry grid', 'Dark/Light mode']
  },
  {
    title: '2D Shooting Game',
    category: 'Game Dev & Systems',
    description: 'A dynamic action game built with Rust and Bevy Engine. Control a player character that must survive waves of enemies with collision physics and score tracking.',
    link: 'https://github.com/Swastik45/2D-Shooting-Game',
    technologies: ['Rust', 'Bevy Engine'],
    github: 'https://github.com/Swastik45/2D-Shooting-Game',
    date: '2026',
    role: 'Game Developer',
    features: ['Enemy AI waves', 'Combat system', 'Score tracking'],
    techHighlights: ['ECS architecture', 'Collision detection', 'Tile-based world']
  },
];

const categories = ['All', 'FinTech & Auditing', 'Web & Decentralized', 'Game Dev & Systems']
const ProjectPreview = ({ project }) => {
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false`, {
      signal: controller.signal
    })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Preview request failed')))
      .then(data => setPreviewImage(data.data?.screenshot?.url || null))
      .catch(() => setPreviewImage(null))

    return () => controller.abort()
  }, [project.link])

  return previewImage ? (
    <img
      src={previewImage}
      alt={project.title}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      onError={() => setPreviewImage(null)}
    />
  ) : (
    <div className="flex h-full items-center justify-center bg-slate-900 text-sm font-semibold tracking-wider text-slate-500">
      Loading preview...
    </div>
  )
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedProject, setExpandedProject] = useState(0)

  const toggleProject = useCallback((index) => {
    setExpandedProject(prev => (prev === index ? null : index))
  }, [])

  const filteredProjects = personalProjects.filter(p =>
    activeCategory === 'All' ? true : p.category === activeCategory
  )

  return (
    <section id="projects" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-content max-w-6xl mx-auto px-4 sm:px-6 lg:pl-72">

        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <FolderGit2 className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Portfolio & Open Source
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Selected Works
          </h2>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 w-24 mt-4 rounded-full" />
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            Filter:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setExpandedProject(0)
                }}
                className={`
                  px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200
                  ${isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}
                `}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProject === index

            return (
              <div
                key={`${project.title}-${index}`}
                className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-slate-700 shadow-xl"
              >
                {/* Always-visible project screenshot */}
                <div className="relative w-full aspect-video overflow-hidden bg-slate-950 border-b border-slate-800">
                  <ProjectPreview project={project} />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold text-slate-300 bg-slate-900/80 backdrop-blur-sm rounded-md border border-slate-700">
                    {project.category}
                  </span>
                </div>

                {/* Header Toggle */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleProject(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleProject(index) }
                  }}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="text-xl font-bold text-slate-500 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.technologies || []).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 text-[10px] font-medium text-blue-300 bg-blue-950/60 border border-blue-800/50 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 shrink-0">
                    <span>{isExpanded ? 'Hide' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Project Content */}
                {isExpanded && (
                  <div className="px-6 pb-8 pt-4 sm:px-8 border-t border-slate-800/80 bg-slate-950/40 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                      {/* Left Column: Info & Links */}
                      <div className="space-y-6">
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed border-l-4 border-blue-500 pl-4">
                          {project.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                            <h4 className="font-bold text-blue-400 uppercase tracking-wider">
                              Core Features
                            </h4>
                            <ul className="space-y-1.5 text-slate-300">
                              {(project.features || []).map((f) => (
                                <li key={f} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                            <h4 className="font-bold text-indigo-400 uppercase tracking-wider">
                              Engineering
                            </h4>
                            <ul className="space-y-1.5 text-slate-300">
                              {(project.techHighlights || []).map((t) => (
                                <li key={t} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      {/* Links */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl border border-slate-700 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-md"
                        >
                          <span>Live Project</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Projects