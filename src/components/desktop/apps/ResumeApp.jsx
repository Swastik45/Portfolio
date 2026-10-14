import React, { useRef, useState } from 'react'
import { Check, Copy, Download, Printer, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

const sections = ['Summary', 'Experience', 'Projects', 'Skills']

const resumeText = `SWASTIK PAUDEL
Software Engineer
Full-Stack Systems Developer
Kathmandu, Nepal
Email: psamarpaudel@gmail.com
Phone: +977 976-7929476
GitHub: github.com/Swastik45

PROFESSIONAL SUMMARY
Software engineer building full-stack products and production platforms, with experience in exam systems, real-time synchronization, database performance, and authentication. Currently developing prepNep at Madargaach Holdings.

PROFESSIONAL EXPERIENCE
Software Engineer | Madargaach Holdings — prepNep | 2024–Present | Nepal
- Build and maintain an online entrance-preparation platform serving students across Nepal.
- Engineered test-session synchronization under 50 ms with offline recovery; optimized PostgreSQL and Redis for automated evaluation.
- Delivered mock tests, analytics, revision tools, authentication, payments, and administration; maintained 99.9% availability during peak examination periods.
Technologies: Next.js, React, TypeScript, PostgreSQL, Redis, Docker

SELECTED PROJECTS
ShareAudit — Financial portfolio analytics dashboard | React, TypeScript, Chart.js | share-audit.vercel.app
GovAudit NP — Municipal budget and public expenditure tracking | React, TypeScript | gova-audit-np.vercel.app
CarbonCredit — Carbon-credit registry and certificate tracking | Next.js, React, Web3 | carbon-credit1.vercel.app
2D Arcade Game — Deterministic shooter built with Rust and Bevy ECS | github.com/Swastik45/2D-Shooting-Game

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Rust, Python, C++, SQL
Frontend: React, Next.js, Tailwind CSS, Redux Toolkit, WebSockets
Backend & Data: Node.js, Express, PostgreSQL, Redis, REST APIs, GraphQL
Infrastructure: Docker, Linux, Git, CI/CD, Vercel`

export default function ResumeApp() {
  const [copied, setCopied] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [zoom, setZoom] = useState(100)
  const sheetRef = useRef(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resumeText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Unable to copy résumé text.', error)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Swastik-Paudel-Resume.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handlePrint = async () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      console.error('The résumé print window was blocked. Allow pop-ups and try again.')
      return
    }

    printWindow.opener = null
    const printDocument = printWindow.document
    printDocument.open()
    printDocument.write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Swastik Paudel — Résumé</title></head><body></body></html>')
    printDocument.close()

    const base = printDocument.createElement('base')
    base.href = document.baseURI
    printDocument.head.appendChild(base)

    const stylesheetLoads = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((source) => (
      new Promise((resolve, reject) => {
        const link = printDocument.createElement('link')
        link.rel = 'stylesheet'
        link.href = source.href
        link.onload = resolve
        link.onerror = () => reject(new Error(`Unable to load résumé print styles: ${source.href}`))
        printDocument.head.appendChild(link)
      })
    ))

    const printStyles = printDocument.createElement('style')
    printStyles.textContent = `
      @page { size: A4; margin: 14mm 15mm; }
      html, body {
        width: auto !important; height: auto !important; min-height: 0 !important;
        margin: 0 !important; padding: 0 !important; overflow: visible !important;
        background: #fff !important;
      }
      body {
        color: #263445 !important;
        font: 9.5pt/1.42 Arial, Helvetica, sans-serif !important;
        print-color-adjust: exact; -webkit-print-color-adjust: exact;
      }
      .resume-print-sheet {
        display: block !important; width: auto !important; max-width: none !important;
        margin: 0 !important; padding: 0 !important; overflow: visible !important;
        border: 0 !important; border-radius: 0 !important; background: #fff !important;
        color: #263445 !important; box-shadow: none !important; zoom: 1 !important;
      }
      .resume-page {
        min-height: 0 !important; margin: 0 !important; padding: 0 !important;
        border: 0 !important; background: #fff !important; box-shadow: none !important;
      }
      .resume-page + .resume-page { break-before: page; page-break-before: always; }
      .resume-document, .resume-document * {
        box-sizing: border-box !important; color: #263445 !important;
        box-shadow: none !important; text-shadow: none !important;
      }
      .resume-document {
        display: block !important; width: 100% !important; max-width: none !important;
        margin: 0 !important; padding: 0 !important; gap: 0 !important;
        background: #fff !important; zoom: 1 !important;
      }
      .resume-document h1 { color: #152338 !important; font-size: 25pt !important; }
      .resume-document h2 {
        color: #183b61 !important; border-color: #7e9bc0 !important;
        break-after: avoid; page-break-after: avoid;
      }
      .resume-document h3 { color: #17283c !important; }
      .resume-document a { color: #245da8 !important; text-decoration: none !important; }
      .resume-document li,
      .resume-document .resume-project {
        break-inside: avoid; page-break-inside: avoid;
      }
      .resume-document .resume-contact,
      .resume-document .resume-skills-list { display: block !important; }
      .resume-document .resume-contact > *,
      .resume-document .resume-skills-list > * { margin-right: 0.5em !important; }
      .resume-document .resume-accent { color: #315f9a !important; }
    `
    printDocument.head.appendChild(printStyles)

    const printedSheet = sheetRef.current?.cloneNode(true)
    if (!printedSheet) {
      printWindow.close()
      console.error('The résumé content was unavailable for printing.')
      return
    }

    printedSheet.classList.add('resume-print-sheet')
    printedSheet.style.zoom = '1'
    printDocument.body.appendChild(printedSheet)
    printWindow.addEventListener('afterprint', () => printWindow.close(), { once: true })

    try {
      await Promise.all(stylesheetLoads)
      await printDocument.fonts.ready
      printWindow.requestAnimationFrame(() => {
        printWindow.requestAnimationFrame(() => printWindow.print())
      })
    } catch (error) {
      printWindow.close()
      console.error('Could not prepare the résumé for printing.', error)
    }
  }

  const goToSection = (nextIndex) => {
    const boundedIndex = Math.max(0, Math.min(sections.length - 1, nextIndex))
    setSectionIndex(boundedIndex)
    sheetRef.current?.querySelector(`[data-resume-section="${boundedIndex}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="resume-app flex h-full flex-col bg-[#111820] text-[#263445]">
      <div className="resume-ui flex h-10 shrink-0 items-center gap-2 border-b border-[#303b48] bg-[#1a232d] px-3 text-[11px]">
        <span className="flex h-full items-center gap-2 border-b-2 border-[#4da3ff] px-2 font-medium text-[#e8edf3]">
          <span className="rounded-sm bg-[#d94a45] px-1 py-0.5 text-[8px] font-bold leading-none text-white">PDF</span>
          Swastik_Paudel_Resume.pdf
        </span>
        <span className="ml-auto hidden text-[9px] text-[#91a0b1] sm:block">ATS-friendly résumé preview</span>
      </div>

      <div className="resume-ui flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-[#303b48] bg-[#151e27] px-3 py-2 text-xs">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goToSection(sectionIndex - 1)} disabled={sectionIndex === 0} aria-label="Previous résumé section" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ChevronLeft className="h-3.5 w-3.5" /></button>
          <span className="min-w-28 text-center text-[10px] text-[#b6c2ce]">{sections[sectionIndex]} · {sectionIndex + 1} of {sections.length}</span>
          <button type="button" onClick={() => goToSection(sectionIndex + 1)} disabled={sectionIndex === sections.length - 1} aria-label="Next résumé section" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ChevronRight className="h-3.5 w-3.5" /></button>
        </div>

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setZoom((value) => Math.max(80, value - 10))} disabled={zoom <= 80} title="Zoom out" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ZoomOut className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={() => setZoom(100)} title="Reset zoom" className="min-w-10 rounded px-1 py-1.5 text-[10px] text-[#b6c2ce] hover:bg-[#263442]">{zoom}%</button>
          <button type="button" onClick={() => setZoom((value) => Math.min(120, value + 10))} disabled={zoom >= 120} title="Zoom in" className="rounded p-1.5 text-[#b6c2ce] hover:bg-[#263442] disabled:opacity-35"><ZoomIn className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={handleCopy} className="inline-flex items-center gap-1.5 rounded-lg border border-[#394653] bg-[#202b35] px-2.5 py-1.5 text-[#c8d2de] transition-colors hover:bg-[#2a3745]">
            {copied ? <Check className="h-3.5 w-3.5 text-[#76946a]" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden text-[10px] sm:inline">{copied ? 'Copied' : 'Copy text'}</span>
          </button>
          <button type="button" onClick={handleDownload} className="inline-flex items-center gap-1.5 rounded-lg border border-[#394653] bg-[#202b35] px-2.5 py-1.5 text-[#c8d2de] transition-colors hover:bg-[#2a3745]">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden text-[10px] sm:inline">.txt</span>
          </button>
          <button type="button" onClick={handlePrint} className="inline-flex items-center gap-1.5 rounded-lg bg-[#2878d0] px-3 py-1.5 font-semibold text-white transition-colors hover:bg-[#1f67b8]">
            <Printer className="h-3.5 w-3.5" />
            <span className="text-[10px]">Print / Save PDF</span>
          </button>
        </div>
      </div>

      <div className="resume-print-scroll min-h-0 flex-1 overflow-auto bg-[#dce2ea] p-3 sm:p-6">
        <article ref={sheetRef} className="resume-document mx-auto max-w-3xl text-[#263445]" style={{ zoom: `${zoom}%` }}>
          <div className="resume-page">
            <header data-resume-section="0" className="resume-header">
              <p className="resume-label">SOFTWARE ENGINEER</p>
              <h1>Swastik Paudel</h1>
              <p className="resume-headline">Full-Stack Systems Developer</p>
              <div className="resume-contact">
                <span>Kathmandu, Nepal</span>
                <a href="mailto:psamarpaudel@gmail.com">psamarpaudel@gmail.com</a>
                <a href="tel:+9779767929476">+977 976-7929476</a>
                <a href="https://github.com/Swastik45">github.com/Swastik45</a>
              </div>
            </header>

            <section className="resume-section">
              <h2>Professional Summary</h2>
              <p>Software engineer building full-stack products and production platforms, with experience in exam systems, real-time synchronization, database performance, and authentication. Currently developing prepNep at Madargaach Holdings.</p>
            </section>

            <section data-resume-section="1" className="resume-section">
              <h2>Professional Experience</h2>
              <div className="resume-role-heading">
                <div>
                  <h3>Software Engineer</h3>
                  <p>Madargaach Holdings <span className="resume-separator">|</span> prepNep</p>
                </div>
                <p>2024–Present <span className="resume-separator">|</span> Nepal</p>
              </div>
              <ul>
                <li>Build and maintain an online entrance-preparation platform serving students across Nepal.</li>
                <li>Engineered test-session synchronization under 50 ms with offline recovery; optimized PostgreSQL and Redis for automated evaluation.</li>
                <li>Delivered mock tests, analytics, revision tools, authentication, payments, and administration; maintained 99.9% availability during peak examination periods.</li>
              </ul>
              <p className="resume-skills-line"><strong>Technologies:</strong> Next.js, React, TypeScript, PostgreSQL, Redis, Docker</p>
            </section>

            <section data-resume-section="2" className="resume-section">
              <h2>Selected Projects</h2>
              <div className="resume-project resume-project-compact">
                <h3>ShareAudit <span className="resume-separator">|</span> Financial Portfolio Analytics</h3>
                <p>Portfolio valuation, dividend tracking, risk analysis, and financial auditing.</p>
                <p><strong>React, TypeScript, Chart.js</strong> <span className="resume-separator">|</span> <a href="https://share-audit.vercel.app/">share-audit.vercel.app</a></p>
              </div>
              <div className="resume-project resume-project-compact">
                <h3>GovAudit NP <span className="resume-separator">|</span> Civic Data and Accountability</h3>
                <p>Public-data platform tracking municipal budgets and public expenditure.</p>
                <p><strong>React, TypeScript, Open Government Data</strong> <span className="resume-separator">|</span> <a href="https://gova-audit-np.vercel.app/">gova-audit-np.vercel.app</a></p>
              </div>
              <div className="resume-project resume-project-compact">
                <h3>CarbonCredit <span className="resume-separator">|</span> Climate Technology</h3>
                <p>Carbon-credit registry for emissions accounting and certificate tracking.</p>
                <p><strong>Next.js, React, Web3</strong> <span className="resume-separator">|</span> <a href="https://carbon-credit1.vercel.app/">carbon-credit1.vercel.app</a></p>
              </div>
              <div className="resume-project resume-project-compact">
                <h3>2D Arcade Game <span className="resume-separator">|</span> Systems Programming</h3>
                <p>Deterministic arcade shooter using Rust, Bevy, and entity-component-system architecture.</p>
                <p><strong>Rust, Bevy Engine, ECS</strong> <span className="resume-separator">|</span> <a href="https://github.com/Swastik45/2D-Shooting-Game">GitHub repository</a></p>
              </div>
            </section>

            <section data-resume-section="3" className="resume-section">
              <h2>Technical Skills</h2>
              <dl className="resume-skills-list">
                <div><dt>Languages</dt><dd>TypeScript, JavaScript, Rust, Python, C++, SQL</dd></div>
                <div><dt>Frontend</dt><dd>React, Next.js, Tailwind CSS, Redux Toolkit, WebSockets</dd></div>
                <div><dt>Backend &amp; Data</dt><dd>Node.js, Express, PostgreSQL, Redis, REST APIs, GraphQL</dd></div>
                <div><dt>Infrastructure</dt><dd>Docker, Linux, Git, CI/CD, Vercel</dd></div>
              </dl>
            </section>
          </div>
        </article>
      </div>
    </div>
  )
}
