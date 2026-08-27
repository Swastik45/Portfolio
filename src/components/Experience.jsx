import React, { useState, useCallback } from 'react'
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronDown, ChevronUp, Rocket, Trophy, Target, BookOpen, Share2, LayoutDashboard, Sparkles, CheckCircle2 } from 'lucide-react'

const experiences = [
  {
    company: 'Madargaach Holdings',
    role: 'Software Intern → Full Stack Developer',
    period: '2025 — Present',
    location: 'Nepal',
    project: 'Padhum',
    tagline: 'Interactive Exam Preparation & Study Platform',
    description:
      'Led end-to-end full stack development of Padhum — an IOE and medical entrance preparation platform serving interactive practice tests, LaTeX formula recall, global leaderboards, and progress analytics.',
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

const padhumModules = [
  {
    id: 'dashboard',
    title: 'Overview Dashboard',
    subtitle: 'Student Workspace & Daily Roadmap',
    icon: <LayoutDashboard className="w-4 h-4" />,
    image: './padhum-dashboard.png',
    features: [
      'Daily practice MCQ challenge with instant explanation',
      'Weighted syllabus progress tracker across Physics, Chemistry & Math',
      'Live effective study time counter & average accuracy metrics',
      'Quick action shortcuts for formulas, tests, and study notes'
    ]
  },
  {
    id: 'leaderboard',
    title: 'Global Leaderboard & WMA Rating',
    subtitle: 'Competitive Ranking Podium',
    icon: <Trophy className="w-4 h-4 text-amber-400" />,
    image: './padhum-gallery/leaderboard.png',
    features: [
      'National entrance rank podium highlighting top candidates',
      'WMA performance rating system and accumulated total XP tracking',
      'Division tiers ranging from Bronze to Diamond & Mythical status',
      'Profile inquiry & head-to-head candidate score comparison'
    ]
  },
  {
    id: 'vimgolf',
    title: 'VimGolf Formula Arena',
    subtitle: 'Precision Equation Recall Game',
    icon: <Target className="w-4 h-4 text-indigo-400" />,
    image: './padhum-gallery/vimgolf.png',
    features: [
      'Fill-in-the-blank formula completion with minimum keystrokes',
      'Interactive token selector supporting KaTeX math equations',
      'Streak counter, stroke counter, and point reward system',
      'Mnemonic formula hooks to assist quick recall under timed pressure'
    ]
  },
  {
    id: 'formulas',
    title: 'Formula Catalog & Index',
    subtitle: '127+ Utilitarian Formula Cards',
    icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
    image: './padhum-gallery/formulas.png',
    features: [
      'Searchable catalog across Physics, Chemistry, and Mathematics',
      'KaTeX LaTeX equation rendering with chapter skill trees',
      'One-click bookmarking for starred formulas and quick revision',
      'Direct link to Speed Recall Arena for instant self-assessment'
    ]
  },
  {
    id: 'quiz',
    title: 'Practice Test & Mock Simulation Hub',
    subtitle: 'Multi-Mode Testing Engine',
    icon: <Sparkles className="w-4 h-4 text-blue-400" />,
    image: './padhum-gallery/quiz.png',
    features: [
      'Smart Practice with 10 high-yield questions for rapid assessment',
      '5-minute Blitz Rapid Fire and 120-minute Full IOE Exam Simulation',
      'Subject-wise practice targeting Physics, Chemistry, Math & English',
      'IOE Classic past entrance paper collections grouped by year'
    ]
  },
  {
    id: 'referral',
    title: 'Referral & Pro Access Ecosystem',
    subtitle: 'Classmate Invite & Reward Engine',
    icon: <Share2 className="w-4 h-4 text-emerald-400" />,
    image: './padhum-gallery/referral.png',
    features: [
      'Earn 3 days free Pro access for every invited entrance candidate',
      'Unique referral code generator and instant copyable link',
      'Scannable QR Pass for mobile camera instant registration',
      'Classmate code redemption box with instant reward validation'
    ]
  }
]

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState(padhumModules[0])

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
            Experience & Featured Platform
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
                    {/* Top Production Banner */}
                    <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-800/50 rounded-2xl p-6 space-y-4 shadow-lg">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="px-2.5 py-1 text-[11px] font-bold text-amber-300 bg-amber-950/70 border border-amber-800/60 rounded-full inline-flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-3 h-3" />
                            PRODUCTION APP DEVELOPED DURING INTERNSHIP
                          </span>
                          <h4 className="text-2xl font-black text-white tracking-tight">
                            {exp.project} — {exp.tagline}
                          </h4>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* INTERACTIVE MULTI-MODULE TAB EXPLORER */}
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <span>Padhum Application Modules & Feature Explorer</span>
                          </h4>
                          <p className="text-xs text-slate-400">Click tabs below to switch production screenshots & features</p>
                        </div>
                      </div>

                      {/* Module Tabs */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {padhumModules.map((mod) => {
                          const isActive = activeTab.id === mod.id

                          return (
                            <button
                              key={mod.id}
                              onClick={() => setActiveTab(mod)}
                              className={`
                                flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 gap-1.5
                                ${isActive
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'}
                              `}
                            >
                              <div>{mod.icon}</div>
                              <span className="text-xs font-bold leading-tight">
                                {mod.title.split('&')[0]}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      {/* Active Tab Preview Box */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden p-4 sm:p-6 space-y-6 shadow-2xl">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div>
                            <h5 className="text-lg font-bold text-white flex items-center gap-2">
                              <span>{activeTab.title}</span>
                            </h5>
                            <p className="text-xs font-medium text-blue-400">{activeTab.subtitle}</p>
                          </div>
                          <span className="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
                            /home/{activeTab.id}
                          </span>
                        </div>

                        {/* High Res Screenshot */}
                        <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950 aspect-video shadow-md group">
                          <img
                            src={activeTab.image}
                            alt={activeTab.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            onError={(e) => {
                              e.currentTarget.src = "./padhum-dashboard.png"
                            }}
                          />
                        </div>

                        {/* Module Features List */}
                        <div className="space-y-3">
                          <h6 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Key Features & Technical Implementation
                          </h6>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                            {activeTab.features.map((feat, i) => (
                              <div key={i} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span className="leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
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



