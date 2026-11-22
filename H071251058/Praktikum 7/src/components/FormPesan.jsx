import { useState } from "react"

export default function FormPesan({ jumlahItem, totalHarga, onKirim }) {
    const [nama, setNama] = useState("")
    const [meja, setMeja] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e) {
        e.preventDefault() // supaya halaman tidak reload

        // Jika ada yang salah: tampilkan pesan, lalu berhenti (return)
        if (jumlahItem === 0) { setError("Pesanan masih kosong."); return }
        if (nama.trim() === "") { setError("Nama wajib diisi."); return }
        if (meja < 1 || meja > 20) { setError("Nomor meja harus 1 sampai 20."); return }

        onKirim(nama.trim(), meja)
        setNama("")
        setMeja("")
        setError("")
    }

    const gayaInput = "mb-4 h-12 w-full rounded-md border border-kopi-300 bg-white px-3"

    return (
        <form onSubmit={handleSubmit} className="border border-krem-200 bg-krem-50 p-5">
            <h2 className="mb-4 font-display text-xl">Siapa yang memesan?</h2>

            <label htmlFor="nama" className="mb-1 block text-sm">Nama</label>
            <input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} className={gayaInput} />

            <label htmlFor="meja" className="mb-1 block text-sm">Nomor meja</label>
            <input id="meja" type="number" value={meja} onChange={(e) => setMeja(e.target.value)} className={gayaInput} />

            {error && <p className="mb-4 bg-senja-100 px-3 py-2 text-sm text-senja-700">{error}</p>}

            <button type="submit" className="w-full rounded-full bg-senja-600 py-3 font-semibold text-white hover:bg-senja-700">
                Kirim · Rp {totalHarga.toLocaleString("id-ID")}
            </button>
        </form>
    )
}
