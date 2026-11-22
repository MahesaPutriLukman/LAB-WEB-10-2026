"use client";

// =============================================================================
// KOMPONEN TOMBOL HAPUS (Client Component)
// =============================================================================
// Komponen ini membutuhkan "use client" karena menjalankan fungsi interaktif browser
// berupa dialog konfirmasi (window.confirm) sebelum data buku benar-benar dihapus.
//
// Alur kerja:
// 1. Saat tombol ditekan, dialog konfirmasi muncul.
// 2. Jika pengguna menekan "Batal", e.preventDefault() membatalkan pengiriman form.
// 3. Jika pengguna menekan "OK", form dikirim ke Server Action "hapusBuku".
// =============================================================================

import { hapusBuku } from "@/app/actions";

export default function TombolHapus({ id, judulBuku }) {
  function handleKonfirmasiHapus(e) {
    const konfirmasi = window.confirm(
      `Apakah Anda yakin ingin menghapus buku "${judulBuku}"?\n\nData yang dihapus akan hilang secara permanen dari database PostgreSQL.`
    );

    // Jika pengguna membatalkan, cegah pengiriman form
    if (!konfirmasi) {
      e.preventDefault();
    }
  }

  return (
    <form action={hapusBuku} onSubmit={handleKonfirmasiHapus} className="inline-block">
      {/* Mengirimkan id buku secara tersembunyi ke Server Action */}
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 transition-colors"
        title={`Hapus buku ${judulBuku}`}
      >
        {/* Ikon Tempat Sampah (SVG) */}
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>Hapus</span>
      </button>
    </form>
  );
}
