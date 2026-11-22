import Link from "next/link";

const tautan = [
  { href: "/katalog", label: "Katalog" },
  { href: "/usulan", label: "Usulan Buku" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brown/20 bg-sage/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg font-semibold">Pustaka Senja</p>
          <p className="text-sm text-brown-ink">Ruang baca komunitas dekat kampus. Datang, duduk, dan mulai membaca.</p>
        </div>
        <ul className="flex gap-5 text-sm font-bold">
          {tautan.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="underline-offset-4 hover:underline">{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-brown/10 py-3 text-center text-xs text-brown-ink">Praktikum 9 · Next.js + PostgreSQL</p>
    </footer>
  );
}
