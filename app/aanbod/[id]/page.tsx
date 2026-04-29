"use client";

export const dynamic = "force-dynamic";

import { useState, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin, CheckCircle, ChevronRight, ChevronLeft, X } from "lucide-react";
import { autos } from "@/lib/autos";
import { motion, AnimatePresence } from "framer-motion";


const tabs = ["Kenmerken", "Opties", "Omschrijving", "Contact"];

export default function AutoDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const auto = autos.find((a) => a.slug === slug);
  const [activeTab, setActiveTab] = useState("Kenmerken");
  const tabSectionRef = useRef<HTMLElement>(null);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      if (tabSectionRef.current) {
        const y = tabSectionRef.current.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
  };
  const [interesse, setInteresse] = useState(false);
  const [fotoIndex, setFotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const heeftFotos = auto?.fotos && auto.fotos.length > 0;
  const aantalFotos = auto?.fotos?.length ?? 0;

  const volgendeFoto = () => setFotoIndex((i) => (i + 1) % aantalFotos);
  const vorigeFoto = () => setFotoIndex((i) => (i - 1 + aantalFotos) % aantalFotos);

  if (!auto) return notFound();

  const huidigeIndex = autos.findIndex((a) => a.slug === slug);
  const vorigeAuto = autos[huidigeIndex + 1];
  const volgendeAuto = autos[huidigeIndex - 1];

  return (
    <>
      {/* Broodkruimel */}
      <div className="pt-28 md:pt-52 pb-4 px-6" style={{ backgroundColor: "#001337" }}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
          <Link href="/aanbod" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={12} /> Terug naar aanbod
          </Link>
          <ChevronRight size={10} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{auto.merk} {auto.model}</span>
        </div>
      </div>

      {/* Hero: foto + hoofdinfo */}
      <div className="pb-0 px-6" style={{ backgroundColor: "#001337" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Foto / galerij */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-none overflow-hidden aspect-[16/10] cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                onClick={() => heeftFotos && setLightbox(true)}
              >
                {heeftFotos ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={auto.fotos![fotoIndex]}
                    alt={`${auto.merk} ${auto.model}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[180px] font-bold select-none" style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.04)" }}>
                        {auto.merk.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
                  </>
                )}

                {/* Navigatie pijlen (alleen als meerdere foto's) */}
                {aantalFotos > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); vorigeFoto(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none flex items-center justify-center transition-all hover:bg-white/30"
                      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
                    >
                      <ChevronLeft size={16} color="white" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); volgendeFoto(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-none flex items-center justify-center transition-all hover:bg-white/30"
                      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
                    >
                      <ArrowRight size={16} color="white" />
                    </button>
                    {/* Teller */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-none text-xs font-semibold" style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)", backdropFilter: "blur(4px)" }}>
                      {fotoIndex + 1} / {aantalFotos}
                    </div>
                  </>
                )}

                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-none font-semibold" style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}>
                    {auto.bodytype}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-none" style={{ backgroundColor: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)", backdropFilter: "blur(4px)" }}>
                    {auto.kleurExterieur}
                  </span>
                </div>
              </motion.div>

              {/* Thumbnail rij */}
              {aantalFotos > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {auto.fotos!.map((foto, i) => (
                    <button
                      key={i}
                      onClick={() => setFotoIndex(i)}
                      className="relative flex-shrink-0 w-20 h-14 rounded-none overflow-hidden transition-all"
                      style={{ border: fotoIndex === i ? "2px solid #ffffff" : "2px solid rgba(255,255,255,0.15)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={foto} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox && heeftFotos && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
                  onClick={() => setLightbox(false)}
                >
                  <button className="absolute top-6 right-6 w-10 h-10 rounded-none flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <X size={18} color="white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); vorigeFoto(); }}
                    className="absolute left-6 w-12 h-12 rounded-none flex items-center justify-center hover:bg-white/20 transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <ChevronLeft size={20} color="white" />
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={auto.fotos![fotoIndex]}
                    alt=""
                    className="max-w-[90vw] max-h-[85vh] object-contain rounded-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); volgendeFoto(); }}
                    className="absolute right-6 w-12 h-12 rounded-none flex items-center justify-center hover:bg-white/20 transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <ArrowRight size={20} color="white" />
                  </button>
                  <div className="absolute bottom-6 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                    {fotoIndex + 1} / {aantalFotos}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rechter info */}
            <div className="lg:col-span-2 pb-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                  {auto.merk}
                </p>
                <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                  {auto.model}
                </h1>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}>
                  {auto.versie}
                </p>

                {/* Prijs */}
                <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                    €{auto.prijs.toLocaleString("nl-NL")},-
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
                    Vraagprijs — {auto.btw}
                  </p>
                </div>

                {/* Snelspec */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    { label: "KM-stand", value: `${auto.km.toLocaleString("nl-NL")} km` },
                    { label: "Transmissie", value: auto.transmissie },
                    { label: "Brandstof", value: auto.brandstof },
                    { label: "Bouwjaar", value: auto.bouwjaar },
                    { label: "Vermogen", value: auto.vermogen },
                    { label: "APK tot", value: auto.apk },
                  ].map((spec) => (
                    <div key={spec.label} className="py-3 px-4 rounded-none" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{spec.label}</div>
                      <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-inter)" }}>{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* CTA knoppen */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-none text-sm font-semibold transition-all hover:scale-[1.01] hover:shadow-lg"
                    style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}
                  >
                    <Mail size={14} />
                    Interesse? Stuur een bericht
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-none text-sm font-semibold transition-all hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-inter)" }}
                  >
                    <Phone size={14} />
                    Proefrit aanvragen
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs balk */}
      <div className="sticky top-[85px] z-40" style={{ backgroundColor: "rgba(0,19,55,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-stretch">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className="flex items-center gap-1.5 px-6 py-4 text-sm font-semibold tracking-wide transition-all relative"
              style={{
                fontFamily: "var(--font-inter)",
                color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.45)",
                backgroundColor: "transparent",
              }}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "#ffffff" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab inhoud */}
      <section ref={tabSectionRef} className="py-12 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">

          {/* ── KENMERKEN ── */}
          {activeTab === "Kenmerken" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Kenmerken</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {[
                  { label: "Bouwjaar", value: auto.bouwjaar },
                  { label: "Kilometerstand", value: `${auto.km.toLocaleString("nl-NL")} km` },
                  { label: "APK tot", value: auto.apk },
                  { label: "Carrosserie", value: auto.bodytype },
                  { label: "BTW / Marge", value: auto.btw },
                  { label: "Vermogen", value: auto.vermogen },
                  { label: "Brandstof", value: auto.brandstof },
                  { label: "Transmissie", value: auto.transmissie },
                  { label: "Bekleding", value: auto.bekleding },
                  { label: "Kleur exterieur", value: auto.kleurExterieur },
                  { label: "Merk", value: auto.merk },
                  { label: "Model", value: auto.model },
                ].map((kenmerk) => (
                  <div
                    key={kenmerk.label}
                    className="flex items-center justify-between py-3 px-4 rounded-none"
                    style={{ backgroundColor: "rgba(0,19,55,0.03)", border: "1px solid rgba(0,19,55,0.06)" }}
                  >
                    <span className="text-sm" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>{kenmerk.label}</span>
                    <span className="text-sm font-semibold" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>{kenmerk.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── OPTIES ── */}
          {activeTab === "Opties" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Opties & uitrusting</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {auto.opties.map((cat) => (
                  <div key={cat.categorie}>
                    <h3 className="text-base font-bold mb-4 pb-2" style={{ color: "#001337", fontFamily: "var(--font-playfair)", borderBottom: "2px solid rgba(0,19,55,0.1)" }}>
                      {cat.categorie}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#374151", fontFamily: "var(--font-inter)" }}>
                          <div className="w-1.5 h-1.5 rounded-none mt-1.5 flex-shrink-0" style={{ backgroundColor: "#001337" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── OMSCHRIJVING ── */}
          {activeTab === "Omschrijving" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Omschrijving</h2>
              <div className="max-w-3xl">
                {auto.omschrijving.split("\n\n").map((alinea, i) => (
                  <p key={i} className="text-sm leading-loose text-gray-600 mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                    {alinea}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── CONTACT ── */}
          {activeTab === "Contact" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Neem contact op</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
                {/* Contactinfo */}
                <div>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    Interesse in de {auto.merk} {auto.model}? Neem vrijblijvend contact op met Jimi. We plannen graag een proefrit of beantwoorden al je vragen.
                  </p>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: <Mail size={14} />, label: "E-mail", value: "info@jgmobility.nl", href: `mailto:info@jgmobility.nl?subject=Interesse ${auto.merk} ${auto.model}` },
                      { icon: <Phone size={14} />, label: "Telefoon", value: "+31 6 21331374", href: "tel:+31621331374" },
                      { icon: <MapPin size={14} />, label: "Locatie", value: "Barendrecht, Zuid-Holland", href: "#" },
                    ].map((item) => (
                      <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                        <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(0,19,55,0.15)" }}>
                          <span style={{ color: "#001337" }}>{item.icon}</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>{item.label}</div>
                          <div className="text-sm font-semibold group-hover:opacity-70 transition-opacity" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>{item.value}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Snelle interesse knop */}
                {!interesse ? (
                  <div className="p-6 rounded-none" style={{ backgroundColor: "rgba(0,19,55,0.03)", border: "1px solid rgba(0,19,55,0.08)" }}>
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                      Interesse aangeven
                    </h3>
                    <p className="text-xs text-gray-400 mb-5" style={{ fontFamily: "var(--font-inter)" }}>
                      Klik hieronder om direct een e-mail te sturen. Wij reageren binnen 24 uur.
                    </p>
                    <a
                      href={`mailto:info@jgmobility.nl?subject=Interesse in ${auto.merk} ${auto.model} (€${auto.prijs.toLocaleString("nl-NL")})&body=Hallo Jimi,%0D%0A%0D%0AIk heb interesse in de ${auto.merk} ${auto.model} uit ${auto.bouwjaar} (${auto.km.toLocaleString("nl-NL")} km) voor €${auto.prijs.toLocaleString("nl-NL")}. Kunt u contact met mij opnemen?%0D%0A%0D%0AMet vriendelijke groet,`}
                      onClick={() => setTimeout(() => setInteresse(true), 500)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-none text-sm font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                    >
                      <Mail size={14} />
                      Stuur interesse-mail
                      <ArrowRight size={14} />
                    </a>
                  </div>
                ) : (
                  <div className="p-6 rounded-none flex flex-col items-center justify-center gap-3 text-center" style={{ backgroundColor: "rgba(0,19,55,0.03)", border: "1px solid rgba(0,19,55,0.08)" }}>
                    <CheckCircle size={28} color="#001337" />
                    <p className="text-sm font-semibold" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>E-mailclient geopend!</p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>We nemen zo snel mogelijk contact op.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* Navigatie naar volgende/vorige */}
      <section className="py-12 px-6" style={{ backgroundColor: "#f5f5f5", borderTop: "1px solid rgba(0,19,55,0.06)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center gap-4">
          {vorigeAuto ? (
            <Link href={`/aanbod/${vorigeAuto.slug}`} className="group flex items-center gap-3 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] tracking-widest uppercase text-gray-400">Vorige</div>
                <div className="truncate">{vorigeAuto.merk} {vorigeAuto.model}</div>
              </div>
            </Link>
          ) : <div />}

          <Link href="/aanbod" className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity text-center" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
            Alle voertuigen
          </Link>

          {volgendeAuto ? (
            <Link href={`/aanbod/${volgendeAuto.slug}`} className="group flex items-center gap-3 text-sm font-semibold text-right justify-end hover:opacity-70 transition-opacity" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>
              <div className="min-w-0">
                <div className="text-[10px] tracking-widest uppercase text-gray-400">Volgende</div>
                <div className="truncate">{volgendeAuto.merk} {volgendeAuto.model}</div>
              </div>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </>
  );
}
