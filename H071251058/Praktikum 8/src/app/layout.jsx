// =============================================================================
// ROOT LAYOUT (Server Component)
// =============================================================================
// Berkas ini adalah kerangka induk seluruh aplikasi Next.js (App Router).
// Komponen Navbar dan Footer dipasang satu kali di sini mengapit {children},
// sehingga otomatis selalu muncul di semua halaman tanpa dimuat ulang (reload).
// =============================================================================

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Informasi judul dan deskripsi situs untuk tab browser
export const metadata = {
  title: "Pustaka Senja - Ruang Baca & Perpustakaan Komunitas",
  description:
    "Aplikasi ruang baca dan perpustakaan komunitas Pustaka Senja dengan katalog buku dan form usulan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        {/* Navigasi Atas Bersama */}
        <Navbar />

        {/* Konten Halaman Aktif (children berubah sesuai URL yang dibuka) */}
        <main className="flex-1">{children}</main>

        {/* Kaki Halaman Bersama */}
        <Footer />
      </body>
    </html>
  );
}
