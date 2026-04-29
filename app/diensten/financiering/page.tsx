"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, CreditCard, Shield, Clock, Percent, Search, Car, Euro, Calendar, Send, AlertCircle } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const RENTE_PER_JAAR = 7.9;
const LOOPTIJDEN = [12, 24, 36, 48, 60];

const voordelen = [
  { icon: <Percent size={20} />, title: "Scherpe rente", desc: "Via onze partners bieden wij toegang tot concurrerende leningen met lage maandlasten." },
  { icon: <Clock size={20} />, title: "Snelle goedkeuring", desc: "In veel gevallen ontvangt u binnen één werkdag uitsluitsel over uw aanvraag." },
  { icon: <Shield size={20} />, title: "Transparant & veilig", desc: "Geen kleine lettertjes. Wij leggen alles helder uit voordat u tekent." },
  { icon: <CreditCard size={20} />, title: "Meerdere opties", desc: "Van private lease tot doorlopend krediet — wij vinden de oplossing die bij u past." },
];

const opties = [
  {
    title: "Autolening",
    desc: "Een traditionele lening specifiek voor de aankoop van uw voertuig. Vaste maandlasten, overzichtelijk en voorspelbaar.",
    punten: ["Vaste looptijd", "Vaste rente", "Direct eigenaar", "Vrij kilometrage"],
  },
  {
    title: "Private Lease",
    desc: "U rijdt een vast bedrag per maand, inclusief verzekering, wegenbelasting en onderhoud. Geen zorgen, gewoon rijden.",
    punten: ["All-in maandbedrag", "Geen restwaarde-risico", "Altijd nieuw voertuig", "Fiscaal voordelig"],
  },
  {
    title: "Financial Lease",
    desc: "U financiert het voertuig via een leasemaatschappij en wordt aan het einde eigenaar. Populair voor zakelijke rijders.",
    punten: ["Fiscaal aftrekbaar", "Eigendom na looptijd", "Flexibele looptijd", "Zakelijk voordelig"],
  },
];

function berekenMaandbedrag(lening: number, looptijd: number): number {
  const r = RENTE_PER_JAAR / 100 / 12;
  return (lening * r * Math.pow(1 + r, looptijd)) / (Math.pow(1 + r, looptijd) - 1);
}

function formatKenteken(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export default function FinancieringPage() {
  const [kenteken, setKenteken] = useState("");
  const [rdwData, setRdwData] = useState<{ merk: string; model: string } | null>(null);
  const [rdwLoading, setRdwLoading] = useState(false);
  const [rdwError, setRdwError] = useState("");

  const [aankoopbedrag, setAankoopbedrag] = useState("");
  const [aanbetaling, setAanbetaling] = useState("");
  const [looptijd, setLooptijd] = useState(48);

  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [verzonden, setVerzonden] = useState(false);

  const lening = Math.max(0, (parseFloat(aankoopbedrag) || 0) - (parseFloat(aanbetaling) || 0));
  const maandbedrag = lening > 0 ? berekenMaandbedrag(lening, looptijd) : 0;
  const totaalbedrag = maandbedrag * looptijd;
  const totaleRente = totaalbedrag - lening;
  const toonResultaat = lening > 0 && maandbedrag > 0;

  async function zoekKenteken() {
    const k = formatKenteken(kenteken);
    if (k.length < 4) { setRdwError("Voer een geldig kenteken in."); return; }
    setRdwLoading(true);
    setRdwError("");
    setRdwData(null);
    try {
      const res = await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${k}`);
      const data = await res.json();
      if (!data.length) { setRdwError("Kenteken niet gevonden. Controleer de invoer."); return; }
      const auto = data[0];
      setRdwData({
        merk: auto.merk ?? "Onbekend",
        model: auto.handelsbenaming ?? auto.typegoedkeuringsnummer ?? "Onbekend",
      });
    } catch {
      setRdwError("Kon de RDW niet bereiken. Probeer het opnieuw.");
    } finally {
      setRdwLoading(false);
    }
  }

  function verstuurAanvraag() {
    const auto = rdwData ? `${rdwData.merk} ${rdwData.model} (${kenteken.toUpperCase()})` : kenteken.toUpperCase();
    const onderwerp = `Financieringsaanvraag — ${auto}`;
    const body = [
      `Naam: ${naam}`,
      `E-mail: ${email}`,
      `Telefoon: ${telefoon}`,
      ``,
      `--- Voertuig ---`,
      `Kenteken: ${kenteken.toUpperCase()}`,
      rdwData ? `Auto: ${rdwData.merk} ${rdwData.model}` : "",
      ``,
      `--- Financiering ---`,
      `Aankoopbedrag: €${parseFloat(aankoopbedrag).toLocaleString("nl-NL")}`,
      `Aanbetaling: €${parseFloat(aanbetaling || "0").toLocaleString("nl-NL")}`,
      `Leenbedrag: €${lening.toLocaleString("nl-NL")}`,
      `Looptijd: ${looptijd} maanden`,
      `Rente: ${RENTE_PER_JAAR}% per jaar`,
      `Berekend maandbedrag: €${maandbedrag.toFixed(2).replace(".", ",")}`,
      `Totaal te betalen: €${totaalbedrag.toFixed(2).replace(".", ",")}`,
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:info@jgmobility.nl?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(body)}`;
    setVerzonden(true);
  }

  const aanvraagGeldig = naam.trim() && email.includes("@") && telefoon.trim() && toonResultaat;

  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-20 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 80% at 20% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/diensten" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-6 hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
              ← Diensten
            </Link>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
            Financiering
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base max-w-xl" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)", lineHeight: 1.8 }}>
            Via onze financieringspartners bieden wij u toegang tot scherpe leningen en leasemogelijkheden. Bereken hieronder direct uw maandbedrag.
          </motion.p>
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Vrijblijvend berekenen</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Wat wordt mijn maandbedrag?</h2>
              <p className="text-sm mt-3" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                Voer het kenteken in en bereken direct uw financiering. Indicatief op basis van {RENTE_PER_JAAR}% rente per jaar.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="rounded-none" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.08)" }}>

              {/* Stap 1: Kenteken */}
              <div className="p-6 md:p-8" style={{ borderBottom: "1px solid rgba(0,19,55,0.07)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#001337", fontFamily: "var(--font-inter)" }}>1</div>
                  <h3 className="font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Voer het kenteken in</h3>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="bijv. AB-123-C"
                      value={kenteken}
                      onChange={(e) => { setKenteken(e.target.value); setRdwError(""); setRdwData(null); }}
                      onKeyDown={(e) => e.key === "Enter" && zoekKenteken()}
                      maxLength={9}
                      className="w-full px-4 py-3 text-sm outline-none uppercase tracking-widest"
                      style={{ border: "1px solid rgba(0,19,55,0.15)", fontFamily: "var(--font-inter)", color: "#001337", backgroundColor: "#fafafa" }}
                    />
                  </div>
                  <button
                    onClick={zoekKenteken}
                    disabled={rdwLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:opacity-80"
                    style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)", minWidth: "140px" }}
                  >
                    {rdwLoading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <><Search size={14} /> Auto opzoeken</>
                    )}
                  </button>
                </div>

                {rdwError && (
                  <div className="flex items-center gap-2 mt-3 text-sm" style={{ color: "#c0392b", fontFamily: "var(--font-inter)" }}>
                    <AlertCircle size={14} /> {rdwError}
                  </div>
                )}

                {rdwData && (
                  <div className="flex items-center gap-3 mt-4 px-4 py-3" style={{ backgroundColor: "rgba(0,19,55,0.04)", border: "1px solid rgba(0,19,55,0.08)" }}>
                    <Car size={16} style={{ color: "#001337", flexShrink: 0 }} />
                    <div>
                      <p className="text-xs" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>Gevonden voertuig</p>
                      <p className="text-sm font-bold" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>{rdwData.merk} {rdwData.model}</p>
                    </div>
                    <CheckCircle size={16} className="ml-auto" style={{ color: "#27ae60" }} />
                  </div>
                )}
              </div>

              {/* Stap 2: Bedragen */}
              <div className="p-6 md:p-8" style={{ borderBottom: "1px solid rgba(0,19,55,0.07)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#001337", fontFamily: "var(--font-inter)" }}>2</div>
                  <h3 className="font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Vul de bedragen in</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs tracking-widest uppercase mb-2 block" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Aankoopbedrag (€)</label>
                    <div className="relative">
                      <Euro size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(0,19,55,0.3)" }} />
                      <input
                        type="number"
                        placeholder="15000"
                        value={aankoopbedrag}
                        onChange={(e) => setAankoopbedrag(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 text-sm outline-none"
                        style={{ border: "1px solid rgba(0,19,55,0.15)", fontFamily: "var(--font-inter)", color: "#001337", backgroundColor: "#fafafa" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase mb-2 block" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Aanbetaling (€)</label>
                    <div className="relative">
                      <Euro size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(0,19,55,0.3)" }} />
                      <input
                        type="number"
                        placeholder="0"
                        value={aanbetaling}
                        onChange={(e) => setAanbetaling(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 text-sm outline-none"
                        style={{ border: "1px solid rgba(0,19,55,0.15)", fontFamily: "var(--font-inter)", color: "#001337", backgroundColor: "#fafafa" }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase mb-3 block" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
                    <Calendar size={12} className="inline mr-1" />Looptijd
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {LOOPTIJDEN.map((m) => (
                      <button
                        key={m}
                        onClick={() => setLooptijd(m)}
                        className="px-4 py-2 text-sm font-semibold transition-all"
                        style={{
                          fontFamily: "var(--font-inter)",
                          backgroundColor: looptijd === m ? "#001337" : "transparent",
                          color: looptijd === m ? "#ffffff" : "rgba(0,19,55,0.5)",
                          border: `1px solid ${looptijd === m ? "#001337" : "rgba(0,19,55,0.15)"}`,
                        }}
                      >
                        {m} mnd
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resultaat */}
              {toonResultaat && (
                <div className="p-6 md:p-8" style={{ backgroundColor: "#001337", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Berekening</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Maandbedrag</p>
                      <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                        €{maandbedrag.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-
                      </p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>per maand</p>
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Leenbedrag</p>
                      <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                        €{lening.toLocaleString("nl-NL")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Totale kosten</p>
                      <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                        €{totaalbedrag.toLocaleString("nl-NL", { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
                        waarvan €{totaleRente.toLocaleString("nl-NL", { maximumFractionDigits: 0 })} rente
                      </p>
                    </div>
                  </div>
                  <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-inter)" }}>
                    Indicatieve berekening op basis van {RENTE_PER_JAAR}% nominale rente per jaar, {looptijd} maanden. Definitief tarief wordt bepaald na aanvraag.
                  </p>
                </div>
              )}

              {/* Stap 3: Aanvraag */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: toonResultaat ? "#001337" : "rgba(0,19,55,0.2)", fontFamily: "var(--font-inter)" }}>3</div>
                  <h3 className="font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Aanvraag indienen</h3>
                </div>

                {!toonResultaat && (
                  <p className="text-sm" style={{ color: "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}>
                    Vul eerst stap 1 en 2 in om een aanvraag te kunnen indienen.
                  </p>
                )}

                {toonResultaat && !verzonden && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                      <div>
                        <label className="text-xs tracking-widest uppercase mb-2 block" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Naam</label>
                        <input
                          type="text"
                          placeholder="Uw naam"
                          value={naam}
                          onChange={(e) => setNaam(e.target.value)}
                          className="w-full px-4 py-3 text-sm outline-none"
                          style={{ border: "1px solid rgba(0,19,55,0.15)", fontFamily: "var(--font-inter)", color: "#001337", backgroundColor: "#fafafa" }}
                        />
                      </div>
                      <div>
                        <label className="text-xs tracking-widest uppercase mb-2 block" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>E-mailadres</label>
                        <input
                          type="email"
                          placeholder="u@voorbeeld.nl"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 text-sm outline-none"
                          style={{ border: "1px solid rgba(0,19,55,0.15)", fontFamily: "var(--font-inter)", color: "#001337", backgroundColor: "#fafafa" }}
                        />
                      </div>
                      <div>
                        <label className="text-xs tracking-widest uppercase mb-2 block" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Telefoonnummer</label>
                        <input
                          type="tel"
                          placeholder="+31 6 12345678"
                          value={telefoon}
                          onChange={(e) => setTelefoon(e.target.value)}
                          className="w-full px-4 py-3 text-sm outline-none"
                          style={{ border: "1px solid rgba(0,19,55,0.15)", fontFamily: "var(--font-inter)", color: "#001337", backgroundColor: "#fafafa" }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={verstuurAanvraag}
                      disabled={!aanvraagGeldig}
                      className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                    >
                      <Send size={14} />
                      Aanvraag versturen
                    </button>
                    <p className="text-xs mt-3" style={{ color: "rgba(0,19,55,0.3)", fontFamily: "var(--font-inter)" }}>
                      Uw gegevens worden per e-mail naar JG Mobility gestuurd. Wij reageren binnen één werkdag.
                    </p>
                  </>
                )}

                {toonResultaat && verzonden && (
                  <div className="flex items-center gap-4 p-5" style={{ backgroundColor: "rgba(39,174,96,0.06)", border: "1px solid rgba(39,174,96,0.2)" }}>
                    <CheckCircle size={24} style={{ color: "#27ae60", flexShrink: 0 }} />
                    <div>
                      <p className="font-bold text-sm" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>Aanvraag verstuurd!</p>
                      <p className="text-xs mt-1" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>Uw e-mailclient is geopend met alle gegevens ingevuld. Wij nemen zo snel mogelijk contact met u op.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Voordelen */}
      <section className="py-20 px-6" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Waarom via JG Mobility</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Voordelen van onze financiering</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {voordelen.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 0.08}>
                <div className="p-5 rounded-none h-full" style={{ border: "1px solid rgba(0,19,55,0.08)", backgroundColor: "#fafafa" }}>
                  <div className="w-11 h-11 rounded-none flex items-center justify-center mb-4" style={{ backgroundColor: "#001337", color: "#ffffff" }}>{v.icon}</div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>{v.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>{v.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Opties */}
      <section className="py-20 px-6" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Kies wat bij u past</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Financieringsopties</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opties.map((o, i) => (
              <AnimateOnScroll key={o.title} delay={i * 0.1}>
                <div className="p-6 md:p-8 rounded-none h-full flex flex-col" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>{o.title}</h3>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}>{o.desc}</p>
                  <ul className="flex flex-col gap-2">
                    {o.punten.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs" style={{ color: "rgba(0,19,55,0.6)", fontFamily: "var(--font-inter)" }}>
                        <CheckCircle size={12} style={{ color: "#001337", flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe werkt het */}
      <section className="py-20 px-6" style={{ backgroundColor: "#001337" }}>
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-14">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>Stap voor stap</p>
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Hoe gaat het in zijn werk?</h2>
            </div>
          </AnimateOnScroll>
          <div className="flex flex-col gap-4">
            {[
              { step: "01", title: "Bereken uw maandbedrag", desc: "Vul uw kenteken en gewenste bedrag in via de calculator bovenaan deze pagina." },
              { step: "02", title: "Aanvraag indienen", desc: "Dien direct uw aanvraag in. Wij ontvangen alle gegevens en nemen contact op." },
              { step: "03", title: "Goedkeuring ontvangen", desc: "In de meeste gevallen ontvangt u binnen één werkdag uitsluitsel." },
              { step: "04", title: "Rijden maar", desc: "Na ondertekening regelen wij de rest. U rijdt weg in uw nieuwe auto." },
            ].map((s, i) => (
              <AnimateOnScroll key={s.step} delay={i * 0.08}>
                <div className="flex items-start gap-6 p-6 rounded-none" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-3xl font-bold flex-shrink-0" style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.1)" }}>{s.step}</span>
                  <div>
                    <h3 className="font-bold mb-1 text-white" style={{ fontFamily: "var(--font-playfair)" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}>{s.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(0,19,55,0.06)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>Nog vragen over financiering?</h2>
            <p className="text-sm text-gray-500 mb-8" style={{ fontFamily: "var(--font-inter)" }}>Neem contact op en wij helpen u aan de beste financieringsoplossing.</p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-none text-sm font-semibold transition-all hover:scale-105" style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}>
              Neem contact op
              <ArrowRight size={14} />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
