# Pustaka Senja - Ruang Baca & Perpustakaan Komunitas

Aplikasi multi-halaman untuk ruang baca komunitas **Pustaka Senja** yang dibangun menggunakan **Next.js (App Router)** dan **Tailwind CSS** sesuai spesifikasi Tugas Praktikum 8 Framework React.

## Fitur Utama

- **F1. Root Layout & Navigasi Bersama**:
  - `Navbar` dan `Footer` mengapit seluruh halaman tanpa reload konten statis.
  - Tautan navigasi menggunakan `next/link`.
  - Indikator menu aktif otomatis menggunakan `usePathname()` dari `next/navigation` (termasuk menandai menu Katalog saat berada di `/katalog/[id]`).
- **F2. Halaman Beranda (`/`)**:
  - Banner `Hero` yang menerima props (nama ruang baca, slogan, lokasi, dan jam buka).
  - Statistik dinamis: total koleksi buku, buku tersedia, dan buku sedang dipinjam yang dihitung langsung dari `dataBuku`.
  - Tombol navigasi cepat menuju `/katalog` dan `/usulan`.
- **F3. Halaman Katalog Buku (`/katalog`)**:
  - Daftar buku menggunakan komponen `BukuCard`.
  - Filter kategori (*Semua*, *Teknologi*, *Fiksi*, *Pengembangan Diri*) berbasis `useState`.
  - Tombol favorit mandiri per kartu dengan `useState`.
  - Tautan menuju halaman detail buku.
- **F4. Halaman Detail Buku Dinamis (`/katalog/[id]`)**:
  - Dynamic Routing membaca parameter `id` (`await params`).
  - Menampilkan informasi lengkap dan sinopsis buku.
  - Penanganan kondisi buku tidak ditemukan (misal `/katalog/99`) lengkap dengan tautan kembali ke katalog.
- **F5. Halaman Usulan Buku (`/usulan`)**:
  - Formulir terkontrol (*controlled component* dengan `useState`).
  - Validasi kolom kosong dengan `.trim()`.
  - Notifikasi sukses/peringatan dan daftar riwayat usulan buku sesi berjalan.

## Struktur Berkas

```text
pustaka-senja/
├── public/
├── package.json
├── next.config.mjs
├── README.md
└── src/
    ├── data/
    │   └── dataBuku.js             # Satu sumber data (9 objek buku)
    ├── components/
    │   ├── Navbar.jsx              # Navigasi (<Link> & usePathname, "use client")
    │   ├── Hero.jsx                # Banner halaman beranda (Server Component)
    │   ├── BukuCard.jsx            # Kartu buku + tombol favorit ("use client")
    │   └── Footer.jsx              # Footer bersama (Server Component)
    └── app/
        ├── globals.css             # Konfigurasi Tailwind CSS
        ├── layout.jsx              # Root Layout (Navbar + {children} + Footer)
        ├── page.jsx                # Route "/" (Beranda + statistik koleksi)
        ├── katalog/
        │   ├── page.jsx            # Route "/katalog" (Filter kategori + daftar buku)
        │   └── [id]/
        │       └── page.jsx        # Route "/katalog/[id]" (Detail buku dinamis)
        └── usulan/
            └── page.jsx            # Route "/usulan" (Form usulan buku)
```

## Menjalankan Proyek

1. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
2. Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

3. **Build untuk produksi:**
   ```bash
   npm run build
   ```
