import matkul from '../assets/galeri/matkul.jpeg'
import organisasi from '../assets/galeri/organisasi.jpeg'
import lab from '../assets/galeri/lab.jpeg'
import kumpul from '../assets/galeri/kumpul.jpeg'

function Galeri(){
    const foto = [
        {id: 1, gambar: matkul, title: "Presentasi Matkul"},
        {id: 2, gambar: organisasi, title: "Perkenalan UKM Unhas Day"},
        {id: 3, gambar: lab, title: "Laboratorium Sistem Informasi"},
        {id: 4, gambar: kumpul, title: "Foto Angkatan"}
    ]
    return(
        <section id="galeri" className="bg-slate-950 px-6 py-16 text-white md:px-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
                Galeri Saya
            </h2>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {foto.map((item) => (
                <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 transition hover:-translate-y-1 hover:border-indigo-500"
                >
                    <img
                    src={item.gambar}
                    alt=""
                    className="h-48 w-full object-cover"
                    />

                    <h3 className="py-2 text-center font-medium">
                    {item.title}
                    </h3>
                </div>
                ))}
            </div>
        </section>
    )
}
export default Galeri;