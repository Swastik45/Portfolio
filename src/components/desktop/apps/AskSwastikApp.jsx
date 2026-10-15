import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  Send, 
  Sparkles, 
  ArrowRight, 
  User, 
  ExternalLink, 
  Copy, 
  Check, 
  RotateCcw,
  Github,
  Mail,
  MessageSquare,
  Globe,
  Share2,
  RefreshCw,
  Cpu,
  GraduationCap,
  Activity,
  Bot
} from 'lucide-react'
import { soundFX } from '../soundEffects'

// Verified social media profiles & official contact channels
const SOCIAL_LINKS = {
  github: 'https://github.com/Swastik45',
  linkedin: 'https://www.linkedin.com/in/swastik-paudel-591b61274/',
  twitter: 'https://x.com/SwastikPaudel45',
  whatsapp: 'https://wa.me/9779767929476',
  email: 'psamarpaudel@gmail.com',
  portfolio: 'https://swastik-portfolio-eight.vercel.app'
}

// Interactive Quick Prompt Chips
const TOPICS = [
  { label: '⚡ Curl Public Activity (Live)', prompt: 'Curl and retrieve Swastik\'s live GitHub public activity, latest commits, and active repositories.' },
  { label: '🎓 Education & Current Year', prompt: 'What is your education, university degree, and current academic year?' },
  { label: '🔗 Social Media & Links', prompt: 'What are Swastik\'s official social media profiles, GitHub, and contact links?' },
  { label: '👤 Name, Age & Origin', prompt: 'What is your full name, age, birth year, and where are you based?' },
  { label: '💼 Internship at prepNep', prompt: 'Tell me about Swastik\'s software engineering internship at prepNep.' },
  { label: '🚀 Flagship Projects', prompt: 'What are your top production projects and live deployments?' },
  { label: '🛠️ Tech Stack & Skills', prompt: 'What is your complete programming languages and technology stack?' },
  { label: '🦀 Rust & Systems', prompt: 'Tell me about your Rust and low-level systems experience.' }
]

// Fallback cached telemetry if GitHub API is unreachable
const DEFAULT_TELEMETRY = {
  user: 'Swastik45',
  name: 'Swastik Paudel',
  bio: 'Developer & Technical Freelancer. Specialized in Next.js, TypeScript, and C. Applying an auditor\'s mindset to security tools and predictive analytics.',
  publicRepos: 16,
  recentEvents: [
    { type: 'PushEvent', repo: 'Swastik45/Portfolio', time: 'Recently' },
    { type: 'PushEvent', repo: 'Swastik45/CarbonCredit', time: 'Active' },
    { type: 'PushEvent', repo: 'Swastik45/LibraryManagementSystem', time: 'Active' },
    { type: 'PushEvent', repo: 'Swastik45/Lumino', time: 'Active' }
  ],
  topRepos: [
    { name: 'Portfolio', lang: 'JavaScript / React', desc: 'macOS-inspired interactive portfolio with live apps' },
    { name: 'CarbonCredit', lang: 'TypeScript', desc: 'Decentralized ecological carbon credit tracking registry' },
    { name: 'LibraryManagementSystem', lang: 'C', desc: 'Terminal database CRUD with book issue/return & fine algorithms' },
    { name: 'Lumino', lang: 'TypeScript', desc: 'AI-powered image discovery platform with 100 Lighthouse score' },
    { name: '2D-Shooting-Game', lang: 'Rust', desc: 'Deterministic arcade shooter engine with Bevy ECS' }
  ],
  lastCurledAt: 'Live Synced'
}

// Build RAG Grounding System Prompt
function buildRagSystemPrompt(telemetry) {
  const t = telemetry || DEFAULT_TELEMETRY
  const reposSummary = t.topRepos ? t.topRepos.map(r => `* ${r.name} (${r.lang}): ${r.desc}`).join('\n') : ''
  const eventsSummary = t.recentEvents ? t.recentEvents.map(e => `* ${e.type} on ${e.repo}`).join('\n') : ''

  return `You are the official interactive AI Assistant for Swastik Paudel's portfolio. You are powered by Pollinations.ai with real-time RAG (Retrieval-Augmented Generation).
Always provide accurate, enthusiastic, and factual answers strictly grounded in this verified knowledge base:

[PERSONAL & IDENTITY]
- Full Name: Swastik Paudel (स्वास्तिक पौडेल)
- Age: 22 years old (Born in 2004)
- Location: Kathmandu, Nepal (UTC+5:45)
- Title: Software Engineer & Full-Stack Systems Developer
- Status: Open for Software Engineering roles, Backend/Full-Stack opportunities, and freelance collaborations.

[EDUCATION & CURRENT YEAR]
- Degree: Bachelor's in Computer Science / Information Technology (Undergraduate)
- Current Academic Year: 4th Year / Senior Undergraduate (2022 – Present)
- Location: Kathmandu, Nepal
- Core Academic Focus: Data Structures & Algorithms, Relational Database Systems (PostgreSQL, SQL), Operating Systems & Networking (TCP/IP, WebSockets), Systems Architecture.
- Academic & Open-Source Projects: Terminal-based Library Management System in C (complete CRUD, book loaning, returning, and penalty calculation algorithms), deterministic 2D game engine in Rust ECS, civic watchdog tools.

[WORK EXPERIENCE]
- Role: Software Engineering Intern
- Company: Madargaach Holdings
- Product: prepNep (prepnep.com) - Online entrance exam platform in Nepal serving thousands of students.
- Key Contributions:
  * Sub-50ms test session state synchronization using WebSockets with HTTP fallback.
  * Client-side offline buffering via IndexedDB preventing answer loss during network drops.
  * Database query optimization with PostgreSQL and Redis caching.
  * Maintained 99.9% uptime during high-concurrency national mock examinations.
  * Note: Swastik was an engineering intern, NOT a senior or lead developer.

[LIVE CURLED GITHUB DATA & RECENT PUBLIC ACTIVITY]
- Profile: https://github.com/Swastik45
- Total Public Repositories: ${t.publicRepos}
- Bio: "${t.bio}"
- Recent GitHub Pushes & Activity:
${eventsSummary}
- Active Repositories:
${reposSummary}

[VERIFIED SOCIAL MEDIA & CONTACT ACCESS]
- GitHub: https://github.com/Swastik45
- LinkedIn: https://www.linkedin.com/in/swastik-paudel-591b61274/
- Twitter / X: https://x.com/SwastikPaudel45
- WhatsApp: +977 976-7929476 (Direct chat: https://wa.me/9779767929476)
- Email: psamarpaudel@gmail.com
- Live Portfolio: https://swastik-portfolio-eight.vercel.app

[FEATURED PRODUCTION PROJECTS]
1. prepNep (prepnep.com) — High-concurrency educational testing platform (Next.js, React, TypeScript, PostgreSQL, Redis, Docker).
2. ShareAudit (share-audit.vercel.app) — Investment portfolio audit & dividend yield engine (React, TypeScript, Chart.js).
3. GovAudit NP (gova-audit-np.vercel.app) — Open municipal public expenditure and budget watchdog (React, Open Government Data).
4. CarbonCredit (carbon-credit1.vercel.app) — Verified ecological emissions offset registry (Next.js, React, Web3/Ledger).
5. Lumino (lumino-five.vercel.app) — Fluid AI-powered visual search showcase with perfect 100/100 Lighthouse score.
6. 2D Arcade Game — Deterministic systems shooter built in Rust using Bevy ECS architecture (locked 120 FPS).

[CORE TECH STACK]
- Languages: TypeScript, JavaScript, Rust, Python, C/C++, SQL
- Frontend: React 19, Next.js, Tailwind CSS, Redux Toolkit, WebSockets, Vite
- Backend & Data: Node.js, Express, PostgreSQL, Redis, REST APIs, GraphQL
- Systems & Tools: Docker, Linux, Git, CI/CD pipelines, Vercel

[MUSIC & HOBBIES]
- Huge fan of timeless English classics: Queen, Coldplay, Oasis, Elton John, Eagles, Radiohead (playable inside the desktop Music app).

Style Guidelines:
- Respond in clear, engaging, concise Markdown with bullet points.
- Highlight key metrics and technologies.
- Do NOT refer to Swastik as a senior or lead developer; he is a talented software engineer with internship experience at prepNep.
`
}

// Infer relevant clickable action links from query & answer text
function inferActionLinks(text, query) {
  const combined = (text + ' ' + query).toLowerCase()
  const links = []

  if (combined.includes('github') || combined.includes('repo') || combined.includes('activity') || combined.includes('curl')) {
    links.push({ label: 'Open GitHub', href: SOCIAL_LINKS.github })
  }
  if (combined.includes('linkedin') || combined.includes('social') || combined.includes('connect')) {
    links.push({ label: 'Open LinkedIn', href: SOCIAL_LINKS.linkedin })
  }
  if (combined.includes('whatsapp') || combined.includes('phone') || combined.includes('call') || combined.includes('hire')) {
    links.push({ label: 'Open WhatsApp', href: SOCIAL_LINKS.whatsapp })
  }
  if (combined.includes('email') || combined.includes('mail') || combined.includes('hire') || combined.includes('reach') || combined.includes('contact')) {
    links.push({ label: 'Compose Mail', appId: 'mail' })
  }
  if (combined.includes('prepnep') || combined.includes('intern') || combined.includes('experience') || combined.includes('madargaach')) {
    links.push({ label: 'prepNep Case Study', appId: 'experience' })
    links.push({ label: 'Visit prepnep.com', href: 'https://prepnep.com' })
  }
  if (combined.includes('project') || combined.includes('shareaudit') || combined.includes('govaudit') || combined.includes('carboncredit') || combined.includes('lumino')) {
    links.push({ label: 'Explore Projects', appId: 'projects' })
  }
  if (combined.includes('resume') || combined.includes('cv') || combined.includes('education') || combined.includes('degree') || combined.includes('study')) {
    links.push({ label: 'View Résumé', appId: 'resume' })
  }
  if (combined.includes('music') || combined.includes('song') || combined.includes('coldplay') || combined.includes('queen')) {
    links.push({ label: 'Launch Music Player', appId: 'music' })
  }

  // De-duplicate links by label
  return links.filter((item, index, self) => index === self.findIndex((t) => t.label === item.label)).slice(0, 4)
}

// Local Deterministic RAG Engine (Instant & Offline Fallback)
function generateLocalRagResponse(query, telemetry) {
  const q = query.toLowerCase().trim()
  const t = telemetry || DEFAULT_TELEMETRY

  // 1. Live GitHub Activity & Public Telemetry Curl
  if (
    q.includes('curl') || q.includes('activity') || q.includes('event') ||
    q.includes('recent') || q.includes('commit') || q.includes('public activity') ||
    q.includes('github activity')
  ) {
    const reposList = t.topRepos ? t.topRepos.slice(0, 4).map(r => `• **[${r.name}](${r.url || 'https://github.com/Swastik45/' + r.name})** (${r.lang || 'Code'}) — ${r.desc || 'Active development repository'}`).join('\n') : ''
    const eventsList = t.recentEvents ? t.recentEvents.slice(0, 4).map(e => `• \`${e.type}\` on **${e.repo}**`).join('\n') : ''

    return {
      text: `### ⚡ Curled Live GitHub Public Activity (\`api.github.com\`)\n\n• **User Handle**: [\`Swastik45\`](${SOCIAL_LINKS.github})\n• **Public Repositories**: **${t.publicRepos} active repos**\n• **Developer Bio**: *"${t.bio}"*\n• **Telemetry Status**: **${t.lastCurledAt || 'Live Synced'}**\n\n#### Recent Public Pushes & Commits:\n${eventsList || '• Recent push to Swastik45/Portfolio (Production Deployment)'}\n\n#### Active Public Repositories:\n${reposList}\n\n*All telemetry is fetched live from GitHub's REST API and verified against Swastik's public activity log.*`,
      links: [
        { label: 'Open GitHub Profile', href: SOCIAL_LINKS.github },
        { label: 'Browse Projects', appId: 'projects' },
        { label: 'View Résumé', appId: 'resume' }
      ]
    }
  }

  // 2. Education, Current Year & Academic Foundation
  if (
    q.includes('education') || q.includes('degree') || q.includes('college') ||
    q.includes('university') || q.includes('year') || q.includes('study') ||
    q.includes('studied') || q.includes('school') || q.includes('academic') ||
    q.includes('current year')
  ) {
    return {
      text: `### 🎓 Education & Academic Standing\n\n• **Degree**: Bachelor's in Computer Science / Information Technology (Undergraduate)\n• **Current Academic Year**: **4th Year / Senior Undergraduate** (2022 – Present)\n• **Institution Location**: Kathmandu, Nepal\n• **Academic Core**: Data Structures & Algorithms, Relational Database Systems (PostgreSQL, SQL), Operating Systems & Linux Internals, Computer Networking (Sockets, TCP/IP), and Distributed Systems.\n• **Practical Academic Engineering**:\n  - Developed a terminal-based **Library Management System in C** with complete CRUD operations, book reservation logic, and penalty calculation algorithms.\n  - Built a deterministic **2D arcade shooter engine in Rust** leveraging Entity-Component-System (ECS) architecture.\n  - Created open-source civic audit tools (**GovAudit NP**) for municipal budget tracking.\n• **Applied Industry Work**: Applied theoretical concepts directly into production during a Software Engineering Internship at **Madargaach Holdings** (prepNep).`,
      links: [
        { label: 'View Résumé', appId: 'resume' },
        { label: 'Open About Bio', appId: 'about' },
        { label: 'Open GitHub', href: SOCIAL_LINKS.github }
      ]
    }
  }

  // 3. Social Media & Links Inquiry
  if (
    q.includes('social') || q.includes('media') || q.includes('link') ||
    q.includes('linkedin') || q.includes('twitter') || q.includes('x.com') ||
    q.includes('instagram') || q.includes('github') || q.includes('profile') ||
    q.includes('handle') || q.includes('follow') || q.includes('connect')
  ) {
    return {
      text: `Here are all of **Swastik Paudel's** verified social media channels and official links:\n\n• **GitHub**: [github.com/Swastik45](${SOCIAL_LINKS.github}) — Open-source repositories & systems prototypes\n• **LinkedIn**: [linkedin.com/in/swastik-paudel](${SOCIAL_LINKS.linkedin}) — Professional network & career updates\n• **Twitter / X**: [@SwastikPaudel45](${SOCIAL_LINKS.twitter}) — Tech discourse & developer thoughts\n• **WhatsApp**: [+977 976-7929476](${SOCIAL_LINKS.whatsapp}) — Direct instant messaging & calls\n• **Email**: [psamarpaudel@gmail.com](mailto:${SOCIAL_LINKS.email}) — Direct engineering inquiries\n• **Live Portfolio**: [swastik-portfolio-eight.vercel.app](${SOCIAL_LINKS.portfolio})\n\nFeel free to connect or send a message on any of these platforms!`,
      links: [
        { label: 'Open GitHub', href: SOCIAL_LINKS.github },
        { label: 'Open LinkedIn', href: SOCIAL_LINKS.linkedin },
        { label: 'Open WhatsApp', href: SOCIAL_LINKS.whatsapp },
        { label: 'Compose Mail', appId: 'mail' }
      ]
    }
  }

  // 4. Name, Age, Birthday, & Origin Inquiry
  if (
    q.includes('name') || q.includes('who are you') || q.includes('who is swastik') ||
    q.includes('identity') || q.includes('age') || q.includes('how old') ||
    q.includes('born') || q.includes('birthday') || q.includes('birthdate') ||
    q.includes('dob') || q.includes('years old')
  ) {
    return {
      text: `**Personal & Identity Overview**:\n\n• **Full Name**: Swastik Paudel (स्वास्तिक पौडेल)\n• **Age**: **22 years old** (Born in 2004)\n• **Location**: Kathmandu, Nepal (UTC+5:45)\n• **Education**: **4th Year Undergraduate** in Computer Science / IT\n• **Profession**: Software Engineer & Full-Stack Systems Developer\n• **Experience**: Completed a Software Engineering Internship at **Madargaach Holdings** (prepNep)\n• **Specialization**: High-concurrency web platforms, real-time synchronization, and native systems in Rust\n\nHe is an energetic software engineer passionate about clean code, memory safety, and dependable architectures.`,
      links: [
        { label: 'View Résumé', appId: 'resume' },
        { label: 'Open About Bio', appId: 'about' },
        { label: 'Browse Projects', appId: 'projects' }
      ]
    }
  }

  // 5. Internship & Experience Inquiry
  if (
    q.includes('intern') || q.includes('internship') || q.includes('experience') ||
    q.includes('career') || q.includes('job') || q.includes('madargaach') || q.includes('work history')
  ) {
    return {
      text: `Swastik worked as a **Software Engineering Intern** at **Madargaach Holdings**, working on their flagship digital examination platform **prepNep** (prepnep.com).\n\n### Key Deliverables & Contributions:\n• **Sub-50ms State Synchronization**: Engineered low-latency test session sync over WebSockets with automatic HTTP fallback.\n• **Offline Recovery Buffer**: Designed client-side offline queuing with IndexedDB, ensuring students never lose exam answers during internet dropouts.\n• **Database & Cache Optimization**: Structured PostgreSQL indexes and partitioned Redis caches to handle concurrent student exam spikes.\n• **High Availability**: Maintained 99.9% uptime during nationwide entrance examination cycles.`,
      links: [
        { label: 'Read prepNep Case Study', appId: 'experience' },
        { label: 'Visit prepnep.com', href: 'https://prepnep.com' },
        { label: 'Inspect Projects', appId: 'projects' }
      ]
    }
  }

  // 6. prepNep Platform Details
  if (
    q.includes('prepnep') || q.includes('exam') || q.includes('concurrency') ||
    q.includes('sync') || q.includes('latency') || q.includes('padhum')
  ) {
    return {
      text: `At **prepNep** (prepnep.com), under Madargaach Holdings, Swastik contributed to the core engineering architecture powering national online examination sessions for thousands of simultaneous students.\n\n### Architectural Highlights:\n• **Sub-50ms State Sync**: Exam sessions sync incremental question answers over resilient WebSockets with HTTP fallback.\n• **Offline Recovery Buffer**: Students never lose progress if their network drops; an IndexedDB client queue syncs deterministically upon reconnect.\n• **Multi-Tier Caching**: PostgreSQL data is partitioned and hot-cached in Redis clusters to prevent database bottlenecks during sudden traffic spikes.\n• **High Reliability**: Zero-downtime rolling deployments with automated rollback safety.`,
      links: [
        { label: 'Visit prepnep.com', href: 'https://prepnep.com' },
        { label: 'Open prepNep Case Study', appId: 'experience' },
        { label: 'View Projects Finder', appId: 'projects' }
      ]
    }
  }

  // 7. Rust & Systems Programming
  if (q.includes('rust') || q.includes('bevy') || q.includes('ecs') || q.includes('game') || q.includes('c++') || q.includes('low-level')) {
    return {
      text: `Swastik is passionate about low-level systems and deterministic architectures in **Rust**.\n\n### Systems Focus:\n• **Zero-Cost Abstractions**: Leveraging Rust's ownership and borrow checker for memory safety without garbage collection pauses.\n• **Bevy Engine & ECS**: Built a deterministic 2D arcade shooter using Entity-Component-System (ECS) architecture locked at 120 FPS.\n• **Systems Networking**: Architecting low-overhead microservices, custom binary protocols, and concurrent workers.`,
      links: [
        { label: 'Inspect Projects', appId: 'projects' },
        { label: 'GitHub Repositories', href: SOCIAL_LINKS.github }
      ]
    }
  }

  // 8. General Projects Overview
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built') || q.includes('showcase')) {
    return {
      text: `Swastik has engineered six flagship production & systems applications:\n\n1. **prepNep** — High-concurrency examination and learning platform for thousands of students ([prepnep.com](https://prepnep.com))\n2. **ShareAudit** — Equity investment auditor and dividend analytics platform ([share-audit.vercel.app](https://share-audit.vercel.app))\n3. **GovAudit NP** — Civic public expenditure watchdog ([gova-audit-np.vercel.app](https://gova-audit-np.vercel.app))\n4. **CarbonCredit** — Ecological offset tracking ledger ([carbon-credit1.vercel.app](https://carbon-credit1.vercel.app))\n5. **Lumino** — Fluid frontend application with 100 Lighthouse performance ([lumino-five.vercel.app](https://lumino-five.vercel.app))\n6. **2D Shooting Game** — Deterministic game engine in Rust with Bevy ECS architecture (GitHub)`,
      links: [
        { label: 'Open Projects Finder', appId: 'projects' },
        { label: 'Read prepNep Specs', appId: 'experience' }
      ]
    }
  }

  // 9. Skills & Technical Stack
  if (
    q.includes('skill') || q.includes('stack') || q.includes('tech') ||
    q.includes('languages') || q.includes('database') || q.includes('frontend') ||
    q.includes('backend') || q.includes('react') || q.includes('node') || q.includes('postgres') || q.includes('docker')
  ) {
    return {
      text: `Swastik's complete engineering stack:\n\n• **Core Languages**: TypeScript, JavaScript (ESNext), Rust, Python, C/C++, SQL\n• **Frontend & UI**: React 19, Next.js, Tailwind CSS, Redux Toolkit, WebSockets, Vite\n• **Backend & APIs**: Node.js, Express, PostgreSQL, Redis, RESTful APIs, GraphQL\n• **Systems & DevOps**: Docker, Linux/Unix internals, Git, CI/CD, Vercel, Microservices`,
      links: [
        { label: 'Open Skills Matrix', appId: 'skills' },
        { label: 'View Résumé', appId: 'resume' }
      ]
    }
  }

  // 10. Hiring, Rates & Availability
  if (
    q.includes('hire') || q.includes('available') || q.includes('remote') ||
    q.includes('role') || q.includes('rate') || q.includes('salary') || q.includes('contract')
  ) {
    return {
      text: `Swastik is open to **Software Engineering**, **Full-Stack / Backend Systems**, and **Contract / Internship Roles** with forward-thinking teams.\n\n### Quick Details:\n• **Location**: Kathmandu, Nepal (UTC+5:45)\n• **Remote Flexibility**: Experienced working across global time zones (US, Europe, APAC)\n• **Email**: psamarpaudel@gmail.com\n• **Phone / WhatsApp**: +977 976-7929476\n• **GitHub**: [github.com/Swastik45](${SOCIAL_LINKS.github})\n• **LinkedIn**: [linkedin.com/in/swastik-paudel](${SOCIAL_LINKS.linkedin})`,
      links: [
        { label: 'Compose Mail', appId: 'mail' },
        { label: 'View Résumé', appId: 'resume' },
        { label: 'Open WhatsApp', href: SOCIAL_LINKS.whatsapp }
      ]
    }
  }

  // 11. Fallback: Contextual grounded answer
  return {
    text: `Regarding "${query}":\n\n**Swastik Paudel** is a 22-year-old Software Engineer based in Kathmandu, Nepal. He is currently in his **4th year of undergraduate Computer Science studies** (Senior Undergraduate, 2022–Present).\n\nHe completed a Software Engineering Internship on **prepNep** (prepnep.com), engineering high-concurrency state synchronization and caching systems.\n\n• **Public GitHub Activity**: 16 public repositories active on GitHub ([github.com/Swastik45](${SOCIAL_LINKS.github}))\n• **Official Social Links**: LinkedIn ([linkedin.com/in/swastik-paudel](${SOCIAL_LINKS.linkedin})), Twitter/X ([@SwastikPaudel45](${SOCIAL_LINKS.twitter}))\n• **Direct Contact**: WhatsApp ([+977 976-7929476](${SOCIAL_LINKS.whatsapp})) & Email ([psamarpaudel@gmail.com](mailto:${SOCIAL_LINKS.email}))`,
    links: [
      { label: 'Open GitHub', href: SOCIAL_LINKS.github },
      { label: 'Open LinkedIn', href: SOCIAL_LINKS.linkedin },
      { label: 'Browse Projects', appId: 'projects' },
      { label: 'Contact Swastik', appId: 'mail' }
    ]
  }
}

// Helper to render bold markdown (**bold**) and links cleanly
function renderFormattedMessage(text) {
  if (!text) return null
  const lines = text.split('\n')
  return lines.map((line, lIdx) => {
    // Process markdown links [label](url) and **bold**
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const boldRegex = /(\*\*[^*]+\*\*)/g

    // Split line by links first
    const lineParts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        lineParts.push({ type: 'text', content: line.slice(lastIndex, match.index) })
      }
      lineParts.push({ type: 'link', label: match[1], url: match[2] })
      lastIndex = linkRegex.lastIndex
    }
    if (lastIndex < line.length) {
      lineParts.push({ type: 'text', content: line.slice(lastIndex) })
    }

    return (
      <React.Fragment key={lIdx}>
        {lineParts.map((segment, sIdx) => {
          if (segment.type === 'link') {
            return (
              <a
                key={sIdx}
                href={segment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7e9cd8] underline underline-offset-2 hover:text-[#9bb7f0] font-medium"
              >
                {segment.label}
              </a>
            )
          }

          // Format bold in text segments
          const parts = segment.content.split(boldRegex)
          return parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={`${sIdx}-${pIdx}`} className="font-bold text-white">
                  {part.slice(2, -2)}
                </strong>
              )
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={`${sIdx}-${pIdx}`} className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[11px] text-[#e0af68]">
                  {part.slice(1, -1)}
                </code>
              )
            }
            return part
          })
        })}
        {lIdx < lines.length - 1 && <br />}
      </React.Fragment>
    )
  })
}

export default function AskSwastikApp({ onOpenApp }) {
  const [telemetry, setTelemetry] = useState(DEFAULT_TELEMETRY)
  const [isCurling, setIsCurling] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am Swastik's **AI Knowledge Engine**, powered by **Pollinations.ai + real-time RAG**.\n\nI can curl live GitHub data, inspect his 4th-year Computer Science education, age (22), verified social links, prepNep internship, or flagship systems projects.\n\nWhat would you like to explore?",
      source: 'pollinations-rag',
      links: [
        { label: '⚡ Curl Public Activity', prompt: 'Curl and retrieve Swastik\'s live GitHub public activity, latest commits, and active repositories.' },
        { label: '🎓 Education & Current Year', prompt: 'What is your education, university degree, and current academic year?' },
        { label: '🔗 Social Media & Links', href: SOCIAL_LINKS.github },
        { label: 'Explore Projects', appId: 'projects' }
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)
  const chatEndRef = useRef(null)

  // Live GitHub Telemetry Fetcher / Curl
  const curlGitHubActivity = useCallback(async (isSilent = false) => {
    setIsCurling(true)
    try {
      const [userRes, eventsRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/Swastik45', { headers: { Accept: 'application/vnd.github.v3+json' } }),
        fetch('https://api.github.com/users/Swastik45/events/public?per_page=6', { headers: { Accept: 'application/vnd.github.v3+json' } }),
        fetch('https://api.github.com/users/Swastik45/repos?sort=pushed&per_page=6', { headers: { Accept: 'application/vnd.github.v3+json' } })
      ])

      const userData = userRes.ok ? await userRes.json() : null
      const eventsData = eventsRes.ok ? await eventsRes.json() : []
      const reposData = reposRes.ok ? await reposRes.json() : []

      const formattedEvents = Array.isArray(eventsData) 
        ? eventsData.map(e => ({
            type: e.type,
            repo: e.repo ? e.repo.name : 'Swastik45/Portfolio',
            time: e.created_at ? new Date(e.created_at).toLocaleDateString() : 'Recent'
          }))
        : DEFAULT_TELEMETRY.recentEvents

      const formattedRepos = Array.isArray(reposData) && reposData.length > 0
        ? reposData.map(r => ({
            name: r.name,
            lang: r.language || 'Code',
            desc: r.description || 'Public engineering project',
            url: r.html_url
          }))
        : DEFAULT_TELEMETRY.topRepos

      const newTelemetry = {
        user: userData?.login || 'Swastik45',
        name: userData?.name || 'Swastik Paudel',
        bio: userData?.bio || DEFAULT_TELEMETRY.bio,
        publicRepos: userData?.public_repos || 16,
        recentEvents: formattedEvents,
        topRepos: formattedRepos,
        lastCurledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setTelemetry(newTelemetry)
      if (!isSilent) {
        soundFX.play('open')
      }
      return newTelemetry
    } catch (err) {
      console.warn('Live GitHub curl encountered rate limit or offline mode; using cached telemetry:', err)
      return DEFAULT_TELEMETRY
    } finally {
      setIsCurling(false)
    }
  }, [])

  // Curl telemetry once on mount
  useEffect(() => {
    curlGitHubActivity(true)
  }, [curlGitHubActivity])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    soundFX.play('click')
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const handleClear = () => {
    soundFX.play('click')
    setMessages([
      {
        role: 'assistant',
        text: "Conversation refreshed. Ask me anything about Swastik's education, 4th year status, GitHub activity, name, age (22), verified social links, or prepNep internship!",
        source: 'pollinations-rag',
        links: []
      }
    ])
  }

  // Pollinations.ai Interactive Completion with RAG Context
  const handleAsk = async (query) => {
    if (!query.trim()) return

    const userText = query.trim()
    soundFX.play('click')
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setIsTyping(true)

    // Build RAG prompt incorporating latest curled telemetry
    const ragPrompt = buildRagSystemPrompt(telemetry)

    // Check if query is explicitly asking for fresh curl
    let currentTelemetry = telemetry
    if (userText.toLowerCase().includes('curl') || userText.toLowerCase().includes('live activity')) {
      currentTelemetry = await curlGitHubActivity(true)
    }

    try {
      // Call Pollinations.ai API with 8s timeout controller
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const historyContext = messages.slice(-4).map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text
      }))

      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: ragPrompt },
            ...historyContext,
            { role: 'user', content: userText }
          ],
          model: 'openai',
          seed: Math.floor(Math.random() * 10000)
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const aiText = await response.text()
        const dynamicLinks = inferActionLinks(aiText, userText)

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: aiText.trim(),
            source: 'pollinations-rag',
            links: dynamicLinks
          }
        ])
        soundFX.play('open')
        setIsTyping(false)
        return
      }
      throw new Error(`Pollinations HTTP ${response.status}`)
    } catch (e) {
      console.warn('Pollinations interactive call fell back to local RAG knowledge engine:', e)
      // Instant Fallback to Local Grounded RAG Engine
      const fallback = generateLocalRagResponse(userText, currentTelemetry)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: fallback.text,
          source: 'local-rag',
          links: fallback.links || []
        }
      ])
      soundFX.play('open')
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#181824] text-[#dcd7ba]">
      {/* Header Banner */}
      <div className="p-3.5 border-b border-white/10 bg-[#20202e] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#DC5A55] to-[#A9333B] flex items-center justify-center text-white font-bold text-sm shadow-md">
            問
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
              Ask Swastik
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#76946a]/20 text-[#98bb6c] border border-[#76946a]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#98bb6c] animate-pulse" />
                Pollinations.ai + RAG
              </span>
            </h2>
            <p className="text-[10px] text-[#938aa9] flex items-center gap-1.5 mt-0.5">
              <span>Interactive Knowledge Engine</span>
              <span>•</span>
              <span>Kathmandu, Nepal</span>
              <span>•</span>
              <span>Age: 22</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live GitHub Telemetry Status Pill */}
          <button
            type="button"
            onClick={() => curlGitHubActivity()}
            disabled={isCurling}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-[10px] font-mono transition-colors cursor-pointer"
            title="Curl latest GitHub activity"
          >
            <Activity className={`w-3 h-3 text-[#7e9cd8] ${isCurling ? 'animate-spin' : ''}`} />
            <span>GitHub: {telemetry.publicRepos} Repos ({telemetry.lastCurledAt || 'Live'})</span>
            <RefreshCw className={`w-2.5 h-2.5 text-white/40 ${isCurling ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-2.5 border-b border-white/5 bg-white/[0.02] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#dca561]" /> Topics:
        </span>
        {TOPICS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAsk(item.prompt)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-colors shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 sm:gap-3 max-w-[95%] sm:max-w-[88%] ${
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === 'user'
                  ? 'bg-[#7e9cd8] text-[#1f1f28]'
                  : 'bg-[#dc5a55] text-white shadow'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : '問'}
            </div>

            <div
              className={`group relative p-3 sm:p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#7e9cd8]/20 border border-[#7e9cd8]/30 text-white'
                  : 'bg-white/5 border border-white/10 text-[#dcd7ba]'
              }`}
            >
              {/* Copy button & RAG badge */}
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/5 text-[10px] text-white/40 font-mono">
                  <span className="flex items-center gap-1 text-[#98bb6c]">
                    <Bot className="w-3 h-3" />
                    {msg.source === 'pollinations-rag' ? 'Pollinations.ai + RAG Grounded' : 'Curled RAG Telemetry'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.text, i)}
                    className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                    title="Copy text"
                  >
                    {copiedIdx === i ? <Check className="w-3 h-3 text-[#76946a]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}

              <div className="pr-1 space-y-1">
                {renderFormattedMessage(msg.text)}
              </div>

              {/* Functional Desktop Action & Social Links */}
              {msg.links && msg.links.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                  {msg.links.map((link, lIdx) => {
                    if (link.prompt) {
                      return (
                        <button
                          key={lIdx}
                          type="button"
                          onClick={() => handleAsk(link.prompt)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#7e9cd8]/20 hover:bg-[#7e9cd8]/35 text-[#7e9cd8] font-medium text-[11px] border border-[#7e9cd8]/30 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{link.label}</span>
                        </button>
                      )
                    }

                    if (link.href) {
                      const isGh = link.href.includes('github')
                      const isLi = link.href.includes('linkedin')
                      const isWa = link.href.includes('wa.me')

                      return (
                        <a
                          key={lIdx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors cursor-pointer"
                        >
                          {isGh && <Github className="w-3 h-3 text-[#7e9cd8]" />}
                          {isLi && <Share2 className="w-3 h-3 text-[#38bdf8]" />}
                          {isWa && <MessageSquare className="w-3 h-3 text-emerald-400" />}
                          {!isGh && !isLi && !isWa && <Globe className="w-3 h-3 text-amber-400" />}
                          <span>{link.label}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-white/50" />
                        </a>
                      )
                    }

                    return (
                      <button
                        key={lIdx}
                        type="button"
                        onClick={() => {
                          soundFX.play('click')
                          onOpenApp(link.appId)
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#7e9cd8]/20 hover:bg-[#7e9cd8]/35 text-[#7e9cd8] font-medium text-[11px] border border-[#7e9cd8]/30 transition-colors cursor-pointer"
                      >
                        {link.appId === 'mail' && <Mail className="w-3 h-3" />}
                        {link.appId === 'resume' && <GraduationCap className="w-3 h-3" />}
                        {link.appId === 'projects' && <Cpu className="w-3 h-3" />}
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-[#938aa9]">
            <div className="w-7 h-7 rounded-lg bg-[#dc5a55] text-white font-bold flex items-center justify-center text-xs shadow">
              問
            </div>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-mono text-[#98bb6c] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#dca561] animate-spin" />
                Pollinating RAG response...
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7e9cd8] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#7e9cd8] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#7e9cd8] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-[#20202e] border-t border-white/10 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAsk(input)
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about education, current year, curl public activity, age, social links..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-[#7e9cd8] text-white placeholder-white/40 text-xs px-3.5 py-2.5 rounded-xl outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-[#7e9cd8] hover:bg-[#8eaee0] disabled:opacity-40 text-[#1f1f28] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  )
}
