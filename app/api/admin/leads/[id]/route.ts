import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const fields = ["naam", "telefoon", "email", "bron", "interesse", "budget", "notitie", "status"];
  for (const f of fields) {
    if (body[f] !== undefined) {
      await sql`UPDATE leads SET ${sql(f)} = ${body[f]} WHERE id = ${id}`;
    }
  }
  const row = await sql`SELECT * FROM leads WHERE id = ${id}`;
  return Response.json(row[0] ?? null);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sql`DELETE FROM leads WHERE id = ${id}`;
  return Response.json({ ok: true });
}
