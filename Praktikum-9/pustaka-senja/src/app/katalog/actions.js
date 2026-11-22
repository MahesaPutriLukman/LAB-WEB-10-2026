"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";
import { idValid } from "@/lib/buku";
import { daftarKategori } from "@/lib/kategori";

// Validasi input form; mengembalikan nilai bersih + daftar pesan error.
function validasi(formData) {
  const nilai = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? ""),
    tahun: String(formData.get("tahun") ?? "").trim(),
    tersedia: String(formData.get("tersedia") ?? ""),
    sinopsis: String(formData.get("sinopsis") ?? "").trim(),
  };
  const pesan = [];
  const tahunMaks = new Date().getFullYear() + 1;

  if (!nilai.judul) pesan.push("Judul wajib diisi.");
  if (!nilai.penulis) pesan.push("Penulis wajib diisi.");
  if (!daftarKategori.includes(nilai.kategori)) pesan.push("Pilih salah satu kategori.");
  if (!/^\d{4}$/.test(nilai.tahun) || Number(nilai.tahun) > tahunMaks) pesan.push(`Tahun terbit harus berupa angka 4 digit (maksimal ${tahunMaks}).`);
  if (nilai.tersedia !== "true" && nilai.tersedia !== "false") pesan.push("Pilih status ketersediaan.");
  if (!nilai.sinopsis) pesan.push("Sinopsis wajib diisi.");

  return { nilai, pesan };
}

export async function tambahBuku(stateSebelumnya, formData) {
  const { nilai, pesan } = validasi(formData);
  if (pesan.length > 0) return { pesan, nilai };

  try {
    await pool.query(
      "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
      [nilai.judul, nilai.penulis, nilai.kategori, Number(nilai.tahun), nilai.tersedia === "true", nilai.sinopsis]
    );
  } catch (error) {
    console.error("Gagal INSERT buku:", error.message);
    return { pesan: ["Gagal menyimpan ke database. Coba lagi."], nilai };
  }

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog");
}

export async function ubahBuku(id, stateSebelumnya, formData) {
  if (!idValid(id)) return { pesan: ["ID buku tidak valid."], nilai: null };
  const { nilai, pesan } = validasi(formData);
  if (pesan.length > 0) return { pesan, nilai };

  let hasil;
  try {
    hasil = await pool.query(
      "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
      [nilai.judul, nilai.penulis, nilai.kategori, Number(nilai.tahun), nilai.tersedia === "true", nilai.sinopsis, Number(id)]
    );
  } catch (error) {
    console.error("Gagal UPDATE buku:", error.message);
    return { pesan: ["Gagal menyimpan perubahan. Coba lagi."], nilai };
  }
  if (hasil.rowCount === 0) return { pesan: ["Buku tidak ditemukan."], nilai };

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/");
  redirect(`/katalog/${id}`);
}

export async function hapusBuku(id) {
  if (!idValid(id)) return;

  await pool.query("DELETE FROM buku WHERE id = $1", [Number(id)]);

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog");
}
