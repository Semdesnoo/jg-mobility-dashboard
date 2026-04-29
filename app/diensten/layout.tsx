import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Ontdek alle diensten van JG Mobility: auto inkoop & taxatie, consignatie, financiering en afleverpakketten. Actief in Barendrecht, Rotterdam, Ridderkerk, Dordrecht en heel Zuid-Holland.",
  keywords: [
    "autobedrijf diensten Barendrecht",
    "autobedrijf Rotterdam",
    "auto inkoop Rotterdam",
    "auto consignatie Rotterdam",
    "auto taxatie Zuid-Holland",
  ],
  alternates: { canonical: "https://www.jgmobility.nl/diensten" },
  openGraph: {
    title: "Diensten | JG Mobility",
    description:
      "Auto inkoop, taxatie, consignatie, financiering en afleverpakketten bij JG Mobility. Actief in Rotterdam en omgeving.",
    url: "https://www.jgmobility.nl/diensten",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jgmobility.nl" },
    { "@type": "ListItem", position: 2, name: "Diensten", item: "https://www.jgmobility.nl/diensten" },
  ],
};

export default function DienstenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}
