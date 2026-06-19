import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'
import { Link } from 'react-router-dom'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  revealed?: number
  done?: boolean
}

const linkify = (text: string) => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g)
  return parts.map((part, i) =>
    part.match(/^https?:\/\//)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer"
          style={{ color:'rgb(99,102,241)', textDecoration:'underline', textUnderlineOffset:2 }}>
          {part.includes('cal.com') ? 'Book a chat ↗' : part}
        </a>
      : part
  )
}

const QUICK_ACTIONS = [
  { label:'see my work',               icon:'down', query:'see my work'                    },
  { label:'how do you ship?',          icon:null,   query:'how do you ship?'               },
  { label:'what designer are you?',    icon:null,   query:'what kind of designer are you?' },
  { label:"what's your availability?", icon:null,   query:"what's your availability?"      },
  { label:'wanna chat?',               icon:'out',  query:'wanna chat?'                    },
  { label:'resume',                    icon:'out',  query:'resume'                         },
  { label:'linkedin',                  icon:'out',  query:'linkedin'                       },
]

const SYSTEM_PROMPT = `You are Deepak Maan, a product designer based in Mumbai. You're speaking as yourself on your portfolio site. Someone is reading your work — they might be a recruiter, a founder, or just curious. Talk like a real person texting back, not a chatbot.

STRICT RULES:
- Maximum 2 sentences. Hard limit. No exceptions.
- Never use bullet points, headers, dashes as list markers, or markdown of any kind.
- First person always. "I" not "Deepak".
- No filler — never start with "Great question", "Of course", "Sure thing", "Absolutely".

WHEN SOMEONE SAYS hi / hey / hello / what's up or any casual greeting:
Reply warmly and invite them to ask about your work. Example: "Hey! Ask me anything about my work, process, or what I'm up to."
DO NOT say "I'm only here to talk about my work" for greetings.

WHEN SOMEONE SAYS bye / thanks / goodbye:
Reply naturally and briefly. Example: "Good talking — hope to hear from you."

WHEN SOMEONE ASKS something unrelated (weather, jokes, poems):
Redirect warmly: "Ha, not quite my domain — ask me something about my design work though."

WHO YOU ARE:
Product designer from IIT ISM Dhanbad. Currently at JSW Steel as a Design Analyst. Design end-to-end — research, Figma, and ship the front-end in React + TypeScript myself. No handoff.

CASE STUDIES:
1. Tech Japan / Talendy — UX research internship Sep-Nov 2024. 10 interviews across 6 IITs, 9 pain points, fixes shipped: job description layout, WCAG 2.1 AA dark mode, save-all profile flow, multiple resume management, built-in communication tool replacing WhatsApp. 80% easier navigation, 70% feature adoption.
2. Buzztro — Designed full product 0 to 1 for a collective buying platform. The mechanic: more buyers commit → price drops for everyone. 40+ screens, 5 core flows (product card, PDP, booking checkout, cart, post-purchase), shipped to production in 8 weeks. Solo designer, direct to founder.
3. Zu-AI — Redesigned chat experience for AI tutoring app, 100K+ students. 40% faster scanning, 3x faster task completion.

SIDE PROJECTS (all live, built end-to-end):
1. Music Animation Generator — upload a track, get beat-synced animations in real time. React + Web Audio API + WebGL. Live at musictoanimate.vercel.app
2. TypMatch — font pairing tool built on a scoring system, not just a search box. React + TypeScript + Google Fonts API. Live at typematch-mu.vercel.app
3. Kairo Design System — full design system (tokens to components) implemented as a live interactive site. Live at kairo-design.vercel.app

AVAILABILITY: Open to full-time Product Design roles. Hyderabad, Bangalore, or Remote. Available now.

CONTACT:
Resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing
LinkedIn: https://www.linkedin.com/in/deepak-maan-106452230/
Email: dipumaan2002@gmail.com
Book a call: https://cal.com/deepakmaan`

const INTERESTS = ['Product Design','UX Research','AI Workflows','Design Systems','Cricket','Music']
const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"
const SP_SLOW = { type:'spring' as const, stiffness:260, damping:28 }
const SP_MSG  = { type:'spring' as const, stiffness:420, damping:32 }
const uid = () => Math.random().toString(36).slice(2)

// ─── Shipped nudge (G3 — layered glass) ───────────────────────────────────────
// Replace the existing SHIPPED_ITEMS const + ShippedNudge function in HomePage.tsx.

const SHIPPED_ITEMS = [
  { name: 'Music Animator',      emoji: '🎵', url: 'https://musictoanimate.vercel.app' },
  { name: 'TypeMatch',           emoji: '⌨️', url: 'https://typematch-mu.vercel.app'   },
  { name: 'PulsePlan',           emoji: '📋', url: 'https://pulseplan-dm.vercel.app'   },
  { name: 'Kairo Design System', emoji: '🧩', url: 'https://kairo-design.vercel.app'   },
]

function ShippedNudge({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { rootMargin: '-40px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: 1152, margin: '0 auto',
        paddingTop: isMobile ? 'clamp(40px,7vw,72px)' : 'clamp(56px,8vw,96px)', paddingBottom: isMobile ? 'clamp(72px,10vw,112px)' : 'clamp(88px,10vw,128px)', paddingLeft: isMobile ? 20 : 40, paddingRight: isMobile ? 20 : 40,
        backgroundColor: 'hsl(0,0%,97%)',
      }}
    >
      {/* Outer tinted panel */}
      <div style={{
        position: 'relative',
        borderRadius: 26,
        padding: isMobile ? 16 : 36,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, hsl(250,50%,90%), hsl(330,45%,91%))',
      }}>
        {/* Drifting blobs on the outer panel */}
        <div style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', filter: 'blur(45px)', opacity: 0.55, background: '#818cf8', top: -50, left: '5%', animation: 'glassFloat1 17s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', filter: 'blur(45px)', opacity: 0.55, background: '#f9a8d4', bottom: -60, right: '8%', animation: 'glassFloat2 20s ease-in-out infinite', pointerEvents: 'none' }} />

        {/* Inner frosted glass card */}
        <div style={{
          position: 'relative', zIndex: 1,
          borderRadius: 18,
          padding: isMobile ? '32px 24px' : '36px 40px',
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow: '0 12px 40px rgba(76,29,149,0.14), inset 0 1px 0 rgba(255,255,255,0.8)',
          display: isMobile ? 'flex' : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? 28 : 40,
          flexWrap: 'wrap',
        }}>

          {/* Left */}
          <div style={{ flex: isMobile ? undefined : '1 1 340px' }}>
            <p style={{ fontFamily: f, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(255,30%,45%)', margin: '0 0 14px' }}>
              Also worth seeing
            </p>
            <h3 style={{ margin: '0 0 12px', lineHeight: 1.1 }}>
              <span style={{ fontFamily: f, fontSize: isMobile ? 26 : 30, fontWeight: 700, letterSpacing: '-0.025em', color: 'hsl(0,0%,8%)' }}>
                I also build.{' '}
              </span>
              <span style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: isMobile ? 25 : 30, color: 'hsl(0,0%,42%)' }}>
                Not just design.
              </span>
            </h3>
            <p style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,40%)', lineHeight: 1.6, margin: '0 0 22px', maxWidth: 380 }}>
              Four live products built solo — research, design, and code. From idea to deployed.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SHIPPED_ITEMS.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: f, fontSize: 12, padding: '7px 14px', borderRadius: 100,
                    background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.9)',
                    color: 'hsl(0,0%,28%)', display: 'inline-flex', gap: 6, alignItems: 'center',
                    textDecoration: 'none', boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s', cursor: 'pointer',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; el.style.background = 'rgba(255,255,255,0.95)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)'; el.style.background = 'rgba(255,255,255,0.75)' }}
                >
                  <span style={{ fontSize: 13 }}>{p.emoji}</span>
                  {p.name}
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 9, height: 9, opacity: 0.5 }}><path d="M2.5 9.5l7-7M5 2.5h4.5V7"/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: isMobile ? 'stretch' : 'flex-end',
            gap: 14,
            width: isMobile ? '100%' : 'auto',
          }}>
            {/* Live badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: f, fontSize: 11, fontWeight: 600, color: '#15803d', alignSelf: isMobile ? 'flex-start' : 'flex-end' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              All live on Vercel
            </div>

            {/* Stats — desktop: inline; mobile: glass card with divider */}
            {isMobile ? (
              <div style={{
                display: 'flex', width: '100%',
                background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.9)',
                borderRadius: 14, overflow: 'hidden',
              }}>
                <div style={{ flex: 1, padding: '16px 18px', textAlign: 'center', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontFamily: f, fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', color: 'hsl(255,40%,30%)', lineHeight: 1 }}>4</div>
                  <div style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,50%)', marginTop: 5 }}>Live products</div>
                </div>
                <div style={{ flex: 1, padding: '16px 18px', textAlign: 'center' }}>
                  <div style={{ fontFamily: f, fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', color: 'hsl(255,40%,30%)', lineHeight: 1 }}>0→1</div>
                  <div style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,50%)', marginTop: 5 }}>Built solo</div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: f, fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', color: 'hsl(255,40%,30%)', lineHeight: 1 }}>4</div>
                  <div style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,50%)', marginTop: 4 }}>Live products</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: f, fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em', color: 'hsl(255,40%,30%)', lineHeight: 1 }}>0→1</div>
                  <div style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,50%)', marginTop: 4 }}>Built solo</div>
                </div>
              </div>
            )}

            {/* CTA — full width on both, looks good */}
            <Link to="/shipped"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: f, fontSize: 13, fontWeight: 600, color: 'white',
                background: 'hsl(255,45%,30%)', padding: '13px 24px', borderRadius: 100,
                textDecoration: 'none', boxShadow: '0 6px 20px rgba(76,29,149,0.25)',
                width: '100%', transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'hsl(255,45%,24%)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 10px 28px rgba(76,29,149,0.32)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'hsl(255,45%,30%)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 6px 20px rgba(76,29,149,0.25)' }}
            >
              View shipped builds →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glassFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
        @keyframes glassFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-20px)} }
      `}</style>
    </motion.div>
  )
}

export default function HomePage() {
  const [messages, setMessages]       = useState<Message[]>([])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [time, setTime]               = useState(new Date())
  const [playing, setPlaying]         = useState(true)
  const isMobile                      = useIsMobile()
  const chatEndRef                    = useRef<HTMLDivElement>(null)
  const typeTimers                    = useRef<ReturnType<typeof setInterval>[]>([])

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])
  useEffect(() => {
    if (messages.length > 0) chatEndRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' })
  }, [messages])

  const istTime = time.toLocaleTimeString('en-IN', { timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true })

  const startTypewriter = useCallback((id: string, text: string) => {
    const words = text.split(' ').filter(w => w.length > 0)
    if (words.length === 0) return
    let w = 0
    const t = setInterval(() => {
      w++
      setMessages(prev => prev.map(m =>
        m.id === id ? { ...m, revealed: w, done: w >= words.length } : m
      ))
      if (w >= words.length) clearInterval(t)
    }, 120)
    typeTimers.current.push(t)
  }, [])

  const addHardcoded = useCallback((query: string, reply: string) => {
    const bid = uid()
    setMessages(prev => [...prev,
      { id: uid(), role:'user',      content: query, done: true },
      { id: bid,   role:'assistant', content: reply, revealed: 0, done: false }
    ])
    setChatStarted(true)
    setInput('')
    setTimeout(() => startTypewriter(bid, reply), 150)
  }, [startTypewriter])

  const send = async (text: string) => {
    if (!text.trim() || loading) return

    if (text === 'see my work')  { document.getElementById('work')?.scrollIntoView({ behavior:'smooth' }); return }
    if (text === 'resume')       { window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing','_blank'); return }
    if (text === 'linkedin')     { window.open('https://www.linkedin.com/in/deepakmaan/','_blank'); return }

    if (text === 'wanna chat?')
      return addHardcoded(text, "Sure — pick a time that works for you. https://cal.com/deepakmaan")
    if (text === 'how do you ship?')
      return addHardcoded(text, "I design in Figma and build the front-end myself in React + TypeScript — no handoff. Means I catch issues in code that wouldn't show up in a design file.")
    if (text === 'what kind of designer are you?')
      return addHardcoded(text, "End-to-end product designer — research, Figma, and I ship the front-end myself. I care more about solving the right problem than making it look polished.")
    if (text === "what's your availability?")
      return addHardcoded(text, "Open to full-time product design roles — Hyderabad, Bangalore, or remote. Available now. https://cal.com/deepakmaan")

    const bid = uid()
    const userMsg: Message = { id: uid(), role:'user', content: text, done: true }
    const botMsg:  Message = { id: bid,   role:'assistant', content: '', revealed: 0, done: false }
    const msgSnapshot = [...messages, userMsg]

    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')
    setLoading(true)
    setChatStarted(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: msgSnapshot }),
      })
      const data = await res.json()
      const reply = data?.text ?? 'Something went wrong.'
      setMessages(prev => prev.map(m =>
        m.id === bid ? { ...m, content: reply } : m
      ))
      setTimeout(() => startTypewriter(bid, reply), 80)
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === bid
          ? { ...m, content: 'Something went wrong — try again.', revealed: Infinity, done: true }
          : m
      ))
    } finally {
      setLoading(false)
    }
  }

  const visibleText = (msg: Message) => {
    if (!msg.content) return ''
    if (msg.revealed === undefined || msg.revealed === Infinity || msg.done) return msg.content
    const words = msg.content.split(' ').filter(w => w.length > 0)
    return words.slice(0, msg.revealed).join(' ')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');
        @keyframes b1{0%,100%{transform:none}50%{transform:rotate(180deg) scale(1.1)}}
        @keyframes b2{0%,100%{transform:none}50%{transform:rotate(-150deg) scale(0.9)}}
        @keyframes b3{0%,100%{transform:none}50%{transform:rotate(120deg) scale(1.05)}}
        @keyframes b4{0%,100%{transform:none}50%{transform:rotate(-80deg) scale(0.95)}}
        @keyframes b5{0%,100%{transform:none}50%{transform:rotate(100deg) scale(1.08)}}
        @keyframes b6{0%,100%{transform:none}50%{transform:rotate(-60deg) scale(1.12)}}
        .bl1{animation:b1 20s linear infinite;transform-origin:center center}
        .bl2{animation:b2 18s linear infinite;transform-origin:calc(50% - 400px)}
        .bl3{animation:b3 22s linear infinite;transform-origin:calc(50% + 400px)}
        .bl4{animation:b4 16s linear infinite;transform-origin:calc(50% - 200px) calc(50% + 400px)}
        .bl5{animation:b5 24s linear infinite;transform-origin:calc(50% - 800px) calc(50% + 200px)}
        .bl6{animation:b6 19s linear infinite;transform-origin:calc(50% + 300px) calc(50% - 200px)}
        @keyframes bar{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .folder-sheet{transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1)}
        .folder-group:hover .sheet1{transform:translate(-14px,-30px) rotate(-7deg)}
        .folder-group:hover .sheet2{transform:translate(14px,-45px) rotate(5deg)}
        .folder-group:hover .sheet3{transform:translate(-4px,-65px) rotate(-3deg) scale(1.02)}
        .folder-group:hover .folder-front{transform:rotateX(-46deg) translateY(1px)}
        .folder-front{transition:transform 0.3s;transform-origin:bottom}
        .pills-scroll::-webkit-scrollbar{display:none}
        .work-section-bg{background-color:hsl(0,0%,97%);background-image:radial-gradient(circle,rgba(0,0,0,0.1) 0.8px,transparent 0.8px);background-size:18px 18px}
      `}</style>

      <div className="relative isolate overflow-x-clip" style={{ backgroundColor:'hsl(0,0%,98%)', color:'hsl(0,0%,8%)', fontFamily:f }}>

        <div style={{ position:'relative', minHeight:'100svh', display:'flex', flexDirection:'column', justifyContent:'center' }}>

          <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 overflow-hidden">
            <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,hsl(250,60%,97%),hsl(200,70%,96%),hsl(330,60%,97%))' }}>
              <svg className="hidden"><defs><filter id="g4"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="g"/><feBlend in="SourceGraphic" in2="g"/></filter></defs></svg>
              <div className="h-full w-full" style={{ filter:'url(#g4) blur(40px)' }}>
                {[['bl1','99,102,241',0.45],['bl2','168,85,247',0.40],['bl3','20,184,166',0.35],['bl4','236,72,153',0.30],['bl5','59,130,246',0.40],['bl6','245,158,11',0.25]].map(([cls,col,o])=>(
                  <div key={cls as string} className={cls as string} style={{ position:'absolute', background:`radial-gradient(circle at center,rgba(${col},${o}) 0,rgba(${col},0) 55%) no-repeat`, mixBlendMode:'screen' as any, width:'80%', height:'80%', top:'10%', left:'10%' }} />
                ))}
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background:'rgba(252,251,255,0.48)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(to bottom,transparent 55%,hsl(0,0%,97%))' }} />
          </div>

          <div style={{ maxWidth:1152, margin:'0 auto', padding: isMobile ? '0 20px' : '0 40px', width:'100%' }}>
            <LayoutGroup>
              <div style={{ maxWidth:920, margin:'0 auto' }}>

                <AnimatePresence>
                  {!chatStarted && (
                    <motion.div key="headline" layout
                      initial={{ opacity:0, y:16, filter:'blur(6px)' }}
                      animate={{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.55, ease:[0.4,0,0.2,1] } }}
                      exit={{ opacity:0, y:-8, filter:'blur(6px)', transition:{ duration:0.38, ease:[0.4,0,1,1] } }}
                      style={{ marginBottom:32 }}>
                      <div className="flex items-start gap-4">
                        <motion.span layoutId="avatar" className="relative shrink-0" style={{ marginTop:7 }}>
                          <span style={{ display:'block', width:36, height:36, borderRadius:'50%', overflow:'hidden', background:'#DDD8FB', boxShadow:'0 0 0 2px white,0 1px 4px rgba(0,0,0,0.1)' }}>
                            <img src="/deepak.png" alt="Deepak" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
                          </span>
                          <span style={{ position:'absolute', width:10, height:10, borderRadius:'50%', background:'#4ade80', bottom:1, right:0, boxShadow:'0 0 0 2px white' }} />
                        </motion.span>
                        <div style={{ fontFamily:f, fontWeight:500, lineHeight:1.15, letterSpacing:'-0.025em', color:'hsl(0,0%,8%)' }}>
                          <div style={{ fontSize:'clamp(1.4rem,5.5vw,3.4rem)', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
                            I'm{' '}
                            <span style={{ position:'relative', display:'inline-block', padding:'0 9px' }}>
                              <span style={{ position:'absolute', inset:0, borderLeft:'2px solid rgba(99,102,241,0.45)', borderRight:'2px solid rgba(99,102,241,0.45)', background:'rgba(99,102,241,0.08)', borderRadius:2 }} />
                              <span style={{ position:'absolute', width:5, height:5, borderRadius:'50%', background:'rgb(99,102,241)', top:0, left:0, transform:'translate(-50%,-50%)' }} />
                              <span style={{ position:'absolute', width:5, height:5, borderRadius:'50%', background:'rgb(99,102,241)', bottom:0, right:0, transform:'translate(50%,50%)' }} />
                              <span style={{ position:'relative' }}>Deepak Maan</span>
                            </span>
                            {' '}&ndash; based in Mumbai.
                          </div>
                          <div style={{ fontSize:'clamp(1.4rem,5.5vw,3.4rem)', whiteSpace: isMobile ? 'normal' : 'nowrap', marginTop:6 }}>
                            I design and ship product UX,{' '}
                            <span style={{ fontFamily:fs, fontStyle:'italic', fontWeight:300, display:'inline-block', whiteSpace:'nowrap' }}>end to end.</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {chatStarted && (
                    <motion.div key="chat-area" layout
                      initial={{ opacity:0 }}
                      animate={{ opacity:1, transition:{ duration:0.3, delay:0.1 } }}
                      style={{ marginBottom:16 }}>
                      <motion.div layout
                        initial={{ opacity:0, y:8 }}
                        animate={{ opacity:1, y:0, transition:SP_SLOW }}
                        style={{ display:'flex', alignItems:'flex-end', gap:8, marginBottom:12 }}>
                        <motion.span layoutId="avatar" style={{ width:28, height:28, borderRadius:'50%', background:'#DDD8FB', flexShrink:0, overflow:'hidden', display:'inline-block', boxShadow:'0 0 0 2px white' }}>
                          <img src="/deepak.png" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
                        </motion.span>
                        <div style={{ maxWidth:480, padding:'11px 17px', borderRadius:18, borderBottomLeftRadius:5, fontSize:14.5, lineHeight:1.6, fontFamily:f, background:'white', color:'hsl(0,0%,8%)', border:'1px solid hsl(0,0%,88%)', boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>
                          I'm Deepak &mdash; based in Mumbai. I design and ship product UX, end to end.
                        </div>
                      </motion.div>
                      <div style={{ maxHeight:300, overflowY:'auto', display:'flex', flexDirection:'column', gap:10 }}>
                        {messages.map((msg) => {
                          const text = visibleText(msg)
                          const isTyping = msg.role==='assistant' && !msg.done
                          return (
                            <motion.div key={msg.id}
                              initial={{ opacity:0, y:6 }}
                              animate={{ opacity:1, y:0, transition:{ duration:0.2, ease:[0.4,0,0.2,1] } }}
                              style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start', alignItems:'flex-end', gap:8 }}>
                              {msg.role==='assistant' && (
                                <span style={{ width:28, height:28, borderRadius:'50%', background:'#DDD8FB', flexShrink:0, overflow:'hidden', display:'inline-block', boxShadow:'0 0 0 2px white' }}>
                                  <img src="/deepak.png" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
                                </span>
                              )}
                              <div style={{ maxWidth:480, padding:'11px 17px', borderRadius:18, fontSize:14.5, lineHeight:1.6, fontFamily:f,
                                ...(msg.role==='user'
                                  ? { background:'hsl(0,0%,10%)', color:'white', borderBottomRightRadius:5 }
                                  : { background:'white', color:'hsl(0,0%,8%)', border:'1px solid hsl(0,0%,88%)', borderBottomLeftRadius:5, boxShadow:'0 1px 6px rgba(0,0,0,0.06)' })
                              }}>
                                {msg.role==='assistant' ? linkify(text) : text}
                                {isTyping && text.length > 0 && (
                                  <span style={{ display:'inline-block', width:2, height:'0.9em', background:'hsl(0,0%,35%)', marginLeft:3, verticalAlign:'text-bottom', animation:'blink 0.75s step-end infinite' }} />
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                        <AnimatePresence>
                          {loading && messages.length > 0 && messages[messages.length-1]?.content === '' && (
                            <motion.div key="dots"
                              initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0, transition:SP_MSG }}
                              exit={{ opacity:0, transition:{ duration:0.15 } }}
                              style={{ display:'flex', alignItems:'flex-end', gap:8 }}>
                              <span style={{ width:28, height:28, borderRadius:'50%', background:'#DDD8FB', flexShrink:0, boxShadow:'0 0 0 2px white' }} />
                              <div style={{ background:'white', border:'1px solid hsl(0,0%,88%)', borderRadius:18, borderBottomLeftRadius:5, padding:'13px 17px', boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>
                                <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                                  {[0,160,320].map(d => (
                                    <span key={d} style={{ width:6, height:6, borderRadius:'50%', background:'hsl(0,0%,72%)', display:'inline-block', animation:`bar 1s ease-in-out ${d}ms infinite` }} />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div ref={chatEndRef} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div layout style={{ marginBottom:18 }}>
                  {isMobile ? (
                    <div style={{ position:'relative', margin:'0 -20px' }}>
                      <motion.div initial="hidden" animate="visible"
                        variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.05, delayChildren:0.18 } } }}
                        className="pills-scroll"
                        style={{ display:'flex', gap:8, padding:'4px 20px 8px', overflowX:'auto', overflowY:'hidden', scrollbarWidth:'none', WebkitOverflowScrolling:'touch', scrollSnapType:'x proximity' }}>
                        {QUICK_ACTIONS.map(a => (
                          <div key={a.label} style={{ flexShrink:0, scrollSnapAlign:'start' }}>
                            <Pill a={a} send={send} />
                          </div>
                        ))}
                      </motion.div>
                      <div style={{ position:'absolute', top:0, right:0, bottom:8, width:32, pointerEvents:'none', background:'linear-gradient(to left, hsl(0,0%,97%), transparent)' }} />
                    </div>
                  ) : (
                    <>
                      <motion.div initial="hidden" animate="visible"
                        variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.055, delayChildren:0.18 } } }}
                        style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:8 }}>
                        {QUICK_ACTIONS.slice(0,4).map(a => <Pill key={a.label} a={a} send={send} />)}
                      </motion.div>
                      <motion.div initial="hidden" animate="visible"
                        variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.055, delayChildren:0.36 } } }}
                        style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
                        {QUICK_ACTIONS.slice(4).map(a => <Pill key={a.label} a={a} send={send} />)}
                      </motion.div>
                    </>
                  )}
                </motion.div>

                <motion.div layout initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0, transition:{ delay:0.28, ...SP_SLOW } }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, borderRadius:16, padding:'13px 18px', background:'rgba(255,255,255,0.88)', backdropFilter:'blur(14px)', border:'1px solid hsl(0,0%,88%)', boxShadow:'0 1px 8px rgba(0,0,0,0.05)' }}>
                    <span style={{ color:'hsl(0,0%,55%)', fontFamily:'monospace', fontSize:13, userSelect:'none' }}>›_</span>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send(input)}
                      placeholder="ask Deepak anything…"
                      style={{ flex:1, background:'transparent', border:'none', outline:'none', fontSize:15, color:'hsl(0,0%,8%)', fontFamily:f }} />
                    <button onClick={() => send(input)} disabled={loading || !input.trim()}
                      style={{ width:32, height:32, borderRadius:'50%', background:'hsl(0,0%,8%)', border:'none', cursor:input.trim()?'pointer':'default', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, opacity:input.trim()?1:0.3, transition:'opacity 0.15s' }}>
                      <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:14, height:14 }}><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                    </button>
                  </div>
                  <p style={{ textAlign:'center', fontSize:12, color:'hsl(0,0%,55%)', marginTop:12, fontFamily:f }}>
                    Yes, this is a bot — but I monitor every message.{' '}
                    <a href="mailto:dipumaan2002@gmail.com" style={{ color:'inherit', textDecoration:'underline', textUnderlineOffset:2 }}>Email me</a>
                    {' '}or{' '}
                    <a href="https://cal.com/deepakmaan" target="_blank" rel="noopener noreferrer" style={{ color:'inherit', textDecoration:'underline', textUnderlineOffset:2 }}>book a chat</a>.
                  </p>
                </motion.div>

              </div>
            </LayoutGroup>
          </div>
        </div>

        {/* ── WORK SECTION — tightened spacing + real preview images ── */}
        <div id="work" className="work-section-bg" style={{ scrollMarginTop:64 }}>
          <div style={{ maxWidth:1152, margin:'0 auto', padding: isMobile ? '56px 20px 72px' : '64px 40px 80px' }}>
            <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ fontFamily:f, fontSize:11, fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'hsl(0,0%,50%)', marginBottom: isMobile ? 36 : 48 }}>
              Selected work
            </motion.p>
            <div style={{ display:'flex', flexDirection:'column', gap: isMobile ? 72 : 120 }}>
              <CaseRow
                title="Music Animate"
                desc="An audio to animation generator. A full-stack browser tool that turns any track into a beat-synced video. 9 generative engines, in-browser video export, Supabase auth and storage, built solo by directing AI, debugging and refactoring it to production."
                metric="9" metricLabel="generative engines" slug="music-animate"
                image="/music-animate/ma_hero_dark.png" bg="hsl(0,0%,9%)" isMobile={isMobile} />
              <CaseRow
                title="Tech Japan (Talendy) – UX Research & Redesign"
                desc="Ran 10 user interviews across 6 IITs, documented 9 pain points, and shipped fixes to production – job description layout, dark mode accessibility, multiple resume management, and a built-in communication tool."
                metric="80%" metricLabel="improved navigation" slug="tech-japan"
                image="/01-project-overview.png" bg="hsl(222,100%,96%)" isMobile={isMobile} />
              <CaseRow
                title="Buzztro – Collective Buying Platform"
                desc="Designed the full buying experience for a collective buying platform — where more buyers means a lower price. 40+ screens, 5 core flows, shipped to production in 8 weeks."
                metric="40+" metricLabel="screens shipped" slug="buzztro"
                image="/buzztro/pdp-overview.png" bg="hsl(22,100%,95%)" isMobile={isMobile} />
              <CaseRow
                title="Zu-AI – Chat Experience Redesign"
                desc="Redesigned the chat experience for an AI tutoring app serving 100K+ students. Research with 33 participants, fixed information overload, added accessibility controls and visual hierarchy improvements."
                metric="3×" metricLabel="task completion" slug="zu-ai"
                image="/ZA4_Redesign.png" bg="hsl(260,60%,97%)" isMobile={isMobile} />
            </div>
          </div>
        </div>

        {/* ── SHIPPED NUDGE — sits between work and about sections ── */}
        <ShippedNudge isMobile={isMobile} />

        <Widgets istTime={istTime} playing={playing} setPlaying={setPlaying} isMobile={isMobile} />
      </div>
    </>
  )
}

const Pill = ({ a, send }: { a:typeof QUICK_ACTIONS[0]; send:(q:string)=>void }) => (
  <motion.button onClick={() => send(a.query)}
    variants={{ hidden:{ opacity:0, y:10, scale:0.94 }, visible:{ opacity:1, y:0, scale:1, transition:{ type:'spring', stiffness:380, damping:28 } } }}
    whileHover={{ scale:1.04, transition:{ type:'spring', stiffness:500, damping:20 } }}
    whileTap={{ scale:0.97 }}
    className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white border"
    style={{ fontFamily:f, padding:'8px 16px', borderColor:'rgba(0,0,0,0.16)', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', color:'hsl(0,0%,8%)', fontSize:14, cursor:'pointer' }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor='hsl(0,0%,8%)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)' }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(0,0,0,0.16)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)' }}>
    <span>{a.label}</span>
    {a.icon==='down' && <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity"><path d="M8 3v10M4 9l4 4 4-4"/></svg>}
    {a.icon==='out'  && <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity"><path d="M6 4h6v6M12 4 5 11"/></svg>}
  </motion.button>
)

// ─── Work card (CaseRow) — framed browser mockup on the right ──────────────────
// Replace the existing CaseRow const in HomePage.tsx with this.
// Text stays left, the image now sits inside a browser-chrome frame on the right
// so the visual area is never empty — it always shows the real screenshot.

// ─── Work card (CaseRow) — framed browser mockup on the right ──────────────────
// Replace the existing CaseRow const in HomePage.tsx with this.
// Text stays left, the image now sits inside a browser-chrome frame on the right
// so the visual area is never empty — it always shows the real screenshot.

// ─── Work card (CaseRow) — framed browser mockup on the right ──────────────────
// Replace the existing CaseRow const in HomePage.tsx with this.
// Text stays left, the image now sits inside a browser-chrome frame on the right
// so the visual area is never empty — it always shows the real screenshot.

const CaseRow = ({ title, desc, metric, metricLabel, slug, image, bg, url, isMobile }:
  { title:string; desc:string; metric:string; metricLabel:string; slug:string; image:string; bg:string; url:string; isMobile?:boolean }) => (
  <motion.article initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.55, ease:[0.4,0,0.2,1] }}
    style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? '20px 0' : '0 72px', alignItems:'start' }}>

    {/* Text — left */}
    <div style={{ paddingTop: isMobile ? 0 : 28, order: isMobile ? 2 : 1 }}>
      <h3 style={{ fontFamily:f, fontSize:'clamp(1.4rem,1.9vw,1.75rem)', fontWeight:600, lineHeight:1.2, letterSpacing:'-0.02em', color:'hsl(0,0%,8%)', margin:0 }}>{title}</h3>
      <p style={{ fontFamily:f, fontSize:15, color:'hsl(0,0%,45%)', lineHeight:1.72, marginTop:18, maxWidth:360 }}>{desc}</p>
      <div style={{ display:'flex', alignItems:'baseline', gap:10, marginTop:26 }}>
        <span style={{ fontFamily:f, fontSize:'clamp(1.6rem,2.4vw,2.2rem)', fontWeight:500, letterSpacing:'-0.03em', lineHeight:1, color:'hsl(0,0%,8%)' }}>{metric}</span>
        <span style={{ fontFamily:f, fontSize:10, fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'hsl(0,0%,55%)' }}>{metricLabel}</span>
      </div>
      <a href={`/case-study/${slug}`}
        style={{ marginTop:30, display:'inline-flex', alignItems:'center', gap:8, borderRadius:9999, padding:'10px 22px', background:'hsl(0,0%,8%)', color:'white', fontFamily:f, fontSize:14, fontWeight:500, textDecoration:'none', transition:'box-shadow 0.2s,transform 0.2s' }}
        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(0,0,0,0.2)'; (e.currentTarget as HTMLElement).style.transform='translateY(-1px)' }}
        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='none'; (e.currentTarget as HTMLElement).style.transform='translateY(0)' }}>
        <span>Open case study</span>
        <span style={{ width:20, height:20, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:12, height:12 }}><path d="M5 11L11 5M6 5h5v5"/></svg>
        </span>
      </a>
    </div>

    {/* Visual — right, browser-framed */}
    <a href={`/case-study/${slug}`}
      style={{ display:'block', order: isMobile ? 1 : 2, textDecoration:'none' }}
      onMouseEnter={e=>{ const el = e.currentTarget.querySelector('.cr-frame') as HTMLElement; if(el){ el.style.boxShadow='0 24px 56px -12px rgba(0,0,0,0.25)'; el.style.transform='translateY(-4px)' } const img = e.currentTarget.querySelector('.cr-img') as HTMLElement; if(img) img.style.transform='scale(1.03)' }}
      onMouseLeave={e=>{ const el = e.currentTarget.querySelector('.cr-frame') as HTMLElement; if(el){ el.style.boxShadow='0 12px 36px -10px rgba(0,0,0,0.16)'; el.style.transform='translateY(0)' } const img = e.currentTarget.querySelector('.cr-img') as HTMLElement; if(img) img.style.transform='scale(1)' }}>
      <div className="cr-frame" style={{
        borderRadius:16, overflow:"hidden", background:"white",
        border:'1px solid hsl(0,0%,86%)',
        boxShadow:'0 12px 36px -10px rgba(0,0,0,0.16)',
        transition:'box-shadow 0.4s, transform 0.4s',
      }}>
        {/* Browser chrome */}
        <div style={{ background:'hsl(0,0%,96%)', padding:'9px 14px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid hsl(0,0%,90%)' }}>
          <div style={{ display:'flex', gap:6, flexShrink:0 }}>
            <span style={{ width:9, height:9, borderRadius:'50%', background:'#ff5f57' }} />
            <span style={{ width:9, height:9, borderRadius:'50%', background:'#febc2e' }} />
            <span style={{ width:9, height:9, borderRadius:'50%', background:'#28c840' }} />
          </div>
          <div style={{ flex:1, background:'white', borderRadius:6, padding:'3px 12px', fontFamily:'ui-monospace, monospace', fontSize:10.5, color:'hsl(0,0%,50%)', border:'1px solid hsl(0,0%,90%)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:6 }}>
            <svg viewBox="0 0 16 16" fill="none" stroke="hsl(0,0%,55%)" strokeWidth="1.5" style={{ width:10, height:10, flexShrink:0 }}><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg>
            {url}
          </div>
        </div>
        {/* Screenshot — tinted bg shows through any letterboxing so it never reads as empty */}
        <div style={{ background:bg, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
          <img className="cr-img" src={image} alt={title} loading="lazy"
            style={{ width:'100%', height:'auto', display:'block', transition:'transform 0.5s cubic-bezier(0.25,1,0.5,1)' }}
            onError={e=>{ const img = e.target as HTMLImageElement; img.style.display='none'; img.parentElement!.style.minHeight='200px' }} />
        </div>
      </div>
    </a>
  </motion.article>
)

const Widgets = ({ istTime, playing, setPlaying, isMobile }: { istTime:string; playing:boolean; setPlaying:(v:boolean)=>void; isMobile:boolean }) => {
  const [rating, setRating] = useState(0)
  const [hover,  setHover]  = useState(0)
  const [rated,  setRated]  = useState(false)
  const card = { background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)', border:'1px solid rgba(0,0,0,0.07)', borderRadius:16, boxShadow:'0 2px 24px rgba(0,0,0,0.08)' }
  const fly = (delay:number, initRot:number, restRot:number) => ({
    initial:{ opacity:0, scale:0.18, rotate:initRot }, whileInView:{ opacity:1, scale:1, rotate:restRot },
    viewport:{ once:true }, transition:{ type:'spring' as const, stiffness:155, damping:20, delay },
    whileHover:{ scale:1.05, rotate:restRot*0.25, zIndex:20, transition:{ type:'spring', stiffness:340, damping:18 } },
  })
  if (isMobile) return (
    <section id="about" style={{ position:'relative', backgroundColor:'hsl(0,0%,93%)', overflow:'hidden', padding:'72px 20px 80px' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.4, backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.2) 0.8px,transparent 0.8px)', backgroundSize:'18px 18px' }} />
      <div style={{ position:'relative', maxWidth:480, margin:'0 auto', display:'flex', flexDirection:'column', gap:14 }}>
        <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          style={{ fontFamily:f, fontSize:'clamp(2rem,9vw,3.5rem)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.05, color:'hsl(0,0%,8%)', textAlign:'center', margin:'0 0 18px' }}>
          I design <em style={{ fontFamily:fs, fontStyle:'italic', fontWeight:300 }}>and</em> ship. Fast.
        </motion.h2>
        <MobileWidgetStack istTime={istTime} playing={playing} setPlaying={setPlaying} rating={rating} hover={hover} rated={rated} setHover={setHover} setRating={setRating} setRated={setRated} />
      </div>
    </section>
  )

  return (
    <section id="about" style={{ position:'relative', backgroundColor:'hsl(0,0%,93%)', minHeight:'100vh', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.4, backgroundImage:'radial-gradient(circle,rgba(0,0,0,0.2) 0.8px,transparent 0.8px)', backgroundSize:'18px 18px' }} />
      <div style={{ position:'relative', width:'100%', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65, ease:[0.4,0,0.2,1], delay:0.05 }}
          style={{ position:'relative', zIndex:0, fontFamily:f, fontSize:'clamp(3rem,6.5vw,6rem)', fontWeight:700, letterSpacing:'-0.04em', lineHeight:1.0, color:'hsl(0,0%,8%)', whiteSpace:'nowrap', textAlign:'center', pointerEvents:'none', margin:0, userSelect:'none', marginTop:'-5vh' }}>
          I design <em style={{ fontFamily:fs, fontStyle:'italic', fontWeight:300 }}>and</em> ship. Fast.
        </motion.h2>
        <motion.div {...fly(0.08,-30,-5)} style={{ ...card, position:'absolute', top:'6%', left:'2%', padding:'12px 12px 20px', zIndex:4 }}>
          <div style={{ width:148, height:148, borderRadius:12, overflow:'hidden', background:'#DDD8FB' }}>
            <img src="/deepak.png" alt="Deepak" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
          </div>
          <p style={{ marginTop:8, textAlign:'center', fontFamily:f, fontSize:11, color:'hsl(0,0%,50%)', letterSpacing:'0.04em' }}>Deepak Maan · Mumbai</p>
        </motion.div>
        <motion.div {...fly(0.16,-20,4)} style={{ ...card, position:'absolute', top:'52%', left:'2%', padding:'18px 22px', whiteSpace:'nowrap', zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 4px' }}>Mumbai, IN</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:6 }}>
            <span style={{ fontFamily:f, fontSize:32, fontWeight:300, letterSpacing:'-0.02em', color:'hsl(0,0%,8%)', lineHeight:1 }}>{istTime.split(' ')[0]}</span>
            <span style={{ fontFamily:f, fontSize:9, color:'hsl(0,0%,55%)', marginBottom:3, textTransform:'uppercase', letterSpacing:'0.1em' }}>{istTime.split(' ')[1]}</span>
          </div>
          <p style={{ fontFamily:f, fontSize:9, color:'hsl(0,0%,55%)', margin:'4px 0 0' }}>IST · UTC+5:30</p>
        </motion.div>
        <motion.div {...fly(0.12,-18,-7)} style={{ position:'absolute', bottom:'10%', left:'3%', zIndex:4 }}>
          <div style={{ background:'rgba(255,243,205,0.97)', border:'1px solid rgba(240,192,64,0.4)', borderRadius:12, padding:'12px 16px', color:'#7a5c00' }}>
            <p style={{ fontFamily:f, fontSize:12, lineHeight:1.5, margin:0 }}>Currently building<br/><strong>with AI + design</strong></p>
          </div>
        </motion.div>
        <motion.div {...fly(0.10,-24,3)} style={{ position:'absolute', top:'4%', left:'22%', zIndex:4 }}>
          <div style={{ background:'rgba(18,18,18,0.94)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:18, width:228, boxShadow:'0 12px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <img src="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png" alt="" style={{ width:40, height:40, borderRadius:8, objectFit:'cover', flexShrink:0 }} onError={e=>{ (e.target as HTMLImageElement).style.background='#444' }} />
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:f, fontSize:13, fontWeight:600, color:'white', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Breathe</p>
                <p style={{ fontFamily:f, fontSize:11, color:'rgba(255,255,255,0.45)', margin:'2px 0 0' }}>Pink Floyd</p>
              </div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:14 }}>
                {[1.2,0.5,1.0,0.4,0.8].map((h,i)=>(
                  <span key={i} style={{ width:2, borderRadius:1, background:'rgba(255,255,255,0.65)', height:12, transformOrigin:'center bottom', animation:playing?`bar ${0.8+i*0.15}s ease-in-out ${i*0.1}s infinite alternate`:'none', transform:playing?undefined:`scaleY(${h*0.4})` }} />
                ))}
              </div>
            </div>
            <div style={{ height:3, background:'rgba(255,255,255,0.12)', borderRadius:2, marginBottom:8 }}><div style={{ width:'42%', height:'100%', background:'rgba(255,255,255,0.7)', borderRadius:2 }} /></div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.28)' }}>2:43</span>
              <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.28)' }}>5:57</span>
            </div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:20 }}>
              <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.35)', cursor:'pointer', fontSize:14 }}>⏮</button>
              <button onClick={()=>setPlaying(!playing)} style={{ width:34, height:34, borderRadius:'50%', background:'white', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'hsl(0,0%,8%)', fontSize:13, flexShrink:0 }}>{playing?'⏸':'▶'}</button>
              <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.35)', cursor:'pointer', fontSize:14 }}>⏭</button>
            </div>
          </div>
        </motion.div>
        <motion.div {...fly(0.13,-18,-4)} style={{ position:'absolute', top:'14%', left:'46%', zIndex:4, cursor:'pointer' }} onClick={()=>window.open('https://cal.com/deepakmaan','_blank')}>
          <div style={{ ...card, padding:'18px 22px', width:200 }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 12px' }}>Open to work</p>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(0,0%,8%)" strokeWidth="2" style={{ flexShrink:0 }}><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
              <div><p style={{ fontFamily:f, fontSize:15, fontWeight:600, color:'hsl(0,0%,8%)', margin:0 }}>Book a call</p><p style={{ fontFamily:f, fontSize:10, color:'hsl(0,0%,55%)', margin:'2px 0 0' }}>Schedule 30 min</p></div>
            </div>
          </div>
        </motion.div>
        <motion.div {...fly(0.14,-20,6)} style={{ position:'absolute', top:'4%', right:'2%', zIndex:4 }}>
          <div style={{ background:'rgba(52,199,142,0.95)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:16, padding:'20px 22px', width:204, color:'#0a2e22', boxShadow:'0 4px 24px rgba(0,0,0,0.1)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#0a2e22', opacity:0.55, flexShrink:0 }} />
              <span style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', opacity:0.55 }}>Available now</span>
            </div>
            <div style={{ height:1, background:'rgba(10,46,34,0.12)', marginBottom:12 }} />
            <p style={{ fontFamily:f, fontSize:15, fontWeight:600, margin:'0 0 10px' }}>Product Designer</p>
            {['Hyderabad','Bangalore','Remote'].map(l=>(
              <div key={l} style={{ display:'flex', gap:8, marginBottom:5, alignItems:'center' }}>
                <span style={{ fontFamily:f, fontSize:11, opacity:0.45 }}>→</span>
                <span style={{ fontFamily:f, fontSize:11 }}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...fly(0.20,-16,-6)} style={{ position:'absolute', top:'48%', right:'2%', zIndex:4, cursor:'pointer' }} onClick={()=>window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing','_blank')}>
          <div style={{ background:'rgba(255,224,88,0.97)', border:'1px solid rgba(58,46,0,0.12)', borderRadius:16, padding:'18px 22px', width:178, color:'#3a2e00', boxShadow:'0 4px 20px rgba(0,0,0,0.09)' }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', opacity:0.55, margin:'0 0 10px' }}>CV</p>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
              <div><p style={{ fontFamily:f, fontSize:14, fontWeight:600, lineHeight:1.2, margin:0 }}>Resume</p><p style={{ fontFamily:f, fontSize:10, opacity:0.55, margin:'2px 0 0' }}>PDF · 1 page</p></div>
            </div>
          </div>
        </motion.div>
        <motion.div {...fly(0.17,-19,5)} style={{ ...card, position:'absolute', top:'60%', left:'18%', padding:'18px 20px', zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 12px' }}>Interests</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, maxWidth:252 }}>
            {INTERESTS.map(i=><span key={i} style={{ padding:'4px 11px', borderRadius:9999, border:'1px solid hsl(0,0%,86%)', fontSize:11, color:'hsl(0,0%,32%)', fontFamily:f }}>{i}</span>)}
          </div>
        </motion.div>
        <motion.div {...fly(0.19,-22,-4)} style={{ ...card, position:'absolute', bottom:'8%', left:'18%', padding:'18px 22px', textAlign:'center', minWidth:168, zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 12px' }}>{rated?'Thanks! 🎉':'Rate this portfolio'}</p>
          <div style={{ display:'flex', gap:2, justifyContent:'center' }}>
            {[1,2,3,4,5].map(s=>(
              <button key={s} onMouseEnter={()=>!rated&&setHover(s)} onMouseLeave={()=>!rated&&setHover(0)} onClick={()=>{ if(!rated){ setRating(s); setRated(true) } }}
                style={{ fontSize:24, background:'none', border:'none', cursor:rated?'default':'pointer', padding:'0 2px', lineHeight:1, color:(hover||rating)>=s?'#FABE15':'hsl(0,0%,82%)', transition:'color 0.1s' }}>★</button>
            ))}
          </div>
        </motion.div>
        <motion.div {...fly(0.22,-26,7)} className="folder-group" style={{ position:'absolute', bottom:'4%', left:'40%', cursor:'pointer', zIndex:4 }} onClick={()=>window.location.href='/writings'}>
          <div style={{ position:'relative', width:196, height:136, perspective:1500 }}>
            <div style={{ position:'absolute', bottom:'99%', left:0, width:70, height:14, background:'#d97706', borderRadius:'8px 8px 0 0' }} />
            <div style={{ position:'absolute', bottom:'99%', left:66, width:12, height:12, background:'#d97706', clipPath:'polygon(0 35%,0 100%,50% 100%)' }} />
            {[{cls:'sheet1'},{cls:'sheet2'},{cls:'sheet3'}].map(s=>(
              <div key={s.cls} className={`folder-sheet ${s.cls}`} style={{ position:'absolute', inset:4, background:'white', borderRadius:10, border:'1px solid #e5e7eb', display:'flex', flexDirection:'column', gap:8, padding:14 }}>
                <div style={{ width:34, height:4, background:'#d1d5db', borderRadius:2 }} />
                <div style={{ width:'68%', height:4, background:'#9ca3af', borderRadius:2 }} />
                <div style={{ marginTop:'auto', width:'100%', height:4, background:'#e5e7eb', borderRadius:2 }} />
              </div>
            ))}
            <div className="folder-front" style={{ position:'absolute', bottom:0, width:'100%', height:'95%', background:'linear-gradient(to bottom,#f59e0b,#d97706)', borderRadius:'0 12px 12px 12px' }}>
              <div style={{ position:'absolute', bottom:'99%', right:0, width:118, height:14, background:'#f59e0b', borderRadius:'12px 12px 0 0' }} />
              <div style={{ position:'absolute', bottom:'99%', right:114, width:12, height:10, background:'#f59e0b', clipPath:'polygon(100% 14%,50% 100%,100% 100%)' }} />
            </div>
          </div>
          <p style={{ marginTop:18, textAlign:'center', fontFamily:f, fontSize:11, textTransform:'uppercase', letterSpacing:'0.1em', color:'hsl(0,0%,55%)' }}>My Writings</p>
        </motion.div>
        <motion.div {...fly(0.21,-16,-5)} style={{ ...card, position:'absolute', bottom:'4%', left:'62%', padding:'16px', width:172, zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 10px' }}>Currently reading</p>
          <div style={{ width:'100%', borderRadius:8, overflow:'hidden', marginBottom:10, aspectRatio:'2/3', background:'#f0f0f0' }}>
            <img src="https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{ (e.target as HTMLImageElement).style.background='#ddd' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ flex:1, height:4, background:'hsl(0,0%,88%)', borderRadius:2, overflow:'hidden' }}><div style={{ width:'62%', height:'100%', background:'hsl(0,0%,40%)', borderRadius:2 }} /></div>
            <span style={{ fontFamily:f, fontSize:10, color:'hsl(0,0%,55%)' }}>62%</span>
          </div>
        </motion.div>
        <motion.div {...fly(0.26,-24,8)} style={{ position:'absolute', bottom:'8%', right:'2%', zIndex:4, cursor:'pointer' }} onClick={()=>window.open('https://linkedin.com/in/deepakmaan25','_blank')}>
          <div style={{ background:'rgba(10,102,194,0.95)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:16, padding:'18px 22px', width:190, boxShadow:'0 4px 20px rgba(0,0,0,0.14)' }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.45)', margin:'0 0 10px' }}>Find me online</p>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/></svg>
              <div><p style={{ fontFamily:f, fontSize:14, fontWeight:600, color:'white', lineHeight:1.2, margin:0 }}>LinkedIn</p><p style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.55)', margin:'2px 0 0' }}>/in/deepakmaan25</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const MobileWidgetStack = ({ istTime, playing, setPlaying, rating, hover, rated, setHover, setRating, setRated }: any) => {
  const card = { background:'rgba(255,255,255,0.96)', border:'1px solid rgba(0,0,0,0.07)', borderRadius:18, boxShadow:'0 4px 24px rgba(0,0,0,0.05)' }
  const fly = (i:number) => ({ initial:{ opacity:0, y:18, scale:0.96 }, whileInView:{ opacity:1, y:0, scale:1 }, viewport:{ once:true, margin:'-20px' }, transition:{ type:'spring' as const, stiffness:240, damping:24, delay:i*0.05 } })

  return (
    <>
      <motion.div {...fly(0)} style={{ ...card, padding:'22px 22px', display:'flex', alignItems:'center', gap:16 }}>
        <div style={{ width:80, height:80, borderRadius:14, overflow:'hidden', background:'#DDD8FB', flexShrink:0 }}>
          <img src="/deepak.png" alt="Deepak" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e' }} />
            <span style={{ fontFamily:f, fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:'#15803d', fontWeight:600 }}>Available</span>
          </div>
          <p style={{ fontFamily:f, fontSize:17, fontWeight:600, color:'hsl(0,0%,8%)', margin:0, letterSpacing:'-0.01em' }}>Deepak Maan</p>
          <p style={{ fontFamily:f, fontSize:13, color:'hsl(0,0%,50%)', margin:'2px 0 0' }}>Product Designer · Mumbai</p>
        </div>
      </motion.div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <motion.div {...fly(1)} style={{ ...card, padding:'16px 18px' }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.14em', color:'hsl(0,0%,55%)', margin:'0 0 6px' }}>IST</p>
          <p style={{ fontFamily:f, fontSize:22, fontWeight:300, letterSpacing:'-0.02em', color:'hsl(0,0%,8%)', margin:0, lineHeight:1 }}>{istTime.split(' ')[0]}</p>
          <p style={{ fontFamily:f, fontSize:10, color:'hsl(0,0%,55%)', margin:'4px 0 0' }}>{istTime.split(' ')[1]} · UTC+5:30</p>
        </motion.div>
        <motion.div {...fly(2)} style={{ background:'rgba(255,243,205,0.97)', border:'1px solid rgba(240,192,64,0.4)', borderRadius:18, padding:'16px 18px', color:'#7a5c00' }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.14em', opacity:0.7, margin:'0 0 6px' }}>Building</p>
          <p style={{ fontFamily:f, fontSize:14, fontWeight:600, margin:0, lineHeight:1.3 }}>AI + design tools</p>
        </motion.div>
      </div>
      <motion.div {...fly(3)} style={{ background:'linear-gradient(135deg, #1a1a1a, #0f0f0f)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:18, boxShadow:'0 12px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <img src="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png" alt="" style={{ width:48, height:48, borderRadius:8, objectFit:'cover', flexShrink:0 }} onError={e=>{ (e.target as HTMLImageElement).style.background='#444' }} />
          <div style={{ flex:1, minWidth:0 }}>
            <p style={{ fontFamily:f, fontSize:14, fontWeight:600, color:'white', margin:0 }}>Breathe</p>
            <p style={{ fontFamily:f, fontSize:11, color:'rgba(255,255,255,0.5)', margin:'2px 0 0' }}>Pink Floyd</p>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:16 }}>
            {[1.2,0.5,1.0,0.4,0.8].map((h,i) => (
              <span key={i} style={{ width:2.5, borderRadius:1, background:'rgba(255,255,255,0.7)', height:14, transformOrigin:'center bottom', animation:playing?`bar ${0.8+i*0.15}s ease-in-out ${i*0.1}s infinite alternate`:'none', transform:playing?undefined:`scaleY(${h*0.4})` }} />
            ))}
          </div>
        </div>
        <div style={{ height:3, background:'rgba(255,255,255,0.12)', borderRadius:2, marginBottom:10 }}>
          <div style={{ width:'42%', height:'100%', background:'rgba(255,255,255,0.8)', borderRadius:2 }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.4)' }}>2:43</span>
          <div style={{ display:'flex', alignItems:'center', gap:18 }}>
            <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.45)', cursor:'pointer', fontSize:15, padding:0 }}>⏮</button>
            <button onClick={()=>setPlaying(!playing)} style={{ width:38, height:38, borderRadius:'50%', background:'white', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'hsl(0,0%,8%)', fontSize:14 }}>{playing?'⏸':'▶'}</button>
            <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.45)', cursor:'pointer', fontSize:15, padding:0 }}>⏭</button>
          </div>
          <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.4)' }}>5:57</span>
        </div>
      </motion.div>
      <motion.div {...fly(4)} onClick={()=>window.open('https://cal.com/deepakmaan','_blank')}
        style={{ ...card, padding:'18px 20px', cursor:'pointer', display:'flex', alignItems:'center', gap:14 }}>
        <div style={{ width:42, height:42, borderRadius:11, background:'hsl(0,0%,8%)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
        </div>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:f, fontSize:15, fontWeight:600, color:'hsl(0,0%,8%)', margin:0 }}>Book a call</p>
          <p style={{ fontFamily:f, fontSize:12, color:'hsl(0,0%,55%)', margin:'2px 0 0' }}>30 min via Cal.com</p>
        </div>
        <span style={{ fontSize:18, color:'hsl(0,0%,40%)' }}>↗</span>
      </motion.div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <motion.div {...fly(5)} onClick={()=>window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing','_blank')}
          style={{ background:'linear-gradient(135deg, #FFE058, #FFD23F)', border:'1px solid rgba(58,46,0,0.12)', borderRadius:18, padding:'18px 18px', color:'#3a2e00', cursor:'pointer', minHeight:106, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
            <span style={{ fontSize:16 }}>↗</span>
          </div>
          <div>
            <p style={{ fontFamily:f, fontSize:15, fontWeight:600, margin:0 }}>Resume</p>
            <p style={{ fontFamily:f, fontSize:11, opacity:0.7, margin:'2px 0 0' }}>PDF · 1 page</p>
          </div>
        </motion.div>
        <motion.div {...fly(6)} onClick={()=>window.open('https://linkedin.com/in/deepakmaan','_blank')}
          style={{ background:'linear-gradient(135deg, #0a66c2, #084d8f)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:18, padding:'18px 18px', color:'white', cursor:'pointer', minHeight:106, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/></svg>
            <span style={{ fontSize:16 }}>↗</span>
          </div>
          <div>
            <p style={{ fontFamily:f, fontSize:15, fontWeight:600, margin:0 }}>LinkedIn</p>
            <p style={{ fontFamily:f, fontSize:11, opacity:0.7, margin:'2px 0 0' }}>/in/deepakmaan</p>
          </div>
        </motion.div>
      </div>
      <motion.div {...fly(7)} style={{ ...card, padding:'18px 20px', display:'flex', gap:14, alignItems:'center' }}>
        <div style={{ width:54, height:78, borderRadius:6, overflow:'hidden', flexShrink:0, background:'#f0f0f0', boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }}>
          <img src="https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{ (e.target as HTMLImageElement).style.background='#ddd' }} />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.14em', color:'hsl(0,0%,55%)', margin:'0 0 6px' }}>Reading</p>
          <p style={{ fontFamily:f, fontSize:15, fontWeight:600, color:'hsl(0,0%,8%)', margin:'0 0 8px', letterSpacing:'-0.01em' }}>The Alchemist</p>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ flex:1, height:3, background:'hsl(0,0%,90%)', borderRadius:2, overflow:'hidden' }}><div style={{ width:'62%', height:'100%', background:'hsl(0,0%,30%)', borderRadius:2 }} /></div>
            <span style={{ fontFamily:f, fontSize:10, color:'hsl(0,0%,55%)' }}>62%</span>
          </div>
        </div>
      </motion.div>
      <motion.div {...fly(8)} onClick={()=>window.location.href='/writings'}
        style={{ ...card, padding:'18px 20px', cursor:'pointer', display:'flex', alignItems:'center', gap:14 }}>
        <div style={{ position:'relative', width:48, height:36, flexShrink:0 }}>
          <div style={{ position:'absolute', top:-5, left:0, width:22, height:7, background:'#d97706', borderRadius:'4px 4px 0 0' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, #f59e0b, #d97706)', borderRadius:'2px 8px 8px 8px', boxShadow:'0 2px 6px rgba(217,119,6,0.3)' }} />
        </div>
        <div style={{ flex:1 }}>
          <p style={{ fontFamily:f, fontSize:15, fontWeight:600, color:'hsl(0,0%,8%)', margin:0 }}>Writings</p>
          <p style={{ fontFamily:f, fontSize:12, color:'hsl(0,0%,55%)', margin:'2px 0 0' }}>Notes on shipping & design</p>
        </div>
        <span style={{ color:'hsl(0,0%,45%)', fontSize:18 }}>→</span>
      </motion.div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <motion.div {...fly(9)} style={{ ...card, padding:'16px 16px' }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.14em', color:'hsl(0,0%,55%)', margin:'0 0 10px' }}>Interests</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {INTERESTS.slice(0,4).map(i=><span key={i} style={{ padding:'3px 9px', borderRadius:9999, border:'1px solid hsl(0,0%,86%)', fontSize:10, color:'hsl(0,0%,32%)', fontFamily:f }}>{i}</span>)}
          </div>
        </motion.div>
        <motion.div {...fly(10)} style={{ ...card, padding:'16px 16px', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.14em', color:'hsl(0,0%,55%)', margin:'0 0 8px' }}>{rated?'Thanks!':'Rate'}</p>
          <div style={{ display:'flex', gap:2, justifyContent:'center' }}>
            {[1,2,3,4,5].map(s=>(
              <button key={s} onClick={()=>{ if(!rated){ setRating(s); setRated(true) } }}
                style={{ fontSize:20, background:'none', border:'none', cursor:rated?'default':'pointer', padding:'0 1px', lineHeight:1, color:(hover||rating)>=s?'#FABE15':'hsl(0,0%,82%)' }}>★</button>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
