"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Handshake, Search, CreditCard, Package } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { autos as alleAutos } from "@/lib/autos";

const autos = alleAutos.slice(0, 3);

const diensten = [
  {
    title: "Consignatie",
    desc: "Wij verkopen jouw auto voor jou. Professionele presentatie, volledige ontzorging — zonder dat jij er iets voor hoeft te doen.",
    href: "/diensten/consignatie",
    bg: "radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.12) 0%, transparent 60%), linear-gradient(135deg, #001337 0%, #002060 100%)",
    icon: <Handshake size={24} />,
    sub: "Auto verkopen via consignatie",
  },
  {
    title: "Inkoop & Taxatie",
    desc: "Directe, eerlijke taxatie. Jouw auto snel en zonder gedoe van de hand voor een eerlijke prijs.",
    href: "/diensten/inkoop-taxatie",
    bg: "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.10) 0%, transparent 60%), linear-gradient(135deg, #001a45 0%, #001337 100%)",
    icon: <Search size={24} />,
    sub: "Eerlijke waardebepaling",
  },
  {
    title: "Financiering",
    desc: "Flexibele financieringsoplossingen voor uw droomauto. Wij regelen het van A tot Z.",
    href: "/diensten/financiering",
    bg: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.08) 0%, transparent 60%), linear-gradient(135deg, #002060 0%, #001337 100%)",
    icon: <CreditCard size={24} />,
    sub: "Maandelijkse betaling mogelijk",
  },
  {
    title: "Afleverpakketten",
    desc: "Complete aflevering met garantie, inspectie en service — zodat u zorgeloos de weg op gaat.",
    href: "/diensten/afleverpakketten",
    bg: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.09) 0%, transparent 60%), linear-gradient(135deg, #001337 0%, #001a45 100%)",
    icon: <Package size={24} />,
    sub: "Garantie & rijklaar",
  },
];

function DienstenSection() {
  const [actief, setActief] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <AnimateOnScroll>
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
            Wat wij bieden
          </p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
            Onze diensten
          </h2>
        </div>
      </AnimateOnScroll>

      {/* Harmonica panelen */}
      <AnimateOnScroll>
        <div className="flex h-[280px] md:h-[480px] overflow-hidden">
          {diensten.map((dienst, i) => (
            <motion.div
              key={dienst.title}
              className="relative flex-shrink-0 cursor-pointer overflow-hidden"
              animate={{ flexGrow: actief === i ? 1.8 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActief(i)}
              onMouseLeave={() => setActief(null)}
              onTouchStart={() => setActief(actief === i ? null : i)}
              style={{ background: dienst.bg }}
            >
              {/* Subtiel grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              {/* Collapsed state */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-between p-4 md:p-6"
                animate={{ opacity: actief === i ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon bovenin */}
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                  {dienst.icon}
                </div>
                {/* Verticale titel onderaan */}
                <div className="flex items-end">
                  <p
                    className="text-xs md:text-sm font-bold text-white"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {dienst.title}
                  </p>
                </div>
              </motion.div>

              {/* Expanded state */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-5 md:p-8"
                animate={{ opacity: actief === i ? 1 : 0, y: actief === i ? 0 : 16 }}
                transition={{ duration: 0.35, delay: actief === i ? 0.1 : 0 }}
              >
                {/* Icon — alleen desktop */}
                <div className="hidden md:flex w-12 h-12 items-center justify-center mb-5" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                  {dienst.icon}
                </div>
                {/* Tekst — alleen desktop */}
                <p className="hidden md:block text-[10px] tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                  {dienst.sub}
                </p>
                <h3 className="hidden md:block text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)", lineHeight: 1.15 }}>
                  {dienst.title}
                </h3>
                <p className="hidden md:block text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)", maxWidth: "260px" }}>
                  {dienst.desc}
                </p>
                {/* Knop — altijd zichtbaar */}
                <Link
                  href={dienst.href}
                  className="inline-flex items-center gap-2 self-start px-4 py-2 md:px-5 md:py-2.5 text-xs font-semibold tracking-widest uppercase transition-all hover:gap-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                >
                  Meer info
                  <ArrowRight size={11} />
                </Link>
              </motion.div>

            </motion.div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}


const reviews = [
  { naam: "Thomas V.", initialen: "TV", kleur: "#1a3a6b", sterren: 5, tekst: "Uitstekende service van Jimi. Mijn auto was binnen twee weken verkocht voor een eerlijke prijs. Geen gedoe, gewoon resultaat.", datum: "2 weken geleden" },
  { naam: "Romy de Groot", initialen: "RG", kleur: "#2d4a7a", sterren: 5, tekst: "Professioneel, eerlijk en persoonlijk. Jimi nam de tijd om alles goed uit te leggen. Absoluut een aanrader voor consignatie.", datum: "1 maand geleden" },
  { naam: "Kevin M.", initialen: "KM", kleur: "#1e3d6e", sterren: 5, tekst: "Heel fijn bedrijf. Geen verborgen kosten, altijd bereikbaar. Mijn Porsche is voor een topprijs verkocht. Blij mee!", datum: "3 weken geleden" },
  { naam: "Sylvia B.", initialen: "SB", kleur: "#243f72", sterren: 5, tekst: "Jimi is betrokken, deskundig en houdt je op de hoogte. Voelde me echt ontzorgd van begin tot eind.", datum: "5 weken geleden" },
];

function Ster() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5c518">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ReviewsSection() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          {/* Header balk */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                Wat klanten zeggen
              </p>
              <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                Klantbeoordelingen
              </h2>
            </div>

            {/* Google score blok */}
            <div
              className="flex items-center gap-5 px-6 py-4 rounded-none"
              style={{ backgroundColor: "#001337", minWidth: "260px" }}
            >
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>Google</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>4.9</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Ster key={i} />)}
                  </div>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Op basis van Google reviews</p>
              </div>
              <div className="h-12 w-px ml-auto" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              <a
                href="https://g.page/r/jgmobility/review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-center hover:opacity-70 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)", minWidth: "70px" }}
              >
                Beoordeel<br />ons
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Review kaarten */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <AnimateOnScroll key={review.naam} delay={i * 0.1}>
              <div
                className="flex flex-col gap-4 p-6 rounded-none h-full"
                style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.06)" }}
              >
                {/* Sterren */}
                <div className="flex gap-0.5">
                  {[...Array(review.sterren)].map((_, s) => <Ster key={s} />)}
                </div>

                {/* Tekst */}
                <p className="text-sm leading-relaxed text-gray-500 flex-1" style={{ fontFamily: "var(--font-inter)" }}>
                  &ldquo;{review.tekst}&rdquo;
                </p>

                {/* Klant */}
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid rgba(0,19,55,0.06)" }}>
                  <div
                    className="w-9 h-9 rounded-none flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: review.kleur, fontFamily: "var(--font-inter)" }}
                  >
                    {review.initialen}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>{review.naam}</p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{review.datum}</p>
                  </div>
                  <div className="ml-auto">
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobielRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    [videoDesktopRef, videoMobielRef].forEach((ref) => {
      if (ref.current) {
        ref.current.muted = true;
        ref.current.play().catch(() => {});
      }
    });
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        {/* Video achtergrond — desktop */}
        <video
          ref={videoDesktopRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        >
          <source src="/Hero%20Laptop.mp4" type="video/mp4" />
        </video>

        {/* Video achtergrond — mobiel */}
        <video
          ref={videoMobielRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
        >
          <source src="/Hero%20Mobiel.mp4" type="video/mp4" />
        </video>

        {/* Tekst overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-10 md:pt-32">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#ffffff",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              Ontdek uw avontuur bij
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#ffffff",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              JG Mobility
            </motion.h1>
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/aanbod"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Bekijk Occasions
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-all hover:opacity-90"
              style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}
            >
              Plan Afspraak
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </Link>
          </motion.div>
        </div>

      </section>


      {/* ─── FEATURED COLLECTIE ─── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                  Geselecteerde voertuigen
                </p>
                <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                  Onze collectie
                </h2>
              </div>
              <Link
                href="/aanbod"
                className="flex items-center gap-2 text-sm font-semibold group"
                style={{ color: "#001337", fontFamily: "var(--font-inter)" }}
              >
                Alle voertuigen
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {autos.map((auto, i) => (
              <AnimateOnScroll key={auto.id} delay={i * 0.15} direction="up">
                <div
                  className="group rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* Foto */}
                  <div
                    className="relative h-56 overflow-hidden"
                    style={{ backgroundColor: "#001337" }}
                  >
                    {auto.fotos && auto.fotos.length > 0 ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={auto.fotos[0]}
                        alt={`${auto.merk} ${auto.model}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="text-5xl font-bold opacity-10"
                          style={{ fontFamily: "var(--font-playfair)", color: "#ffffff" }}
                        >
                          {auto.merk.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[10px] tracking-widest uppercase px-2 py-1 rounded"
                        style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}
                      >
                        {auto.bodytype}
                      </span>
                    </div>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                          {auto.merk}
                        </p>
                        <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                          {auto.model}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                          €{auto.prijs.toLocaleString("nl-NL")}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-4">
                      {[
                        { label: "Jaar", value: auto.bouwjaar },
                        { label: "KM", value: `${(auto.km / 1000).toFixed(0)}k` },
                        { label: "Pk", value: auto.vermogen.replace(" pk", "") },
                      ].map((spec) => (
                        <div key={spec.label} className="text-center py-2 rounded-none" style={{ backgroundColor: "#f5f5f5" }}>
                          <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{spec.label}</div>
                          <div className="text-sm font-bold mt-0.5" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>{spec.value}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/aanbod/${auto.id}`}
                      className="block w-full text-center py-3 rounded-none text-sm font-semibold tracking-wide transition-all group-hover:shadow-lg"
                      style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                    >
                      Bekijk dit voertuig
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIENSTEN ─── */}
      <DienstenSection />

      {/* ─── OVER ONS TEASER ─── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <AnimateOnScroll direction="left">
            <div className="aspect-[4/3] rounded-none relative overflow-hidden">
              <Image
                src="/Showroom Jimi Gaillard.png"
                alt="Showroom Jimi Gaillard"
                fill
                className="object-cover"
              />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                Het verhaal achter JG Mobility
              </p>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                Passie voor auto&apos;s,<br />geboren uit ervaring
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                Na jaren in de autobranche besloot Jimi Gaillard zijn eigen pad te bewandelen. Vanuit Barendrecht helpt hij particulieren en zakelijke klanten bij het kopen, verkopen en aanbieden van hun auto — met de eerlijkheid en aandacht die bij grote dealers vaak ontbreekt.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {["Altijd direct contact met Jimi", "Geen verborgen kosten", "Volledig ontzorgd van A tot Z"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ fontFamily: "var(--font-inter)", color: "#374151" }}>
                    <div className="w-1.5 h-1.5 rounded-none flex-shrink-0" style={{ backgroundColor: "#001337" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/over-ons"
                className="group inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#001337", fontFamily: "var(--font-inter)" }}
              >
                Lees ons verhaal
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <ReviewsSection />

      {/* ─── CTA CONSIGNATIE ─── */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
        />
        <AnimateOnScroll>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}>
              Vrijblijvend & gratis
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Jouw auto verkopen<br />via consignatie?
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-xl mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
              Stuur ons foto&apos;s en gegevens van jouw auto. Wij beoordelen hem en nemen contact op bij interesse. Geen verplichtingen.
            </p>
            <div className="flex justify-center">
              <Link
                href="/consignatie"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none text-sm font-semibold tracking-wide transition-all hover:scale-105"
                style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}
              >
                Auto aanbieden
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
