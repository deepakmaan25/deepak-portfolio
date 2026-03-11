import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const sections = ["work", "about", "process", "contact"];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

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
            {navLinks.map((link) => {
              const sectionId = link.href.replace(/.*#/, "");
              const isActive = activeSection === sectionId;
              return (
                <li key={link.label}>
                  <LinkOrAnchor
                    href={link.href}
                    className={`text-[14px] transition-colors ${isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {link.label}
                  </LinkOrAnchor>
                </li>
              );
            })}
          </ul>

          {/* Desktop right: theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <LinkOrAnchor
              href={isHome ? "#contact" : "/#contact"}
              className="inline-flex items-center px-5 py-2 bg-foreground text-primary-foreground text-[14px] font-medium rounded-full hover:opacity-85 transition-opacity"
            >
              Get in Touch
            </LinkOrAnchor>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button className="flex flex-col gap-1.5 p-2 relative z-[60]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8" style={{ background: 'rgba(12,12,15,0.97)' }}>
            {navLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <LinkOrAnchor href={link.href} onClick={() => setMenuOpen(false)} className="text-3xl font-bold text-white hover:text-white/70 transition-colors">
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
