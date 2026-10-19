const API = "https://jsonplaceholder.typicode.com";

// Elemen
const loadingAnggota = document.getElementById("loading-anggota");
const errorAnggota = document.getElementById("error-anggota");
const daftarAnggota = document.getElementById("daftar-anggota");
const bagianTugas = document.getElementById("bagian-tugas");
const judulTugas = document.getElementById("judul-tugas");
const ringkasan = document.getElementById("ringkasan");
const loadingTugas = document.getElementById("loading-tugas");
const errorTugas = document.getElementById("error-tugas");
const isiTugas = document.getElementById("isi-tugas");
const cari = document.getElementById("cari");
const formTugas = document.getElementById("form-tugas");
const inputJudul = document.getElementById("input-judul");
const tombolSimpan = document.getElementById("tombol-simpan");
const errorForm = document.getElementById("error-form");
const pesanKosong = document.getElementById("pesan-kosong");
const daftarTugas = document.getElementById("daftar-tugas");
const notifikasi = document.getElementById("notifikasi");

// State: setiap item { title, completed, el, judulEl }
let tugasSaatIni = [];
let idAktif = null;
let tombolAktif = null;
let timerNotifikasi = null;

const KELAS_AKTIF = ["bg-indigo-600", "text-white"];
const KELAS_BIASA = ["bg-white", "text-gray-700"];
const KELAS_SELESAI = ["line-through", "text-gray-400"];

/* ---------- F1: daftar anggota ---------- */
async function muatAnggota() {
  loadingAnggota.classList.remove("hidden");
  errorAnggota.classList.add("hidden");
  try {
    const res = await fetch(`${API}/users`);
    if (!res.ok) throw new Error(`Server mengembalikan status ${res.status}`);
    const data = await res.json();
    tampilkanAnggota(data);
  } catch (err) {
    errorAnggota.textContent = `Gagal memuat anggota: ${err.message}`;
    errorAnggota.classList.remove("hidden");
  } finally {
    loadingAnggota.classList.add("hidden");
  }
}

function tampilkanAnggota(users) {
  daftarAnggota.innerHTML = "";
  users.forEach((user) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = user.name;
    btn.classList.add("border", "border-gray-300", "rounded-lg", "px-3", "py-1.5", "text-sm", "hover:border-indigo-400");
    btn.classList.add(...KELAS_BIASA);
    btn.addEventListener("click", () => pilihAnggota(user, btn));
    daftarAnggota.appendChild(btn);
  });
}

/* ---------- F2: tugas anggota ---------- */
async function pilihAnggota(user, btn) {
  // Penanda: hanya satu anggota yang aktif
  if (tombolAktif) {
    tombolAktif.classList.remove(...KELAS_AKTIF);
    tombolAktif.classList.add(...KELAS_BIASA);
  }
  btn.classList.remove(...KELAS_BIASA);
  btn.classList.add(...KELAS_AKTIF);
  tombolAktif = btn;
  idAktif = user.id;
  const idSaatIni = user.id;

  bagianTugas.classList.remove("hidden");
  judulTugas.textContent = `Tugas ${user.name}`;
  ringkasan.textContent = "";
  daftarTugas.innerHTML = "";
  tugasSaatIni = [];
  cari.value = "";
  errorForm.classList.add("hidden");
  pesanKosong.classList.add("hidden");
  errorTugas.classList.add("hidden");
  isiTugas.classList.add("hidden");
  loadingTugas.classList.remove("hidden");

  try {
    const res = await fetch(`${API}/todos?userId=${user.id}`);
    if (!res.ok) throw new Error(`Server mengembalikan status ${res.status}`);
    const data = await res.json();
    if (idSaatIni !== idAktif) return; // anggota lain sudah dipilih
    data.forEach((t) => buatItemTugas(t.title, t.completed));
    isiTugas.classList.remove("hidden");
    perbaruiTampilan();
  } catch (err) {
    if (idSaatIni !== idAktif) return;
    errorTugas.textContent = `Gagal memuat tugas: ${err.message}`;
    errorTugas.classList.remove("hidden");
  } finally {
    if (idSaatIni === idAktif) loadingTugas.classList.add("hidden");
  }
}

function buatItemTugas(title, completed) {
  const li = document.createElement("li");
  li.classList.add("flex", "items-center", "justify-between", "gap-3", "py-2");

  const judulEl = document.createElement("span");
  judulEl.textContent = title;
  judulEl.classList.add("flex-1");

  const aksi = document.createElement("div");
  aksi.classList.add("flex", "gap-2", "shrink-0");

  const item = { title, completed, el: li };

  if (completed) {
    judulEl.classList.add(...KELAS_SELESAI);
  } else {
    const btnSelesai = document.createElement("button");
    btnSelesai.type = "button";
    btnSelesai.textContent = "Tandai selesai";
    btnSelesai.classList.add("text-xs", "bg-green-100", "text-green-800", "rounded", "px-2", "py-1", "hover:bg-green-200");
    btnSelesai.addEventListener("click", () => {
      item.completed = true;
      judulEl.classList.add(...KELAS_SELESAI);
      btnSelesai.remove();
      perbaruiTampilan();
    });
    aksi.appendChild(btnSelesai);
  }

  const btnHapus = document.createElement("button");
  btnHapus.type = "button";
  btnHapus.textContent = "Hapus";
  btnHapus.classList.add("text-xs", "bg-red-100", "text-red-800", "rounded", "px-2", "py-1", "hover:bg-red-200");
  btnHapus.addEventListener("click", () => {
    li.remove();
    tugasSaatIni = tugasSaatIni.filter((t) => t !== item);
    perbaruiTampilan();
  });
  aksi.appendChild(btnHapus);

  li.appendChild(judulEl);
  li.appendChild(aksi);
  daftarTugas.appendChild(li);
  tugasSaatIni.push(item);
}

function perbaruiRingkasan() {
  const selesai = tugasSaatIni.filter((t) => t.completed).length;
  ringkasan.textContent = `${selesai} dari ${tugasSaatIni.length} tugas selesai`;
}

/* ---------- F3: pencarian ---------- */
function terapkanFilter() {
  const kata = cari.value.toLowerCase();
  let tampil = 0;
  tugasSaatIni.forEach((t) => {
    if (t.title.toLowerCase().includes(kata)) {
      t.el.classList.remove("hidden");
      tampil++;
    } else {
      t.el.classList.add("hidden");
    }
  });

  if (tugasSaatIni.length === 0) {
    pesanKosong.textContent = "Belum ada tugas.";
    pesanKosong.classList.remove("hidden");
  } else if (tampil === 0) {
    pesanKosong.textContent = "Tidak ada tugas yang cocok";
    pesanKosong.classList.remove("hidden");
  } else {
    pesanKosong.classList.add("hidden");
  }
}

function perbaruiTampilan() {
  perbaruiRingkasan();
  terapkanFilter();
}

cari.addEventListener("input", terapkanFilter);

/* ---------- F4: tambah tugas ---------- */
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sudahAda = tugasSaatIni.some((t) => t.title.toLowerCase() === judul.toLowerCase());
      if (sudahAda) {
        reject(new Error(`Tugas "${judul}" sudah ada di daftar.`));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi(pesan) {
  notifikasi.textContent = pesan;
  notifikasi.classList.remove("hidden");
  clearTimeout(timerNotifikasi);
  timerNotifikasi = setTimeout(() => notifikasi.classList.add("hidden"), 3000);
}

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorForm.classList.add("hidden");

  const judul = inputJudul.value.trim();
  if (judul.length < 5) {
    errorForm.textContent = "Judul tugas tidak boleh kosong dan minimal 5 karakter.";
    errorForm.classList.remove("hidden");
    return;
  }

  const idSaatSimpan = idAktif;
  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";
  try {
    const tugasBaru = await simpanTugas(judul);
    if (idSaatSimpan !== idAktif) return; // anggota sudah berganti
    buatItemTugas(tugasBaru.title, tugasBaru.completed);
    // [TAMBAHAN 1]
    cari.value = "";
    isiTugas.classList.remove("hidden");
    perbaruiTampilan();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (err) {
    errorForm.textContent = err.message;
    errorForm.classList.remove("hidden");
  } finally {
    tombolSimpan.disabled = false;
    tombolSimpan.textContent = "Simpan";
  }
});

muatAnggota();