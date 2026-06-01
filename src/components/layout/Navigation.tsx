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
    <>
      {/* Name — top left, outside pill */}
      <div className="fixed top-6 left-8 z-[200]">
        <Link
          to="/"
          className="text-sm font-semibold text-[#141414] tracking-tight hover:text-[#6366F1] transition-colors duration-150"
          style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
        >
          Deepak Maan
        </Link>
      </div>

      {/* Nav pill — top right */}
      <nav
        className="fixed top-6 right-8 z-[200]"
        aria-label="Main navigation"
      >
        <div
          className={`
            flex items-center gap-0.5 px-1.5 py-1.5 rounded-full
            bg-white/90 backdrop-blur-md
            border border-[#E2E2DF]
            transition-all duration-300
            ${scrolled ? 'shadow-md' : 'shadow-sm'}
          `}
          style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
        >
          <NavLink href="/#work" label="Work" />
          <NavLink href="/shipped" label="Shipped" isActive={isActive('/shipped')} />
          <NavLink href="/writings" label="Writings" isActive={isActive('/writings')} />

          <div className="w-px h-4 bg-[#E2E2DF] mx-1" />

          <ExternalNavLink
            href="https://drive.google.com/file/d/17oO7L80b3_m4ooBDDPOrQkmlqUyIjHvw/view?usp=sharing"
            label="Resume"
          />
          <ExternalNavLink
            href="https://linkedin.com/in/deepakmaan"
            label="LinkedIn"
          />
        </div>
      </nav>
    </>
  )
}

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
      transition-all duration-150 whitespace-nowrap
      ${isActive
        ? 'bg-[#141414] text-white'
        : 'text-[#6B6B6B] hover:text-[#141414] hover:bg-[#EAEAE7]'
      }
    `}
    style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
  >
    {label}
  </a>
)

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
      text-[#6B6B6B] hover:text-[#141414] hover:bg-[#EAEAE7]
      transition-all duration-150
      flex items-center gap-1 whitespace-nowrap
    "
    style={{ fontFamily: "'Overused Grotesk', sans-serif" }}
  >
    {label}
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className="opacity-40"
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
