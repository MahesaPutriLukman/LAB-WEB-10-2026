export default function Navbar() {
  const menus = [
    { id: 1, name: 'Home', link: '#home' },
    { id: 2, name: 'About', link: '#about' },
    { id: 3, name: 'Skills', link: '#skills' },
    { id: 4, name: 'Gallery', link: '#gallery' },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 w-full">
      <nav className="relative flex items-center justify-between py-3 px-8 bg-white/50 backdrop-blur-xl border border-[#35C8B4]/40 rounded-full shadow-[0_4px_30px_rgba(53,200,180,0.15)] w-full max-w-5xl">
        
        <span className="text-xl md:text-2xl font-black tracking-tighter text-[#0F4C3A]">
          PORTFOLIO<span className="text-[#FF8FB3]">.</span>
        </span>
        
        <div className="hidden md:flex items-center gap-8">
          {menus.map((menu) => (
            <a
              key={menu.id}
              href={menu.link}
              onClick={() => console.log(`Menu diklik: ${menu.name}`)}
              className="text-[#1A7A5D] font-bold text-sm uppercase tracking-widest hover:text-[#FF8FB3] transition-colors duration-300"
            >
              {menu.name}
            </a>
          ))}
        </div>

        <label htmlFor="mobile-menu" className="md:hidden cursor-pointer text-[#0F4C3A] p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        
        <input type="checkbox" id="mobile-menu" className="peer hidden" />
        
        <div className="hidden peer-checked:flex absolute top-[110%] left-0 right-0 bg-white/95 backdrop-blur-xl flex-col p-6 rounded-2xl shadow-xl border border-[#C2F2E4] gap-6 mt-2">
          {menus.map((menu) => (
            <a
              key={menu.id}
              href={menu.link}
              onClick={() => console.log(`Menu diklik: ${menu.name}`)}
              className="text-[#0F4C3A] font-bold text-base uppercase tracking-widest hover:text-[#FF8FB3] transition-colors"
            >
              {menu.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}