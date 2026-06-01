import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message { role: 'user' | 'assistant'; content: string }

const QUICK_ACTIONS = [
  { label: 'see my work',              icon: 'down', query: 'see my work',                    scroll: true  },
  { label: 'how do you ship?',         icon: null,   query: 'how do you ship?',               scroll: false },
  { label: 'what designer are you?',   icon: null,   query: 'what kind of designer are you?', scroll: false },
  { label: "what's your availability?",icon: null,   query: "what's your availability?",      scroll: false },
  { label: 'wanna chat?',              icon: 'out',  query: 'wanna chat?',                    scroll: false },
  { label: 'resume',                   icon: 'out',  query: 'resume',                         scroll: false },
  { label: 'linkedin',                 icon: 'out',  query: 'linkedin',                       scroll: false },
]

const SYSTEM_PROMPT = `You are Deepak Maan's portfolio assistant. Answer in first person as Deepak. Be concise and warm.

Deepak is a Product Designer based in Mumbai, open to Hyderabad, Bangalore, or Remote roles.
IIT ISM Dhanbad graduate. Currently at JSW Steel. Designs and ships end-to-end in React/TypeScript using Claude Code. No handoff.

Case studies: Tech Japan/Talendy (UX Research intern — 10 IIT interviews, 9 pain points, 80% nav improvement, multiple fixes shipped), Buzztro (0→1 product design for social polling startup).
Shipped builds: Music Animation Generator, PulsePlay, TypMatch, Kairo Design System.
Tools: Figma, React, TypeScript, Tailwind, Framer Motion.
Resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing
Contact: linkedin.com/in/deepakmaan25

Off-topic questions: "I'm only here to answer questions about Deepak's work and design process. Try asking about his projects or how he ships."`

const INTERESTS = ['Product Design', 'UX Research', 'Design Systems', 'Vibe Coding', 'Cricket', 'Music']

// Spring animation for widgets
const springIn = (delay: number) => ({
  initial: { opacity: 0, scale: 0.2, rotate: -22 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { type: 'spring', stiffness: 200, damping: 20, delay },
})

export default function HomePage() {
  const [messages, setMessages]       = useState<Message[]>([])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [time, setTime]               = useState(new Date())
  const chatEndRef                    = useRef<HTMLDivElement>(null)
  const inputRef                      = useRef<HTMLInputElement>(null)

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const istTime = time.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  const [timeVal, ampm] = istTime.split(' ')

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    if (text === 'see my work') { document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); return }
    if (text === 'resume')      { window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing', '_blank'); return }
    if (text === 'linkedin')    { window.open('https://linkedin.com/in/deepakmaan25', '_blank'); return }
    if (text === 'wanna chat?') { window.open('mailto:deepak.maan@email.com', '_blank'); return }

    const updated = [...messages, { role: 'user' as const, content: text }]
    setMessages(updated); setInput(''); setLoading(true); setChatStarted(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: SYSTEM_PROMPT, messages: updated }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content?.[0]?.text ?? 'Try again.' }])
    } catch { setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong.' }]) }
    finally { setLoading(false) }
  }

  return (
    <div className="relative isolate min-h-screen overflow-x-clip" style={{ backgroundColor: '#F8F8FC' }}>

      {/* ── ANIMATED GRADIENT BACKGROUND (exact Leah Kim blobs) ── */}
      <div className="absolute -z-10 top-0 left-0 right-0 h-screen overflow-hidden">
        <div className="h-full w-full absolute inset-0" style={{ background: 'linear-gradient(40deg, #F8F8FC, #F4F6FF)' }}>
          <svg className="hidden">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="h-full w-full blur-lg" style={{ filter: 'url(#goo) blur(40px)' }}>
            <div className="absolute animate-blob1 opacity-100" style={{ background: 'radial-gradient(circle at center, rgba(56,100,255,0.35) 0, rgba(56,100,255,0) 50%) no-repeat', mixBlendMode: 'screen', width: '80%', height: '80%', top: '10%', left: '10%' }} />
            <div className="absolute animate-blob2 opacity-100" style={{ background: 'radial-gradient(circle at center, rgba(120,60,220,0.8) 0, rgba(120,60,220,0) 50%) no-repeat', mixBlendMode: 'screen', width: '80%', height: '80%', top: '10%', left: '10%', transformOrigin: 'calc(50% - 400px)' }} />
            <div className="absolute animate-blob3 opacity-100" style={{ background: 'radial-gradient(circle at center, rgba(30,160,255,0.8) 0, rgba(30,160,255,0) 50%) no-repeat', mixBlendMode: 'screen', width: '80%', height: '80%', top: '10%', left: '10%', transformOrigin: 'calc(50% + 400px)' }} />
            <div className="absolute animate-blob4 opacity-70" style={{ background: 'radial-gradient(circle at center, rgba(160,60,255,0.8) 0, rgba(160,60,255,0) 50%) no-repeat', mixBlendMode: 'screen', width: '80%', height: '80%', top: '10%', left: '10%', transformOrigin: 'calc(50% - 200px) calc(50% + 400px)' }} />
            <div className="absolute animate-blob5 opacity-100" style={{ background: 'radial-gradient(circle at center, rgba(40,120,255,0.8) 0, rgba(40,120,255,0) 50%) no-repeat', mixBlendMode: 'screen', width: '80%', height: '80%', top: '10%', left: '10%', transformOrigin: 'calc(50% - 800px) calc(50% + 200px)' }} />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(248,248,252,0.7)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, #F8F8FC)' }} />
      </div>

      {/* ── HERO ── */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-36 sm:pt-44" style={{ maxWidth: '1152px' }}>

        {/* Headline block */}
        <div className="max-w-4xl mx-auto w-full mb-10 sm:mb-12">
          <motion.div
            className="flex items-start gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Avatar with green dot */}
            <span className="relative shrink-0">
              <span className="block rounded-full overflow-hidden ring-2 ring-white shadow-md bg-[#DDD8FB]"
                style={{ width: 32, height: 32 }}>
                <img src="/photo.jpg" alt="Deepak Maan" draggable={false}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </span>
              <span className="absolute rounded-full bg-green-400 ring-2 ring-white"
                style={{ width: 10, height: 10, bottom: 1, right: 1 }} />
            </span>

            {/* Headline text */}
            <div style={{
              fontFamily: "'Overused Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0a0a0a',
            }}>
              <span>I'm Deepak Maan — based in Mumbai.</span>
              <br />
              <span>I research, design, and ship product UX, </span>
              {/* IBM Plex Serif italic — exact match to Leah's "end to end" */}
              <span style={{
                fontFamily: "'IBM Plex Serif', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}>
                end to end.
              </span>
            </div>
          </motion.div>
        </div>

        {/* Chat + pills area */}
        <div className="max-w-4xl mx-auto w-full">

          {/* Chat messages */}
          <AnimatePresence>
            {chatStarted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-3 max-h-64 overflow-y-auto"
              >
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <span className="w-6 h-6 rounded-full bg-[#DDD8FB] shrink-0 overflow-hidden">
                        <img src="/photo.jpg" alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </span>
                    )}
                    <div style={{
                      maxWidth: 400, padding: '10px 16px', borderRadius: 18, fontSize: 14, lineHeight: 1.55,
                      fontFamily: "'Overused Grotesk', sans-serif",
                      ...(msg.role === 'user'
                        ? { background: '#141414', color: 'white', borderBottomRightRadius: 4 }
                        : { background: 'white', color: '#141414', border: '1px solid #E2E2DF', borderBottomLeftRadius: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' })
                    }}>{msg.content}</div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-end gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#DDD8FB] shrink-0" />
                    <div style={{ background: 'white', border: '1px solid #E2E2DF', borderRadius: 18, borderBottomLeftRadius: 4, padding: '12px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div className="flex gap-1 items-center">
                        {[0,150,300].map(d => <span key={d} className="animate-bounce w-1.5 h-1.5 rounded-full bg-[#C8C8C4] inline-block" style={{ animationDelay: `${d}ms` }} />)}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pills — right aligned row 1 + row 2, exactly like Leah */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mb-4 space-y-2"
          >
            <div className="flex flex-wrap gap-2 justify-end">
              {QUICK_ACTIONS.slice(0, 4).map(a => (
                <Pill key={a.label} action={a} onSend={sendMessage} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              {QUICK_ACTIONS.slice(4).map(a => (
                <Pill key={a.label} action={a} onSend={sendMessage} />
              ))}
            </div>
          </motion.div>

          {/* Input bar */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <span style={{ color: '#999', marginRight: 8, fontSize: 13, fontFamily: 'monospace', userSelect: 'none' }}>›_</span>
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="ask Deepak anything…"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: '#141414', fontFamily: "'Overused Grotesk', sans-serif" }}
              />
              <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
                style={{ width: 32, height: 32, borderRadius: '50%', background: '#141414', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 8, opacity: input.trim() ? 1 : 0.3, transition: 'opacity 0.15s' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 10, fontFamily: "'Overused Grotesk', sans-serif" }}>
              Built with love and Claude Code · 2026
            </p>
          </motion.div>
        </div>

        {/* ── CASE STUDIES ── */}
        <div id="work" className="scroll-mt-16 pt-20 sm:pt-28 lg:pt-36">
          <motion.div
            className="w-full space-y-24 sm:space-y-32"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            <CaseStudyRow
              title="Tech Japan (Talendy) — UX Research & Redesign"
              description="Ran 10 user interviews across 6 IITs, documented 9 pain points, and shipped fixes to production — including job description layout, dark mode accessibility, multiple resume management, and a built-in communication tool."
              metric="80%"
              metricLabel="improved navigation"
              slug="tech-japan"
              image="/src/assets/case-study-1.jpg"
              bg="#E8F0FE"
              delay={0}
            />
            <CaseStudyRow
              title="Buzztro — Social Polling App Design"
              description="Designed the complete product experience for a social polling startup from 0 to 1. Led research, information architecture, and high-fidelity design across the entire platform."
              metric="0→1"
              metricLabel="product shipped"
              slug="buzztro"
              image="/src/assets/case-study-2.jpg"
              bg="#FEF3E2"
              delay={0.1}
            />
          </motion.div>
        </div>

      </div>

      {/* ── WIDGET SCATTER ── */}
      <WidgetScatter time={{ timeVal, ampm }} />

      {/* Blob keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');
        @keyframes blob1 { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.1)} }
        @keyframes blob2 { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(-150deg) scale(0.9)} }
        @keyframes blob3 { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(120deg) scale(1.05)} }
        @keyframes blob4 { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(-80deg) scale(0.95)} }
        @keyframes blob5 { 0%,100%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(100deg) scale(1.08)} }
        .animate-blob1{animation:blob1 20s linear infinite}
        .animate-blob2{animation:blob2 18s linear infinite}
        .animate-blob3{animation:blob3 22s linear infinite}
        .animate-blob4{animation:blob4 16s linear infinite}
        .animate-blob5{animation:blob5 24s linear infinite}
      `}</style>
    </div>
  )
}

/* ── Pill button ── */
const Pill = ({ action, onSend }: { action: typeof QUICK_ACTIONS[0]; onSend: (q: string) => void }) => (
  <button
    onClick={() => onSend(action.query)}
    className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-[#141414] bg-white border border-black/20 hover:border-black shadow-sm hover:shadow-md transition-all duration-200"
    style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
  >
    <span>{action.label}</span>
    {action.icon === 'down' && (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-black/40 group-hover:text-black/70 transition-colors">
        <path d="M8 3v10M4 9l4 4 4-4" />
      </svg>
    )}
    {action.icon === 'out' && (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-black/40 group-hover:text-black/70 transition-colors">
        <path d="M6 4h6v6M12 4 5 11" />
      </svg>
    )}
  </button>
)

/* ── Case study row — exact Leah Kim grid ── */
const CaseStudyRow = ({ title, description, metric, metricLabel, slug, image, bg, delay }: {
  title: string; description: string; metric: string; metricLabel: string
  slug: string; image: string; bg: string; delay: number
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 items-start"
  >
    {/* Left: text */}
    <div className="lg:pt-8 order-2 lg:order-1">
      <h3 style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#141414', margin: 0 }}>
        {title}
      </h3>
      <p style={{ marginTop: 20, fontFamily: "'Overused Grotesk', sans-serif", fontSize: 15, color: '#6B6B6B', lineHeight: 1.7, maxWidth: 400 }}>
        {description}
      </p>
      <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#141414', lineHeight: 1 }}>
          {metric}
        </span>
        <span style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B9B9B' }}>
          {metricLabel}
        </span>
      </div>
      <a href={`/case-study/${slug}`}
        className="group/cta mt-8 inline-flex items-center gap-2 rounded-full bg-[#141414] text-white px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
        style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
      >
        <span>Open case study</span>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5">
            <path d="M5 11L11 5M6 5h5v5" />
          </svg>
        </span>
      </a>
    </div>

    {/* Right: image card */}
    <a href={`/case-study/${slug}`}
      className="group relative block overflow-hidden order-1 lg:order-2 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.30)] transition-shadow duration-500"
      style={{ backgroundColor: bg }}
    >
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img src={image} alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
      </div>
    </a>
  </motion.article>
)

/* ── Widget scatter section — exact Leah Kim card positions & spring fly-in ── */
const WidgetScatter = ({ time }: { time: { timeVal: string; ampm: string } }) => {
  const f = "'Overused Grotesk', sans-serif"
  const [rating, setRating]   = useState(0)
  const [hovered, setHovered] = useState(0)
  const [rated, setRated]     = useState(false)

  return (
    <section id="about" className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#EEEEF0' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* Big headline */}
      <motion.h2
        {...springIn(0.1)}
        className="absolute font-display text-[#141414]"
        style={{ fontFamily: f, fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap', zIndex: 0 }}
      >
        I design <em style={{ fontFamily: "'IBM Plex Serif',serif", fontStyle: 'italic', fontWeight: 300 }}>and</em> ship. Fast.
      </motion.h2>

      {/* Profile card — top left */}
      <motion.div {...springIn(0.15)} style={{ position: 'absolute', top: '5%', left: '3%' }}
        className="bg-white/85 backdrop-blur-md border border-black/10 rounded-xl p-3 pb-8 shadow-xl cursor-none select-none"
      >
        <div className="overflow-hidden rounded-lg" style={{ width: 150, height: 150 }}>
          <img src="/photo.jpg" alt="Deepak Maan" className="w-full h-full object-cover object-center" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
        <p className="mt-3 text-center text-xs text-[#6B6B6B] tracking-widest" style={{ fontFamily: f }}>Deepak Maan · Mumbai</p>
      </motion.div>

      {/* Availability — top right */}
      <motion.div {...springIn(0.2)} style={{ position: 'absolute', top: '5%', right: '5%' }}
        className="rounded-xl px-5 py-5 shadow-lg cursor-none select-none"
        style2={{ background: 'rgba(78,204,163,0.85)', backdropFilter: 'blur(8px)' }}
      >
        <div style={{ background: 'rgba(78,204,163,0.9)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '20px', border: '1px solid rgba(255,255,255,0.4)', color: '#0a2e22', width: 192 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0a2e22', flexShrink: 0, opacity: 0.7 }} />
            <span style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>Available now</span>
          </div>
          <div style={{ height: 1, background: 'rgba(10,46,34,0.2)', marginBottom: 12 }} />
          <p style={{ fontFamily: f, fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Product Designer</p>
          {['→ Hyderabad', '→ Bangalore', '→ Remote'].map(l => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: f, fontSize: 11 }}>{l}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Clock — mid left */}
      <motion.div {...springIn(0.25)} style={{ position: 'absolute', top: '42%', left: '3%' }}
        className="bg-white/85 backdrop-blur-md border border-black/10 rounded-xl px-5 py-4 shadow-md cursor-none select-none w-fit whitespace-nowrap"
      >
        <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9B9B9B', marginBottom: 4 }}>Mumbai, IN</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <span style={{ fontFamily: f, fontSize: 36, fontWeight: 300, letterSpacing: '-0.02em', color: '#141414', lineHeight: 1 }}>{time.timeVal}</span>
          <span style={{ fontFamily: f, fontSize: 10, color: 'rgba(0,0,0,0.4)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{time.ampm}</span>
        </div>
        <p style={{ fontFamily: f, fontSize: 10, color: '#9B9B9B', marginTop: 6 }}>IST · UTC+5:30</p>
      </motion.div>

      {/* Interests — bottom left */}
      <motion.div {...springIn(0.3)} style={{ position: 'absolute', bottom: '7%', left: '3%' }}
        className="bg-white/85 backdrop-blur-md border border-black/10 rounded-xl px-5 py-4 shadow-md cursor-none select-none"
      >
        <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9B9B9B', marginBottom: 12 }}>Interests</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 250 }}>
          {INTERESTS.map(i => <span key={i} style={{ padding: '4px 10px', borderRadius: 9999, border: '1px solid #E2E2DF', fontSize: 11, color: '#6B6B6B', fontFamily: f }}>{i}</span>)}
        </div>
      </motion.div>

      {/* Resume card — right */}
      <motion.div {...springIn(0.32)} style={{ position: 'absolute', top: '44%', right: '4%' }}
        onClick={() => window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing', '_blank')}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div style={{ background: 'rgba(255,228,92,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(58,46,0,0.15)', color: '#3a2e00', borderRadius: 12, padding: '16px 20px', width: 180 }}>
          <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6, marginBottom: 8 }}>CV</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
            <div>
              <p style={{ fontFamily: f, fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>Resume</p>
              <p style={{ fontFamily: f, fontSize: 10, opacity: 0.6 }}>PDF · 1 page</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* LinkedIn — bottom right */}
      <motion.div {...springIn(0.35)} style={{ position: 'absolute', bottom: '8%', right: '4%' }}
        onClick={() => window.open('https://linkedin.com/in/deepakmaan25', '_blank')}
        className="cursor-pointer hover:opacity-90 transition-opacity"
      >
        <div style={{ background: 'rgba(10,102,194,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12, padding: '16px 20px', width: 190 }}>
          <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Find me online</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/></svg>
            <div>
              <p style={{ fontFamily: f, fontSize: 14, fontWeight: 600, color: 'white', lineHeight: 1.2 }}>LinkedIn</p>
              <p style={{ fontFamily: f, fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>/in/deepakmaan25</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rate widget — bottom center */}
      <motion.div {...springIn(0.38)} style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}
        className="bg-white/85 backdrop-blur-md border border-black/10 rounded-xl px-5 py-4 shadow-md cursor-none select-none"
      >
        <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9B9B9B', marginBottom: 12 }}>
          {rated ? 'Thanks! 🎉' : 'Rate this portfolio'}
        </p>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2,3,4,5].map(s => (
            <button key={s} onMouseEnter={() => !rated && setHovered(s)} onMouseLeave={() => !rated && setHovered(0)}
              onClick={() => { if (!rated) { setRating(s); setRated(true) } }}
              style={{ fontSize: 26, background: 'none', border: 'none', cursor: rated ? 'default' : 'pointer', padding: 0, lineHeight: 1, color: (hovered || rating) >= s ? '#FABE15' : '#E2E2DF', transition: 'transform 0.1s' }}>★</button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
