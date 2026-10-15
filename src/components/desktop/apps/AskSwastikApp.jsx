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

// In-Memory Fast Cache for Instant 0ms Responses on exact repeats
const RESPONSE_CACHE = new Map()

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

// Compact, Token-Optimized System Prompt for Fast Dynamic Generation
function buildRagSystemPrompt(telemetry) {
  const t = telemetry || DEFAULT_TELEMETRY
  return `You are the interactive AI assistant for Swastik Paudel's portfolio.
You speak conversationally, directly, and specifically to whatever question the user asks.
Do NOT output repetitive boilerplate templates or generic bullet dumps unless specifically requested.

Key Facts about Swastik:
- Name: Swastik Paudel (स्वास्तिक पौडेल)
- Age: 21 years old (Born in 2005)
- Location: Kathmandu, Nepal (UTC+5:45)
- Education: 2nd Year Undergraduate in Computer Science / Information Technology (2024–Present) in Kathmandu, Nepal.
- Work: Software Engineering Intern at Madargaach Holdings on prepNep (prepnep.com). Built sub-50ms test session state sync, offline buffer with IndexedDB, PostgreSQL & Redis caching. (Intern only, not senior/lead).
- GitHub: https://github.com/Swastik45 (${t.publicRepos} public repositories).
- Social Links: LinkedIn (linkedin.com/in/swastik-paudel-591b61274/), Twitter/X (@SwastikPaudel45), WhatsApp (+977 976-7929476), Email (psamarpaudel@gmail.com).
- Skills: TypeScript, React, Next.js, Rust (Bevy engine ECS), PostgreSQL, Redis, Docker, C, Python.
- Projects: prepNep, ShareAudit (fintech), GovAudit NP (civic data), CarbonCredit, Lumino, 2D arcade shooter in Rust.
- Interests: Classic English rock & pop (Queen, Coldplay, Oasis, Elton John, Eagles, Radiohead).

Directives:
- Answer the user's specific question naturally and concisely.
- Never replay the same generic introductory text for unrelated queries.
- Keep tone confident, friendly, and authentic.`
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
  if (combined.includes('project') || combined.includes('shareaudit') || combined.includes('govaudit') || combined.includes('carboncredit') || combined.includes('lumino') || combined.includes('rust')) {
    links.push({ label: 'Explore Projects', appId: 'projects' })
  }
  if (combined.includes('resume') || combined.includes('cv') || combined.includes('education') || combined.includes('degree') || combined.includes('study')) {
    links.push({ label: 'View Résumé', appId: 'resume' })
  }
  if (combined.includes('music') || combined.includes('song') || combined.includes('coldplay') || combined.includes('queen')) {
    links.push({ label: 'Launch Music Player', appId: 'music' })
  }

  return links.filter((item, index, self) => index === self.findIndex((t) => t.label === item.label)).slice(0, 4)
}

// Intelligent, Query-Specific Conversational Engine (Never Generic)
function synthesizeDirectRagResponse(query, telemetry) {
  const q = query.toLowerCase().trim()
  const t = telemetry || DEFAULT_TELEMETRY

  // 1. Live GitHub Activity / Curl
  if (q.includes('curl') || q.includes('activity') || q.includes('commit') || q.includes('recent push') || q.includes('github activity')) {
    const reposList = t.topRepos ? t.topRepos.slice(0, 3).map(r => `• **[${r.name}](${r.url || 'https://github.com/Swastik45/' + r.name})** (${r.lang}) — ${r.desc}`).join('\n') : ''
    const eventsList = t.recentEvents ? t.recentEvents.slice(0, 3).map(e => `• \`${e.type}\` on **${e.repo}** (${e.time})`).join('\n') : ''

    return {
      text: `### ⚡ Live GitHub Public Activity (\`api.github.com\`)\n\n• **Public Repositories**: **${t.publicRepos}**\n• **Status**: ${t.lastCurledAt || 'Live'}\n• **Bio**: *"${t.bio}"*\n\n**Recent Activity:**\n${eventsList}\n\n**Active Repositories:**\n${reposList}`,
      links: [
        { label: 'Open GitHub Profile', href: SOCIAL_LINKS.github },
        { label: 'Browse Projects', appId: 'projects' }
      ]
    }
  }

  // 2. Greetings & Small Talk
  if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ') || q === 'yo' || q === 'sup') {
    return {
      text: `Hey there! Great to meet you. I'm Swastik's AI assistant. Ask me anything about his projects (prepNep, ShareAudit, GovAudit, Rust engine), his 2nd-year Computer Science studies, tech stack, or verified social links!`,
      links: [
        { label: 'Open GitHub', href: SOCIAL_LINKS.github },
        { label: 'Explore Projects', appId: 'projects' }
      ]
    }
  }

  // 3. Age & Birthday
  if (q.includes('age') || q.includes('how old') || q.includes('years old') || q.includes('born') || q.includes('birthday')) {
    return {
      text: `Swastik is **21 years old** (born in 2005) and lives in Kathmandu, Nepal.`,
      links: [
        { label: 'View Résumé', appId: 'resume' },
        { label: 'Open About Bio', appId: 'about' }
      ]
    }
  }

  // 4. Education & University
  if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('university') || q.includes('study') || q.includes('studied') || q.includes('semester') || q.includes('year')) {
    return {
      text: `Swastik is currently in his **2nd year of undergraduate studies** (Sophomore, 2024–Present) pursuing a Bachelor's in Computer Science / Information Technology in Kathmandu, Nepal.\n\nHis academic curriculum covers Data Structures & Algorithms, Relational Database Systems (PostgreSQL), Operating Systems, and Networking protocols.`,
      links: [
        { label: 'View Résumé', appId: 'resume' },
        { label: 'prepNep Case Study', appId: 'experience' }
      ]
    }
  }

  // 5. Name & Identity
  if (q.includes('who are you') || q.includes('who is swastik') || q.includes('your name') || q.includes('full name')) {
    return {
      text: `Swastik Paudel (स्वास्तिक पौडेल) is a 21-year-old software engineer and full-stack systems developer from Kathmandu, Nepal. He is a 2nd-year Computer Science undergraduate and interned on prepNep at Madargaach Holdings.`,
      links: [
        { label: 'Open About Bio', appId: 'about' },
        { label: 'View Résumé', appId: 'resume' }
      ]
    }
  }

  // 6. Social Media & Links
  if (q.includes('social') || q.includes('linkedin') || q.includes('twitter') || q.includes('x.com') || q.includes('whatsapp') || q.includes('link') || q.includes('profile')) {
    return {
      text: `Here are Swastik's verified links:\n\n• **GitHub**: [github.com/Swastik45](${SOCIAL_LINKS.github})\n• **LinkedIn**: [linkedin.com/in/swastik-paudel](${SOCIAL_LINKS.linkedin})\n• **Twitter / X**: [@SwastikPaudel45](${SOCIAL_LINKS.twitter})\n• **WhatsApp**: [+977 976-7929476](${SOCIAL_LINKS.whatsapp})\n• **Email**: [psamarpaudel@gmail.com](mailto:${SOCIAL_LINKS.email})`,
      links: [
        { label: 'Open GitHub', href: SOCIAL_LINKS.github },
        { label: 'Open LinkedIn', href: SOCIAL_LINKS.linkedin },
        { label: 'Open WhatsApp', href: SOCIAL_LINKS.whatsapp }
      ]
    }
  }

  // 7. prepNep / Internship
  if (q.includes('intern') || q.includes('prepnep') || q.includes('madargaach') || q.includes('job') || q.includes('work experience')) {
    return {
      text: `Swastik completed a **Software Engineering Internship** at **Madargaach Holdings** working on **prepNep** (prepnep.com), an exam preparation platform serving thousands of students across Nepal.\n\nHe focused on real-time test session state synchronization (<50ms) using WebSockets, client-side offline recovery with IndexedDB, and PostgreSQL/Redis performance optimization.`,
      links: [
        { label: 'prepNep Case Study', appId: 'experience' },
        { label: 'Visit prepnep.com', href: 'https://prepnep.com' }
      ]
    }
  }

  // 8. Projects Overview
  if (q.includes('project') || q.includes('built') || q.includes('showcase') || q.includes('apps') || q.includes('portfolio')) {
    return {
      text: `Swastik's flagship projects include:\n\n1. **prepNep** — High-concurrency educational exam engine ([prepnep.com](https://prepnep.com))\n2. **ShareAudit** — Financial portfolio and dividend analytics ([share-audit.vercel.app](https://share-audit.vercel.app))\n3. **GovAudit NP** — Civic municipal expenditure transparency watchdog ([gova-audit-np.vercel.app](https://gova-audit-np.vercel.app))\n4. **CarbonCredit** — Ecological carbon offset ledger ([carbon-credit1.vercel.app](https://carbon-credit1.vercel.app))\n5. **Lumino** — Fluid image discovery UI with 100 Lighthouse score ([lumino-five.vercel.app](https://lumino-five.vercel.app))\n6. **2D Shooting Game** — Deterministic arcade engine in Rust with Bevy ECS locked at 120 FPS.`,
      links: [
        { label: 'Explore Projects', appId: 'projects' },
        { label: 'Open GitHub', href: SOCIAL_LINKS.github }
      ]
    }
  }

  // 9. Technical Skills & Languages
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('rust') || q.includes('python') || q.includes('typescript')) {
    return {
      text: `Swastik's core tech stack spans:\n\n• **Languages**: TypeScript, JavaScript, Rust, Python, C/C++, SQL\n• **Frontend**: React 19, Next.js, Tailwind CSS, Redux Toolkit, WebSockets\n• **Backend & Storage**: Node.js, Express, PostgreSQL, Redis, REST APIs\n• **Systems & DevOps**: Docker, Linux/Unix, Git, CI/CD, Bevy ECS Engine`,
      links: [
        { label: 'Open Skills Matrix', appId: 'skills' },
        { label: 'View Résumé', appId: 'resume' }
      ]
    }
  }

  // 10. Contact / Hiring
  if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('message')) {
    return {
      text: `Swastik is open to software engineering internships, remote roles, and contract collaborations.\n\nYou can email him at [psamarpaudel@gmail.com](mailto:${SOCIAL_LINKS.email}) or message him directly on WhatsApp at [+977 976-7929476](${SOCIAL_LINKS.whatsapp}).`,
      links: [
        { label: 'Compose Mail', appId: 'mail' },
        { label: 'Open WhatsApp', href: SOCIAL_LINKS.whatsapp },
        { label: 'Open LinkedIn', href: SOCIAL_LINKS.linkedin }
      ]
    }
  }

  // 11. Music & Hobbies
  if (q.includes('music') || q.includes('song') || q.includes('hobby') || q.includes('hobbies') || q.includes('free time') || q.includes('coldplay')) {
    return {
      text: `Swastik is a big fan of classic English anthems—especially Queen (*Bohemian Rhapsody*), Coldplay (*Yellow*, *Viva La Vida*), Oasis (*Wonderwall*), and Radiohead (*Creep*). You can listen to full tracks inside the desktop Music app!`,
      links: [
        { label: 'Launch Music Player', appId: 'music' }
      ]
    }
  }

  // Dynamic Contextual Answer
  return {
    text: `Regarding "${query}":\n\nSwastik Paudel is a 21-year-old software engineer and 2nd-year Computer Science undergraduate in Kathmandu, Nepal. His work centers on full-stack web platforms (Next.js, TypeScript), Rust systems, and high-concurrency state synchronization.\n\nWhat specific aspect of his work, projects, or background would you like to explore?`,
    links: [
      { label: 'Open GitHub', href: SOCIAL_LINKS.github },
      { label: 'Browse Projects', appId: 'projects' }
    ]
  }
}

// Helper to render bold markdown (**bold**) and links cleanly
function renderFormattedMessage(text) {
  if (!text) return null
  const lines = text.split('\n')
  return lines.map((line, lIdx) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const boldRegex = /(\*\*[^*]+\*\*)/g

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
      id: 1,
      role: 'assistant',
      text: "Hello! I am Swastik's **AI Knowledge Engine**, powered by **Pollinations.ai + real-time RAG**.\n\nI can curl live GitHub data, inspect his 2nd-year Computer Science education, age (21), verified social links, prepNep internship, or flagship systems projects.\n\nWhat would you like to explore?",
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
  const streamingTimerRef = useRef(null)

  // Pre-warm socket on mount and on input focus
  const prewarmConnection = useCallback(() => {
    try {
      fetch('https://text.pollinations.ai/ping', { mode: 'no-cors' }).catch(() => {})
    } catch (err) {
      void err
    }
  }, [])

  useEffect(() => {
    prewarmConnection()
    return () => {
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current)
    }
  }, [prewarmConnection])

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
    RESPONSE_CACHE.clear()
    setMessages([
      {
        id: Date.now(),
        role: 'assistant',
        text: "Conversation refreshed. Ask me anything about Swastik's education, 2nd year status, GitHub activity, name, age (21), verified social links, or prepNep internship!",
        source: 'pollinations-rag',
        links: []
      }
    ])
  }

  // Smooth Typewriter Streamer
  const streamResponse = (fullText, links, source = 'pollinations-rag') => {
    if (streamingTimerRef.current) clearInterval(streamingTimerRef.current)

    const msgId = Date.now() + Math.random()
    setIsTyping(false)

    setMessages((prev) => [
      ...prev,
      {
        id: msgId,
        role: 'assistant',
        text: '',
        source,
        links: []
      }
    ])

    let cursor = 0
    const chunkSize = Math.max(3, Math.ceil(fullText.length / 30))

    streamingTimerRef.current = setInterval(() => {
      cursor += chunkSize
      if (cursor >= fullText.length) {
        clearInterval(streamingTimerRef.current)
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: fullText, links } : m))
        )
        soundFX.play('open')
      } else {
        const partial = fullText.slice(0, cursor)
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: partial } : m))
        )
      }
    }, 16)
  }

  // Handle User Inquiry
  const handleAsk = async (query) => {
    if (!query.trim()) return

    const userText = query.trim()
    const cacheKey = userText.toLowerCase()
    soundFX.play('click')
    setInput('')
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: userText }])

    // Fast cache lookup for exact repeats
    if (RESPONSE_CACHE.has(cacheKey)) {
      const cached = RESPONSE_CACHE.get(cacheKey)
      streamResponse(cached.text, cached.links, cached.source)
      return
    }

    // If it's the exact predefined Live Activity topic chip, deliver instant curl telemetry
    if (userText.toLowerCase().includes('curl and retrieve swastik\'s live github')) {
      const instant = synthesizeDirectRagResponse(userText, telemetry)
      streamResponse(instant.text, instant.links, 'pollinations-rag')
      return
    }

    setIsTyping(true)

    // Build RAG prompt with current telemetry
    const ragPrompt = buildRagSystemPrompt(telemetry)
    let aiText = ''

    try {
      // 14-second budget for Pollinations.ai generation
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 14000)

      const historyContext = messages.slice(-3).map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text
      }))

      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: ragPrompt },
            ...historyContext,
            { role: 'user', content: userText }
          ],
          model: 'openai-fast',
          seed: Math.floor(Math.random() * 100000)
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const text = await response.text()
        // Ensure response is valid text and not an error object or empty
        if (text && text.trim() && !text.includes('"error"') && text.length > 5) {
          aiText = text.trim()
        }
      }
    } catch (fetchErr) {
      void fetchErr
    }

    // If online generative response succeeded, stream it and cache it
    if (aiText) {
      const dynamicLinks = inferActionLinks(aiText, userText)
      RESPONSE_CACHE.set(cacheKey, { text: aiText, links: dynamicLinks, source: 'pollinations-rag' })
      streamResponse(aiText, dynamicLinks, 'pollinations-rag')
      return
    }

    // Dynamic, question-specific fallback (never generic)
    const fallback = synthesizeDirectRagResponse(userText, telemetry)
    RESPONSE_CACHE.set(cacheKey, { ...fallback, source: 'local-rag' })
    streamResponse(fallback.text, fallback.links, 'local-rag')
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
              <span>Age: 21</span>
              <span>•</span>
              <span>2nd Year Undergrad</span>
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
            onMouseEnter={prewarmConnection}
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
            key={msg.id || i}
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
                Pollinating response...
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
            onFocus={prewarmConnection}
            placeholder="Ask anything about Swastik's 2nd-year studies, age 21, projects, prepNep..."
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
