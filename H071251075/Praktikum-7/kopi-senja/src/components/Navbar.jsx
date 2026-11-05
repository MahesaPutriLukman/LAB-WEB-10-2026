function Navbar({ totalItem, totalHarga }) {
  return (
    <header className="sticky top-0 z-20 border-b border-amber-950/10 bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-amber-50 shadow-sm shadow-amber-900/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" x2="6" y1="2" y2="4" />
              <line x1="10" x2="10" y1="2" y2="4" />
              <line x1="14" x2="14" y1="2" y2="4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold leading-tight tracking-tight text-amber-950">
              Kedai Kopi Senja
            </h1>
            <p className="text-[11px] sm:text-xs font-medium text-stone-500">
              Pesan langsung dari meja Anda
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/70 px-3 py-1.5 sm:px-4 sm:py-2 text-right transition-all">
          <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-medium text-stone-500">
              Pesanan: <span className="font-bold text-amber-900">{totalItem}</span> item
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-amber-950">
              Rp {totalHarga.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;