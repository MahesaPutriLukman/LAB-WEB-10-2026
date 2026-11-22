
function Navbar() {
    const menu = [
        { id: 1, title: "Home", link: "#hero" },
        { id: 2, title: "About", link: "#about" },
        { id: 3, title: "Skills", link: "#skills" },
        { id: 4, title: "Galeri", link: "#galeri" }
    ];

    const handleClick = (item) => {
        console.log(`Menu ${item.title} diklik`);
    };

    return (
        <nav className="sticky top-0 z-50 flex flex-col items-center justify-between gap-4 border-b border-slate-700 bg-slate-950 px-6 py-5 text-white sm:flex-row sm:px-10 sticky">
            <h2 className="text-2xl font-bold">
                Portofolio
            </h2>

            <ul className="flex flex-wrap justify-center gap-5">
                {menu.map((item) => (
                    <li key={item.id}>
                        <a
                            href={item.link}
                            onClick={() => handleClick(item)}
                            className="text-sm font-medium text-slate-300 transition hover:text-indigo-400"
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
