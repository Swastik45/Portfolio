import React, { useState, useRef, useEffect } from 'react'

const COMMAND_LIST = [
  'help', 'projects', 'project', 'open', 'skills', 'experience', 
  'about', 'contact', 'cat', 'ls', 'dir', 'cd', 'pwd', 'theme', 
  'calc', 'curl', 'top', 'htop', 'whoami', 'uname', 'uptime', 
  'date', 'echo', 'history', 'neofetch', 'fetch', 'music', 'clear', 'sudo', 'exit'
]

const WALLPAPER_MAP = {
  '0': 'kathmandu',
  'kathmandu': 'kathmandu',
  '1': 'samurai',
  'samurai': 'samurai',
  '2': 'fuji',
  'fuji': 'fuji',
  '3': 'sakura',
  'sakura': 'sakura',
  '4': 'kanagawa',
  'kanagawa': 'kanagawa'
}

const FILES = {
  'About_Swastik.txt': `Swastik Paudel — Software Engineer & Systems Developer
Location: Kathmandu, Nepal (UTC+5:45)
Focus: High-concurrency web platforms, Rust systems, real-time sync.
Currently building prepNep (prepnep.com) under Madargaach Holdings.`,

  'prepnep_case_study.md': `# prepNep Engineering Architecture (Madargaach Holdings)
URL: https://prepnep.com | Stack: Next.js, TypeScript, PostgreSQL, Redis

## Challenge
Deliver real-time test state sync for thousands of simultaneous exam-takers with zero packet loss across unpredictable 3G/4G network conditions in Nepal.

## Engineering Solution
1. Sub-50ms delta sync protocol over WebSockets with automatic HTTP long-polling fallback.
2. Client-side IndexedDB buffer queues answers offline and flushes idempotently on reconnect.
3. PostgreSQL connection pooling with Redis cluster cache sharding preventing DB lockups.
4. 99.9% verified uptime across national exam sessions.`,

  'skills.json': `{
  "languages": ["TypeScript", "JavaScript", "Rust", "Python", "C/C++", "SQL"],
  "frontend": ["React 19", "Next.js", "Tailwind CSS", "Redux Toolkit", "WebSockets"],
  "backend": ["Node.js", "Express", "PostgreSQL", "Redis", "REST APIs", "GraphQL"],
  "systems": ["Docker", "Linux / Unix", "Git", "CI/CD pipelines", "Microservices"]
}`,

  'resume.md': `# Swastik Paudel — Curriculum Vitae
Email: psamarpaudel@gmail.com | Phone: +977 976-7929476
Location: Kathmandu, Nepal | GitHub: https://github.com/Swastik45

## Work Experience
Software Engineer — Madargaach Holdings (prepNep)
- Architected enterprise exam platform serving thousands of student test sessions.
- Reduced answer submission latency to <50ms with Redis caching and query indexing.
- Preserved 99.9% uptime with zero-downtime microservice deployments.

## Core Technical Skills
Rust, TypeScript, React 19, Next.js, Node.js, PostgreSQL, Redis, Docker, Linux`,

  'contact.sh': `#!/usr/bin/env bash
echo "=== Swastik Paudel Contact Channels ==="
echo "Email    : psamarpaudel@gmail.com"
echo "Phone    : +977 976-7929476 (WhatsApp)"
echo "Location : Kathmandu, Nepal (UTC+5:45)"
echo "GitHub   : https://github.com/Swastik45"
echo "LinkedIn : https://www.linkedin.com/in/swastik-paudel-591b61274/"
echo "Twitter  : https://x.com/SwastikPaudel45"
echo "Status   : Open for software engineering & systems roles"`
}

const PROJECT_FILES = {
  'prepnep.md': `[prepNep] — Enterprise examination platform for students (prepnep.com)
Tech: Next.js, TypeScript, Postgres, Redis | High concurrency & real-time sync`,

  'shareaudit.md': `[ShareAudit] — Equity portfolio auditing and dividend analytics (share-audit.vercel.app)
Tech: React, Vite, Chart.js | Dividend yield & cashflow projections`,

  'govaudit.md': `[GovAudit NP] — Civic public expenditure watchdog (gova-audit-np.vercel.app)
Tech: React, Open Data API, Tailwind | Municipal budget transparency`,

  'carboncredit.md': `[CarbonCredit] — Ecological offset tracking ledger (carbon-credit1.vercel.app)
Tech: Next.js, React, CleanTech sync | Verified environmental offsets`,

  'lumino.md': `[Lumino] — Fluid interaction engineering showcase (lumino-five.vercel.app)
Tech: React, Vite | Perfect 100/100 Lighthouse performance metrics`,

  'rustgame.md': `[2D Shooter Engine] — Deterministic arcade game in Rust (GitHub: Swastik45)
Tech: Rust, Bevy Engine, ECS | Zero-GC 120 FPS simulation`
}

const HELP_TEXT = `Developer Terminal v2.6 — Interactive bash emulator

System & Desktop Commands:
  theme [name|number]  - Switch wallpaper (kathmandu, samurai, fuji, sakura, kanagawa)
  open <app>           - Launch desktop window (projects, resume, mail, prepnep, ask, music)
  music [play|next]    - Control Stellar Classics audio player or launch window
  top / htop           - Live system process monitor & resource stats
  neofetch / fetch     - Display system info & developer profile
  calc <expression>    - Evaluate math expressions (e.g. calc 1024 * 768 / 60)
  curl <domain>        - Simulate HTTP GET response headers (e.g. curl prepnep.com)

File & Navigation Commands:
  ls / dir [path]      - List directory contents
  cd [dir]             - Change directory (e.g. cd projects, cd ..)
  pwd                  - Print current working directory
  cat <file>           - Display file contents (e.g. cat About_Swastik.txt, cat skills.json)
  ./contact.sh         - Execute contact script and launch mail client

Portfolio Shortcuts:
  projects             - Tabular list of production projects
  project <id>         - Detailed breakdown of a specific project
  skills               - Inspect technical stack profiler
  experience           - prepNep / Madargaach Holdings engineering case study
  contact              - Direct phone, email, and social channels
  clear / exit         - Clear terminal screen or close window

Tip: Press TAB for autocompletion. Use Up/Down arrows for command history.`

export default function TerminalApp({ onOpenApp, onSelectWallpaper, onClose, currentWallpaper = 'samurai' }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `Swastik Paudel — Developer Shell (Kathmandu, Nepal)
Type 'help' for commands, 'theme kathmandu' to reset the wallpaper, or 'open projects'.`
    }
  ])
  const [input, setInput] = useState('')
  const [currentDir, setCurrentDir] = useState('~')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [startTime] = useState(Date.now())

  const terminalEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const executeCommand = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return

    setCmdHistory((prev) => [...prev, cmd])
    setHistoryIdx(-1)

    const promptPath = currentDir === '~' ? '~' : `~/${currentDir}`
    const newItems = [{ type: 'command', text: `swastik@nepal:${promptPath}$ ${cmd}` }]
    const parts = cmd.split(' ')
    const primary = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ').trim()

    switch (primary) {
      case 'help':
        newItems.push({ type: 'output', text: HELP_TEXT })
        break

      case 'clear':
        setHistory([])
        setInput('')
        return

      case 'exit':
        newItems.push({ type: 'output', text: 'Closing session...' })
        onClose?.()
        break

      case 'pwd':
        newItems.push({ type: 'output', text: currentDir === '~' ? '/home/swastik' : `/home/swastik/${currentDir}` })
        break

      case 'cd': {
        const target = arg.trim()
        if (!target || target === '~' || target === '/home/swastik') {
          setCurrentDir('~')
        } else if (target === '..' || target === '../') {
          setCurrentDir('~')
        } else if (target === 'projects' || target === 'projects/' || target === './projects') {
          setCurrentDir('projects')
        } else {
          newItems.push({ type: 'error', text: `cd: no such file or directory: ${target}` })
        }
        break
      }

      case 'ls':
      case 'dir':
        if (currentDir === '~' && (!arg || arg === '.')) {
          newItems.push({
            type: 'output',
            text: `About_Swastik.txt   projects/   prepnep_case_study.md   skills.json   resume.md   contact.sh`
          })
        } else if (currentDir === 'projects' || arg === 'projects' || arg === 'projects/') {
          newItems.push({
            type: 'output',
            text: `prepnep.md   shareaudit.md   govaudit.md   carboncredit.md   lumino.md   rustgame.md`
          })
        } else {
          newItems.push({ type: 'error', text: `ls: cannot access '${arg}': No such file or directory` })
        }
        break

      case 'cat': {
        if (!arg) {
          newItems.push({ type: 'error', text: 'Usage: cat <filename> (e.g. cat About_Swastik.txt, cat skills.json)' })
          break
        }

        const fileName = arg.replace(/^\.\//, '')
        if (currentDir === 'projects') {
          if (PROJECT_FILES[fileName]) {
            newItems.push({ type: 'output', text: PROJECT_FILES[fileName] })
          } else {
            newItems.push({ type: 'error', text: `cat: ${arg}: No such file or directory` })
          }
        } else {
          if (FILES[fileName]) {
            newItems.push({ type: 'output', text: FILES[fileName] })
          } else if (fileName.startsWith('projects/') && PROJECT_FILES[fileName.replace('projects/', '')]) {
            newItems.push({ type: 'output', text: PROJECT_FILES[fileName.replace('projects/', '')] })
          } else {
            newItems.push({ type: 'error', text: `cat: ${arg}: No such file or directory` })
          }
        }
        break
      }

      case './contact.sh':
      case 'sh':
      case 'bash':
        if (primary === './contact.sh' || arg.includes('contact.sh')) {
          newItems.push({ type: 'output', text: FILES['contact.sh'] })
          newItems.push({ type: 'output', text: '[System]: Launching Mail application...' })
          onOpenApp?.('mail')
        } else {
          newItems.push({ type: 'error', text: `Cannot execute '${arg || primary}'` })
        }
        break

      case 'theme': {
        if (!arg) {
          newItems.push({
            type: 'output',
            text: `Active Theme: [${currentWallpaper}]

Available Wallpapers:
  1. samurai   - Crimson Blood Moon over Pagoda Silhouette
  2. fuji      - Mount Fuji Dusk Twilight & Lavender Snowcap
  3. sakura    - Moonlit Cherry Blossom Petals & Deep Sky
  4. kanagawa  - Kanagawa Dark Wave & Architectural Dot Grid

Usage: theme <name or number> (e.g. theme fuji, theme 3)`
          })
        } else {
          const key = arg.toLowerCase().trim()
          const matched = WALLPAPER_MAP[key]
          if (matched) {
            onSelectWallpaper?.(matched)
            newItems.push({
              type: 'output',
              text: `[System]: Desktop wallpaper successfully switched to '${matched}'!`
            })
          } else {
            newItems.push({
              type: 'error',
              text: `theme: '${arg}' not recognized. Choose: samurai (1), fuji (2), sakura (3), kanagawa (4)`
            })
          }
        }
        break
      }

      case 'open':
        if (!arg) {
          newItems.push({ type: 'error', text: 'Usage: open <app> (projects, resume, mail, prepnep, ask, music, skills)' })
        } else {
          const target = arg.toLowerCase()
          const map = {
            projects: 'projects',
            finder: 'projects',
            resume: 'resume',
            cv: 'resume',
            mail: 'mail',
            contact: 'mail',
            prepnep: 'experience',
            experience: 'experience',
            ask: 'ask',
            ai: 'ask',
            music: 'music',
            skills: 'skills',
            about: 'about'
          }
          if (map[target]) {
            onOpenApp?.(map[target])
            newItems.push({ type: 'output', text: `[System]: Launched window for '${map[target]}'.` })
          } else {
            newItems.push({ type: 'error', text: `open: application '${target}' not found. Try: projects, resume, mail, prepnep, ask, music` })
          }
        }
        break

      case 'music': {
        const sub = arg.toLowerCase().trim()
        if (sub === 'play' || sub === 'open' || !sub) {
          onOpenApp?.('music')
          newItems.push({ type: 'output', text: '[System]: Opened Stellar Classics Music Player.' })
        } else {
          onOpenApp?.('music')
          newItems.push({ type: 'output', text: `[Music Engine]: Command '${sub}' dispatched to player.` })
        }
        break
      }

      case 'neofetch':
      case 'fetch':
        newItems.push({
          type: 'output',
          text: `   ___ _       __           __  _ __  
  / _ / |     / /___ ______/ /_(_) /__
 _\\_ \\| | /| / / _ \`/ __/ __/ / /  '_/
/___/ | |/ |/ /\\_,_/\\__/\\__/_/_/_/\\_\\ 
      |__/ |__/                       
--------------------------------------
OS       : SwastikOS v2.6 (x86_64-linux)
Host     : Kathmandu Station (UTC+5:45)
Kernel   : 6.8.0-generic-rust-preempt
Uptime   : ${Math.floor((Date.now() - startTime) / 60000)} minutes
Shell    : bash 5.2.21
Role     : Software Engineering Intern @ prepNep (prepnep.com)
Stack    : Rust · Next.js · TypeScript · Postgres · Redis
Theme    : ${currentWallpaper}
Memory   : 168MB / 16384MB`
        })
        break

      case 'calc':
        if (!arg) {
          newItems.push({ type: 'error', text: 'Usage: calc <math expression> (e.g. calc 1024 * 768 / 60)' })
        } else {
          try {
            if (!/^[0-9+\-*/().\s^%]+$/.test(arg)) {
              throw new Error('Invalid math characters')
            }
            const sanitized = arg.replace(/\^/g, '**')
            const result = Function(`"use strict"; return (${sanitized})`)()
            newItems.push({ type: 'output', text: `Result: ${result}` })
          } catch {
            newItems.push({ type: 'error', text: `calc: could not evaluate '${arg}'. Use standard math operators (+, -, *, /, %).` })
          }
        }
        break

      case 'curl':
        if (!arg) {
          newItems.push({ 
            type: 'output', 
            text: `Usage: curl <target>
Endpoints:
  curl activity   - Curl live GitHub public events & repositories
  curl education  - Curl undergraduate academic degree & current year
  curl social     - Curl verified social links & contact endpoints
  curl <domain>   - Simulate HTTP request to domain (e.g. curl prepnep.com)` 
          })
        } else {
          const target = arg.toLowerCase().trim()
          if (target === 'activity' || target === 'github' || target === 'recent') {
            newItems.push({
              type: 'output',
              text: `HTTP/2 200 OK
date: ${new Date().toUTCString()}
server: GitHub.com API v3
content-type: application/json; charset=utf-8

{
  "user": "Swastik45",
  "name": "Swastik Paudel",
  "bio": "Developer & Technical Freelancer. Specialized in Next.js, TypeScript, and C.",
  "public_repos": 16,
  "recent_activity": [
    { "type": "PushEvent", "repo": "Swastik45/Portfolio", "status": "Live Production Deployed" },
    { "type": "PushEvent", "repo": "Swastik45/CarbonCredit", "desc": "Ecological offset ledger" },
    { "type": "PushEvent", "repo": "Swastik45/LibraryManagementSystem", "lang": "C (Terminal CRUD)" },
    { "type": "PushEvent", "repo": "Swastik45/Lumino", "desc": "AI visual discovery platform" }
  ],
  "profile_url": "https://github.com/Swastik45"
}`
            })
          } else if (target === 'education' || target === 'degree' || target === 'year') {
            newItems.push({
              type: 'output',
              text: `HTTP/2 200 OK
date: ${new Date().toUTCString()}
content-type: application/json; charset=utf-8

{
  "degree": "Bachelor's in Computer Science / Information Technology",
  "academic_level": "Undergraduate",
  "current_year": "4th Year / Senior Undergraduate (2022–Present)",
  "location": "Kathmandu, Nepal",
  "key_coursework": [
    "Data Structures & Algorithms",
    "Database Management Systems (PostgreSQL, SQL)",
    "Operating Systems & Linux Internals",
    "Computer Networks & Socket Protocols",
    "Distributed Systems & Web Architecture"
  ],
  "practical_industry_experience": "Software Engineering Intern at Madargaach Holdings (prepNep)"
}`
            })
          } else if (target === 'social' || target === 'links' || target === 'contacts') {
            newItems.push({
              type: 'output',
              text: `HTTP/2 200 OK
content-type: application/json; charset=utf-8

{
  "github": "https://github.com/Swastik45",
  "linkedin": "https://www.linkedin.com/in/swastik-paudel-591b61274/",
  "twitter": "https://x.com/SwastikPaudel45",
  "whatsapp": "https://wa.me/9779767929476",
  "email": "psamarpaudel@gmail.com",
  "portfolio": "https://swastik-portfolio-eight.vercel.app"
}`
            })
          } else {
            const domain = arg.replace(/^https?:\/\//, '')
            newItems.push({
              type: 'output',
              text: `HTTP/2 200 OK
date: ${new Date().toUTCString()}
server: cloudflare
content-type: text/html; charset=utf-8
x-powered-by: Next.js
x-runtime: 38ms
content-length: 14820

<!DOCTYPE html>
<html>
  <head><title>${domain}</title></head>
  <body>Connected to ${domain} with sub-50ms latency.</body>
</html>`
            })
          }
        }
        break

      case 'top':
      case 'htop':
        newItems.push({
          type: 'output',
          text: `PID  COMMAND          CPU%   MEM    STATE  UPTIME
101  WindowManager    0.8%   64MB   RUN    ${Math.floor((Date.now() - startTime) / 1000)}s
102  Terminal (bash)  0.2%   24MB   RUN    ${Math.floor((Date.now() - startTime) / 1000)}s
103  AudioEngine      0.3%   22MB   RUN    ACTIVE
104  ProjectsFinder   0.1%   32MB   IDLE   READY
105  AskSwastikAI     0.1%   28MB   IDLE   READY
-------------------------------------------------------
Total Memory Used: 170MB / 16GB | Load Average: 0.12, 0.08, 0.02`
        })
        break

      case 'echo':
        newItems.push({ type: 'output', text: arg })
        break

      case 'whoami':
        newItems.push({ type: 'output', text: 'swastik (Swastik Paudel — Software Engineer, Kathmandu Nepal)' })
        break

      case 'uname':
        newItems.push({ type: 'output', text: 'Linux nepal-sys 6.8.0-generic #42-Ubuntu SMP PREEMPT_DYNAMIC x86_64' })
        break

      case 'uptime':
        newItems.push({
          type: 'output',
          text: `up ${Math.floor((Date.now() - startTime) / 60000)} min, 1 user, load average: 0.12, 0.08, 0.03`
        })
        break

      case 'date':
        newItems.push({
          type: 'output',
          text: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }) + ' (Kathmandu, Nepal)'
        })
        break

      case 'projects':
        newItems.push({
          type: 'output',
          text: `ID            Title           Category      Tech Stack
------------------------------------------------------------------------
prepnep       prepNep         Production    Next.js, TypeScript, Postgres, Redis
shareaudit    ShareAudit      FinTech       React, Chart.js, Vite
govaudit      GovAudit NP     CivicTech     React, Open Data API, Tailwind
carboncredit  CarbonCredit    CleanTech     React, Next.js, Web3 Sync
lumino        Lumino          Frontend      React, Vite, 100 Lighthouse
rustgame      2D Shooter      Systems       Rust, Bevy Engine, ECS

Type 'project <id>' for deeper specs, or 'open projects' to view live.`
        })
        break

      case 'project':
        if (PROJECT_FILES[`${arg}.md`]) {
          newItems.push({ type: 'output', text: PROJECT_FILES[`${arg}.md`] })
        } else {
          newItems.push({
            type: 'error',
            text: `project: '${arg}' not found. Available IDs: prepnep, shareaudit, govaudit, carboncredit, lumino, rustgame`
          })
        }
        break

      case 'skills':
        newItems.push({
          type: 'output',
          text: `Languages   : TypeScript, JavaScript, Rust, Python, C/C++, SQL
Frontend    : React 19, Next.js, Tailwind CSS, Redux Toolkit, WebSockets
Backend     : Node.js, Express, PostgreSQL, Redis, RESTful APIs, GraphQL
Systems/Ops : Docker, Linux, Git, CI/CD pipelines, Vercel, Microservices`
        })
        break

      case 'experience':
        newItems.push({
          type: 'output',
          text: `Role        : Software Engineering Intern
Organization: Madargaach Holdings
Product     : prepNep (prepnep.com)
Highlights  :
- Engineered test session state synchronization for thousands of concurrent users
- Implemented automated scoring engine with resilient error boundaries
- Preserved 99.9% platform availability across heavy examination windows`
        })
        break

      case 'contact':
        newItems.push({
          type: 'output',
          text: `Email       : psamarpaudel@gmail.com
Phone       : +977 976-7929476 (WhatsApp)
Location    : Kathmandu, Nepal (UTC+5:45)
GitHub      : https://github.com/Swastik45
LinkedIn    : https://www.linkedin.com/in/swastik-paudel-591b61274/
Twitter/X   : https://x.com/SwastikPaudel45
Status      : Open to engineering roles & contracts`
        })
        break

      case 'history':
        newItems.push({
          type: 'output',
          text: cmdHistory.map((h, i) => `${i + 1}  ${h}`).join('\n') || 'No commands in history.'
        })
        break

      case 'sudo':
        if (cmd.toLowerCase().includes('hire')) {
          newItems.push({
            type: 'output',
            text: `[Access Granted]: Recruiter priority sequence initiated!
Emailing: psamarpaudel@gmail.com
Opening Mail application...`
          })
          onOpenApp?.('mail')
        } else {
          newItems.push({ type: 'error', text: 'sudo: swastik is in the sudoers file. This incident will be reported.' })
        }
        break

      default:
        newItems.push({
          type: 'error',
          text: `bash: ${primary}: command not found. Type 'help' for available commands.`
        })
    }

    setHistory((prev) => [...prev, ...newItems])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(nextIdx)
      setInput(cmdHistory[nextIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx === -1) return
      const nextIdx = historyIdx + 1
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1)
        setInput('')
      } else {
        setHistoryIdx(nextIdx)
        setInput(cmdHistory[nextIdx])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const current = input.trim().toLowerCase()
      if (!current) return

      const matches = COMMAND_LIST.filter((c) => c.startsWith(current))
      if (matches.length === 1) {
        setInput(matches[0] + ' ')
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: 'command', text: `swastik@nepal:~$ ${input}` },
          { type: 'output', text: matches.join('   ') }
        ])
      }
    }
  }

  const promptPath = currentDir === '~' ? '~' : `~/${currentDir}`

  return (
    <div
      className="h-full bg-[#16161e] text-[#a9b1d6] font-mono text-xs sm:text-[13px] p-3 sm:p-4 overflow-y-auto leading-relaxed select-text cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Session History */}
      <div className="space-y-1 mb-2">
        {history.map((item, idx) => {
          if (item.type === 'system') {
            return (
              <div key={idx} className="text-[#7aa89f] pb-1 whitespace-pre-wrap">
                {item.text}
              </div>
            )
          }
          if (item.type === 'command') {
            return (
              <div key={idx} className="text-white font-semibold">
                {item.text}
              </div>
            )
          }
          if (item.type === 'error') {
            return (
              <div key={idx} className="text-[#e46876] whitespace-pre-wrap">
                {item.text}
              </div>
            )
          }
          return (
            <div key={idx} className="text-[#c0caf5] whitespace-pre-wrap pl-1">
              {item.text}
            </div>
          )
        })}
      </div>

      {/* Active Command Line Input */}
      <div className="flex items-center gap-1.5 text-white">
        <span className="text-[#76946a] font-bold">swastik@nepal</span>
        <span className="text-[#7e9cd8] font-bold">:{promptPath}$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          className="flex-1 bg-transparent text-white focus:outline-none border-none p-0 ml-1 font-mono text-xs sm:text-[13px]"
        />
      </div>

      <div ref={terminalEndRef} />
    </div>
  )
}
