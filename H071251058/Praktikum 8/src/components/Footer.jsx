// =============================================================================
// KOMPONEN FOOTER (Server Component)
// =============================================================================
// Komponen ini adalah Server Component (tidak memakai "use client") karena hanya
// menampilkan informasi statis (tautan, jam buka, dan hak cipta) tanpa interaktivitas.
// =============================================================================

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1: Profil Singkat */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                PS
              </div>
              <h3 className="font-semibold text-base text-slate-900">
                Pustaka Senja
              </h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ruang baca dan perpustakaan komunitas terbuka dekat kampus untuk
              membaca, belajar, dan berdiskusi.
            </p>
          </div>

          {/* Kolom 2: Tautan Halaman */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Menu Halaman
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-600">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-indigo-600">
                  Katalog Koleksi
                </Link>
              </li>
              <li>
                <Link href="/usulan" className="hover:text-indigo-600">
                  Usulan Buku Baru
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Informasi Kunjungan */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">
              Informasi Kunjungan
            </h4>
            <p className="text-sm text-slate-600 mb-1">
              Jl. Kampus No. 12, Lingkar Akademika
            </p>
            <p className="text-sm text-slate-600 mb-1">
              Senin - Sabtu: 09:00 - 21:00 WIB
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Minggu & Libur Nasional: Tutup
            </p>
          </div>
        </div>

        {/* Bagian Bawah Hak Cipta */}
        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Pustaka Senja. Hak Cipta Dilindungi.</p>
          <p>Tugas Praktikum 8 - Framework React (Next.js)</p>
        </div>
      </div>
    </footer>
  );
}
