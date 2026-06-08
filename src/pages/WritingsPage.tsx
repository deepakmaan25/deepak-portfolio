import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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

export default function WritingsPage() {
  const isMobile = useIsMobile()

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '90px 20px 60px' : '120px 40px 100px' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ marginBottom: isMobile ? 48 : 72 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)' }}>Writing</span>
              <div style={{ flex: 1, height: 1, background: 'hsl(0,0%,88%)' }} />
            </div>
            <h1 style={{ fontFamily: f, fontSize: 'clamp(1.7rem,5vw,3.2rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'hsl(0,0%,8%)', margin: '0 0 16px', lineHeight: 1.15 }}>
              Notes on design, AI, and shipping.
            </h1>
            <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.95rem,2vw,1.2rem)', color: 'hsl(0,0%,45%)', margin: 0, maxWidth: 480, lineHeight: 1.55 }}>
              Things I've been thinking about. Inspired by work I've seen, products I've used, and conversations worth having.
            </p>
          </motion.div>

          {/* Articles grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(min(100%,480px), 1fr))',
            gap: isMobile ? 16 : 24,
          }}>
            {ARTICLES.map((article, i) => {
              const tagStyle = TAG_COLORS[article.tag] ?? TAG_COLORS['Industry']
              return (
                <motion.div key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
                  <Link to={`/writings/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div
                      style={{
                        borderRadius: 18, overflow: 'hidden',
                        border: '1px solid hsl(0,0%,90%)', background: 'white',
                        padding: isMobile ? '24px 20px' : '28px 28px',
                        height: '100%', boxSizing: 'border-box',
                        display: 'flex', flexDirection: 'column', gap: 12,
                        transition: 'box-shadow 0.25s, transform 0.2s',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.09)'; el.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
                    >
                      {/* Tag + meta */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                        <span style={{
                          fontFamily: f, fontSize: 11, fontWeight: 600,
                          padding: '3px 10px', borderRadius: 100,
                          background: tagStyle.bg, color: tagStyle.color,
                          letterSpacing: '0.04em',
                        }}>{article.tag}</span>
                        <span style={{ fontFamily: f, fontSize: 11, color: 'hsl(0,0%,60%)', whiteSpace: 'nowrap' }}>
                          {article.date} · {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 style={{
                        fontFamily: f, fontSize: isMobile ? 17 : 19,
                        fontWeight: 700, letterSpacing: '-0.015em',
                        color: 'hsl(0,0%,8%)', margin: 0, lineHeight: 1.3,
                        flex: 1,
                      }}>{article.title}</h2>

                      {/* Subtitle */}
                      <p style={{
                        fontFamily: f, fontSize: 14,
                        color: 'hsl(0,0%,45%)', margin: 0, lineHeight: 1.65,
                      }}>{article.subtitle}</p>

                      {/* Read link */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        fontFamily: f, fontSize: 13, fontWeight: 600,
                        color: 'hsl(0,0%,25%)', marginTop: 4,
                      }}>
                        Read
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                          <path d="M3 8h10M9 4l4 4-4 4"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}
