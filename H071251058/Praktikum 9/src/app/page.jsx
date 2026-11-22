// =============================================================================
// HALAMAN BERANDA - URL "/" (Server Component)
// =============================================================================
// Halaman ini adalah Server Component yang langsung menjalankan query Raw SQL
// ke PostgreSQL untuk menghitung ringkasan statistik koleksi buku.
// =============================================================================

import Link from "next/link";
import Hero from "@/components/Hero";
import pool from "@/lib/db";

export default async function HomePage() {
  // 1. Eksekusi query COUNT langsung ke PostgreSQL via pool.query()
  const resTotal = await pool.query("SELECT COUNT(*) AS total FROM buku;");
  const resTersedia = await pool.query(
    "SELECT COUNT(*) AS total FROM buku WHERE tersedia = true;"
  );
  const resDipinjam = await pool.query(
    "SELECT COUNT(*) AS total FROM buku WHERE tersedia = false;"
  );

  // Konversi hasil COUNT menjadi integer
  const totalBuku = parseInt(resTotal.rows[0]?.total || 0, 10);
  const bukuTersedia = parseInt(resTersedia.rows[0]?.total || 0, 10);
  const bukuDipinjam = parseInt(resDipinjam.rows[0]?.total || 0, 10);

  return (
    <div>
      {/* Banner Hero Minimalis */}
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas di dekat kampus yang menghadirkan suasana tenang untuk membaca, belajar, dan berdiskusi."
      />

      {/* Bagian Statistik Koleksi (Dihitung Dinamis dari PostgreSQL) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              Statistik Koleksi
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Data statistik dihitung secara real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Kartu 1: Total Koleksi */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Koleksi Buku
              </p>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-2">
                {totalBuku} <span className="text-sm font-normal text-slate-500">Judul</span>
              </p>
            </div>

            {/* Kartu 2: Buku Tersedia */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Buku Tersedia
              </p>
              <p className="text-2xl sm:text-3xl font-semibold text-emerald-700 mt-2">
                {bukuTersedia} <span className="text-sm font-normal text-slate-500">Judul</span>
              </p>
            </div>

            {/* Kartu 3: Buku Dipinjam */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Buku Sedang Dipinjam
              </p>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-700 mt-2">
                {bukuDipinjam} <span className="text-sm font-normal text-slate-500">Judul</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Pintasan Menu Cepat */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pintasan ke Katalog */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mt-3 mb-2">
                  Daftar Koleksi Buku
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Jelajahi seluruh koleksi buku yang tersimpan di PostgreSQL, saring
                  berdasarkan kategori, edit, atau tambahkan buku baru.
                </p>
              </div>
              <Link
                href="/katalog"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-block"
              >
                Buka Katalog Buku
              </Link>
            </div>

            {/* Pintasan ke Usulan Buku */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mt-3 mb-2">
                  Usulkan Judul Baru
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Punya rekomendasi buku menarik untuk ruang baca kami? Sampaikan
                  usulan Anda melalui formulir interaktif.
                </p>
              </div>
              <Link
                href="/usulan"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-block"
              >
                Buka Form Usulan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
