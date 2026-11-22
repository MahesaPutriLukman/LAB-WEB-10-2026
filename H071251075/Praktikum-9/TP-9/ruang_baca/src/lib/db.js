import { Pool } from "pg";

const pool =
  globalThis.pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

export default pool;
