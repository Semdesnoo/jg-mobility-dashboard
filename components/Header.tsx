"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const diensten = [
  { label: "Inkoop & Taxatie", href: "/diensten/inkoop-taxatie" },
  { label: "Financiering", href: "/diensten/financiering" },
  { label: "Afleverpakketten", href: "/diensten/afleverpakketten" },
];

const navItems = [
  { label: "DIENSTEN", href: "/diensten", hasDropdown: true },
  { label: "CONSIGNATIE", href: "/consignatie" },
  { label: "AANBOD", href: "/aanbod" },
  { label: "ONS VERHAAL", href: "/over-ons" },
  { label: "CONTACT", href: "/contact" },
];

const socialIcons = [
  {
    label: "Instagram",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
      </svg>
    ),
  },
];

function IconBtn({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      title={title}
      target={href.startsWith("http") || href === "#" ? "_blank" : undefined}
      rel={href.startsWith("http") || href === "#" ? "noopener noreferrer" : undefined}
      className="flex items-center justify-center w-11 h-11 transition-all hover:bg-white/10"
      style={{ border: "1px solid rgba(255,255,255,0.32)" }}
    >
      {children}
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [merkenOpen, setMerkenOpen] = useState(false);
  const [mobileDienstenOpen, setMobileDienstenOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMerkenOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMerkenOpen(false);
    setMobileDienstenOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#001337",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {/* ── BOVENBALK ── */}
      <div className="hidden lg:block" style={{ overflow: "hidden" }}>
        <motion.div
          initial={false}
          animate={scrolled ? "hidden" : "visible"}
          variants={{
            visible: { height: "auto", opacity: 1 },
            hidden: { height: 0, opacity: 0 },
          }}
          transition={{
            height: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.35, ease: "easeInOut" },
          }}
          className="grid px-8 py-3"
          style={{
            gridTemplateColumns: "1fr auto 1fr",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* Links: mail + telefoon */}
          <div className="flex items-center gap-3">
            <IconBtn href="mailto:info@jgmobility.nl" title="E-mail">
              <Mail size={15} color="white" />
            </IconBtn>
            <IconBtn href="tel:" title="Bellen">
              <Phone size={15} color="white" />
            </IconBtn>
          </div>

          {/* Midden: logo */}
          <Link href="/" className="flex items-center justify-center group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/JG Mobility Transparant.png"
              alt="JG Mobility"
              className="h-24 w-auto object-contain transition-opacity group-hover:opacity-80"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Rechts: social icons */}
          <div className="flex items-center justify-end gap-3">
            {socialIcons.map((s) => (
              <IconBtn key={s.label} href="#" title={s.label}>
                {s.icon}
              </IconBtn>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── NAVIGATIEBALK: volle breedte gespreid ── */}
      <div
        className="hidden lg:flex items-stretch justify-between px-8"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
      >
        {navItems.map((item) => {
          const active =
            (item.label === "AANBOD" && pathname === "/aanbod") ||
            (item.href !== "/aanbod" && pathname === item.href);

          if (item.hasDropdown) {
            return (
              <div
                key={item.label}
                ref={dropdownRef}
                className="relative flex items-stretch"
              >
                <button
                  onClick={() => setMerkenOpen(!merkenOpen)}
                  className="flex items-center gap-2 px-6 py-5 font-semibold tracking-[0.18em] transition-all duration-200 hover:bg-white/5 hover:scale-[1.06] hover:-translate-y-px"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: merkenOpen ? "#ffffff" : "rgba(255,255,255,0.85)",
                    backgroundColor: merkenOpen ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  {item.label}
                  <ChevronDown size={11} className={`transition-transform duration-200 ${merkenOpen ? "rotate-180" : ""}`} />
                </button>
                {merkenOpen && (
                  <div
                    className="absolute top-full left-0 w-64 py-1 z-50"
                    style={{
                      backgroundColor: "#001337",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderTop: "2px solid #ffffff",
                    }}
                  >
                    {diensten.map((d, idx) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        className="block px-5 py-3.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        style={{
                          fontFamily: "var(--font-inter)",
                          borderBottom: idx < diensten.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        }}
                        onClick={() => setMerkenOpen(false)}
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => { if (active) { const start = window.scrollY; const duration = 500; const startTime = performance.now(); const step = (now: number) => { const elapsed = now - startTime; const progress = Math.min(elapsed / duration, 1); const ease = 1 - Math.pow(1 - progress, 4); window.scrollTo(0, start * (1 - ease)); if (progress < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }; }}
              className="relative flex items-center px-6 py-5 font-semibold tracking-[0.18em] transition-all duration-200 hover:bg-white/5 hover:scale-[1.06] hover:-translate-y-px hover:text-white"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                color: active ? "#ffffff" : "rgba(255,255,255,0.85)",
                backgroundColor: active ? "rgba(255,255,255,0.06)" : "transparent",
              }}
            >
              {item.label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "#ffffff" }} />
              )}
            </Link>
          );
        })}
      </div>

      {/* ── MOBILE HEADER ── */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3">
        <Link href="/" scroll={true} className="flex items-center" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/JG Mobility Transparant.png"
            alt="JG Mobility"
            className="h-12 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </Link>
        <button
          className="flex items-center justify-center w-11 h-11 transition-all hover:bg-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.32)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm flex flex-col"
              style={{ backgroundColor: "#001337", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header van panel */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                  Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <X size={16} color="white" />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex flex-col flex-1 overflow-y-auto">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.1 + idx * 0.05 }}
                  >
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setMobileDienstenOpen(!mobileDienstenOpen)}
                          className="w-full flex items-center justify-between px-6 font-semibold tracking-[0.12em] text-left"
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "16px",
                            color: "#ffffff",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            minHeight: "60px",
                          }}
                        >
                          {item.label}
                          <ChevronDown size={16} className={`transition-transform duration-200 flex-shrink-0 ${mobileDienstenOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileDienstenOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              style={{ overflow: "hidden", backgroundColor: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                            >
                              {diensten.map((d) => (
                                <a
                                  key={d.href}
                                  href={d.href}
                                  className="flex items-center px-8 py-4 text-sm"
                                  style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.75)", borderBottom: "1px solid rgba(255,255,255,0.04)", minHeight: "52px", WebkitTapHighlightColor: "rgba(255,255,255,0.1)" }}
                                  onClick={() => { setMenuOpen(false); setMobileDienstenOpen(false); }}
                                >
                                  {d.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className="flex items-center px-6 font-semibold tracking-[0.12em]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "16px",
                          color: pathname === item.href ? "#ffffff" : "rgba(255,255,255,0.85)",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          minHeight: "60px",
                          WebkitTapHighlightColor: "rgba(255,255,255,0.1)",
                        }}
                        onClick={() => { setMenuOpen(false); if (pathname === item.href) { const start = window.scrollY; const duration = 500; const startTime = performance.now(); const step = (now: number) => { const elapsed = now - startTime; const progress = Math.min(elapsed / duration, 1); const ease = 1 - Math.pow(1 - progress, 4); window.scrollTo(0, start * (1 - ease)); if (progress < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }; }}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Socials onderaan */}
              <div className="px-6 py-5 flex items-center justify-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {socialIcons.map((s) => (
                  <a key={s.label} href="#" title={s.label} className="flex items-center justify-center w-10 h-10 hover:bg-white/10 transition-all" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
