import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ─── Quick action pills config ────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: 'see my work',              query: 'see my work',                      scroll: true  },
  { label: 'how do you ship?',         query: 'how do you ship?',                 scroll: false },
  { label: 'what designer are you?',   query: 'what kind of designer are you?',   scroll: false },
  { label: "what's your availability?",query: "what's your availability?",        scroll: false },
  { label: 'wanna chat? ↗',            query: 'wanna chat?',                      scroll: false },
  { label: 'resume ↗',                 query: 'resume',                           scroll: false },
  { label: 'linkedin ↗',              query: 'linkedin',                         scroll: false },
]

// ─── AI system prompt ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Deepak Maan's portfolio assistant. Answer questions about Deepak in first person as if you are him. Be concise, warm, and direct — no corporate speak, no em dashes, no "leverage" or "seamless".

About Deepak:
- Product Designer & Design Analyst based in Mumbai (moving to Hyderabad/Bangalore for work)
- Graduate of IIT ISM Dhanbad
- Currently at JSW Steel as Product Designer and Design Analyst
- Open to full-time Product Design roles — remote, Hyderabad, or Bangalore preferred
- Designs end-to-end: research → Figma → ships in React/TypeScript using Claude Code
- No handoff — he builds what he designs

Case studies:
- Tech Japan (Talendy): UX Research internship. Ran 10 user interviews across IITs, documented 9 pain points, designed fixes for job description layout, dark mode accessibility, multiple resume management, Save All profile flow, built-in communication tool. 80% improved navigation, 70% feature adoption, multiple fixes shipped to production.
- Buzztro: Designed the full product experience for a social polling startup from 0→1. Led research, IA, and high-fidelity design across the platform.

Shipped builds (live projects):
- Music Animation Generator — generative visual art from audio
- PulsePlay — music player with visualizer
- TypMatch — typing speed game
- Kairo Design System — component library

Design tools: Figma, Photoshop, Whimsical
Code stack: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion

For availability: Open to work. Preferred locations: Remote, Hyderabad, Bangalore. Can discuss Mumbai too.
For contact/chat: Suggest they email deepak.maan@email.com or connect on LinkedIn at linkedin.com/in/deepakmaan
For resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing

If asked anything unrelated to Deepak's work, design, projects, or career — politely say: "I'm only here to answer questions about Deepak's work and design process. Try asking about his projects or how he ships."

Keep answers under 3 sentences unless the question genuinely needs more. Use plain language.`

// ─── Widget data ──────────────────────────────────────────────────────────────
const INTERESTS = ['Product Design', 'UX Research', 'Design Systems', 'Vibe Coding', 'Cricket', 'Music']

// ─── HomePage ─────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [time, setTime]           = useState(new Date())
  const chatEndRef                = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)

  // Live IST clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const istTime = time.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    // Handle special quick actions
    if (text === 'see my work') {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (text === 'resume') {
      window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing', '_blank')
      return
    }
    if (text === 'linkedin') {
      window.open('https://linkedin.com/in/deepakmaan', '_blank')
      return
    }
    if (text === 'wanna chat?') {
      window.open('mailto:deepak.maan@email.com', '_blank')
      return
    }

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setChatStarted(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await response.json()
      const reply = data.content?.[0]?.text ?? "Sorry, I couldn't get a response. Try again."
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Try again in a moment." }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAction = (action: typeof QUICK_ACTIONS[0]) => {
    if (action.scroll) {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    sendMessage(action.query)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(180,185,250,0.35) 0%, rgba(242,242,240,0) 70%), radial-gradient(ellipse 40% 40% at 10% 60%, rgba(200,190,255,0.2) 0%, transparent 60%), #F2F2F0',
        }}
      >
        {/* Headline */}
        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-[#141414] mb-10"
            style={{ fontFamily: "'Overused Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            {/* Avatar inline */}
            <span className="inline-flex items-center gap-4 flex-wrap">
              <span
                className="inline-block w-14 h-14 rounded-full bg-[#DDDDFB] border-2 border-white shadow-sm align-middle overflow-hidden flex-shrink-0"
                style={{ verticalAlign: 'middle' }}
              >
                {/* Photo goes here — replace src when ready */}
                <img
                  src="/photo.jpg"
                  alt="Deepak Maan"
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </span>
              <span>I'm Deepak Maan</span>
            </span>
            <br />
            <span style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>
              — based in Mumbai.
            </span>
            <br />
            <span>
              I research, design, and ship{' '}
              <em
                className="not-italic"
                style={{
                  fontStyle: 'italic',
                  fontFamily: "'Overused Grotesk', sans-serif",
                  fontWeight: 700,
                }}
              >
                end to end.
              </em>
            </span>
          </h1>

          {/* Quick action pills */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6 justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action)}
                className="px-4 py-2 rounded-full border border-[#E2E2DF] bg-white/80 backdrop-blur-sm text-sm font-medium text-[#141414] hover:bg-white hover:border-[#C8C8C4] hover:shadow-sm transition-all duration-150 cursor-pointer"
                style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
              >
                {action.label}
              </button>
            ))}
          </motion.div>

          {/* Chat messages */}
          <AnimatePresence>
            {chatStarted && (
              <motion.div
                className="mb-4 space-y-3 max-h-72 overflow-y-auto"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-[#DDDDFB] flex-shrink-0 mr-2 mt-1 overflow-hidden">
                        <img src="/photo.jpg" alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </div>
                    )}
                    <div
                      className={`
                        max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed
                        ${msg.role === 'user'
                          ? 'bg-[#141414] text-white rounded-br-sm'
                          : 'bg-white border border-[#E2E2DF] text-[#141414] rounded-bl-sm shadow-sm'
                        }
                      `}
                      style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#DDDDFB] flex-shrink-0 mr-2 mt-1" />
                    <div className="bg-white border border-[#E2E2DF] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-[#9B9B9B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#9B9B9B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#9B9B9B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat input */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative"
          >
            <div className="flex items-center bg-white border border-[#E2E2DF] rounded-2xl shadow-sm px-4 py-3 focus-within:border-[#C8C8C4] focus-within:shadow-md transition-all duration-200">
              <span className="text-[#9B9B9B] mr-2 text-sm font-mono select-none">{'>'}_</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="ask Deepak anything..."
                className="flex-1 bg-transparent text-sm text-[#141414] placeholder:text-[#9B9B9B] outline-none"
                style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center hover:bg-[#2a2a2a] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 flex-shrink-0 ml-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 12V2M7 2L2 7M7 2L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-[#9B9B9B] mt-2" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>
              Yes, this is a bot replying — but Deepak monitors every message.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── WIDGET SCATTER SECTION ───────────────────────────────────────── */}
      <section
        id="about"
        className="relative min-h-screen"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        <div className="max-w-6xl mx-auto px-8 py-24 relative">

          {/* Grid of scattered widgets */}
          <div className="relative min-h-[700px]">

            {/* Profile card — top left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="absolute top-0 left-0 w-56 bg-white rounded-2xl shadow-widget border border-[#E2E2DF] overflow-hidden"
            >
              <div className="w-full h-40 bg-[#DDDDFB] overflow-hidden">
                <img
                  src="/photo.jpg"
                  alt="Deepak Maan"
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-[#141414]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Deepak Maan</p>
                <p className="text-xs text-[#6B6B6B]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Mumbai, India</p>
              </div>
            </motion.div>

            {/* Clock widget — below profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="absolute top-56 left-0 w-56 bg-white rounded-2xl shadow-widget border border-[#E2E2DF] p-4"
            >
              <p className="text-xs text-[#9B9B9B] uppercase tracking-wider mb-1" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Mumbai, IN</p>
              <p className="text-3xl font-light text-[#141414] tracking-tight" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>{istTime.split(' ')[0]}</p>
              <p className="text-xs text-[#9B9B9B] mt-0.5" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>IST · UTC+5:30</p>
            </motion.div>

            {/* Interests — below clock */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="absolute top-[420px] left-0 w-56 bg-white rounded-2xl shadow-widget border border-[#E2E2DF] p-4"
            >
              <p className="text-xs text-[#9B9B9B] uppercase tracking-wider mb-3" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map(i => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full bg-[#F2F2F0] border border-[#E2E2DF] text-xs text-[#6B6B6B]"
                    style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Availability card — top center-right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute top-0 left-1/2 -translate-x-1/4 w-60 bg-[#141414] rounded-2xl shadow-widget p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" style={{ animation: 'pulse-dot 2s infinite' }} />
                <span className="text-xs text-[#9B9B9B] uppercase tracking-wider" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Available Now</span>
              </div>
              <p className="text-base font-semibold text-white mb-3" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Product Designer</p>
              <div className="space-y-1">
                {['→ Hyderabad', '→ Bangalore', '→ Remote'].map(loc => (
                  <p key={loc} className="text-sm text-[#9B9B9B]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>{loc}</p>
                ))}
              </div>
            </motion.div>

            {/* Currently learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="absolute top-48 left-[38%] bg-[#F5E642] rounded-xl shadow-widget px-3 py-2"
            >
              <p className="text-xs font-medium text-[#141414]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Currently building with AI ✦</p>
            </motion.div>

            {/* Resume card — right side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-40 right-0 w-44 bg-[#F5E642] rounded-2xl shadow-widget p-4 cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing', '_blank')}
            >
              <p className="text-xs font-medium text-[#141414] uppercase tracking-wider mb-2" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>CV</p>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2h5l3 3v9H4V2z" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M9 2v3h3" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                <div>
                  <p className="text-sm font-semibold text-[#141414]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Resume</p>
                  <p className="text-xs text-[#6B6B6B]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>PDF · 1 page</p>
                </div>
              </div>
            </motion.div>

            {/* LinkedIn card — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="absolute top-[340px] right-0 w-44 bg-[#0A66C2] rounded-2xl shadow-widget p-4 cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => window.open('https://linkedin.com/in/deepakmaan', '_blank')}
            >
              <p className="text-xs font-medium text-white/70 uppercase tracking-wider mb-2" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Find me online</p>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/>
                </svg>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>LinkedIn</p>
                  <p className="text-xs text-white/70" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>/in/deepakmaan</p>
                </div>
              </div>
            </motion.div>

            {/* Rate this portfolio widget — bottom center */}
            <RateWidget />

          </div>
        </div>
      </section>

      {/* ── WORK SECTION ANCHOR ──────────────────────────────────────────── */}
      <div id="work" />

    </main>
  )
}

// ─── Rate widget ──────────────────────────────────────────────────────────────
const RateWidget = () => {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [rated, setRated] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 bg-white rounded-2xl shadow-widget border border-[#E2E2DF] p-4 text-center"
    >
      <p className="text-xs text-[#9B9B9B] uppercase tracking-wider mb-3" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>
        {rated ? 'Thanks! 🎉' : 'Rate this portfolio'}
      </p>
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onMouseEnter={() => !rated && setHovered(star)}
            onMouseLeave={() => !rated && setHovered(0)}
            onClick={() => { if (!rated) { setRating(star); setRated(true) } }}
            className="text-xl transition-transform hover:scale-110"
          >
            <span className={(hovered || rating) >= star ? 'text-[#F5E642]' : 'text-[#E2E2DF]'}>★</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default HomePage
