import { useLocation } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useMediaQuery'

const Navigation = () => {
  const location = useLocation()
  const isMobile = useIsMobile()
  const f = "'Overused Grotesk', sans-serif"

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: isMobile ? '14px 16px' : '20px 32px',
    }}>
      <div style={{
        maxWidth: 1152, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <a href="/" style={{
          fontFamily: f, fontSize: isMobile ? 14 : 15, fontWeight: 500,
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
          padding: isMobile ? '4px 5px' : '5px 7px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}>
          <NavLink href="/#work" label="Work" mobile={isMobile} />
          <NavLink href="/shipped" label="Shipped" active={location.pathname === '/shipped'} mobile={isMobile} />
          <NavLink href="/writings" label="Writings" active={location.pathname === '/writings'} mobile={isMobile} />
          {!isMobile && (
            <>
              <ExtLink href="https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing" label="Resume" mobile={isMobile} />
              <ExtLink href="https://linkedin.com/in/deepakmaan25" label="LinkedIn" mobile={isMobile} />
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

const base = (mobile?: boolean) => ({
  fontFamily: "'Overused Grotesk', sans-serif",
  fontSize: mobile ? 12 : 14, fontWeight: 400,
  padding: mobile ? '6px 10px' : '7px 16px', borderRadius: 9999,
  textDecoration: 'none', whiteSpace: 'nowrap' as const,
  transition: 'all 0.15s',
  display: 'inline-flex', alignItems: 'center' as const, gap: 4,
})

const NavLink = ({ href, label, active, mobile }: { href: string; label: string; active?: boolean; mobile?: boolean }) => (
  <a href={href} style={{ ...base(mobile), color: active ? 'white' : 'rgba(10,10,10,0.62)', background: active ? '#141414' : 'transparent' }}
    onMouseEnter={e => { if (!active) { const el = e.currentTarget; el.style.color = '#141414'; el.style.background = 'rgba(10,10,10,0.06)' } }}
    onMouseLeave={e => { if (!active) { const el = e.currentTarget; el.style.color = 'rgba(10,10,10,0.62)'; el.style.background = 'transparent' } }}
  >
    {label}
  </a>
)

const ExtLink = ({ href, label, mobile }: { href: string; label: string; mobile?: boolean }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    style={{ ...base(mobile), color: 'rgba(10,10,10,0.62)' }}
    onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#141414'; el.style.background = 'rgba(10,10,10,0.06)' }}
    onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'rgba(10,10,10,0.62)'; el.style.background = 'transparent' }}
  >
    {label}
  </a>
)

export default Navigation
