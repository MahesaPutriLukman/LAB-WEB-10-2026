"use client";

// =============================================================================
// HALAMAN KATALOG BUKU - URL "/katalog" (Client Component)
// =============================================================================
// Komponen ini membutuhkan "use client" karena memiliki tombol filter kategori
// interaktif yang mengubah daftar buku di layar menggunakan state "useState".
// =============================================================================

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import dataBuku from "@/data/dataBuku";

export default function KatalogPage() {
  // 1. State untuk menyimpan kategori buku yang sedang dipilih pengunjung
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  // Daftar opsi kategori yang tersedia
  const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

  // 2. Logika penyaringan buku:
  // Jika "Semua", tampilkan semua buku. Jika bukan, ambil yang kategorinya cocok.
  let bukuTersaring = dataBuku;
  if (kategoriAktif !== "Semua") {
    bukuTersaring = dataBuku.filter((buku) => buku.kategori === kategoriAktif);
  }

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Halaman Katalog */}
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase tracking-wider">
            Katalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-3 mb-2">
            Koleksi Buku Pustaka Senja
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Daftar lengkap seluruh buku kami. Pilih kategori di bawah untuk
            menyaring judul yang ingin Anda baca.
          </p>
        </div>

        {/* Tombol-Tombol Filter Kategori */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 mr-2">
              Filter Kategori:
            </span>

            {daftarKategori.map((kategori) => {
              // Cek apakah tombol ini adalah kategori yang sedang aktif
              const isTombolAktif = kategoriAktif === kategori;

              return (
                <button
                  key={kategori}
                  type="button"
                  onClick={() => setKategoriAktif(kategori)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isTombolAktif
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {kategori}
                </button>
              );
            })}
          </div>

          {/* Keterangan Jumlah Buku yang Sedang Ditampilkan */}
          <p className="text-xs text-slate-500 mt-3">
            Menampilkan <span className="font-semibold text-slate-800">{bukuTersaring.length}</span> dari {dataBuku.length} total buku
          </p>
        </div>

        {/* Menampilkan Daftar Buku Menggunakan Komponen BukuCard */}
        {bukuTersaring.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bukuTersaring.map((buku) => (
              <BukuCard key={buku.id} buku={buku} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">
              Tidak ada buku yang ditemukan untuk kategori ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
