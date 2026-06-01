import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ─── Quick actions ────────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: 'see my work ↓',            query: 'see my work',              scroll: true  },
  { label: 'how do you ship?',         query: 'how do you ship?',         scroll: false },
  { label: 'what designer are you?',   query: 'what kind of designer are you?', scroll: false },
  { label: "what's your availability?",query: "what's your availability?",scroll: false },
  { label: 'wanna chat? ↗',            query: 'wanna chat?',              scroll: false },
  { label: 'resume ↗',                 query: 'resume',                   scroll: false },
  { label: 'linkedin ↗',               query: 'linkedin',                 scroll: false },
]

// ─── AI system prompt ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Deepak Maan's portfolio assistant. Answer questions about Deepak in first person as if you are him. Be concise, warm, and direct — no corporate speak, no filler phrases.

About Deepak:
- Product Designer based in Mumbai, open to Hyderabad, Bangalore, or Remote
- Graduate of IIT ISM Dhanbad
- Currently at JSW Steel as Product Designer and Design Analyst
- Designs end-to-end: research → Figma → ships in React/TypeScript
- No handoff — he builds what he designs using Claude Code

Case studies:
- Tech Japan (Talendy): UX Research internship. 10 user interviews across IITs, 9 pain points documented, multiple fixes shipped. 80% improved navigation, 70% feature adoption in testing.
- Buzztro: Full product design from 0 to 1 for a social polling startup. Research, IA, and high-fidelity design.

Shipped builds: Music Animation Generator, PulsePlay, TypMatch, Kairo Design System.

Tools: Figma, Photoshop, Whimsical, React, TypeScript, Tailwind, Framer Motion.

For availability: Open to work. Hyderabad, Bangalore, or Remote preferred.
For contact: deepak.maan@email.com or linkedin.com/in/deepakmaan
For resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing

If asked anything unrelated to work or design: "I'm only here to answer questions about Deepak's work and design process. Try asking about his projects or how he ships."

Keep answers under 3 sentences. Plain language only.`

// ─── Interests ────────────────────────────────────────────────────────────────
const INTERESTS = ['Product Design', 'UX Research', 'Design Systems', 'Vibe Coding', 'Cricket', 'Music']

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [messages, setMessages]       = useState<Message[]>([])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [time, setTime]               = useState(new Date())
  const chatEndRef                    = useRef<HTMLDivElement>(null)
  const inputRef                      = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const istTime = time.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  })

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
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

    const userMsg: Message = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    setChatStarted(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text ?? "Couldn't get a response. Try again."
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 20% 40%, rgba(196, 181, 253, 0.28) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 80% 30%, rgba(147, 197, 253, 0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 50% 80%, rgba(196, 181, 253, 0.15) 0%, transparent 60%),
            #F2F2F0
          `,
        }}
      >
        <div className="w-full max-w-2xl mx-auto">

          {/* Headline */}
          <motion.h1
            className="mb-8 text-[#141414]"
            style={{
              fontFamily: "'Overused Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Line 1: avatar + name + location */}
            <span className="flex items-center gap-3 flex-wrap">
              {/* Avatar */}
              <span
                className="inline-flex w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm bg-[#DDD8FB]"
                style={{ verticalAlign: 'middle' }}
              >
                <img
                  src="/photo.jpg"
                  alt="Deepak Maan"
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </span>
              <span>I'm Deepak Maan — based in Mumbai.</span>
            </span>

            {/* Line 2 */}
            <span className="block mt-1">
              I research, design, and ship product UX,{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 700 }}>end to end.</em>
            </span>
          </motion.h1>

          {/* Pills */}
          <motion.div
            className="flex flex-wrap gap-2 mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            {QUICK_ACTIONS.map(a => (
              <button
                key={a.label}
                onClick={() => a.scroll
                  ? document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                  : sendMessage(a.query)
                }
                className="px-4 py-2 rounded-full border border-[#DDDDD9] bg-white/75 backdrop-blur-sm text-sm font-medium text-[#141414] hover:bg-white hover:border-[#C8C8C4] hover:shadow-sm transition-all duration-150 cursor-pointer"
                style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
              >
                {a.label}
              </button>
            ))}
          </motion.div>

          {/* Chat messages */}
          <AnimatePresence>
            {chatStarted && (
              <motion.div
                className="mb-4 space-y-3 max-h-64 overflow-y-auto pr-1"
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
                    transition={{ duration: 0.22 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {msg.role === 'assistant' && (
                      <span className="w-6 h-6 rounded-full bg-[#DDD8FB] flex-shrink-0 mb-0.5 overflow-hidden">
                        <img src="/photo.jpg" alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </span>
                    )}
                    <div
                      className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#141414] text-white rounded-br-sm'
                          : 'bg-white border border-[#E2E2DF] text-[#141414] rounded-bl-sm shadow-sm'
                      }`}
                      style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#DDD8FB] flex-shrink-0 mb-0.5" />
                    <div className="bg-white border border-[#E2E2DF] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1 items-center">
                        {[0, 150, 300].map(d => (
                          <span key={d} className="w-1.5 h-1.5 bg-[#C8C8C4] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <div className="flex items-center bg-white/80 backdrop-blur-sm border border-[#E2E2DF] rounded-2xl px-4 py-3 focus-within:border-[#C8C8C4] focus-within:bg-white focus-within:shadow-md transition-all duration-200">
              <span className="text-[#B0B0AA] mr-2 text-sm font-mono select-none">&gt;_</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="ask Deepak anything..."
                className="flex-1 bg-transparent text-sm text-[#141414] placeholder:text-[#B0B0AA] outline-none"
                style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full bg-[#6B6B6B] flex items-center justify-center hover:bg-[#141414] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150 ml-2 flex-shrink-0"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="text-center text-xs text-[#B0B0AA] mt-2.5" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>
              Yes, this is a bot replying — but Deepak monitors every message.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── WIDGET SCATTER ───────────────────────────────────────────────── */}
      <section id="about" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto px-8 py-20">

          {/* Big headline */}
          <motion.p
            className="text-center mb-16"
            style={{
              fontFamily: "'Overused Grotesk', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#141414',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            I design{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 700 }}>and</em>
            {' '}ship.
          </motion.p>

          {/* Widget grid */}
          <div className="relative min-h-[680px]">

            {/* Profile — top left */}
            <Widget delay={0.05} className="absolute top-0 left-0 w-52">
              <div className="w-full h-36 bg-[#DDD8FB] rounded-xl overflow-hidden mb-3">
                <img src="/photo.jpg" alt="Deepak" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              <p className="text-sm font-semibold text-[#141414]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Deepak Maan</p>
              <p className="text-xs text-[#6B6B6B]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Mumbai · India</p>
            </Widget>

            {/* Clock — below profile */}
            <Widget delay={0.1} className="absolute top-52 left-0 w-52">
              <p className="text-[10px] text-[#9B9B9B] uppercase tracking-widest mb-1" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Mumbai, IN</p>
              <p className="text-3xl font-light text-[#141414] tracking-tight tabular-nums" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>
                {istTime.replace(' AM','').replace(' PM','')}
              </p>
              <p className="text-[10px] text-[#9B9B9B] mt-0.5" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>IST · UTC+5:30</p>
            </Widget>

            {/* Interests — bottom left */}
            <Widget delay={0.15} className="absolute top-[390px] left-0 w-52">
              <p className="text-[10px] text-[#9B9B9B] uppercase tracking-widest mb-3" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map(i => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-[#F2F2F0] border border-[#E2E2DF] text-xs text-[#6B6B6B]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>{i}</span>
                ))}
              </div>
            </Widget>

            {/* Availability — top center */}
            <Widget delay={0.2} className="absolute top-0 left-1/2 -translate-x-1/2 w-56 !bg-[#141414] !border-transparent">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[10px] text-[#6B6B6B] uppercase tracking-widest" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Available Now</span>
              </div>
              <p className="text-sm font-semibold text-white mb-3" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Product Designer</p>
              <div className="space-y-1">
                {['→  Hyderabad', '→  Bangalore', '→  Remote'].map(l => (
                  <p key={l} className="text-xs text-[#6B6B6B]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>{l}</p>
                ))}
              </div>
            </Widget>

            {/* Building with AI tag */}
            <Widget delay={0.22} className="absolute top-44 left-[42%] !p-2.5 !rounded-xl !bg-[#F5E642] !border-transparent w-auto">
              <p className="text-xs font-semibold text-[#141414] whitespace-nowrap" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Currently building with AI ✦</p>
            </Widget>

            {/* Resume — right */}
            <Widget
              delay={0.28}
              className="absolute top-36 right-0 w-44 !bg-[#F5E642] !border-transparent cursor-pointer hover:scale-[1.02]"
              onClick={() => window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing', '_blank')}
            >
              <p className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-widest mb-2" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>CV</p>
              <div className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l3 3v9H4V2z" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round"/><path d="M9 2v3h3" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                <div>
                  <p className="text-sm font-semibold text-[#141414]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Resume</p>
                  <p className="text-[10px] text-[#6B6B6B]" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>PDF · 1 page</p>
                </div>
              </div>
            </Widget>

            {/* LinkedIn — right bottom */}
            <Widget
              delay={0.33}
              className="absolute top-[320px] right-0 w-44 !bg-[#0A66C2] !border-transparent cursor-pointer hover:scale-[1.02]"
              onClick={() => window.open('https://linkedin.com/in/deepakmaan', '_blank')}
            >
              <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest mb-2" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>Find me online</p>
              <div className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/></svg>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>LinkedIn</p>
                  <p className="text-[10px] text-white/60" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>/in/deepakmaan</p>
                </div>
              </div>
            </Widget>

            {/* Rate widget — bottom center */}
            <RateWidget />

          </div>
        </div>
      </section>

      <div id="work" />
    </main>
  )
}

// ─── Reusable widget wrapper ──────────────────────────────────────────────────
const Widget = ({
  children,
  delay = 0,
  className = '',
  onClick,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  onClick?: () => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    onClick={onClick}
    className={`bg-white border border-[#E2E2DF] rounded-2xl p-4 shadow-[0_2px_12px_rgba(20,20,20,0.07)] transition-transform duration-200 ${className}`}
  >
    {children}
  </motion.div>
)

// ─── Rate widget ──────────────────────────────────────────────────────────────
const RateWidget = () => {
  const [rating, setRating]   = useState(0)
  const [hovered, setHovered] = useState(0)
  const [rated, setRated]     = useState(false)

  return (
    <Widget delay={0.38} className="absolute bottom-0 left-[38%] w-52 text-center">
      <p className="text-[10px] text-[#9B9B9B] uppercase tracking-widest mb-3" style={{ fontFamily: "'Overused Grotesk', sans-serif" }}>
        {rated ? 'Thanks! 🎉' : 'Rate this portfolio'}
      </p>
      <div className="flex justify-center gap-1.5">
        {[1,2,3,4,5].map(s => (
          <button
            key={s}
            onMouseEnter={() => !rated && setHovered(s)}
            onMouseLeave={() => !rated && setHovered(0)}
            onClick={() => { if (!rated) { setRating(s); setRated(true) } }}
            className="text-2xl transition-transform hover:scale-110 leading-none"
          >
            <span style={{ color: (hovered || rating) >= s ? '#F5C842' : '#E2E2DF' }}>★</span>
          </button>
        ))}
      </div>
    </Widget>
  )
}
