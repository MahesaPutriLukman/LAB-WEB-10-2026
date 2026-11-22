"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

const kategoriBadges = {
  Teknologi: "bg-sky-50 text-sky-800 border-sky-200",
  Fiksi: "bg-purple-50 text-purple-800 border-purple-200",
  "Pengembangan Diri": "bg-amber-50 text-amber-900 border-amber-200",
};

export default function BukuCard({ buku }) {
  const [favorit, setFavorit] = useState(false);

  const badgeStyle =
    kategoriBadges[buku.kategori] ||
    "bg-amber-50 text-amber-900 border-amber-200";

  
  return (
    <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyle}`}
          >
            {buku.kategori}
          </span>
          <button
            type="button"
            onClick={() => setFavorit((prev) => !prev)}
            aria-label={
              favorit
                ? `Hapus ${buku.judul} dari favorit`
                : `Tambah ${buku.judul} ke favorit`
            }
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-base transition-all duration-200 active:scale-90 ${
              favorit
                ? "border-rose-200 bg-rose-50 text-rose-600 shadow-xs"
                : "border-stone-200 text-stone-400 hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-500"
            }`}
          >
            {favorit ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="mt-4">
          <h2 className="font-serif text-xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-amber-900">
            {buku.judul}
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            oleh <span className="font-medium text-stone-700">{buku.penulis}</span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-y border-stone-100 py-3 text-xs text-stone-500">
          <span className="flex items-center gap-1 font-medium">
            <svg
              className="h-3.5 w-3.5 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Tahun {buku.tahun}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              buku.tersedia
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${buku.tersedia ? "bg-emerald-500" : "bg-rose-500"}`} />
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-stone-600">
          {buku.sinopsis}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 border-t border-stone-100 pt-4">
        <Link
          href={`/katalog/${buku.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-900 transition-all duration-200 hover:gap-2.5 group-hover:text-amber-700"
        >
          <span>Lihat Detail</span>
          <span aria-hidden="true">→</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="rounded-full px-3 py-1.5 text-xs font-bold text-stone-600 transition-all duration-200 hover:bg-amber-50 hover:text-amber-900 active:scale-95"
          >
            Edit
          </Link>
          <TombolHapus id={buku.id} judul={buku.judul} />
        </div>
      </div>
    </article>
  );
}
