import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Consignatie Barendrecht",
  description:
    "Verkoop uw auto via consignatie bij JG Mobility in Barendrecht. Wij regelen alles — hogere verkoopprijs, geen bezichtigingen, geen gedoe. Gratis en vrijblijvend advies.",
  alternates: {
    canonical: "https://www.jgmobility.nl/consignatie",
  },
  openGraph: {
    title: "Auto Consignatie Barendrecht | JG Mobility",
    description:
      "Verkoop uw auto via consignatie bij JG Mobility. Hogere verkoopprijs, wij regelen alles. Gratis advies in Barendrecht.",
    url: "https://www.jgmobility.nl/consignatie",
  },
};

export default function ConsignatieLayout({ children }: { children: React.ReactNode }) {
  return children;
}
