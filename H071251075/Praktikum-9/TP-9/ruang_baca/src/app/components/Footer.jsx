import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200/80 bg-[#241a15] text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Brand & Slogan */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-stone-950 font-bold text-xs">
                PS
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white">
                Ruang Baca Pustaka Senja
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-md">
              Tempat cerita bertemu, gagasan bertumbuh, dan setiap halaman membuka jendela baru bagi komunitas literasi.
            </p>
          </div>
        <div className="mt-2 gap-3 text-xs text-stone-400 sm:flex-row sm:items-center">
          <p>© 2026 Pustaka Senja. Dikelola untuk kegiatan literasi komunitas.</p>
          <p className="text-stone-400">
            Dibangun dengan <span className="text-amber-400">Next.js</span> &amp;{" "}
            <span className="text-amber-400">Tailwind CSS</span>
          </p>
        </div>

        </div>

      </div>
    </footer>
  );
}
