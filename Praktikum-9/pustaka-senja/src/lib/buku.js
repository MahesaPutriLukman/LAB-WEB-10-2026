import "server-only";
import { pool } from "@/lib/db";

// ID dari URL/form hanya diterima bila berupa bilangan bulat positif yang muat di INTEGER.
export function idValid(id) {
  return /^\d{1,9}$/.test(String(id)) && Number(id) > 0;
}

export async function semuaBuku() {
  const { rows } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku ORDER BY id ASC"
  );
  return rows;
}

export async function bukuById(id) {
  if (!idValid(id)) return null;
  const { rows } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
    [Number(id)]
  );
  return rows[0] ?? null;
}

export async function hitungStatistik() {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
            COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  return rows[0];
}
