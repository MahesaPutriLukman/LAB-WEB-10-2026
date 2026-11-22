// =============================================================================
// HALAMAN DETAIL BUKU DINAMIS - URL "/katalog/[id]" (Server Component)
// =============================================================================
// Halaman ini mengambil data satu buku dari PostgreSQL berdasarkan parameter [id]
// menggunakan raw query: SELECT * FROM buku WHERE id = $1;
//
// Fitur:
// 1. Membaca parameter id dari props params (const { id } = await params;).
// 2. Parameterized Query ($1) untuk mencegah SQL Injection.
// 3. Penanganan buku tidak ditemukan jika ID tidak ada di tabel.
// 4. Menyediakan tombol Edit (/katalog/[id]/edit) dan Tombol Hapus dengan konfirmasi.
// =============================================================================

import Link from "next/link";
import pool from "@/lib/db";
import TombolHapus from "@/components/TombolHapus";

// Metadata dinamis berdasarkan judul buku dari database
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await pool.query("SELECT judul FROM buku WHERE id = $1;", [id]);
    const buku = res.rows[0];
    if (buku) {
      return {
        title: `${buku.judul} - Pustaka Senja`,
      };
    }
  } catch {
    // Abaikan jika error / ID tidak valid
  }

  return {
    title: "Detail Buku - Pustaka Senja",
  };
}

export default async function DetailBukuPage({ params }) {
  // 1. Ambil nilai id dari parameter rute dinamis Next.js
  const { id } = await params;

  // 2. Eksekusi query SELECT dengan parameterized query ($1)
  let buku = null;
  try {
    const res = await pool.query("SELECT * FROM buku WHERE id = $1;", [id]);
    buku = res.rows[0] || null;
  } catch (error) {
    console.error("Gagal mengambil data buku:", error.message);
  }

  // 3. KONDISI JIKA BUKU TIDAK DITEMUKAN
  if (!buku) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Buku Tidak Ditemukan
          </h1>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Data buku dengan nomor ID &ldquo;{id}&rdquo; tidak tercatat di
            dalam database PostgreSQL Pustaka Senja.
          </p>
          <Link
            href="/katalog"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // 4. KONDISI JIKA BUKU DITEMUKAN
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigasi Kembali */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/katalog"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Kembali ke Katalog
          </Link>

          {/* Tombol Aksi Cepat: Edit dan Hapus */}
          <div className="flex items-center gap-2">
            <Link
              href={`/katalog/${buku.id}/edit`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Edit Buku</span>
            </Link>
            <TombolHapus id={buku.id} judulBuku={buku.judul} />
          </div>
        </div>

        {/* Kartu Informasi Lengkap Buku */}
        <article className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Header Kartu */}
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                {buku.kategori}
              </span>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded border ${
                  buku.tersedia
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {buku.tersedia ? "Tersedia di Ruang Baca" : "Sedang Dipinjam"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2 leading-tight">
              {buku.judul}
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Penulis: <span className="font-medium text-slate-800">{buku.penulis}</span>
            </p>
          </div>

          {/* Spesifikasi Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  ID Database
                </p>
                <p className="text-sm font-medium text-slate-800">{buku.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Tahun Terbit
                </p>
                <p className="text-sm font-medium text-slate-800">{buku.tahun}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Kategori
                </p>
                <p className="text-sm font-medium text-slate-800">{buku.kategori}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Status
                </p>
                <p
                  className={`text-sm font-medium ${
                    buku.tersedia ? "text-emerald-700" : "text-slate-600"
                  }`}
                >
                  {buku.tersedia ? "Tersedia" : "Dipinjam"}
                </p>
              </div>
            </div>

            {/* Sinopsis Lengkap */}
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-2">
                Sinopsis Buku
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-5 rounded-lg border border-slate-200">
                {buku.sinopsis}
              </p>
            </div>

            {/* Tombol Navigasi Bawah */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/katalog"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                Kembali ke Katalog
              </Link>

              <Link
                href={`/katalog/${buku.id}/edit`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
              >
                <span>Ubah Data Buku</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
