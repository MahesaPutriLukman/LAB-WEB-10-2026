"use client";

import { useActionState } from "react";
import Link from "next/link";

const KATEGORI = ["Teknologi", "Fiksi", "Pengembangan Diri", "Bebas"];

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-4 focus:ring-amber-900/10";
const labelClass = "mb-1.5 block text-sm font-semibold text-stone-700";

export default function FormBuku({ action, buku, labelSubmit, batalHref }) {
  const [state, formAction, pending] = useActionState(action, null);
  const nilai = (kunci, awal = "") => state?.values?.[kunci] ?? (buku ? String(buku[kunci]) : awal);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm sm:p-8"
    >
      {state?.error && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm font-medium text-rose-800">
          <span aria-hidden="true">⚠️</span>
          <p>{state.error}</p>
        </div>
      )}

      {buku && <input type="hidden" name="id" value={buku.id} />}

      <div>
        <label htmlFor="judul" className={labelClass}>Judul buku</label>
        <input id="judul" name="judul" type="text" required maxLength={150} defaultValue={nilai("judul")} placeholder="Contoh: Filosofi Teras" className={inputClass} />
      </div>

      <div>
        <label htmlFor="penulis" className={labelClass}>Penulis</label>
        <input id="penulis" name="penulis" type="text" required maxLength={100} defaultValue={nilai("penulis")} placeholder="Contoh: Henry Manampiring" className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="kategori" className={labelClass}>Kategori</label>
          <select id="kategori" name="kategori" required defaultValue={nilai("kategori")} className={inputClass}>
            <option value="" disabled>Pilih kategori</option>
            {KATEGORI.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tahun" className={labelClass}>Tahun terbit</label>
          <input id="tahun" name="tahun" type="number" required defaultValue={nilai("tahun")} placeholder="2024" className={inputClass} />
        </div>
        <div>
          <label htmlFor="tersedia" className={labelClass}>Status</label>
          <select id="tersedia" name="tersedia" defaultValue={nilai("tersedia", "true")} className={inputClass}>
            <option value="true">Tersedia</option>
            <option value="false">Sedang dipinjam</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="sinopsis" className={labelClass}>Sinopsis</label>
        <textarea id="sinopsis" name="sinopsis" rows={5} required defaultValue={nilai("sinopsis")} placeholder="Ringkasan singkat isi buku..." className={`${inputClass} resize-y leading-relaxed`} />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
        <Link href={batalHref} className="rounded-full px-6 py-3 text-center text-sm font-semibold text-stone-600 transition-all duration-200 hover:bg-stone-100">
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-amber-900 px-7 py-3 text-sm font-bold text-white shadow-md shadow-amber-950/20 transition-all duration-200 hover:bg-amber-800 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Menyimpan..." : labelSubmit}
        </button>
      </div>
    </form>
  );
}
