import foto1 from '../assets/gallery/foto1.jpg';
import foto2 from '../assets/gallery/foto2.jpg';
import foto3 from '../assets/gallery/foto3.jpg';
import foto4 from '../assets/gallery/foto4.jpg';
import foto5 from '../assets/gallery/foto5.jpg';
import foto6 from '../assets/gallery/foto6.jpg';
import foto7 from '../assets/gallery/foto7.jpg';

import teman1 from '../assets/gallery/tumbal2.jpg';
import teman2 from '../assets/gallery/tumbal1.jpg';
import teman3 from '../assets/gallery/tumbal3.jpg';
import teman4 from '../assets/gallery/tumbal4.jpg';

import projek1 from '../assets/gallery/Maber.png';
import projek2 from '../assets/gallery/sasar.png';
import projek3 from '../assets/gallery/sigarka.png';
import projek4 from '../assets/gallery/hungryMoon.png';


export default function Gallery() {
  // 1. Data Foto Desain
  const designPhotos = [
    { id: 1, src: foto1, title: 'wanita-wanita cantik', category: 'ibispaintX' },
    { id: 2, src: foto2, title: 'siapa yang tdk nonton Naruto??', category: 'ibispaintX' },
    { id: 3, src: foto3, title: 'Desain Pemilos uhuy', category: 'canva' },
    { id: 4, src: foto4, title: 'desainya ber-tema sekali', category: 'canva' },
    { id: 5, src: foto5, title: 'desain mpls ocis', category: 'canva & ibispaintX' },
    { id: 6, src: foto6, title: 'anjayy ini utk angkatan', category: 'canva' },
    { id: 7, src: foto7, title: 'akun ocisss', category: 'canva' },
  ];

  // 2. Data Foto Kenangan
  const memoryPhotos = [
    { 
      id: 101, 
      src: teman1, 
      title: 'Ini tumbal teman akwu', 
      desc: 'tumbal itu singkatan yang artinya itu lah' 
    },
    { 
      id: 102, 
      src: teman2, 
      title: 'Ini tumbal skin acid', 
      desc: 'koleksi suasana...asyik...cintanya besar besaran meski mesranya kecil kecilan' 
    },
    { 
      id: 103, 
      src: teman3, 
      title: 'Ini tumbal bobo', 
      desc: 'gaya tidurlah intinya' 
    },
    { 
      id: 104, 
      src: teman4, 
      title: 'Ini tumbal nonton teater', 
      desc: 'aku terharu, di suprot teman tumbal, terima kasih i lopyu oll' 
    },
  ];

  // 3. Data Foto Projek
  const dataProjek = [
    { id: 11, src: projek1, title: 'Projek Maber', url: 'https://github.com/salwaainiyyah/maber_AP14' },
    { id: 22, src: projek2, title: 'Projek Sasar', url: 'https://github.com/salwaainiyyah/sasar-pencinta-molen' },
    { id: 33, src: projek3, title: 'Projek Sigarka', url: 'https://github.com/salwaainiyyah/OOP-3-SIGARKA' },
    { id: 44, src: projek4, title: 'Projek Hungry Moon', url: 'https://github.com/salwaainiyyah/hungry-moon' },
  ];

  return (
    <section id="gallery" className="w-full bg-gradient-to-tr from-[#A4CF4A]/10 via-white to-[#FF8FB3]/10 py-16 flex flex-col gap-20">
      
      {/* SECTION 1: DESAIN! */}
      <div className="max-w-7xl mx-auto px-2 md:px-6 w-full">
        <div className="mb-4 text-center">
          <h2 className="text-xs font-black tracking-[0.25em] text-[#FF8FB3] uppercase mb-2">
            Creative Portfolio
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-[#0F4C3A] tracking-tighter">
            Aku kenyang desain
          </h3>
        </div>

        {/* Galeri Foto Desain (Scroll Horizontal) */}
        <div className="group/gallery flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pt-10 pb-28 px-6 md:px-10 custom-scrollbar items-start w-full">
          {designPhotos.map((foto) => (
            <div 
              key={foto.id} 
              className="snap-center shrink-0 flex flex-col w-[180px] sm:w-[200px] md:w-[230px]
                transition-all duration-500 ease-out
                group-hover/gallery:blur-[2px] group-hover/gallery:opacity-60 group-hover/gallery:scale-95
                hover:!blur-none hover:!opacity-100 hover:!scale-105 hover:-translate-y-2
                cursor-pointer group"
            >
              {/* Frame Foto */}
              <div className="w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-white/80 p-2.5 shadow-[0_10px_30px_rgba(15,76,58,0.06)] border border-white group-hover:border-[#FF8FB3] group-hover:shadow-[0_25px_50px_rgba(255,143,179,0.5)] transition-all duration-500">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                  <img 
                    src={foto.src} 
                    alt={foto.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                  />
                </div>
              </div>

              {/* Teks Keterangan */}
              <div className="pt-4 px-2 text-center flex flex-col gap-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <h4 className="text-base md:text-lg font-black text-[#0F4C3A] tracking-tight group-hover:text-[#FF8FB3] transition-colors">
                  {foto.title}
                </h4>
                <p className="text-xs font-bold text-[#35C8B4] uppercase tracking-wider">
                  {foto.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: GALERI FOTO (Grid 4 Kolom)     */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-10">
        
        <div className="mb-12 flex flex-col items-center">
          <h3 className="text-3xl font-bold text-[#0F4C3A] tracking-tight">
            Kenangan bersama teman wawa
          </h3>
          <div className="w-12 h-1 bg-[#35C8B4] mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {memoryPhotos.map((foto) => (
            <div 
              key={foto.id} 
              className="bg-[#35C8B4] rounded-[1.5rem] p-3 shadow-md hover:shadow-xl hover:shadow-[#35C8B4]/40 hover:-translate-y-1 transition-all duration-300 border border-[#35C8B4] flex flex-col group cursor-pointer"
            >
              <div className="w-full aspect-square overflow-hidden rounded-xl bg-white/20">
                <img 
                  src={foto.src} 
                  alt={foto.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
              </div>

              <div className="pt-4 pb-2 px-2 flex flex-col gap-1.5 flex-grow">
                <h4 className="text-white group-hover:text-[#FF8FB3] font-bold text-sm md:text-base leading-tight transition-colors duration-300">
                  {foto.title}
                </h4>
                <p className="text-white/90 text-xs font-medium leading-relaxed">
                  {foto.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* SECTION 3: Projek */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pb-10">
        
        <div className="mb-12 flex flex-col items-center">
          <h3 className="text-3xl font-bold text-[#0F4C3A] tracking-tight">
            Tugas Kak Mahesa
          </h3>
          <div className="w-12 h-1 bg-[#35C8B4] mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {dataProjek.map((foto) => (
            <div 
              key={foto.id} 
              className="bg-[#35C8B4] rounded-[1.5rem] p-3 shadow-md hover:shadow-xl hover:shadow-[#35C8B4]/40 hover:-translate-y-1 transition-all duration-300 border border-[#35C8B4] flex flex-col group cursor-pointer"
            >
              <div className="w-full aspect-square overflow-hidden rounded-xl bg-white/20">
                <img 
                  src={foto.src} 
                  alt={foto.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
              </div>

              <div className="pt-4 pb-2 px-2 flex flex-col gap-1.5 flex-grow">
                <h4 className="text-white group-hover:text-[#FF8FB3] font-bold text-sm md:text-base leading-tight transition-colors duration-300">
                  {foto.title}
                </h4>
                <a 
                  href={foto.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A4CF4A] hover:text-white font-bold text-sm md:text-base underline transition-colors duration-300"
                >
                  Lihat Projek
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>


    </section>
  );
}