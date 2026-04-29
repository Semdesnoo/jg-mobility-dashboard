import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Inkoop & Taxatie",
  description:
    "Wij kopen uw auto direct in voor de beste marktprijs. Gratis taxatie bij JG Mobility, actief in Barendrecht, Rotterdam, Ridderkerk, Dordrecht en heel Zuid-Holland. Snel en transparant.",
  keywords: [
    "auto inkoop Barendrecht",
    "auto inkoop Rotterdam",
    "auto inkoop Ridderkerk",
    "auto inkoop Dordrecht",
    "auto taxatie Barendrecht",
    "auto taxatie Rotterdam",
    "auto verkopen Rotterdam",
    "auto verkopen Zuid-Holland",
    "gratis autotaxatie",
  ],
  alternates: { canonical: "https://www.jgmobility.nl/diensten/inkoop-taxatie" },
  openGraph: {
    title: "Auto Inkoop & Taxatie | JG Mobility",
    description:
      "Gratis taxatie en directe inkoop van uw auto. Actief in Rotterdam, Barendrecht, Ridderkerk en omgeving. Eerlijke prijs, snel geregeld.",
    url: "https://www.jgmobility.nl/diensten/inkoop-taxatie",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jgmobility.nl" },
    { "@type": "ListItem", position: 2, name: "Diensten", item: "https://www.jgmobility.nl/diensten" },
    { "@type": "ListItem", position: 3, name: "Inkoop & Taxatie", item: "https://www.jgmobility.nl/diensten/inkoop-taxatie" },
  ],
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Auto Inkoop & Taxatie",
  description:
    "Gratis en eerlijke taxatie van uw auto, gevolgd door directe inkoop tegen de beste marktprijs. Geen gedoe, snel geregeld.",
  provider: { "@type": "AutoDealer", name: "JG Mobility", url: "https://www.jgmobility.nl" },
  areaServed: ["Barendrecht", "Rotterdam", "Ridderkerk", "Dordrecht", "Hendrik-Ido-Ambacht", "Spijkenisse", "Capelle aan den IJssel", "Zwijndrecht", "Zuid-Holland"],
  serviceType: "Auto Inkoop en Taxatie",
};

export default function InkoopTaxatieLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      {children}
    </>
  );
}
