// =============================================================================
// HALAMAN KATALOG BUKU - URL "/katalog" (Server Component)
// =============================================================================
// Halaman ini adalah Server Component yang membaca data buku langsung dari PostgreSQL.
//
// Fitur:
// 1. READ: Mengambil daftar buku menggunakan raw query SQL (SELECT * FROM buku).
// 2. FILTER KATEGORI: Membaca parameter URL searchParams (?kategori=...).
//    Jika kategori dipilih, query SQL menggunakan Parameterized Query ($1).
// 3. CREATE: Menyediakan formulir tambah buku terintegrasi yang mengirim data
//    ke Server Action "tambahBuku" (INSERT INTO buku).
// =============================================================================

import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import pool from "@/lib/db";
import { tambahBuku } from "@/app/actions";

export default async function KatalogPage({ searchParams }) {
  // 1. Membaca parameter kategori dari URL query string (misal: /katalog?kategori=Teknologi)
  const resolvedParams = await searchParams;
  const kategoriAktif = resolvedParams?.kategori || "Semua";

  // 2. Menjalankan Query SQL Raw ke PostgreSQL dengan Parameterized Query
  let querySQL;
  let parameterQuery = [];

  if (kategoriAktif !== "Semua") {
    // Jika ada filter kategori, gunakan WHERE kategori = $1
    querySQL = "SELECT * FROM buku WHERE kategori = $1 ORDER BY id ASC;";
    parameterQuery = [kategoriAktif];
  } else {
    // Jika "Semua", ambil seluruh buku
    querySQL = "SELECT * FROM buku ORDER BY id ASC;";
  }

  const resBuku = await pool.query(querySQL, parameterQuery);
  const daftarBuku = resBuku.rows;

  // Query untuk menghitung total seluruh buku di database
  const resTotal = await pool.query("SELECT COUNT(*) AS total FROM buku;");
  const totalBukuSemua = parseInt(resTotal.rows[0]?.total || 0, 10);

  // Daftar opsi kategori untuk tombol filter
  const opsiKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Halaman & Tombol Tambah */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-2 mb-2">
              Koleksi Buku Pustaka Senja
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Daftar koleksi buku yang tersimpan. Anda dapat
              menyaring buku, melihat detail, mengubah, maupun menambahkan buku baru.
            </p>
          </div>

          <div>
            <Link
              href="/katalog/tambah"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-xs"
            >
              <span>Tambah Buku Baru</span>
            </Link>
          </div>
        </div>

        {/* Filter Kategori Menggunakan Navigasi URL */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 mr-2">
              Filter Kategori:
            </span>

            {opsiKategori.map((kat) => {
              const isAktif = kategoriAktif === kat;
              const hrefUrl = kat === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(kat)}`;

              return (
                <Link
                  key={kat}
                  href={hrefUrl}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isAktif
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {kat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Daftar Buku */}
        {daftarBuku.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {daftarBuku.map((buku) => (
              <BukuCard key={buku.id} buku={buku} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">
              Tidak ada buku yang ditemukan untuk kategori &ldquo;{kategoriAktif}&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
