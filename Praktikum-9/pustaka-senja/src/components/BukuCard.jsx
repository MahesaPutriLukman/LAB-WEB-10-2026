"use client";

import { useState } from "react";
import Link from "next/link";
import BukuCover from "@/components/BukuCover";
import StatusBadge from "@/components/StatusBadge";
import TombolHapus from "@/components/TombolHapus";

export default function BukuCard({ buku, awalFavorit = false, onFavoritChange }) {
  const { id, judul, penulis, kategori, tahun, tersedia } = buku;
  const [favorit, setFavorit] = useState(awalFavorit);

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white/70 shadow-md shadow-brown/15 ring-1 ring-brown/10 transition-shadow hover:shadow-lg hover:shadow-brown/25">
      {/* rak: sampul berdiri di atas papan kayu */}
      <div className="relative bg-peach/25 px-10 pt-8">
        <button
          type="button"
          onClick={() => {
            const berikutnya = !favorit;
            setFavorit(berikutnya);
            if (onFavoritChange) onFavoritChange(id, berikutnya);
          }}
          aria-pressed={favorit}
          aria-label={favorit ? `Hapus ${judul} dari favorit` : `Simpan ${judul} ke favorit`}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
            favorit ? "bg-forest text-blush" : "bg-white text-brown-ink hover:bg-blush/60"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={favorit ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.9a4.3 4.3 0 0 1 7.5 2.6c0 5.4-7.5 10-7.5 10z" />
          </svg>
        </button>
        <div className="mx-auto max-w-[9.5rem]">
          <BukuCover judul={judul} penulis={penulis} kategori={kategori} size="md" />
        </div>
        <div className="mt-0 h-3 rounded-t-md bg-brown/70" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h2 className="font-serif text-lg font-semibold leading-snug">{judul}</h2>
          <p className="text-sm font-semibold text-brown-ink">{penulis}</p>
        </div>
        <p className="flex flex-wrap items-center gap-2 text-sm text-brown-ink">
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold ring-1 ring-brown/20">{kategori}</span>
          <span>Terbit {tahun}</span>
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <StatusBadge tersedia={tersedia} />
          <Link
            href={`/katalog/${id}`}
            className="rounded-full bg-forest px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Lihat Detail
          </Link>
        </div>
        <div className="flex items-center gap-2 border-t border-brown/15 pt-3">
          <Link
            href={`/katalog/${id}/edit`}
            className="rounded-full bg-sage px-4 py-2 text-sm font-bold text-forest transition-colors hover:bg-sage/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Edit
          </Link>
          <TombolHapus id={id} judul={judul} />
        </div>
      </div>
    </article>
  );
}
