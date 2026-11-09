import Link from "next/link";

export default function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1d15] via-[#38271e] to-[#1f1610] px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16 lg:px-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full border-[32px] border-amber-200/10 blur-xs"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-20 h-64 w-64 rounded-full bg-amber-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-amber-400/5 blur-2xl"
      />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-300 backdrop-blur-xs">
          <span>✨</span>
          <span>Ruang Baca Terbuka untuk Semua</span>
        </div>

        <h1 className="mt-5 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-5xl">
          Selamat Datang di <span className="text-amber-300">{nama}</span>
        </h1>

        <p className="mt-4 text-base leading-relaxed text-stone-300 sm:text-lg">
          {slogan}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5 text-xs text-stone-200">
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 font-medium backdrop-blur-xs">
            <svg
              className="h-4 w-4 shrink-0 text-amber-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{lokasi}</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 font-medium backdrop-blur-xs">
            <svg
              className="h-4 w-4 shrink-0 text-amber-300"
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
            <span>{jamBuka}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-stone-950 shadow-md shadow-amber-950/20 transition-all duration-200 hover:bg-amber-300 hover:shadow-lg active:scale-95"
          >
            <span>Jelajahi Katalog</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/usulan"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xs transition-all duration-200 hover:bg-white/15 hover:border-white/40 active:scale-95"
          >
            <span>Usulkan Buku</span>
            <span aria-hidden="true">+</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
