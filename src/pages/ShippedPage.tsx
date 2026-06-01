import { motion } from 'framer-motion'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

const SHIPPED = [
  {
    name: 'Music Animation Generator',
    description: 'Upload a track, watch it become a generative visual. Frequency data drives particle systems and waveform animations in real time.',
    tags: ['React', 'Web Audio API', 'Canvas', 'Framer Motion'],
    status: 'Live',
    type: 'Creative tool',
    year: '2024',
    liveUrl: '#',
    bg: 'hsl(260,60%,96%)',
    accent: 'hsl(260,60%,55%)',
    emoji: '🎵',
  },
  {
    name: 'PulsePlay',
    description: 'A music player with a living visualizer. Bars pulse to the beat, the UI breathes with the audio. Built to explore what a music interface could feel like.',
    tags: ['React', 'TypeScript', 'Web Audio API', 'CSS Animations'],
    status: 'Live',
    type: 'Interaction experiment',
    year: '2024',
    liveUrl: '#',
    bg: 'hsl(340,60%,96%)',
    accent: 'hsl(340,60%,50%)',
    emoji: '🎧',
  },
  {
    name: 'TypMatch',
    description: 'A typing speed game with a design twist. Clean UI, real-time WPM tracking, accuracy scoring. Started as a component exercise, shipped as a full product.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    status: 'Live',
    type: 'Utility game',
    year: '2024',
    liveUrl: '#',
    bg: 'hsl(140,50%,95%)',
    accent: 'hsl(140,55%,40%)',
    emoji: '⌨️',
  },
  {
    name: 'Kairo Design System',
    description: 'A personal component library built to stop re-inventing the same patterns. Spacing tokens, type scale, color system, and 20+ components. Built with Figma + React.',
    tags: ['Design System', 'Figma', 'React', 'Storybook'],
    status: 'Ongoing',
    type: 'Design system',
    year: '2024–25',
    liveUrl: '#',
    bg: 'hsl(220,60%,96%)',
    accent: 'hsl(220,65%,55%)',
    emoji: '🧩',
  },
]

export default function ShippedPage() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 100px' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)' }}>Shipped builds</span>
              <div style={{ flex: 1, height: 1, background: 'hsl(0,0%,88%)' }} />
            </div>
            <h1 style={{ fontFamily: f, fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'hsl(0,0%,8%)', margin: '0 0 16px' }}>
              Things I built and shipped.
            </h1>
            <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem,1.5vw,1.2rem)', color: 'hsl(0,0%,45%)', margin: 0, maxWidth: 520 }}>
              Side projects, experiments, and tools. All of these went from idea to deployed.
            </p>
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 24 }}>
            {SHIPPED.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                <ShippedCard item={item} />
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,55%)', marginTop: 64, textAlign: 'center' }}>
            More experiments live on{' '}
            <a href="https://github.com/deepakmaan25" target="_blank" rel="noopener noreferrer"
              style={{ color: 'hsl(0,0%,25%)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              GitHub
            </a>
            .
          </motion.p>
        </div>
      </main>
    </>
  )
}

const ShippedCard = ({ item }: { item: typeof SHIPPED[0] }) => {
  return (
    <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid hsl(0,0%,90%)', background: 'white', transition: 'box-shadow 0.3s, transform 0.2s', cursor: 'default' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.transform = 'none' }}>

      {/* Color band with emoji */}
      <div style={{ background: item.bg, padding: '36px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 44 }}>{item.emoji}</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: f, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 9999, background: item.status === 'Live' ? 'rgba(34,197,94,0.15)' : 'rgba(99,102,241,0.1)', color: item.status === 'Live' ? '#15803d' : '#6366f1', border: `1px solid ${item.status === 'Live' ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.2)'}` }}>
            {item.status === 'Live' ? '● Live' : '⟳ Ongoing'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div>
            <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,55%)', margin: '0 0 6px' }}>{item.type} · {item.year}</p>
            <h3 style={{ fontFamily: f, fontSize: 'clamp(1.1rem,1.6vw,1.3rem)', fontWeight: 700, letterSpacing: '-0.015em', color: 'hsl(0,0%,8%)', margin: 0, lineHeight: 1.2 }}>{item.name}</h3>
          </div>
        </div>

        <p style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,40%)', lineHeight: 1.7, margin: '0 0 20px' }}>{item.description}</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {item.tags.map(tag => (
            <span key={tag} style={{ padding: '3px 10px', borderRadius: 9999, background: 'hsl(0,0%,96%)', border: '1px solid hsl(0,0%,90%)', fontFamily: f, fontSize: 11, color: 'hsl(0,0%,40%)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: f, fontSize: 13, fontWeight: 500, color: 'hsl(0,0%,8%)', textDecoration: 'none', padding: '8px 16px', borderRadius: 9999, border: '1px solid hsl(0,0%,85%)', background: 'white', transition: 'all 0.15s' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'hsl(0,0%,8%)'; el.style.background = 'hsl(0,0%,8%)'; el.style.color = 'white' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'hsl(0,0%,85%)'; el.style.background = 'white'; el.style.color = 'hsl(0,0%,8%)' }}>
          View build
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
            <path d="M6 4h6v6M12 4 5 11"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
