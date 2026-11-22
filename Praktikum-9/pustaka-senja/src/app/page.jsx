import Link from "next/link";
import Hero from "@/components/Hero";
import BukuCover from "@/components/BukuCover";
import { semuaBuku, hitungStatistik } from "@/lib/buku";

// Data berasal dari PostgreSQL dan berubah, jadi halaman dirender saat diminta.
export const dynamic = "force-dynamic";

export default async function Beranda() {
  // Statistik dan daftar buku dibaca dari PostgreSQL
  const { total, tersedia, dipinjam } = await hitungStatistik();
  const daftarBuku = await semuaBuku();

  const statistik = [
    { id: "total", label: "Total Koleksi", nilai: total, warna: "bg-sage/60" },
    { id: "tersedia", label: "Buku Tersedia", nilai: tersedia, warna: "bg-peach/50" },
    { id: "dipinjam", label: "Sedang Dipinjam", nilai: dipinjam, warna: "bg-blush/60" },
  ];

  return (
    <>
      {/* TODO: sesuaikan lokasi dan jam buka dengan data sebenarnya */}
      <Hero
        nama="Pustaka Senja"
        slogan="Sebuah ruang baca kecil yang hangat. Duduklah sebentar, pilih satu buku, dan biarkan sore berjalan pelan."
        lokasiJam="Dekat kampus · Senin–Sabtu, 10.00–20.00"
      />

      <section className="mx-auto max-w-6xl px-5 py-10" aria-labelledby="judul-statistik">
        <h2 id="judul-statistik" className="sr-only">Statistik koleksi</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {statistik.map((s) => (
            <li key={s.id} className={`rounded-3xl p-6 ${s.warna}`}>
              <p className="font-serif text-5xl font-semibold">{s.nilai}</p>
              <p className="mt-1 text-sm font-bold text-brown-ink">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6" aria-labelledby="judul-rak">
        <div className="flex items-end justify-between gap-4">
          <h2 id="judul-rak" className="font-serif text-2xl font-semibold">Dari rak kami</h2>
          <Link href="/katalog" className="text-sm font-bold underline underline-offset-4">Lihat semua buku</Link>
        </div>
        <p className="mt-1 text-sm font-semibold text-brown-ink">Geser ke kiri atau kanan untuk melihat seluruh {total} buku.</p>
        <div className="mt-4 overflow-x-auto pb-3" tabIndex={0} role="region" aria-label="Rak buku, dapat digeser ke samping">
          <div className="w-max min-w-full px-1 pt-3">
            <ul className="flex items-end gap-5">
              {daftarBuku.map((b) => (
                <li key={b.id} className="w-32 shrink-0 sm:w-36">
                  <Link href={`/katalog/${b.id}`} className="block rounded-r-xl transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
                    <BukuCover judul={b.judul} penulis={b.penulis} kategori={b.kategori} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="h-4 rounded-md bg-brown/70" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-5" aria-labelledby="judul-tentang">
        <div className="rounded-[2rem] bg-white/60 p-8 ring-1 ring-brown/10 md:p-10">
          <h2 id="judul-tentang" className="font-serif text-2xl font-semibold">Tentang Pustaka Senja</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-brown-ink">
            Pustaka Senja adalah ruang baca dan perpustakaan komunitas di dekat kampus. Koleksinya kecil dan dipilih dengan hati: bacaan teknologi, fiksi, dan pengembangan diri. Cari buku, simpan yang kamu suka, atau usulkan judul yang ingin kamu lihat di rak.
          </p>
        </div>
      </section>
    </>
  );
}
