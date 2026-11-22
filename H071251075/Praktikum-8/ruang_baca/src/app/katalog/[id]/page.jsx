import Link from "next/link";
import dataBuku from "@/app/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <section className="mx-auto max-w-2xl rounded-3xl border border-stone-200/90 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl text-amber-800">
          🔍
        </div>
        <h1 className="mt-5 font-serif text-3xl font-bold text-stone-900">
          Buku Tidak Ditemukan
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
          Maaf, buku dengan ID <span className="font-semibold text-stone-900">#{id}</span> tidak tercatat dalam koleksi Ruang Baca Pustaka Senja.
        </p>
        <Link
          href="/katalog"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-amber-800"
        >
          <span aria-hidden="true">←</span>
          <span>Kembali ke Katalog</span>
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/katalog"
          className="group inline-flex items-center gap-2 text-sm font-bold text-amber-900 transition-colors hover:text-amber-700"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            ←
          </span>
          <span>Kembali ke Katalog Buku</span>
        </Link>
      </div>

      {/* Main Detail Article */}
      <article className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-sm">
        {/* Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2a1d15] via-[#38271e] to-[#1f1610] px-6 py-10 text-white sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-600/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-1/2 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl"
          />

          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/15 px-3.5 py-1 text-xs font-semibold text-amber-200 backdrop-blur-xs">
              {buku.kategori}
            </span>

            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {buku.judul}
            </h1>

            <p className="mt-3 flex items-center gap-2 text-base text-stone-300 sm:text-lg">
              <svg
                className="h-4 w-4 text-amber-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Ditulis oleh <strong className="text-white">{buku.penulis}</strong></span>
            </p>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-10">
          {/* Metadata Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200/70 bg-[#faf8f5] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Tahun Terbit
              </p>
              <p className="mt-2 text-xl font-extrabold text-stone-900">
                {buku.tahun}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200/70 bg-[#faf8f5] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Kategori
              </p>
              <p className="mt-2 text-xl font-extrabold text-stone-900">
                {buku.kategori}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200/70 bg-[#faf8f5] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Status Koleksi
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                    buku.tersedia
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      buku.tersedia ? "bg-emerald-600" : "bg-rose-600"
                    }`}
                  />
                  {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                </span>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div className="mt-10 border-t border-stone-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Sinopsis &amp; Ringkasan
            </h2>
            <div className="relative mt-4 rounded-2xl bg-stone-50 p-6 text-stone-700">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 left-6 select-none font-serif text-5xl text-amber-200"
              >
                “
              </span>
              <p className="relative z-10 text-base leading-relaxed">
                {buku.sinopsis}
              </p>
            </div>
          </div>

          {/* Library Info Card */}
          <div className="mt-8 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-5">
            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Ingin membaca buku ini secara langsung?
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-amber-900/80">
                  Kunjungi Ruang Baca Pustaka Senja di dekat Kampus Unhas Tamalanrea. Buka setiap Senin - Sabtu pukul 09.00 - 17.00.
                </p>
              </div>
            </div>
          </div>

          {/* Footer ID and Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-6 text-xs text-stone-500">
            <div>
              ID Koleksi: <span className="font-mono font-bold text-stone-800">#{buku.id}</span>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-1.5 font-bold text-amber-900 hover:text-amber-700"
            >
              <span>← Kembali ke Daftar</span>
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
