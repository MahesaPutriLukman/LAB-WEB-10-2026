"use client";

import { useState } from "react";
import BukuCard from "./BukuCard";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri",];

// Data buku datang dari Server Component (hasil query PostgreSQL) lewat props.
export default function KatalogInteraktif({ buku: dataBuku }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [keyword, setKeyword] = useState("");

  // Diturunkan dari props supaya otomatis ikut berubah setelah tambah/ubah/hapus.
  const bukuTerfilter = dataBuku.filter(
    (buku) =>
      (kategoriAktif === "Semua" || buku.kategori === kategoriAktif) &&
      buku.judul.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  function handleReset() {
    setKategoriAktif("Semua");
    setKeyword("");
  }

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2" aria-label="Filter kategori buku">
          {daftarKategori.map((kategori) => {
            const isActive = kategoriAktif === kategori;
            return (
              <button
                key={kategori}
                type="button"
                onClick={() => setKategoriAktif(kategori)}
                aria-pressed={isActive}
                className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-95 sm:text-sm ${
                  isActive
                    ? "bg-amber-900 text-amber-50 shadow-sm shadow-amber-900/20"
                    : "border border-stone-200 bg-white text-stone-600 hover:border-amber-300 hover:bg-stone-50 hover:text-amber-950"
                }`}
              >
                {kategori}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
          </svg>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari judul buku..."
            aria-label="Cari judul buku"
            className="w-full rounded-full border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:ring-4 focus:ring-amber-900/10"
          />
        </div>
      </div>

      <p className="text-xs font-medium text-stone-500 sm:text-sm">
        Menampilkan {bukuTerfilter.length} dari {dataBuku.length} buku
      </p>

      {bukuTerfilter.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-14 text-center">
          <p className="font-serif text-xl font-bold text-stone-800">Belum ada buku yang cocok</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-stone-500">
            Coba kata kunci lain atau tampilkan semua kategori.
          </p>
          <button type="button" onClick={handleReset} className="mt-5 rounded-full bg-amber-900 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-amber-800 active:scale-95">
            Tampilkan semua buku
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bukuTerfilter.map((buku) => (
            <BukuCard key={buku.id} buku={buku} />
          ))}
        </div>
      )}
    </>
  );
}
