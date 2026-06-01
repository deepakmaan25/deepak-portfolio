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

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    if (!article) return
    const onScroll = () => {
      for (let i = article.sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(article.sections[i].id)
        if (el && el.getBoundingClientRect().top <= 130) {
          setActiveSection(article.sections[i].id)
          return
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [article])

  if (!article) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: f }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'hsl(0,0%,55%)', marginBottom: 16 }}>Article not found.</p>
        <Link to="/writings" style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,8%)', textDecoration: 'underline' }}>← All writings</Link>
      </div>
    </main>
  )

  const currentIdx = ARTICLES.findIndex(a => a.slug === slug)
  const prevArticle = ARTICLES[currentIdx - 1]
  const nextArticle = ARTICLES[currentIdx + 1]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>

        {/* Fixed top bar */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px', borderBottom: '1px solid hsl(0,0%,92%)', background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(12px)' }}>
          <Link to="/writings" style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,45%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,45%)' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
            All writings
          </Link>
          <span style={{ fontFamily: f, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)' }}>WRITINGS</span>
          <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)' }}>{article.readTime}</span>
        </div>

        {/* Grid: sidebar + content */}
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '100px 32px 80px', display: 'grid', gridTemplateColumns: '180px 1fr', gap: '0 72px', alignItems: 'start' }}>

          {/* Left sidebar — sticky */}
          <aside style={{ position: 'sticky', top: 90 }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {article.sections.map(s => (
                <button key={s.id}
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: f, fontSize: 13, lineHeight: 1.6, color: activeSection === s.id ? 'hsl(0,0%,8%)' : 'hsl(0,0%,60%)', fontWeight: activeSection === s.id ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', transition: 'color 0.15s' }}>
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <article>
            {/* Title block */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} style={{ marginBottom: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,50%)' }}>{article.date}</span>
                <span style={{ width: 28, height: 1, background: 'hsl(0,0%,80%)' }} />
                <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)' }}>{article.readTime}</span>
              </div>
              <h1 style={{ fontFamily: f, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'hsl(0,0%,8%)', margin: '0 0 20px' }}>
                {article.title}
              </h1>
              <p style={{ fontFamily: f, fontSize: 16, color: 'hsl(0,0%,42%)', lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
                {article.excerpt}
              </p>
            </motion.div>

            <div style={{ height: 1, background: 'hsl(0,0%,90%)', marginBottom: 56 }} />

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {article.content.map((section, i) => (
                <motion.section key={section.id} id={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  style={{ scrollMarginTop: 110 }}>

                  <h2 style={{ fontFamily: f, fontSize: 'clamp(1rem,1.6vw,1.2rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'hsl(0,0%,8%)', margin: '0 0 18px' }}>
                    {section.heading}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {section.body.split('\n\n').map((para, j) => (
                      <p key={j} style={{ fontFamily: f, fontSize: 16, color: 'hsl(0,0%,22%)', lineHeight: 1.8, margin: 0 }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Highlight block */}
                  {section.highlight && (
                    <div style={{ margin: '28px 0 0', padding: '18px 22px', borderLeft: '3px solid hsl(0,0%,8%)', background: 'hsl(0,0%,96%)', borderRadius: '0 8px 8px 0' }}>
                      <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 17, color: 'hsl(0,0%,12%)', lineHeight: 1.7, margin: 0 }}>
                        <mark style={{ background: 'rgba(245,230,66,0.45)', color: 'inherit', padding: '1px 4px', borderRadius: 3 }}>
                          {section.highlight}
                        </mark>
                      </p>
                    </div>
                  )}

                  {/* Quote block */}
                  {section.quote && (
                    <div style={{ margin: '28px 0 0', padding: '20px 24px', background: 'hsl(0,0%,97%)', border: '1px solid hsl(0,0%,90%)', borderRadius: 12 }}>
                      <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,55%)', margin: '0 0 12px' }}>User quote</p>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'hsl(0,0%,88%)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>😶</div>
                        <p style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,20%)', lineHeight: 1.7, margin: 0 }}>
                          "{section.quote.text}"
                        </p>
                      </div>
                      <p style={{ fontFamily: f, fontSize: 11, color: 'hsl(0,0%,55%)', margin: '10px 0 0', paddingLeft: 38 }}>
                        — {section.quote.attribution}
                      </p>
                    </div>
                  )}
                </motion.section>
              ))}
            </div>

            {/* Footer nav */}
            <div style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid hsl(0,0%,90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              {prevArticle ? (
                <Link to={`/writings/${prevArticle.slug}`} style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,50%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.15s', flex: 1 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,50%)' }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
                  {prevArticle.title.slice(0, 36)}{prevArticle.title.length > 36 ? '…' : ''}
                </Link>
              ) : (
                <Link to="/writings" style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,50%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,50%)' }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
                  All writings
                </Link>
              )}
              {nextArticle && (
                <Link to={`/writings/${nextArticle.slug}`} style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,50%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.15s', justifyContent: 'flex-end', flex: 1 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,50%)' }}>
                  {nextArticle.title.slice(0, 36)}{nextArticle.title.length > 36 ? '…' : ''}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>
                </Link>
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
