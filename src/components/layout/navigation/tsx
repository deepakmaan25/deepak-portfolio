import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
    <nav
      className="fixed top-5 right-6 z-[200] transition-all duration-300"
      aria-label="Main navigation"
    >
      <div
        className={`
          flex items-center gap-1 px-2 py-2 rounded-full
          bg-white/90 backdrop-blur-md
          border border-border
          transition-all duration-300
          ${scrolled ? 'shadow-md' : 'shadow-sm'}
        `}
      >
        {/* Name / logo — left side, outside pill on desktop but inside on mobile */}
        <div className="hidden md:flex items-center px-3 mr-1">
          <Link
            to="/"
            className="text-sm font-semibold text-text-primary tracking-tight hover:text-accent transition-colors duration-150"
          >
            Deepak Maan
          </Link>
        </div>

        <div className="w-px h-4 bg-border hidden md:block" />

        {/* Nav links */}
        <NavLink href="/#work" label="Work" />
        <NavLink href="/shipped" label="Shipped" />
        <NavLink href="/writings" label="Writings" isActive={isActive('/writings')} />

        <div className="w-px h-4 bg-border mx-1" />

        {/* External links */}
        <ExternalNavLink
          href="https://drive.google.com/your-resume-link"
          label="Resume"
        />
        <ExternalNavLink
          href="https://linkedin.com/in/deepakmaan"
          label="LinkedIn"
        />
      </div>
    </nav>
  )
}

/* ---- Internal nav link ---- */
const NavLink = ({
  href,
  label,
  isActive,
}: {
  href: string
  label: string
  isActive?: boolean
}) => (
  <a
    href={href}
    className={`
      px-3 py-1.5 rounded-full text-sm font-medium
      transition-all duration-150
      ${isActive
        ? 'bg-text-primary text-text-inverse'
        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
      }
    `}
  >
    {label}
  </a>
)

/* ---- External nav link (with arrow) ---- */
const ExternalNavLink = ({
  href,
  label,
}: {
  href: string
  label: string
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="
      px-3 py-1.5 rounded-full text-sm font-medium
      text-text-secondary hover:text-text-primary hover:bg-bg-secondary
      transition-all duration-150
      flex items-center gap-1
    "
  >
    {label}
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className="opacity-50"
    >
      <path
        d="M2 8L8 2M8 2H3.5M8 2V6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
)

export default Navigation
