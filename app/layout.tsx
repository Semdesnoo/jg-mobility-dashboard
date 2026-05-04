import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.jgmobility.nl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/JG Mobility Transparant.png",
    shortcut: "/JG Mobility Transparant.png",
    apple: "/JG Mobility Transparant.png",
  },
  title: {
    default: "JG Mobility | Autobedrijf Barendrecht — Inkoop, Verkoop & Consignatie",
    template: "%s | JG Mobility",
  },
  description:
    "JG Mobility in Barendrecht is uw specialist voor auto inkoop, verkoop en consignatie. Premium occasions, eerlijke taxatie en persoonlijk advies. Beoordeeld met 4,9 sterren.",
  keywords: [
    "auto inkoop Barendrecht",
    "auto verkoop Barendrecht",
    "auto inkoop Rotterdam",
    "auto verkopen Rotterdam",
    "auto consignatie Rotterdam",
    "auto consignatie Barendrecht",
    "auto taxatie Barendrecht",
    "auto taxatie Rotterdam",
    "occasions Barendrecht",
    "occasions Rotterdam",
    "autobedrijf Barendrecht",
    "autobedrijf Rotterdam",
    "auto inkoop Ridderkerk",
    "auto inkoop Dordrecht",
    "auto verkopen Ridderkerk",
    "auto verkopen Dordrecht",
    "auto inkoop Spijkenisse",
    "auto inkoop Capelle aan den IJssel",
    "auto inkoop Zwijndrecht",
    "auto inkoop Hendrik-Ido-Ambacht",
    "auto financiering Zuid-Holland",
    "premium occasions Zuid-Holland",
    "JG Mobility",
  ],
  authors: [{ name: "JG Mobility" }],
  creator: "JG Mobility",
  publisher: "JG Mobility",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: siteUrl,
    siteName: "JG Mobility",
    title: "JG Mobility | Autobedrijf Barendrecht — Inkoop, Verkoop & Consignatie",
    description:
      "JG Mobility in Barendrecht is uw specialist voor auto inkoop, verkoop en consignatie. Premium occasions, eerlijke taxatie en persoonlijk advies.",
    images: [
      {
        url: "/JG Mobility Transparant.png",
        width: 1200,
        height: 630,
        alt: "JG Mobility — Autobedrijf Barendrecht",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JG Mobility | Autobedrijf Barendrecht",
    description:
      "Specialist in auto inkoop, verkoop en consignatie in Barendrecht. Beoordeeld met 4,9 sterren.",
    images: ["/JG Mobility Transparant.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  name: "JG Mobility",
  description:
    "Specialist in auto consignatie, inkoop, taxatie en verkoop van premium occasions in Barendrecht.",
  url: siteUrl,
  telephone: "+31621331374",
  email: "info@jgmobility.nl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barendrecht",
    addressRegion: "Zuid-Holland",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.8553,
    longitude: 4.5328,
  },
  areaServed: ["Barendrecht", "Rotterdam", "Ridderkerk", "Hendrik-Ido-Ambacht", "Dordrecht"],
  priceRange: "€€",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/jgmobility/",
    "https://www.facebook.com/profile.php?id=61588831825340",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="nl" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {!isAdmin && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        {!isAdmin && <ScrollToTop />}
        {!isAdmin && <Header />}
        <main className={isAdmin ? "flex-1" : "flex-1"}>{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <ChatWidget />}
      </body>
    </html>
  );
}
