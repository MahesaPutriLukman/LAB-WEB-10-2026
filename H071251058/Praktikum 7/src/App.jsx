import { useState } from "react"
import Navbar from "./components/Navbar.jsx"
import MenuList from "./components/MenuList.jsx"
import RingkasanPesanan from "./components/RingkasanPesanan.jsx"
import FormPesan from "./components/FormPesan.jsx"
import Footer from "./components/Footer.jsx"

const menuKedai = [
  {id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren."},
  {id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih."},
  {id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal."},
  {id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu."},
  {id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa."},
  {id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat."},
  {id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju."},
  {id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju."},
  {id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi."},
]

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua")
  const [pesanan, setPesanan] = useState([])
  const [terkirim, setTerkirim] = useState(null)

  const menuTampil = kategoriAktif === "Semua" ? menuKedai : menuKedai.filter((menu) => menu.kategori === kategoriAktif)
  const jumlahItem = pesanan.reduce((total, item) => total + item.jumlah, 0)
  const totalHarga = pesanan.reduce((total, item) => total + item.harga * item.jumlah, 0)

  function tambahPesanan(menu) {
    setTerkirim(null)
    const sudahAda = pesanan.find((item) => item.id === menu.id)
    if (sudahAda) {
      setPesanan(pesanan.map((item) =>
        item.id === menu.id ? { ...item, jumlah: item.jumlah + 1 } : item
      ))
    } else {
      setPesanan([...pesanan, { id: menu.id, nama: menu.nama, harga: menu.harga, jumlah: 1 }])
    }
  }

  function kurangiPesanan(id) {
    const hasil = pesanan.map((item) =>
      item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item
    )
    setPesanan(hasil.filter((item) => item.jumlah > 0))
  }

  function kirimPesanan(nama, meja) {
    setTerkirim({ nama, meja })
    setPesanan([])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        jumlahItem={jumlahItem}
        totalHarga={totalHarga}
      />

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 py-8 lg:grid-cols-[1fr_22rem]">
        <MenuList daftarMenu={menuTampil} kategoriAktif={kategoriAktif} onTambah={tambahPesanan} />

        <aside className="space-y-5 lg:sticky lg:top-36 lg:self-start">
          <RingkasanPesanan
            pesanan={pesanan}
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            onTambah={tambahPesanan}
            onKurangi={kurangiPesanan}
          />

          {terkirim && (
            <div className="border-l-4 border-daun-600 bg-daun-50 px-5 py-4">
              <p className="font-display text-xl text-daun-700">Terima kasih, {terkirim.nama}.</p>
              <p className="mt-1 text-sm">Pesanan untuk meja {terkirim.meja} sedang disiapkan barista.</p>
            </div>
          )}

          <FormPesan jumlahItem={jumlahItem} totalHarga={totalHarga} onKirim={kirimPesanan} />
        </aside>
      </main>

      <Footer />
    </div>
  )
}

export default App
