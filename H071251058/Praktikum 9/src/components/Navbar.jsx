"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  // 1. Ambil path URL saat ini (misal: "/" atau "/katalog" atau "/katalog/1")
  const pathname = usePathname();

  // 2. State untuk mengatur buka/tutup menu di layar HP
  const [menuHpTerbuka, setMenuHpTerbuka] = useState(false);

  // 3. Daftar menu navigasi utama aplikasi
  const daftarMenu = [
    { nama: "Beranda", path: "/" },
    { nama: "Katalog", path: "/katalog" },
    { nama: "Usulan Buku", path: "/usulan" },
  ];

  // 4. Fungsi pembantu: mengecek apakah menu sedang aktif berdasarkan URL
  function cekMenuAktif(path) {
    // Jika menu Beranda ("/"), hanya aktif jika URL persis "/"
    if (path === "/") {
      return pathname === "/";
    }

    // Untuk menu lain (misal "/katalog"):
    // Tetap aktif jika URL persis "/katalog" ATAU URL dimulai dengan "/katalog/" (halaman detail buku)
    return pathname === path || pathname.startsWith(path + "/");
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo dan Nama Ruang Baca */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              {/* Ikon Buku (SVG) */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-base text-slate-900 leading-tight">
                Pustaka Senja
              </p>
              <p className="text-xs text-slate-500">Ruang Baca Komunitas</p>
            </div>
          </Link>

          {/* Menu Navigasi Layar Komputer / Laptop (Desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            {daftarMenu.map((item) => {
              const aktif = cekMenuAktif(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    aktif
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item.nama}
                </Link>
              );
            })}
          </nav>

          {/* Tombol Buka/Tutup Menu untuk Layar HP */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMenuHpTerbuka(!menuHpTerbuka)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Tombol menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuHpTerbuka ? (
                  // Ikon Silang (Tutup)
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Ikon Garis Tiga (Buka)
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tampilan Dropdown Menu Layar HP */}
      {menuHpTerbuka && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {daftarMenu.map((item) => {
            const aktif = cekMenuAktif(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuHpTerbuka(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  aktif
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.nama}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
