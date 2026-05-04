import { notFound } from "next/navigation";
import { getAutos, getAutoBySlug } from "@/lib/autos-db";
import AutoDetailClient from "./AutoDetailClient";

export const dynamic = "force-dynamic";

export default function AutoDetailPage({ params }: { params: { id: string } }) {
  const auto = getAutoBySlug(params.id);
  if (!auto) notFound();

  const autos = getAutos();
  const idx = autos.findIndex((a) => a.slug === params.id);
  const vorigeAuto = autos[idx + 1];
  const volgendeAuto = autos[idx - 1];

  return (
    <AutoDetailClient
      auto={auto}
      vorigeAuto={vorigeAuto}
      volgendeAuto={volgendeAuto}
    />
  );
}
