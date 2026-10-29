export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      id: 1, 
      name: 'IG First', 
      url: 'https://www.instagram.com/salwaa_nyh?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==', 
      style: 'md:-top-2 md:left-[18%] -rotate-12 bg-[#FF8FB3] text-white border-white' 
    },
    { 
      id: 2, 
      name: 'IG Quail', 
      url: 'https://www.instagram.com/quailnito_?utm_source=ig_web_button_share_sheet&cplk=ZDNlZDc0MzIxNw==', 
      style: 'md:top-[38%] md:left-[32%] rotate-6 bg-white text-[#0F4C3A] border-[#0F4C3A]' 
    },
    { 
      id: 3, 
      name: 'IG Dump', 
      url: 'https://www.instagram.com/swallo__0?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==', 
      style: 'md:top-2 md:right-[26%] -rotate-6 bg-[#C2F2E4] text-[#0F4C3A] border-white' 
    },
    { 
      id: 4, 
      name: 'GitHub', 
      url: 'https://github.com/salwaainiyyah', 
      style: 'md:top-[42%] md:right-[15%] rotate-12 bg-[#A4CF4A] text-white border-white' 
    },
  ];

  return (
    <footer id="footer" className="w-full bg-[#fdf5f7] relative overflow-hidden flex flex-col justify-end pt-24">
      
      {/* Wadah Utama (Teks Rata Tengah & Stiker Bertebaran) */}
      <div className="relative w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center pb-12 min-h-[350px] md:min-h-[420px]">
        
        {/* Stiker-stiker yang Menempel di Atas Teks */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-0 md:block w-full h-full relative z-20 pointer-events-none">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${link.style} 
                pointer-events-auto md:absolute px-6 py-3 rounded-full border-2 font-black text-xs md:text-sm uppercase tracking-wider 
                shadow-[4px_4px_0_rgba(15,76,58,0.2)] hover:scale-110 transition-transform duration-300 inline-block
              `}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Big Typography */}
        <h2 className="text-[19vw] md:text-[17vw] leading-[0.85] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF8FB3] to-[#35C8B4] tracking-tighter relative z-10 select-none cursor-default hover:scale-105 transition-transform duration-500 text-center mx-auto">
          Mari Kenalan
        </h2>
      </div>

      {/* Bagian Bawah */}
      <div className="w-full flex flex-col">
        <div className="w-full bg-white py-6 px-6 flex flex-col md:flex-row justify-between items-center text-center gap-2 border-t-2 border-[#0F4C3A]/10">
          <p className="text-sm md:text-base font-bold text-[#52796f]">
            &copy; {currentYear} Salwa Ainiyyah.
          </p>
          <p className="text-xs md:text-sm font-bold text-[#FF8FB3]">
            Kamu senang, aku senang, mari senang bersama!
          </p>
        </div>

        <div className="flex w-full h-4">
          <div className="flex-1 bg-[#FF8FB3]"></div>
          <div className="flex-1 bg-[#C2F2E4]"></div>
          <div className="flex-1 bg-[#EDF7BE]"></div>
          <div className="flex-1 bg-[#A4CF4A]"></div>
          <div className="flex-1 bg-[#35C8B4]"></div>
          <div className="flex-1 bg-[#0F4C3A]"></div>
        </div>
      </div>

    </footer>
  );
}