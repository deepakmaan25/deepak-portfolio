import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const f = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'hsl(0,0%,98%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: f, padding: 'clamp(20px, 5vw, 32px)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', maxWidth: 480 }}>
        <p style={{ fontFamily: f, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'hsl(0,0%,55%)', marginBottom: 20 }}>404</p>
        <h1 style={{ fontFamily: f, fontSize: 'clamp(1.8rem,6vw,3.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'hsl(0,0%,8%)', margin: '0 0 16px', lineHeight: 1.1 }}>
          Page not found.
        </h1>
        <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem,2.5vw,1.15rem)', color: 'hsl(0,0%,45%)', margin: '0 0 40px', lineHeight: 1.6 }}>
          This page doesn't exist. Maybe you were looking for a case study?
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 9999, background: 'hsl(0,0%,8%)', color: 'white', fontFamily: f, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            Go home
          </Link>
          <Link to="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 9999, border: '1px solid hsl(0,0%,85%)', color: 'hsl(0,0%,25%)', fontFamily: f, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            See my work
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
