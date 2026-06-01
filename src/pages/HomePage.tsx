import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message { role: 'user' | 'assistant'; content: string }

const QUICK_ACTIONS = [
  { label: 'see my work',               icon: 'down', query: 'see my work',                    scroll: true  },
  { label: 'how do you ship?',          icon: null,   query: 'how do you ship?',               scroll: false },
  { label: 'what designer are you?',    icon: null,   query: 'what kind of designer are you?', scroll: false },
  { label: "what's your availability?", icon: null,   query: "what's your availability?",      scroll: false },
  { label: 'wanna chat?',               icon: 'out',  query: 'wanna chat?',                    scroll: false },
  { label: 'resume',                    icon: 'out',  query: 'resume',                         scroll: false },
  { label: 'linkedin',                  icon: 'out',  query: 'linkedin',                       scroll: false },
]

const SYSTEM_PROMPT = `You are Deepak Maan's portfolio assistant. Answer in first person as Deepak. Be concise and warm.

Deepak is a Product Designer based in Mumbai, open to Hyderabad, Bangalore, or Remote roles.
IIT ISM Dhanbad graduate. Currently at JSW Steel. Designs and ships end-to-end in React/TypeScript using Claude Code. No handoff.

Case studies: Tech Japan/Talendy (UX Research intern — 10 IIT interviews, 9 pain points, 80% nav improvement, multiple fixes shipped to production), Buzztro (0→1 product design for social polling startup).
Shipped builds: Music Animation Generator, PulsePlay, TypMatch, Kairo Design System.
Tools: Figma, React, TypeScript, Tailwind, Framer Motion.
Resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing
Contact: linkedin.com/in/deepakmaan25

Off-topic: "I'm only here to answer questions about Deepak's work and design process. Try asking about his projects or how he ships."`

const INTERESTS = ['Product Design', 'UX Research', 'Design Systems', 'Vibe Coding', 'Cricket', 'Music']

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
    <>
      {/* Blob keyframe animations + IBM Plex Serif import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');
        @keyframes first  { 0%,100%{transform:none}          50%{transform:rotate(180deg) scale(1.1)} }
        @keyframes second { 0%,100%{transform:none}          50%{transform:rotate(-150deg) scale(0.9)} }
        @keyframes third  { 0%,100%{transform:none}          50%{transform:rotate(120deg) scale(1.05)} }
        @keyframes fourth { 0%,100%{transform:none}          50%{transform:rotate(-80deg) scale(0.95)} }
        @keyframes fifth  { 0%,100%{transform:none}          50%{transform:rotate(100deg) scale(1.08)} }
        .ab1{animation:first  20s linear infinite;transform-origin:center center}
        .ab2{animation:second 18s linear infinite;transform-origin:calc(50% - 400px)}
        .ab3{animation:third  22s linear infinite;transform-origin:calc(50% + 400px)}
        .ab4{animation:fourth 16s linear infinite;transform-origin:calc(50% - 200px) calc(50% + 400px)}
        .ab5{animation:fifth  24s linear infinite;transform-origin:calc(50% - 800px) calc(50% + 200px)}
      `}</style>

      <div className="relative isolate min-h-screen overflow-x-clip transition-colors duration-500"
        style={{ backgroundColor: 'hsl(0 0% 98%)', color: 'hsl(0 0% 8%)' }}>

        {/* ── ANIMATED GRADIENT BLOBS ── */}
        <div className="absolute -z-10 top-0 left-0 right-0 h-screen overflow-hidden">
          <div className="absolute inset-0 h-full w-full"
            style={{ background: 'linear-gradient(40deg, hsl(240,60%,99%), hsl(230,80%,97%))' }}>
            <svg className="hidden">
              <defs>
                <filter id="goo2">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>
            <div className="h-full w-full blur-lg" style={{ filter: 'url(#goo2) blur(40px)' }}>
              {[
                { cls: 'ab1', color: '56,100,255',  blend: 'screen', opacity: 1   },
                { cls: 'ab2', color: '120,60,220',  blend: 'screen', opacity: 1   },
                { cls: 'ab3', color: '30,160,255',  blend: 'screen', opacity: 1   },
                { cls: 'ab4', color: '160,60,255',  blend: 'screen', opacity: 0.7 },
                { cls: 'ab5', color: '40,120,255',  blend: 'screen', opacity: 1   },
              ].map(b => (
                <div key={b.cls} className={`absolute ${b.cls}`}
                  style={{
                    background: `radial-gradient(circle at center, rgba(${b.color},0.35) 0, rgba(${b.color},0) 50%) no-repeat`,
                    mixBlendMode: b.blend as any,
                    width: '80%', height: '80%',
                    top: '10%', left: '10%',
                    opacity: b.opacity,
                  }} />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsl(0 0% 98% / 0.65)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, hsl(0 0% 98%))' }} />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-36 sm:pt-44" style={{ maxWidth: 1152 }}>

          {/* ── HEADLINE BLOCK ── */}
          <div className="max-w-4xl mx-auto w-full mb-10 sm:mb-12">
            <motion.div
              className="flex items-start gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Avatar */}
              <span className="relative shrink-0 mt-1">
                <span className="block rounded-full overflow-hidden bg-[#DDD8FB]"
                  style={{ width: 32, height: 32, boxShadow: '0 0 0 2px white, 0 1px 4px rgba(0,0,0,0.12)' }}>
                  <img src="/photo.jpg" alt="Deepak Maan"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </span>
                <span className="absolute rounded-full bg-green-400"
                  style={{ width: 9, height: 9, bottom: 1, right: 0, boxShadow: '0 0 0 2px white' }} />
              </span>

              {/* Text */}
              <div style={{
                fontFamily: "'Overused Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(2rem, 3.6vw, 3.5rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'hsl(0 0% 8%)',
              }}>
                {/* Line 1 with name highlight */}
                <div>
                  <span>I'm </span>
                  {/* Name highlight — exact Leah Kim style: blue border L+R, dots at corners */}
                  <span className="relative inline-block px-2" style={{ marginRight: 2 }}>
                    <span className="absolute inset-0 border-l-2 border-r-2"
                      style={{ backgroundColor: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.45)' }} />
                    <span className="absolute w-[5px] h-[5px] rounded-full"
                      style={{ top: 0, left: 0, transform: 'translate(-50%,-50%)', background: 'rgb(99,102,241)' }} />
                    <span className="absolute w-[5px] h-[5px] rounded-full"
                      style={{ bottom: 0, right: 0, transform: 'translate(50%,50%)', background: 'rgb(99,102,241)' }} />
                    <span className="relative">Deepak Maan</span>
                  </span>
                  <span> — based in Mumbai.</span>
                </div>
                {/* Line 2 */}
                <div>
                  <span>I research, design, and ship product UX, </span>
                  <span className="inline-block font-serif italic"
                    style={{ fontFamily: "'IBM Plex Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 300, whiteSpace: 'nowrap' }}>
                    end to end.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── CHAT + PILLS ── */}
          <div className="max-w-4xl mx-auto w-full">

            {/* Messages */}
            <AnimatePresence>
              {chatStarted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
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
                      <div className="max-w-sm px-4 py-2.5 text-sm leading-relaxed"
                        style={{
                          fontFamily: "'Overused Grotesk', sans-serif",
                          borderRadius: 18,
                          ...(msg.role === 'user'
                            ? { background: 'hsl(0 0% 8%)', color: 'white', borderBottomRightRadius: 4 }
                            : { background: 'white', color: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 88%)', borderBottomLeftRadius: 4, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' })
                        }}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="flex items-end gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#DDD8FB] shrink-0" />
                      <div style={{ background: 'white', border: '1px solid hsl(0 0% 88%)', borderRadius: 18, borderBottomLeftRadius: 4, padding: '12px 16px' }}>
                        <div className="flex gap-1">
                          {[0,150,300].map(d => <span key={d} className="animate-bounce w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" style={{ animationDelay: `${d}ms` }} />)}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pills — right-aligned, 2 rows */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="mb-4 space-y-2"
            >
              <div className="flex flex-wrap gap-2 justify-end">
                {QUICK_ACTIONS.slice(0, 4).map(a => <Pill key={a.label} a={a} send={sendMessage} />)}
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                {QUICK_ACTIONS.slice(4).map(a => <Pill key={a.label} a={a} send={sendMessage} />)}
              </div>
            </motion.div>

            {/* Input */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
              <div className="flex items-center gap-2 rounded-2xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid hsl(0 0% 88%)', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
                <span className="text-xs select-none" style={{ fontFamily: 'monospace', color: 'hsl(0 0% 55%)' }}>›_</span>
                <input ref={inputRef} type="text" value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder="ask Deepak anything…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:opacity-50"
                  style={{ fontFamily: "'Overused Grotesk', sans-serif", color: 'hsl(0 0% 8%)' }}
                />
                <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'hsl(0 0% 8%)', opacity: input.trim() ? 1 : 0.3 }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-center text-xs" style={{ fontFamily: "'Overused Grotesk', sans-serif", color: 'hsl(0 0% 55%)' }}>
                Built with love and{' '}
                <a href="https://www.anthropic.com/claude-code" target="_blank" rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline">Claude Code</a>
                {' '}· 2026
              </p>
            </motion.div>
          </div>

          {/* ── CASE STUDIES ── */}
          <div id="work" className="scroll-mt-16 pt-20 sm:pt-28 lg:pt-36">
            <section className="w-full space-y-24 sm:space-y-32 lg:space-y-40">
              <CaseRow
                title="Tech Japan (Talendy) — UX Research & Redesign"
                desc="Ran 10 user interviews across 6 IITs, documented 9 pain points, and shipped fixes to production — job description layout, dark mode accessibility, multiple resume management, and a built-in communication tool."
                metric="80%"
                metricLabel="improved navigation"
                slug="tech-japan"
                image="/src/assets/case-study-1.jpg"
                bg="hsl(222 100% 96%)"
              />
              <CaseRow
                title="Buzztro — Social Polling App Design"
                desc="Designed the complete product experience for a social polling startup from 0 to 1. Research, information architecture, and high-fidelity design across the platform."
                metric="0→1"
                metricLabel="product shipped"
                slug="buzztro"
                image="/src/assets/case-study-2.jpg"
                bg="hsl(30 100% 95%)"
              />
            </section>
          </div>
        </div>

        {/* ── WIDGET SCATTER ── */}
        <WidgetScatter istTime={istTime} />
      </div>
    </>
  )
}

/* Pill */
const Pill = ({ a, send }: { a: typeof QUICK_ACTIONS[0]; send: (q: string) => void }) => (
  <button
    onClick={() => send(a.query)}
    className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium bg-white border transition-all duration-200"
    style={{ fontFamily: "'Overused Grotesk', sans-serif", borderColor: 'rgba(0,0,0,0.2)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', color: 'hsl(0 0% 8%)' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'hsl(0 0% 8%)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }}
  >
    <span>{a.label}</span>
    {a.icon === 'down' && (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity">
        <path d="M8 3v10M4 9l4 4 4-4" />
      </svg>
    )}
    {a.icon === 'out' && (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity">
        <path d="M6 4h6v6M12 4 5 11" />
      </svg>
    )}
  </button>
)

/* Case study row */
const CaseRow = ({ title, desc, metric, metricLabel, slug, image, bg }: {
  title: string; desc: string; metric: string; metricLabel: string; slug: string; image: string; bg: string
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 items-start"
  >
    {/* Text — left */}
    <div className="lg:pt-8 order-2 lg:order-1">
      <h3 style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 'clamp(1.35rem,2.2vw,1.75rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'hsl(0 0% 8%)', margin: 0 }}>
        {title}
      </h3>
      <p className="mt-5 leading-relaxed max-w-sm" style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 15, color: 'hsl(0 0% 42%)' }}>
        {desc}
      </p>
      {/* Metric */}
      <div className="mt-7 flex items-baseline gap-2.5">
        <span style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'hsl(0 0% 8%)' }}>
          {metric}
        </span>
        <span style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(0 0% 55%)' }}>
          {metricLabel}
        </span>
      </div>
      {/* CTA */}
      <a href={`/case-study/${slug}`}
        className="group/cta mt-8 inline-flex items-center gap-2 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow"
        style={{ fontFamily: "'Overused Grotesk', sans-serif", fontSize: 14, background: 'hsl(0 0% 8%)', color: 'white', padding: '10px 20px', textDecoration: 'none' }}
      >
        <span>Open case study</span>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300">
            <path d="M5 11L11 5M6 5h5v5" />
          </svg>
        </span>
      </a>
    </div>

    {/* Image — right */}
    <a href={`/case-study/${slug}`}
      className="group relative block overflow-hidden order-1 lg:order-2 rounded-2xl sm:rounded-3xl transition-shadow duration-500"
      style={{ background: bg, boxShadow: '0 8px 30px -12px rgba(0,0,0,0.18)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px -12px rgba(0,0,0,0.28)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px -12px rgba(0,0,0,0.18)' }}
    >
      <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img src={image} alt={title} loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25,1,0.5,1)' }}
          onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
      </div>
    </a>
  </motion.article>
)

/* Widget scatter */
const WidgetScatter = ({ istTime }: { istTime: string }) => {
  const f = "'Overused Grotesk', sans-serif"
  const serif = "'IBM Plex Serif', Georgia, serif"
  const [rating, setRating] = useState(0)
  const [hover, setHover]   = useState(0)
  const [rated, setRated]   = useState(false)

  const fly = (delay: number, rotate = -20) => ({
    initial: { opacity: 0, scale: 0.2, rotate },
    whileInView: { opacity: 1, scale: 1, rotate: 0 },
    viewport: { once: true },
    transition: { type: 'spring' as const, stiffness: 180, damping: 18, delay },
  })

  const card = {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 14,
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  }

  return (
    <section id="about" className="relative overflow-hidden"
      style={{ backgroundColor: 'hsl(0 0% 94%)', minHeight: '100vh' }}>
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.07) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* Big headline centered */}
      <motion.h2 {...fly(0.1, -5)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none"
        style={{ fontFamily: f, fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'hsl(0 0% 8%)', whiteSpace: 'nowrap', zIndex: 0 }}>
        I design{' '}
        <em style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 300 }}>and</em>
        {' '}ship. Fast.
      </motion.h2>

      {/* Profile card */}
      <motion.div {...fly(0.12, -27)} style={{ ...card, position: 'absolute', top: '5%', left: '4%', padding: '12px 12px 32px', zIndex: 1 }}>
        <div style={{ width: 148, height: 148, borderRadius: 10, overflow: 'hidden', background: '#DDD8FB' }}>
          <img src="/photo.jpg" alt="Deepak" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
        <p className="mt-3 text-center" style={{ fontFamily: f, fontSize: 11, color: 'hsl(0 0% 50%)', letterSpacing: '0.04em' }}>Deepak Maan · Mumbai</p>
      </motion.div>

      {/* Availability */}
      <motion.div {...fly(0.18, -18)} style={{ position: 'absolute', top: '5%', right: '5%', zIndex: 1 }}>
        <div style={{ background: 'rgba(78,204,163,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 14, padding: '20px', width: 196, color: '#0a2e22', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0a2e22', opacity: 0.7 }} />
            <span style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6 }}>Available now</span>
          </div>
          <div style={{ height: 1, background: 'rgba(10,46,34,0.15)', marginBottom: 12 }} />
          <p style={{ fontFamily: f, fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Product Designer</p>
          {['→ Hyderabad', '→ Bangalore', '→ Remote'].map(l => (
            <p key={l} style={{ fontFamily: f, fontSize: 11, marginBottom: 4, opacity: 0.75 }}>{l}</p>
          ))}
        </div>
      </motion.div>

      {/* Clock */}
      <motion.div {...fly(0.22, -25)} style={{ ...card, position: 'absolute', top: '44%', left: '4%', padding: '16px 20px', zIndex: 1, width: 'fit-content', whiteSpace: 'nowrap' }}>
        <p style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(0 0% 55%)', marginBottom: 4 }}>Mumbai, IN</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <span style={{ fontFamily: f, fontSize: 36, fontWeight: 300, letterSpacing: '-0.02em', color: 'hsl(0 0% 8%)', lineHeight: 1 }}>
            {istTime.split(' ')[0]}
          </span>
          <span style={{ fontFamily: f, fontSize: 9, color: 'hsl(0 0% 55%)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {istTime.split(' ')[1]}
          </span>
        </div>
        <p style={{ fontFamily: f, fontSize: 9, color: 'hsl(0 0% 55%)', marginTop: 4 }}>IST · UTC+5:30</p>
      </motion.div>

      {/* Interests */}
      <motion.div {...fly(0.26, -19)} style={{ ...card, position: 'absolute', bottom: '8%', left: '4%', padding: '16px 20px', zIndex: 1 }}>
        <p style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(0 0% 55%)', marginBottom: 10 }}>Interests</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 240 }}>
          {INTERESTS.map(i => (
            <span key={i} style={{ padding: '4px 10px', borderRadius: 9999, border: '1px solid hsl(0 0% 88%)', fontSize: 11, color: 'hsl(0 0% 35%)', fontFamily: f }}>{i}</span>
          ))}
        </div>
      </motion.div>

      {/* Resume */}
      <motion.div {...fly(0.28, -19)} style={{ position: 'absolute', top: '44%', right: '4%', zIndex: 1, cursor: 'pointer' }}
        onClick={() => window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing', '_blank')}
        whileHover={{ opacity: 0.9 }}
      >
        <div style={{ background: 'rgba(255,228,92,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(58,46,0,0.15)', borderRadius: 14, padding: '16px 20px', width: 178, color: '#3a2e00', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <p style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6, marginBottom: 8 }}>CV</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
            <div>
              <p style={{ fontFamily: f, fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>Resume</p>
              <p style={{ fontFamily: f, fontSize: 10, opacity: 0.6 }}>PDF · 1 page</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* LinkedIn */}
      <motion.div {...fly(0.32, -26)} style={{ position: 'absolute', bottom: '8%', right: '4%', zIndex: 1, cursor: 'pointer' }}
        onClick={() => window.open('https://linkedin.com/in/deepakmaan25', '_blank')}
        whileHover={{ opacity: 0.9 }}
      >
        <div style={{ background: 'rgba(10,102,194,0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 14, padding: '16px 20px', width: 188, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <p style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Find me online</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z" /></svg>
            <div>
              <p style={{ fontFamily: f, fontSize: 14, fontWeight: 600, color: 'white', lineHeight: 1.2 }}>LinkedIn</p>
              <p style={{ fontFamily: f, fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>/in/deepakmaan25</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rate widget */}
      <motion.div {...fly(0.36, -22)} style={{ ...card, position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', padding: '16px 20px', zIndex: 1, textAlign: 'center' }}>
        <p style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(0 0% 55%)', marginBottom: 10 }}>
          {rated ? 'Thanks! 🎉' : 'Rate this portfolio'}
        </p>
        <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {[1,2,3,4,5].map(s => (
            <button key={s} onMouseEnter={() => !rated && setHover(s)} onMouseLeave={() => !rated && setHover(0)}
              onClick={() => { if (!rated) { setRating(s); setRated(true) } }}
              style={{ fontSize: 24, background: 'none', border: 'none', cursor: rated ? 'default' : 'pointer', padding: '0 2px', lineHeight: 1, color: (hover || rating) >= s ? '#FABE15' : 'hsl(0 0% 85%)', transition: 'transform 0.1s' }}>★</button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
