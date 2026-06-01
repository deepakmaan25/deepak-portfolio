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

const SYSTEM_PROMPT = `You are Deepak Maan's portfolio assistant. Answer in first person as Deepak. Be concise and warm.
Deepak is a Product Designer based in Mumbai, open to Hyderabad, Bangalore, or Remote.
IIT ISM Dhanbad graduate. At JSW Steel. Ships end-to-end in React/TypeScript with Claude Code.
Case studies: Tech Japan/Talendy (10 IIT interviews, 9 pain points, 80% nav improvement), Buzztro (0→1 product design).
Shipped: Music Animation Generator, PulsePlay, TypMatch, Kairo Design System.
Resume: https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing
Contact: linkedin.com/in/deepakmaan25
Off-topic: "I'm only here to answer questions about Deepak's work. Try asking about his projects or process."`

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
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

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
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system:SYSTEM_PROMPT, messages:updated }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role:'assistant', content:data.content?.[0]?.text ?? 'Try again.' }])
    } catch { setMessages(prev => [...prev, { role:'assistant', content:'Something went wrong.' }]) }
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
      `}</style>

      <div className="relative isolate min-h-screen overflow-x-clip" style={{ backgroundColor:'hsl(0,0%,98%)', color:'hsl(0,0%,8%)', fontFamily:f }}>

        {/* BLOBS */}
        <div className="absolute -z-10 top-0 left-0 right-0 h-screen overflow-hidden">
          <div className="absolute inset-0" style={{ background:'linear-gradient(40deg,hsl(240,60%,99%),hsl(230,80%,97%))' }}>
            <svg className="hidden"><defs><filter id="g4"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="g"/><feBlend in="SourceGraphic" in2="g"/></filter></defs></svg>
            <div className="h-full w-full blur-lg" style={{ filter:'url(#g4) blur(40px)' }}>
              {[['bl1','56,100,255',1],['bl2','120,60,220',1],['bl3','30,160,255',1],['bl4','160,60,255',0.7],['bl5','40,120,255',1]].map(([c,col,o])=>(
                <div key={c as string} className={c as string} style={{ position:'absolute', background:`radial-gradient(circle at center,rgba(${col},0.35) 0,rgba(${col},0) 50%) no-repeat`, mixBlendMode:'screen' as any, width:'80%', height:'80%', top:'10%', left:'10%', opacity:o as number }} />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background:'rgba(250,250,248,0.6)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background:'linear-gradient(to bottom,transparent 60%,hsl(0,0%,98%))' }} />
        </div>

        {/* CONTENT */}
        <div style={{ maxWidth:1152, margin:'0 auto', padding:'144px 32px 128px' }}>

          {/* HEADLINE */}
          <div style={{ maxWidth:896, margin:'0 auto 40px' }}>
            <motion.div className="flex items-start gap-4 sm:gap-5"
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.55, ease:[0.4,0,0.2,1] }}>
              <span className="relative shrink-0" style={{ marginTop:5 }}>
                <span style={{ display:'block', width:32, height:32, borderRadius:'50%', overflow:'hidden', background:'#DDD8FB', boxShadow:'0 0 0 2px white,0 1px 4px rgba(0,0,0,0.1)' }}>
                  <img src="/photo.jpg" alt="Deepak" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
                </span>
                <span style={{ position:'absolute', width:9, height:9, borderRadius:'50%', background:'#4ade80', bottom:1, right:0, boxShadow:'0 0 0 2px white' }} />
              </span>

              <div style={{ fontFamily:f, fontWeight:400, lineHeight:1.2, letterSpacing:'-0.018em', color:'hsl(0,0%,8%)' }}>
                {/* Line 1 — must stay single line */}
                <div style={{ fontSize:'clamp(1.5rem,2.4vw,2.5rem)', whiteSpace:'nowrap' }}>
                  I'm{' '}
                  <span style={{ position:'relative', display:'inline-block', padding:'0 8px' }}>
                    <span style={{ position:'absolute', inset:0, borderLeft:'2px solid rgba(99,102,241,0.45)', borderRight:'2px solid rgba(99,102,241,0.45)', background:'rgba(99,102,241,0.08)' }} />
                    <span style={{ position:'absolute', width:5, height:5, borderRadius:'50%', background:'rgb(99,102,241)', top:0, left:0, transform:'translate(-50%,-50%)' }} />
                    <span style={{ position:'absolute', width:5, height:5, borderRadius:'50%', background:'rgb(99,102,241)', bottom:0, right:0, transform:'translate(50%,50%)' }} />
                    <span style={{ position:'relative' }}>Deepak Maan</span>
                  </span>
                  {' '}&ndash; based in Mumbai.
                </div>
                {/* Line 2 — single line */}
                <div style={{ fontSize:'clamp(1.5rem,2.4vw,2.5rem)', whiteSpace:'nowrap', marginTop:2 }}>
                  I research, design, and ship product UX,{' '}
                  <span style={{ fontFamily:fs, fontStyle:'italic', fontWeight:300, display:'inline-block', whiteSpace:'nowrap' }}>end to end.</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CHAT */}
          <div style={{ maxWidth:896, margin:'0 auto' }}>
            <AnimatePresence>
              {chatStarted && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} style={{ marginBottom:16, maxHeight:256, overflowY:'auto', display:'flex', flexDirection:'column', gap:12 }}>
                  {messages.map((msg,i) => (
                    <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                      style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start', alignItems:'flex-end', gap:8 }}>
                      {msg.role==='assistant' && <span style={{ width:24, height:24, borderRadius:'50%', background:'#DDD8FB', flexShrink:0, overflow:'hidden', display:'inline-block' }}><img src="/photo.jpg" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} /></span>}
                      <div style={{ maxWidth:400, padding:'10px 16px', borderRadius:18, fontSize:14, lineHeight:1.55, fontFamily:f, ...(msg.role==='user'?{ background:'hsl(0,0%,8%)', color:'white', borderBottomRightRadius:4 }:{ background:'white', color:'hsl(0,0%,8%)', border:'1px solid hsl(0,0%,88%)', borderBottomLeftRadius:4, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }) }}>{msg.content}</div>
                    </motion.div>
                  ))}
                  {loading && <div style={{ display:'flex', alignItems:'flex-end', gap:8 }}><span style={{ width:24, height:24, borderRadius:'50%', background:'#DDD8FB', flexShrink:0 }} /><div style={{ background:'white', border:'1px solid hsl(0,0%,88%)', borderRadius:18, borderBottomLeftRadius:4, padding:'12px 16px' }}><div style={{ display:'flex', gap:4 }}>{[0,150,300].map(d=><span key={d} className="animate-bounce" style={{ width:6, height:6, borderRadius:'50%', background:'#ccc', display:'inline-block', animationDelay:`${d}ms` }} />)}</div></div></div>}
                  <div ref={chatEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* PILLS */}
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.12 }} style={{ marginBottom:16 }}>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'flex-end', marginBottom:8 }}>
                {QUICK_ACTIONS.slice(0,4).map(a => <Pill key={a.label} a={a} send={send} />)}
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'flex-end' }}>
                {QUICK_ACTIONS.slice(4).map(a => <Pill key={a.label} a={a} send={send} />)}
              </div>
            </motion.div>

            {/* INPUT */}
            <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, borderRadius:16, padding:'12px 16px', background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', border:'1px solid hsl(0,0%,88%)', boxShadow:'0 1px 8px rgba(0,0,0,0.06)' }}>
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
              <p style={{ textAlign:'center', fontSize:12, color:'hsl(0,0%,55%)', marginTop:10, fontFamily:f }}>
                Built with love and <a href="https://www.anthropic.com/claude-code" target="_blank" rel="noopener noreferrer" style={{ color:'inherit', textDecoration:'underline', textUnderlineOffset:2 }}>Claude Code</a> · 2026
              </p>
            </motion.div>
          </div>

          {/* CASE STUDIES */}
          <div id="work" style={{ scrollMarginTop:64, paddingTop:112 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:128 }}>
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

        {/* WIDGETS */}
        <Widgets istTime={istTime} playing={playing} setPlaying={setPlaying} />
      </div>
    </>
  )
}

const Pill = ({ a, send }: { a:typeof QUICK_ACTIONS[0]; send:(q:string)=>void }) => (
  <button onClick={()=>send(a.query)}
    className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium bg-white border transition-all duration-200"
    style={{ fontFamily:f, padding:'8px 14px', borderColor:'rgba(0,0,0,0.18)', boxShadow:'0 1px 3px rgba(0,0,0,0.06)', color:'hsl(0,0%,8%)' }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor='hsl(0,0%,8%)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)' }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(0,0,0,0.18)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.06)' }}>
    <span>{a.label}</span>
    {a.icon==='down'&&<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity"><path d="M8 3v10M4 9l4 4 4-4"/></svg>}
    {a.icon==='out'&&<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity"><path d="M6 4h6v6M12 4 5 11"/></svg>}
  </button>
)

const CaseRow = ({ title,desc,metric,metricLabel,slug,image,bg }:{title:string;desc:string;metric:string;metricLabel:string;slug:string;image:string;bg:string}) => (
  <motion.article initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, ease:[0.4,0,0.2,1] }}
    style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'0 64px', alignItems:'start' }}>
    <div style={{ paddingTop:32 }}>
      <h3 style={{ fontFamily:f, fontSize:'clamp(1.2rem,1.8vw,1.5rem)', fontWeight:700, lineHeight:1.15, letterSpacing:'-0.02em', color:'hsl(0,0%,8%)', margin:0 }}>{title}</h3>
      <p style={{ fontFamily:f, fontSize:15, color:'hsl(0,0%,42%)', lineHeight:1.7, marginTop:20, maxWidth:380 }}>{desc}</p>
      <div style={{ display:'flex', alignItems:'baseline', gap:10, marginTop:28 }}>
        <span style={{ fontFamily:f, fontSize:'clamp(1.8rem,3vw,2.8rem)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, color:'hsl(0,0%,8%)' }}>{metric}</span>
        <span style={{ fontFamily:f, fontSize:10, fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', color:'hsl(0,0%,55%)' }}>{metricLabel}</span>
      </div>
      <a href={`/case-study/${slug}`} className="group/cta" style={{ marginTop:32, display:'inline-flex', alignItems:'center', gap:8, borderRadius:9999, padding:'10px 20px', background:'hsl(0,0%,8%)', color:'white', fontFamily:f, fontSize:14, fontWeight:500, textDecoration:'none', boxShadow:'0 1px 4px rgba(0,0,0,0.1)', transition:'box-shadow 0.2s' }}
        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(0,0,0,0.18)' }}
        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 1px 4px rgba(0,0,0,0.1)' }}>
        <span>Open case study</span>
        <span style={{ width:20, height:20, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width:12, height:12 }}><path d="M5 11L11 5M6 5h5v5"/></svg>
        </span>
      </a>
    </div>
    <a href={`/case-study/${slug}`} style={{ display:'block', borderRadius:24, overflow:'hidden', background:bg, boxShadow:'0 8px 30px -12px rgba(0,0,0,0.18)', transition:'box-shadow 0.5s', textDecoration:'none' }}
      onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 20px 50px -12px rgba(0,0,0,0.28)' }}
      onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 8px 30px -12px rgba(0,0,0,0.18)' }}>
      <div style={{ aspectRatio:'16/10', overflow:'hidden' }}>
        <img src={image} alt={title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', transition:'transform 0.5s cubic-bezier(0.25,1,0.5,1)' }}
          onMouseEnter={e=>{ (e.target as HTMLImageElement).style.transform='scale(1.03)' }}
          onMouseLeave={e=>{ (e.target as HTMLImageElement).style.transform='scale(1)' }}
          onError={e=>{ (e.target as HTMLImageElement).style.opacity='0' }} />
      </div>
    </a>
  </motion.article>
)

/* WIDGETS */
const Widgets = ({ istTime, playing, setPlaying }: { istTime:string; playing:boolean; setPlaying:(v:boolean)=>void }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover]   = useState(0)
  const [rated, setRated]   = useState(false)
  const [starRating, setStarRating] = useState<number|null>(null)

  const card = { background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(0,0,0,0.07)', borderRadius:14, boxShadow:'0 2px 16px rgba(0,0,0,0.07)' }
  const fly = (delay:number, rot=-20) => ({
    initial:{ opacity:0, scale:0.2, rotate:rot },
    whileInView:{ opacity:1, scale:1, rotate:0 },
    viewport:{ once:true },
    transition:{ type:'spring' as const, stiffness:180, damping:18, delay },
  })

  return (
    <section id="about" style={{ position:'relative', backgroundColor:'hsl(0,0%,94%)', overflow:'hidden', minHeight:'100vh' }}>
      {/* Grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.3, backgroundImage:'linear-gradient(rgba(0,0,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.07) 1px,transparent 1px)', backgroundSize:'36px 36px' }} />

      {/* Headline — properly centered, not absolute */}
      <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'80px 32px 0', pointerEvents:'none' }}>
        <motion.h2 {...fly(0.06,-3)}
          style={{ fontFamily:f, fontSize:'clamp(2.5rem,5vw,4.8rem)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1.05, color:'hsl(0,0%,8%)', display:'inline-block' }}>
          I design <em style={{ fontFamily:fs, fontStyle:'italic', fontWeight:300 }}>and</em> ship. Fast.
        </motion.h2>
      </div>

      {/* Widget canvas */}
      <div style={{ position:'relative', minHeight:740, maxWidth:1200, margin:'0 auto', padding:'40px 40px 80px' }}>

        {/* Profile */}
        <motion.div {...fly(0.1,-27)} style={{ ...card, position:'absolute', top:0, left:20, padding:'12px 12px 28px' }}>
          <div style={{ width:148, height:148, borderRadius:10, overflow:'hidden', background:'#DDD8FB' }}>
            <img src="/photo.jpg" alt="Deepak" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%' }} onError={e=>{ (e.target as HTMLImageElement).style.display='none' }} />
          </div>
          <p style={{ marginTop:10, textAlign:'center', fontFamily:f, fontSize:11, color:'hsl(0,0%,50%)', letterSpacing:'0.04em' }}>Deepak Maan · Mumbai</p>
        </motion.div>

        {/* Music player */}
        <motion.div {...fly(0.13,-24)} style={{ position:'absolute', top:0, left:'34%' }}>
          <div style={{ background:'rgba(20,20,20,0.9)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:16, width:224, boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <img src="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png" alt="" style={{ width:40, height:40, borderRadius:8, objectFit:'cover', flexShrink:0 }} onError={e=>{ (e.target as HTMLImageElement).style.background='#444' }} />
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontFamily:f, fontSize:13, fontWeight:600, color:'white', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>Breathe</p>
                <p style={{ fontFamily:f, fontSize:11, color:'rgba(255,255,255,0.5)', margin:'2px 0 0' }}>Pink Floyd</p>
              </div>
              {/* Bars */}
              <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:14 }}>
                {[1.2,0.5,1.0,0.4,0.8].map((h,i) => (
                  <span key={i} style={{ width:2, borderRadius:1, background:'rgba(255,255,255,0.7)', height:12, transformOrigin:'center bottom', animation: playing ? `bar ${0.8+i*0.15}s ease-in-out ${i*0.1}s infinite alternate` : 'none', transform: playing ? undefined : `scaleY(${h*0.4})` }} />
                ))}
              </div>
            </div>
            <div style={{ height:3, background:'rgba(255,255,255,0.15)', borderRadius:2, overflow:'hidden', marginBottom:8 }}>
              <div style={{ width:'42%', height:'100%', background:'rgba(255,255,255,0.75)', borderRadius:2 }} />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.3)' }}>2:43</span>
              <span style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.3)' }}>5:57</span>
            </div>
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:20 }}>
              <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14 }}>⏮</button>
              <button onClick={()=>setPlaying(!playing)} style={{ width:32, height:32, borderRadius:'50%', background:'white', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'hsl(0,0%,8%)', fontSize:13, flexShrink:0 }}>
                {playing ? '⏸' : '▶'}
              </button>
              <button style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14 }}>⏭</button>
            </div>
          </div>
        </motion.div>

        {/* Book a call */}
        <motion.div {...fly(0.15,-19)} style={{ position:'absolute', top:'16%', right:'25%' }}>
          <div style={{ ...card, padding:'16px 20px', width:196, cursor:'pointer' }}
            onClick={()=>window.open('mailto:deepak.maan@email.com','_blank')}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 10px' }}>Open to work</p>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(0,0%,8%)" strokeWidth="2" style={{ flexShrink:0 }}><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
              <div>
                <p style={{ fontFamily:f, fontSize:14, fontWeight:600, color:'hsl(0,0%,8%)', margin:0 }}>Book a call</p>
                <p style={{ fontFamily:f, fontSize:10, color:'hsl(0,0%,55%)', margin:'2px 0 0' }}>Schedule 30 min</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div {...fly(0.17,-18)} style={{ position:'absolute', top:0, right:20 }}>
          <div style={{ background:'rgba(78,204,163,0.92)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.4)', borderRadius:14, padding:'20px', width:196, color:'#0a2e22', boxShadow:'0 4px 24px rgba(0,0,0,0.1)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#0a2e22', opacity:0.7, flexShrink:0 }} />
              <span style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', opacity:0.6 }}>Available now</span>
            </div>
            <div style={{ height:1, background:'rgba(10,46,34,0.15)', marginBottom:12 }} />
            <p style={{ fontFamily:f, fontSize:15, fontWeight:600, margin:'0 0 10px' }}>Product Designer</p>
            {['Hyderabad','Bangalore','Remote'].map(l=>(
              <div key={l} style={{ display:'flex', gap:8, marginBottom:5, alignItems:'center' }}>
                <span style={{ fontFamily:f, fontSize:11, opacity:0.5 }}>→</span>
                <span style={{ fontFamily:f, fontSize:11 }}>{l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Currently learning */}
        <motion.div {...fly(0.14,-19)} style={{ position:'absolute', top:'58%', left:20 }}>
          <div style={{ background:'rgba(255,243,205,0.92)', border:'1px solid rgba(240,192,64,0.4)', borderRadius:10, padding:'10px 14px', color:'#7a5c00' }}>
            <p style={{ fontFamily:f, fontSize:11, lineHeight:1.5, margin:0 }}>Currently building<br/><strong>with AI + design</strong></p>
          </div>
        </motion.div>

        {/* Clock */}
        <motion.div {...fly(0.19,-25)} style={{ ...card, position:'absolute', top:'38%', left:20, padding:'16px 20px', whiteSpace:'nowrap' }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 4px' }}>Mumbai, IN</p>
          <div style={{ display:'flex', alignItems:'flex-end', gap:6 }}>
            <span style={{ fontFamily:f, fontSize:32, fontWeight:300, letterSpacing:'-0.02em', color:'hsl(0,0%,8%)', lineHeight:1 }}>{istTime.split(' ')[0]}</span>
            <span style={{ fontFamily:f, fontSize:9, color:'hsl(0,0%,55%)', marginBottom:3, textTransform:'uppercase', letterSpacing:'0.1em' }}>{istTime.split(' ')[1]}</span>
          </div>
          <p style={{ fontFamily:f, fontSize:9, color:'hsl(0,0%,55%)', margin:'4px 0 0' }}>IST · UTC+5:30</p>
        </motion.div>

        {/* Rate widget */}
        <motion.div {...fly(0.21,-22)} style={{ ...card, position:'absolute', bottom:40, left:'18%', padding:'16px 20px', textAlign:'center' }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 10px' }}>
            {rated ? 'Thanks! 🎉' : 'Rate this portfolio'}
          </p>
          <div style={{ display:'flex', gap:2, justifyContent:'center' }}>
            {[1,2,3,4,5].map(s=>(
              <button key={s} onMouseEnter={()=>!rated&&setHover(s)} onMouseLeave={()=>!rated&&setHover(0)}
                onClick={()=>{ if(!rated){ setRating(s); setRated(true); setStarRating(s) } }}
                style={{ fontSize:24, background:'none', border:'none', cursor:rated?'default':'pointer', padding:'0 2px', lineHeight:1, color:(hover||rating)>=s?'#FABE15':'hsl(0,0%,82%)', transition:'transform 0.1s' }}>★</button>
            ))}
          </div>
        </motion.div>

        {/* Writings folder */}
        <motion.div {...fly(0.24,-26)} className="folder-group" style={{ position:'absolute', bottom:40, left:'36%', cursor:'pointer' }}
          onClick={()=>window.location.href='/writings'}>
          <div style={{ position:'relative', width:200, height:140, perspective:1500 }}>
            {/* folder tab */}
            <div style={{ position:'absolute', bottom:'99%', left:0, width:72, height:15, background:'#d97706', borderRadius:'8px 8px 0 0' }} />
            <div style={{ position:'absolute', bottom:'99%', left:68, width:13, height:13, background:'#d97706', clipPath:'polygon(0 35%,0 100%,50% 100%)' }} />
            {/* sheets */}
            {[
              { cls:'sheet1', style:{ inset:4, background:'white', borderRadius:10, border:'1px solid #e5e7eb' }},
              { cls:'sheet2', style:{ inset:4, background:'white', borderRadius:10, border:'1px solid #e5e7eb' }},
              { cls:'sheet3', style:{ inset:4, background:'white', borderRadius:10, border:'1px solid #e5e7eb' }},
            ].map(sheet=>(
              <div key={sheet.cls} className={`folder-sheet ${sheet.cls}`} style={{ position:'absolute', ...sheet.style, display:'flex', flexDirection:'column', gap:8, padding:14 }}>
                <div style={{ width:36, height:4, background:'#d1d5db', borderRadius:2 }} />
                <div style={{ width:'70%', height:5, background:'#9ca3af', borderRadius:2 }} />
                <div style={{ marginTop:'auto', width:'100%', height:4, background:'#e5e7eb', borderRadius:2 }} />
              </div>
            ))}
            {/* folder front */}
            <div className="folder-front" style={{ position:'absolute', bottom:0, width:'100%', height:'95%', background:'linear-gradient(to bottom,#f59e0b,#d97706)', borderRadius:'0 12px 12px 12px' }}>
              <div style={{ position:'absolute', bottom:'99%', right:0, width:120, height:15, background:'#f59e0b', borderRadius:'12px 12px 0 0' }} />
              <div style={{ position:'absolute', bottom:'99%', right:116, width:13, height:10, background:'#f59e0b', clipPath:'polygon(100% 14%,50% 100%,100% 100%)' }} />
            </div>
          </div>
          <p style={{ marginTop:20, textAlign:'center', fontFamily:f, fontSize:12, textTransform:'uppercase', letterSpacing:'0.1em', color:'hsl(0,0%,55%)' }}>My Writings</p>
        </motion.div>

        {/* Currently reading */}
        <motion.div {...fly(0.22,-19)} style={{ ...card, position:'absolute', bottom:40, left:'58%', padding:'16px', width:175 }}>
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

        {/* Resume */}
        <motion.div {...fly(0.26,-19)} style={{ position:'absolute', top:'42%', right:20, cursor:'pointer' }}
          onClick={()=>window.open('https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing','_blank')}
          whileHover={{ scale:1.02 }}>
          <div style={{ background:'rgba(255,228,92,0.92)', backdropFilter:'blur(8px)', border:'1px solid rgba(58,46,0,0.15)', borderRadius:14, padding:'16px 20px', width:178, color:'#3a2e00', boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', opacity:0.6, margin:'0 0 8px' }}>CV</p>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
              <div>
                <p style={{ fontFamily:f, fontSize:14, fontWeight:600, lineHeight:1.2, margin:0 }}>Resume</p>
                <p style={{ fontFamily:f, fontSize:10, opacity:0.6, margin:'2px 0 0' }}>PDF · 1 page</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LinkedIn */}
        <motion.div {...fly(0.3,-26)} style={{ position:'absolute', bottom:40, right:20, cursor:'pointer' }}
          onClick={()=>window.open('https://linkedin.com/in/deepakmaan25','_blank')}
          whileHover={{ scale:1.02 }}>
          <div style={{ background:'rgba(10,102,194,0.92)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:14, padding:'16px 20px', width:188, boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
            <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'rgba(255,255,255,0.5)', margin:'0 0 8px' }}>Find me online</p>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="white"><path d="M3.5 5h2v7h-2V5zm1-1.5a1 1 0 110-2 1 1 0 010 2zM6.5 5h1.8v1h.05A2.2 2.2 0 0110.5 5c2 0 2.5 1.3 2.5 3v4h-2V8.3c0-.8 0-1.8-1.1-1.8S8.5 7.4 8.5 8.2V12H6.5V5z"/></svg>
              <div>
                <p style={{ fontFamily:f, fontSize:14, fontWeight:600, color:'white', lineHeight:1.2, margin:0 }}>LinkedIn</p>
                <p style={{ fontFamily:f, fontSize:10, color:'rgba(255,255,255,0.6)', margin:'2px 0 0' }}>/in/deepakmaan25</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div {...fly(0.2,-19)} style={{ ...card, position:'absolute', top:'58%', left:'22%', padding:'16px 20px' }}>
          <p style={{ fontFamily:f, fontSize:9, textTransform:'uppercase', letterSpacing:'0.12em', color:'hsl(0,0%,55%)', margin:'0 0 10px' }}>Interests</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, maxWidth:240 }}>
            {INTERESTS.map(i=><span key={i} style={{ padding:'4px 10px', borderRadius:9999, border:'1px solid hsl(0,0%,88%)', fontSize:11, color:'hsl(0,0%,35%)', fontFamily:f }}>{i}</span>)}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
