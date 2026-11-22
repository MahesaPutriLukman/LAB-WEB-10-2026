import { Nunito, Fraunces } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Digital",
  description: "Ruang baca dan perpustakaan komunitas: jelajahi katalog, simpan favorit, dan usulkan buku baru.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${nunito.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
