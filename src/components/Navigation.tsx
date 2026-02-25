import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Work", href: isHome ? "#work" : "/#work" },
    { label: "About", href: isHome ? "#about" : "/#about" },
    { label: "Process", href: isHome ? "#process" : "/#process" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  const LinkOrAnchor = ({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
    if (href.startsWith("#")) return <a href={href} className={className} onClick={onClick}>{children}</a>;
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <nav className="max-w-site mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-[16px] font-semibold text-foreground hover:opacity-70 transition-opacity">
            Deepak Maan
          </Link>

          {/* Desktop center links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <LinkOrAnchor href={link.href} className="text-[14px] text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </LinkOrAnchor>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <LinkOrAnchor
            href={isHome ? "#contact" : "/#contact"}
            className="hidden md:inline-flex items-center px-5 py-2 bg-foreground text-primary-foreground text-[14px] font-medium rounded-full hover:bg-foreground/85 transition-colors"
          >
            Get in Touch
          </LinkOrAnchor>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2 relative z-[60]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[55] bg-background flex flex-col items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <LinkOrAnchor href={link.href} onClick={() => setMenuOpen(false)} className="text-3xl font-bold text-foreground hover:text-muted-foreground transition-colors">
                  {link.label}
                </LinkOrAnchor>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
