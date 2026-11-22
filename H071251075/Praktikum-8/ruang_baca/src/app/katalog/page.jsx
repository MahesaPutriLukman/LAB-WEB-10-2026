
"use client";

import { useState } from "react";
import dataBuku from "../data/dataBuku";
import BukuCard from "../components/BukuCard";

const daftarKategori = [
  "Semua",
  "Teknologi",
  "Fiksi",
  "Pengembangan Diri",
];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [bukuTerfilter, setBukuterfilter] = useState(dataBuku);
  const [keyword, setKeyword] = useState("");

  const filterKategori = (kategori) => {
    setBukuterfilter(
      dataBuku.filter((buku) =>
        kategori === "Semua" ? buku : buku.kategori === kategori
      )
    );
  };

  const filterPencarian = (yangDicari) => {
    setBukuterfilter(
      dataBuku.filter((buku) =>
        buku.judul.toLowerCase().includes(yangDicari.toLowerCase())
      )
    );
  };

  function handleReset() {
    setKategoriAktif("Semua");
  }

  return (
    <section className="space-y-8">
      <div className="border-b border-stone-200/80 pb-8">
        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
          Jelajahi Rak Pustaka
        </span>

        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Katalog Koleksi Buku
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
          Dari teknologi hingga cerita yang membekas, pilih bacaan
          yang paling sesuai dengan rasa ingin tahumu.
        </p>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-3"
        aria-label="Filter kategori buku"
      >
        <div className="flex flex-wrap items-center gap-2">
          {daftarKategori.map((kategori) => {
            const isActive = kategoriAktif === kategori;
            return (
              <button
                key={kategori}
                type="button"
                onClick={() => {
                  setKategoriAktif(kategori);
                  filterKategori(kategori);
                }}
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
          
        <div>
          <input
          type="text"
          className="border rounded-xl p-2"
          placeholder="cari buku.."
          onChange={(e) => {
            setKeyword(e.target.value);
            filterPencarian(e.target.value); 
            setKategoriAktif("Semua")
          }} />
          </div>

        <div className="text-xs font-medium text-stone-500 sm:text-sm">
          Menampilkan {bukuTerfilter.length} dari {dataBuku.length} buku
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bukuTerfilter.map((buku) => (
          <BukuCard key={buku.id} buku={buku} />
        ))}
      </div>
    </section>
  );
}
