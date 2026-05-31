import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op de meest gestelde vragen over auto consignatie, inkoop, taxatie en financiering bij JG Mobility in Barendrecht. Alles wat je wilt weten, op één plek.",
  alternates: {
    canonical: "https://www.jgmobility.nl/faq",
  },
  openGraph: {
    title: "Veelgestelde vragen | JG Mobility Barendrecht",
    description:
      "Alles wat je wilt weten over auto consignatie, inkoop, taxatie en financiering bij JG Mobility in Barendrecht.",
    url: "https://www.jgmobility.nl/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
