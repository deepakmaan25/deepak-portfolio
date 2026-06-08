import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'
import { ARTICLES } from '../data/articles'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  'UX Design':      { bg: 'hsl(222,80%,95%)', color: 'hsl(222,60%,40%)' },
  'AI + Design':    { bg: 'hsl(260,70%,95%)', color: 'hsl(260,50%,45%)' },
  'Design Thinking':{ bg: 'hsl(140,50%,94%)', color: 'hsl(140,45%,32%)' },
  'Design Systems': { bg: 'hsl(22,90%,94%)',  color: 'hsl(22,70%,38%)'  },
  'UX Writing':     { bg: 'hsl(340,60%,94%)', color: 'hsl(340,50%,40%)' },
  'Industry':       { bg: 'hsl(0,0%,92%)',    color: 'hsl(0,0%,35%)'    },
}

function RichBody({ text }: { text: string }) {
  const paragraphs = text.split('\n\n')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {paragraphs.map((para, i) => {
        // Bold heading paragraphs (start with **)
        if (para.startsWith('**') && para.endsWith('**')) {
          return (
            <h3 key={i} style={{
              fontFamily: f, fontSize: 17, fontWeight: 700,
              color: 'hsl(0,0%,8%)', letterSpacing: '-0.01em',
              margin: '32px 0 12px', lineHeight: 1.3,
            }}>{para.slice(2, -2)}</h3>
          )
        }
        // Inline bold
        const parts = para.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={i} style={{
            fontFamily: f, fontSize: 17, lineHeight: 1.85,
            color: 'hsl(0,0%,22%)', margin: '0 0 22px',
          }}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} style={{ fontWeight: 700, color: 'hsl(0,0%,8%)' }}>{part.slice(2, -2)}</strong>
                : part
            )}
          </p>
        )
      })}
    </div>
  )
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = ARTICLES.find(a => a.slug === slug)
  const isMobile = useIsMobile()

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!article) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: f }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'hsl(0,0%,55%)', marginBottom: 16 }}>Article not found.</p>
        <Link to="/writings" style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,8%)', textDecoration: 'underline' }}>← Back to writings</Link>
      </div>
    </main>
  )

  const tagStyle = TAG_COLORS[article.tag] ?? TAG_COLORS['Industry']
  const currentIndex = ARTICLES.findIndex(a => a.slug === slug)
  const nextArticle = ARTICLES[currentIndex + 1]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>

        {/* Top bar */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '14px 16px' : '18px 32px',
          borderBottom: '1px solid hsl(0,0%,92%)',
          background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(12px)',
        }}>
          <Link to="/writings" style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,45%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,45%)' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
            Writings
          </Link>
          {!isMobile && (
            <span style={{ fontFamily: f, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)' }}>
              {article.tag}
            </span>
          )}
          <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)' }}>{article.date} · {article.readTime}</span>
        </div>

        {/* Article */}
        <div style={{ maxWidth: 680, margin: '0 auto', padding: isMobile ? '88px 20px 80px' : '120px 40px 120px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>

            {/* Tag */}
            <span style={{
              fontFamily: f, fontSize: 11, fontWeight: 600,
              padding: '4px 12px', borderRadius: 100,
              background: tagStyle.bg, color: tagStyle.color,
              letterSpacing: '0.04em', display: 'inline-block', marginBottom: 20,
            }}>{article.tag}</span>

            {/* Title */}
            <h1 style={{
              fontFamily: f,
              fontSize: isMobile ? 'clamp(1.5rem,6vw,2rem)' : 'clamp(1.8rem,3.5vw,2.6rem)',
              fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15,
              color: 'hsl(0,0%,8%)', margin: '0 0 16px',
            }}>{article.title}</h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: fs, fontStyle: 'italic', fontWeight: 300,
              fontSize: isMobile ? 17 : 20, color: 'hsl(0,0%,40%)',
              lineHeight: 1.6, margin: '0 0 40px',
            }}>{article.subtitle}</p>

            {/* Author row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              paddingBottom: 36, borderBottom: '1px solid hsl(0,0%,90%)',
              marginBottom: 48,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#DDD8FB', flexShrink: 0 }}>
                <img src="/deepak.png" alt="Deepak" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
              <div>
                <p style={{ fontFamily: f, fontSize: 14, fontWeight: 600, color: 'hsl(0,0%,8%)', margin: 0 }}>Deepak Maan</p>
                <p style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)', margin: '2px 0 0' }}>{article.date} · {article.readTime} read</p>
              </div>
            </div>

            {/* Body */}
            <RichBody text={article.body} />

            {/* Footer */}
            <div style={{ paddingTop: 48, borderTop: '1px solid hsl(0,0%,90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <Link to="/writings" style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,55%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,55%)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
                All writings
              </Link>
              {nextArticle && (
                <Link to={`/writings/${nextArticle.slug}`} style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,55%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,55%)' }}>
                  Next: {nextArticle.title.slice(0, 40)}...
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
