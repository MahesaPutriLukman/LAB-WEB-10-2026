import profil from '../assets/galeri/foto_profil.jpeg'
function Hero() {
    const handleClick = () => {
        console.log("Thank you sudah melihat portofolio saya")
    }

    return(
        <section id="hero" className="flex min-h-[80vh] flex-col items-center justify-center gap-10 bg-slate-950 px-6 py-12 text-white md:flex-row md:justify-between md:px-16">
            <div className="max-w-xl text-center md:text-left">
                <p className="mb-3 font-medium text-indigo-400">
                Halo, perkenalkan saya
                </p>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Achmad Tifli
                </h1>
 
                <h2 className="mt-3 text-xl font-semibold text-slate-300">
                Mahasiswa Sistem Informasi
                </h2>

                <p className="mt-5 leading-7 text-slate-400">
                Saya sedang belajar pengembangan web dan teknologi
                digital. Saya ingin terus mengembangkan kemampuan
                dalam pemrograman dan analisis data.
                </p>

                <button
                type="button"
                onClick={handleClick}
                className="mt-7 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
                >
                Kenali Saya
                </button>
            </div>

            <div className="flex shrink-0 justify-end">
                <img
                src={profil}
                alt="Foto profil Achmad Tifli"
                className="h-56 w-56 rounded-full border-4 border-indigo-500 object-cover shadow-xl shadow-indigo-950/50 sm:h-72 sm:w-72"
                />
            </div>
        </section>
    )
}
export default Hero;