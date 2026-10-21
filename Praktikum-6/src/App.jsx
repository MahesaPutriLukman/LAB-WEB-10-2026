import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Gallery from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen text-[#0F4C3A] font-sans selection:bg-[#35C8B4] selection:text-white">
      
      {/* LOADING SCREEN (Murni CSS, Tidak pakai useState) */}
      <div className="loader-container fixed inset-0 z-[100] bg-[#EDF7BE] flex flex-col items-center justify-center overflow-hidden">
        {/* Glow efek cahaya di belakang teks */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FF8FB3]/40 rounded-full blur-[80px]"></div>
        
        <div className="loader-text flex flex-col items-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-[#0F4C3A] tracking-tighter mb-2">
            PORTFOLIO<span className="text-[#FF8FB3]">.</span>
          </h1>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#35C8B4]">
            Yuk lihat portofolio Aku!....
          </span>
          
          {/* Garis Progress Bar */}
          <div className="mt-8 w-48 h-[2px] bg-[#C2F2E4] rounded-full overflow-hidden relative">
            <div className="loader-progress absolute inset-y-0 left-0 bg-[#FF8FB3] rounded-full"></div>
          </div>
        </div>
      </div>
      {/* AKHIR LOADING SCREEN */}

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}