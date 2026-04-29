import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact",
  description:
    "Neem contact op met JG Mobility in Barendrecht. Bel, mail of kom langs voor inkoop, verkoop, consignatie of een vrijblijvend gesprek. Wij reageren snel.",
  alternates: {
    canonical: "https://www.jgmobility.nl/contact",
  },
  openGraph: {
    title: "Contact | JG Mobility Barendrecht",
    description:
      "Contact opnemen met JG Mobility in Barendrecht. Bereikbaar voor inkoop, consignatie en vragen.",
    url: "https://www.jgmobility.nl/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
