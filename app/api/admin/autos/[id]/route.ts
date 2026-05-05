import { NextRequest } from "next/server";
import { getAutoById, saveAuto } from "@/lib/autos-db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const auto = await getAutoById(Number(id));
  if (!auto) return Response.json({ error: "Auto niet gevonden" }, { status: 404 });

  if (body.status === "verkocht") {
    auto.verkocht = true;
    auto.gereserveerd = false;
  } else if (body.status === "gereserveerd") {
    auto.verkocht = false;
    auto.gereserveerd = true;
  } else {
    auto.verkocht = false;
    auto.gereserveerd = false;
  }

  await saveAuto(auto);
  return Response.json({ ok: true });
}
