import React, { useState, useCallback } from 'react'
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

const experiences = [
  {
    company: 'Madargaach Holdings',
    role: 'Software Intern → Full Stack Developer',
    period: '2025 — Present',
    location: 'Nepal',
    description:
      'Led end-to-end full-stack software development for high-performance entrance preparation platforms, interactive testing systems, and progress analytics tools.',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Supabase',
      'Tailwind CSS',
      'Redis',
      'WebAuthn',
    ],
    highlights: [
      'Designed and built multi-provider auth supporting OTP, Google OAuth, and WebAuthn passkeys.',
      'Created interactive MCQ test engine with server-side grading and anti-cheat checks.',
      'Migrated production database from SQLite to Supabase PostgreSQL using Prisma ORM.',
      'Implemented WMA rating system, global leaderboards, milestone badges, and revision vault.',
      'Built VimGolf formula recall arena with fill-in-the-blank LaTeX math rendering.',
      'Shipped admin dashboard, payment flows, and question bank tools with duplicate detection.',
    ],
    org: 'https://github.com/Madargaach-Holdings',
  },
]

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const toggleExperience = useCallback((index) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }, [])

  return (
    <section id="experience" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-content max-w-6xl mx-auto px-4 sm:px-6 lg:pl-72">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Work Experience
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional Experience
          </h2>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 w-24 mt-4 rounded-full" />
        </div>

        {/* Experience List */}
        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index

            return (
              <div
                key={`${exp.company}-${index}`}
                className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-slate-700 shadow-xl"
              >
                {/* Header Toggle Bar */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExperience(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleExperience(index)
                    }
                  }}
                  className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>

                    <p className="text-base font-medium text-slate-300">
                      {exp.company}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium text-blue-300 bg-blue-950/60 border border-blue-800/50 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 shrink-0 self-start md:self-center">
                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="px-6 pb-8 pt-4 sm:px-8 border-t border-slate-800/80 bg-slate-950/40 space-y-8">
                    {/* Role Description */}
                    <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 space-y-3 shadow-lg">
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Work Responsibilities */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Responsibilities & Engineering Accomplishments
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                        {exp.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-800/80">
                      <a
                        href={exp.org}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors border border-slate-700"
                      >
                        <span>GitHub Organization</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
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

export default Experience



