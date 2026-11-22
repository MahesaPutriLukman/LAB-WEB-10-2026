# Kedai Kopi Senja

Halaman pemesanan mandiri untuk tablet di meja Kedai Kopi Senja (Tugas Praktikum 7: React Hooks, State & Props).

## Menjalankan

```bash
npm install
npm run dev
```

## Teknologi

- React + Vite (function component, `useState`)
- Tailwind CSS v4 lewat plugin `@tailwindcss/vite` (tanpa PostCSS); tema di `tailwind.config.js`, dimuat dari `src/index.css` dengan `@config`

## Fitur

- Menampilkan 9 menu beserta harga, dengan filter kategori Semua / Kopi / Non-Kopi / Makanan.
- Detail setiap menu bisa dibuka sendiri-sendiri tanpa memengaruhi menu lain.
- Menu yang habis (Teh Tarik, Pisang Goreng) tidak bisa dipesan.
- Jumlah item dan total harga di navbar dan di ringkasan pesanan selalu sama, karena dihitung satu kali di `App.jsx`.
- Ringkasan pesanan bisa menambah, mengurangi, atau menghapus item.
- Form nama dan nomor meja (1–20) memberi pesan error jika data belum benar atau pesanan masih kosong.
- Setelah pesanan terkirim muncul ucapan terima kasih, lalu form dan pesanan dikosongkan.

## Struktur Komponen

| Komponen | Tugas |
| :--- | :--- |
| `App.jsx` | Data menu, state kategori aktif, pesanan, dan nama pemesan terakhir |
| `Navbar.jsx` | Judul, tombol kategori, jumlah item, dan total harga |
| `MenuList.jsx` | Menampilkan daftar `MenuCard` dengan `.map()` |
| `MenuCard.jsx` | Satu menu, state detail terbuka/tertutup, tombol Tambah |
| `RingkasanPesanan.jsx` | Daftar item yang dipesan dan totalnya |
| `FormPesan.jsx` | Input nama dan nomor meja beserta validasinya |
| `Footer.jsx` | Informasi penutup halaman |
