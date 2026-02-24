import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: isHome ? "#work" : "/#work" },
    { label: "About", href: isHome ? "#about" : "/#about" },
    { label: "Process", href: isHome ? "#process" : "/#process" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  const LinkOrAnchor = ({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
    if (href.startsWith("#")) {
      return <a href={href} className={className} onClick={onClick}>{children}</a>;
    }
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-[15px] font-medium text-foreground tracking-tight hover:opacity-70 transition-opacity"
        >
          Deepak Maan
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <LinkOrAnchor
                href={link.href}
                className="type-caption text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </LinkOrAnchor>
            </li>
          ))}
          <li>
            <LinkOrAnchor
              href={isHome ? "#contact" : "/#contact"}
              className="type-caption px-5 py-2 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </LinkOrAnchor>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <LinkOrAnchor
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="type-body text-foreground hover:opacity-70 transition-opacity"
            >
              {link.label}
            </LinkOrAnchor>
          ))}
          <LinkOrAnchor
            href={isHome ? "#contact" : "/#contact"}
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center type-caption px-5 py-2.5 bg-foreground text-background rounded-full"
          >
            Get in Touch
          </LinkOrAnchor>
        </div>
      )}
    </header>
  );
};

export default Navigation;
