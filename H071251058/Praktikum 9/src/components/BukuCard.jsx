"use client";

// =============================================================================
// KOMPONEN BUKU CARD (Client Component)
// =============================================================================
// Desain kartu katalog buku modern dan minimalis:
// 1. Header: Kategori badge, indikator ketersediaan dot, dan tombol favorit ikon.
// 2. Konten: Judul buku interaktif, nama penulis & tahun, serta cuplikan sinopsis.
// 3. Footer Aksi: Tombol Edit, Tombol Hapus (dengan konfirmasi), dan Tombol Detail.
// =============================================================================

import Link from "next/link";
import { useState } from "react";
import TombolHapus from "@/components/TombolHapus";

export default function BukuCard({ buku }) {
  // State favorit mandiri untuk kartu buku
  const [isFavorit, setIsFavorit] = useState(false);

  function ubahStatusFavorit() {
    setIsFavorit(!isFavorit);
  }

  return (
    <article className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 overflow-hidden">
      {/* Konten Utama Kartu */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Baris Atas: Kategori, Status Ketersediaan, dan Tombol Favorit */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Badge Kategori */}
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
              {buku.kategori}
            </span>

            {/* Badge Status Ketersediaan dengan Dot Indicator */}
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${
                buku.tersedia
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  buku.tersedia ? "bg-emerald-500" : "bg-slate-400"
                }`}
              ></span>
              <span>{buku.tersedia ? "Tersedia" : "Dipinjam"}</span>
            </span>
          </div>

          {/* Tombol Favorit (Ikon Hati) */}
          <button
            type="button"
            onClick={ubahStatusFavorit}
            className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
              isFavorit
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-50"
            }`}
            title={isFavorit ? "Hapus dari favorit" : "Sukai buku"}
          >
            <svg
              className={`w-4 h-4 ${
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
          </button>
        </div>

        {/* Judul Buku */}
        <h3 className="font-semibold text-lg text-slate-900 leading-snug mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-2">
          <Link href={`/katalog/${buku.id}`}>{buku.judul}</Link>
        </h3>

        {/* Penulis & Tahun Terbit */}
        <p className="text-xs text-slate-500 mb-3">
          <span className="text-slate-700 font-medium">{buku.penulis}</span>
          <span className="mx-1.5 text-slate-300">•</span>
          <span>Tahun {buku.tahun}</span>
        </p>

        {/* Cuplikan Sinopsis */}
        {buku.sinopsis && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-auto pt-2">
            {buku.sinopsis}
          </p>
        )}
      </div>

      {/* Bagian Bawah: Aksi Edit, Hapus, dan Detail */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {/* Tombol Edit */}
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            title="Edit data buku"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span>Edit</span>
          </Link>

          {/* Tombol Hapus */}
          <TombolHapus id={buku.id} judulBuku={buku.judul} />
        </div>

        {/* Tombol Lihat Detail */}
        <Link
          href={`/katalog/${buku.id}`}
          className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-2xs"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
