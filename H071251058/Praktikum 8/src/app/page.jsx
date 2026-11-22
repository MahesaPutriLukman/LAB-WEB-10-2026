// =============================================================================
// HALAMAN BERANDA - URL "/" (Server Component)
// =============================================================================
// Halaman ini adalah Server Component (tidak memakai "use client") karena hanya
// membaca data dan merender tampilan tanpa membutuhkan hooks interaktif browser.
//
// Fitur:
// 1. Menampilkan komponen Hero dengan props.
// 2. Menghitung ringkasan statistik buku secara dinamis dari dataBuku.
// 3. Menyediakan tombol navigasi menggunakan <Link> ke /katalog dan /usulan.
// =============================================================================

import Link from "next/link";
import Hero from "@/components/Hero";
import dataBuku from "@/data/dataBuku";

export default function HomePage() {
  // 1. Menghitung total koleksi buku
  const totalBuku = dataBuku.length;

  // 2. Menghitung buku yang sedang tersedia (tersedia === true)
  const bukuTersedia = dataBuku.filter((buku) => buku.tersedia === true).length;

  // 3. Menghitung buku yang sedang dipinjam (tersedia === false)
  const bukuDipinjam = dataBuku.filter((buku) => buku.tersedia === false).length;

  return (
    <div>
      {/* Banner Hero dengan props */}
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas di dekat kampus yang menghadirkan suasana tenang untuk membaca, belajar, dan berdiskusi."
        lokasi="Jl. Kampus No. 12, Lingkar Akademika"
        jamBuka="Senin - Sabtu, 09:00 - 21:00 WIB"
      />

      {/* Bagian Statistik Koleksi Dinamis */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              Ringkasan Statistik Koleksi
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Data koleksi dihitung secara dinamis langsung dari data buku.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Kartu 1: Total Koleksi Buku */}
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
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Katalog
                </span>
                <h3 className="text-lg font-semibold text-slate-900 mt-3 mb-2">
                  Daftar Koleksi Buku
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Jelajahi seluruh koleksi buku, saring berdasarkan kategori, dan
                  simpan buku yang Anda sukai ke daftar favorit.
                </p>
              </div>
              <Link
                href="/katalog"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>Buka Katalog Buku</span>
                <span>&rarr;</span>
              </Link>
            </div>

            {/* Pintasan ke Usulan Buku */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  Usulan
                </span>
                <h3 className="text-lg font-semibold text-slate-900 mt-3 mb-2">
                  Usulkan Judul Baru
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Punya rekomendasi buku menarik untuk ruang baca kami? Kirimkan
                  usulan Anda melalui formulir khusus.
                </p>
              </div>
              <Link
                href="/usulan"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>Buka Form Usulan</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
