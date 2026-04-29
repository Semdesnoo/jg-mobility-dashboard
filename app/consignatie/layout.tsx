import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Consignatie",
  description:
    "Verkoop uw auto via consignatie bij JG Mobility. Actief in Barendrecht, Rotterdam, Ridderkerk, Dordrecht en heel Zuid-Holland. Hogere verkoopprijs, geen gedoe — wij regelen alles.",
  keywords: [
    "auto consignatie Barendrecht",
    "auto consignatie Rotterdam",
    "auto consignatie Ridderkerk",
    "auto consignatie Dordrecht",
    "auto consignatie Zuid-Holland",
    "auto verkopen via consignatie",
    "auto in consignatie geven",
  ],
  alternates: { canonical: "https://www.jgmobility.nl/consignatie" },
  openGraph: {
    title: "Auto Consignatie | JG Mobility",
    description:
      "Verkoop uw auto via consignatie bij JG Mobility. Rotterdam, Barendrecht, Ridderkerk en omgeving. Hogere verkoopprijs, wij regelen alles.",
    url: "https://www.jgmobility.nl/consignatie",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jgmobility.nl" },
    { "@type": "ListItem", position: 2, name: "Consignatie", item: "https://www.jgmobility.nl/consignatie" },
  ],
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Auto Consignatie",
  description:
    "Verkoop uw auto via consignatie bij JG Mobility. Wij presenteren, onderhandelen en verkopen uw auto voor de beste prijs.",
  provider: { "@type": "AutoDealer", name: "JG Mobility", url: "https://www.jgmobility.nl" },
  areaServed: ["Barendrecht", "Rotterdam", "Ridderkerk", "Dordrecht", "Hendrik-Ido-Ambacht", "Spijkenisse", "Capelle aan den IJssel", "Zwijndrecht", "Zuid-Holland"],
  serviceType: "Auto Consignatie",
};

export default function ConsignatieLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      {children}
    </>
  );
}
