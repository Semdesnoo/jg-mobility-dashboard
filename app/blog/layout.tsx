import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lees handige artikelen over auto consignatie, auto verkopen, occasions kopen, taxatie en financiering. Geschreven door JG Mobility, uw specialist in Barendrecht.",
  alternates: {
    canonical: "https://www.jgmobility.nl/blog",
  },
  openGraph: {
    title: "Blog | JG Mobility Barendrecht",
    description:
      "Handige tips en informatie over auto kopen, verkopen, consignatie, taxatie en financiering — van JG Mobility in Barendrecht.",
    url: "https://www.jgmobility.nl/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
