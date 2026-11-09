const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"]

export default function Navbar({ kategoriAktif, onPilihKategori }) {
    return (
        <header className="sticky top-0 z-10">
            <div className="border-b-4 border-senja-500 bg-kopi-900 text-krem-100">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <h1 className="font-display text-3xl italic">Kopi Senja</h1>
                </div>
            </div>

            <nav className="border-b border-krem-200 bg-krem-100">
                <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4">
                    {daftarKategori.map((kategori) => (
                        <button
                            key={kategori}
                            onClick={() => onPilihKategori(kategori)}
                            className={`border-b-2 px-3 py-3 ${kategori === kategoriAktif ? "border-senja-500 font-semibold" : "border-transparent text-kopi-500"}`}>
                            {kategori}
                        </button>
                    ))}
                </div>
            </nav>
        </header>
    )
}
