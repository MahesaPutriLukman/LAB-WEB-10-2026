export default function Hero() {
  const handleExploreClick = () => {
    // 1. Tetap memenuhi syarat tugas (mencetak pesan di console)
    console.log('Tombol Explore Work ditekan! Meluncur menuju Footer.');
    
    // 2. Meluncur mulus ke section Footer (Tanpa useState / props)
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="w-full bg-gradient-to-br from-[#EDF7BE] via-[#FF8FB3]/20 to-[#C2F2E4] overflow-hidden flex flex-col">
      {/* Konten Utama Hero */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-12 pt-32 pb-20 flex-grow">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-[#0F4C3A]">
            Hii, Aku... <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8FB3] to-[#35C8B4]">
              Salwa Ainiyyah!
            </span>
          </h1>
          
          {/* BUNGKUS TEKS KETIK ALA MESIN KETIK */}
          <div className="inline-flex max-w-full overflow-hidden pb-1">
            <span className="typing-effect text-xs sm:text-base md:text-lg font-bold tracking-tight text-[#1A7A5D]">
              Information Systems Student | Aku Ungass
            </span>
          </div>
          
          <p className="max-w-xl text-[#226E54] text-base md:text-lg leading-relaxed font-medium mt-4">
            Selamat datang! selamat datang! Sebelum itu, porto ini dibuat dengan bantuan sahabat karib saya yaitu mimiyy a.k.a. gemini terkasih. Untuk itu terima kasih bwanyakkkk. Jadi... panggil saja aku Wawa!, mahasiswa yang selalu berdoa semoga terlepas dari jeratan tugas yang menumpuk...
          </p>

          <div className="mt-8">
            <button 
              onClick={handleExploreClick}
              className="cursor-pointer font-bold bg-[#35C8B4] text-white px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(53,200,180,0.4)] hover:bg-[#FF8FB3] hover:shadow-[0_8px_30px_rgba(255,143,179,0.4)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out"
            >
              Kenalan Lebih Lanjut Yuk!
            </button>
          </div>
        </div>

        {/* Frame Foto Profil */}
        <div className="flex flex-col items-center justify-center relative mt-12 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#A4CF4A] to-[#FF8FB3] rounded-full scale-110 opacity-30 blur-3xl"></div>
          
          <div className="relative z-10 p-3 bg-[#35C8B4] rounded-[2.5rem] shadow-[0_20px_50px_rgba(53,200,180,0.3)] group rotate-3 hover:rotate-0 transition-all duration-500 cursor-pointer">
            <img 
              src="/profile.png" 
              alt="Salwa Ainiyyah" 
              className="rounded-[2rem] object-cover aspect-[4/5] w-[300px] md:w-[380px] grayscale group-hover:grayscale-0 group-active:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          
        </div>
      </div>

      {/* Running Text */}
      <div className="marquee-container w-full bg-white/30 backdrop-blur-md border-y border-white/50 text-[#1A7A5D] py-3 flex overflow-hidden whitespace-nowrap cursor-pointer mt-auto">
        <div className="animate-marquee font-bold text-sm md:text-base uppercase tracking-[0.2em] gap-8 pl-8">
          <span>🌸 Selamat Bertamu!</span>
          <span>✨ Semoga Bahagia Menyertai</span>
          <span>🍋 Kita Semua Keren!!</span>
          <span>🌸 Mahasiswa Kuat, Mahasiswa Hebat</span>
          <span>✨ Terima Kasih</span>
          <span>🍋 Hidup Yang Bahagia</span>
        </div>
        <div className="animate-marquee font-bold text-sm md:text-base uppercase tracking-[0.2em] gap-8 pl-8">
          <span>🌸 Selamat Bertamu!</span>
          <span>✨ Semoga Bahagia Menyertai</span>
          <span>🍋 Kita Semua Keren!!</span>
          <span>🌸 Mahasiswa Kuat, Mahasiswa Hebat</span>
          <span>✨ Terima Kasih</span>
          <span>🍋 Hidup Yang Bahagia</span>
        </div>
      </div>
    </section>
  );
}