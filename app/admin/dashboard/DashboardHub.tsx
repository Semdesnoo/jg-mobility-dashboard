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

function genereerFactuurHTML(f: Factuur): string {
  const prijs = Number(f.verkoopprijs);
  const exBtw = f.btw_type === "21" ? Math.round(prijs / 1.21) : 0;
  const btwBedrag = f.btw_type === "21" ? prijs - exBtw : 0;

  const prijsRijen =
    f.btw_type === "21"
      ? `<tr>
           <td style="padding:7px 0;border-bottom:1px solid #e5e7eb;color:#374151">Voertuig excl. BTW</td>
           <td style="text-align:right;padding:7px 0;border-bottom:1px solid #e5e7eb;color:#374151">€ ${exBtw.toLocaleString("nl-NL")}</td>
         </tr>
         <tr>
           <td style="padding:7px 0;border-bottom:1px solid #e5e7eb;color:#374151">BTW 21%</td>
           <td style="text-align:right;padding:7px 0;border-bottom:1px solid #e5e7eb;color:#374151">€ ${btwBedrag.toLocaleString("nl-NL")}</td>
         </tr>`
      : `<tr>
           <td style="padding:7px 0;border-bottom:1px solid #e5e7eb;color:#374151">Voertuig (margeregeling)</td>
           <td style="text-align:right;padding:7px 0;border-bottom:1px solid #e5e7eb;color:#374151">€ ${prijs.toLocaleString("nl-NL")}</td>
         </tr>`;

  const klantAdresRegel = [f.klant_adres, [f.klant_postcode, f.klant_stad].filter(Boolean).join(" ")]
    .filter(Boolean)
    .map((r) => `<div style="color:#374151;font-size:10pt">${r}</div>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Factuur ${f.factuur_nr}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Helvetica Neue',Arial,sans-serif; font-size:11pt; color:#1a1a2e; background:#fff; padding:40px 50px; max-width:794px; margin:0 auto; }
  @media print { @page { size:A4; margin:15mm 18mm; } body { padding:0; } }
  table { border-collapse:collapse; width:100%; }
  .lbl { font-size:9pt; color:#6b7280; text-transform:uppercase; letter-spacing:.08em; margin-bottom:4px; }
  hr { border:none; border-top:1px solid #e5e7eb; margin:20px 0; }
</style>
</head>
<body>

<table style="margin-bottom:28px">
  <tr>
    <td style="vertical-align:top">
      <div style="font-size:22pt;font-weight:800;color:#001337;letter-spacing:-.5px">JG MOBILITY</div>
      <div style="font-size:9pt;color:#6b7280;margin-top:3px">Arnhemseweg 10a &nbsp;·&nbsp; 2994LA</div>
      <div style="font-size:9pt;color:#6b7280">info@jgmobility.nl &nbsp;·&nbsp; www.jgmobility.nl</div>
      <div style="font-size:9pt;color:#6b7280">+31 6 21331374</div>
    </td>
    <td style="text-align:right;vertical-align:top">
      <div style="font-size:26pt;font-weight:300;color:#001337;letter-spacing:4px">FACTUUR</div>
      <div style="font-size:10pt;color:#6b7280;margin-top:4px">${f.factuur_nr}</div>
    </td>
  </tr>
</table>

<hr>

<table style="margin-bottom:28px">
  <tr>
    <td style="vertical-align:top;width:50%">
      <div class="lbl">Factuurdatum</div>
      <div style="font-size:11pt;color:#111827;margin-bottom:10px">${f.datum}</div>
      ${f.vervaldatum ? `<div class="lbl">Vervaldatum</div><div style="font-size:11pt;color:#111827;margin-bottom:10px">${f.vervaldatum}</div>` : ""}
      <div class="lbl">Betaalwijze</div>
      <div style="font-size:11pt;color:#111827">${f.betaalwijze === "bank" ? "Bankoverschrijving" : "Contant"}</div>
      ${f.betaalwijze === "bank" ? `<div style="font-size:9pt;color:#6b7280;margin-top:2px">IBAN: (volgt)</div>` : ""}
    </td>
    <td style="vertical-align:top;padding-left:30px;width:50%">
      <div class="lbl">Klant</div>
      <div style="font-size:11pt;color:#111827;font-weight:600">${f.klant_naam || "—"}</div>
      ${klantAdresRegel}
      ${f.klant_email ? `<div style="color:#6b7280;font-size:10pt;margin-top:4px">${f.klant_email}</div>` : ""}
      ${f.klant_telefoon ? `<div style="color:#6b7280;font-size:10pt">${f.klant_telefoon}</div>` : ""}
    </td>
  </tr>
</table>

<div style="background:#f9fafb;border:1px solid #e5e7eb;padding:16px 20px;margin-bottom:24px">
  <div class="lbl" style="margin-bottom:10px">Voertuig</div>
  <table>
    <tr>
      <td style="width:50%;vertical-align:top">
        <table style="font-size:10pt">
          <tr><td style="color:#6b7280;padding:2px 16px 2px 0;width:130px">Merk &amp; Model</td><td style="color:#111827;font-weight:600">${[f.auto_merk, f.auto_model].filter(Boolean).join(" ") || "—"}</td></tr>
          <tr><td style="color:#6b7280;padding:2px 16px 2px 0">Bouwjaar</td><td style="color:#111827">${f.auto_bouwjaar || "—"}</td></tr>
          <tr><td style="color:#6b7280;padding:2px 16px 2px 0">Kleur</td><td style="color:#111827">${f.auto_kleur || "—"}</td></tr>
        </table>
      </td>
      <td style="width:50%;vertical-align:top">
        <table style="font-size:10pt">
          <tr><td style="color:#6b7280;padding:2px 16px 2px 0;width:130px">Kenteken</td><td style="color:#111827;font-weight:600;text-transform:uppercase">${f.auto_kenteken || "—"}</td></tr>
          <tr><td style="color:#6b7280;padding:2px 16px 2px 0">Kilometerstand</td><td style="color:#111827">${f.auto_km ? parseInt(f.auto_km).toLocaleString("nl-NL") + " km" : "—"}</td></tr>
          ${f.auto_vin ? `<tr><td style="color:#6b7280;padding:2px 16px 2px 0">VIN</td><td style="color:#111827;font-size:9pt">${f.auto_vin}</td></tr>` : ""}
        </table>
      </td>
    </tr>
  </table>
</div>

<table style="margin-left:auto;width:320px;margin-bottom:28px">
  <tbody>
    ${prijsRijen}
    <tr style="background:#001337">
      <td style="padding:10px 12px;color:#fff;font-weight:700;font-size:13pt">Totaal</td>
      <td style="text-align:right;color:#fff;font-weight:700;font-size:13pt;padding:10px 12px">€ ${prijs.toLocaleString("nl-NL")}</td>
    </tr>
  </tbody>
</table>

${f.notitie ? `<div style="margin-bottom:24px;padding:12px 16px;background:#f9fafb;border:1px solid #e5e7eb;font-size:10pt;color:#374151;line-height:1.6"><div class="lbl" style="margin-bottom:4px">Opmerking</div>${f.notitie}</div>` : ""}

<table style="margin-top:44px;margin-bottom:32px">
  <tr>
    <td style="width:45%;vertical-align:bottom">
      <div style="border-bottom:1px solid #9ca3af;margin-bottom:4px;height:42px"></div>
      <div style="font-size:9pt;color:#6b7280">Handtekening verkoper</div>
    </td>
    <td style="width:10%"></td>
    <td style="width:45%;vertical-align:bottom">
      <div style="border-bottom:1px solid #9ca3af;margin-bottom:4px;height:42px"></div>
      <div style="font-size:9pt;color:#6b7280">Handtekening koper &amp; datum</div>
    </td>
  </tr>
</table>

<hr>
<div style="font-size:8pt;color:#9ca3af;line-height:1.6;margin-top:10px">
  <strong>JG MOBILITY</strong> &nbsp;·&nbsp; KvK: 42042275 &nbsp;·&nbsp; BTW: NL005450398B70
  ${f.btw_type === "marge" ? "<br>Op dit voertuig is de margeregeling van toepassing. BTW is niet afzonderlijk vermeld (art. 28b t/m 28h Wet OB 1968)." : ""}
</div>

</body>
</html>`;
}

function FacturenContent() {
  const [facturen, setFacturen] = useState<Factuur[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"lijst" | "nieuw">("lijst");
  const [form, setForm] = useState<FactuurForm>(LEEG_FORM);
  const [saving, setSaving] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [fout, setFout] = useState<string | null>(null);
  const [nieuwsteFactuur, setNieuwsteFactuur] = useState<Factuur | null>(null);

  const laad = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/facturen");
    if (res.ok) setFacturen(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { laad(); }, [laad]);

  const sla = async () => {
    setFout(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/facturen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, verkoopprijs: Number(form.verkoopprijs) || 0 }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        setFout(`Opslaan mislukt (${res.status})${txt ? ": " + txt.slice(0, 200) : ""}. Controleer of init-db is uitgevoerd.`);
        return;
      }
      const nieuw: Factuur = await res.json();
      setFacturen((prev) => [nieuw, ...prev]);
      setNieuwsteFactuur(nieuw);
      setView("lijst");
      setForm(LEEG_FORM);
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

  const printFactuur = (f: Factuur) => {
    const html = genereerFactuurHTML(f);
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
    }, 400);
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
          title="Nieuwe factuur"
          subtitle="Vul de gegevens in en genereer de factuur"
          action={
            <button
              onClick={() => { setView("lijst"); setForm(LEEG_FORM); }}
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
              <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(0,19,55,0.06)", backgroundColor: "rgba(0,19,55,0.02)" }}>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={labelStijl}>{titel}</p>
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
            {saving ? "Opslaan..." : "Factuur aanmaken & afdrukken"}
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
                          <div className="flex gap-2">
                            <button
                              onClick={() => printFactuur(f)}
                              className="px-4 py-2 text-xs font-semibold transition-all hover:opacity-80"
                              style={{ backgroundColor: "#001337", color: "#ffffff", fontFamily: "var(--font-inter)" }}
                            >
                              Afdrukken / PDF
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
