function RingkasanPesanan({ itemPesanan, totalItem, totalHarga, onTambah, onKurangi }) {
  return (
    <div className="rounded-2xl border border-amber-950/10 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-amber-950">Ringkasan Pesanan</h2>
        </div>
        <span className="rounded-full bg-amber-100/80 px-2.5 py-0.5 text-xs font-bold text-amber-900">
          {totalItem} Item
        </span>
      </div>

      {itemPesanan.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-amber-200/80 bg-amber-50/50 p-4 text-center">
          <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 4 3 12h14l3-12Z" />
              <path d="M6 20a2 2 0 1 0 4 0 2 2 0 1 0-4 0Z" />
              <path d="M14 20a2 2 0 1 0 4 0 2 2 0 1 0-4 0Z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-stone-700">Pesanan masih kosong</p>
          <p className="mt-0.5 text-[11px] text-stone-500">Tekan tombol Tambah pada menu pilihan Anda</p>
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-amber-950/5 max-h-[300px] overflow-y-auto pr-1">
          {itemPesanan.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs sm:text-sm font-semibold text-stone-900">{item.nama}</p>
                <p className="text-[11px] text-stone-500">
                  Rp {item.harga.toLocaleString("id-ID")} × {item.jumlah}
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-amber-200/80 bg-amber-50/90 p-0.5">
                <button
                  onClick={() => onKurangi(item.id)}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-100 active:scale-95 transition"
                  aria-label="Kurangi"
                >
                  −
                </button>
                <span className="w-5 text-center text-xs font-bold text-amber-950">{item.jumlah}</span>
                <button
                  onClick={() => onTambah(item.id)}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-800 text-xs font-bold text-white shadow-xs hover:bg-amber-900 active:scale-95 transition"
                  aria-label="Tambah"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 space-y-1.5 border-t border-amber-950/10 pt-3 text-xs sm:text-sm">
        <div className="flex justify-between text-stone-600">
          <span>Jumlah item</span>
          <span className="font-semibold text-stone-800">{totalItem}</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-dashed border-stone-200 pt-2">
          <span className="font-bold text-stone-800">Total Harga</span>
          <span className="text-base sm:text-lg font-extrabold text-amber-950">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RingkasanPesanan;