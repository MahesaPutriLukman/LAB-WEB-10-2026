"use client";

import { useState } from "react";

const kategoriOpsi = ["Teknologi", "Fiksi", "Pengembangan Diri"];
const formAwal = { nama: "", judul: "", kategori: "", alasan: "" };
const labelField = { nama: "Nama Pengusul", judul: "Judul Buku", kategori: "Kategori", alasan: "Alasan Usulan" };

const inputKelas =
  "mt-2 w-full rounded-2xl border border-brown/30 bg-white px-4 py-3 text-forest placeholder:text-brown/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-forest";

export default function Usulan() {
  const [form, setForm] = useState(formAwal);
  const [pesan, setPesan] = useState(null);
  const [daftar, setDaftar] = useState([]);
  const [kategoriLihat, setKategoriLihat] = useState(kategoriOpsi[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const kosong = Object.keys(labelField).filter((k) => form[k].trim() === "");
    if (kosong.length > 0) {
      setPesan({ tipe: "peringatan", teks: `Lengkapi dulu kolom berikut: ${kosong.map((k) => labelField[k]).join(", ")}.` });
      return;
    }
    const baru = {
      id: `usulan-${Date.now()}`,
      nama: form.nama.trim(),
      judul: form.judul.trim(),
      kategori: form.kategori,
      alasan: form.alasan.trim(),
    };
    setDaftar((prev) => [baru, ...prev]);
    setKategoriLihat(baru.kategori);
    setForm(formAwal);
    setPesan({ tipe: "sukses", teks: "Terima kasih! Usulanmu sudah terkirim." });
  };

  const daftarTampil = daftar.filter((u) => u.kategori === kategoriLihat);

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-serif text-4xl font-semibold">Usulan Buku</h1>
      <p className="mt-3 text-lg text-brown-ink">Ada buku yang ingin kamu temukan di rak Pustaka Senja? Ceritakan di sini.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 rounded-[2rem] bg-white/70 p-6 shadow-md shadow-brown/15 ring-1 ring-brown/10 sm:p-8">
        <label className="block font-bold">
          Nama Pengusul
          <input type="text" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama kamu" className={inputKelas} />
        </label>
        <label className="mt-5 block font-bold">
          Judul Buku
          <input type="text" name="judul" value={form.judul} onChange={handleChange} placeholder="Judul buku yang diusulkan" className={inputKelas} />
        </label>
        <label className="mt-5 block font-bold">
          Kategori
          <select name="kategori" value={form.kategori} onChange={handleChange} className={inputKelas}>
            <option value="">Pilih kategori</option>
            {kategoriOpsi.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="mt-5 block font-bold">
          Alasan Usulan
          <textarea name="alasan" value={form.alasan} onChange={handleChange} rows={4} placeholder="Kenapa buku ini layak ada di Pustaka Senja?" className={`${inputKelas} resize-y`} />
        </label>

        {pesan && (
          <p
            role={pesan.tipe === "peringatan" ? "alert" : "status"}
            className={`mt-6 rounded-2xl px-4 py-3 text-sm font-bold ${pesan.tipe === "peringatan" ? "bg-blush/70 text-rose-900" : "bg-sage/70 text-forest"}`}
          >
            {pesan.teks}
          </p>
        )}

        <button type="submit" className="mt-6 w-full rounded-full bg-forest px-6 py-3 font-bold text-cream shadow-md shadow-forest/20 transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:w-auto">
          Kirim Usulan
        </button>
      </form>

      <section className="mt-12" aria-labelledby="judul-daftar">
        <h2 id="judul-daftar" className="font-serif text-2xl font-semibold">Usulan yang terkirim</h2>
        <p className="mt-1 text-sm font-semibold text-brown-ink">Total {daftar.length} usulan pada sesi ini</p>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Lihat usulan per kategori">
          {kategoriOpsi.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKategoriLihat(k)}
              aria-pressed={kategoriLihat === k}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                kategoriLihat === k ? "bg-forest text-cream" : "bg-white/70 text-brown-ink ring-1 ring-brown/20 hover:bg-sage/40"
              }`}
            >
              {k} ({daftar.filter((u) => u.kategori === k).length})
            </button>
          ))}
        </div>

        {daftarTampil.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-brown/40 px-4 py-6 text-center text-brown-ink">Belum ada usulan untuk kategori {kategoriLihat}.</p>
        ) : (
          <ul className="mt-4 max-h-[28rem] space-y-4 overflow-y-auto pr-1">
            {daftarTampil.map((u) => (
              <li key={u.id} className="rounded-3xl bg-peach/30 p-5">
                <p className="font-serif text-lg font-semibold">{u.judul}</p>
                <p className="text-sm font-semibold text-brown-ink">Diusulkan oleh {u.nama}</p>
                <p className="mt-2 leading-relaxed">{u.alasan}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
