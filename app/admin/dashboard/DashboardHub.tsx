"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { RefreshCw, Plus } from "lucide-react";
import GmailWidget from "./GmailWidget";
import BellogWidget from "./BellogWidget";
import MoliboxWidget from "./MoliboxWidget";
import DeleteButton from "./DeleteButton";

type Auto = {
  id: number;
  slug: string;
  merk: string;
  model: string;
  bouwjaar: number;
  km: number;
  brandstof: string;
  prijs: number;
  verkocht: boolean;
  fotos: string[];
};

export default function DashboardHub() {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const laadAutos = useCallback(async () => {
    const res = await fetch("/api/admin/autos");
    if (res.ok) setAutos(await res.json());
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await laadAutos();
    setLastRefresh(new Date());
    setCountdown(60);
    setRefreshing(false);
  }, [laadAutos]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Aftellen + auto-refresh elke 60 seconden
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refresh();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  const beschikbaar = autos.filter((a) => !a.verkocht);
  const verkocht = autos.filter((a) => a.verkocht);
  const gemPrijs = beschikbaar.length
    ? Math.round(beschikbaar.reduce((s, a) => s + a.prijs, 0) / beschikbaar.length)
    : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <div
        className="px-6 py-5 sticky top-0 z-40"
        style={{ backgroundColor: "#001337", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p
              className="text-[10px] tracking-widest uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
            >
              Beheer
            </p>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              JG Mobility
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Refresh indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={refresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 text-xs transition-all hover:opacity-70 disabled:opacity-40"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
              >
                <RefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
                {refreshing ? "Verversen..." : `${countdown}s`}
              </button>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
              <span
                className="text-[10px]"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}
              >
                {lastRefresh.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <Link
              href="/aanbod"
              target="_blank"
              className="px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all hover:opacity-70"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}
            >
              Website
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                formAction="/api/admin/logout"
                className="px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all hover:opacity-70"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}
              >
                Uitloggen
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Statistieken */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "In aanbod", value: beschikbaar.length },
            { label: "Verkocht", value: verkocht.length },
            { label: "Totaal", value: autos.length },
            {
              label: "Gem. vraagprijs",
              value: gemPrijs ? `€${gemPrijs.toLocaleString("nl-NL")}` : "—",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
            >
              <p
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
              >
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Widgets rij: Gmail + Bellog */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <GmailWidget />
          </div>
          <div className="lg:col-span-2">
            <BellogWidget />
          </div>
        </div>

        {/* Molibox placeholder */}
        <MoliboxWidget />

        {/* Auto-inventaris */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
            >
              Aanbod ({autos.length})
            </h2>
            <Link
              href="/admin/auto-toevoegen"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide transition-all hover:opacity-90"
              style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
            >
              <Plus size={14} /> Nieuwe auto
            </Link>
          </div>

          {autos.length === 0 ? (
            <div
              className="text-center py-20"
              style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
            >
              <p className="text-sm mb-4" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
                Nog geen auto&apos;s toegevoegd
              </p>
              <Link
                href="/admin/auto-toevoegen"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
              >
                Eerste auto toevoegen
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {autos.map((auto) => (
                <div
                  key={auto.id}
                  className="flex items-center gap-4 p-4"
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
                >
                  <div
                    className="flex-shrink-0 w-20 h-14 overflow-hidden"
                    style={{ backgroundColor: "#001337" }}
                  >
                    {auto.fotos?.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={auto.fotos[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span
                          className="text-lg font-bold"
                          style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-playfair)" }}
                        >
                          {auto.merk.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className="text-sm font-bold truncate"
                        style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}
                      >
                        {auto.merk} {auto.model}
                      </p>
                      {auto.verkocht && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 tracking-widest uppercase"
                          style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                        >
                          Verkocht
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs truncate"
                      style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}
                    >
                      {auto.bouwjaar} · {auto.km.toLocaleString("nl-NL")} km · {auto.brandstof}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className="text-base font-bold"
                      style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
                    >
                      €{auto.prijs.toLocaleString("nl-NL")}
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}>
                      {auto.fotos?.length ?? 0} foto&apos;s
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/aanbod/${auto.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 text-xs font-semibold tracking-wide transition-all hover:opacity-70"
                      style={{ border: "1px solid rgba(0,19,55,0.15)", color: "#001337", fontFamily: "var(--font-inter)" }}
                    >
                      Bekijk
                    </Link>
                    <DeleteButton id={auto.id} naam={`${auto.merk} ${auto.model}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
