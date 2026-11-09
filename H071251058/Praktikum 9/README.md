# Pustaka Senja - Ruang Baca & Perpustakaan Komunitas

Aplikasi ruang baca komunitas **Pustaka Senja** yang dibangun menggunakan **Next.js (App Router)**, **PostgreSQL**, dan **Tailwind CSS** sesuai spesifikasi Tugas Praktikum 8 & 9 Framework React.

## Fitur Praktikum 9 (Data Fetching & PostgreSQL)

- **F1. Integrasi PostgreSQL & Raw SQL**:
  - Menggunakan driver `pg` dengan `Pool` pada `src/lib/db.js`.
  - Seluruh operasi database menggunakan **Raw SQL** tanpa ORM (Prisma/Sequelize tidak digunakan).
  - Menggunakan **Parameterized Query** (`$1`, `$2`, ...) pada setiap nilai dinamis untuk mencegah SQL Injection.
  - Nilai koneksi disimpan di `.env.local` melalui variabel `DATABASE_URL`.
- **F2. Read - Menampilkan Data Koleksi**:
  - **Beranda (`/`)**: Menghitung statistik koleksi secara real-time dari PostgreSQL (`COUNT(*)` total, buku tersedia, dan buku dipinjam).
  - **Katalog (`/katalog`)**: Menampilkan daftar buku dari PostgreSQL dengan query `SELECT * FROM buku ORDER BY id ASC`. Menyediakan filter kategori dengan parameterized query `SELECT * FROM buku WHERE kategori = $1`.
  - **Detail Buku (`/katalog/[id]`)**: Mengambil detail satu buku dengan query `SELECT * FROM buku WHERE id = $1`. Menampilkan informasi lengkap dan penanganan jika ID tidak ditemukan.
- **F3. Create - Menambahkan Buku**:
  - Formulir tambah buku tersedia di `/katalog` (panel cepat) dan halaman khusus `/katalog/tambah`.
  - Menggunakan Server Action `tambahBuku` dengan raw SQL `INSERT INTO buku (...) VALUES ($1, $2, $3, $4, $5, $6)`.
- **F4. Update - Mengubah Data Buku**:
  - Halaman edit dinamis di `/katalog/[id]/edit` yang memuat data buku lama ke form.
  - Menggunakan Server Action `updateBuku` dengan raw SQL `UPDATE buku SET ... WHERE id = $7`.
- **F5. Delete - Menghapus Data Buku**:
  - Komponen `TombolHapus` dengan dialog konfirmasi browser (`window.confirm`) sebelum penghapusan dijalankan.
  - Menggunakan Server Action `hapusBuku` dengan raw SQL `DELETE FROM buku WHERE id = $1`.

## Struktur Berkas

```text
pustaka-senja/
├── .env.local
├── package.json
├── next.config.mjs
├── README.md
└── src/
    ├── lib/
    │   └── db.js                   # Koneksi pool PostgreSQL (pg)
    ├── components/
    │   ├── Navbar.jsx              # Navigasi utama ("use client" & usePathname)
    │   ├── Hero.jsx                # Banner sambutan (Server Component)
    │   ├── BukuCard.jsx            # Kartu buku dengan tombol Detail, Edit, Hapus
    │   ├── TombolHapus.jsx         # Tombol hapus dengan konfirmasi ("use client")
    │   └── Footer.jsx              # Footer informasi (Server Component)
    └── app/
        ├── globals.css             # Konfigurasi Tailwind CSS
        ├── layout.jsx              # Root Layout bersama
        ├── page.jsx                # Beranda (Statistik real-time dari PostgreSQL)
        ├── actions.js              # Server Actions (INSERT, UPDATE, DELETE raw SQL)
        ├── katalog/
        │   ├── page.jsx            # Katalog buku & filter kategori
        │   ├── tambah/
        │   │   └── page.jsx        # Halaman form tambah buku baru (Create)
        │   └── [id]/
        │       ├── page.jsx        # Detail lengkap buku (Read by ID)
        │       └── edit/
        │           └── page.jsx    # Halaman form edit buku (Update by ID)
        └── usulan/
            └── page.jsx            # Halaman form usulan buku pengunjung
```

## Menjalankan Proyek

1. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
2. Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.
