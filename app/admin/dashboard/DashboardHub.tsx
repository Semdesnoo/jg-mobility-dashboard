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
        {tab === "facturen" && <FacturenContent />}
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

// ── Facturen ────────────────────────────────────────────────────
type FactuurRegel = { omschrijving: string; prijs: string };

type Factuur = {
  id: string;
  factuur_nr: string;
  datum: string;
  vervaldatum: string;
  klant_naam: string;
  klant_adres: string;
  klant_postcode: string;
  klant_stad: string;
  klant_email: string;
  klant_telefoon: string;
  auto_merk: string;
  auto_model: string;
  auto_bouwjaar: string;
  auto_kenteken: string;
  auto_km: string;
  auto_kleur: string;
  auto_vin: string;
  verkoopprijs: number;
  btw_type: string;
  betaalwijze: string;
  notitie: string;
  status: string;
  regels: string;
};

const FACTUUR_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  concept:   { label: "Concept",   color: "#92400e", bg: "#fef3c7" },
  verzonden: { label: "Verzonden", color: "#1d4ed8", bg: "#dbeafe" },
  betaald:   { label: "Betaald",   color: "#15803d", bg: "#dcfce7" },
};

type FactuurForm = {
  klant_naam: string; klant_adres: string; klant_postcode: string; klant_stad: string;
  klant_email: string; klant_telefoon: string;
  auto_merk: string; auto_model: string; auto_bouwjaar: string; auto_kenteken: string;
  auto_km: string; auto_kleur: string; auto_vin: string;
  verkoopprijs: string;
  btw_type: string; betaalwijze: string;
  datum: string; vervaldatum: string; notitie: string;
};

const LEEG_REGELS: FactuurRegel[] = [
  { omschrijving: "", prijs: "" },
  { omschrijving: "", prijs: "" },
  { omschrijving: "", prijs: "" },
];

const LEEG_FORM: FactuurForm = {
  klant_naam: "", klant_adres: "", klant_postcode: "", klant_stad: "",
  klant_email: "", klant_telefoon: "",
  auto_merk: "", auto_model: "", auto_bouwjaar: "", auto_kenteken: "",
  auto_km: "", auto_kleur: "", auto_vin: "",
  verkoopprijs: "",
  btw_type: "marge", betaalwijze: "bank",
  datum: new Date().toLocaleDateString("nl-NL"),
  vervaldatum: "", notitie: "",
};

function genereerFactuurHTML(f: Factuur, logoSrc: string): string {
  const autoBasePrijs = Number(f.verkoopprijs);
  let extraRegels: FactuurRegel[] = [];
  try { extraRegels = JSON.parse(f.regels || "[]").filter((r: FactuurRegel) => r.omschrijving && Number(r.prijs) > 0); } catch { /* */ }

  const extraTotaal = extraRegels.reduce((s, r) => s + Number(r.prijs), 0);
  const subtotaalExAuto = f.btw_type === "21" ? Math.round(autoBasePrijs / 1.21) : autoBasePrijs;
  const subtotaal = subtotaalExAuto + extraTotaal;
  const btwBedrag = f.btw_type === "21" ? autoBasePrijs - subtotaalExAuto : 0;
  const eindtotaal = subtotaal + btwBedrag;

  const autoOmschrijving = [f.auto_merk, f.auto_model, f.auto_bouwjaar].filter(Boolean).join(" ") || "Voertuig";
  const autoKenteken = f.auto_kenteken ? ` &middot; ${f.auto_kenteken.toUpperCase()}` : "";

  const regelRijen = [
    `<tr>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;color:#1e293b;font-size:10pt">${autoOmschrijving}${autoKenteken}</td>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;text-align:right;color:#1e293b;font-size:10pt">€&nbsp;${subtotaalExAuto.toLocaleString("nl-NL")}</td>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;text-align:right;color:#1e293b;font-size:10pt;width:60px">1</td>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;text-align:right;color:#1e293b;font-size:10pt">€&nbsp;${subtotaalExAuto.toLocaleString("nl-NL")}</td>
    </tr>`,
    ...extraRegels.map((r) => `<tr>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;color:#1e293b;font-size:10pt">${r.omschrijving}</td>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;text-align:right;color:#1e293b;font-size:10pt">€&nbsp;${Number(r.prijs).toLocaleString("nl-NL")}</td>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;text-align:right;color:#1e293b;font-size:10pt">1</td>
      <td style="padding:11px 0;border-bottom:1px solid #e8eaf0;text-align:right;color:#1e293b;font-size:10pt">€&nbsp;${Number(r.prijs).toLocaleString("nl-NL")}</td>
    </tr>`),
  ].join("");

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Factuur ${f.factuur_nr}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
  body { font-family:'Helvetica Neue',Arial,sans-serif; color:#1e293b; background:#fff; width:794px; margin:0 auto; }
  @media print { @page { size:A4; margin:0; } body { width:100%; } }
  table { border-collapse:collapse; }
</style>
</head>
<body>

<!-- HEADER: logo met ingebakken achtergrond -->
<div style="width:100%;background-color:#001337;text-align:center;line-height:0;padding:14px 0">
  <img src="${logoSrc}" alt="JG Mobility"
       style="height:55px;object-fit:contain;display:inline-block">
</div>

<!-- BODY -->
<div style="padding:44px 48px 44px">

  <!-- Bedrijf links + FACTUUR rechts -->
  <table style="width:100%;margin-bottom:32px">
    <tr>
      <td style="vertical-align:top;width:55%">
        <div style="font-size:10.5pt;font-weight:700;color:#001337;margin-bottom:2px">JG MOBILITY</div>
        <div style="font-size:9pt;color:#64748b;line-height:1.75">
          Arnhemseweg 10a<br>
          2994LA Barendrecht<br>
          info@jgmobility.nl<br>
          www.jgmobility.nl
        </div>
      </td>
      <td style="text-align:right;vertical-align:top;width:45%">
        <div style="font-size:28pt;font-weight:300;letter-spacing:8px;color:#001337;line-height:1;text-transform:uppercase">Factuur</div>
        <div style="font-size:10pt;color:#94a3b8;margin-top:6px;letter-spacing:.5px">#${f.factuur_nr}</div>
      </td>
    </tr>
  </table>

  <!-- KVK/BTW/IBAN + datum links | Klant rechts -->
  <table style="width:100%;margin-bottom:32px;padding-bottom:24px;border-bottom:1.5px solid #001337">
    <tr>
      <td style="vertical-align:top;width:50%">
        <table style="font-size:9pt">
          <tr>
            <td style="color:#475569;font-weight:600;padding:2px 14px 2px 0;width:64px">KVK nr.</td>
            <td style="color:#1e293b">42042275</td>
          </tr>
          <tr>
            <td style="color:#475569;font-weight:600;padding:2px 14px 2px 0">BTW nr.</td>
            <td style="color:#1e293b">NL005450398B70</td>
          </tr>
          <tr>
            <td style="color:#475569;font-weight:600;padding:2px 14px 2px 0">IBAN</td>
            <td style="color:#1e293b">(volgt)</td>
          </tr>
        </table>
        <div style="font-size:9pt;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:#001337;margin-top:13px">
          Datum: ${f.datum}${f.vervaldatum ? `<br>Vervalt: ${f.vervaldatum}` : ""}
        </div>
      </td>
      <td style="vertical-align:top;padding-left:36px;width:50%">
        <div style="font-size:11pt;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#001337;margin-bottom:6px">${f.klant_naam || "—"}</div>
        <div style="font-size:9.5pt;color:#475569;line-height:1.75">
          ${f.klant_adres ? f.klant_adres + "<br>" : ""}
          ${[f.klant_postcode, f.klant_stad].filter(Boolean).join(" ")}${(f.klant_postcode || f.klant_stad) ? "<br>" : ""}
          ${f.klant_email ? f.klant_email + "<br>" : ""}
          ${f.klant_telefoon || ""}
        </div>
      </td>
    </tr>
  </table>

  <!-- Regelstabel -->
  <table style="width:100%;margin-bottom:4px">
    <thead>
      <tr style="border-bottom:1.5px solid #001337">
        <th style="font-size:7.5pt;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#001337;padding:0 0 9px;text-align:left">Omschrijving</th>
        <th style="font-size:7.5pt;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#001337;padding:0 0 9px;text-align:right;width:115px">Tarief</th>
        <th style="font-size:7.5pt;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#001337;padding:0 0 9px;text-align:right;width:55px">Aantal</th>
        <th style="font-size:7.5pt;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#001337;padding:0 0 9px;text-align:right;width:115px">Subtotaal</th>
      </tr>
    </thead>
    <tbody>
      ${regelRijen}
    </tbody>
  </table>

  <!-- Totalen rechts uitgelijnd -->
  <table style="width:270px;margin-left:auto;margin-bottom:30px;margin-top:10px">
    <tr>
      <td style="font-size:9.5pt;color:#64748b;padding:4px 0">Subtotaal</td>
      <td style="font-size:9.5pt;color:#64748b;text-align:right;padding:4px 0">€&nbsp;${subtotaal.toLocaleString("nl-NL")}</td>
    </tr>
    ${f.btw_type === "21"
      ? `<tr>
          <td style="font-size:9.5pt;color:#1d4ed8;padding:4px 0;border-bottom:1px solid #e2e8f0">BTW (21%)</td>
          <td style="font-size:9.5pt;color:#1d4ed8;text-align:right;padding:4px 0;border-bottom:1px solid #e2e8f0">€&nbsp;${btwBedrag.toLocaleString("nl-NL")}</td>
        </tr>`
      : `<tr><td colspan="2" style="border-bottom:1px solid #e2e8f0;padding:3px 0"></td></tr>`}
    <tr>
      <td style="font-size:12pt;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#001337;padding:9px 0 0">Eindtotaal</td>
      <td style="font-size:12pt;font-weight:700;color:#001337;text-align:right;padding:9px 0 0">€&nbsp;${eindtotaal.toLocaleString("nl-NL")}</td>
    </tr>
  </table>

  <!-- Betaaltekst -->
  <div style="font-size:9pt;color:#475569;line-height:1.85;border-top:1px solid #e2e8f0;padding-top:16px;margin-bottom:12px">
    Wij vragen u vriendelijk het bedrag van €${eindtotaal.toLocaleString("nl-NL")} ${f.vervaldatum ? `voor ${f.vervaldatum}` : "binnen 30 dagen na ontvangst"} over te maken
    ${f.betaalwijze === "bank" ? "op rekening (IBAN volgt) onder vermelding van factuurnummer <strong>" + f.factuur_nr + "</strong>" : "te voldoen per contant"}.
    <br>Factuur uitgereikt door JG MOBILITY.
    ${f.btw_type === "marge" ? `<br><span style="font-size:8pt;color:#94a3b8">Op dit voertuig is de margeregeling van toepassing. BTW is niet afzonderlijk vermeld (art. 28b t/m 28h Wet OB 1968).</span>` : ""}
  </div>

  ${f.notitie ? `<div style="font-size:9pt;color:#475569;font-style:italic;margin-bottom:16px;padding:10px 14px;background:#f8fafc;border-left:3px solid #cbd5e1">${f.notitie}</div>` : ""}

  <!-- Footer -->
  <div style="text-align:center;font-size:8pt;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#001337;border-top:1px solid #e2e8f0;padding-top:16px">
    HARTELIJK DANK VOOR HET VERTROUWEN IN JG MOBILITY
  </div>

</div>
</body>
</html>`;
}

function FacturenContent() {
  const [facturen, setFacturen] = useState<Factuur[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"lijst" | "nieuw">("lijst");
  const [form, setForm] = useState<FactuurForm>(LEEG_FORM);
  const [regels, setRegels] = useState<FactuurRegel[]>(LEEG_REGELS);
  const [saving, setSaving] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [fout, setFout] = useState<string | null>(null);
  const [nieuwsteFactuur, setNieuwsteFactuur] = useState<Factuur | null>(null);
  const [bewerkFactuur, setBewerkFactuur] = useState<Factuur | null>(null);
  const [rdwLaden, setRdwLaden] = useState(false);
  const [rdwStatus, setRdwStatus] = useState<"idle" | "gevonden" | "niet_gevonden">("idle");

  const laad = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/facturen");
    if (res.ok) setFacturen(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { laad(); }, [laad]);

  const zoekRdw = useCallback(async (kenteken: string) => {
    const schoon = kenteken.replace(/[-\s]/g, "").toUpperCase();
    if (schoon.length < 4) return;
    setRdwLaden(true);
    setRdwStatus("idle");
    try {
      const res = await fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${schoon}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const v = data[0];
        const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
        setForm((prev) => ({
          ...prev,
          auto_merk: v.merk ? cap(v.merk) : prev.auto_merk,
          auto_model: v.handelsbenaming ? cap(v.handelsbenaming) : prev.auto_model,
          auto_bouwjaar: v.datum_eerste_toelating ? String(v.datum_eerste_toelating).slice(0, 4) : prev.auto_bouwjaar,
          auto_kleur: v.eerste_kleur ? cap(v.eerste_kleur) : prev.auto_kleur,
        }));
        setRdwStatus("gevonden");
      } else {
        setRdwStatus("niet_gevonden");
      }
    } catch {
      setRdwStatus("niet_gevonden");
    } finally {
      setRdwLaden(false);
    }
  }, []);

  useEffect(() => {
    const schoon = form.auto_kenteken.replace(/[-\s]/g, "");
    if (schoon.length < 4) { setRdwStatus("idle"); return; }
    const t = setTimeout(() => zoekRdw(form.auto_kenteken), 700);
    return () => clearTimeout(t);
  }, [form.auto_kenteken, zoekRdw]);

  const startBewerken = (f: Factuur) => {
    let parsedRegels: FactuurRegel[] = [];
    try { parsedRegels = JSON.parse(f.regels || "[]"); } catch { /* */ }
    while (parsedRegels.length < 3) parsedRegels.push({ omschrijving: "", prijs: "" });
    setBewerkFactuur(f);
    setForm({
      klant_naam: f.klant_naam, klant_adres: f.klant_adres, klant_postcode: f.klant_postcode,
      klant_stad: f.klant_stad, klant_email: f.klant_email, klant_telefoon: f.klant_telefoon,
      auto_merk: f.auto_merk, auto_model: f.auto_model, auto_bouwjaar: f.auto_bouwjaar,
      auto_kenteken: f.auto_kenteken, auto_km: f.auto_km, auto_kleur: f.auto_kleur, auto_vin: f.auto_vin,
      verkoopprijs: String(f.verkoopprijs),
      btw_type: f.btw_type, betaalwijze: f.betaalwijze,
      datum: f.datum, vervaldatum: f.vervaldatum, notitie: f.notitie,
    });
    setRegels(parsedRegels);
    setFout(null);
    setView("nieuw");
  };

  const sla = async () => {
    setFout(null);
    setSaving(true);
    try {
      const actieveRegels = regels.filter((r) => r.omschrijving && Number(r.prijs) > 0);
      if (bewerkFactuur) {
        const res = await fetch(`/api/admin/facturen/${bewerkFactuur.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, verkoopprijs: Number(form.verkoopprijs) || 0, regels: actieveRegels, fullUpdate: true }),
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          setFout(`Opslaan mislukt (${res.status})${txt ? ": " + txt.slice(0, 200) : ""}.`);
          return;
        }
        const bijgewerkt: Factuur = await res.json();
        setFacturen((prev) => prev.map((f) => (f.id === bijgewerkt.id ? bijgewerkt : f)));
        setNieuwsteFactuur(bijgewerkt);
        setBewerkFactuur(null);
      } else {
        const res = await fetch("/api/admin/facturen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, verkoopprijs: Number(form.verkoopprijs) || 0, regels: actieveRegels }),
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          setFout(`Opslaan mislukt (${res.status})${txt ? ": " + txt.slice(0, 200) : ""}. Controleer of init-db is uitgevoerd.`);
          return;
        }
        const nieuw: Factuur = await res.json();
        setFacturen((prev) => [nieuw, ...prev]);
        setNieuwsteFactuur(nieuw);
      }
      setView("lijst");
      setForm(LEEG_FORM);
      setRegels(LEEG_REGELS);
    } catch (err) {
      setFout(`Netwerkfout: ${String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/facturen/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setFacturen((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
  };

  const verwijder = async (id: string) => {
    if (!confirm("Factuur definitief verwijderen?")) return;
    await fetch(`/api/admin/facturen/${id}`, { method: "DELETE" });
    setFacturen((prev) => prev.filter((f) => f.id !== id));
    if (openId === id) setOpenId(null);
  };

  const printFactuur = async (f: Factuur) => {
    let logoSrc = "";
    try {
      const res = await fetch(encodeURI("/JG Mobility.png"));
      if (res.ok) {
        const blob = await res.blob();
        logoSrc = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => resolve("");
          reader.readAsDataURL(blob);
        });
      }
    } catch { /* logo niet beschikbaar */ }

    const html = genereerFactuurHTML(f, logoSrc);
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;border:none;";
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(html);
    doc.close();
    iframe.contentWindow?.focus();
    setTimeout(() => {
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 2000);
    }, 500);
  };

  const inp = (field: keyof FactuurForm) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value })),
  });

  const veldStijl: React.CSSProperties = {
    border: "1px solid rgba(0,19,55,0.15)",
    color: "#001337",
    fontFamily: "var(--font-inter)",
    backgroundColor: "#fafafa",
  };

  const labelStijl: React.CSSProperties = {
    color: "rgba(0,19,55,0.4)",
    fontFamily: "var(--font-inter)",
  };

  // ── Nieuwe factuur ──────────────────────────────────────────
  if (view === "nieuw") {
    const secties: { titel: string; velden: { label: string; field: keyof FactuurForm; col?: number }[] }[] = [
      {
        titel: "Klantgegevens",
        velden: [
          { label: "Volledige naam", field: "klant_naam", col: 2 },
          { label: "Adres", field: "klant_adres", col: 2 },
          { label: "Postcode", field: "klant_postcode" },
          { label: "Stad", field: "klant_stad" },
          { label: "E-mailadres", field: "klant_email" },
          { label: "Telefoonnummer", field: "klant_telefoon" },
        ],
      },
      {
        titel: "Voertuig",
        velden: [
          { label: "Merk", field: "auto_merk" },
          { label: "Model", field: "auto_model" },
          { label: "Bouwjaar", field: "auto_bouwjaar" },
          { label: "Kenteken", field: "auto_kenteken" },
          { label: "Kilometerstand", field: "auto_km" },
          { label: "Kleur", field: "auto_kleur" },
          { label: "VIN-nummer", field: "auto_vin", col: 2 },
        ],
      },
    ];

    return (
      <div>
        <PageHeader
          title={bewerkFactuur ? `Bewerken: ${bewerkFactuur.factuur_nr}` : "Nieuwe factuur"}
          subtitle={bewerkFactuur ? "Wijzig de gegevens en sla op — factuurnummer blijft ongewijzigd" : "Vul de gegevens in en genereer de factuur"}
          action={
            <button
              onClick={() => { setView("lijst"); setForm(LEEG_FORM); setRegels(LEEG_REGELS); setBewerkFactuur(null); }}
              className="text-xs px-4 py-2 transition-all hover:opacity-70"
              style={{ border: "1px solid rgba(0,19,55,0.15)", color: "#001337", fontFamily: "var(--font-inter)" }}
            >
              ← Annuleer
            </button>
          }
        />
        <div className="p-8" style={{ maxWidth: "720px" }}>
          {fout && (
            <div className="mb-5 px-4 py-3 text-sm" style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c", fontFamily: "var(--font-inter)", lineHeight: 1.6 }}>
              <strong>Fout:</strong> {fout}
            </div>
          )}
          {secties.map(({ titel, velden }) => (
            <div key={titel} className="mb-5" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(0,19,55,0.06)", backgroundColor: "rgba(0,19,55,0.02)" }}>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={labelStijl}>{titel}</p>
                {titel === "Voertuig" && rdwLaden && (
                  <span className="text-[10px] flex items-center gap-1.5" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                    <span className="inline-block w-2.5 h-2.5 rounded-full border border-current border-t-transparent animate-spin" />
                    RDW ophalen...
                  </span>
                )}
                {titel === "Voertuig" && !rdwLaden && rdwStatus === "gevonden" && (
                  <span className="text-[10px]" style={{ color: "#15803d", fontFamily: "var(--font-inter)" }}>
                    ✓ Gevonden via RDW
                  </span>
                )}
                {titel === "Voertuig" && !rdwLaden && rdwStatus === "niet_gevonden" && (
                  <span className="text-[10px]" style={{ color: "#b91c1c", fontFamily: "var(--font-inter)" }}>
                    Kenteken niet gevonden
                  </span>
                )}
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                {velden.map(({ label, field, col }) => (
                  <div key={field} style={{ gridColumn: col ? `span ${col}` : undefined }}>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>{label}</label>
                    <input type="text" {...inp(field)} className="w-full px-3 py-2 text-sm outline-none" style={veldStijl} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Financieel */}
          <div className="mb-5" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}>
            <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(0,19,55,0.06)", backgroundColor: "rgba(0,19,55,0.02)" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={labelStijl}>Financieel</p>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>Verkoopprijs (€)</label>
                <input type="number" {...inp("verkoopprijs")} className="w-full px-3 py-2 text-sm outline-none" style={veldStijl} />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>BTW type</label>
                <select {...inp("btw_type")} className="w-full px-3 py-2 text-sm outline-none" style={veldStijl}>
                  <option value="marge">Margeregeling (geen BTW)</option>
                  <option value="21">21% BTW</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>Betaalwijze</label>
                <select {...inp("betaalwijze")} className="w-full px-3 py-2 text-sm outline-none" style={veldStijl}>
                  <option value="bank">Bankoverschrijving</option>
                  <option value="contant">Contant</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>Factuurdatum</label>
                <input type="text" {...inp("datum")} className="w-full px-3 py-2 text-sm outline-none" style={veldStijl} />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>Vervaldatum</label>
                <input type="text" {...inp("vervaldatum")} placeholder="bijv. 30-05-2026" className="w-full px-3 py-2 text-sm outline-none" style={veldStijl} />
              </div>
            </div>
          </div>

          {/* Extra regels */}
          <div className="mb-5" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}>
            <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(0,19,55,0.06)", backgroundColor: "rgba(0,19,55,0.02)" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={labelStijl}>Extra regels (optioneel — bv. banden, garantie)</p>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {regels.map((r, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1">
                    {i === 0 && <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>Omschrijving</label>}
                    <input
                      type="text"
                      value={r.omschrijving}
                      onChange={(e) => setRegels((prev) => prev.map((x, j) => j === i ? { ...x, omschrijving: e.target.value } : x))}
                      placeholder="bijv. Banden, Garantie, Service..."
                      className="w-full px-3 py-2 text-sm outline-none"
                      style={veldStijl}
                    />
                  </div>
                  <div style={{ width: "130px" }}>
                    {i === 0 && <label className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={labelStijl}>Prijs (€)</label>}
                    <input
                      type="number"
                      value={r.prijs}
                      onChange={(e) => setRegels((prev) => prev.map((x, j) => j === i ? { ...x, prijs: e.target.value } : x))}
                      placeholder="0"
                      className="w-full px-3 py-2 text-sm outline-none"
                      style={veldStijl}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notitie */}
          <div className="mb-7" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}>
            <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(0,19,55,0.06)", backgroundColor: "rgba(0,19,55,0.02)" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={labelStijl}>Notitie (optioneel)</p>
            </div>
            <div className="p-5">
              <textarea
                {...inp("notitie")}
                rows={3}
                placeholder="Extra opmerkingen die op de factuur verschijnen..."
                className="w-full px-3 py-2 text-sm outline-none resize-none"
                style={{ ...veldStijl, lineHeight: 1.6 }}
              />
            </div>
          </div>

          <button
            onClick={sla}
            disabled={saving}
            className="px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            {saving ? "Opslaan..." : bewerkFactuur ? "Wijzigingen opslaan" : "Factuur aanmaken & afdrukken"}
          </button>
        </div>
      </div>
    );
  }

  // ── Lijstweergave ───────────────────────────────────────────
  return (
    <div>
      <PageHeader
        title="Facturen"
        subtitle={`${facturen.length} facturen`}
        action={
          <button
            onClick={() => setView("nieuw")}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
          >
            <Plus size={14} /> Nieuwe factuur
          </button>
        }
      />
      <div className="p-8">
        {nieuwsteFactuur && (
          <div className="mb-5 flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#dcfce7", border: "1px solid #86efac", fontFamily: "var(--font-inter)" }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
                Factuur {nieuwsteFactuur.factuur_nr} aangemaakt
              </p>
              <p className="text-xs" style={{ color: "#166534" }}>Klik op Afdrukken om de PDF te openen.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => printFactuur(nieuwsteFactuur)}
                className="px-4 py-2 text-xs font-semibold"
                style={{ backgroundColor: "#15803d", color: "#ffffff", fontFamily: "var(--font-inter)" }}
              >
                Afdrukken / PDF
              </button>
              <button
                onClick={() => setNieuwsteFactuur(null)}
                className="px-3 py-2 text-xs"
                style={{ color: "#15803d", border: "1px solid #86efac", fontFamily: "var(--font-inter)" }}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "rgba(0,19,55,0.1)", borderTopColor: "#001337" }} />
          </div>
        ) : facturen.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-28"
            style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}
          >
            <FileText size={40} style={{ color: "rgba(0,19,55,0.1)" }} />
            <p className="text-lg font-bold mt-5 mb-2" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
              Nog geen facturen
            </p>
            <p className="text-sm mb-5" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
              Maak de eerste factuur aan via de knop rechtsboven.
            </p>
            <button
              onClick={() => setView("nieuw")}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold"
              style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
            >
              <Plus size={13} /> Eerste factuur aanmaken
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {facturen.map((f) => {
              const s = FACTUUR_STATUS[f.status] ?? FACTUUR_STATUS.concept;
              const isOpen = openId === f.id;
              return (
                <div key={f.id} style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,19,55,0.07)" }}>
                  <button
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold" style={{ color: "#001337", fontFamily: "var(--font-playfair)" }}>
                          {f.factuur_nr} · {f.klant_naam || "Naamloos"}
                        </p>
                        <span
                          className="text-[10px] px-2 py-0.5 font-semibold"
                          style={{ backgroundColor: s.bg, color: s.color, fontFamily: "var(--font-inter)" }}
                        >
                          {s.label}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(0,19,55,0.45)", fontFamily: "var(--font-inter)" }}>
                        {[f.auto_merk, f.auto_model, f.auto_bouwjaar].filter(Boolean).join(" ")}
                        {f.auto_kenteken ? ` · ${f.auto_kenteken.toUpperCase()}` : ""}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#001337" }}>
                        €{Number(f.verkoopprijs).toLocaleString("nl-NL")}
                      </p>
                      <p className="text-[10px]" style={{ color: "rgba(0,19,55,0.35)", fontFamily: "var(--font-inter)" }}>
                        {f.datum} · {f.btw_type === "marge" ? "Marge" : "21% BTW"}
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
                          <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
                            Details
                          </p>
                          <table className="w-full text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                            <tbody>
                              {([
                                ["Klant", f.klant_naam],
                                ["Adres", [f.klant_adres, f.klant_postcode, f.klant_stad].filter(Boolean).join(", ")],
                                ["E-mail", f.klant_email],
                                ["Telefoon", f.klant_telefoon],
                                ["Voertuig", [f.auto_merk, f.auto_model, f.auto_bouwjaar].filter(Boolean).join(" ")],
                                ["Kenteken", f.auto_kenteken?.toUpperCase()],
                                ["KM-stand", f.auto_km ? `${parseInt(f.auto_km).toLocaleString("nl-NL")} km` : ""],
                              ] as [string, string][])
                                .filter(([, v]) => v)
                                .map(([label, val]) => (
                                  <tr key={label}>
                                    <td className="py-1 pr-3" style={{ color: "rgba(0,19,55,0.45)", width: "90px" }}>{label}</td>
                                    <td className="py-1 font-semibold" style={{ color: "#001337" }}>{val}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "rgba(0,19,55,0.4)", fontFamily: "var(--font-inter)" }}>
                            Status
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(FACTUUR_STATUS).map(([key, val]) => (
                              <button
                                key={key}
                                onClick={() => updateStatus(f.id, key)}
                                className="px-3 py-1 text-xs font-semibold transition-all"
                                style={{
                                  backgroundColor: f.status === key ? val.bg : "transparent",
                                  color: f.status === key ? val.color : "rgba(0,19,55,0.4)",
                                  border: `1px solid ${f.status === key ? val.color : "rgba(0,19,55,0.15)"}`,
                                  fontFamily: "var(--font-inter)",
                                }}
                              >
                                {val.label}
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => printFactuur(f)}
                              className="px-4 py-2 text-xs font-semibold transition-all hover:opacity-80"
                              style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                            >
                              Afdrukken / PDF
                            </button>
                            <button
                              onClick={() => startBewerken(f)}
                              className="px-4 py-2 text-xs font-semibold transition-all hover:opacity-80"
                              style={{ border: "1px solid rgba(0,19,55,0.2)", color: "#001337", fontFamily: "var(--font-inter)" }}
                            >
                              Bewerken
                            </button>
                            <button
                              onClick={() => verwijder(f.id)}
                              className="px-4 py-2 text-xs transition-all hover:opacity-70"
                              style={{ color: "#b91c1c", border: "1px solid #fecaca", fontFamily: "var(--font-inter)" }}
                            >
                              Verwijder
                            </button>
                          </div>
                          {f.notitie && (
                            <div className="mt-4 p-3 text-xs" style={{ backgroundColor: "rgba(0,19,55,0.03)", border: "1px solid rgba(0,19,55,0.07)", color: "rgba(0,19,55,0.65)", fontFamily: "var(--font-inter)", lineHeight: 1.6 }}>
                              {f.notitie}
                            </div>
                          )}
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
