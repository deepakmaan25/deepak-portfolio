import { useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()
  const f = "'Overused Grotesk', sans-serif"

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: '20px 32px',
    }}>
      <div style={{
        maxWidth: 1152, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <a href="/" style={{
          fontFamily: f, fontSize: 15, fontWeight: 500,
          letterSpacing: '-0.01em', color: '#141414', textDecoration: 'none',
          flexShrink: 0, transition: 'opacity 0.15s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.6' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          Deepak Maan
        </a>

        <nav style={{
          display: 'flex', alignItems: 'center', gap: 2,
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,0,0,0.09)',
          borderRadius: 9999,
          padding: '5px 7px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}>
          <NavLink href="/#work" label="Work" />
          <NavLink href="/shipped" label="Shipped" active={location.pathname === '/shipped'} />
          <NavLink href="/writings" label="Writings" active={location.pathname === '/writings'} />
          <ExtLink href="https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing" label="Resume" />
          <ExtLink href="https://linkedin.com/in/deepakmaan25" label="LinkedIn" />
        </nav>
      </div>
    </header>
  )
}

const base = {
  fontFamily: "'Overused Grotesk', sans-serif",
  fontSize: 14, fontWeight: 400,
  padding: '7px 16px', borderRadius: 9999,
  textDecoration: 'none', whiteSpace: 'nowrap' as const,
  transition: 'all 0.15s',
  display: 'inline-flex', alignItems: 'center' as const, gap: 4,
}

const NavLink = ({ href, label, active }: { href: string; label: string; active?: boolean }) => (
  <a href={href} style={{ ...base, color: active ? 'white' : 'rgba(10,10,10,0.62)', background: active ? '#141414' : 'transparent' }}
    onMouseEnter={e => { if (!active) { const el = e.currentTarget; el.style.color = '#141414'; el.style.background = 'rgba(10,10,10,0.06)' } }}
    onMouseLeave={e => { if (!active) { const el = e.currentTarget; el.style.color = 'rgba(10,10,10,0.62)'; el.style.background = 'transparent' } }}
  >
    {label}
  </a>
)

const ExtLink = ({ href, label }: { href: string; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    style={{ ...base, color: 'rgba(10,10,10,0.62)' }}
    onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#141414'; el.style.background = 'rgba(10,10,10,0.06)' }}
    onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'rgba(10,10,10,0.62)'; el.style.background = 'transparent' }}
  >
    {label}
  </a>
)

export default Navigation
