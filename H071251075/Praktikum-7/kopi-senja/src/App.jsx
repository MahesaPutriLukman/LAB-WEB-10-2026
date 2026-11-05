import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

// #1.1 Data menu: satu-satunya sumber data, ditulis hanya di sini
const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const [pesanan, setPesanan] = useState([]);

  function tambahItem(id) {
    const menu = dataMenu.find((m) => m.id === id);
    if (!menu.tersedia) return;

    const sudahAda = pesanan.some((p) => p.id === id);
    if (sudahAda) {
      setPesanan(pesanan.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p)));
    } else {
      setPesanan([...pesanan, { id: id, jumlah: 1 }]);
    }
  }

  function kurangiItem(id) {
    setPesanan(
      pesanan
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0),
    );
  }

  function kosongkanPesanan() {
    setPesanan([]);
  }

  const menuTampil =
    kategoriAktif === "Semua"
      ? dataMenu
      : dataMenu.filter((m) => m.kategori === kategoriAktif);

  const itemPesanan = pesanan.map((p) => {
    const menu = dataMenu.find((m) => m.id === p.id);
    return { id: p.id, nama: menu.nama, harga: menu.harga, jumlah: p.jumlah };
  });
  const totalItem = itemPesanan.reduce((total, i) => total + i.jumlah, 0);
  const totalHarga = itemPesanan.reduce((total, i) => total + i.harga * i.jumlah, 0);

  return (
    

<main className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-3.5 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-3">

  <div className="min-w-0 lg:col-span-2">
    <MenuList
      daftarMenu={menuTampil}
      daftarKategori={daftarKategori}
      kategoriAktif={kategoriAktif}
      onPilihKategori={setKategoriAktif}
      itemPesanan={itemPesanan}
      onTambah={tambahItem}
      onKurangi={kurangiItem}
    />
  </div>

  <aside className="min-w-0 space-y-6 lg:mt-[120px]">
    <RingkasanPesanan
      itemPesanan={itemPesanan}
      totalItem={totalItem}
      totalHarga={totalHarga}
      onTambah={tambahItem}
      onKurangi={kurangiItem}
    />

    <FormPesan
      totalItem={totalItem}
      onKirim={kosongkanPesanan}
    />
  </aside>

</main>

  );
}

export default App;