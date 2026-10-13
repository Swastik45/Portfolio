import React from 'react'

const stackGroups = [
  {
    category: 'Languages & Core',
    items: ['TypeScript', 'JavaScript (ES6+)', 'Rust', 'Python', 'PHP', 'SQL', 'HTML5 & CSS3'],
  },
  {
    category: 'Frameworks & Frontend',
    items: ['Next.js (App Router)', 'React 19', 'Tailwind CSS v4', 'KaTeX Math', 'Vite'],
  },
  {
    category: 'Backend & Data Systems',
    items: ['Node.js', 'PostgreSQL', 'Prisma ORM', 'Supabase', 'Redis', 'MongoDB', 'REST APIs'],
  },
  {
    category: 'Systems & Infrastructure',
    items: ['Bevy Engine (ECS)', 'Capacitor (Android)', 'Git & GitHub', 'WebAuthn', 'Linux / Bash', 'System Auditing'],
  },
]

const credentials = [
  {
    title: '2nd Runner Up',
    issuer: 'Code for Change +2 Grads Hackathon',
    year: '2025',
    detail: 'Awarded for technical execution, speed, and innovative problem solving among top secondary graduates.',
  },
  {
    title: 'Certified Developer',
    issuer: 'freeCodeCamp',
    year: '2024',
    detail: 'Completed comprehensive curriculum covering Responsive Web Design, Data Structures, and JavaScript Algorithms.',
  },
  {
    title: 'Systems Auditor & Contributor',
    issuer: 'Freelance & Open Source',
    year: 'Active',
    detail: 'Auditing and optimizing technical infrastructure for client platforms with a focus on code quality and security.',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            03 / Skills &amp; Credentials
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Technical Stack
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-500">
            Languages, frameworks, data stores, and tools used day-to-day
          </p>
        </div>

        {/* Desktop 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4"
            >
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
                {group.category}
              </h3>

              <ul className="space-y-2 font-mono text-xs text-zinc-300">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Credentials / Honors Section */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Recognition &amp; Credentials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {credentials.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-2"
              >
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>{c.issuer}</span>
                  <span>{c.year}</span>
                </div>
                <h4 className="text-base font-bold text-zinc-200 tracking-tight">
                  {c.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}