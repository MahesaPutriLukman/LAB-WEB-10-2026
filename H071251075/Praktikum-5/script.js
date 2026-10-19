
const BASE_URL = "https://jsonplaceholder.typicode.com";
  
const statusAnggota = document.getElementById("status-anggota");
const errorAnggota = document.getElementById("error-anggota");
const daftarAnggota = document.getElementById("daftar-anggota");
const judulTugas = document.getElementById("judul-tugas");
const petunjuk = document.getElementById("petunjuk");
const statusTugas = document.getElementById("status-tugas");
const errorTugas = document.getElementById("error-tugas");
const kontenTugas = document.getElementById("konten-tugas");
const ringkasan = document.getElementById("ringkasan");
const inputCari = document.getElementById("cari");
const formTambah = document.getElementById("form-tambah");
const inputJudul = document.getElementById("input-judul");
const tombolSimpan = document.getElementById("tombol-simpan");
const errorForm = document.getElementById("error-form");
const notifikasi = document.getElementById("notifikasi");
const daftarTugas = document.getElementById("daftar-tugas");
const tidakAda = document.getElementById("tidak-ada");

const KELAS_AKTIF = [
  "bg-indigo-600",
  "text-white",
  "border-indigo-600"
];

const KELAS_NONAKTIF = [
  "bg-white",
  "text-slate-700",
  "border-slate-300",
  "hover:bg-indigo-50"
];

const KELAS_SELESAI = ["line-through", "text-gray-400"];

let permintaanTerakhir = 0;
let timerNotifikasi = null;

async function muatAnggota() {
  statusAnggota .textContent = "Memuat anggota...";
  errorAnggota.classList.add("hidden");
  errorAnggota.textContent = "";
  daftarAnggota.innerHTML = "";

  try {
    const respons = await fetch(BASE_URL + "/users");

    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }

    const anggota = await respons.json();

    anggota.forEach((orang) => {
      const tombol = document.createElement("button");

      tombol.type = "button";
      tombol.textContent = orang.name;

      tombol.classList.add(
        "anggota",
        "w-full",
        "rounded-md",
        "border",
        "px-3",
        "py-2",
        "text-left",
        "text-sm",
        "font-medium",
        "transition-colors"
      );

      tombol.classList.add(...KELAS_NONAKTIF);
      tombol.setAttribute("aria-pressed", "false");

      tombol.addEventListener("click", () => {
        muatTugas(orang, tombol);
      });

      daftarAnggota.appendChild(tombol);
    });
  } catch (error) {
    errorAnggota.textContent =
      "Gagal memuat anggota: " + error.message;
    errorAnggota.classList.remove("hidden");
  } finally {
    statusAnggota.textContent = "";
  }
}

function tandaiAnggotaAktif(tombolAktif) {
  const semua = daftarAnggota.querySelectorAll(".anggota");

  semua.forEach((tombol) => {
    tombol.classList.remove(...KELAS_AKTIF);
    tombol.classList.add(...KELAS_NONAKTIF);
    tombol.setAttribute("aria-pressed", "false");
  });

  tombolAktif.classList.remove(...KELAS_NONAKTIF);
  tombolAktif.classList.add(...KELAS_AKTIF);
  tombolAktif.setAttribute("aria-pressed", "true");
}

async function muatTugas(orang, tombol) {
  const nomorPermintaan = ++permintaanTerakhir;

  tandaiAnggotaAktif(tombol);

  judulTugas.textContent = "Tugas " + orang.name;
  petunjuk.classList.add("hidden");

  daftarTugas.innerHTML = "";
  inputCari.value = "";
  errorForm.textContent = "";
  errorTugas.classList.add("hidden");
  errorTugas.textContent = "";
  kontenTugas.classList.add("hidden");
  tidakAda.classList.add("hidden");
  ringkasan.textContent = "";
  statusTugas.textContent = "Memuat tugas...";

  try {
    const respons = await fetch(
      BASE_URL + "/todos?userId=" + orang.id
    );

    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }

    const tugas = await respons.json();

    if (nomorPermintaan !== permintaanTerakhir) {
      return;
    }

    tugas.forEach((item) => {
      daftarTugas.appendChild(buatItemTugas(item));
    });

    perbaruiRingkasan();
    terapkanFilter();
    kontenTugas.classList.remove("hidden");
  } catch (error) {
    if (nomorPermintaan !== permintaanTerakhir) {
      return;
    }
    errorTugas.textContent =
      "Gagal memuat tugas: " + error.message;
    errorTugas.classList.remove("hidden");
  } finally {
    if (nomorPermintaan === permintaanTerakhir) {
      statusTugas.textContent = "";
    }
  }
}

function buatItemTugas(tugas) {
  const li = document.createElement("li");

  li.classList.add(
    "rounded-lg",
    "border",
    "border-slate-200",
    "bg-white",
    "p-3"
  );

  li.dataset.selesai = tugas.completed ? "true" : "false";

  const baris = document.createElement("div");

  baris.classList.add(
    "flex",
    "flex-col",
    "gap-2",
    "sm:flex-row",
    "sm:items-center",
    "sm:justify-between"
  );

  const judul = document.createElement("span");

  judul.classList.add("judul-tugas", "break-words", "text-sm");
  judul.textContent = tugas.title;

  if (tugas.completed) {
    judul.classList.add(...KELAS_SELESAI);
  }

  const aksi = document.createElement("div");
  aksi.classList.add("flex", "shrink-0", "gap-2");

  if (!tugas.completed) {
    const tombolSelesai = document.createElement("button");

    tombolSelesai.type = "button";
    tombolSelesai.textContent = "Tandai selesai";

    tombolSelesai.classList.add(
      "rounded-md",
      "bg-green-600",
      "px-3",
      "py-1",
      "text-xs",
      "font-medium",
      "text-white",
      "hover:bg-green-700"
    );

    tombolSelesai.addEventListener("click", () => {
      judul.classList.add(...KELAS_SELESAI);
      li.dataset.selesai = "true";
      tombolSelesai.remove();

      perbaruiRingkasan();
    });

    aksi.appendChild(tombolSelesai);
  }

  const tombolHapus = document.createElement("button");

  tombolHapus.type = "button";
  tombolHapus.textContent = "Hapus";

  tombolHapus.classList.add(
    "rounded-md",
    "bg-red-600",
    "px-3",
    "py-1",
    "text-xs",
    "font-medium",
    "text-white",
    "hover:bg-red-700"
  );

  tombolHapus.addEventListener("click", () => {
    li.remove();
    perbaruiRingkasan();
    terapkanFilter();
  });

  aksi.appendChild(tombolHapus);

  baris.appendChild(judul);
  baris.appendChild(aksi);
  li.appendChild(baris);

  return li;
}

function perbaruiRingkasan() {
  const total = daftarTugas.querySelectorAll("li").length;

  const selesai = daftarTugas.querySelectorAll(
    'li[data-selesai="true"]'
  ).length;

  ringkasan.textContent =
    selesai + " dari " + total + " tugas selesai";
}

function terapkanFilter() {
  const kataKunci = inputCari.value.trim().toLowerCase();
  const semuaItem = daftarTugas.querySelectorAll("li");

  let jumlahTampil = 0;

  semuaItem.forEach((li) => {
    const judul = li
      .querySelector(".judul-tugas")
      .textContent.toLowerCase();

    if (judul.includes(kataKunci)) {
      li.classList.remove("hidden");
      jumlahTampil++;
    } else {
      li.classList.add("hidden");
    }
  });

  if (jumlahTampil === 0) {
    tidakAda.classList.remove("hidden");
  } else {
    tidakAda.classList.add("hidden");
  }
}

inputCari.addEventListener("input", terapkanFilter);

function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const judulBaru = judul.toLowerCase();

      const judulAda = Array.from(
        daftarTugas.querySelectorAll(".judul-tugas")
      ).some(
        (el) => el.textContent.trim().toLowerCase() === judulBaru
      );

      if (judulAda) {
        reject(
          new Error('Tugas "' + judul + '" sudah ada di daftar.')
        );
      } else {
        resolve({
          title: judul,
          completed: false
        });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi(pesan) {
  clearTimeout(timerNotifikasi);

  notifikasi.textContent = pesan;
  notifikasi.classList.remove("hidden");

  timerNotifikasi = setTimeout(() => {
    notifikasi.classList.add("hidden");
    notifikasi.textContent = "";
  }, 3000);
}

formTambah.addEventListener("submit", async (event) => {
  event.preventDefault();

  errorForm.textContent = "";

  const judul = inputJudul.value.trim();

  if (judul === "") {
    errorForm.textContent = "Judul tugas tidak boleh kosong.";
    return;
  }

  if (judul.length < 5) {
    errorForm.textContent =
      "Judul tugas minimal 5 karakter.";
    return;
  }

  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);

    daftarTugas.appendChild(buatItemTugas(tugasBaru));

    perbaruiRingkasan();
    terapkanFilter();
    inputJudul.value = "";

    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    errorForm.textContent = error.message;
  } finally {
    tombolSimpan.disabled = false;
    tombolSimpan.textContent = "Simpan";
  }
});

muatAnggota();
