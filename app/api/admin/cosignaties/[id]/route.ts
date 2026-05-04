import { NextRequest } from "next/server";
import sql from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { status, notitie } = body;

  await sql`
    UPDATE cosignaties SET
      status = COALESCE(${status ?? null}, status),
      notitie = COALESCE(${notitie ?? null}, notitie)
    WHERE id = ${id}
  `;
  return Response.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sql`DELETE FROM cosignaties WHERE id = ${id}`;
  return Response.json({ ok: true });
}
