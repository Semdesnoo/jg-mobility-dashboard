import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Inkoop & Taxatie Barendrecht",
  description:
    "Wij kopen uw auto direct in voor de beste marktprijs. Gratis en eerlijke taxatie bij JG Mobility in Barendrecht. Snel, transparant en zonder verborgen kosten.",
  alternates: {
    canonical: "https://www.jgmobility.nl/diensten/inkoop-taxatie",
  },
  openGraph: {
    title: "Auto Inkoop & Taxatie Barendrecht | JG Mobility",
    description:
      "Gratis taxatie en directe inkoop van uw auto bij JG Mobility in Barendrecht. Eerlijke prijs, snel geregeld.",
    url: "https://www.jgmobility.nl/diensten/inkoop-taxatie",
  },
};

export default function InkoopTaxatieLayout({ children }: { children: React.ReactNode }) {
  return children;
}
