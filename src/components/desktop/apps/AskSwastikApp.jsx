import React, { useState, useRef, useEffect } from 'react'
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
  Share2
} from 'lucide-react'
import { soundFX } from '../soundEffects'

// Verified profiles & social channels
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
  { label: '🔗 Social Media & Links', prompt: 'What are Swastik\'s official social media profiles and contact links?' },
  { label: '👤 Name & Age', prompt: 'What is your full name, age, and where are you from?' },
  { label: '💼 Internship at prepNep', prompt: 'Tell me about Swastik\'s software engineering internship at prepNep.' },
  { label: '⚡ Flagship Projects', prompt: 'What are your top production projects and live deployments?' },
  { label: '🛠️ Tech Stack', prompt: 'What is your complete programming languages and technology stack?' },
  { label: '🦀 Rust & Systems', prompt: 'Tell me about your Rust and low-level systems experience.' },
  { label: '🎓 Education & Background', prompt: 'What is your educational background and technical foundation?' },
  { label: '🤝 Hiring & Availability', prompt: 'Are you available for remote software engineering roles, internships, or contract work?' }
]

function generateAiResponse(query) {
  const q = query.toLowerCase().trim()

  // 1. Social Media & Links Inquiry
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

  // 2. Name, Age, Birthday, & Origin Inquiry
  if (
    q.includes('name') || q.includes('who are you') || q.includes('who is swastik') ||
    q.includes('identity') || q.includes('age') || q.includes('how old') ||
    q.includes('born') || q.includes('birthday') || q.includes('birthdate') ||
    q.includes('dob') || q.includes('years old')
  ) {
    return {
      text: `**Personal & Identity Overview**:\n\n• **Full Name**: Swastik Paudel (स्वास्तिक पौडेल)\n• **Age**: 22 years old (Born in 2004)\n• **Location**: Kathmandu, Nepal (UTC+5:45)\n• **Profession**: Software Engineer & Full-Stack Systems Developer\n• **Experience**: Completed a Software Engineering Internship at **Madargaach Holdings** (prepNep)\n• **Specialization**: High-concurrency web platforms, real-time synchronization, and native systems in Rust\n\nHe is an energetic software engineer passionate about clean code, memory safety, and dependable architectures.`,
      links: [
        { label: 'View Résumé', appId: 'resume' },
        { label: 'Open About Bio', appId: 'about' },
        { label: 'Browse Projects', appId: 'projects' }
      ]
    }
  }

  // 3. Internship & Experience Inquiry
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

  // 4. prepNep Platform Details
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

  // 5. Individual Project Inquiries
  if (q.includes('share') || q.includes('shareaudit')) {
    return {
      text: `**ShareAudit** (share-audit.vercel.app) is an equity investment auditing and dividend analytics dashboard.\n\n• Computes forward dividend cashflows and risk allocations for retail and institutional traders.\n• Built with React, Vite, Tailwind CSS, and Chart.js.\n• Real-time stock portfolio rebalancing projections with instant calculations.`,
      links: [
        { label: 'Visit ShareAudit', href: 'https://share-audit.vercel.app' },
        { label: 'Open Projects Finder', appId: 'projects' }
      ]
    }
  }
  if (q.includes('gov') || q.includes('civic') || q.includes('budget') || q.includes('govaudit')) {
    return {
      text: `**GovAudit NP** (gova-audit-np.vercel.app) is an open civic transparency engine auditing municipal government budgets in Nepal.\n\n• Ingests and visualizes public expenditure datasets to detect budget anomalies.\n• Clean, accessible UI built with React and Tailwind CSS with zero tracking.`,
      links: [
        { label: 'Visit GovAudit NP', href: 'https://gova-audit-np.vercel.app' },
        { label: 'Open Projects Finder', appId: 'projects' }
      ]
    }
  }
  if (q.includes('carbon') || q.includes('carboncredit')) {
    return {
      text: `**CarbonCredit** (carbon-credit1.vercel.app) is an ecological offset tracking system for verifiable carbon reduction initiatives.\n\n• Real-time environmental metrics and project ledger verification.\n• Built with Next.js, React, and modular state management.`,
      links: [
        { label: 'Visit CarbonCredit', href: 'https://carbon-credit1.vercel.app' },
        { label: 'Open Projects Finder', appId: 'projects' }
      ]
    }
  }
  if (q.includes('lumino')) {
    return {
      text: `**Lumino** (lumino-five.vercel.app) is a high-craft frontend engineering showcase focused on fluid interaction design.\n\n• Scored a perfect 100/100 across Google Lighthouse metrics.\n• Sub-millisecond layout shifts, buttery 60fps transitions, and ergonomic typography.`,
      links: [
        { label: 'Visit Lumino', href: 'https://lumino-five.vercel.app' },
        { label: 'Open Projects Finder', appId: 'projects' }
      ]
    }
  }

  // 6. Rust & Systems Programming
  if (q.includes('rust') || q.includes('bevy') || q.includes('ecs') || q.includes('game') || q.includes('c++') || q.includes('low-level')) {
    return {
      text: `Swastik is passionate about low-level systems and deterministic architectures in **Rust**.\n\n### Systems Focus:\n• **Zero-Cost Abstractions**: Leveraging Rust's ownership and borrow checker for memory safety without garbage collection pauses.\n• **Bevy Engine & ECS**: Built a deterministic 2D arcade shooter using Entity-Component-System (ECS) architecture locked at 120 FPS.\n• **Systems Networking**: Architecting low-overhead microservices, custom binary protocols, and concurrent workers.`,
      links: [
        { label: 'Inspect Projects', appId: 'projects' },
        { label: 'GitHub Repositories', href: SOCIAL_LINKS.github }
      ]
    }
  }

  // 7. General Projects Overview
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built') || q.includes('showcase')) {
    return {
      text: `Swastik has engineered six flagship production & systems applications:\n\n1. **prepNep** — High-concurrency examination and learning platform for thousands of students ([prepnep.com](https://prepnep.com))\n2. **ShareAudit** — Equity investment auditor and dividend analytics platform ([share-audit.vercel.app](https://share-audit.vercel.app))\n3. **GovAudit NP** — Civic public expenditure watchdog ([gova-audit-np.vercel.app](https://gova-audit-np.vercel.app))\n4. **CarbonCredit** — Ecological offset tracking ledger ([carbon-credit1.vercel.app](https://carbon-credit1.vercel.app))\n5. **Lumino** — Fluid frontend application with 100 Lighthouse performance ([lumino-five.vercel.app](https://lumino-five.vercel.app))\n6. **2D Shooting Game** — Deterministic game engine in Rust with Bevy ECS architecture (GitHub)`,
      links: [
        { label: 'Open Projects Finder', appId: 'projects' },
        { label: 'Read prepNep Specs', appId: 'experience' }
      ]
    }
  }

  // 8. Skills & Technical Stack
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

  // 9. Education & Background
  if (
    q.includes('education') || q.includes('study') || q.includes('studied') ||
    q.includes('college') || q.includes('university') || q.includes('degree') ||
    q.includes('school') || q.includes('academic') || q.includes('cs')
  ) {
    return {
      text: `**Educational Background**:\n\n• **Focus**: Computer Science, Software Engineering, and Systems Architecture.\n• **Foundations**: Data structures, relational database design, networking protocols, and operating systems.\n• **Specialization**: Self-directed engineering in Rust memory models, concurrency primitives, and modern full-stack web platforms.\n• **Practical Application**: Applied academic concepts directly into production during his Software Engineering Internship at prepNep.`,
      links: [
        { label: 'View Résumé', appId: 'resume' },
        { label: 'Open About Bio', appId: 'about' }
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

  // 11. Contact Channels
  if (
    q.includes('contact') || q.includes('email') || q.includes('phone') ||
    q.includes('whatsapp') || q.includes('reach') || q.includes('message') || q.includes('touch')
  ) {
    return {
      text: `You can reach **Swastik Paudel** directly through any of these communication channels:\n\n• **Email**: [psamarpaudel@gmail.com](mailto:${SOCIAL_LINKS.email})\n• **Phone / WhatsApp**: [+977 976-7929476](${SOCIAL_LINKS.whatsapp})\n• **LinkedIn**: [linkedin.com/in/swastik-paudel](${SOCIAL_LINKS.linkedin})\n• **GitHub**: [github.com/Swastik45](${SOCIAL_LINKS.github})\n• **Location**: Kathmandu, Nepal (UTC+5:45)`,
      links: [
        { label: 'Open WhatsApp', href: SOCIAL_LINKS.whatsapp },
        { label: 'Compose Mail', appId: 'mail' },
        { label: 'Open LinkedIn', href: SOCIAL_LINKS.linkedin }
      ]
    }
  }

  // 12. Location & Timezone
  if (q.includes('nepal') || q.includes('kathmandu') || q.includes('location') || q.includes('where')) {
    return {
      text: `Swastik is based in **Kathmandu, Nepal** (Timezone: UTC+5:45).\n\nHe has experience collaborating asynchronously and in real-time with teams across North America, Europe, and Asia-Pacific.`,
      links: [
        { label: 'Open About Bio', appId: 'about' },
        { label: 'Get in Touch', appId: 'mail' }
      ]
    }
  }

  // 13. Music, Hobbies & Interests
  if (
    q.includes('music') || q.includes('song') || q.includes('hobby') ||
    q.includes('hobbies') || q.includes('interest') || q.includes('outside') || q.includes('free time')
  ) {
    return {
      text: `Outside coding, Swastik loves:\n\n• **Classic English Music**: A huge fan of timeless English classics like Queen (*Bohemian Rhapsody*), Coldplay (*Yellow*, *Viva La Vida*), Oasis (*Wonderwall*), Elton John (*Rocket Man*), Eagles (*Hotel California*), and Radiohead (*Creep*). You can listen to these tracks right now in the desktop **Music Player** app!\n• **Systems & Game Dev**: Experimenting with game loops, physics simulations, and graphics in Rust with Bevy.\n• **Exploring Kathmandu**: Coffee, reading, and walking around Nepal's historic valley.`,
      links: [
        { label: 'Launch Music Player', appId: 'music' },
        { label: 'Explore Projects', appId: 'projects' }
      ]
    }
  }

  // 14. Casual / Friendly greeting
  if (q === 'hi' || q === 'hello' || q.includes('hey') || q === 'sup' || q.includes('morning') || q.includes('evening')) {
    return {
      text: `Hello! Great to meet you. I am Swastik's AI portfolio assistant.\n\nI can provide verified information on:\n• **Identity & Age**: Swastik Paudel, 22 years old, Kathmandu\n• **Social Media & Links**: GitHub, LinkedIn, Twitter/X, WhatsApp, Email\n• **Work & Internship**: Engineering intern experience at prepNep\n• **Technical Skills**: Rust, TypeScript, React 19, Next.js, PostgreSQL, Redis\n• **Projects**: prepNep, ShareAudit, GovAudit, CarbonCredit, Lumino, Rust Game\n\nWhat would you like to explore?`,
      links: [
        { label: 'Social Media & Links', href: SOCIAL_LINKS.github },
        { label: 'Explore Projects', appId: 'projects' },
        { label: 'Get in Touch', appId: 'mail' }
      ]
    }
  }

  // 15. Fallback: Intelligent, helpful contextual answer
  return {
    text: `Regarding "${query}":\n\n**Swastik Paudel** (22, Kathmandu, Nepal) is a Software Engineer specializing in scalable web systems, Rust, and real-time state synchronization.\n\nHe completed a Software Engineering Internship on **prepNep** (prepnep.com) and has engineered flagship applications across fintech (ShareAudit), civic data (GovAudit NP), and game physics in Rust.\n\n• **Official Links**: GitHub ([github.com/Swastik45](${SOCIAL_LINKS.github})), LinkedIn ([linkedin.com/in/swastik-paudel](${SOCIAL_LINKS.linkedin})), Twitter/X ([@SwastikPaudel45](${SOCIAL_LINKS.twitter}))\n• **Direct Contact**: Email ([psamarpaudel@gmail.com](mailto:${SOCIAL_LINKS.email})) & WhatsApp ([+977 976-7929476](${SOCIAL_LINKS.whatsapp}))`,
    links: [
      { label: 'Open GitHub', href: SOCIAL_LINKS.github },
      { label: 'Open LinkedIn', href: SOCIAL_LINKS.linkedin },
      { label: 'Browse Projects', appId: 'projects' },
      { label: 'Contact Swastik', appId: 'mail' }
    ]
  }
}

// Helper to render bold markdown (**bold**) cleanly in UI
function renderFormattedMessage(text) {
  const lines = text.split('\n')
  return lines.map((line, lIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return (
      <React.Fragment key={lIdx}>
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-white">
                {part.slice(2, -2)}
              </strong>
            )
          }
          return part
        })}
        {lIdx < lines.length - 1 && <br />}
      </React.Fragment>
    )
  })
}

export default function AskSwastikApp({ onOpenApp }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am Swastik's portfolio knowledge assistant. Ask me anything about his name, age, social media links, internship at prepNep, projects, skills in Rust/TypeScript, or contact channels.",
      links: [
        { label: 'Social Media & Links', href: SOCIAL_LINKS.github },
        { label: 'Explore Projects', appId: 'projects' }
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)
  const chatEndRef = useRef(null)

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
        text: "Conversation refreshed. Ask me anything about Swastik's name, age, social media profiles, prepNep internship, projects, or contact channels!",
        links: []
      }
    ])
  }

  const handleAsk = (query) => {
    if (!query.trim()) return

    const userText = query.trim()
    soundFX.play('click')
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userText }])
    setIsTyping(true)

    setTimeout(() => {
      const response = generateAiResponse(userText)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: response.text,
          links: response.links || []
        }
      ])
      setIsTyping(false)
      soundFX.play('open')
    }, 280)
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
              <span className="text-[10px] font-mono font-normal px-2 py-0.2 rounded-full bg-[#76946a]/20 text-[#76946a] border border-[#76946a]/30">
                AI Knowledge Engine
              </span>
            </h2>
            <p className="text-[10px] text-[#938aa9]">
              Instant verified answers about Swastik's identity, age, social links, internship, &amp; projects
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
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
            className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-colors shrink-0 whitespace-nowrap cursor-pointer"
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
                  : 'bg-[#dc5a55] text-white'
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
              {/* Copy button for assistant responses */}
              {msg.role === 'assistant' && (
                <button
                  type="button"
                  onClick={() => handleCopy(msg.text, i)}
                  className="absolute top-2.5 right-2.5 p-1 rounded-md bg-white/5 hover:bg-white/15 text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Copy text"
                >
                  {copiedIdx === i ? <Check className="w-3 h-3 text-[#76946a]" /> : <Copy className="w-3 h-3" />}
                </button>
              )}

              <div className="pr-4">
                {renderFormattedMessage(msg.text)}
              </div>

              {/* Functional Desktop Action & Social Links */}
              {msg.links && msg.links.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                  {msg.links.map((link, lIdx) => {
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
            <div className="w-7 h-7 rounded-lg bg-[#dc5a55] text-white font-bold flex items-center justify-center text-xs">
              問
            </div>
            <div className="flex gap-1.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7e9cd8] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7e9cd8] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7e9cd8] animate-bounce" style={{ animationDelay: '300ms' }} />
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
            placeholder="Ask about Swastik's name, age, social links, internship, projects..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-[#7e9cd8] text-white placeholder-white/40 text-xs px-3.5 py-2.5 rounded-xl outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
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
