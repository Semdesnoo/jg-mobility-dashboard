"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Package, Star, Sparkles } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const pakketten = [
  {
    naam: "Basis",
    icon: <Package size={24} />,
    sub: "Altijd inbegrepen",
    punten: [
      "Grondige wasbeurt buiten & binnen",
      "Bandenspanning controleren",
      "Vloeistoffenpeil checken",
      "Visuele veiligheidscheck",
      "Tankbeurt op aflevering",
    ],
    kleur: "#f5f5f5",
    tekstKleur: "#001337",
  },
  {
    naam: "Comfort",
    icon: <Star size={24} />,
    sub: "Meest gekozen",
    punten: [
      "Alles uit Basis",
      "APK-keuring (indien nodig)",
      "Professionele interieur reiniging",
      "Lak- en bandenbehandeling",
    ],
    kleur: "#001337",
    tekstKleur: "#ffffff",
    aanbevolen: true,
  },
  {
    naam: "Premium",
    icon: <Sparkles size={24} />,
    sub: "Volledig ontzorgd",
    punten: [
      "Alles uit Comfort",
      "Volledige detailing beurt",
      "Lak- en glascoating",
      "12 maanden garantie",
      "Thuisbezorgd op uw locatie",
      "Maatwerk op aanvraag",
    ],
    kleur: "#f5f5f5",
    tekstKleur: "#001337",
  },
];

export default function AfleverpakkettenPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-20 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/diensten" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-6 hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
              ← Diensten
            </Link>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
            Afleverpakketten
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base max-w-xl" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
            Uw nieuwe auto verdient een perfecte start. Van een grondige wasbeurt tot een volledige detailing — wij leveren uw voertuig af precies zoals u het wil hebben.
          </motion.p>
        </div>
      </div>

      {/* Pakketten */}
      <section className="py-20 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Kies uw pakket</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Wat staat er voor u klaar?</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pakketten.map((p, i) => (
              <AnimateOnScroll key={p.naam} delay={i * 0.1}>
                <div
                  className="relative p-7 rounded-none flex flex-col h-full"
                  style={{ backgroundColor: p.kleur, border: p.aanbevolen ? "2px solid #001337" : "1px solid rgba(0,19,55,0.08)" }}
                >
                  {p.aanbevolen && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-none text-[10px] font-bold tracking-widest uppercase" style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)", border: "1px solid rgba(0,19,55,0.15)" }}>
                      Meest gekozen
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-none flex items-center justify-center" style={{ backgroundColor: p.aanbevolen ? "rgba(255,255,255,0.12)" : "rgba(0,19,55,0.06)", color: p.tekstKleur }}>
                      {p.icon}
                    </div>
                  </div>
                  <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: p.aanbevolen ? "rgba(255,255,255,0.4)" : "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}>{p.sub}</p>
                  <h3 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-playfair)", color: p.tekstKleur }}>{p.naam}</h3>
                  <ul className="flex flex-col gap-3 flex-1">
                    {p.punten.map((punt) => (
                      <li key={punt} className="flex items-start gap-3 text-sm" style={{ color: p.aanbevolen ? "rgba(255,255,255,0.75)" : "rgba(0,19,55,0.65)", fontFamily: "var(--font-inter)" }}>
                        <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: p.aanbevolen ? "rgba(255,255,255,0.5)" : "#001337" }} />
                        {punt}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll>
            <p className="text-center text-xs mt-8" style={{ color: "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}>
              Wilt u iets specifieks? Wij stellen graag een maatwerk pakket samen. Neem contact op.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Wat is detailing */}
      <section className="py-20 px-6" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <AnimateOnScroll direction="left">
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Kwaliteit first</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ fontFamily: "var(--font-playfair)", color: "#001337", lineHeight: 1.2 }}>
                Een auto die er als nieuw uitziet
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>
                Bij JG Mobility geloven wij dat de eerste indruk telt. Elk voertuig dat wij afleveren, is grondig schoongemaakt, gecontroleerd en klaar voor de weg. Niet halfbakken — maar echt goed.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>
                Of u nu kiest voor een basispakket of een volledige premium detailing beurt — u rijdt weg met een auto waar u trots op bent.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="flex flex-col gap-4">
              {[
                "Professionele producten en apparatuur",
                "Aandacht voor elk detail, binnen en buiten",
                "Lak beschermd tegen weersomstandigheden",
                "Ruiten behandeld voor optimaal zicht",
                "Banden en velgen in topstaat",
              ].map((punt) => (
                <div key={punt} className="flex items-center gap-3 p-4 rounded-none" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}>
                  <CheckCircle size={15} style={{ color: "#001337", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "rgba(0,19,55,0.7)", fontFamily: "var(--font-inter)" }}>{punt}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: "#001337" }}>
        <div className="max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Vrijblijvend advies</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-playfair)" }}>Welk pakket past bij u?</h2>
            <p className="text-sm text-white/45 mb-8" style={{ fontFamily: "var(--font-inter)" }}>
              Neem contact op en wij adviseren u welk pakket het beste bij uw auto en wensen past.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none text-sm font-semibold transition-all hover:scale-105" style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}>
              Neem contact op
              <ArrowRight size={14} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
