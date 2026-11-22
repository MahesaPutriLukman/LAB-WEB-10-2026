import { notFound } from "next/navigation";
import pool from "@/lib/db";
import FormBuku from "@/components/FormBuku";
import { ubahBuku } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
  const { id } = await params;
  if (!/^\d{1,9}$/.test(id)) notFound();

  const { rows } = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
    [id]
  );
  const buku = rows[0];
  if (!buku) notFound();

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div>
        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
          Koleksi #{buku.id}
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Ubah Data Buku
        </h1>
        <p className="mt-2 text-sm text-stone-600 sm:text-base">
          Memperbarui <span className="font-semibold text-stone-800">{buku.judul}</span>.
        </p>
      </div>
      <FormBuku action={ubahBuku} buku={buku} labelSubmit="Simpan Perubahan" batalHref={`/katalog/`} />
    </section>
  );
}
