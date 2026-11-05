import fotoKopi from "../assets/galeri/kopi.jpg";
import fotoNonKopi from "../assets/galeri/non_kopi.jpg";
import fotoMakanan from "../assets/galeri/makanan.jpg";

const fotoKategori = {Kopi: fotoKopi, "Non-Kopi": fotoNonKopi, Makanan: fotoMakanan};

function MenuCard({ menu, jumlah, onTambah, onKurangi }) {
  
  const { id, nama, kategori, harga, tersedia, deskripsi } = menu;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-white p-3 sm:p-4 transition-all duration-300 ${
        tersedia
          ? "border-amber-950/10 shadow-xs hover:-translate-y-0.5 hover:border-amber-700/30 hover:shadow-md"
          : "border-stone-200/70 bg-stone-50/60 opacity-75"
      }`}
    >
      <div className="relative mb-2.5 sm:mb-3 aspect-4/3 w-full overflow-hidden rounded-xl bg-amber-50/70">
        <img
          src={fotoKategori[kategori]}
          alt={nama}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            tersedia ? "" : "grayscale"
          }`}
        />
        <span className="absolute bottom-2 left-2 rounded-md bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-amber-900 shadow-xs">
          {kategori}
        </span>
        {!tersedia && (
          <span className="absolute top-2 right-2 rounded-md bg-stone-900/80 backdrop-blur-xs px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white">
            Habis
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5 sm:gap-1">
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-stone-900 leading-snug line-clamp-1">
          {nama}
        </h3>
        <p className="text-xs sm:text-sm font-extrabold text-amber-900">
          Rp {harga.toLocaleString("id-ID")}
        </p>
      </div>

      <p className="mt-1 text-[11px] sm:text-xs text-stone-500 line-clamp-2 leading-relaxed">
        {deskripsi}
      </p>

      <div className="mt-auto pt-3">
        {!tersedia ? (
          <button
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-stone-100 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-stone-400 border border-stone-200"
          >
            Habis
          </button>
        ) : jumlah === 0 ? (
          <button
            onClick={() => onTambah(id)}
            className="flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition duration-200 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" x2="12" y1="5" y2="19" />
              <line x1="5" x2="19" y1="12" y2="12" />
            </svg>
            <span>Tambah</span>
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-xl bg-amber-50/90 border border-amber-200/80 p-1">
            <button
              onClick={() => onKurangi(id)}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white text-base font-bold text-amber-900 shadow-xs hover:bg-amber-100 active:scale-95 transition"
              aria-label="Kurangi"
            >
              −
            </button>
            <span className="text-xs sm:text-sm font-extrabold text-amber-950 px-1">
              {jumlah}
            </span>
            <button
              onClick={() => onTambah(id)}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-amber-800 hover:bg-amber-900 text-base font-bold text-white shadow-xs active:scale-95 transition"
              aria-label="Tambah"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuCard;