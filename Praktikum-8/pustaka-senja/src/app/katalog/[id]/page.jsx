import Link from "next/link";
import BukuCover from "@/components/BukuCover";
import StatusBadge from "@/components/StatusBadge";
import dataBuku from "@/data/dataBuku";

export default async function DetailBuku({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((b) => b.id === id);

  if (!buku) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold">Buku tidak ditemukan</h1>
        <p className="mt-3 text-brown-ink">Tidak ada buku dengan ID “{id}” di rak kami. Mungkin tautannya keliru.</p>
        <Link href="/katalog" className="mt-8 inline-block rounded-full bg-forest px-6 py-3 font-bold text-cream transition-colors hover:bg-forest/85">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 md:grid-cols-[18rem_1fr] md:items-start">
      <div className="mx-auto w-full max-w-[16rem] md:max-w-none">
        <BukuCover judul={buku.judul} penulis={buku.penulis} kategori={buku.kategori} size="lg" />
        <div className="h-3 rounded-t-md bg-brown/70" aria-hidden="true" />
      </div>

      <article>
        <p className="inline-block rounded-full bg-cream px-3 py-1 text-xs font-bold ring-1 ring-brown/30">{buku.kategori}</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight">{buku.judul}</h1>
        <p className="mt-2 text-lg font-semibold text-brown-ink">{buku.penulis}</p>

        <dl className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div>
            <dt className="text-xs font-bold text-brown-ink">Tahun terbit</dt>
            <dd className="font-serif text-xl font-semibold">{buku.tahun}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-bold text-brown-ink">Ketersediaan</dt>
            <dd><StatusBadge tersedia={buku.tersedia} /></dd>
          </div>
        </dl>

        <h2 className="mt-10 font-serif text-xl font-semibold">Sinopsis</h2>
        <p className="mt-3 max-w-prose text-lg leading-8">{buku.sinopsis}</p>

        <Link href="/katalog" className="mt-10 inline-block rounded-full bg-sage px-6 py-3 font-bold text-forest transition-colors hover:bg-sage/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
          Kembali ke Katalog
        </Link>
      </article>
    </div>
  );
}
