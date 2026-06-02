import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message { role:'user'|'assistant'; content:string }

const QUICK_ACTIONS = [
  { label:'see my work',               icon:'down', query:'see my work',                    scroll:true  },
  { label:'how do you ship?',          icon:null,   query:'how do you ship?',               scroll:false },
  { label:'what designer are you?',    icon:null,   query:'what kind of designer are you?', scroll:false },
  { label:"what's your availability?", icon:null,   query:"what's your availability?",      scroll:false },
  { label:'wanna chat?',               icon:'out',  query:'wanna chat?',                    scroll:false },
  { label:'resume',                    icon:'out',  query:'resume',                         scroll:false },
  { label:'linkedin',                  icon:'out',  query:'linkedin',                       scroll:false },
]

const SYSTEM_PROMPT = `You are Deepak Maan, speaking directly as yourself on your portfolio site. Be natural, specific, and human — not a generic assistant. Short answers unless the question needs more. No bullet points, no headers, no markdown. Just talk.

WHO YOU ARE:
Product designer based in Mumbai. IIT ISM Dhanbad grad. Currently at JSW Steel as a Product Designer and Design Analyst. You design end-to-end — research, information architecture, high-fidelity Figma, and you also ship the front-end yourself in React + TypeScript using Claude Code. No handoff, no translation loss.

YOUR WORK:
- Tech Japan / Talendy: UX research internship. Ran 10 interviews across 6 IITs, documented 9 pain points, designed fixes — job description layout, dark mode accessibility, multiple resume management, built-in communication tool replacing WhatsApp. Several shipped to production. Also ran a rebranding survey (71% of users hadn't heard about the rebrand) and designed a recruiter-side hiring dashboard.
- Buzztro: Designed the full product from 0 to 1 for a social polling startup. Founder is Sourabh Choudhary.
- Zu-AI: Redesigned the chat experience for an AI tutoring app. Solo assessment project.
- Shipped side projects: Music Animation Generator, PulsePlay, TypMatch, Kairo Design System.

YOUR PROCESS:
You think in problems, not deliverables. You start with why something is broken before touching Figma. You use research to find the real issue, not confirm assumptions. You can build what you design — which means you catch things in code that wouldn't surface in a handoff.

AVAILABILITY:
Open to full-time Product Design roles. Hyderabad, Bangalore, or Remote. Available now.

CONTACT:
Resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing
LinkedIn: https://linkedin.com/in/deepakmaan25
Email: deepak.maan@email.com

TONE RULES:
- First person always. "I" not "Deepak".
- Sound like a real person, not a chatbot or a LinkedIn bio.
- If asked about resume or LinkedIn, give the link directly.
- If asked to "see my work" scroll them down.
- If someone asks something unrelated to your work or background, say: "I'm really only here to talk about my work and background — happy to answer anything about that though."
- If someone asks what you're like to work with, be honest and specific — not generic.
- Keep answers to 2-4 sentences unless the question genuinely needs more detail.`

const INTERESTS = ['Product Design','UX Research','Design Systems','Vibe Coding','Cricket','Music']
const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

export default function HomePage() {
  const [messages, setMessages]       = useState<Message[]>([])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [time, setTime]               = useState(new Date())
  const [playing, setPlaying]         = useState(true)
  const chatEndRef                    = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])
  useEffect(() => { if (messages.length > 0) { chatEndRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' }) } }, [messages])

  const istTime = time.toLocaleTimeString('en-IN', { timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true })

  const send = async (text:string) => {
    if (!text.trim() || loading) return
    if (text==='see my work') { document.getElementById('work')?.scrollIntoView({ behavior:'smooth' }); return }
    if (text==='resume')      { window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing','_blank'); return }
    if (text==='linkedin')    { window.open('https://linkedin.com/in/deepakmaan25','_blank'); return }
    if (text==='wanna chat?') { window.open('mailto:deepak.maan@email.com','_blank'); return }
    const updated = [...messages, { role:'user' as const, content:text }]
    setMessages(updated); setInput(''); setLoading(true); setChatStarted(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST', headers:{ 'Content-Type':'application/json', 'anthropic-version':'2023-06-01', 'anthropic-dangerous-direct-browser-access':'true' },
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:400, system:SYSTEM_PROMPT, messages:updated }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role:'assistant', content:data.content?.[0]?.text ?? 'Something went wrong.' }])
    } catch { setMessages(prev => [...prev, { role:'assistant', content:'Something went wrong — try again.' }]) }
    finally { setLoading(false) }
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
        .bl1{animation:b1 20s linear infinite;transform-origin:center center}
        .bl2{animation:b2 18s linear infinite;transform-origin:calc(50% - 400px)}
        .bl3{animation:b3 22s linear infinite;transform-origin:calc(50% + 400px)}
        .bl4{animation:b4 16s linear infinite;transform-origin:calc(50% - 200px) calc(50% + 400px)}
        .bl5{animation:b5 24s linear infinite;transform-origin:calc(50% - 800px) calc(50% + 200px)}
        @keyframes bar{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}
        .folder-sheet{transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1)}
        .folder-group:hover .sheet1{transform:translate(-14px,-30px) rotate(-7deg)}
        .folder-group:hover .sheet2{transform:translate(14px,-45px) rotate(5deg)}
        .folder-group:hover .sheet3{transform:translate(-4px,-65px) rotate(-3deg) scale(1.02)}
        .folder-group:hover .folder-front{transform:rotateX(-46deg) translateY(1px)}
        .folder-front{transition:transform 0.3s;transform-origin:bottom}
        .work-section-bg {
          background-color: hsl(0,0%,97%);
          background-image: radial-gradient(circle, rgba(0,0,0,0.1) 0.8px, transparent 0.8px);
          background-size: 18px 18px;
        }
      `}</style>

      <div className="relative isolate overflow-x-clip" style={{ backgroundColor:'hsl(0,0%,98%)', color:'hsl(0,0%,8%)', fontFamily:f }}>

        {/* ─── HERO ─── */}
        <div style={{ position:'relative', minHeight:'100svh', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 overflow-hidden">
            <div className="absolute inset-0" style={{ background:'linear-gradient(40deg,hsl(240,60%,99%),hsl(230,80%,97%))' }}>
              <svg className="hidden"><defs><filter id="g4"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="g"/><feBlend in="SourceGraphic" in2="g"/></filter></defs></svg>
              <div className="h-full w-full" style={{ filter:'url(#g4) blur(40px)' }}>
                {[['bl1','56,100,255',1],['bl2','120,60,220',1],['bl3','30,160,255',1],['bl4','160,60,255',0.7],['bl5','40,120,255',1]].map(([c,col,o])=>(
                  <div key={c as string} className={c as string} style={{ position:'absolute', background:`radial-gradient(circle at center,rgba(${col},0.35) 0,rgba(${col},0) 50%) no-repeat`, mixBlendMode:'screen' as any, width:'80%', height:'80%', top:'10%', left:'10%', opacity:o as number }} />
                ))}
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background:'rgba(250,250,248,0.55)' }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(to bottom,transparent 55%,hsl(0,0%,97%))' }} />
          </div>

          <div style={{ maxWidth:1152, margin:'0 auto', padding:'0 40px', width:'100%' }}>
            <AnimatePresence>
              {!chatStarted && (
                <motion.div key="headline"
                  initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-12, transition:{ duration:0.3, ease:[0.4,0,1,1] } }}
                  transition={{ duration:0.6, ease:[0.4,0,0.2,1] }}
                  style={{ maxWidth:920, margin:'0 auto 44px' }}>
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span className="relative shrink-0" style={{ marginTop:7 }}>
                      <span style={{ display:'block', width:36, height:36, borderRadius:'50%', overflow:'hidden', background:'#DDD8FB', boxShadow:'0 0 0 2px white,0 1px 4px rgba(0,0,0,0.1)' }}>
                        <img src="/photo.jpg" alt="Deepak" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
                      </span>
                      <span style={{ position:'absolute', width:10, height:10, borderRadius:'50%', background:'#4ade80', bottom:1, right:0, boxShadow:'0 0 0 2px white' }} />
                    </span>
                    <div style={{ fontFamily:f, fontWeight:500, lineHeight:1.15, letterSpacing:'-0.025em', color:'hsl(0,0%,8%)' }}>
                      <div style={{ fontSize:'clamp(1.9rem,3.2vw,3.4rem)', whiteSpace:'nowrap' }}>
                        I'm{' '}
                        <span style={{ position:'relative', display:'inline-block', padding:'0 9px' }}>
                          <span style={{ position:'absolute', inset:0, borderLeft:'2px solid rgba(99,102,241,0.45)', borderRight:'2px solid rgba(99,102,241,0.45)', background:'rgba(99,102,241,0.08)', borderRadius:2 }} />
                          <span style={{ position:'absolute', width:5, height:5, borderRadius:'50%', background:'rgb(99,102,241)', top:0, left:0, transform:'translate(-50%,-50%)' }} />
                          <span style={{ position:'absolute', width:5, height:5, borderRadius:'50%', background:'rgb(99,102,241)', bottom:0, right:0, transform:'translate(50%,50%)' }} />
                          <span style={{ position:'relative' }}>Deepak Maan</span>
                        </span>
                        {' '}&ndash; based in Mumbai.
                      </div>
                      <div style={{ fontSize:'clamp(1.9rem,3.2vw,3.4rem)', whiteSpace:'nowrap', marginTop:6 }}>
                        I design and ship product UX,{' '}
                        <span style={{ fontFamily:fs, fontStyle:'italic', fontWeight:300, display:'inline-block', whiteSpace:'nowrap' }}>end to end.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ maxWidth:920, margin:'0 auto' }}>
              <AnimatePresence>
                {chatStarted && (
                  <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                    style={{ marginBottom:16, maxHeight:320, overflowY:'auto', display:'flex', flexDirection:'column', gap:12 }}>
                    {messages.map((msg,i) => (
                      <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                        style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start', alignItems:'flex-end', gap:8 }}>
                        {msg.role==='assistant' && (
                          <span style={{ width:28, height:28, borderRadius:'50%', background:'#DDD8FB', flexShrink:0, overflow:'hidden', display:'inline-block', boxShadow:'0 0 0 2px white' }}>
                            <img src="/photo.jpg" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
                          </span>
                        )}
                        <div style={{ maxWidth:480, padding:'11px 17px', borderRadius:18, fontSize:14.5, lineHeight:1.6, fontFamily:f,
                          ...(msg.role==='user'
                            ? { background:'hsl(0,0%,10%)', color:'white', borderBottomRightRadius:5 }
                            : { background:'white', color:'hsl(0,0%,8%)', border:'1px solid hsl(0,0%,88%)', borderBottomLeftRadius:5, boxShadow:'0 1px 6px rgba(0,0,0,0.06)' })
                        }}>{msg.content}</div>
                      </motion.div>
                    ))}
                    {loading && (
                      <div style={{ display:'flex', alignItems:'flex-end', gap:8 }}>
                        <span style={{ width:28, height:28, borderRadius:'50%', background:'#DDD8FB', flexShrink:0, boxShadow:'0 0 0 2px white' }} />
                        <div style={{ background:'white', border:'1px solid hsl(0,0%,88%)', borderRadius:18, borderBottomLeftRadius:5, padding:'12px 17px', boxShadow:'0 1px 6px rgba(0,0,0,0.06)' }}>
                          <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                            {[0,150,300].map(d=><span key={d} className="animate-bounce" style={{ width:6, height:6, borderRadius:'50%', background:'#ccc', display:'inline-block', animationDelay:`${d}ms` }} />)}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.14 }} style={{ marginBottom:18 }}>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', marginBottom:8 }}>
                  {QUICK_ACTIONS.slice(0,4).map(a => <Pill key={a.label} a={a} send={send} />)}
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
                  {QUICK_ACTIONS.slice(4).map(a => <Pill key={a.label} a={a} send={send} />)}
                </div>
              </motion.div>

              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.24 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, borderRadius:16, padding:'13px 18px', background:'rgba(255,255,255,0.88)', backdropFilter:'blur(14px)', border:'1px solid hsl(0,0%,88%)', boxShadow:'0 1px 8px rgba(0,0,0,0.05)' }}>
                  <span style={{ color:'hsl(0,0%,55%)', fontFamily:'monospace', fontSize:13, userSelect:'none' }}>›_</span>
                  <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(input)}
                    placeholder="ask Deepak anything…"
                    style={{ flex:1, background:'transparent', border:'none', outline:'none', fontSize:15, color:'hsl(0,0%,8%)', fontFamily:f }}
                  />
                  <button onClick={()=>send(input)} disabled={loading||!input.trim()}
                    style={{ width:32, height:32, borderRadius:'50%', background:'hsl(0,0%,8%)', border:'none', cursor:input.trim()?'pointer':'default', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, opacity:input.trim()?1:0.3, transition:'opacity 0.15s' }}>
                    <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:14, height:14 }}><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                  </button>
                </div>
                <p style={{ textAlign:'center', fontSize:12, color:'hsl(0,0%,55%)', marginTop:12, fontFamily:f }}>
                  Yes, this is a bot — but I monitor every message.{' '}
                  <a href="mailto:deepak.maan@email.com" style={{ color:'inherit', textDecoration:'underline', textUnderlineOffset:2 }}>Email me</a>
                  {' '}or{' '}
                  <a href="https://linkedin.com/in/deepakmaan25" target="_blank" rel="noopener noreferrer" style={{ color:'inherit', textDecoration:'underline', textUnderlineOffset:2 }}>DM on LinkedIn</a>.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── WORK ─── */}
        <div id="work" className="work-section-bg" style={{ scrollMarginTop:64 }}>
          <div style={{ maxWidth:1152, margin:'0 auto', padding:'96px 40px 120px' }}>
            <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ fontFamily:f, fontSize:11, fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'hsl(0,0%,50%)', marginBottom:56 }}>
              Selected work
            </motion.p>
            <div style={{ display:'flex', flexDirection:'column', gap:112 }}>
              <CaseRow title="Tech Japan (Talendy) – UX Research & Redesign"
                desc="Ran 10 user interviews across 6 IITs, documented 9 pain points, and shipped fixes to production – job description layout, dark mode accessibility, multiple resume management, and a built-in communication tool."
                metric="80%" metricLabel="improved navigation" slug="tech-japan"
                image="/src/assets/case-study-1.jpg" bg="hsl(222,100%,96%)" />
              <CaseRow title="Buzztro – Social Polling App Design"
                desc="Designed the complete product experience for a social polling startup from 0 to 1. Research, information architecture, and high-fidelity design across the platform."
                metric="0→1" metricLabel="product shipped" slug="buzztro"
                image="/src/assets/case-study-2.jpg" bg="hsl(30,100%,95%)" />
            </div>
          </div>
        </div>

        <Widgets istTime={istTime} playing={playing} setPlaying={setPlaying} />
      </div>
    </>
  )
}

const Pill = ({ a, send }: { a:typeof QUICK_ACTIONS[0]; send:(q:string)=>void }) => (
  <button onClick={()=>send(a.query)}
    className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white border transition-all duration-200"
    style={{ fontFamily:f, padding:'8px 16px', borderColor:'rgba(0,0,0,0.16)', boxShadow:'0 1px 3px rgba(0,0,0,0.05)', color:'hsl(0,0%,8%)', fontSize:14 }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor='hsl(0,0%,8%)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)' }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(0,0,0,0.16)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)' }}>
    <span>{a.label}</span>
    {a.icon==='down'&&<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity"><path d="M8 3v10M4 9l4 4 4-4"/></svg>}
    {a.icon==='out'&&<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity"><path d="M6 4h6v6M12 4 5 11"/></svg>}
  </button>
)

const CaseRow = ({ title,desc,metric,metricLabel,slug,image,bg }:{title:string;desc:string;metric:string;metricLabel:string;slug:string;image:string;bg:string}) => (
  <motion.article initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.55, ease:[0.4,0,0.2,1] }}
    style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'0 72px', alignItems:'start' }}>
    <div style={{ paddingTop:28 }}>
      <h3 style={{ fontFamily:f, fontSize:'clamp(1.15rem,1.6vw,1.4rem)', fontWeight:600, lineHeight:1.2, letterSpacing:'-0.02em', color:'hsl(0,0%,8%)', margin:0 }}>{title}</h3>
      <p style={{ fontFamily:f, fontSize:15, color:'hsl(0,0%,45%)', lineHeight:1.72, marginTop:18, maxWidth:360 }}>{desc}</p>
      <div style={{ display:'flex', alignItems:'baseline', gap:10, marginTop:26 }}>
        <span style={{ fontFamily:f, fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, color:'hsl(0,0%,8%)' }}>{metric}</span>
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
    <a href={`/case-study/${slug}`}
      style={{ display:'block', borderRadius:20, overflow:'hidden', background:bg, boxShadow:'0 6px 28px -8px rgba(0,0,0,0.14)', transition:'box-shadow 0.4s,transform 0.4s', textDecoration:'none' }}
      onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 20px 48px -8px rgba(0,0,0,0.22)'; (e.currentTarget as HTMLElement).style.transform='translateY(-3px)' }}
      onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 6px 28px -8px rgba(0,0,0,0.14)'; (e.currentTarget as HTMLElement).style.transform='translateY(0)' }}>
      <div style={{ aspectRatio:'16/10', overflow:'hidden' }}>
        <img src={image} alt={title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s cubic-bezier(0.25,1,0.5,1)' }}
          onMouseEnter={e=>{ (e.target as HTMLImageElement).style.transform='scale(1.04)' }}
          onMouseLeave={e=>{ (e.target as HTMLImageElement).style.transform='scale(1)' }}
          onError={e=>{ (e.target as HTMLImageElement).style.opacity='0' }} />
      </div>
    </a>
  </motion.article>
)

const Widgets = ({ istTime, playing, setPlaying }: { istTime:string; playing:boolean; setPlaying:(v:boolean)=>void }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover]   = useState(0)
  const [rated, setRated]   = useState(false)

  const card = {
    background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)',
    border:'1px solid rgba(0,0,0,0.07)', borderRadius:16, boxShadow:'0 2px 24px rgba(0,0,0,0.08)',
  }

  const fly = (delay:number, initRot:number, restRot:number) => ({
    initial:  { opacity:0, scale:0.18, rotate:initRot },
    whileInView: { opacity:1, scale:1, rotate:restRot },
    viewport: { once:true },
    transition: { type:'spring' as const, stiffness:155, damping:20, delay },
    whileHover: { scale:1.05, rotate: restRot * 0.25, zIndex:20, transition:{ type:'spring', stiffness:340, damping:18 } },
  })

  return (
    <section id="about" style={{ position:'relative', backgroundColor:'hsl(0,0%,93%)', minHeight:'100vh', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.4,
        backgroundImage:'radial-gradient(circle, rgba(0,0,0,0.2) 0.8px, transparent 0.8px)',
        backgroundSize:'18px 18px' }} />

      <div style={{ position:'relative', width:'100%', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>

        <motion.h2
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.65, ease:[0.4,0,0.2,1], delay:0.05 }}
         style={{ position:'relative', zIndex:0,
            fontFamily:f, fontSize:'clamp(3rem,6.5vw,6rem)', fontWeight:700,
            letterSpacing:'-0.04em', lineHeight:1.0, color:'hsl(0,0%,8%)',
            whiteSpace:'nowrap', textAlign:'center', pointerEvents:'none', margin:0, userSelect:'none',
            marginTop:'-5vh' }}>
          I design <em style={{ fontFamily:fs, fontStyle:'italic', fontWeight:300 }}>and</em> ship. Fast.
        </motion.h2>

        <motion.div {...fly(0.08, -30, -5)} style={{ ...card, position:'absolute', top:'6%', left:'2%', padding:'12px 12px 20px', zIndex:4 }}>
          <div style={{ width:148, height:148, borderRadius:12, overflow:'hidden', background:'#DDD8FB' }}>
            <img src="/photo.jpg" alt="Deepak" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
          </div>
          <p style={{ marginTop:8, textAlign:'center', fontFamily:f, fontSize:11, color:'hsl(0,0%,50%)', letterSpacing:'0.04em' }}>Deepak Maan · Mumbai</p>
        </motion.div>

        <motion.div {...fly(0.16, -20, 4)} style={{ ...card, position:'absolute', top:'52%', left:'2%', padding:'18px 22px', whiteSpace:'nowrap', zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 4px' }}>Mumbai, IN</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:6 }}>
            <span style={{ fontFamily:f, fontSize:32, fontWeight:300, letterSpacing:'-0.02em', color:'hsl(0,0%,8%)', lineHeight:1 }}>{istTime.split(' ')[0]}</span>
            <span style={{ fontFamily:f, fontSize:9, color:'hsl(0,0%,55%)', marginBottom:3, textTransform:'uppercase', letterSpacing:'0.1em' }}>{istTime.split(' ')[1]}</span>
          </div>
          <p style={{ fontFamily:f, fontSize:9, color:'hsl(0,0%,55%)', margin:'4px 0 0' }}>IST · UTC+5:30</p>
        </motion.div>

        <motion.div {...fly(0.12, -18, -7)} style={{ position:'absolute', bottom:'10%', left:'3%', zIndex:4 }}>
          <div style={{ background:'rgba(255,243,205,0.97)', border:'1px solid rgba(240,192,64,0.4)', borderRadius:12, padding:'12px 16px', color:'#7a5c00' }}>
            <p style={{ fontFamily:f, fontSize:12, lineHeight:1.5, margin:0 }}>Currently building<br/><strong>with AI + design</strong></p>
          </div>
        </motion.div>

        <motion.div {...fly(0.10, -24, 3)} style={{ position:'absolute', top:'4%', left:'22%', zIndex:4 }}>
          <div style={{ background:'rgba(18,18,18,0.94)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:18, padding:18, width:228, boxShadow:'0 12px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <img src="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png" alt="" style={{ width:40, height:40, borderRadius:8, objectFit:'cover', flexShrink:0 }} onError={e=>{ (e.target as HTMLImageElement).style.background='#444' }} />
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:f, fontSize:13, fontWeight:600, color:'white', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Breathe</p>
                <p style={{ fontFamily:f, fontSize:11, color:'rgba(255,255,255,0.45)', margin:'2px 0 0' }}>Pink Floyd</p>
              </div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:14 }}>
                {[1.2,0.5,1.0,0.4,0.8].map((h,i) => (
                  <span key={i} style={{ width:2, borderRadius:1, background:'rgba(255,255,255,0.65)', height:12, transformOrigin:'center bottom', animation: playing ? `bar ${0.8+i*0.15}s ease-in-out ${i*0.1}s infinite alternate` : 'none', transform: playing ? undefined : `scaleY(${h*0.4})` }} />
                ))}
              </div>
            </div>
            <div style={{ height:3, background:'rgba(255,255,255,0.12)', borderRadius:2, marginBottom:8 }}>
              <div style={{ width:'42%', height:'100%', background:'rgba(255,255,255,0.7)', borderRadius:2 }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.28)' }}>2:43</span>
              <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.28)' }}>5:57</span>
            </div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:20 }}>
              <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.35)', cursor:'pointer', fontSize:14 }}>⏮</button>
              <button onClick={()=>setPlaying(!playing)} style={{ width:34, height:34, borderRadius:'50%', background:'white', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'hsl(0,0%,8%)', fontSize:13, flexShrink:0 }}>
                {playing ? '⏸' : '▶'}
              </button>
              <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.35)', cursor:'pointer', fontSize:14 }}>⏭</button>
            </div>
          </div>
        </motion.div>

        <motion.div {...fly(0.13, -18, -4)} style={{ position:'absolute', top:'14%', left:'46%', zIndex:4, cursor:'pointer' }} onClick={()=>window.open('mailto:deepak.maan@email.com','_blank')}>
          <div style={{ ...card, padding:'18px 22px', width:200 }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 12px' }}>Open to work</p>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(0,0%,8%)" strokeWidth="2" style={{ flexShrink:0 }}><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
              <div>
                <p style={{ fontFamily:f, fontSize:15, fontWeight:600, color:'hsl(0,0%,8%)', margin:0 }}>Book a call</p>
                <p style={{ fontFamily:f, fontSize:10, color:'hsl(0,0%,55%)', margin:'2px 0 0' }}>Schedule 30 min</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fly(0.14, -20, 6)} style={{ position:'absolute', top:'4%', right:'2%', zIndex:4 }}>
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

        <motion.div {...fly(0.20, -16, -6)} style={{ position:'absolute', top:'48%', right:'2%', zIndex:4, cursor:'pointer' }} onClick={()=>window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing','_blank')}>
          <div style={{ background:'rgba(255,224,88,0.97)', border:'1px solid rgba(58,46,0,0.12)', borderRadius:16, padding:'18px 22px', width:178, color:'#3a2e00', boxShadow:'0 4px 20px rgba(0,0,0,0.09)' }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', opacity:0.55, margin:'0 0 10px' }}>CV</p>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
              <div>
                <p style={{ fontFamily:f, fontSize:14, fontWeight:600, lineHeight:1.2, margin:0 }}>Resume</p>
                <p style={{ fontFamily:f, fontSize:10, opacity:0.55, margin:'2px 0 0' }}>PDF · 1 page</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fly(0.17, -19, 5)} style={{ ...card, position:'absolute', top:'60%', left:'18%', padding:'18px 20px', zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 12px' }}>Interests</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, maxWidth:252 }}>
            {INTERESTS.map(i=><span key={i} style={{ padding:'4px 11px', borderRadius:9999, border:'1px solid hsl(0,0%,86%)', fontSize:11, color:'hsl(0,0%,32%)', fontFamily:f }}>{i}</span>)}
          </div>
        </motion.div>

        <motion.div {...fly(0.19, -22, -4)} style={{ ...card, position:'absolute', bottom:'8%', left:'18%', padding:'18px 22px', textAlign:'center', minWidth:168, zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 12px' }}>
            {rated ? 'Thanks! 🎉' : 'Rate this portfolio'}
          </p>
          <div style={{ display:'flex', gap:2, justifyContent:'center' }}>
            {[1,2,3,4,5].map(s=>(
              <button key={s} onMouseEnter={()=>!rated&&setHover(s)} onMouseLeave={()=>!rated&&setHover(0)}
                onClick={()=>{ if(!rated){ setRating(s); setRated(true) } }}
                style={{ fontSize:24, background:'none', border:'none', cursor:rated?'default':'pointer', padding:'0 2px', lineHeight:1, color:(hover||rating)>=s?'#FABE15':'hsl(0,0%,82%)', transition:'color 0.1s' }}>★</button>
            ))}
          </div>
        </motion.div>

        <motion.div {...fly(0.22, -26, 7)} className="folder-group" style={{ position:'absolute', bottom:'4%', left:'40%', cursor:'pointer', zIndex:4 }} onClick={()=>window.location.href='/writings'}>
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

        <motion.div {...fly(0.21, -16, -5)} style={{ ...card, position:'absolute', bottom:'4%', left:'62%', padding:'16px', width:172, zIndex:4 }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 10px' }}>Currently reading</p>
          <div style={{ width:'100%', borderRadius:8, overflow:'hidden', marginBottom:10, aspectRatio:'2/3', background:'#f0f0f0' }}>
            <img src="https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{ (e.target as HTMLImageElement).style.background='#ddd' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ flex:1, height:4, background:'hsl(0,0%,88%)', borderRadius:2, overflow:'hidden' }}>
              <div style={{ width:'62%', height:'100%', background:'hsl(0,0%,40%)', borderRadius:2 }} />
            </div>
            <span style={{ fontFamily:f, fontSize:10, color:'hsl(0,0%,55%)' }}>62%</span>
          </div>
        </motion.div>

        <motion.div {...fly(0.26, -24, 8)} style={{ position:'absolute', bottom:'8%', right:'2%', zIndex:4, cursor:'pointer' }} onClick={()=>window.open('https://linkedin.com/in/deepakmaan25','_blank')}>
          <div style={{ background:'rgba(10,102,194,0.95)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:16, padding:'18px 22px', width:190, boxShadow:'0 4px 20px rgba(0,0,0,0.14)' }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.45)', margin:'0 0 10px' }}>Find me online</p>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/></svg>
              <div>
                <p style={{ fontFamily:f, fontSize:14, fontWeight:600, color:'white', lineHeight:1.2, margin:0 }}>LinkedIn</p>
                <p style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.55)', margin:'2px 0 0' }}>/in/deepakmaan25</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
