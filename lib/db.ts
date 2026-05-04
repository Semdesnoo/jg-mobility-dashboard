import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default sql;

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS autos (
      id INTEGER PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      data JSONB NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS bellog (
      id TEXT PRIMARY KEY,
      datum TEXT NOT NULL,
      tijd TEXT NOT NULL,
      nummer TEXT DEFAULT '',
      naam TEXT DEFAULT '',
      notitie TEXT DEFAULT '',
      terugbellen BOOLEAN DEFAULT false,
      afgehandeld BOOLEAN DEFAULT false
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;
}
