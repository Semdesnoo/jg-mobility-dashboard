import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ons Verhaal",
  description:
    "Leer JG Mobility kennen. Wij zijn een jong en gedreven autobedrijf in Barendrecht met een passie voor premium auto's en eerlijke service. Persoonlijk contact staat bij ons voorop.",
  alternates: {
    canonical: "https://www.jgmobility.nl/over-ons",
  },
  openGraph: {
    title: "Ons Verhaal | JG Mobility Barendrecht",
    description:
      "Jong, gedreven en gepassioneerd. Leer het team van JG Mobility kennen en ontdek waarom klanten ons 4,9 sterren geven.",
    url: "https://www.jgmobility.nl/over-ons",
  },
};

export default function OverOnsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
