import Link from "next/link";

const tumpukan = [
  { id: "t1", warna: "bg-sage", lebar: "w-56" },
  { id: "t2", warna: "bg-blush", lebar: "w-64" },
  { id: "t3", warna: "bg-peach", lebar: "w-52" },
  { id: "t4", warna: "bg-forest", lebar: "w-60" },
];

export default function Hero({ nama, slogan, lokasiJam }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-6 pt-12 md:grid-cols-2 md:pt-20">
      <div>
        <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">Selamat datang di {nama}</h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-brown-ink">{slogan}</p>
        <p className="mt-4 flex items-center gap-2 text-sm font-bold text-brown-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
          {lokasiJam}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/katalog" className="rounded-full bg-forest px-6 py-3 font-bold text-cream shadow-md shadow-forest/20 transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
            Jelajahi Katalog
          </Link>
          <Link href="/usulan" className="rounded-full bg-sage px-6 py-3 font-bold text-forest transition-colors hover:bg-sage/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
            Usulkan Buku
          </Link>
        </div>
      </div>

      {/* dekorasi: tumpukan buku */}
      <div className="flex flex-col items-center gap-1.5 rounded-[2.5rem] bg-peach/30 px-6 pb-0 pt-10" aria-hidden="true">
        {tumpukan.map((b, i) => (
          <div key={b.id} className={`relative h-12 rounded-md shadow-sm shadow-brown/30 ${b.warna} ${b.lebar} ${i % 2 === 0 ? "-translate-x-3" : "translate-x-3"}`}>
            <span className="absolute inset-y-2 left-4 w-1 rounded bg-cream/60" />
            <span className="absolute inset-y-2 left-7 w-1 rounded bg-cream/40" />
            {i === 1 && <span className="absolute -top-1 right-8 h-5 w-3 rounded-b-sm bg-peach" />}
          </div>
        ))}
        <div className="mt-1 h-4 w-full rounded-t-xl bg-brown/70" />
      </div>
    </section>
  );
}
