// ===== DATA AWAL =====
const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko",  nilaiTugas: [45, 45, 45] },
  { nama: "Ejet", nilaiTugas: [100,100,100]}
];

const BATAS_LULUS = 75;

function hitungRataRata(nilai) {
  let total = 0;
  for (let i = 0; i < nilai.length; i++) {
    total += nilai[i];
  }
  return total / nilai.length;
}

function tentukanStatus(rataRata) {
  if (rataRata >= BATAS_LULUS) {
    return "Lulus";
  } else {
    return "Tidak Lulus";
  }
}

function prosesData(data) {
  return data.map(function (praktikan) {
    const rata = hitungRataRata(praktikan.nilaiTugas);
    return {
      nama: praktikan.nama,
      nilaiTugas: praktikan.nilaiTugas,
      rataRata: Number(rata.toFixed(2)),
      status: tentukanStatus(rata)
    };
  });
}

function buatKartu(p) {
  const warna = p.status === "Lulus" ? "lulus" : "gagal";
  return (
    '<div class="kartu ' + warna + '">' +
      "<h3>" + p.nama + "</h3>" +
      "<p>Nilai tugas: " + p.nilaiTugas.join(", ") + "</p>" +
      "<p>Rata-rata: <b>" + p.rataRata + "</b></p>" +
      '<span class="status">' + p.status + "</span>" +
    "</div>"
  );
}

const kodeInput = prompt("Masukkan kode Asisten Lab:");

document.write(
  "<style>" +
    "body { font-family: Arial, sans-serif; background: #f2f4f8; margin: 0; padding: 20px; }" +
    "h1 { text-align: center; }" +
    ".ringkasan { text-align: center; margin-bottom: 20px; }" +
    ".wadah { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; }" +
    ".kartu { background: white; width: 200px; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.15); }" +
    ".kartu h3 { margin-top: 0; }" +
    ".lulus { border-top: 5px solid #2e9e4f; }" +
    ".gagal { border-top: 5px solid #d33; }" +
    ".status { display: inline-block; padding: 4px 10px; border-radius: 4px; color: white; font-size: 14px; }" +
    ".lulus .status { background: #2e9e4f; }" +
    ".gagal .status { background: #d33; }" +
    ".ditolak { text-align: center; color: #d33; }" +
  "</style>"
);

const validasi = /[\d,\s]/;

if (!validasi.test(kodeInput)) {
  // 2. Proses data
  const hasil = prosesData(dataPraktikan);

  // Hitung ringkasan
  const jumlahLulus = hasil.filter(function (p) {
    return p.status === "Lulus";
  }).length;

  // 3. Render ke layar dengan document.write()
  document.write("<h1>Laporan Praktikum</h1>");
  document.write(
    '<div class="ringkasan">Total praktikan: ' + hasil.length +
    " | Lulus: " + jumlahLulus +
    " | Tidak lulus: " + (hasil.length - jumlahLulus) +
    " | Batas kelulusan: " + BATAS_LULUS + "</div>"
  );

  document.write('<div class="wadah">');
  for (let i = 0; i < hasil.length; i++) {
    document.write(buatKartu(hasil[i]));
  }
  document.write("</div>");

  // 4. Tampilkan hasil akhir di console
  console.log(hasil);
} else {
  document.write('<h1 class="ditolak">Akses ditolak! Kode Asisten Lab salah.</h1>');
}