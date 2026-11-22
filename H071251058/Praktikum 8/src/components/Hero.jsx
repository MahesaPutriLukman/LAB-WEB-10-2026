// =============================================================================
// KOMPONEN HERO (Server Component)
// =============================================================================
// Komponen ini bertugas menampilkan banner sambutan utama di halaman Beranda.
// Komponen ini menerima "props" dari komponen induk (src/app/page.jsx):
// - nama: Nama ruang baca ("Pustaka Senja")
// - slogan: Deskripsi / tujuan ruang baca
// - lokasi: Alamat fisik
// - jamBuka: Jam operasional
// =============================================================================

import Link from "next/link";

export default function Hero({
  nama = "Pustaka Senja",
  slogan = "Ruang baca dan perpustakaan komunitas di dekat kampus yang menghadirkan suasana tenang untuk membaca, belajar, dan berdiskusi.",
  lokasi = "Jl. Kampus No. 12, Lingkar Akademika",
  jamBuka = "Senin - Sabtu, 09:00 - 21:00 WIB",
}) {
  return (
    <section className="bg-white border-b border-slate-200 py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Label Kecil */}
          <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium mb-4">
            Perpustakaan Komunitas Terbuka
          </span>

          {/* Judul Utama (Menggunakan prop 'nama') */}
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-4">
            Selamat Datang di <span className="text-indigo-600">{nama}</span>
          </h1>

          {/* Deskripsi (Menggunakan prop 'slogan') */}
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            {slogan}
          </p>

          {/* Kotak Info Lokasi & Jam Buka (Menggunakan props 'lokasi' & 'jamBuka') */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-slate-600 mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="font-semibold text-slate-800">Lokasi: </span>
              <span>{lokasi}</span>
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div>
              <span className="font-semibold text-slate-800">Jam Buka: </span>
              <span>{jamBuka}</span>
            </div>
          </div>

          {/* Tombol Aksi Navigasi Cepat */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tombol ke Katalog */}
            <Link
              href="/katalog"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
            >
              Lihat Katalog Koleksi &rarr;
            </Link>

            {/* Tombol ke Halaman Usulan */}
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
