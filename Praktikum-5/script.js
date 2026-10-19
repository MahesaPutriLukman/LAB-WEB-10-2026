// Ambil elemen HTML yang dibutuhin dan simpan ke variabel
const loadingUsers = document.getElementById('loading-users');
const errorUsers = document.getElementById('error-users');
const memberList = document.getElementById('member-list');

const welcomeState = document.getElementById('welcome-state');
const taskDashboard = document.getElementById('task-dashboard');
const taskTitle = document.getElementById('task-title');
const taskProgressText = document.getElementById('task-progress-text');
const taskProgressBar = document.getElementById('task-progress-bar');
const taskList = document.getElementById('task-list');
const loadingTasks = document.getElementById('loading-tasks');
const errorTasks = document.getElementById('error-tasks');

const searchTask = document.getElementById('search-task');
const emptySearch = document.getElementById('empty-search');

const addTaskForm = document.getElementById('add-task-form');
const newTaskTitle = document.getElementById('new-task-title');
const btnSimpan = document.getElementById('btn-simpan');
const addTaskError = document.getElementById('add-task-error');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

let tombolAktif = null;    // tombol anggota yang sedang dipilih
let anggotaAktif = null;   // data anggota yang sedang dipilih
let daftarTugas = [];      // tugas anggota aktif: { title, completed }
let timerToast = null;     // timer untuk menyembunyikan toast

// Ambil anggota dari server lalu buat tombolnya
async function muatAnggota() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // minta data
        if (!response.ok) {
            throw new Error("Gagal memuat anggota: Status " + response.status); // status bukan 2xx = gagal
        }
        const dataPengguna = await response.json(); // ubah ke array JS

        loadingUsers.classList.add('hidden'); // sembunyikan loading

        dataPengguna.forEach(pengguna => {
            memberList.appendChild(buatTombolAnggota(pengguna)); // tambah tiap anggota ke list
        });
    } catch (error) {
        loadingUsers.classList.add('hidden');     // sembunyikan loading
        errorUsers.textContent = error.message;   // isi pesan error
        errorUsers.classList.remove('hidden');    // tampilkan error
    }
}

// Buat satu <li> berisi tombol anggota
function buatTombolAnggota(pengguna) {
    const li = document.createElement('li');          // wadah item
    const button = document.createElement('button');  // tombol anggota

    // Gaya tombol saat belum dipilih
    button.className = "w-full text-left px-6 py-3 text-sm focus:outline-none flex items-center border-l-4 border-transparent text-gray-600 hover:bg-white/60";

    const spanId = document.createElement('span'); // nomor anggota
    spanId.className = "text-gray-400 w-8 inline-block text-xs";
    spanId.textContent = "#" + pengguna.id;

    const spanName = document.createElement('span'); // nama anggota
    spanName.textContent = pengguna.name;

    button.appendChild(spanId);   // masukkan nomor
    button.appendChild(spanName); // masukkan nama

    // Saat diklik, tampilkan tugas anggota ini
    button.addEventListener('click', () => pilihAnggota(pengguna, button));

    li.appendChild(button);
    return li;
}

// Beri/hapus warna hijau pada tombol anggota
function tandaiTombolAktif(tombolBaru) {
    if (tombolAktif) {
        // Kembalikan tombol lama ke gaya biasa
        tombolAktif.classList.remove('bg-white/60', 'border-matcha', 'text-matchaDark', 'font-medium');
        tombolAktif.classList.add('border-transparent', 'text-gray-600');
    }
    // Beri gaya hijau ke tombol baru
    tombolBaru.classList.remove('border-transparent', 'text-gray-600');
    tombolBaru.classList.add('bg-white/60', 'border-matcha', 'text-matchaDark', 'font-medium');
    tombolAktif = tombolBaru; // simpan sebagai tombol aktif
}

// ===================== TUGAS ANGGOTA =====================

// Dipanggil saat tombol anggota diklik
async function pilihAnggota(pengguna, button) {
    tandaiTombolAktif(button); // ubah warna tombol
    anggotaAktif = pengguna;   // catat anggota aktif
    daftarTugas = [];          // kosongkan tugas lama

    // Ganti layar welcome menjadi layar tugas
    welcomeState.classList.add('hidden');
    taskDashboard.classList.remove('hidden');
    taskDashboard.classList.add('flex');

    taskTitle.textContent = "Tugas " + pengguna.name; // judul sesuai anggota

    // Reset pencarian, error, dan tampilkan loading
    searchTask.value = "";
    addTaskError.classList.add('hidden');
    errorTasks.classList.add('hidden');
    loadingTasks.classList.remove('hidden');
    tampilkanTugas(); // gambar ulang (kosong)

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?userId=" + pengguna.id);
        if (!response.ok) {
            throw new Error("Gagal mengambil tugas: Status " + response.status);
        }
        const tugasDariServer = await response.json();

        // Anggota sudah ganti saat menunggu? Abaikan hasil lama
        if (anggotaAktif !== pengguna) return;

        loadingTasks.classList.add('hidden'); // sembunyikan loading

        // Simpan hanya data yang dibutuhkan
        daftarTugas = tugasDariServer.map(tugas => ({
            title: tugas.title,
            completed: tugas.completed
        }));
        tampilkanTugas(); // gambar daftar tugas
    } catch (error) {
        if (anggotaAktif !== pengguna) return; // error lama, abaikan

        loadingTasks.classList.add('hidden');
        errorTasks.textContent = error.message;
        errorTasks.classList.remove('hidden');
    }
}

// Gambar ulang daftar tugas sesuai data & kata kunci pencarian
function tampilkanTugas() {
    const kataKunci = searchTask.value.trim().toLowerCase(); // kata kunci

    taskList.innerHTML = ""; // kosongkan list

    // Ambil tugas yang judulnya mengandung kata kunci
    const tugasTampil = daftarTugas.filter(tugas =>
        tugas.title.toLowerCase().includes(kataKunci)
    );

    tugasTampil.forEach(buatElemenTugas); // gambar tiap tugas

    // Tampilkan pesan kosong jika ada tugas tapi tidak ada yang cocok
    const tidakAdaYangCocok = tugasTampil.length === 0 && daftarTugas.length > 0;
    emptySearch.classList.toggle('hidden', !tidakAdaYangCocok);

    perbaruiProgress(); // update bar progress
}

// Buat satu baris tugas
function buatElemenTugas(tugas) {
    const li = document.createElement('li'); // baris tugas
    li.className = "flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50/50 px-2 transition-colors";

    // --- Sisi kiri: ikon + teks ---
    const leftDiv = document.createElement('div');
    leftDiv.className = "flex items-center gap-4";

    const icon = document.createElement('div'); // lingkaran ceklis
    icon.className = "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors " +
                     (tugas.completed ? "bg-matcha border-matcha text-white" : "border-gray-300");
    icon.textContent = tugas.completed ? "✓" : ""; // ceklis jika selesai
    icon.style.fontSize = "12px";

    const spanText = document.createElement('span'); // judul tugas
    spanText.className = "task-text text-sm transition-colors " +
                         (tugas.completed ? "line-through text-gray-400" : "text-gray-700");
    spanText.textContent = tugas.title;

    leftDiv.appendChild(icon);
    leftDiv.appendChild(spanText);

    // --- Sisi kanan: tombol aksi ---
    const rightDiv = document.createElement('div');
    rightDiv.className = "flex items-center gap-3 text-xs font-bold";

    // Tombol "Tandai selesai" hanya untuk tugas yang belum selesai
    if (!tugas.completed) {
        const btnSelesai = document.createElement('button');
        btnSelesai.className = "px-4 py-2 bg-matchaLight text-matchaDark hover:bg-matcha hover:text-white rounded-lg transition-colors";
        btnSelesai.textContent = "Tandai selesai";

        btnSelesai.addEventListener('click', () => {
            tugas.completed = true; // ubah data
            tampilkanTugas();       // gambar ulang
        });
        rightDiv.appendChild(btnSelesai);
    }

    // Tombol "Hapus"
    const btnHapus = document.createElement('button');
    btnHapus.className = "px-4 py-2 bg-pinkSoft text-pinkDark hover:bg-pinkDark hover:text-white rounded-lg transition-colors";
    btnHapus.textContent = "Hapus";

    btnHapus.addEventListener('click', () => {
        daftarTugas = daftarTugas.filter(item => item !== tugas); // buang dari data
        tampilkanTugas(); // gambar ulang
    });

    rightDiv.appendChild(btnHapus);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    taskList.appendChild(li); // tambahkan ke layar
}

// Hitung progress dari seluruh tugas (termasuk yang tersembunyi oleh pencarian)
function perbaruiProgress() {
    const total = daftarTugas.length;                                    // jumlah semua tugas
    const selesai = daftarTugas.filter(tugas => tugas.completed).length; // jumlah yang selesai

    taskProgressText.textContent = selesai + " dari " + total + " tugas selesai";

    const persentase = total === 0 ? 0 : (selesai / total) * 100; // hindari bagi nol
    taskProgressBar.style.width = persentase + "%";                // atur lebar bar
}

// Gambar ulang daftar setiap kali pengguna mengetik di kolom pencarian
searchTask.addEventListener('input', tampilkanTugas);

// ===================== TAMBAH TUGAS =====================

// Simulasi simpan ke server (1 detik), tolak jika judul sudah ada di daftar tujuan
function simpanTugas(judulMasukan, daftarTujuan) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Cek judul sama persis (tidak peduli huruf besar/kecil)
            const duplikat = daftarTujuan.some(tugas =>
                tugas.title.toLowerCase() === judulMasukan.toLowerCase()
            );

            if (duplikat) {
                reject(new Error("Tugas dengan judul yang sama sudah ada!")); // gagal
            } else {
                resolve({ title: judulMasukan, completed: false });           // berhasil
            }
        }, 1000);
    });
}

// Tampilkan toast sukses selama 3 detik
function tampilkanToast(pesan) {
    toastMessage.textContent = pesan;
    toast.classList.remove('hidden');

    clearTimeout(timerToast); // batalkan timer lama agar tidak menutup toast baru
    timerToast = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Saat form disubmit
addTaskForm.addEventListener('submit', async (event) => {
    event.preventDefault();                 // cegah halaman reload
    addTaskError.classList.add('hidden');   // sembunyikan error lama

    const judulBaru = newTaskTitle.value.trim(); // ambil judul tanpa spasi pinggir

    // Validasi minimal 5 karakter
    if (judulBaru.length < 5) {
        addTaskError.textContent = "Judul tugas minimal 5 karakter.";
        addTaskError.classList.remove('hidden');
        return;
    }

    // Catat daftar tujuan sekarang untuk mendeteksi pergantian anggota
    const daftarTujuan = daftarTugas;

    // Ubah tombol ke mode loading
    const teksTombolAsli = btnSimpan.textContent;
    btnSimpan.textContent = "Menyimpan...";
    btnSimpan.disabled = true;
    btnSimpan.classList.add('opacity-70', 'cursor-not-allowed');

    try {
        const tugasBaru = await simpanTugas(judulBaru, daftarTujuan);

        // Anggota sudah ganti saat menyimpan? Jangan masukkan ke anggota lain
        if (daftarTujuan !== daftarTugas) return;

        daftarTugas.push(tugasBaru);  // tambah ke data (otomatis di posisi paling bawah)
        newTaskTitle.value = "";      // kosongkan input
        tampilkanTugas();             // gambar ulang
        tampilkanToast("Tugas berhasil ditambahkan.");
    } catch (error) {
        // Hanya tampilkan error jika masih di anggota yang sama
        if (daftarTujuan === daftarTugas) {
            addTaskError.textContent = error.message;
            addTaskError.classList.remove('hidden');
        }
    } finally {
        // Kembalikan tombol ke kondisi normal (selalu dijalankan)
        btnSimpan.textContent = teksTombolAsli;
        btnSimpan.disabled = false;
        btnSimpan.classList.remove('opacity-70', 'cursor-not-allowed');
    }
});

muatAnggota(); // tampilkan daftar anggota saat halaman dibuka