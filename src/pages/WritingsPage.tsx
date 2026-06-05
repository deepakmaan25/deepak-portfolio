import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useMediaQuery'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

import { ARTICLES } from '../data/articles'

export default function WritingsPage() {
  const isMobile = useIsMobile()

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: isMobile ? '90px 20px 60px' : '120px 32px 80px' }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} style={{ marginBottom: isMobile ? 36 : 48 }}>
            <h1 style={{ fontFamily: f, fontSize: 'clamp(1.8rem,5.5vw,3rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'hsl(0,0%,8%)', margin: '0 0 12px', lineHeight: 1.15 }}>
              Writings
            </h1>
            <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.95rem,2vw,1.15rem)', color: 'hsl(0,0%,45%)', margin: 0, lineHeight: 1.6 }}>
              Notes on shipping, <em>vibe coding,</em> and the work in between.
            </p>
          </motion.div>

          <div style={{ height: 1, background: 'hsl(0,0%,90%)', marginBottom: 0 }} />

          {ARTICLES.map((article, i) => (
            <motion.div key={article.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
              <Link to={`/writings/${article.slug}`} style={{ display: 'block', textDecoration: 'none', padding: isMobile ? '24px 0' : '32px 0', transition: 'opacity 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,50%)', fontWeight: 400 }}>{article.date}</span>
                  <span style={{ width: 28, height: 1, background: 'hsl(0,0%,78%)' }} />
                  <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)' }}>{article.readTime}</span>
                </div>
                <h2 style={{ fontFamily: f, fontSize: 'clamp(1.05rem,3vw,1.45rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, color: 'hsl(0,0%,8%)', margin: '0 0 10px' }}>
                  {article.title}
                </h2>
                <p style={{ fontFamily: f, fontSize: isMobile ? 14 : 15, color: 'hsl(0,0%,42%)', lineHeight: 1.65, margin: 0, maxWidth: 580 }}>
                  {article.excerpt}
                </p>
              </Link>
              {i < ARTICLES.length - 1 && <div style={{ height: 1, background: 'hsl(0,0%,90%)' }} />}
            </motion.div>
          ))}

          <div style={{ height: 1, background: 'hsl(0,0%,90%)', marginTop: 0 }} />
        </div>
      </main>
    </>
  )
}
