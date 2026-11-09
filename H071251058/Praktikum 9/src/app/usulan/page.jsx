"use client";

// =============================================================================
// HALAMAN FORM USULAN BUKU - URL "/usulan" (Client Component)
// =============================================================================
// Komponen ini membutuhkan "use client" karena memiliki formulir interaktif
// (controlled component) yang mengelola input pengguna dan menampilkan riwayat
// usulan selama sesi berjalan menggunakan React Hook "useState".
//
// Alur kerja:
// 1. Setiap kolom input (nama, judul, kategori, alasan) dikontrol oleh useState.
// 2. Saat form dikirim (onSubmit), e.preventDefault() dipanggil agar halaman tidak reload.
// 3. Dilakukan validasi dengan .trim(). Jika ada kolom kosong, tampilkan pesan peringatan.
// 4. Jika validasi lolos:
//    - Tampilkan pesan sukses.
//    - Kosongkan kembali isi input form.
//    - Simpan data ke array daftarUsulan dan tampilkan di bawah formulir.
// =============================================================================

import { useState } from "react";

export default function UsulanPage() {
  // 1. State untuk masing-masing kolom input form
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");

  // 2. State untuk pesan notifikasi peringatan (error) dan pesan berhasil (sukses)
  const [pesanError, setPesanError] = useState("");
  const [pesanSukses, setPesanSukses] = useState("");

  // 3. State untuk menyimpan daftar usulan yang berhasil dikirim selama sesi ini
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  // 4. Fungsi penanganan pengiriman form
  function handleKirimUsulan(e) {
    // Mencegah browser me-reload halaman saat form di-submit
    e.preventDefault();

    // Validasi: periksa apakah ada kolom yang kosong setelah spasi dihilangkan (.trim())
    if (!nama.trim() || !judul.trim() || !kategori.trim() || !alasan.trim()) {
      setPesanError("Mohon lengkapi seluruh kolom formulir sebelum mengirim usulan.");
      setPesanSukses("");
      return; // Berhenti di sini, tidak melanjutkan proses simpan
    }

    // Jika semua kolom sudah terisi, buat objek usulan baru
    const usulanBaru = {
      id: Date.now().toString(), // Menggunakan timestamp unik sebagai key
      nama: nama.trim(),
      judul: judul.trim(),
      kategori: kategori.trim(),
      alasan: alasan.trim(),
      waktu: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Tambahkan usulan baru ke daftar usulan (usulan terbaru di urutan teratas)
    setDaftarUsulan([usulanBaru, ...daftarUsulan]);

    // Tampilkan pesan sukses dan hapus pesan error
    setPesanSukses(`Terima kasih, ${nama}! Usulan buku "${judul}" berhasil dikirim.`);
    setPesanError("");

    // Kosongkan kembali seluruh input form
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Halaman Usulan */}
        <div className="mb-8">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700 uppercase tracking-wider">
            Partisipasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-3 mb-2">
            Formulir Usulan Buku Baru
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Punya buku favorit yang belum tersedia di Pustaka Senja? Sampaikan
            rekomendasi Anda melalui formulir di bawah ini.
          </p>
        </div>

        {/* Notifikasi Peringatan (Jika ada kolom yang belum lengkap) */}
        {pesanError && (
          <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            <p className="font-semibold">Peringatan:</p>
            <p className="text-xs mt-0.5">{pesanError}</p>
          </div>
        )}

        {/* Notifikasi Sukses (Jika usulan berhasil dikirim) */}
        {pesanSukses && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            <p className="font-semibold">Berhasil:</p>
            <p className="text-xs mt-0.5">{pesanSukses}</p>
          </div>
        )}

        {/* Formulir Usulan Buku (Controlled Component) */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-12">
          <form onSubmit={handleKirimUsulan} className="space-y-5">
            {/* 1. Input Nama Pengusul */}
            <div>
              <label
                htmlFor="nama"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
              >
                Nama Pengusul <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            {/* 2. Input Judul Buku */}
            <div>
              <label
                htmlFor="judul"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
              >
                Judul Buku yang Diusulkan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: The Pragmatic Programmer"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            {/* 3. Pilihan Kategori (Dropdown Select) */}
            <div>
              <label
                htmlFor="kategori"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
              >
                Kategori Buku <span className="text-rose-500">*</span>
              </label>
              <select
                id="kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* 4. Input Alasan Usulan (Textarea) */}
            <div>
              <label
                htmlFor="alasan"
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1"
              >
                Alasan Usulan <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="alasan"
                rows="4"
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                placeholder="Mengapa buku ini layak dihadirkan di Pustaka Senja?"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              ></textarea>
            </div>

            {/* Tombol Kirim Form */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
              >
                Kirim Usulan Buku
              </button>
            </div>
          </form>
        </div>

        {/* Daftar Usulan yang Berhasil Dikirim Selama Sesi Ini */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Daftar Usulan Sesi Ini ({daftarUsulan.length})
            </h2>
            <span className="text-xs text-slate-500">Tersimpan selama sesi aktif</span>
          </div>

          {daftarUsulan.length > 0 ? (
            <div className="space-y-3">
              {daftarUsulan.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.kategori}
                    </span>
                    <span className="text-xs text-slate-400">Pukul {item.waktu} WIB</span>
                  </div>

                  <h3 className="font-semibold text-base text-slate-900 mb-1">
                    {item.judul}
                  </h3>

                  <p className="text-xs text-slate-500 mb-3">
                    Diusulkan oleh: <span className="text-slate-800 font-medium">{item.nama}</span>
                  </p>

                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                    &ldquo;{item.alasan}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 p-6">
              <p className="text-slate-400 text-sm">
                Belum ada usulan yang dikirimkan pada sesi ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
