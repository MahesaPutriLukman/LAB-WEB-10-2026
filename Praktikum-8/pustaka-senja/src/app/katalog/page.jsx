"use client";

import { useState } from "react";
import Link from "next/link";
import BukuCard from "@/components/BukuCard";
import BukuCover from "@/components/BukuCover";
import dataBuku from "@/data/dataBuku";

const kategoriList = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function Katalog() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [favoritIds, setFavoritIds] = useState([]);

  const bukuTampil = kategoriAktif === "Semua" ? dataBuku : dataBuku.filter((b) => b.kategori === kategoriAktif);
  const bukuFavorit = dataBuku.filter((b) => favoritIds.includes(b.id));

  const aturFavorit = (id, disukai) => {
    setFavoritIds((prev) => (disukai ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id)));
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-serif text-4xl font-semibold">Katalog Buku</h1>
      <p className="mt-3 max-w-xl text-lg text-brown-ink">Jelajahi seluruh rak Pustaka Senja. Pilih kategori, simpan yang kamu suka, lalu buka detailnya.</p>

      <section className="mt-8 rounded-[2rem] bg-blush/30 p-6" aria-labelledby="judul-favorit">
        <h2 id="judul-favorit" className="font-serif text-xl font-semibold">Buku Favoritku ({bukuFavorit.length})</h2>
        {bukuFavorit.length === 0 ? (
          <p className="mt-2 text-brown-ink">Belum ada favorit. Tekan ikon hati pada kartu buku untuk menyimpannya di sini.</p>
        ) : (
          <>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {bukuFavorit.map((b) => (
                <li key={b.id}>
                  <Link href={`/katalog/${b.id}`} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
                    <span className="block w-12 shrink-0"><BukuCover judul={b.judul} penulis={b.penulis} kategori={b.kategori} size="sm" /></span>
                    <span>
                      <span className="block font-serif font-semibold leading-snug">{b.judul}</span>
                      <span className="block text-sm text-brown-ink">{b.penulis}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-brown-ink">Untuk menghapus dari favorit, tekan lagi ikon hati pada kartunya.</p>
          </>
        )}
      </section>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
        {kategoriList.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKategoriAktif(k)}
            aria-pressed={kategoriAktif === k}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              kategoriAktif === k ? "bg-forest text-cream" : "bg-white/70 text-brown-ink ring-1 ring-brown/20 hover:bg-sage/40"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm font-semibold text-brown-ink" aria-live="polite">Menampilkan {bukuTampil.length} buku</p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bukuTampil.map((buku) => (
          <BukuCard key={buku.id} buku={buku} awalFavorit={favoritIds.includes(buku.id)} onFavoritChange={aturFavorit} />
        ))}
      </div>
    </div>
  );
}
