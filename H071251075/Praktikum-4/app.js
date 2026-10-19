const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] },
];
try {
    const nama_asisten = prompt("Masukkan Nama Asisten : ")
    if (nama_asisten === null || nama_asisten.trim() === "") {
        throw new Error("Nama Asisten Perlu Diisi");
    }
    if (!/^[a-zA-Z\s]+$/.test(nama_asisten)) {
        throw new Error("Nama hanya boleh berisi huruf")
    }   
    
    function nilaiPraktikan(praktikan) {
        let totalNilai = 0;
        for (let i = 0; i < praktikan.nilaiTugas.length; i++) {
            totalNilai += praktikan.nilaiTugas[i];
        }

        const rata_rata = totalNilai / praktikan.nilaiTugas.length;
        let status = ""
        if (rata_rata >= 75){
            status = "Lulus"
        }else{
            status = "Tidak Lulus"
        };

        return {
            nama: praktikan.nama,
            nilaiTugas: praktikan.nilaiTugas,
            rata_rata: rata_rata,
            status: status
        };
    }
    const hasilEvaluasi = [];
    for (let i = 0; i < dataPraktikan.length; i++) {
        hasilEvaluasi.push(
            nilaiPraktikan(dataPraktikan[i])
        );
    }
    let jumlahLulus = 0;
    for (let i = 0; i < hasilEvaluasi.length; i++) {
        if (hasilEvaluasi[i].status === "Lulus") {
            jumlahLulus++;
        }
    }
    const jumlahTidakLulus = hasilEvaluasi.length - jumlahLulus;

    document.write(`
        <section class="mb-6 rounded-xl bg-white p-5 shadow-sm border border-slate-200">
            <p class="text-sm text-slate-500 font-bold ">
                Nama Asisten Praktikum :
            </p>
            <h3 class="text-xl font-bold mt-1">
                ${nama_asisten.trim()}
            </h3>
            <p class="text-xs text-slate-500 mt-2">
                Berikut adalah hasil penilaian seluruh praktikan.
            </p>
        </section>
        <section class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-100 border border-gray-200 hover:border-blue-500 hover:border-1 p-4 transition duration-300">
                <p class="text-sm text-slate-500 font-bold">
                    Total Praktikan
                </p>
                <h3 class="text-3xl font-bold mt-2">
                    ${hasilEvaluasi.length}
                </h3>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-100 border border-gray-200 hover:border-blue-500 hover:border-1 p-4 transition duration-300">
                <p class="text-sm text-slate-500 font-bold">
                    Lulus
                </p>
                <h3 class="text-3xl font-bold text-green-500 mt-2">
                    ${jumlahLulus}
                </h3>
            </div>

            <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-100 border border-gray-200 hover:border-blue-500 hover:border-1 p-4 transition duration-300">
                <p class="text-sm text-slate-500 font-bold">
                    Tidak Lulus
                </p>
                <h3 class="text-3xl font-bold text-red-600 mt-2">
                    ${jumlahTidakLulus}
                </h3>
            </div>
        </section>

        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${hasilEvaluasi.map((data, index) => `
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:bg-slate-50 border border-gray-200 hover:border-blue-500 hover:border-1 p-4 transition duration-300">
                    <div class="flex justify-between items-end">
                        <div>
                            <p class="text-xs text-black-200">
                                Praktikan ${index + 1}
                            </p>

                            <h3 class="text-xl font-bold text-slate-800 mt-1">
                                ${data.nama}
                            </h3>
                        </div>
                    </div>

                    <div>
                        <p class="text-sm text-black-300 mb-2">
                            Nilai Tugas
                        </p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${data.nilaiTugas.map((nilai, i) => `
                                <div class="flex-2 bg-blue-100 rounded-lg py-2 text-center hover:bg-slate-100 border border-gray-200 hover:border-blue-500 hover:border-1 p-4 transition duration-300">
                                    <p class="text-xs text-black-500">
                                        Tugas ${i + 1}
                                    </p>
                                    <p class="font-semibold text-black-700">
                                        ${nilai}
                                    </p>
                                </div>
                            `).join("")}
                        </div>
                        <p class="text-sm text-slate-500">
                            Nilai Rata-rata
                        </p>
                        <div class="grid grid-cols-2">
                            <p class="text-xl font-bold mt-1 flex justify-start
                                ${data.status === "Lulus"
                                    ? "text-green-500"
                                    : "text-red-500"}">

                                ${data.rata_rata.toFixed(2)}
                            </p>
                            <p class="text-xl font-bold mt-1 flex justify-end px-4 
                                 ${data.status === "Lulus"
                                    ? "text-green-500"
                                    : "text-red-500"}">
                                    ${data.status}
                            </p>
                        </div>
                    </div>
                </div>
            `).join("")}
        </section>

        <footer class="w-full mt-10 pb-4 flex justify-center">
            <div class="w-full max-w-3xl bg-blue-500 text-white text-center text-sm py-3 px-4 rounded-full shadow-md">
                Sistem Evaluasi Praktikum - 2026
            </div>
        </footer>
    `);

    console.log("Nama Asisten:", nama_asisten);
    console.log("Hasil Evaluasi:", hasilEvaluasi);

} catch (error) {
    console.error(error);
    document.write(`
        <section class="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm flex justify-start">
            <div class="flex items-start gap-3">
                <div>
                    <h3 class="text-lg font-bold text-red-700">
                        Terjadi Kesalahan
                    </h3>
                    <p class="text-red-600 mt-1">
                        ${error.message}
                    </p>
                    <p class="text-sm text-red-500 mt-3">
                        Silakan muat ulang halaman dan coba kembali.
                    </p>
                </div>
            </div>
        </section>
    `);
}