import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const fields = ["datum", "merk", "model", "bouwjaar", "km", "kenteken", "kleur", "vin",
    "aanbod_prijs", "bod_prijs", "aankoopprijs", "naam", "telefoon", "email", "status", "notitie"];
  for (const f of fields) {
    if (body[f] !== undefined) {
      await sql`UPDATE inkoop_dossiers SET ${sql(f)} = ${body[f]} WHERE id = ${id}`;
    }
  }
  const row = await sql`SELECT * FROM inkoop_dossiers WHERE id = ${id}`;
  return Response.json(row[0] ?? null);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sql`DELETE FROM inkoop_dossiers WHERE id = ${id}`;
  return Response.json({ ok: true });
}
