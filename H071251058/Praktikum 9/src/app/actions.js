"use server";

// =============================================================================
// SERVER ACTIONS (src/app/actions.js)
// =============================================================================
// Berkas ini berisi fungsi-fungsi mutasi data (Create, Update, Delete) yang
// dieksekusi langsung di server menggunakan direktif "use server".
//
// Seluruh query ditulis menggunakan Raw SQL eksplisit melalui driver "pg" (pool.query)
// dan WAJIB menggunakan Parameterized Query ($1, $2, ...) untuk mencegah SQL Injection.
//
// Setelah operasi database berhasil:
// - revalidatePath() digunakan untuk memperbarui cache halaman Next.js.
// - redirect() digunakan untuk mengarahkan pengguna kembali ke halaman katalog.
// =============================================================================

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

/**
 * 1. CREATE - Menambahkan Buku Baru ke Database
 * Menerima objek FormData dari formulir tambah buku.
 */
export async function tambahBuku(formData) {
  // Ambil nilai dari setiap field formulir
  const judul = formData.get("judul")?.toString().trim();
  const penulis = formData.get("penulis")?.toString().trim();
  const kategori = formData.get("kategori")?.toString().trim();
  const tahunInput = formData.get("tahun")?.toString().trim();
  const statusTersedia = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis")?.toString().trim();

  // Validasi input: pastikan kolom penting tidak kosong
  if (!judul || !penulis || !kategori || !tahunInput || !sinopsis) {
    throw new Error("Semua kolom formulir wajib diisi!");
  }

  // Konversi tipe data sesuai kolom database:
  // - tahun: integer
  // - tersedia: boolean
  const tahun = parseInt(tahunInput, 10);
  if (isNaN(tahun)) {
    throw new Error("Tahun terbit harus berupa angka!");
  }

  const tersedia = statusTersedia === "true" || statusTersedia === "on";

  // Raw SQL Query menggunakan INSERT INTO dengan parameterized query ($1 s.d. $6)
  const query = `
    INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;
  const values = [judul, penulis, kategori, tahun, tersedia, sinopsis];

  await pool.query(query, values);

  // Perbarui cache halaman agar buku baru langsung muncul di katalog dan statistik beranda
  revalidatePath("/katalog");
  revalidatePath("/");

  // Arahkan kembali ke halaman katalog
  redirect("/katalog");
}

/**
 * 2. UPDATE - Mengubah Data Buku yang Sudah Ada
 * Menerima objek FormData dari formulir edit buku.
 */
export async function updateBuku(formData) {
  // Ambil ID buku yang akan diubah
  const id = formData.get("id")?.toString().trim();
  const judul = formData.get("judul")?.toString().trim();
  const penulis = formData.get("penulis")?.toString().trim();
  const kategori = formData.get("kategori")?.toString().trim();
  const tahunInput = formData.get("tahun")?.toString().trim();
  const statusTersedia = formData.get("tersedia");
  const sinopsis = formData.get("sinopsis")?.toString().trim();

  // Validasi data
  if (!id || !judul || !penulis || !kategori || !tahunInput || !sinopsis) {
    throw new Error("Data buku untuk diubah tidak lengkap!");
  }

  const tahun = parseInt(tahunInput, 10);
  if (isNaN(tahun)) {
    throw new Error("Tahun terbit harus berupa angka!");
  }

  const tersedia = statusTersedia === "true" || statusTersedia === "on";

  // Raw SQL Query menggunakan UPDATE dengan klausa WHERE berdasarkan id ($7)
  // Parameterized query digunakan untuk seluruh nilai dinamis
  const query = `
    UPDATE buku
    SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
    WHERE id = $7;
  `;
  const values = [judul, penulis, kategori, tahun, tersedia, sinopsis, id];

  await pool.query(query, values);

  // Perbarui cache halaman katalog, halaman detail buku, dan beranda
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");

  // Arahkan kembali ke halaman detail buku yang baru saja diperbarui
  redirect(`/katalog/${id}`);
}

/**
 * 3. DELETE - Menghapus Satu Buku dari Database
 * Menerima objek FormData yang membawa input hidden 'id'.
 */
export async function hapusBuku(formData) {
  const id = formData.get("id")?.toString().trim();

  if (!id) {
    throw new Error("ID buku yang ingin dihapus tidak valid!");
  }

  // Raw SQL Query menggunakan DELETE dengan klausa WHERE berdasarkan id ($1)
  // Sangat penting memakai klausa WHERE agar tidak menghapus seluruh isi tabel
  const query = `
    DELETE FROM buku
    WHERE id = $1;
  `;

  await pool.query(query, [id]);

  // Perbarui cache katalog dan beranda
  revalidatePath("/katalog");
  revalidatePath("/");

  // Arahkan kembali ke halaman katalog
  redirect("/katalog");
}
