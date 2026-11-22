"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan", path: "/usulan" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fbf9f5]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="group flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-900 text-amber-100 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="block font-serif text-lg font-bold tracking-tight text-stone-900 transition-colors group-hover:text-amber-900 sm:text-xl">
              Pustaka Senja
            </span>
            <span className="block text-xs font-normal tracking-wide text-stone-500">
              Ruang Baca &amp; Komunitas Literasi
            </span>
          </div>
        </div>

        <ul className="flex items-center gap-1.5 sm:gap-2">
          {daftarMenu.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-amber-900 text-amber-50 shadow-sm shadow-amber-900/20"
                      : "text-stone-600 hover:bg-amber-100/70 hover:text-amber-950"
                  }`}
                >
                  {item.nama}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
