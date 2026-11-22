import Link from "next/link";

export default function BukuTidakDitemukan({ id }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold">Buku tidak ditemukan</h1>
      <p className="mt-3 text-brown-ink">Tidak ada buku dengan ID “{id}” di rak kami. Mungkin tautannya keliru atau bukunya sudah dihapus.</p>
      <Link href="/katalog" className="mt-8 inline-block rounded-full bg-forest px-6 py-3 font-bold text-cream transition-colors hover:bg-forest/85">
        Kembali ke Katalog
      </Link>
    </div>
  );
}
