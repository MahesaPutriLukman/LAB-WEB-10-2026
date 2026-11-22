import Link from "next/link";
import Hero from "./components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
            COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  const totalBuku = rows[0].total;
  const bukuTersedia = rows[0].tersedia;
  const bukuDipinjam = rows[0].dipinjam;

  const statistik = [
    {
      label: "Total koleksi buku",
      value: totalBuku,
      catatan: "Pilihan bacaan menarik & menambah ilmu",
      accent: "text-amber-900 bg-amber-50 border-amber-200",
      icon: (
        <svg
          className="h-5 w-5 text-amber-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      label: "Buku tersedia",
      value: bukuTersedia,
      catatan: "Siap dipinjam & menemani harimu",
      accent: "text-emerald-800 bg-emerald-50 border-emerald-200",
      icon: (
        <svg
          className="h-5 w-5 text-emerald-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Sedang dipinjam",
      value: bukuDipinjam,
      catatan: "Segera kembali untuk pembaca berikutnya",
      accent: "text-stone-800 bg-stone-100 border-stone-200",
      icon: (
        <svg
          className="h-5 w-5 text-stone-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-14">
      <Hero
        nama="Pustaka Senja"
        slogan="Sebuah ruang baca kecil untuk menemukan ide besar. Temukan cerita, pengetahuan, dan inspirasi baru dalam setiap halaman, karena semua hal besar berawal dari sesuatu yang kecil."
        lokasi="Dekat Kampus Universitas Hasanuddin Tamalanrea"
        jamBuka="Senin - Sabtu, Jam 09.00 - 17.00"
      />

      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
              Statistik Koleksi
            </p>
            <h2
              id="statistik-heading"
              className="mt-1 font-serif text-3xl font-bold text-stone-900"
            >
              Cerita yang menunggu dibuka
            </h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {statistik.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-stone-500">
                  {item.label}
                </p>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${item.accent}`}
                >
                  {item.icon}
                </div>
              </div>
              <p className="mt-4 font-serif text-4xl font-extrabold text-stone-900">
                {item.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-stone-500">
                {item.catatan}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-100/70 via-[#fcf5eb] to-amber-50 p-8 shadow-sm sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-200/40 blur-2xl"
        />
        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-amber-200/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              Bantu Kami Berkembang
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
              Buku apa yang ingin kamu baca?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Rekomendasikan judul yang ingin kamu temukan di rak Pustaka Senja
              berikutnya. Partisipasimu sangat berharga bagi komunitas kami.
            </p>
          </div>
          <Link
            href="/usulan"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-900 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-amber-950/15 transition-all duration-200 hover:bg-amber-800 hover:shadow-lg active:scale-95"
          >
            <span>Usulkan Buku Baru</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
