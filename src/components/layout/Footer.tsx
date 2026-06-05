import { useIsMobile } from '../../hooks/useMediaQuery'

const f = "'Overused Grotesk', Inter, system-ui, sans-serif"

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={{
      backgroundColor: '#0C0C0F',
      padding: isMobile ? '48px 20px 32px' : '60px 32px 40px',
      fontFamily: f,
    }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: isMobile ? 40 : 48,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 36 : 32,
        }}>
          <div>
            <p style={{ fontFamily: f, fontSize: isMobile ? 18 : 20, fontWeight: 700, color: 'white', letterSpacing: '-0.015em', margin: '0 0 8px' }}>
              Deepak Maan
            </p>
            <p style={{ fontFamily: f, fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0, maxWidth: 280 }}>
              Product Designer. I research, design, and ship end to end.
            </p>
          </div>

          <div style={{ display: 'flex', gap: isMobile ? 40 : 48 }}>
            <div>
              <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', margin: '0 0 14px' }}>Work</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Case Studies', href: '/#work' },
                  { label: 'Shipped Builds', href: '/shipped' },
                  { label: 'Writings', href: '/writings' },
                ].map(link => (
                  <a key={link.label} href={link.href}
                    style={{ fontFamily: f, fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', margin: '0 0 14px' }}>Connect</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/deepakmaan25' },
                  { label: 'GitHub',   href: 'https://github.com/deepakmaan25' },
                  { label: 'Behance',  href: 'https://www.behance.net/deepakmaan1' },
                  { label: 'Resume',   href: 'https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing' },
                ].map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: f, fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)' }}>
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 12,
        }}>
          <p style={{ fontFamily: f, fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            © 2026 Deepak Maan. Built with React + TypeScript.
          </p>
          <a href="mailto:dipumaan2002@gmail.com"
            style={{ fontFamily: f, fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}>
            dipumaan2002@gmail.com
          </a>
        </div>

        <div style={{ marginTop: 32, overflow: 'hidden' }}>
          <p style={{ fontFamily: f, fontSize: 'clamp(3rem,14vw,10rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.04)', lineHeight: 1, margin: 0, userSelect: 'none' }}>
            deepak maan
          </p>
        </div>

      </div>
    </footer>
  )
}
