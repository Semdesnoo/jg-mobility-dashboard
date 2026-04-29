import { Suspense } from "react";
import AanbodClient from "./AanbodClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Occasions Barendrecht",
  description:
    "Bekijk ons actuele aanbod van premium occasions bij JG Mobility in Barendrecht. Alle auto's zijn zorgvuldig geselecteerd, gekeurd en klaar voor aflevering.",
  alternates: {
    canonical: "https://www.jgmobility.nl/aanbod",
  },
  openGraph: {
    title: "Occasions Barendrecht | JG Mobility",
    description:
      "Premium occasions bij JG Mobility in Barendrecht. Zorgvuldig geselecteerd en gekeurd.",
    url: "https://www.jgmobility.nl/aanbod",
  },
};

export default function AanbodPage() {
  return (
    <Suspense>
      <AanbodClient />
    </Suspense>
  );
}
