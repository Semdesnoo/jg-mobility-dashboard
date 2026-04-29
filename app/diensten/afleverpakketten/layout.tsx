import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afleverpakketten",
  description:
    "Neem uw nieuwe auto in topconditie in ontvangst met een afleverpakket van JG Mobility. Keuring, garantie en perfecte presentatie. Actief in Barendrecht, Rotterdam en heel Zuid-Holland.",
  keywords: [
    "auto afleverpakket Barendrecht",
    "auto garantie Rotterdam",
    "auto keuring Rotterdam",
    "auto aflevering Zuid-Holland",
    "occasion garantie",
  ],
  alternates: { canonical: "https://www.jgmobility.nl/diensten/afleverpakketten" },
  openGraph: {
    title: "Afleverpakketten | JG Mobility",
    description:
      "Afleverpakketten met keuring en garantie bij JG Mobility. Actief in Rotterdam, Barendrecht en omgeving.",
    url: "https://www.jgmobility.nl/diensten/afleverpakketten",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.jgmobility.nl" },
    { "@type": "ListItem", position: 2, name: "Diensten", item: "https://www.jgmobility.nl/diensten" },
    { "@type": "ListItem", position: 3, name: "Afleverpakketten", item: "https://www.jgmobility.nl/diensten/afleverpakketten" },
  ],
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Auto Afleverpakketten",
  description:
    "Professionele afleverpakketten inclusief APK-keuring, garantie en perfecte presentatie van uw nieuwe auto bij JG Mobility.",
  provider: { "@type": "AutoDealer", name: "JG Mobility", url: "https://www.jgmobility.nl" },
  areaServed: ["Barendrecht", "Rotterdam", "Ridderkerk", "Dordrecht", "Hendrik-Ido-Ambacht", "Spijkenisse", "Capelle aan den IJssel", "Zwijndrecht", "Zuid-Holland"],
  serviceType: "Auto Afleverpakketten",
};

export default function AfleverpakkettenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      {children}
    </>
  );
}
