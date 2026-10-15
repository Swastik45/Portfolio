import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, ArrowRight, User, ExternalLink, Copy, Check, RotateCcw } from 'lucide-react'
import { soundFX } from '../soundEffects'

const TOPICS = [
  { label: 'prepNep Architecture', prompt: 'How does prepNep handle concurrent exam state synchronization?' },
  { label: 'Rust & Systems', prompt: 'Tell me about your Rust and low-level systems experience.' },
  { label: 'Flagship Projects', prompt: 'What are your top production projects?' },
  { label: 'Tech Stack', prompt: 'What is your complete engineering stack?' },
  { label: 'Hiring & Availability', prompt: 'Are you available for remote engineering roles or contract work?' }
]

function generateAiResponse(query) {
  const q = query.toLowerCase().trim()

  // 1. prepNep / Exam engine / Concurrency
  if (
    q.includes('prepnep') || q.includes('exam') || q.includes('madargaach') ||
    q.includes('concurrency') || q.includes('sync') || q.includes('latency') ||
    q.includes('padhum')
  ) {
    return {
      text: `At **prepNep** (prepnep.com), under Madargaach Holdings, I lead the core engineering architecture powering national online examination sessions for thousands of simultaneous students.\n\n### Architectural Highlights:\n• **Sub-50ms State Sync**: Exam sessions sync incremental question answers over resilient WebSockets with HTTP fallback.\n• **Offline Recovery Buffer**: Students never lose progress if their network drops; an IndexedDB client queue syncs deterministically upon reconnect.\n• **Multi-Tier Caching**: PostgreSQL data is partitioned and hot-cached in Redis clusters to prevent database bottlenecks during sudden traffic spikes.\n• **High Reliability**: Zero-downtime rolling deployments with automated rollback safety.`,
      links: [
        { label: 'Visit prepnep.com', href: 'https://prepnep.com' },
        { label: 'Open prepNep Case Study', appId: 'experience' },
        { label: 'View Projects Finder', appId: 'projects' }
      ]
    }
  }

  // 2. Projects inquiry
  if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built')) {
    if (q.includes('share') || q.includes('audit') && q.includes('share')) {
      return {
        text: `**ShareAudit** (share-audit.vercel.app) is an equity investment auditing and dividend analytics dashboard.\n\n• Computes forward dividend cashflows and risk allocations for retail and institutional traders.\n• Built with React, Vite, Tailwind CSS, and Chart.js.\n• Real-time stock portfolio rebalancing projections with instant calculations.`,
        links: [
          { label: 'Visit ShareAudit', href: 'https://share-audit.vercel.app' },
          { label: 'Open Projects Finder', appId: 'projects' }
        ]
      }
    }
    if (q.includes('gov') || q.includes('civic') || q.includes('budget')) {
      return {
        text: `**GovAudit NP** (gova-audit-np.vercel.app) is an open civic transparency engine auditing municipal government budgets in Nepal.\n\n• Ingests and visualizes public expenditure datasets to detect budget anomalies.\n• Clean, accessible UI built with React and Tailwind CSS with zero tracking.`,
        links: [
          { label: 'Visit GovAudit NP', href: 'https://gova-audit-np.vercel.app' },
          { label: 'Open Projects Finder', appId: 'projects' }
        ]
      }
    }
    if (q.includes('carbon')) {
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

    return {
      text: `Swastik has engineered six flagship production & systems applications:\n\n1. **prepNep** — High-concurrency examination and learning platform for thousands of students ([prepnep.com](https://prepnep.com))\n2. **ShareAudit** — Equity investment auditor and dividend analytics platform ([share-audit.vercel.app](https://share-audit.vercel.app))\n3. **GovAudit NP** — Civic public expenditure watchdog ([gova-audit-np.vercel.app](https://gova-audit-np.vercel.app))\n4. **CarbonCredit** — Ecological offset tracking ledger ([carbon-credit1.vercel.app](https://carbon-credit1.vercel.app))\n5. **Lumino** — Fluid frontend application with 100 Lighthouse performance ([lumino-five.vercel.app](https://lumino-five.vercel.app))\n6. **2D Shooting Game** — Deterministic game engine in Rust with Bevy ECS architecture (GitHub)`,
      links: [
        { label: 'Open Projects Finder', appId: 'projects' },
        { label: 'Read prepNep Specs', appId: 'experience' }
      ]
    }
  }

  // 3. Rust & Systems Programming
  if (q.includes('rust') || q.includes('bevy') || q.includes('ecs') || q.includes('game') || q.includes('c++') || q.includes('low-level')) {
    return {
      text: `Swastik is passionate about low-level systems and deterministic architectures in **Rust**.\n\n### Systems Focus:\n• **Zero-Cost Abstractions**: Leveraging Rust's ownership and borrow checker for memory safety without garbage collection pauses.\n• **Bevy Engine & ECS**: Built a deterministic 2D arcade shooter using Entity-Component-System (ECS) architecture locked at 120 FPS.\n• **Systems Networking**: Architecting low-overhead microservices, custom binary protocols, and concurrent workers.`,
      links: [
        { label: 'Inspect Projects', appId: 'projects' },
        { label: 'GitHub Repositories', href: 'https://github.com/Swastik45' }
      ]
    }
  }

  // 4. Skills & Technical Stack
  if (
    q.includes('skill') || q.includes('stack') || q.includes('tech') ||
    q.includes('languages') || q.includes('database') || q.includes('frontend') ||
    q.includes('backend') || q.includes('react') || q.includes('node') || q.includes('postgres')
  ) {
    return {
      text: `Swastik's production engineering stack:\n\n• **Core Languages**: TypeScript, JavaScript (ESNext), Rust, Python, C/C++, SQL\n• **Frontend & UI**: React 19, Next.js, Tailwind CSS, Redux Toolkit, WebSockets\n• **Backend & APIs**: Node.js, Express, PostgreSQL, Redis, RESTful APIs, GraphQL\n• **Systems & DevOps**: Docker, Linux/Unix internals, Git, CI/CD, Vercel, Microservices`,
      links: [
        { label: 'Open Skills Matrix', appId: 'skills' },
        { label: 'View Résumé', appId: 'resume' }
      ]
    }
  }

  // 5. Contact / Hire / Rates / Availability / Remote
  if (
    q.includes('hire') || q.includes('contact') || q.includes('email') ||
    q.includes('phone') || q.includes('whatsapp') || q.includes('reach') ||
    q.includes('available') || q.includes('remote') || q.includes('job') ||
    q.includes('rate') || q.includes('salary') || q.includes('contract')
  ) {
    return {
      text: `Swastik is open to **Software Engineering**, **Full-Stack / Backend Systems**, and **Contract Roles** with forward-thinking teams.\n\n### Quick Details:\n• **Location**: Kathmandu, Nepal (UTC+5:45)\n• **Remote Flexibility**: Experienced working across global time zones (US, Europe, APAC)\n• **Email**: psamarpaudel@gmail.com\n• **Phone / WhatsApp**: +977 976-7929476\n• **GitHub**: [github.com/Swastik45](https://github.com/Swastik45)`,
      links: [
        { label: 'Compose Mail', appId: 'mail' },
        { label: 'View Résumé', appId: 'resume' }
      ]
    }
  }

  // 6. Bio / Background / Education / Location
  if (
    q.includes('who') || q.includes('about') || q.includes('swastik') ||
    q.includes('bio') || q.includes('background') || q.includes('nepal') ||
    q.includes('kathmandu') || q.includes('location')
  ) {
    return {
      text: `**Swastik Paudel** is a Software Engineer based in Kathmandu, Nepal.\n\nHe specializes in building scalable web architectures, real-time synchronization engines, and low-latency systems. Currently, he serves as lead software engineer for **prepNep** (Madargaach Holdings), driving the technical platform for thousands of concurrent students.`,
      links: [
        { label: 'Open About Bio', appId: 'about' },
        { label: 'View Résumé', appId: 'resume' },
        { label: 'Open Projects', appId: 'projects' }
      ]
    }
  }

  // 7. General Architecture / Engineering Question
  if (q.includes('optimize') || q.includes('database') || q.includes('redis') || q.includes('microservice') || q.includes('architecture')) {
    return {
      text: `When architecting high-throughput applications like prepNep, Swastik focuses on three pragmatic engineering pillars:\n\n1. **Data Sharding & Layered Caching**: Read-heavy paths query Redis with sub-millisecond response times, while write-heavy transactional operations pass through batched PostgreSQL transactions with indexing on frequently queried foreign keys.\n2. **Stateless App Nodes & Ephemeral Sessions**: Keeping app servers stateless enables rapid horizontal scaling behind a reverse proxy without sticky sessions.\n3. **Event-Driven Asynchronous Workers**: Heavy tasks like test score evaluations and notification dispatches run asynchronously on background worker queues so API endpoints return immediately.`,
      links: [
        { label: 'Read prepNep Case Study', appId: 'experience' },
        { label: 'Launch Terminal', appId: 'terminal' }
      ]
    }
  }

  // 8. Casual / Friendly greeting
  if (q === 'hi' || q === 'hello' || q.includes('hey') || q === 'sup' || q.includes('morning') || q.includes('evening')) {
    return {
      text: `Hello! Great to meet you. I can answer any question about Swastik's engineering experience, prepNep architecture, projects, skills in Rust/TypeScript, or connect you directly with him.\n\nWhat would you like to know?`,
      links: [
        { label: 'Explore Projects', appId: 'projects' },
        { label: 'View Skills', appId: 'skills' },
        { label: 'Get in Touch', appId: 'mail' }
      ]
    }
  }

  // 9. Fallback: Intelligent, helpful contextual answer
  return {
    text: `Regarding "${query}":\n\nSwastik Paudel is a Software Engineer in Kathmandu, Nepal specializing in high-concurrency web platforms, Rust systems, and real-time state synchronization.\n\nHe leads development on **prepNep** (prepnep.com) and has engineered flagship applications across fintech (ShareAudit), civic tech (GovAudit NP), and game systems in Rust.\n\nYou can explore his projects, inspect his skills matrix, or message him directly!`,
    links: [
      { label: 'Browse Projects', appId: 'projects' },
      { label: 'Inspect Skills', appId: 'skills' },
      { label: 'Contact Swastik', appId: 'mail' }
    ]
  }
}

export default function AskSwastikApp({ onOpenApp }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am Swastik's portfolio assistant. Ask me anything about his projects, prepNep architecture, Rust systems experience, tech stack, or hiring availability.",
      links: []
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
        text: "Conversation refreshed. Ask me anything about Swastik's engineering projects, architecture, or contact channels!",
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
    }, 300)
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
              Instant technical answers about architecture, stack, and production systems
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
          <Sparkles className="w-3 h-3 text-[#dca561]" /> Prompts:
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

              <div className="whitespace-pre-line pr-4">{msg.text}</div>

              {/* Functional Desktop Action Links */}
              {msg.links && msg.links.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                  {msg.links.map((link, lIdx) => {
                    if (link.href) {
                      return (
                        <a
                          key={lIdx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors cursor-pointer"
                        >
                          {link.label}
                          <ExternalLink className="w-3 h-3 text-white/60" />
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
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#7e9cd8]/20 hover:bg-[#7e9cd8]/35 text-[#7e9cd8] font-medium text-[11px] border border-[#7e9cd8]/30 transition-colors cursor-pointer"
                      >
                        {link.label}
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
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc5a55] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc5a55] animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc5a55] animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAsk(input)
        }}
        className="p-3 bg-[#20202e] border-t border-white/10 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about prepNep, tech stack, Rust, projects..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#7e9cd8]"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-[#dc5a55] hover:bg-[#c34043] disabled:opacity-40 text-white transition-colors cursor-pointer"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
