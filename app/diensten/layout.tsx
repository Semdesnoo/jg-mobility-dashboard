import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Ontdek alle diensten van JG Mobility in Barendrecht: auto inkoop & taxatie, consignatie, financiering en afleverpakketten. Persoonlijk advies voor de beste deal.",
  alternates: {
    canonical: "https://www.jgmobility.nl/diensten",
  },
  openGraph: {
    title: "Diensten | JG Mobility Barendrecht",
    description:
      "Auto inkoop, taxatie, consignatie, financiering en afleverpakketten bij JG Mobility in Barendrecht.",
    url: "https://www.jgmobility.nl/diensten",
  },
};

export default function DienstenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
