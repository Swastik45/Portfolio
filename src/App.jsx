import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

import './index.css'


function App() {
  return (
    <>
      <Navbar />

      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  )
}

export default App
