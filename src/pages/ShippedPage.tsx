import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

const SHIPPED = [
  {
    name: 'Music Animation Generator',
    description: 'Designed the full system in Figma first — color tokens, component library, light and dark theming. Real-time frequency extraction drives multiple WebGL visual engines. Beat-synced animations ready to post.',
    tags: ['React', 'TypeScript', 'Web Audio API', 'WebGL', 'Supabase'],
    type: 'Creative tool', year: '2024',
    url: 'musictoanimate.vercel.app',
    liveUrl: 'https://musictoanimate.vercel.app/',
    previewBg: 'linear-gradient(135deg, hsl(260,55%,90%), hsl(330,45%,93%))',
    emoji: '🎵',
  },
  {
    name: 'TypeMatch',
    description: 'Font pairing recommendation tool built on a scoring system, not a filter. Established design system foundation first — type scale, spacing tokens, dark mode. Unavailable weights stay discoverable.',
    tags: ['React', 'TypeScript', 'Google Fonts API', 'Vercel'],
    type: 'Typography tool', year: '2024',
    url: 'typematch-mu.vercel.app',
    liveUrl: 'https://typematch-mu.vercel.app/',
    previewBg: 'linear-gradient(135deg, hsl(140,45%,90%), hsl(160,40%,93%))',
    emoji: '⌨️',
  },
  {
    name: 'PulsePlan',
    description: 'Daily command center for solo content creators. Plan, write, schedule, and review across LinkedIn, Instagram, X, YouTube, and Threads — all in one place. Platform-aware character counter, kanban board, and publishing analytics.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    type: 'Creator ops tool', year: '2024',
    url: 'pulseplan-dm.vercel.app',
    liveUrl: 'https://pulseplan-dm.vercel.app',
    previewBg: 'linear-gradient(135deg, hsl(340,50%,91%), hsl(20,50%,93%))',
    emoji: '📋',
  },
  {
    name: 'Kairo Design System',
    description: 'A design system file sitting in Figma cannot prove it actually works. Built complete tokens to components — then implemented as a live interactive site. Implementation exposed missing states invisible in a static file.',
    tags: ['Figma', 'React', 'Vercel'],
    type: 'Design system', year: '2024–25',
    url: 'kairo-design.vercel.app',
    liveUrl: 'https://kairo-design.vercel.app/',
    previewBg: 'linear-gradient(135deg, hsl(220,55%,91%), hsl(240,45%,94%))',
    emoji: '🧩',
  },
]

export default function ShippedPage() {
  const isMobile = useIsMobile()

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '90px 20px 60px' : '120px 32px 100px' }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: isMobile ? 44 : 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)' }}>Shipped builds</span>
              <div style={{ flex: 1, height: 1, background: 'hsl(0,0%,88%)' }} />
            </div>
            <h1 style={{ fontFamily: f, fontSize: 'clamp(1.7rem,5vw,3.2rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'hsl(0,0%,8%)', margin: '0 0 16px', lineHeight: 1.15 }}>
              Things I built and shipped.
            </h1>
            <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.95rem,2vw,1.2rem)', color: 'hsl(0,0%,45%)', margin: 0, maxWidth: 520, lineHeight: 1.5 }}>
              Side projects, experiments, and tools. All of these went from idea to deployed.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))',
            gap: isMobile ? 18 : 24,
          }}>
            {SHIPPED.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
                <ShippedCard item={item} isMobile={isMobile} />
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,55%)', marginTop: isMobile ? 44 : 64, textAlign: 'center' }}>
            More experiments live on{' '}
            <a href="https://github.com/deepakmaan25" target="_blank" rel="noopener noreferrer"
              style={{ color: 'hsl(0,0%,25%)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              GitHub
            </a>.
          </motion.p>
        </div>
      </main>
    </>
  )
}

const ShippedCard = ({ item, isMobile }: { item: typeof SHIPPED[0]; isMobile: boolean }) => (
  <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
    style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
    <div style={{
      borderRadius: 18, overflow: 'hidden',
      border: '1px solid hsl(0,0%,88%)', background: 'white',
      transition: 'box-shadow 0.3s, transform 0.2s', cursor: 'pointer', height: '100%',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -10px rgba(0,0,0,0.12)',
    }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 16px 44px -10px rgba(0,0,0,0.18)'; el.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -10px rgba(0,0,0,0.12)'; el.style.transform = 'none' }}>

      {/* Browser chrome bar */}
      <div style={{
        background: 'hsl(0,0%,96%)', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid hsl(0,0%,90%)',
      }}>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{
          flex: 1, background: 'white', borderRadius: 6, padding: '4px 12px',
          fontFamily: 'ui-monospace, monospace', fontSize: 11, color: 'hsl(0,0%,45%)',
          border: '1px solid hsl(0,0%,90%)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="hsl(0,0%,55%)" strokeWidth="1.5" style={{ width: 10, height: 10, flexShrink: 0 }}><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg>
          {item.url}
        </div>
        <span style={{
          fontFamily: f, fontSize: 9, fontWeight: 600, color: '#15803d',
          display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          Live
        </span>
      </div>

      {/* Preview area */}
      <div style={{
        height: isMobile ? 110 : 130, background: item.previewBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.5,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '14px 14px',
        }} />
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: 'white',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, position: 'relative', zIndex: 1,
        }}>{item.emoji}</div>
      </div>

      {/* Body */}
      <div style={{ padding: isMobile ? '20px 22px 24px' : '24px 28px 28px' }}>
        <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,55%)', margin: '0 0 6px' }}>{item.type} · {item.year}</p>
        <h3 style={{ fontFamily: f, fontSize: 'clamp(1.05rem,2.2vw,1.3rem)', fontWeight: 700, letterSpacing: '-0.015em', color: 'hsl(0,0%,8%)', margin: '0 0 10px', lineHeight: 1.2 }}>{item.name}</h3>
        <p style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,40%)', lineHeight: 1.65, margin: '0 0 18px' }}>{item.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
          {item.tags.map(tag => (
            <span key={tag} style={{ padding: '3px 10px', borderRadius: 9999, background: 'hsl(0,0%,96%)', border: '1px solid hsl(0,0%,90%)', fontFamily: f, fontSize: 11, color: 'hsl(0,0%,40%)' }}>{tag}</span>
          ))}
        </div>

        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: f, fontSize: 13, fontWeight: 500, color: 'hsl(0,0%,8%)', padding: '8px 16px', borderRadius: 9999, border: '1px solid hsl(0,0%,85%)', background: 'white' }}>
          Visit site
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
            <path d="M6 4h6v6M12 4 5 11"/>
          </svg>
        </span>
      </div>
    </div>
  </a>
)
