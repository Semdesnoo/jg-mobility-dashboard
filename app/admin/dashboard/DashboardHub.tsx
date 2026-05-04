"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Mail,
  Car,
  Handshake,
  Share2,
  FileText,
  RefreshCw,
  LogOut,
  Plus,
  ExternalLink,
} from "lucide-react";
import GmailWidget from "./GmailWidget";
import BellogWidget from "./BellogWidget";
import DeleteButton from "./DeleteButton";

type Tab = "dashboard" | "email" | "voorraad" | "cosignatie" | "social" | "facturen";

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

const NAV: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "email", label: "Email", icon: Mail },
  { id: "voorraad", label: "Auto Voorraad", icon: Car },
  { id: "cosignatie", label: "Cosignatie", icon: Handshake },
  { id: "social", label: "Social Media", icon: Share2 },
  { id: "facturen", label: "Facturen", icon: FileText },
];

function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="px-8 py-5 flex items-center justify-between sticky top-0 z-10"
      style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(0,19,55,0.08)" }}
    >
      <div>
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      className="p-6"
      style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
    >
      <p
        className="text-3xl font-bold mb-1"
        style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
      >
        {value}
      </p>
      <p
        className="text-xs"
        style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}
      >
        {label}
      </p>
    </div>
  );
}

function PlaceholderTab({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}) {
  return (
    <div>
      <PageHeader title={title} />
      <div className="p-8">
        <div
          className="flex flex-col items-center justify-center py-28"
          style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
        >
          <Icon size={40} style={{ color: "rgba(0,19,55,0.1)" }} />
          <p
            className="text-lg font-bold mt-5 mb-2"
            style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
          >
            Binnenkort beschikbaar
          </p>
          <p
            className="text-sm text-center max-w-md"
            style={{
              color: "rgba(0,19,55,0.45)",
              fontFamily: "var(--font-inter)",
              lineHeight: 1.7,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardHub() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [autos, setAutos] = useState<Auto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [lastRefresh, setLastRefresh] = useState(new Date());

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

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refresh();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [refresh]);

  const beschikbaar = autos.filter((a) => !a.verkocht);
  const verkocht = autos.filter((a) => a.verkocht);
  const gemPrijs = beschikbaar.length
    ? Math.round(beschikbaar.reduce((s, a) => s + a.prijs, 0) / beschikbaar.length)
    : 0;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f0f2f5" }}>
      {/* ── Zijbalk ── */}
      <aside
        className="flex flex-col flex-shrink-0"
        style={{ width: "220px", backgroundColor: "#001337", height: "100vh" }}
      >
        {/* Logo */}
        <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <p
            className="text-[9px] tracking-widest uppercase mb-1.5"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-inter)" }}
          >
            Beheer
          </p>
          <h1
            className="text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            JG Mobility
          </h1>
        </div>

        {/* Navigatie */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-left transition-all"
              style={{
                fontFamily: "var(--font-inter)",
                color: tab === id ? "#ffffff" : "rgba(255,255,255,0.42)",
                backgroundColor: tab === id ? "rgba(255,255,255,0.09)" : "transparent",
                borderLeft: `2px solid ${tab === id ? "#ffffff" : "transparent"}`,
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Voettekst */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 mb-3 text-[11px] transition-all hover:opacity-70"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}
          >
            <RefreshCw size={10} className={refreshing ? "animate-spin" : ""} />
            {refreshing
              ? "Verversen..."
              : `${countdown}s · ${lastRefresh.toLocaleTimeString("nl-NL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
          </button>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium transition-all hover:opacity-70"
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-inter)",
              }}
            >
              <LogOut size={12} />
              Uitloggen
            </button>
          </form>
        </div>
      </aside>

      {/* ── Hoofdinhoud ── */}
      <main className="flex-1 overflow-y-auto">
        {tab === "dashboard" && (
          <DashboardContent
            autos={autos}
            beschikbaar={beschikbaar}
            verkocht={verkocht}
            gemPrijs={gemPrijs}
            lastRefresh={lastRefresh}
            goVoorraad={() => setTab("voorraad")}
          />
        )}
        {tab === "email" && <EmailContent />}
        {tab === "voorraad" && <VoorraadContent autos={autos} refresh={refresh} />}
        {tab === "cosignatie" && (
          <PlaceholderTab
            icon={Handshake}
            title="Cosignatie"
            description="Beheer cosignatie-aanvragen en overeenkomsten. De koppeling met het contactformulier op de website wordt hier binnenkort zichtbaar."
          />
        )}
        {tab === "social" && (
          <PlaceholderTab
            icon={Share2}
            title="Social Media"
            description="Plan en beheer posts voor Instagram, Facebook en andere platforms. Koppeling via Mobilox of eigen integratie."
          />
        )}
        {tab === "facturen" && (
          <PlaceholderTab
            icon={FileText}
            title="Facturen"
            description="Beheer facturen en betalingen voor verkochte voertuigen en cosignaties."
          />
        )}
      </main>
    </div>
  );
}

// ── Dashboard overzicht ─────────────────────────────────────────
function DashboardContent({
  autos,
  beschikbaar,
  verkocht,
  gemPrijs,
  lastRefresh,
  goVoorraad,
}: {
  autos: Auto[];
  beschikbaar: Auto[];
  verkocht: Auto[];
  gemPrijs: number;
  lastRefresh: Date;
  goVoorraad: () => void;
}) {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Laatste update: ${lastRefresh.toLocaleTimeString("nl-NL", {
          hour: "2-digit",
          minute: "2-digit",
        })}`}
        action={
          <Link
            href="/aanbod"
            target="_blank"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all hover:opacity-70"
            style={{
              border: "1px solid rgba(0,19,55,0.15)",
              color: "#001337",
              fontFamily: "var(--font-inter)",
            }}
          >
            <ExternalLink size={12} /> Website
          </Link>
        }
      />

      <div className="p-8 flex flex-col gap-7">
        {/* Statistieken */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="In aanbod" value={beschikbaar.length} />
          <StatCard label="Verkocht" value={verkocht.length} />
          <StatCard label="Totaal voertuigen" value={autos.length} />
          <StatCard
            label="Gem. vraagprijs"
            value={gemPrijs ? `€${gemPrijs.toLocaleString("nl-NL")}` : "—"}
          />
        </div>

        {/* Gmail + Bellog */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <GmailWidget />
          </div>
          <div className="lg:col-span-2">
            <BellogWidget />
          </div>
        </div>

        {/* Recente auto's */}
        {autos.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-sm font-bold"
                style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}
              >
                Recente voertuigen
              </h3>
              <button
                onClick={goVoorraad}
                className="text-xs font-medium transition-all hover:opacity-60"
                style={{ color: "rgba(0,19,55,0.5)", fontFamily: "var(--font-inter)" }}
              >
                Bekijk alle →
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {autos.slice(0, 4).map((auto) => (
                <div
                  key={auto.id}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(0,19,55,0.07)",
                  }}
                >
                  <div
                    className="w-14 h-10 flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: "#001337" }}
                  >
                    {auto.fotos?.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={auto.fotos[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span
                          className="text-xs font-bold"
                          style={{
                            color: "rgba(255,255,255,0.2)",
                            fontFamily: "var(--font-playfair)",
                          }}
                        >
                          {auto.merk.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "#001337", fontFamily: "var(--font-inter)" }}
                    >
                      {auto.merk} {auto.model}{" "}
                      <span style={{ color: "rgba(0,19,55,0.4)", fontWeight: 400 }}>
                        {auto.bouwjaar}
                      </span>
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}
                    >
                      {auto.km.toLocaleString("nl-NL")} km · {auto.brandstof}
                    </p>
                  </div>
                  <p
                    className="text-sm font-bold flex-shrink-0"
                    style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
                  >
                    €{auto.prijs.toLocaleString("nl-NL")}
                  </p>
                  {auto.verkocht && (
                    <span
                      className="text-[9px] px-1.5 py-0.5 tracking-widest uppercase flex-shrink-0"
                      style={{
                        backgroundColor: "#001337",
                        color: "#ffffff",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      Verkocht
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Email ───────────────────────────────────────────────────────
function EmailContent() {
  return (
    <div>
      <PageHeader title="Email" subtitle="info@jgmobility.nl" />
      <div className="p-8">
        <GmailWidget />
      </div>
    </div>
  );
}

// ── Auto Voorraad ───────────────────────────────────────────────
function VoorraadContent({ autos, refresh }: { autos: Auto[]; refresh: () => void }) {
  const beschikbaar = autos.filter((a) => !a.verkocht);
  const verkocht = autos.filter((a) => a.verkocht);

  return (
    <div>
      <PageHeader
        title="Auto Voorraad"
        subtitle={`${beschikbaar.length} beschikbaar · ${verkocht.length} verkocht`}
        action={
          <Link
            href="/admin/auto-toevoegen"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: "#001337",
              color: "#ffffff",
              fontFamily: "var(--font-inter)",
            }}
          >
            <Plus size={14} /> Nieuwe auto
          </Link>
        }
      />
      <div className="p-8">
        {autos.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-28"
            style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
          >
            <Car size={40} style={{ color: "rgba(0,19,55,0.1)" }} />
            <p
              className="text-lg font-bold mt-5 mb-2"
              style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
            >
              Nog geen auto's toegevoegd
            </p>
            <Link
              href="/admin/auto-toevoegen"
              className="mt-2 flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
            >
              <Plus size={13} /> Eerste auto toevoegen
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {autos.map((auto) => (
              <div
                key={auto.id}
                className="flex items-center gap-4 px-5 py-3.5"
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
                        style={{
                          color: "rgba(255,255,255,0.15)",
                          fontFamily: "var(--font-playfair)",
                        }}
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
                        style={{
                          backgroundColor: "#001337",
                          color: "#ffffff",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        Verkocht
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}
                  >
                    {auto.bouwjaar} · {auto.km.toLocaleString("nl-NL")} km · {auto.brandstof}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 mr-2">
                  <p
                    className="text-base font-bold"
                    style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
                  >
                    €{auto.prijs.toLocaleString("nl-NL")}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}
                  >
                    {auto.fotos?.length ?? 0} foto's
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/aanbod/${auto.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-70"
                    style={{
                      border: "1px solid rgba(0,19,55,0.15)",
                      color: "#001337",
                      fontFamily: "var(--font-inter)",
                    }}
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
  );
}
