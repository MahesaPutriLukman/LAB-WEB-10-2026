import MenuCard from "./MenuCard.jsx"

export default function MenuList({ daftarMenu, kategoriAktif, onTambah }) {
    return (
        <section>
            <h2 className="font-display text-5xl">
                {kategoriAktif === "Semua" ? "Menu hari ini" : kategoriAktif}
            </h2>
            <p className="mt-2 mb-6 text-kopi-500">Pilih menu, tekan Tambah, lalu kirim lewat nota.</p>

            <ul className="border-t border-kopi-900">
                {daftarMenu.map((menu) => (
                    <MenuCard key={menu.id} menu={menu} onTambah={onTambah} />
                ))}
            </ul>
        </section>
    )
}
