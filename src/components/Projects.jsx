import React, { useState, useCallback } from 'react'

const personalProjects = [
  {
    title: 'ShareAudit',
    description: 'A high-performance financial auditing dashboard designed to analyze stock portfolio risk concentration and growth metrics. Built with a focus on data accuracy and automated scraping logic for Nepal\'s NEPSE market.',
    link: 'https://share-audit.vercel.app/', 
    image: 'https://raw.githubusercontent.com/Swastik45/ShareAudit/refs/heads/main/public/dashboard.png',
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
    description: 'An autonomous accountability dashboard leveraging OSINT data collection to verify and track government reform agendas. Built to provide real-time, data-driven insights into governance milestones.',
    link: 'https://gova-audit-np.vercel.app/', 
    image: 'https://raw.githubusercontent.com/Swastik45/GovaAuditNP/refs/heads/main/frontend/public/Screenshot%20from%202026-04-19%2017-59-32.png',
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
    description: 'A decentralized marketplace for tracking and trading verified carbon credits. Uses satellite-derived NDVI analysis to automate plantation health verification and ensure data-driven transparency in carbon sequestration.',
    link: 'https://carbon-credit-opal.vercel.app/', 
    image: 'https://raw.githubusercontent.com/Swastik45/CarbonCredit/refs/heads/main/public/Screenshot%20from%202026-04-19%2018-06-27.png',
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
    description: 'An AI-powered image discovery platform that combines curated stock photography from Unsplash with AI-generated imagery. Search millions of photos or create unique visuals from text prompts in one beautiful interface.',
    link: 'https://lumino-five.vercel.app/',
    image: 'https://raw.githubusercontent.com/Swastik45/Lumino/refs/heads/main/Screenshot%20from%202026-05-14%2019-05-18.png',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Swastik45/Lumino',
    date: '2026',
    role: 'Full-Stack Developer',
    features: ['Unsplash stock photo search', 'AI image generation', 'Theme system'],
    techHighlights: ['Pollinations.ai integration', 'Responsive masonry grid', 'Dark/Light mode']
  },
  {
    title: '2D Shooting Game',
    description: 'A dynamic action game where you control a player character that must survive waves of enemies. Defeat enemies by shooting them with your gun while managing your health and avoiding enemy fire.',
    link: 'https://github.com/Swastik45/2D-Shooting-Game',
    image: 'https://raw.githubusercontent.com/Swastik45/2D-Shooting-Game/refs/heads/main/Screenshot%20from%202026-04-30%2018-26-25.png',
    technologies: ['Rust', 'Bevy Engine'],
    github: 'https://github.com/Swastik45/2D-Shooting-Game',
    date: '2026',
    role: 'Game Developer',
    features: ['Enemy AI waves', 'Combat system', 'Score tracking'],
    techHighlights: ['ECS architecture', 'Collision detection', 'Tile-based world']
  },
 
];

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null)

  const toggleProject = useCallback((index) => {
    setExpandedProject(prev => (prev === index ? null : index))
  }, [])

  return (
    <section
      id="projects"
      className="section-split min-h-screen py-20 px-4 sm:px-6 bg-transparent"
    >
      <div className="section-content relative z-10 max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-16 inline-block">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white">
            Selected Works
          </h2>
          <div className="h-4 bg-gradient-to-r from-blue-600 via-black to-red-600 w-full mt-2" />
        </div>

        <div className="grid grid-cols-1 gap-12">

          {personalProjects.map((project, index) => {
            const isExpanded = expandedProject === index

            return (
              <div
                key={`${project.title}-${index}`}
                className="relative bg-white/95 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden backdrop-blur-sm"
              >

                {/* top accent */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 to-red-600" />

                <div className="pt-4">

                  {/* HEADER */}
                  <div
                    role="button"
                    tabIndex={0}
                    className={`
                      p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between transition-all duration-200
                      ${isExpanded ? "bg-black text-white" : "hover:bg-gray-100 text-black"}
                    `}
                    onClick={() => toggleProject(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleProject(index)
                      }
                    }}
                  >

                    <div className="flex items-center gap-6">

                      <span className={`text-4xl font-black ${isExpanded ? "text-white/40" : "text-black/20"}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">
                          {project.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {(project.technologies || []).map((tech) => (
                            <span
                              key={tech}
                              className={`
                                text-[10px] font-black uppercase tracking-widest border-2 px-2 py-1
                                ${isExpanded ? "border-white" : "border-black"}
                              `}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="mt-4 md:mt-0">
                      <span className={`text-xs font-black uppercase px-4 py-2 border-2 ${isExpanded ? "border-white" : "border-black"}`}>
                        {isExpanded ? "HIDE DETAILS [-]" : "VIEW DETAILS [+]"}
                      </span>
                    </div>

                  </div>

                  {/* EXPANDED CONTENT */}
                  {isExpanded && (
                    <div className="p-8 border-t-4 border-black bg-white/95">

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* LEFT */}
                        <div className="space-y-6">

                          <p className="text-xl font-bold leading-tight border-l-8 border-red-600 pl-4 uppercase">
                            {project.description}
                          </p>

                          <div className="grid sm:grid-cols-2 gap-4">

                            <div className="p-4 border-2 border-black bg-gray-100">
                              <h4 className="font-black uppercase text-xs mb-3 text-red-600 tracking-widest">
                                Core Features
                              </h4>

                              <ul className="space-y-2 text-xs font-black">
                                {(project.features || []).map((f) => (
                                  <li key={f} className="flex gap-2">
                                    <span>//</span>{f}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 border-2 border-black bg-gray-100">
                              <h4 className="font-black uppercase text-xs mb-3 text-blue-600 tracking-widest">
                                Engineering
                              </h4>

                              <ul className="space-y-2 text-xs font-black">
                                {(project.techHighlights || []).map((t) => (
                                  <li key={t} className="flex gap-2">
                                    <span>&gt;</span>{t}
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 pt-4">

                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-black text-white text-center py-4 border-2 border-black font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
                            >
                              Source Code
                            </a>

                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 border-4 border-black text-center py-3 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                            >
                              Live System
                            </a>

                          </div>

                        </div>

                        {/* IMAGE */}
                        <div className="relative border-4 border-black bg-black aspect-video">

                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/800x400/000000/FFFFFF?text=NO+IMAGE"
                            }}
                          />

                          <div className="absolute bottom-2 right-2 bg-black text-white text-[10px] px-2 py-1 border border-white font-bold">
                            REF_IMG_{index + 1}
                          </div>

                        </div>

                      </div>

                    </div>
                  )}

                </div>

              </div>
            )
          })}

        </div>

      </div>
    </section>
  )
}

export default Projects