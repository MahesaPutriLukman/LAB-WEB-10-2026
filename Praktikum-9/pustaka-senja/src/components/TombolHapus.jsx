"use client";

import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul }) {
  return (
    <form
      action={hapusBuku.bind(null, id)}
      onSubmit={(e) => {
        // Batal di konfirmasi = form tidak dikirim, data tetap aman
        if (!window.confirm(`Hapus buku "${judul}"? Tindakan ini tidak dapat dibatalkan.`)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="rounded-full px-4 py-2 text-sm font-bold text-rose-900 ring-1 ring-rose-900/30 transition-colors hover:bg-blush/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        Hapus
      </button>
    </form>
  );
}
