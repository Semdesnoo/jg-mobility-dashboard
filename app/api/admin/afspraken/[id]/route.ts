import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const fields = ["datum", "tijd", "type", "klant_naam", "klant_telefoon", "klant_email", "auto_naam", "notitie", "status"];
  for (const f of fields) {
    if (body[f] !== undefined) {
      await sql`UPDATE afspraken SET ${sql(f)} = ${body[f]} WHERE id = ${id}`;
    }
  }
  const row = await sql`SELECT * FROM afspraken WHERE id = ${id}`;
  return Response.json(row[0] ?? null);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sql`DELETE FROM afspraken WHERE id = ${id}`;
  return Response.json({ ok: true });
}
