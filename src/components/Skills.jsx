import React from 'react'
import { Cpu, Award } from 'lucide-react'

const technicalStack = [
  {
    category: 'Development Architecture',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'PHP', 'JavaScript (ES6+)'],
  },
  {
    category: 'Data & Systems',
    skills: ['PostgreSQL', 'Prisma ORM', 'Supabase', 'MongoDB', 'Redis', 'Firebase / Firestore'],
  },
  {
    category: 'Tools & Infrastructure',
    skills: ['WebAuthn', 'Twilio / Nodemailer', 'Tailwind CSS', 'Git & GitHub', 'KaTeX', 'System Auditing'],
  }
]

const accomplishments = [
  {
    title: '2nd Runner Up',
    organization: 'Code for Change +2 Grads Hackathon',
    description: 'Awarded for technical execution and innovative problem solving among top secondary graduates.',
    icon: '🏆'
  },
  {
    title: 'Certified Developer',
    organization: 'freeCodeCamp',
    description: 'Completed comprehensive curriculum covering Responsive Web Design and JavaScript Algorithms.',
    icon: '📜'
  },
  {
    title: 'Systems Auditor',
    organization: 'Freelance & Open Source',
    description: 'Managing and optimizing technical infrastructure for client platforms with focus on code quality.',
    icon: '⚙️'
  }
]

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-content max-w-6xl mx-auto px-4 sm:px-6 lg:pl-72 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">

        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Skills & Recognition
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Technical Arsenal
          </h2>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 w-24 mt-4 rounded-full" />
        </div>

        {/* Accomplishments Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {(accomplishments || []).map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md hover:border-slate-700 transition-all shadow-xl space-y-3"
            >
              <div className="text-3xl mb-2">{item.icon}</div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {item.organization}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(technicalStack || []).map((stack, idx) => (
            <div
              key={`${stack.category}-${idx}`}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl"
            >
              {/* Header */}
              <div className="bg-slate-950/60 p-5 border-b border-slate-800">
                <h3 className="text-base font-bold text-white uppercase tracking-wider text-center">
                  {stack.category}
                </h3>
              </div>

              {/* Skill List */}
              <div className="p-6 sm:p-8">
                <ul className="space-y-3.5">
                  {(stack.skills || []).map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-slate-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                      <span className="text-base font-medium">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-slate-400">
          <p className="text-lg font-semibold text-slate-300">
            Always optimizing. Always building.
          </p>

          <span className="px-3 py-1 text-xs font-medium bg-slate-900 border border-slate-800 rounded-full text-slate-400">
            v2.0.26
          </span>
        </div>

      </div>
    </section>
  )
}

export default Skills