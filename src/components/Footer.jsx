import React from 'react'
import { Github, Mail, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 text-xs font-mono text-zinc-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-zinc-300 font-sans font-semibold text-sm">
              Swastik Paudel
            </p>
            <p className="text-zinc-500">
              Full-Stack Software Engineer · Kathmandu, Nepal
            </p>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <a href="#about" className="hover:text-zinc-200 transition-colors">About</a>
            <a href="#experience" className="hover:text-zinc-200 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-zinc-200 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-zinc-200 transition-colors">Stack</a>
            <a href="#contact" className="hover:text-zinc-200 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Swastik45"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            <a
              href="mailto:psamarpaudel@gmail.com"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-600">
          <p>© {new Date().getFullYear()} Swastik Paudel. All rights reserved.</p>
          <p>Built with React &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
