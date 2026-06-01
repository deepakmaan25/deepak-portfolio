import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const f = "'Overused Grotesk', sans-serif"

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Name — top left */}
      <div style={{ position: 'fixed', top: '24px', left: '32px', zIndex: 200 }}>
        <Link to="/" style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#141414',
          letterSpacing: '-0.01em',
          fontFamily: f,
          textDecoration: 'none',
        }}>
          Deepak Maan
        </Link>
      </div>

      {/* Pill — top right */}
      <nav style={{ position: 'fixed', top: '20px', right: '32px', zIndex: 200 }} aria-label="Main navigation">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '5px 6px',
          borderRadius: '9999px',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #E2E2DF',
          boxShadow: scrolled ? '0 4px 16px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.3s',
          fontFamily: f,
        }}>
          <NavLink href="/#work" label="Work" />
          <NavLink href="/shipped" label="Shipped" isActive={isActive('/shipped')} />
          <NavLink href="/writings" label="Writings" isActive={isActive('/writings')} />

          <span style={{ width: '1px', height: '14px', background: '#E2E2DF', margin: '0 4px' }} />

          <ExternalNavLink href="https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing" label="Resume" />
          <ExternalNavLink href="https://linkedin.com/in/deepakmaan" label="LinkedIn" />
        </div>
      </nav>
    </>
  )
}

const NavLink = ({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) => (
  <a href={href} style={{
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 400,
    fontFamily: f,
    color: isActive ? 'white' : '#6B6B6B',
    background: isActive ? '#141414' : 'transparent',
    textDecoration: 'none',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  }}
    onMouseEnter={e => { if (!isActive) { const el = e.currentTarget; el.style.color = '#141414'; el.style.background = '#F0F0EC' } }}
    onMouseLeave={e => { if (!isActive) { const el = e.currentTarget; el.style.color = '#6B6B6B'; el.style.background = 'transparent' } }}
  >
    {label}
  </a>
)

const ExternalNavLink = ({ href, label }: { href: string; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '13px',
    fontWeight: 400,
    fontFamily: f,
    color: '#6B6B6B',
    textDecoration: 'none',
    transition: 'all 0.15s',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
  }}
    onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#141414'; el.style.background = '#F0F0EC' }}
    onMouseLeave={e => { const el = e.currentTarget; el.style.color = '#6B6B6B'; el.style.background = 'transparent' }}
  >
    {label}
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5 }}>
      <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </a>
)

export default Navigation
