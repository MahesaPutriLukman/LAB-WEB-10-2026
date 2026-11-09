"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

const KATEGORI = ["Teknologi", "Fiksi", "Pengembangan Diri"];

function bacaForm(formData) {
  const mentah = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? ""),
    tahun: String(formData.get("tahun") ?? "").trim(),
    tersedia: String(formData.get("tersedia") ?? "true"),
    sinopsis: String(formData.get("sinopsis") ?? "").trim(),
  };
  const tahun = Number(mentah.tahun);
  const tahunMaks = new Date().getFullYear() + 1;

  let error = null;
  if (!mentah.judul || !mentah.penulis || !mentah.sinopsis) {
    error = "Judul, penulis, dan sinopsis wajib diisi.";
  } else if (mentah.judul.length > 150 || mentah.penulis.length > 100) {
    error = "Judul maksimal 150 karakter dan penulis maksimal 100 karakter.";
  } else if (!KATEGORI.includes(mentah.kategori)) {
    error = "Pilih salah satu kategori yang tersedia.";
  } else if (mentah.tahun === "" || !Number.isInteger(tahun) || tahun < 1000 || tahun > tahunMaks) {
    error = `Tahun terbit harus berupa angka antara 1000 dan ${tahunMaks}.`;
  }

  return {
    error,
    values: mentah,
    data: { ...mentah, tahun, tersedia: mentah.tersedia === "true" },
  };
}

export async function tambahBuku(prevState, formData) {
  const { error, values, data } = bacaForm(formData);
  if (error) return { error, values };

  await pool.query(
    "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
    [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
  );

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}

export async function ubahBuku(prevState, formData) {
  const idMentah = String(formData.get("id") ?? "");
  if (!/^\d{1,9}$/.test(idMentah)) return { error: "ID buku tidak valid.", values: null };
  const id = Number(idMentah);

  const { error, values, data } = bacaForm(formData);
  if (error) return { error, values };

  const hasil = await pool.query(
    "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
    [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, id]
  );
  if (hasil.rowCount === 0) return { error: "Buku tidak ditemukan, mungkin sudah dihapus.", values };

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  redirect(`/katalog/${id}`);
}

export async function hapusBuku(formData) {
  const idMentah = String(formData.get("id") ?? "");
  if (!/^\d{1,9}$/.test(idMentah)) return;

  await pool.query("DELETE FROM buku WHERE id = $1", [Number(idMentah)]);

  revalidatePath("/");
  revalidatePath("/katalog");
}
