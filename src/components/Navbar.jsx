import React, { useState, useEffect } from 'react'
import { Github, ArrowUpRight, Search, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onOpenCommandPalette }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const ids = ['about', 'experience', 'projects', 'skills', 'contact']
      const offset = window.scrollY + window.innerHeight * 0.35

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (offset >= offsetTop && offset < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Floating Pill Nav with Zero Border Lines */}
      <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2 rounded-full bg-zinc-900/85 backdrop-blur-xl border border-zinc-800/90 shadow-2xl shadow-black/60 text-xs">
          
          {/* Brand Mark */}
          <a
            href="#about"
            className="flex items-center gap-2 font-mono font-semibold text-zinc-100 hover:text-white transition-colors pl-1"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>swastik.dev</span>
          </a>

          <div className="h-4 w-px bg-zinc-800 hidden md:block" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

          {/* Command Palette Trigger Button (Hallmark of elite UI developer sites) */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 transition-colors font-mono text-[11px]"
            title="Search & Commands (Ctrl+K)"
          >
            <Search className="w-3 h-3 text-zinc-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-700/80 text-[10px] text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Icon Link */}
          <a
            href="https://github.com/Swastik45"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-full transition-colors hidden sm:inline-flex"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 inset-x-4 z-40 bg-zinc-900/95 border border-zinc-800/90 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <a
              href="https://github.com/Swastik45"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCommandPalette()
              }}
              className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300"
            >
              Search (⌘K)
            </button>
          </div>
        </div>
      )}
    </>
  )
}