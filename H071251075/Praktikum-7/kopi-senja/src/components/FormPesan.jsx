import { useState } from "react";

function FormPesan({ totalItem, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [galat, setGalat] = useState({});
  const [namaTerkirim, setNamaTerkirim] = useState("");

  // #6.2 Handler submit: validasi dulu, baru kirim
  function handleSubmit(e) {
    e.preventDefault();
    const galatBaru = {};

    if (nama.trim() === "") {
      galatBaru.nama = "Nama wajib diisi.";
    }
    if (meja.trim() === "") {
      galatBaru.meja = "Nomor meja wajib diisi.";
    } else if (!/^[1-9][0-9]*$/.test(meja.trim())) {
      galatBaru.meja = "Nomor meja harus berupa angka lebih dari 0.";
    }
    if (totalItem === 0) {
      galatBaru.pesanan = "Pesanan masih kosong. Pilih minimal satu menu.";
    }

    setGalat(galatBaru);

    if (Object.keys(galatBaru).length > 0) {
      setNamaTerkirim("");
      return;
    }

    onKirim();
    setNamaTerkirim(nama.trim());
    setNama("");
    setMeja("");
  }

  function kelasInput(ada) {
    return `mt-1 w-full rounded-xl border px-3.5 py-2 text-xs sm:text-sm transition-all outline-none focus:ring-2 ${
      ada
        ? "border-rose-400 bg-rose-50/50 text-rose-900 focus:border-rose-500 focus:ring-rose-200"
        : "border-stone-200 bg-white text-stone-800 hover:border-stone-300 focus:border-amber-700 focus:ring-amber-200/60"
    }`;
  }

  return (
    <section className="rounded-2xl border border-amber-950/10 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-amber-950">Data Pemesan</h2>
      </div>

      {namaTerkirim !== "" && (
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs sm:text-sm text-emerald-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div>
            <p className="font-bold">Pesanan Berhasil!</p>
            <p className="text-xs text-emerald-800 mt-0.5">
              Terima kasih <span className="font-semibold underline">{namaTerkirim}</span>! Pesanan Anda sudah kami terima dan segera disiapkan.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
        <div>
          <label className="text-xs sm:text-sm font-semibold text-stone-700">
            Nama Lengkap
          </label>
          
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Jefri Nichol"
            className={kelasInput(galat.nama)}
          />
          {galat.nama && (
            <p className="mt-1 flex items-center gap-1 text-[11px] sm:text-xs font-medium text-rose-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span>{galat.nama}</span>
            </p>
          )}
        </div>

        <div>
          <label className="text-xs sm:text-sm font-semibold text-stone-700">
            Nomor Meja
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={meja}
            onChange={(e) => setMeja(e.target.value)}
            placeholder="Contoh: 5"
            className={kelasInput(galat.meja)}
          />
          {galat.meja && (
            <p className="mt-1 flex items-center gap-1 text-[11px] sm:text-xs font-medium text-rose-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span>{galat.meja}</span>
            </p>
          )}
        </div>

        {galat.pesanan && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs font-medium text-rose-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span>{galat.pesanan}</span>
          </div>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-stone-900 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-sm shadow-amber-900/15 transition-all duration-200 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" x2="11" y1="2" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <span>Kirim Pesanan</span>
        </button>
      </form>
    </section>
  );
}

export default FormPesan;