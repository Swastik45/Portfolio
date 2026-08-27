import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import About      from './components/About'
import Experience from './components/Experience'
import Projects   from './components/Projects'
import Skills     from './components/Skills'
import Contact    from './components/Contact'
import SideNav    from './components/SideNav'
import './index.css'

function App() {
  const [showTopButton, setShowTopButton] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 240)

      const ids    = ['about', 'experience', 'projects', 'skills', 'contact']
      const offset = window.scrollY + window.innerHeight * 0.4

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

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">

      <SideNav activeSection={activeSection} onSelectSection={scrollToSection} />

      {/* Main content
          Desktop: sections handle their own lg:pl-72 internally
          Mobile:  pb-16 clears the bottom dock (64px)           */}
      <main className="relative z-10 pb-24 lg:pb-0">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg border border-blue-400/30 transition-all duration-300 hover:-translate-y-1"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  )
}

export default App
