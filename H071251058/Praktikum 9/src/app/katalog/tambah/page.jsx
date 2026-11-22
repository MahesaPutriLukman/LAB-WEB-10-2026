// =============================================================================
// HALAMAN FORM TAMBAH BUKU - URL "/katalog/tambah" (Server Component)
// =============================================================================
// Halaman ini menyediakan formulir khusus untuk menambahkan buku baru (CREATE).
// Saat form di-submit, data dikirim langsung ke Server Action "tambahBuku" yang
// menjalankan raw query INSERT INTO buku (...) VALUES ($1, ...) ke PostgreSQL.
// =============================================================================

import Link from "next/link";
import { tambahBuku } from "@/app/actions";

export const metadata = {
  title: "Tambah Buku Baru - Pustaka Senja",
};

export default function TambahBukuPage() {
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali ke Katalog */}
        <div className="mb-6">
          <Link
            href="/katalog"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 inline-block"
          >
            Kembali ke Katalog
          </Link>
        </div>

        {/* Header Formulir */}
        <div className="mb-8">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase tracking-wider">
            Pengelolaan Koleksi
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-2 mb-2">
            Tambah Buku Baru
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Lengkapi formulir di bawah ini untuk menambahkan koleksi buku baru
            langsung ke database PostgreSQL.
          </p>
        </div>

        {/* Formulir Tambah Buku */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <form action={tambahBuku} className="space-y-5">
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
                placeholder="Contoh: The Pragmatic Programmer"
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
                placeholder="Contoh: Andrew Hunt & David Thomas"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              >
                <option value="">-- Pilih Kategori --</option>
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
                placeholder="Contoh: 2020"
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
                placeholder="Tuliskan sinopsis lengkap buku..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              ></textarea>
            </div>

            {/* Tombol Aksi */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Link
                href="/katalog"
                className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
              >
                Simpan Buku ke Database
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
