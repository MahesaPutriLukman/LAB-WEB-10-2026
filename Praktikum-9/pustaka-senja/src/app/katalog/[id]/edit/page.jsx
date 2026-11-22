import FormBuku from "@/components/FormBuku";
import BukuTidakDitemukan from "@/components/BukuTidakDitemukan";
import { bukuById } from "@/lib/buku";
import { ubahBuku } from "@/app/katalog/actions";

export const dynamic = "force-dynamic";

export default async function EditBuku({ params }) {
  const { id } = await params;
  const buku = await bukuById(id);

  if (!buku) return <BukuTidakDitemukan id={id} />;

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-serif text-4xl font-semibold">Edit Buku</h1>
      <p className="mb-8 mt-3 text-lg text-brown-ink">Ubah informasi untuk “{buku.judul}”.</p>
      <FormBuku aksi={ubahBuku.bind(null, id)} buku={buku} labelTombol="Simpan Perubahan" batalHref={`/katalog/${id}`} />
    </div>
  );
}
