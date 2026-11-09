// =============================================================================
// HALAMAN DETAIL BUKU DINAMIS - URL "/katalog/[id]" (Server Component)
// =============================================================================
// Halaman ini menggunakan fitur "Dynamic Routing" ([id]) pada Next.js App Router.
// Berkas ini adalah Server Component (tidak memakai "use client") sesuai aturan tugas.
//
// Langkah kerja:
// 1. Membaca parameter 'id' dari props params (const { id } = await params;).
// 2. Mencari buku yang id-nya sesuai di dataBuku menggunakan method .find().
// 3. Jika ditemukan: tampilkan informasi lengkap dan sinopsis buku.
// 4. Jika tidak ditemukan: tampilkan pemberitahuan buku tidak ditemukan.
// =============================================================================

import Link from "next/link";
import dataBuku from "@/data/dataBuku";

// Mengatur judul tab browser secara dinamis
export async function generateMetadata({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return {
      title: "Buku Tidak Ditemukan - Pustaka Senja",
    };
  }

  return {
    title: `${buku.judul} - Pustaka Senja`,
  };
}

export default async function DetailBukuPage({ params }) {
  // 1. Ambil nilai 'id' dari URL (Next.js 15+ params bersifat asynchronous)
  const { id } = await params;

  // 2. Cari buku di dalam dataBuku berdasarkan id
  const buku = dataBuku.find((item) => item.id === id);

  // 3. KONDISI JIKA BUKU TIDAK DITEMUKAN (misal URL: /katalog/99)
  if (!buku) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Buku Tidak Ditemukan
          </h1>
          <p className="text-slate-600 text-sm mb-6">
            Maaf, buku dengan nomor ID &ldquo;{id}&rdquo; tidak ada di dalam
            koleksi Pustaka Senja.
          </p>

          {/* Tombol kembali ke katalog */}
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            &larr; Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // 4. KONDISI JIKA BUKU BERHASIL DITEMUKAN
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Navigasi Kembali ke Katalog */}
        <div className="mb-6">
          <Link
            href="/katalog"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
          >
            &larr; Kembali ke Katalog
          </Link>
        </div>

        {/* Kartu Informasi Lengkap Buku */}
        <article className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Bagian Atas: Kategori, Status, Judul, dan Penulis */}
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                {buku.kategori}
              </span>

              {/* Status Ketersediaan */}
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

          {/* Bagian Rincian Metadata (ID, Tahun, Kategori, Ketersediaan) */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  ID Buku
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

            {/* Bagian Sinopsis Lengkap */}
            <div>
              <h2 className="text-base sm:text-lg font-medium text-slate-900 mb-2">
                Sinopsis Buku
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-5 rounded-lg border border-slate-200">
                {buku.sinopsis}
              </p>
            </div>

            {/* Tombol Kembali di Bagian Bawah */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                &larr; Kembali ke Katalog
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
