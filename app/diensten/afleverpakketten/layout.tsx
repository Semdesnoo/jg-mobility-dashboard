import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afleverpakketten",
  description:
    "Neem uw nieuwe auto in topconditie in ontvangst met een afleverpakket van JG Mobility in Barendrecht. Inclusief keuring, garantie en perfecte presentatie.",
  alternates: {
    canonical: "https://www.jgmobility.nl/diensten/afleverpakketten",
  },
  openGraph: {
    title: "Afleverpakketten | JG Mobility Barendrecht",
    description:
      "Afleverpakketten met keuring en garantie bij JG Mobility in Barendrecht. Uw auto perfect klaargemaakt voor aflevering.",
    url: "https://www.jgmobility.nl/diensten/afleverpakketten",
  },
};

export default function AfleverpakkettenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
