"use client";

import { useActionState } from "react";
import Link from "next/link";
import { daftarKategori } from "@/lib/kategori";

const kelasInput =
  "mt-2 w-full rounded-2xl border border-brown/30 bg-white px-4 py-3 text-forest placeholder:text-brown/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest";

// Dipakai untuk Tambah dan Edit. `aksi` adalah Server Action; `buku` (opsional) mengisi nilai awal.
export default function FormBuku({ aksi, buku, labelTombol, batalHref }) {
  const [state, formAction, pending] = useActionState(aksi, null);
  const v = state?.nilai ?? buku ?? { judul: "", penulis: "", kategori: "", tahun: "", tersedia: true, sinopsis: "" };

  return (
    <form action={formAction} noValidate className="rounded-[2rem] bg-white/70 p-6 shadow-md shadow-brown/15 ring-1 ring-brown/10 sm:p-8">
      <label className="block font-bold">
        Judul
        <input type="text" name="judul" defaultValue={v.judul} className={kelasInput} />
      </label>
      <label className="mt-5 block font-bold">
        Penulis
        <input type="text" name="penulis" defaultValue={v.penulis} className={kelasInput} />
      </label>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block font-bold">
          Kategori
          <select name="kategori" defaultValue={v.kategori} className={kelasInput}>
            <option value="">Pilih kategori</option>
            {daftarKategori.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="block font-bold">
          Tahun Terbit
          <input type="number" name="tahun" defaultValue={v.tahun} placeholder="mis. 2020" className={kelasInput} />
        </label>
      </div>
      <label className="mt-5 block font-bold">
        Status Ketersediaan
        <select name="tersedia" defaultValue={String(v.tersedia)} className={kelasInput}>
          <option value="true">Tersedia</option>
          <option value="false">Sedang Dipinjam</option>
        </select>
      </label>
      <label className="mt-5 block font-bold">
        Sinopsis
        <textarea name="sinopsis" rows={5} defaultValue={v.sinopsis} className={`${kelasInput} resize-y`} />
      </label>

      {state?.pesan && (
        <ul role="alert" className="mt-6 list-inside list-disc space-y-1 rounded-2xl bg-blush/70 px-4 py-3 text-sm font-bold text-rose-900">
          {state.pesan.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="rounded-full bg-forest px-6 py-3 font-bold text-cream shadow-md shadow-forest/20 transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:opacity-60">
          {pending ? "Menyimpan..." : labelTombol}
        </button>
        <Link href={batalHref} className="rounded-full px-5 py-3 font-bold text-brown-ink underline-offset-4 hover:underline">Batal</Link>
      </div>
    </form>
  );
}
