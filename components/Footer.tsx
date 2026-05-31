"use client";

import Link from "next/link";
import { Mail, MapPin, Clock, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#001337", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-10 md:mb-16 items-start">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/JG Mobility Transparant.png"
                alt="JG Mobility"
                className="h-20 md:h-40 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              Specialist in consignatie, inkoop en verkoop van premium auto&apos;s. Persoonlijk, transparant en betrouwbaar — vanuit Barendrecht.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, href: "https://www.instagram.com/jgmobility/", label: "Instagram" },
                { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: "https://www.facebook.com/profile.php?id=61588831825340", label: "Facebook" },
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>,
                  href: "#",
                  label: "TikTok",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigatie */}
          <div className="pt-0 md:pt-10">
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}>
              Navigatie
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Diensten", href: "/diensten" },
                { label: "Consignatie", href: "/consignatie" },
                { label: "Aanbod", href: "/aanbod" },
                { label: "Ons Verhaal", href: "/over-ons" },
                { label: "Contact", href: "/contact" },
                { label: "Blog", href: "/blog" },
                { label: "Veelgestelde vragen", href: "/faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Adres */}
          <div className="pt-0 md:pt-10">
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}>
              Adres
            </h4>
            <div className="flex items-start gap-3 mb-4">
              <MapPin size={14} style={{ color: "rgba(255,255,255,0.5)", marginTop: 2, flexShrink: 0 }} />
              <div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}>Arnhemseweg 10a</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}>2994 LA Barendrecht</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>Zuid-Holland</p>
              </div>
            </div>
            <a
              href="mailto:info@jgmobility.nl"
              className="flex items-center gap-3 text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <Mail size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
              info@jgmobility.nl
            </a>
            <a
              href="tel:+31621331374"
              className="flex items-center gap-3 text-sm transition-colors mt-3"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <Phone size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
              +31 6 21331374
            </a>
          </div>

          {/* Openingstijden */}
          <div className="pt-0 md:pt-10">
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}>
              Openingstijden
            </h4>
            <div className="flex items-start gap-3">
              <Clock size={14} style={{ color: "rgba(255,255,255,0.5)", marginTop: 2, flexShrink: 0 }} />
              <ul className="flex flex-col gap-2">
                {[
                  { dag: "Ma t/m zo", tijd: "10:00 – 21:00" },
                ].map((r) => (
                  <li key={r.dag} className="flex justify-between gap-4 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{r.dag}</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{r.tijd}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Kaart */}
        <div className="mb-10 md:mb-16 relative overflow-hidden group" style={{ height: "280px", border: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Google Maps embed */}
          <iframe
            src="https://maps.google.com/maps?q=51.8598474,4.5138975&z=16&output=embed&hl=nl"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="JG Mobility locatie"
          />
          {/* Blauwe tint overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(135deg, rgba(0,19,55,0.25) 0%, rgba(0,32,96,0.15) 100%)",
            mixBlendMode: "multiply",
          }} />
          {/* Klikbare overlay naar Google Maps */}
          <a
            href="https://www.google.com/maps/place/JD+Automotive/@51.8598507,4.5113226,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "rgba(0,19,55,0.9)", backdropFilter: "blur(6px)" }}
          >
            <div className="flex items-center gap-2">
              <MapPin size={13} style={{ color: "rgba(255,255,255,0.6)" }} />
              <span className="text-xs font-semibold text-white" style={{ fontFamily: "var(--font-inter)" }}>
                Barendrecht, Zuid-Holland
              </span>
            </div>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}>
              Openen in Google Maps →
            </span>
          </a>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}
        >
          <span>© {new Date().getFullYear()} JG Mobility. Alle rechten voorbehouden.</span>
          <span>KvK: 42042275 &nbsp;·&nbsp; BTW: NL005450398B70</span>
        </div>
      </div>
    </footer>
  );
}
