import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "../actions";

export default function TambahBukuPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div>
        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
          Kelola Koleksi
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Tambah Buku Baru
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
          Buku yang disimpan akan langsung muncul di katalog dan tercatat pada statistik koleksi.
        </p>
      </div>
      <FormBuku action={tambahBuku} labelSubmit="Simpan Buku" batalHref="/katalog" />
    </section>
  );
}
