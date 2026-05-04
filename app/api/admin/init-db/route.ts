import { initDB } from "@/lib/db";
import sql from "@/lib/db";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await initDB();

    // Importeer bestaande autos.json data als de tabel leeg is
    const existing = await sql`SELECT COUNT(*) as count FROM autos`;
    const count = Number(existing[0].count);

    let imported = 0;

    if (count === 0) {
      const jsonPath = path.join(process.cwd(), "data", "autos.json");
      if (fs.existsSync(jsonPath)) {
        const autos = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        for (const auto of autos) {
          await sql`
            INSERT INTO autos (id, slug, data)
            VALUES (${auto.id}, ${auto.slug}, ${JSON.stringify(auto)})
            ON CONFLICT (id) DO NOTHING
          `;
          imported++;
        }
      }
    }

    return Response.json({
      ok: true,
      message: `Database klaar. ${count > 0 ? `${count} auto's al aanwezig.` : `${imported} auto's geïmporteerd.`}`,
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
