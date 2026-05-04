import { notFound } from "next/navigation";
import { getAutos, getAutoBySlug } from "@/lib/autos-db";
import AutoDetailClient from "./AutoDetailClient";

export const dynamic = "force-dynamic";

export default async function AutoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auto = await getAutoBySlug(id);
  if (!auto) notFound();

  const autos = await getAutos();
  const idx = autos.findIndex((a) => a.slug === id);
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
