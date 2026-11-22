import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

export default function TambahBuku() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-serif text-4xl font-semibold">Tambah Buku</h1>
      <p className="mb-8 mt-3 text-lg text-brown-ink">Masukkan buku baru ke rak Pustaka Senja.</p>
      <FormBuku aksi={tambahBuku} labelTombol="Simpan Buku" batalHref="/katalog" />
    </div>
  );
}
