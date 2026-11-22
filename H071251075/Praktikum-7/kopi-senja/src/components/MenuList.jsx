import MenuCard from "./MenuCard.jsx";

function MenuList({daftarMenu, daftarKategori, kategoriAktif, onPilihKategori, itemPesanan, onTambah, onKurangi}) {
  return (
    
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-amber-950">Menu Pilihan</h2>
          <p className="text-xs text-stone-500">Pilih minuman & santapan favorit untuk menemani waktu santai Anda</p>
        </div>
        
        <span className="w-fit rounded-full bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-900">
          {daftarMenu.length} Menu
        </span>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            onClick={() => onPilihKategori(kategori)}
            className={
              kategori === kategoriAktif
                ? "rounded-full bg-gradient-to-r from-amber-800 to-amber-900 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm ring-2 ring-amber-900/20 transition-all duration-200"
                : "rounded-full border border-amber-950/10 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-stone-600 hover:border-amber-700/30 hover:bg-amber-50/70 hover:text-amber-950 transition-all duration-200"
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {daftarMenu.map((menu) => {
          const dipesan = itemPesanan.find((i) => i.id === menu.id);
          const jumlah = dipesan ? dipesan.jumlah : 0;
          
          return (
            <MenuCard
              key={menu.id}
              menu={menu}
              jumlah={jumlah}
              onTambah={onTambah}
              onKurangi={onKurangi}
            />
          );
        })}
      </div>
    </div>
  );
}
export default MenuList;