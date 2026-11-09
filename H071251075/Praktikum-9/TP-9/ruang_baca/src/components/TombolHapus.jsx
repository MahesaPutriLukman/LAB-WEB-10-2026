"use client";

import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        if (!confirm(`Yakin hapus buku "${judul}" dari koleksi?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full px-3 py-1.5 text-xs font-bold text-rose-700 transition-all duration-200 hover:bg-rose-50 active:scale-95"
      >
        Hapus
      </button>
    </form>
  );
}
