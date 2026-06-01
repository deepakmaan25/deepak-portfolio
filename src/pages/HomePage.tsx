import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message { role: 'user' | 'assistant'; content: string }

const QUICK_ACTIONS = [
  { label: 'see my work ↓',             query: 'see my work',                    scroll: true  },
  { label: 'how do you ship?',          query: 'how do you ship?',               scroll: false },
  { label: 'what designer are you?',    query: 'what kind of designer are you?', scroll: false },
  { label: "what's your availability?", query: "what's your availability?",      scroll: false },
  { label: 'wanna chat? ↗',             query: 'wanna chat?',                    scroll: false },
  { label: 'resume ↗',                  query: 'resume',                         scroll: false },
  { label: 'linkedin ↗',                query: 'linkedin',                       scroll: false },
]

const SYSTEM_PROMPT = `You are Deepak Maan's portfolio assistant. Answer in first person as Deepak. Be concise and direct.

Deepak is a Product Designer based in Mumbai, open to Hyderabad, Bangalore, or Remote roles.
IIT ISM Dhanbad graduate. Currently at JSW Steel. Designs and ships end-to-end in React/TypeScript.

Case studies: Tech Japan (UX research, 10 interviews, 9 pain points, 80% nav improvement), Buzztro (0→1 product design).
Shipped: Music Animation Generator, PulsePlay, TypMatch, Kairo Design System.
Tools: Figma, React, TypeScript, Tailwind, Framer Motion.
Resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing
Contact: linkedin.com/in/deepakmaan

Off-topic: "I'm only here to answer questions about Deepak's work. Try asking about his projects or process."`

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
    if (text === 'linkedin')    { window.open('https://linkedin.com/in/deepakmaan', '_blank'); return }
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

  const f = "'Overused Grotesk', sans-serif"

  return (
    <main style={{ backgroundColor: '#F2F2F0', minHeight: '100vh' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(196,181,253,0.28) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(147,197,253,0.18) 0%, transparent 55%), #F2F2F0',
      }}>
        <div style={{ width: '100%', maxWidth: '1100px' }}>

          {/* ── Headline — 2 lines, no wrapping ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{ marginBottom: '48px' }}
          >
            {/* Line 1 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: f,
              fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.018em',
              color: '#141414',
              whiteSpace: 'nowrap',
            }}>
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid white',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                backgroundColor: '#DDD8FB',
              }}>
                <img src="/photo.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                {/* Green availability dot */}
                <span style={{
                  position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px',
                  borderRadius: '50%', background: '#22C55E', border: '2px solid white',
                }} />
              </span>
              <span>I'm Deepak Maan — based in Mumbai.</span>
            </div>

            {/* Line 2 */}
            <div style={{
              fontFamily: f,
              fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.018em',
              color: '#141414',
              marginTop: '4px',
              paddingLeft: '52px',
              whiteSpace: 'nowrap',
            }}>
              I research, design, and ship product UX,{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, fontFamily: f }}>end to end.</em>
            </div>
          </motion.div>

          {/* ── Pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', paddingLeft: '52px' }}
          >
            {QUICK_ACTIONS.map(a => (
              <button
                key={a.label}
                onClick={() => a.scroll
                  ? document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                  : sendMessage(a.query)
                }
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  border: '1px solid #DDDDD9',
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(8px)',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#141414',
                  fontFamily: f,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'white'; el.style.borderColor = '#C8C8C4'; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.75)'; el.style.borderColor = '#DDDDD9'; el.style.boxShadow = 'none' }}
              >
                {a.label}
              </button>
            ))}
          </motion.div>

          {/* ── Chat messages ── */}
          <AnimatePresence>
            {chatStarted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: '16px', maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '52px' }}
              >
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
                    {msg.role === 'assistant' && (
                      <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#DDD8FB', flexShrink: 0, overflow: 'hidden', display: 'inline-block' }}>
                        <img src="/photo.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      </span>
                    )}
                    <div style={{
                      maxWidth: '400px', padding: '10px 16px', borderRadius: '18px', fontSize: '13.5px', lineHeight: 1.55, fontFamily: f,
                      ...(msg.role === 'user'
                        ? { background: '#141414', color: 'white', borderBottomRightRadius: '4px' }
                        : { background: 'white', color: '#141414', border: '1px solid #E2E2DF', borderBottomLeftRadius: '4px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' })
                    }}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#DDD8FB', flexShrink: 0 }} />
                    <div style={{ background: 'white', border: '1px solid #E2E2DF', borderRadius: '18px', borderBottomLeftRadius: '4px', padding: '12px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {[0,150,300].map(d => <span key={d} className="animate-bounce" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#C8C8C4', display: 'inline-block', animationDelay: `${d}ms` }} />)}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Input ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            style={{ paddingLeft: '52px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: '1px solid #E2E2DF', borderRadius: '14px', padding: '11px 16px' }}>
              <span style={{ color: '#B0B0AA', marginRight: '8px', fontSize: '13px', fontFamily: 'monospace', userSelect: 'none' }}>&gt;_</span>
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="ask Deepak anything..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13.5px', color: '#141414', fontFamily: f }}
              />
              <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()}
                style={{ width: 30, height: 30, borderRadius: '50%', background: input.trim() ? '#6B6B6B' : '#D8D8D4', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '8px', transition: 'background 0.15s' }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: '11.5px', color: '#B0B0AA', marginTop: '10px', fontFamily: f }}>
              Built with love and Claude Code · 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── WIDGET SCATTER ───────────────────────────────────────────────── */}
      <section id="about" style={{ backgroundColor: '#F2F2F0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 32px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: f, fontSize: 'clamp(3.5rem,7vw,5.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#141414', textAlign: 'center', marginBottom: '72px' }}
          >
            I design <em style={{ fontStyle: 'italic', fontWeight: 700 }}>and</em> ship.
          </motion.p>

          <div style={{ position: 'relative', minHeight: '680px' }}>
            <W delay={0.05} style={{ position: 'absolute', top: 0, left: 0, width: '200px' }}>
              <div style={{ width: '100%', height: '140px', backgroundColor: '#DDD8FB', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
                <img src="/photo.jpg" alt="Deepak" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#141414', fontFamily: f, margin: 0 }}>Deepak Maan</p>
              <p style={{ fontSize: '12px', color: '#6B6B6B', fontFamily: f, margin: '2px 0 0' }}>Mumbai · India</p>
            </W>

            <W delay={0.1} style={{ position: 'absolute', top: '212px', left: 0, width: '200px' }}>
              <p style={{ fontSize: '10px', color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: f, margin: '0 0 4px' }}>Mumbai, IN</p>
              <p style={{ fontSize: '28px', fontWeight: 300, color: '#141414', fontFamily: f, margin: 0, letterSpacing: '-0.02em' }}>{istTime.replace(' AM','').replace(' PM','')}</p>
              <p style={{ fontSize: '10px', color: '#9B9B9B', fontFamily: f, margin: '2px 0 0' }}>IST · UTC+5:30</p>
            </W>

            <W delay={0.15} style={{ position: 'absolute', top: '380px', left: 0, width: '200px' }}>
              <p style={{ fontSize: '10px', color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: f, margin: '0 0 10px' }}>Interests</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {INTERESTS.map(i => <span key={i} style={{ padding: '4px 10px', borderRadius: '9999px', background: '#F2F2F0', border: '1px solid #E2E2DF', fontSize: '11px', color: '#6B6B6B', fontFamily: f }}>{i}</span>)}
              </div>
            </W>

            <W delay={0.2} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '220px', background: '#141414', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22C55E', flexShrink: 0 }} />
                <span style={{ fontSize: '10px', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: f }}>Available Now</span>
              </div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'white', fontFamily: f, margin: '0 0 10px' }}>Product Designer</p>
              {['→  Hyderabad', '→  Bangalore', '→  Remote'].map(l => <p key={l} style={{ fontSize: '12px', color: '#6B6B6B', fontFamily: f, margin: '3px 0 0' }}>{l}</p>)}
            </W>

            <W delay={0.23} style={{ position: 'absolute', top: '190px', left: '40%', background: '#F5E642', border: 'none', padding: '8px 12px', borderRadius: '10px', width: 'auto' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#141414', fontFamily: f, margin: 0, whiteSpace: 'nowrap' }}>Currently building with AI ✦</p>
            </W>

            <W delay={0.28} style={{ position: 'absolute', top: '148px', right: 0, width: '168px', background: '#F5E642', border: 'none', cursor: 'pointer' }}
              onClick={() => window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing', '_blank')}>
              <p style={{ fontSize: '10px', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: f, margin: '0 0 8px' }}>CV</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 2h5l3 3v9H4V2z" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round"/><path d="M9 2v3h3" stroke="#141414" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                <div><p style={{ fontSize: '13px', fontWeight: 600, color: '#141414', fontFamily: f, margin: 0 }}>Resume</p><p style={{ fontSize: '10px', color: '#6B6B6B', fontFamily: f, margin: 0 }}>PDF · 1 page</p></div>
              </div>
            </W>

            <W delay={0.33} style={{ position: 'absolute', top: '308px', right: 0, width: '168px', background: '#0A66C2', border: 'none', cursor: 'pointer' }}
              onClick={() => window.open('https://linkedin.com/in/deepakmaan', '_blank')}>
              <p style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: f, margin: '0 0 8px' }}>Find me online</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/></svg>
                <div><p style={{ fontSize: '13px', fontWeight: 600, color: 'white', fontFamily: f, margin: 0 }}>LinkedIn</p><p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontFamily: f, margin: 0 }}>/in/deepakmaan</p></div>
              </div>
            </W>

            <RateWidget f={f} />
          </div>
        </div>
      </section>

      <div id="work" />
    </main>
  )
}

const W = ({ children, delay = 0, style = {}, onClick }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; onClick?: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    onClick={onClick} whileHover={onClick ? { scale: 1.02 } : {}}
    style={{ background: 'white', border: '1px solid #E2E2DF', borderRadius: '18px', padding: '16px', boxShadow: '0 2px 12px rgba(20,20,20,0.07)', ...style }}
  >
    {children}
  </motion.div>
)

const RateWidget = ({ f }: { f: string }) => {
  const [rating, setRating]   = useState(0)
  const [hovered, setHovered] = useState(0)
  const [rated, setRated]     = useState(false)
  return (
    <W delay={0.38} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', textAlign: 'center' }}>
      <p style={{ fontSize: '10px', color: '#9B9B9B', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: f, margin: '0 0 10px' }}>{rated ? 'Thanks! 🎉' : 'Rate this portfolio'}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
        {[1,2,3,4,5].map(s => (
          <button key={s} onMouseEnter={() => !rated && setHovered(s)} onMouseLeave={() => !rated && setHovered(0)}
            onClick={() => { if (!rated) { setRating(s); setRated(true) } }}
            style={{ fontSize: '22px', background: 'none', border: 'none', cursor: rated ? 'default' : 'pointer', padding: 0, lineHeight: 1, color: (hovered || rating) >= s ? '#F5C842' : '#E2E2DF', transition: 'transform 0.1s' }}>★</button>
        ))}
      </div>
    </W>
  )
}
