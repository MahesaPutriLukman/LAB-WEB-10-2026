import Link from "next/link";
import KatalogInteraktif from "@/components/KatalogInteraktif";
import { semuaBuku } from "@/lib/buku";

export const dynamic = "force-dynamic"; // selalu baca data terbaru dari PostgreSQL

export default async function Katalog() {
  const daftarBuku = await semuaBuku();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-semibold">Katalog Buku</h1>
          <p className="mt-3 max-w-xl text-lg text-brown-ink">Jelajahi seluruh rak Pustaka Senja. Pilih kategori, simpan yang kamu suka, lalu buka detailnya.</p>
        </div>
        <Link href="/katalog/tambah" className="rounded-full bg-forest px-6 py-3 font-bold text-cream shadow-md shadow-forest/20 transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
          + Tambah Buku
        </Link>
      </div>
      <KatalogInteraktif buku={daftarBuku} />
    </div>
  );
}
