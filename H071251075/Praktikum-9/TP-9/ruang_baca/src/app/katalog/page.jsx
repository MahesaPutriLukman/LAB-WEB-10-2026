import Link from "next/link";
import pool from "@/lib/db";
import KatalogInteraktif from "../components/KatalogInteraktif";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const { rows } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku ORDER BY id"
  );

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-stone-200/80 pb-8">
        <div>
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            Jelajahi Rak Pustaka
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
            Katalog Koleksi Buku
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            Dari teknologi hingga cerita yang membekas, pilih bacaan yang paling sesuai dengan rasa ingin tahumu.
          </p>
        </div>
        <Link
          href="/katalog/tambah"
          className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-6 py-3 text-sm font-bold text-white shadow-md shadow-amber-950/20 transition-all duration-200 hover:bg-amber-800 hover:shadow-lg active:scale-95"
        >
          <span aria-hidden="true">+</span>
          <span>Tambah Buku</span>
        </Link>
      </div>

      <KatalogInteraktif buku={rows} />
    </section>
  );
}
