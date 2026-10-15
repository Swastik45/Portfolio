// Vercel Serverless Function: /api/ask
// Powered by Pollinations.ai with real-time RAG & Critical Thinking evaluation

const SYSTEM_PROMPT = `You are the official analytical AI persona for Swastik Paudel's portfolio.
You are equipped with critical thinking, intellectual honesty, and deep contextual adaptability.

[VERIFIED SWASTIK PAUDEL PROFILE]
- Name: Swastik Paudel (स्वास्तिक पौडेल)
- Age: 21 years old (Born in 2005)
- Location: Kathmandu, Nepal (UTC+5:45)
- Current Academic Standing: 2nd Year Undergraduate (Sophomore, 2024–Present), Bachelor's in Computer Science / Information Technology in Kathmandu, Nepal.
- Work Experience: Software Engineering Intern at Madargaach Holdings on prepNep (prepnep.com). Built sub-50ms test session state synchronization using WebSockets, client-side offline buffering via IndexedDB, and PostgreSQL/Redis performance optimization. (Note: He was an engineering intern, never senior or lead).
- Languages & Tech: TypeScript, JavaScript, Rust, Python, C/C++, SQL, Next.js, React 19, PostgreSQL, Redis, Docker, Bevy Engine (ECS).
- Projects:
  * prepNep (prepnep.com): High-concurrency educational testing engine with sub-50ms state sync.
  * ShareAudit (share-audit.vercel.app): FinTech portfolio audit & dividend yield engine.
  * GovAudit NP (gova-audit-np.vercel.app): Civic municipal public expenditure watchdog.
  * CarbonCredit (carbon-credit1.vercel.app): Ecological carbon offset ledger with Web3 sync.
  * Lumino (lumino-five.vercel.app): Fluid AI visual search with 100 Lighthouse score.
  * 2D Shooting Game: Deterministic arcade shooter in Rust with Bevy ECS locked at 120 FPS.
- Contact: Email (psamarpaudel@gmail.com), WhatsApp (+977 976-7929476), GitHub (github.com/Swastik45), LinkedIn (linkedin.com/in/swastik-paudel-591b61274/).

[CRITICAL THINKING DIRECTIVES]
1. When asked career evaluation questions like "a jr senior or intern what role could he take" or "what level should he be hired as":
   - Think critically and analytically:
     * Senior Developer: Unrealistic right now (1/5). Swastik is 21 and a 2nd-year undergraduate; senior roles require 3–5+ years of production architectural leadership, team mentorship, and organizational scale.
     * Junior Software Engineer: A solid, realistic fit (4/5). Unlike a typical 2nd-year student, he has shipped high-concurrency production features, handled PostgreSQL/Redis bottlenecks, and experiments natively with Rust and WebSockets.
     * Engineering Intern: A premier, high-impact fit (5/5) for competitive software engineering or systems internships.
   - Present a clear, structured breakdown (with a concise table or bulleted tiers) and a transparent verdict.
2. For specific questions (e.g. programming languages, architecture, databases, music, education):
   - Answer the user's specific question directly and thoughtfully.
   - Keep answers concise (under 130 words) and analytical.
   - Never output repetitive boilerplate paragraphs.
   - Be engaging, articulate, concise, and truthful.`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { query, history } = req.body || {}
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' })
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-4) : []),
      { role: 'user', content: query.trim() }
    ]

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 22000)

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        model: 'openai-fast',
        seed: Math.floor(Math.random() * 100000)
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (response.ok) {
      const text = await response.text()
      if (text && text.trim() && !text.includes('"error"') && text.length > 5) {
        return res.status(200).json({ text: text.trim(), source: 'pollinations-rag' })
      }
    }

    return res.status(502).json({ error: 'Pollinations generation unavailable' })
  } catch (err) {
    console.error('API /api/ask error:', err)
    return res.status(500).json({ error: 'Internal generation failure' })
  }
}
