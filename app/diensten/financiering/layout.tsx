import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Financiering",
  description:
    "Financier uw droomauto via JG Mobility. Lage rente, flexibele looptijden en persoonlijk advies. Actief in Barendrecht, Rotterdam, Ridderkerk, Dordrecht en heel Zuid-Holland.",
  keywords: [
    "auto financiering Barendrecht",
    "auto financiering Rotterdam",
    "auto lening Rotterdam",
    "auto op afbetaling Barendrecht",
    "autofinanciering Zuid-Holland",
    "occasions financieren",
  ],
  alternates: { canonical: "https://www.jgmobility.nl/diensten/financiering" },
  openGraph: {
    title: "Auto Financiering | JG Mobility",
    description:
      "Flexibele autofinanciering met lage rente. Actief in Rotterdam, Barendrecht en omgeving. Persoonlijk advies en snel geregeld.",
    url: "https://www.jgmobility.nl/diensten/financiering",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jgmobility.nl" },
    { "@type": "ListItem", position: 2, name: "Diensten", item: "https://www.jgmobility.nl/diensten" },
    { "@type": "ListItem", position: 3, name: "Financiering", item: "https://www.jgmobility.nl/diensten/financiering" },
  ],
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Auto Financiering",
  description:
    "Persoonlijke autofinanciering met lage rente en flexibele looptijden bij JG Mobility. Rij weg in uw droomauto zonder grote eenmalige uitgave.",
  provider: { "@type": "AutoDealer", name: "JG Mobility", url: "https://www.jgmobility.nl" },
  areaServed: ["Barendrecht", "Rotterdam", "Ridderkerk", "Dordrecht", "Hendrik-Ido-Ambacht", "Spijkenisse", "Capelle aan den IJssel", "Zwijndrecht", "Zuid-Holland"],
  serviceType: "Auto Financiering",
};

export default function FinancieringLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      {children}
    </>
  );
}
