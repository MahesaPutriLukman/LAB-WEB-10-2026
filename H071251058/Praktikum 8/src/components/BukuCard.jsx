"use client";

// =============================================================================
// KOMPONEN BUKU CARD (Client Component)
// =============================================================================
// Komponen ini membutuhkan "use client" karena setiap kartu buku memiliki tombol
// interaktif "Favorit/Suka" yang menyimpan statusnya sendiri menggunakan "useState".
//
// Menerima prop:
// - buku: Objek berisi data satu buku (id, judul, penulis, kategori, tahun, tersedia)
// =============================================================================

import Link from "next/link";
import { useState } from "react";

export default function BukuCard({ buku }) {
  // State untuk menyimpan apakah buku ini disukai oleh pengunjung atau belum
  const [isFavorit, setIsFavorit] = useState(false);

  // Fungsi sederhana untuk membalik status favorit (true <-> false)
  function ubahStatusFavorit() {
    setIsFavorit(!isFavorit);
  }

  return (
    <article className="flex flex-col bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors overflow-hidden">
      <div className="p-5 flex-1 flex flex-col">
        {/* Kategori dan Status Ketersediaan */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Badge Kategori */}
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            {buku.kategori}
          </span>

          {/* Badge Ketersediaan: Hijau jika true, Abu-abu jika false */}
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded border ${
              buku.tersedia
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        {/* Judul Buku */}
        <h3 className="font-semibold text-base text-slate-900 leading-snug mb-1 line-clamp-2">
          {buku.judul}
        </h3>

        {/* Penulis Buku */}
        <p className="text-sm text-slate-600 mb-4">oleh {buku.penulis}</p>

        {/* Tahun Terbit */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Tahun Terbit:</span>
          <span className="font-medium text-slate-700">{buku.tahun}</span>
        </div>
      </div>

      {/* Bagian Bawah Kartu: Tombol Favorit & Tombol Detail */}
      <div className="border-t border-slate-100 bg-slate-50 p-3.5 flex items-center justify-between gap-2">
        {/* Tombol Favorit (Interaktif) */}
        <button
          type="button"
          onClick={ubahStatusFavorit}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            isFavorit
              ? "bg-rose-50 text-rose-600 border-rose-200"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
          }`}
        >
          {/* Ikon Hati SVG */}
          <svg
            className={`w-3.5 h-3.5 ${
              isFavorit ? "fill-rose-600 stroke-rose-600" : "fill-none stroke-current"
            }`}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{isFavorit ? "Disukai" : "Suka"}</span>
        </button>

        {/* Tautan ke Halaman Detail Buku */}
        <Link
          href={`/katalog/${buku.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          <span>Lihat Detail</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
