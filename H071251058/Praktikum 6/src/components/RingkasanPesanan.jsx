export default function RingkasanPesanan({ pesanan, jumlahItem, totalHarga, onTambah, onKurangi }) {
    return (
        <section id="nota" className="scroll-mt-36 border border-krem-200 bg-krem-50 font-mono">
            <h2 className="border-b border-dashed border-kopi-300 py-4 text-center font-display text-2xl">
                Nota Pesanan
            </h2>

            {pesanan.length === 0 && (
                <p className="px-5 py-8 text-center font-sans text-sm text-kopi-500">Nota masih kosong.</p>
            )}

            <ul className="px-5">
                {pesanan.map((item) => (
                    <li key={item.id} className="flex items-center justify-between border-b border-krem-200 py-3">
                        <div>
                            <p className="font-sans font-medium">{item.nama}</p>
                            <p className="text-sm">{(item.harga * item.jumlah).toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex items-center rounded-full border border-kopi-300">
                            <button onClick={() => onKurangi(item.id)} className="h-10 w-10">−</button>
                            <span className="w-6 text-center">{item.jumlah}</span>
                            <button onClick={() => onTambah(item)} className="h-10 w-10">+</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between border-t border-dashed border-kopi-300 px-5 py-4">
                <span className="font-sans text-sm">Total · {jumlahItem} item</span>
                <span className="text-xl">Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
        </section>
    )
}
