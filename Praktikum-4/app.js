const namaAsisten = prompt("Selamat datang! Masukkan nama Asisten Lab yang bertugas:");

let htmlOutput = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        body {
            font-family: 'Press Start 2P', cursive;
            
            background-image: url('inimii.jpg'); 
            background-size: cover; 
            background-position: center; 
            background-attachment: fixed; 
            
            color: #003d33;
            margin: 0;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            background: #ff007f; 
            padding: 25px 40px;
            border: 4px dashed #ffea00;
            box-shadow: 10px 10px 0px #009688; 
            max-width: 800px;
            width: 100%;
            box-sizing: border-box;
        }
        h1 {
            color: #ffea00; 
            margin: 0 0 10px 0;
            font-size: 26px; 
            line-height: 1.6;
            text-shadow: 4px 4px 0px #b30059;
        }
        .alert-box {
            background-color: #ffffff;
            padding: 30px;
            border: 4px solid #009688;
            box-shadow: 8px 8px 0px #ffea00;
            font-size: 14px; 
            line-height: 2;
            max-width: 800px;
            width: 100%;
            text-align: center;
            margin-bottom: 40px;
            box-sizing: border-box;
        }
        .error-text {
            color: #ff007f;
            font-size: 20px; 
            margin-bottom: 20px;
            display: block;
        }
        .welcome-text span {
            color: #ff007f;
            font-size: 18px; 
        }
        .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 35px;
            justify-content: center;
            max-width: 1100px;
        }
        .card {
            background-color: #ffffff;
            padding: 30px 25px;
            width: 300px; 
            text-align: center;
            border: 4px solid #009688; 
            box-shadow: 8px 8px 0px #ffea00;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-sizing: border-box;
        }
        .card:hover {
            transform: translate(-5px, -5px);
            box-shadow: 13px 13px 0px #ff007f; 
        }
        .nama {
            font-size: 22px; 
            color: #ff007f; 
            margin-bottom: 25px;
            text-shadow: 2px 2px 0px #fbcfe8;
        }
        .info-nilai {
            font-size: 12px; 
            line-height: 2;
            color: #00796b;
            margin-bottom: 20px;
            background: #ccfbf1;
            padding: 15px;
            border: 2px dashed #009688;
        }
        .info-rata {
            font-size: 14px; 
            margin-bottom: 30px;
            color: #004d40;
            line-height: 1.6;
        }
        .badge {
            display: inline-block;
            padding: 15px 20px;
            font-size: 12px; 
            text-transform: uppercase;
        }
        .lulus {
            background-color: #ffea00; 
            color: #00796b; 
            border: 3px solid #009688;
        }
        .tidak-lulus {
            background-color: #ff007f; 
            color: #ffffff;
            border: 3px solid #ffea00; 
        }
    </style>

    <div class="header">
        <h1>DASHBOARD<br>PRAKTIKUM</h1>
    </div>
`;

// Logika Pengkondisian Akses
if (!namaAsisten || namaAsisten.trim() === "") {
    // Tampilan jika Akses Ditolak
    htmlOutput += `
        <div class="alert-box">
            <span class="error-text">AKSES DITOLAK!</span>
            Anda tidak memasukkan identitas asisten.<br><br>
            Silakan refresh halaman dan isi nama Anda.
        </div>
    `;
} else {
    // Tampilan jika Akses Diterima
    htmlOutput += `
        <div class="alert-box welcome-text">
            Selamat datang Asisten <span>${namaAsisten}</span>!<br><br>
            Berikut adalah laporan hasil evaluasi praktikum.
        </div>
        <div class="card-container">
    `;
    const dataPraktikan = [
        { nama: "Valen", nilaiTugas: [80, 85, 90, 85, 95] },
        { nama: "Nekat", nilaiTugas: [60, 60, 60, 40, 78] },
        { nama: "kadek", nilaiTugas: [90, 90, 90, 50, 99] },
        { nama: "Anca", nilaiTugas: [75, 75, 75, 75, 75] },
        { nama: "Fiqra", nilaiTugas: [45, 45, 45, 45, 45] }
    ];
    // Proses Evaluasi
    const prosesEvaluasi = (data) => {
        return data.map(praktikan => {
            const totalNilai = praktikan.nilaiTugas.reduce((total, nilai) => total + nilai, 0);
            const rataRata = Math.round(totalNilai / praktikan.nilaiTugas.length);
            const status = rataRata >= 75 ? "Lulus" : "Tidak Lulus";
            return { ...praktikan, rataRata, status };
        });
    };
    const hasilEvaluasi = prosesEvaluasi(dataPraktikan);

    // Tampilkan di konsol browser
    console.log("=== Laporan Hasil Akhir Evaluasi ===");
    console.log(hasilEvaluasi);

    // Looping HTML Baris Praktikan
    for (let i = 0; i < hasilEvaluasi.length; i++) {
    
    let praktikan = hasilEvaluasi[i];
    let badgeClass = "";
    if (praktikan.status === "Lulus") {
        badgeClass = "lulus";
    } else {
        badgeClass = "tidak-lulus";
    }

    let teksRiwayatNilai = praktikan.nilaiTugas.join(", ");

    htmlOutput += `
        <div class="card">
            <div class="nama">${praktikan.nama}</div>
            <div class="info-nilai">Riwayat Nilai:<br>[ ${teksRiwayatNilai} ]</div>
            <div class="info-rata">Rata-rata:<br>${praktikan.rataRata}</div>
            <div class="badge ${badgeClass}">${praktikan.status}</div>
        </div>
    `;
    }

    htmlOutput += `</div>`; // Menutup card-container
}

// Render ke layar browser
document.write(htmlOutput);