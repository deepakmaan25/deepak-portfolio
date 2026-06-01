import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ARTICLES } from './WritingsPage'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = ARTICLES.find(a => a.slug === slug)
  const [activeSection, setActiveSection] = useState(article?.sections[0]?.id ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Track active section on scroll
  useEffect(() => {
    if (!article) return
    const handleScroll = () => {
      const sections = article.sections.map(s => document.getElementById(s.id))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(article.sections[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [article])

  if (!article) return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:f }}>
      <div style={{ textAlign:'center' }}>
        <p style={{ color:'hsl(0,0%,55%)', marginBottom:16 }}>Article not found.</p>
        <Link to="/writings" style={{ fontFamily:f, fontSize:14, color:'hsl(0,0%,8%)', textDecoration:'underline' }}>← All writings</Link>
      </div>
    </main>
  )

  return (
    <main style={{ backgroundColor:'hsl(0,0%,98%)', minHeight:'100vh', fontFamily:f }}>

      {/* Top bar */}
      <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 32px', borderBottom:'1px solid hsl(0,0%,92%)', background:'rgba(250,250,248,0.92)', backdropFilter:'blur(12px)' }}>
        <Link to="/writings" style={{ fontFamily:f, fontSize:13, color:'hsl(0,0%,45%)', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}
          onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color='hsl(0,0%,8%)' }}
          onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='hsl(0,0%,45%)' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4L6 8l4 4"/>
          </svg>
          All writings
        </Link>
        <span style={{ fontFamily:f, fontSize:12, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'hsl(0,0%,55%)' }}>
          WRITINGS
        </span>
        <span style={{ fontFamily:f, fontSize:12, color:'hsl(0,0%,55%)' }}>{article.readTime}</span>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'100px 32px 120px', display:'grid', gridTemplateColumns:'200px 1fr', gap:80, alignItems:'start' }}>

        {/* Left sidebar — sticky section nav */}
        <aside style={{ position:'sticky', top:100 }}>
          <nav>
            {article.sections.map(section => (
              <button key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior:'smooth', block:'start' })
                }}
                style={{
                  display:'block', width:'100%', textAlign:'left',
                  fontFamily:f, fontSize:13, lineHeight:1.5,
                  color: activeSection === section.id ? 'hsl(0,0%,8%)' : 'hsl(0,0%,60%)',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  background:'none', border:'none', cursor:'pointer',
                  padding:'6px 0', transition:'color 0.15s',
                }}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div>
          {/* Article meta + title */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease:[0.4,0,0.2,1] }}
            style={{ marginBottom:64 }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <span style={{ fontFamily:f, fontSize:12, color:'hsl(0,0%,55%)' }}>{article.date}</span>
              <span style={{ width:32, height:1, background:'hsl(0,0%,80%)' }} />
              <span style={{ fontFamily:f, fontSize:12, color:'hsl(0,0%,55%)' }}>{article.readTime}</span>
            </div>
            <h1 style={{ fontFamily:f, fontSize:'clamp(1.8rem,3.5vw,3rem)', fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.15, color:'hsl(0,0%,8%)', margin:'0 0 20px' }}>
              {article.title}
            </h1>
            <p style={{ fontFamily:f, fontSize:16, color:'hsl(0,0%,42%)', lineHeight:1.65, margin:0, maxWidth:560 }}>
              {article.excerpt}
            </p>
          </motion.div>

          {/* Divider */}
          <div style={{ height:1, background:'hsl(0,0%,90%)', marginBottom:64 }} />

          {/* Sections */}
          <div style={{ display:'flex', flexDirection:'column', gap:64 }}>
            {article.content.map((section, i) => (
              <motion.section key={section.id} id={section.id}
                initial={{ opacity:0, y:12 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.05, duration:0.45 }}
                style={{ scrollMarginTop:120 }}
              >
                {/* Section heading */}
                <h2 style={{ fontFamily:f, fontSize:'clamp(1rem,1.8vw,1.4rem)', fontWeight:700, letterSpacing:'-0.015em', color:'hsl(0,0%,8%)', margin:'0 0 20px' }}>
                  {section.heading}
                </h2>

                {/* Body — split on \n\n for paragraphs */}
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} style={{ fontFamily:f, fontSize:16, color:'hsl(0,0%,25%)', lineHeight:1.75, margin: j > 0 ? '20px 0 0' : 0 }}>
                    {para}
                  </p>
                ))}
              </motion.section>
            ))}
          </div>

          {/* Footer nav */}
          <div style={{ marginTop:96, paddingTop:32, borderTop:'1px solid hsl(0,0%,90%)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <Link to="/writings" style={{ fontFamily:f, fontSize:14, color:'hsl(0,0%,55%)', textDecoration:'none', display:'flex', alignItems:'center', gap:6, transition:'color 0.15s' }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color='hsl(0,0%,8%)' }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='hsl(0,0%,55%)' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 4L6 8l4 4"/>
              </svg>
              All writings
            </Link>
            {/* Next article */}
            {(() => {
              const idx = ARTICLES.findIndex(a => a.slug === slug)
              const next = ARTICLES[idx + 1]
              if (!next) return null
              return (
                <Link to={`/writings/${next.slug}`} style={{ fontFamily:f, fontSize:14, color:'hsl(0,0%,55%)', textDecoration:'none', display:'flex', alignItems:'center', gap:6, transition:'color 0.15s' }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color='hsl(0,0%,8%)' }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color='hsl(0,0%,55%)' }}>
                  Next: {next.title.slice(0, 32)}…
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4l4 4-4 4"/>
                  </svg>
                </Link>
              )
            })()}
          </div>
        </div>
      </div>
    </main>
  )
}
