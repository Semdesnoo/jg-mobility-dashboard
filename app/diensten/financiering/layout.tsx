import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Financiering Barendrecht",
  description:
    "Financier uw droomauto via JG Mobility in Barendrecht. Lage rente, flexibele looptijden en persoonlijk advies. Rij weg in uw nieuwe auto zonder grote eenmalige uitgave.",
  alternates: {
    canonical: "https://www.jgmobility.nl/diensten/financiering",
  },
  openGraph: {
    title: "Auto Financiering Barendrecht | JG Mobility",
    description:
      "Flexibele autofinanciering met lage rente bij JG Mobility in Barendrecht. Persoonlijk advies en snel geregeld.",
    url: "https://www.jgmobility.nl/diensten/financiering",
  },
};

export default function FinancieringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
