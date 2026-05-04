import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM cosignaties ORDER BY datum DESC, tijd DESC`;
    return Response.json(rows);
  } catch {
    return Response.json([], { status: 200 });
  }
}
