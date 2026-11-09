import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-stone-200/90 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">🔍</div>
      <h1 className="mt-5 font-serif text-3xl font-bold text-stone-900">Halaman atau Buku Tidak Ditemukan</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
        Alamat yang kamu buka tidak tercatat di Ruang Baca Pustaka Senja. Bukunya mungkin sudah dihapus.
      </p>
      <Link href="/katalog" className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-amber-800 active:scale-95">
        <span aria-hidden="true">←</span>
        <span>Kembali ke Katalog</span>
      </Link>
    </section>
  );
}
