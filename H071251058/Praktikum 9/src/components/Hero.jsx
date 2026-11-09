// =============================================================================
// KOMPONEN HERO (Server Component)
// =============================================================================
// Banner sambutan minimalis di halaman Beranda.
// =============================================================================

import Link from "next/link";

export default function Hero({
  nama = "Pustaka Senja",
  slogan = "Ruang baca dan perpustakaan komunitas di dekat kampus yang menghadirkan suasana tenang untuk membaca, belajar, dan berdiskusi.",
}) {
  return (
    <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          
          {/* Judul Utama */}
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-3">
            Selamat Datang di <span className="text-indigo-600">{nama}</span>
          </h1>

          {/* Slogan / Deskripsi Singkat */}
          <p className="text-base text-slate-600 leading-relaxed mb-8">
            {slogan}
          </p>

          {/* Tombol Aksi Navigasi (Tanpa Arrow) */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/katalog"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
            >
              Lihat Katalog Koleksi
            </Link>

            <Link
              href="/usulan"
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm border border-slate-300 transition-colors"
            >
              Usulkan Judul Buku
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
