"use client";

import { useState } from "react";

const formAwal = {
  nama: "",
  judul: "",
  kategori: "",
  alasan: "",
};

export default function UsulanPage() {
  const [form, setForm] = useState(formAwal);
  const [peringatan, setPeringatan] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((formSebelumnya) => ({ ...formSebelumnya, [name]: value }));
    setPeringatan("");
    setKonfirmasi("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nama = form.nama.trim();
    const judul = form.judul.trim();
    const kategori = form.kategori.trim();
    const alasan = form.alasan.trim();

    if (!nama || !judul || !kategori || !alasan) {
      setPeringatan("Mohon lengkapi semua kolom formulir sebelum mengirim usulan.");
      setKonfirmasi("");
      return;
    }

    const usulanBaru = {
      id: `${Date.now()}-${judul.toLowerCase().replace(/\s+/g, "-")}`,
      nama,
      judul,
      kategori,
      alasan,
      waktu: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setDaftarUsulan((usulanSebelumnya) => [usulanBaru, ...usulanSebelumnya]);
    setForm(formAwal);
    setPeringatan("");
    setKonfirmasi(
      `Terima kasih, ${nama}! Usulan buku "${judul}" berhasil dikirim dan dicatat.`
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-10">
      <div>
        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
          Bantu Isi Rak Kami
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Usulkan Buku Baru
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
          Punya rekomendasi bacaan yang bermakna? Ceritakan kepada kami buku apa
          yang sebaiknya hadir di rak Pustaka Senja berikutnya.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm sm:p-8"
      >
        {peringatan && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm font-medium text-rose-800"
          >
            <span className="text-lg">⚠️</span>
            <div className="flex-1">{peringatan}</div>
          </div>
        )}

        {konfirmasi && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm font-medium text-emerald-900"
          >
            <span className="text-lg">✅</span>
            <div className="flex-1">{konfirmasi}</div>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label
              htmlFor="nama"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700"
            >
              Nama Pengusul <span className="text-amber-700">*</span>
            </label>
            <input
              id="nama"
              name="nama"
              type="text"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Andi Pratama"
              className="w-full rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-4 focus:ring-amber-900/10"
            />
          </div>

          <div>
            <label
              htmlFor="judul"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700"
            >
              Judul Buku yang Diusulkan <span className="text-amber-700">*</span>
            </label>
            <input
              id="judul"
              name="judul"
              type="text"
              value={form.judul}
              onChange={handleChange}
              placeholder="Contoh: The Psychology of Money"
              className="w-full rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-4 focus:ring-amber-900/10"
            />
          </div>

          <div>
            <label
              htmlFor="kategori"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700"
            >
              Kategori Buku <span className="text-amber-700">*</span>
            </label>
            <select
              id="kategori"
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-amber-700 focus:bg-white focus:ring-4 focus:ring-amber-900/10"
            >
              <option value="">-- Pilih salah satu kategori --</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Fiksi">Fiksi</option>
              <option value="Pengembangan Diri">Pengembangan Diri</option>
            </select>
          </div>

          {/* Alasan */}
          <div>
            <label
              htmlFor="alasan"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-700"
            >
              Alasan Rekomendasi <span className="text-amber-700">*</span>
            </label>
            <textarea
              id="alasan"
              name="alasan"
              rows={4}
              value={form.alasan}
              onChange={handleChange}
              placeholder="Ceritakan mengapa buku ini layak dibaca dan dihadirkan di Pustaka Senja..."
              className="w-full resize-y rounded-xl border border-stone-200 bg-[#faf8f5] px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:bg-white focus:ring-4 focus:ring-amber-900/10"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-stone-400">
            Kolom bertanda <span className="text-amber-700">*</span> wajib diisi.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-900 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-amber-950/20 transition-all duration-200 hover:bg-amber-800 hover:shadow-lg active:scale-95"
          >
            <span>Kirim Usulan Buku</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>

      {/* Submitted suggestions list */}
      <section aria-labelledby="daftar-usulan-heading" className="space-y-4">
        <div className="flex items-end justify-between gap-3 border-b border-stone-200/80 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Suara Pembaca
            </span>
            <h2
              id="daftar-usulan-heading"
              className="mt-1 font-serif text-2xl font-bold text-stone-900"
            >
              Usulan yang Terkirim Sesi Ini
            </h2>
          </div>
          <span className="rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold text-amber-900">
            {daftarUsulan.length} usulan
          </span>
        </div>

        {daftarUsulan.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white/60 px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
              ✍️
            </div>
            <p className="mt-3 font-semibold text-stone-700">
              Belum ada usulan pada sesi ini.
            </p>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-stone-500">
              Jadilah orang pertama yang mengusulkan bacaan menarik untuk melengkapi koleksi kami di atas!
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-screen overflow-y-auto">
            {daftarUsulan.map((usulan) => (
              <div
                key={usulan.id}
                className="group relative rounded-2xl border border-stone-200/90 bg-white p-5 shadow-xs transition hover:border-amber-300 hover:shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-900 text-sm font-bold text-amber-100">
                      {usulan.nama.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {usulan.judul}
                      </h3>
                      <p className="text-xs text-stone-500">
                        Diusulkan oleh{" "}
                        <span className="font-semibold text-stone-700">
                          {usulan.nama}
                        </span>
                        {usulan.waktu && ` • pukul ${usulan.waktu}`}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
                    {usulan.kategori}
                  </span>
                </div>

                <div className="mt-3.5 rounded-xl bg-stone-50 px-4 py-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
                  <span className="font-semibold text-stone-700">Alasan: </span>
                  {usulan.alasan}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
