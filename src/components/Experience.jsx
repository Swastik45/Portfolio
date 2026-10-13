import React from 'react'
import { ArrowUpRight, ExternalLink, Globe } from 'lucide-react'

const highlights = [
  'Engineered interactive mock test interfaces with timer mechanics, evaluation logic, and score summaries.',
  'Implemented caching layers with Redis and client-side optimization to support fast page transitions.',
  'Configured cross-platform mobile application builds for Android utilizing Capacitor.',
  'Built user progress tracking dashboards, practice streaks, and subject-level performance metrics.',
  'Integrated secure user authentication, modern passkey capabilities, and protected route access.',
]

const stack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'PostgreSQL',
  'Prisma',
  'Redis',
  'Capacitor',
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            01 / Work Experience
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Commercial Engineering
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-500">
            Full-stack development for production educational platforms
          </p>
        </div>

        {/* Widescreen Desktop Card for Madargaach Holdings & prepNep */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 space-y-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800/80 pb-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                Full Stack Developer
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 mt-0.5">
                Madargaach Holdings · <span className="text-zinc-200 font-medium">prepNep</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span>2025 — Present</span>
              <span>•</span>
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Desktop 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (6 cols): Prose, Deliverables, Stack */}
            <div className="lg:col-span-6 space-y-5">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                Full-stack software developer on <a href="https://prepnep.com" target="_blank" rel="noopener noreferrer" className="text-zinc-100 font-medium underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-200 transition-colors">prepNep</a> (prepnep.com), an exam preparation platform serving thousands of engineering and medical entrance aspirants across Nepal. Focused on core examination interfaces, caching architectures, and mobile client releases.
              </p>

              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Key Engineering Responsibilities
                </h4>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-zinc-600 font-mono select-none">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs pt-2">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-3 text-xs font-mono">
                <a
                  href="https://prepnep.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-sans font-semibold transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit prepnep.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/Madargaach-Holdings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <span>GitHub Org</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column (6 cols): Desktop Live Browser Frame */}
            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl">
                {/* Browser top pill */}
                <div className="px-3.5 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>https://prepnep.com</span>
                  </div>
                  <a
                    href="https://prepnep.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    title="Open live site"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <a
                  href="https://prepnep.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/10] overflow-hidden group cursor-pointer"
                >
                  <img
                    src="./project-previews/prepnep.png"
                    alt="prepNep live deployment"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
