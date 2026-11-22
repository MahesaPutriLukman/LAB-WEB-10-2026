# Pustaka Senja (Praktikum 9: Next.js + PostgreSQL)

## 1. Siapkan database
1. Di pgAdmin, buat database `pustaka_senja` (atau nama dari asisten lab).
2. Buka Query Tool pada database itu, jalankan isi `database/schema.sql` (membuat tabel `buku` dan 9 data awal).
3. Cek: `SELECT COUNT(*) FROM buku;` harus menghasilkan 9.

## 2. Isi koneksi
Salin `.env.example` menjadi `.env.local`, lalu isi `DATABASE_URL` sendiri:

    DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/pustaka_senja

`.env.local` jangan diunggah ke repositori.

## 3. Jalankan
    npm install
    npm run dev   # http://localhost:3000

## Catatan
- Nilai `tersedia` buku ke-9 (Filosofi Teras) di `database/schema.sql` masih penampung sementara; konfirmasi ke PDF asli/dosen.
- Lokasi dan jam buka di `src/app/page.jsx` adalah contoh.
