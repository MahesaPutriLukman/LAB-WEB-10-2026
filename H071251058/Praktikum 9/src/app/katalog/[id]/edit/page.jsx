// =============================================================================
// HALAMAN EDIT BUKU - URL "/katalog/[id]/edit" (Server Component)
// =============================================================================
// Halaman ini mengambil data buku berdasarkan parameter [id] dari PostgreSQL,
// lalu mengisi formulir secara otomatis dengan data lama (defaultValue).
//
// Saat pengguna mengubah data dan menekan "Simpan Perubahan", data dikirimkan
// ke Server Action "updateBuku" yang menjalankan query UPDATE buku SET ... WHERE id = $7.
// =============================================================================

import Link from "next/link";
import pool from "@/lib/db";
import { updateBuku } from "@/app/actions";

export const metadata = {
  title: "Edit Buku - Pustaka Senja",
};

export default async function EditBukuPage({ params }) {
  // 1. Ambil ID buku dari parameter dinamis URL
  const { id } = await params;

  // 2. Query data buku saat ini menggunakan raw SQL parameterized query ($1)
  let buku = null;
  try {
    const res = await pool.query("SELECT * FROM buku WHERE id = $1;", [id]);
    buku = res.rows[0] || null;
  } catch (error) {
    console.error("Gagal mengambil data buku untuk diedit:", error.message);
  }

  // 3. Jika ID tidak valid atau buku tidak ditemukan
  if (!buku) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Buku Tidak Ditemukan
          </h1>
          <p className="text-slate-600 text-sm mb-6">
            Buku dengan ID &ldquo;{id}&rdquo; tidak dapat ditemukan untuk diedit.
          </p>
          <Link
            href="/katalog"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // 4. Render Formulir Edit Terisi Data Buku Lama
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali ke Detail Buku */}
        <div className="mb-6">
          <Link
            href={`/katalog/${buku.id}`}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 inline-block"
          >
            Batal dan Kembali ke Detail Buku
          </Link>
        </div>

        {/* Header Halaman Edit */}
        <div className="mb-8">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase tracking-wider">
            Update Data
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-2 mb-2">
            Edit Data Buku: {buku.judul}
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Perbarui informasi buku di bawah ini. Perubahan akan disimpan secara
            langsung ke tabel buku di PostgreSQL.
          </p>
        </div>

        {/* Formulir Edit Buku */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <form action={updateBuku} className="space-y-5">
            {/* ID Buku Tersembunyi (Hidden Input) untuk klausa WHERE id = $7 */}
            <input type="hidden" name="id" value={buku.id} />

            {/* Input Judul Buku */}
            <div>
              <label
                htmlFor="judul"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Judul Buku <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                required
                defaultValue={buku.judul}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            {/* Input Penulis */}
            <div>
              <label
                htmlFor="penulis"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Penulis <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="penulis"
                name="penulis"
                required
                defaultValue={buku.penulis}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            {/* Pilihan Kategori */}
            <div>
              <label
                htmlFor="kategori"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                id="kategori"
                name="kategori"
                required
                defaultValue={buku.kategori}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              >
                <option value="Teknologi">Teknologi</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Input Tahun Terbit */}
            <div>
              <label
                htmlFor="tahun"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Tahun Terbit <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                id="tahun"
                name="tahun"
                required
                min="1800"
                max="2100"
                defaultValue={buku.tahun}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            {/* Pilihan Status Ketersediaan */}
            <div>
              <label
                htmlFor="tersedia"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Status Ketersediaan <span className="text-rose-500">*</span>
              </label>
              <select
                id="tersedia"
                name="tersedia"
                required
                defaultValue={buku.tersedia ? "true" : "false"}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              >
                <option value="true">Tersedia di Ruang Baca</option>
                <option value="false">Sedang Dipinjam</option>
              </select>
            </div>

            {/* Textarea Sinopsis */}
            <div>
              <label
                htmlFor="sinopsis"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Sinopsis Buku <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="sinopsis"
                name="sinopsis"
                required
                rows="4"
                defaultValue={buku.sinopsis}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              ></textarea>
            </div>

            {/* Tombol Aksi */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Link
                href={`/katalog/${buku.id}`}
                className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
              >
                Simpan Perubahan (Update)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
