"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gauge, Calendar, Fuel, Zap, ArrowRight, ChevronDown, X } from "lucide-react";
import { autos } from "@/lib/autos";

const prijsOpties = [
  { label: "Aanschafprijs", value: "" },
  { label: "Tot €10.000", value: "10000" },
  { label: "Tot €20.000", value: "20000" },
  { label: "Tot €30.000", value: "30000" },
  { label: "Tot €50.000", value: "50000" },
  { label: "Tot €75.000", value: "75000" },
  { label: "Tot €100.000", value: "100000" },
];

const sorteerOpties = [
  { label: "Sorteren op", value: "" },
  { label: "Prijs: laag → hoog", value: "prijs-asc" },
  { label: "Prijs: hoog → laag", value: "prijs-desc" },
  { label: "Nieuwste eerst", value: "jaar-desc" },
  { label: "Oudste eerst", value: "jaar-asc" },
  { label: "Minste KM", value: "km-asc" },
];

function FilterSelect({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const active = value !== "" && !["Alle merken", "Alle modellen", "Alle transmissies", "Alle brandstof"].includes(value);
  return (
    <div className="relative w-full md:w-auto">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full pr-8 pl-4 py-2.5 rounded-none text-sm font-medium cursor-pointer transition-all"
        style={{
          backgroundColor: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
          border: active ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.12)",
          color: active ? "#ffffff" : "rgba(255,255,255,0.75)",
          fontFamily: "var(--font-inter)",
          outline: "none",
          minWidth: "130px",
        }}
      >
        {children}
      </select>
      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.5)" }} />
    </div>
  );
}

export default function AanbodClient() {
  const searchParams = useSearchParams();
  const merkParam = searchParams.get("merk");
  const merkInitieel = merkParam
    ? autos.find((a) => a.merk.toLowerCase() === merkParam.toLowerCase())?.merk ?? "Alle merken"
    : "Alle merken";

  const [filterMerk, setFilterMerk] = useState(merkInitieel);

  useEffect(() => {
    const param = searchParams.get("merk");
    const gevonden = param
      ? autos.find((a) => a.merk.toLowerCase() === param.toLowerCase())?.merk ?? "Alle merken"
      : "Alle merken";
    setFilterMerk(gevonden);
    setFilterModel("Alle modellen");
  }, [searchParams]);
  const [filterModel, setFilterModel] = useState("Alle modellen");
  const [filterTransmissie, setFilterTransmissie] = useState("Alle transmissies");
  const [filterBrandstof, setFilterBrandstof] = useState("Alle brandstof");
  const [filterPrijs, setFilterPrijs] = useState("");
  const [sorteer, setSorteer] = useState("");

  const merken = ["Alle merken", ...Array.from(new Set(autos.map((a) => a.merk)))];
  const modellen = useMemo(() => {
    const basis = autos.filter((a) => filterMerk === "Alle merken" || a.merk === filterMerk);
    return ["Alle modellen", ...Array.from(new Set(basis.map((a) => a.model)))];
  }, [filterMerk]);
  const transmissies = ["Alle transmissies", ...Array.from(new Set(autos.map((a) => a.transmissie)))];
  const brandstofTypes = ["Alle brandstof", ...Array.from(new Set(autos.map((a) => a.brandstof)))];

  const gefilterd = useMemo(() => {
    let lijst = autos.filter((a) => {
      if (filterMerk !== "Alle merken" && a.merk !== filterMerk) return false;
      if (filterModel !== "Alle modellen" && a.model !== filterModel) return false;
      if (filterTransmissie !== "Alle transmissies" && a.transmissie !== filterTransmissie) return false;
      if (filterBrandstof !== "Alle brandstof" && a.brandstof !== filterBrandstof) return false;
      if (filterPrijs && a.prijs > parseInt(filterPrijs)) return false;
      return true;
    });
    if (sorteer === "prijs-asc") lijst = [...lijst].sort((a, b) => a.prijs - b.prijs);
    if (sorteer === "prijs-desc") lijst = [...lijst].sort((a, b) => b.prijs - a.prijs);
    if (sorteer === "jaar-desc") lijst = [...lijst].sort((a, b) => b.bouwjaar - a.bouwjaar);
    if (sorteer === "jaar-asc") lijst = [...lijst].sort((a, b) => a.bouwjaar - b.bouwjaar);
    if (sorteer === "km-asc") lijst = [...lijst].sort((a, b) => a.km - b.km);
    return lijst;
  }, [filterMerk, filterModel, filterTransmissie, filterBrandstof, filterPrijs, sorteer]);

  const hasFilters = filterMerk !== "Alle merken" || filterModel !== "Alle modellen" || filterTransmissie !== "Alle transmissies" || filterBrandstof !== "Alle brandstof" || filterPrijs || sorteer;

  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (gridRef.current) {
      const filterHeight = filterRef.current?.offsetHeight ?? 60;
      const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 80 - filterHeight;
      const start = window.scrollY;
      const distance = top - start;
      if (Math.abs(distance) < 2) return;
      const duration = Math.min(Math.max(Math.abs(distance) * 0.4, 400), 900);
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // cubic bezier approximation: ease-in-out
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, start + distance * ease);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [filterMerk, filterModel, filterTransmissie, filterBrandstof, filterPrijs, sorteer]);

  const resetFilters = () => {
    setFilterMerk("Alle merken");
    setFilterModel("Alle modellen");
    setFilterTransmissie("Alle transmissies");
    setFilterBrandstof("Alle brandstof");
    setFilterPrijs("");
    setSorteer("");
  };

  return (
    <>
      {/* Hero */}
      <div className="relative pt-28 md:pt-52 pb-16 px-6 overflow-hidden" style={{ backgroundColor: "#001337" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            Geselecteerde voertuigen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Onze collectie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {autos.length} voertuigen beschikbaar
          </motion.p>
        </div>
      </div>

      {/* Filter balk — sticky alleen desktop */}
      <div
        ref={filterRef}
        className="md:sticky top-[80px] z-40 px-4 md:px-6 py-5"
        style={{
          backgroundColor: "rgba(0,19,55,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center md:gap-3">
            <FilterSelect value={filterMerk} onChange={(v) => { setFilterMerk(v); setFilterModel("Alle modellen"); }}>
              {merken.map((m) => <option key={m} value={m} style={{ backgroundColor: "#001337" }}>{m}</option>)}
            </FilterSelect>
            <FilterSelect value={filterModel} onChange={setFilterModel}>
              {modellen.map((m) => <option key={m} value={m} style={{ backgroundColor: "#001337" }}>{m}</option>)}
            </FilterSelect>
            <FilterSelect value={filterTransmissie} onChange={setFilterTransmissie}>
              {transmissies.map((t) => <option key={t} value={t} style={{ backgroundColor: "#001337" }}>{t}</option>)}
            </FilterSelect>
            <FilterSelect value={filterBrandstof} onChange={setFilterBrandstof}>
              {brandstofTypes.map((b) => <option key={b} value={b} style={{ backgroundColor: "#001337" }}>{b}</option>)}
            </FilterSelect>
            <FilterSelect value={filterPrijs} onChange={setFilterPrijs}>
              {prijsOpties.map((o) => <option key={o.value} value={o.value} style={{ backgroundColor: "#001337" }}>{o.label}</option>)}
            </FilterSelect>
            <FilterSelect value={sorteer} onChange={setSorteer}>
              {sorteerOpties.map((o) => <option key={o.value} value={o.value} style={{ backgroundColor: "#001337" }}>{o.label}</option>)}
            </FilterSelect>
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="col-span-2 md:col-span-1 flex items-center justify-center gap-1 px-3 py-2.5 text-xs transition-all hover:bg-red-500/20 md:ml-1"
                style={{ color: "#ff8080", border: "1px solid rgba(255,128,128,0.25)", fontFamily: "var(--font-inter)" }}
              >
                <X size={12} /> Reset filters
              </button>
            )}
          </div>
          <div className="mt-2 text-xs text-center md:text-left" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
            {gefilterd.length} van {autos.length} voertuigen
          </div>
        </div>
      </div>

      {/* Grid */}
      <section ref={gridRef} className="py-16 px-6" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="max-w-7xl mx-auto">
          {gefilterd.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                Geen voertuigen gevonden. Pas de filters aan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {gefilterd.map((auto, i) => (
                <motion.div
                  key={auto.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/aanbod/${auto.id}`}
                    className="group block rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    {/* Foto */}
                    <div className="relative h-56 overflow-hidden" style={{ backgroundColor: "#001337" }}>
                      {auto.fotos && auto.fotos.length > 0 ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={auto.fotos[0]}
                          alt={`${auto.merk} ${auto.model}`}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-7xl font-bold"
                            style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.1)" }}
                          >
                            {auto.merk.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08), transparent 70%)" }}
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-none"
                          style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)", fontWeight: 600 }}
                        >
                          {auto.bodytype}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span
                          className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-none"
                          style={{ backgroundColor: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)", backdropFilter: "blur(4px)" }}
                        >
                          {auto.kleur}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] tracking-widest uppercase font-semibold mb-1" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                            {auto.merk}
                          </p>
                          <h3 className="text-xl font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                            {auto.model}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                            €{auto.prijs.toLocaleString("nl-NL")}
                          </p>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {[
                          { icon: <Calendar size={12} />, label: "Bouwjaar", value: auto.bouwjaar },
                          { icon: <Gauge size={12} />, label: "Kilometerstand", value: `${auto.km.toLocaleString("nl-NL")} km` },
                          { icon: <Fuel size={12} />, label: "Brandstof", value: auto.brandstof },
                          { icon: <Zap size={12} />, label: "Vermogen", value: auto.vermogen },
                        ].map((spec) => (
                          <div key={spec.label} className="flex items-center gap-2 py-2.5 px-3 rounded-none" style={{ backgroundColor: "#f5f5f5" }}>
                            <span style={{ color: "#001337" }}>{spec.icon}</span>
                            <div>
                              <div className="text-[9px] text-gray-400 uppercase tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>{spec.label}</div>
                              <div className="text-xs font-semibold" style={{ color: "#001337", fontFamily: "var(--font-inter)" }}>{spec.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="h-px mb-5" style={{ backgroundColor: "#f0f0f0" }} />

                      <div
                        className="flex items-center justify-between w-full py-3.5 px-5 rounded-none text-sm font-semibold tracking-wide transition-all group-hover:shadow-lg group-hover:scale-[1.01]"
                        style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                      >
                        Bekijk dit voertuig
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA onderaan */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#001337" }}>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#ffffff", fontFamily: "var(--font-inter)" }}>
          Niet gevonden wat je zoekt?
        </p>
        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Wij zoeken jouw droomauto
        </h2>
        <p className="text-white/50 text-sm mb-8 max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
          Neem contact op en vertel ons wat je zoekt. We kijken actief mee in ons netwerk.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-none text-sm font-semibold transition-all hover:scale-105"
          style={{ backgroundColor: "#ffffff", color: "#001337", fontFamily: "var(--font-inter)" }}
        >
          Contact opnemen <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
