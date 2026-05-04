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

type IconProps = { size?: number; style?: React.CSSProperties; className?: string };

const NAV: { id: Tab; label: string; icon: React.ComponentType<IconProps> }[] = [
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
  icon: React.ComponentType<IconProps>;
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
        {tab === "cosignatie" && <CosignatieContent />}
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
function VoorraadContent({ autos }: { autos: Auto[]; refresh: () => void }) {
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

// ── Cosignatie ──────────────────────────────────────────────────
type Cosignatie = {
  id: string;
  datum: string;
  tijd: string;
  naam: string;
  email: string;
  telefoon: string;
  merk: string;
  model: string;
  bouwjaar: string;
  km: string;
  vraagprijs: string;
  opmerking: string;
  aantal_fotos: number;
  status: string;
  notitie: string;
};

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  nieuw:          { label: "Nieuw",          color: "#b45309", bg: "#fef3c7" },
  in_behandeling: { label: "In behandeling", color: "#1d4ed8", bg: "#dbeafe" },
  geaccepteerd:   { label: "Geaccepteerd",   color: "#15803d", bg: "#dcfce7" },
  afgewezen:      { label: "Afgewezen",      color: "#b91c1c", bg: "#fee2e2" },
};

function CosignatieContent() {
  const [aanvragen, setAanvragen] = useState<Cosignatie[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const laad = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/cosignaties");
    if (res.ok) setAanvragen(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { laad(); }, [laad]);

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    await fetch(`/api/admin/cosignaties/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAanvragen((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setSaving(false);
  };

  const updateNotitie = async (id: string, notitie: string) => {
    await fetch(`/api/admin/cosignaties/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notitie }),
    });
    setAanvragen((prev) => prev.map((a) => (a.id === id ? { ...a, notitie } : a)));
  };

  const verwijder = async (id: string) => {
    if (!confirm("Aanvraag verwijderen?")) return;
    await fetch(`/api/admin/cosignaties/${id}`, { method: "DELETE" });
    setAanvragen((prev) => prev.filter((a) => a.id !== id));
    if (openId === id) setOpenId(null);
  };

  const nieuweAanvragen = aanvragen.filter((a) => a.status === "nieuw").length;

  return (
    <div>
      <PageHeader
        title="Cosignatie"
        subtitle={`${aanvragen.length} aanvragen${nieuweAanvragen > 0 ? ` · ${nieuweAanvragen} nieuw` : ""}`}
      />
      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div
              className="w-6 h-6 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(0,19,55,0.1)", borderTopColor: "#001337" }}
            />
          </div>
        ) : aanvragen.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-28"
            style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
          >
            <Handshake size={40} style={{ color: "rgba(0,19,55,0.1)" }} />
            <p
              className="text-lg font-bold mt-5 mb-2"
              style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}
            >
              Nog geen aanvragen
            </p>
            <p
              className="text-sm"
              style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}
            >
              Ingestuurde cosignatie-aanvragen verschijnen hier automatisch.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {aanvragen.map((a) => {
              const s = STATUS_LABELS[a.status] ?? STATUS_LABELS.nieuw;
              const isOpen = openId === a.id;
              return (
                <div
                  key={a.id}
                  style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : a.id)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>
                          {a.merk} {a.model}{" "}
                          <span style={{ fontWeight: 400, color: "rgba(0,19,55,0.5)" }}>{a.bouwjaar}</span>
                        </p>
                        <span
                          className="text-[10px] px-2 py-0.5 font-semibold"
                          style={{ backgroundColor: s.bg, color: s.color, fontFamily: "var(--font-inter)" }}
                        >
                          {s.label}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                        {a.naam} · {a.email}{a.telefoon ? ` · ${a.telefoon}` : ""}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {a.vraagprijs && (
                        <p className="text-sm font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                          €{parseInt(a.vraagprijs).toLocaleString("nl-NL")}
                        </p>
                      )}
                      <p className="text-[10px]" style={{ color: "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}>
                        {a.datum} · {a.tijd}{a.aantal_fotos > 0 ? ` · ${a.aantal_fotos} foto's` : ""}
                      </p>
                    </div>
                    <span className="text-xs ml-2 flex-shrink-0" style={{ color: "rgba(0,19,55,0.3)" }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(0,19,55,0.06)" }}>
                      <div className="grid grid-cols-2 gap-6 pt-4">
                        <div>
                          <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Auto</p>
                          <table className="w-full text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                            <tbody>
                              {[
                                ["Merk & Model", `${a.merk} ${a.model}`],
                                ["Bouwjaar", a.bouwjaar],
                                ["Kilometerstand", a.km ? `${parseInt(a.km).toLocaleString("nl-NL")} km` : "—"],
                                ["Vraagprijs", a.vraagprijs ? `€${parseInt(a.vraagprijs).toLocaleString("nl-NL")}` : "—"],
                              ].map(([label, val]) => (
                                <tr key={label}>
                                  <td className="py-1 pr-3" style={{ color: "rgba(0,19,55,0.45)", width: "110px" }}>{label}</td>
                                  <td className="py-1 font-semibold" style={{ color: "#001337" }}>{val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {a.opmerking && (
                            <div className="mt-3 p-3 text-xs" style={{ backgroundColor: "rgba(0,19,55,0.03)", border: "1px solid rgba(0,19,55,0.07)", color: "rgba(0,19,55,0.65)", fontFamily: "var(--font-inter)", lineHeight: 1.6 }}>
                              {a.opmerking}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Status</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(STATUS_LABELS).map(([key, val]) => (
                              <button
                                key={key}
                                disabled={saving}
                                onClick={() => updateStatus(a.id, key)}
                                className="px-3 py-1 text-xs font-semibold transition-all"
                                style={{
                                  backgroundColor: a.status === key ? val.bg : "transparent",
                                  color: a.status === key ? val.color : "rgba(0,19,55,0.4)",
                                  border: `1px solid ${a.status === key ? val.color : "rgba(0,19,55,0.15)"}`,
                                  fontFamily: "var(--font-inter)",
                                }}
                              >
                                {val.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>Notitie</p>
                          <textarea
                            defaultValue={a.notitie}
                            rows={3}
                            onBlur={(e) => updateNotitie(a.id, e.target.value)}
                            placeholder="Interne notitie..."
                            className="w-full px-3 py-2 text-xs outline-none resize-none"
                            style={{ backgroundColor: "rgba(0,19,55,0.02)", border: "1px solid rgba(0,19,55,0.12)", color: "#001337", fontFamily: "var(--font-inter)", lineHeight: 1.6 }}
                          />
                          <div className="flex justify-between items-center mt-3">
                            <a
                              href={`mailto:${a.email}`}
                              className="text-xs font-semibold transition-all hover:opacity-70"
                              style={{ backgroundColor: "#001337", color: "#ffffff", padding: "6px 14px", fontFamily: "var(--font-inter)" }}
                            >
                              Mail {a.naam.split(" ")[0]}
                            </a>
                            <button
                              onClick={() => verwijder(a.id)}
                              className="text-xs transition-all hover:opacity-70"
                              style={{ color: "#b91c1c", fontFamily: "var(--font-inter)" }}
                            >
                              Verwijder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
