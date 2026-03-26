import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const sections = ["work", "process", "about", "contact"];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isWork = location.pathname.startsWith("/case-study");

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
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
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
    { label: "Work", href: isHome ? "#work" : "/#work", sectionId: "work" },
    { label: "Process", href: isHome ? "#process" : "/#process", sectionId: "process" },
    { label: "About", href: isHome ? "#about" : "/#about", sectionId: "about" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact", sectionId: "contact" },
  ];

  const LinkOrAnchor = ({
    href, children, className, onClick,
  }: {
    href: string; children: React.ReactNode; className?: string; onClick?: () => void;
  }) => {
    if (href.startsWith("#")) {
      return <a href={href} className={className} onClick={onClick}>{children}</a>;
    }
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-background/90 backdrop-blur-sm border-b border-border/40"
        }`}
      >
        {/* Fixed height h-16 = 64px always */}
        <nav className="max-w-site mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-[15px] font-semibold text-foreground hover:opacity-70 transition-opacity flex-shrink-0"
          >
            Deepak Maan
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isWork
                ? link.sectionId === "work"
                : activeSection === link.sectionId;
              return (
                <li key={link.label}>
                  <LinkOrAnchor
                    href={link.href}
                    className={`text-[14px] transition-colors duration-200 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </LinkOrAnchor>
                </li>
              );
            })}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 bg-foreground text-primary-foreground text-[13px] font-medium rounded-full hover:opacity-85 transition-opacity"
            >
              Resume
            </a>
          </div>

          {/* Mobile right — toggle + hamburger, tightly controlled */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 relative z-[60] flex-shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] w-5 bg-foreground rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block h-[1.5px] w-5 bg-foreground rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-[1.5px] w-5 bg-foreground rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(10,10,14,0.97)" }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <LinkOrAnchor
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-bold text-white hover:text-white/60 transition-colors"
                >
                  {link.label}
                </LinkOrAnchor>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
            >
              
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
