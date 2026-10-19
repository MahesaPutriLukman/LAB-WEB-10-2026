const dataPraktikan = [ 
    { nama: "Budi", nilaiTugas: [80, 85, 90] }, 
    { nama: "Siti", nilaiTugas: [60, 60, 60] }, 
    { nama: "Andi", nilaiTugas: [90, 90, 90] }, 
    { nama: "Dewi", nilaiTugas: [75, 75, 75] }, 
    { nama: "Eko", nilaiTugas: [45, 45, 45] } 
]; 

function kalkulasi(nilai) {
    for (let i = 0; i < nilai.length; i++) {
        const data = nilai[i];
        let jumlah = data.nilaiTugas.reduce(function(a, b){
            return a + b
        }, 0)

        let rataRata = jumlah/data.nilaiTugas.length
        
        nilai[i] = {
            nama : data.nama,
            nilaiTugas : data.nilaiTugas,
            rataRata : rataRata
        }
    }
    return nilai
}


function validasi(nilai){
    for (let i = 0; i < nilai.length; i++) {
        const data = nilai[i];
        let status
        if (data.rataRata >= 75) {
            status = "Lulus"
        } else{
            status = "Tidak Lulus"
        }

        nilai[i] = {
            nama : data.nama,
            nilaiTugas : data.nilaiTugas,
            rataRata : data.rataRata,
            status : status
        }
    }
    return nilai
}
function predikat(nilai){
    for (let i = 0; i < nilai.length; i++) {
        const data = nilai[i];
        let predikat

        if (data.rataRata > 85){
            predikat = "A"
        } else if (data.rataRata > 80) {
            predikat = "B"
        } else if (data.rataRata > 75) {
            predikat = "C"
        } else {
            predikat = "D"
        }

        nilai[i] = {
            nama : data.nama,
            nilaiTugas : data.nilaiTugas,
            rataRata : data.rataRata,
            status : data.status,
            predikat : predikat
        }
    }
    return nilai
}

let namaAslab = prompt("Masukkan Nama Praktikan").toLowerCase()


if (namaAslab == "fayyadh") {
    kalkulasi(dataPraktikan)
    validasi(dataPraktikan)
    predikat(dataPraktikan)
    document.write(`
            <div class="flex flex-col bg-blue-500 gap-8 items-center p-16 rounded-b-[32px] text-white">
                <h1 class="text-6xl font-extrabold">Laporan Praktikum</h1>
                <h1 class="text-3xl font-bold">Nama Asisten Lab: ${namaAslab}</h1>
            </div>
    `)
    document.write(`
        <div class="flex flex-col justify-center items-center p-8">
        `)

    dataPraktikan.forEach(item => {
        let Nama = item.nama
        let RataRata = item.rataRata
        let Status = item.status
        let Predikat = item.predikat
        let warnaStatus

        if (Status == "Lulus") {
            warnaStatus = "bg-emerald-100 text-emerald-700"
        } else {
            warnaStatus = "bg-red-100 text-red-700"
        }

        document.write(`
            <div class="bg-white shadow-lg rounded-2xl flex flex-row items-center justify-between m-4 w-[720px] p-6 border border-l-8 border-l-blue-500">
                <div class="flex flex-col justify-start gap-4">
                    <div class="font-bold text-5xl text-blue-700">
                        <p>${Nama}</p>
                    </div>
                    <div class="font-bold text-xl text-blue-600">
                        <p>Nilai Rata-Rata: ${RataRata}</p>
                        <p>Predikat :${Predikat}</p>
                    </div>
                </div>
                <div class="font-bold text-md ${warnaStatus} px-4 py-2 rounded-xl">
                    <p>${Status}</p>
                </div>
            </div>
        `)
    })

    document.write(`
        </div>
        `)
} else {
    document.write(`
        <h1 class="text-7xl">Tidak ada aksesmu ${namaAslab}??</h1>
    `)
}