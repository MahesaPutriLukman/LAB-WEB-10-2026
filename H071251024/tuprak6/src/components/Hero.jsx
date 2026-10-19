
function Hero() {
  return (
    <section className="flex flex-col-reverse items-center gap-10 bg-slate-900 px-6 py-20 text-white md:flex-row md:justify-center">
      <div className="max-w-xl text-center md:text-left">
        <p className="mb-3 font-medium text-cyan-400">
          Halo, perkenalkan saya
        </p>

        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          ERIZQ AFFANDITYA NURSIN
        </h1>

        <h2 className="mb-5 text-xl text-slate-300">
          Mahasiswa dan Web Developer Pemula
        </h2>

        <p className="mb-7 leading-relaxed text-slate-400">
          Saya sedang mempelajari pengembangan website
          menggunakan HTML, CSS, JavaScript, dan React.
          Saya senang mempelajari teknologi baru dan
          mengembangkan keterampilan pemrograman.
        </p>

        <button
          onClick={() => console.log("Halo! Terima kasih sudah mengunjungi portofolio saya.")}
          className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Hubungi Saya
        </button>
      </div>

      <img
        src="/foto-profil.jpg"
        alt="Foto profil saya"
        className="h-56 w-56 rounded-full border-4 border-cyan-400 object-cover shadow-xl md:h-72 md:w-72"
      />
    </section>
  );
}

export default Hero;
