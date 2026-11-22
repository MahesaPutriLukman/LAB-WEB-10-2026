import { useState } from "react"

export default function MenuCard({ menu, onTambah }) {
    // State milik kartu ini saja, jadi membuka detail tidak memengaruhi kartu lain
    const [detailTerbuka, setDetailTerbuka] = useState(false)

    return (
        <li className="flex items-start gap-4 border-b border-krem-200 py-5">
            <div className="flex-1">
                <div className={`flex items-baseline ${menu.tersedia ? "" : "text-kopi-500"}`}>
                    <h3 className="font-display text-2xl">{menu.nama}</h3>
                    <span className="mx-3 flex-1 border-b-2 border-dotted border-kopi-300"></span>
                    <span className="font-medium">Rp {menu.harga.toLocaleString("id-ID")}</span>
                </div>

                <button onClick={() => setDetailTerbuka(!detailTerbuka)} className="mt-1 text-sm text-kopi-500">
                    {detailTerbuka ? "Tutup detail ▴" : "Lihat detail ▾"}
                </button>
                {detailTerbuka && <p className="mt-1 font-display italic">{menu.deskripsi}</p>}
            </div>

            <button
                onClick={() => onTambah(menu)}
                disabled={!menu.tersedia}
                className="min-w-28 rounded-full bg-kopi-900 py-3 text-sm font-semibold text-krem-50 hover:bg-senja-600 disabled:border disabled:border-dashed disabled:border-kopi-300 disabled:bg-transparent disabled:text-kopi-500"
            >
                {menu.tersedia ? "Tambah" : "Habis"}
            </button>
        </li>
    )
}
