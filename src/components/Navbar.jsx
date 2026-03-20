import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-40 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(12px) saturate(1.2)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          className="text-lg font-bold tracking-tight no-underline"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: "linear-gradient(135deg, #00d9ff, #ff006e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          data-cursor-hover
        >
          MO.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-1 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-medium tracking-wide uppercase px-3 py-2 rounded-lg transition-all duration-300 no-underline"
                style={{ color: "#888" }}
                onMouseEnter={(e) => { e.target.style.color = "#00d9ff"; e.target.style.background = "rgba(0,217,255,0.05)"; }}
                onMouseLeave={(e) => { e.target.style.color = "#888"; e.target.style.background = "transparent"; }}
                data-cursor-hover
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none"
          aria-label="Toggle menu"
          data-cursor-hover
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 origin-center"
            style={{ background: "#fff" }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5"
            style={{ background: "#fff" }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 origin-center"
            style={{ background: "#fff" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(10,10,10,0.95)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <ul className="flex flex-col gap-1 p-4 list-none m-0">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-medium rounded-lg px-4 py-3 transition-all duration-300 no-underline"
                    style={{ color: "#aaa" }}
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
