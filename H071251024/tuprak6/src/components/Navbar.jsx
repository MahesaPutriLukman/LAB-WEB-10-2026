

function Navbar() {
  const menus = [
    { id: 1, nama: "Home" },
    { id: 2, nama: "About" },
    { id: 3, nama: "Skills" },
    { id: 4, nama: "Gallery" },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 px-6 py-5 text-white">
      <h1 className="text-xl font-bold text-cyan-400">
        MyPortfolio
      </h1>

      <div className="flex flex-wrap gap-5">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => console.log(menu.nama)}
            className="transition-colors hover:text-cyan-400"
          >
            {menu.nama}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
