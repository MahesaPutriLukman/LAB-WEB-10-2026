"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/usulan", label: "Usulan Buku" },
];

export default function Navbar() {
  const pathname = usePathname();

  // "/" hanya aktif di beranda; menu lain tetap aktif di halaman turunannya (mis. /katalog/4)
  const aktif = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-20 border-b border-brown/20 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3" aria-label="Navigasi utama">
        <Link href="/" className="flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-cream" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
              <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
            </svg>
          </span>
          <span className="font-serif text-xl font-semibold">Pustaka Senja</span>
        </Link>

        <ul className="flex items-center gap-1">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={aktif(item.href) ? "page" : undefined}
                className={`block rounded-full px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                  aktif(item.href) ? "bg-sage text-forest" : "text-brown-ink hover:bg-sage/40 hover:text-forest"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
