// Placeholder sampul: sengaja dibuat generik (bukan sampul asli buku).
const warna = {
  Teknologi: "bg-sage",
  Fiksi: "bg-blush",
  "Pengembangan Diri": "bg-peach",
};

const ukuran = {
  sm: { judul: "text-[11px] leading-tight", penulis: "text-[9px]", pad: "p-2 pl-4" },
  md: { judul: "text-base leading-snug", penulis: "text-xs", pad: "p-3 pl-5" },
  lg: { judul: "text-2xl leading-snug", penulis: "text-sm", pad: "p-6 pl-9" },
};

export default function BukuCover({ judul, penulis, kategori, size = "md" }) {
  const u = ukuran[size];
  return (
    <div
      className={`relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-l-sm rounded-r-xl text-forest shadow-lg shadow-brown/30 ${warna[kategori] ?? "bg-peach"} ${u.pad}`}
      role="img"
      aria-label={`Placeholder sampul buku ${judul}`}
    >
      <span className="absolute inset-y-0 left-0 w-3 bg-forest/20" aria-hidden="true" />
      <span className="absolute right-3 top-0 h-[22%] w-3 rounded-b-sm bg-cream/80" aria-hidden="true" />
      <span className="mt-[18%] block h-px w-8 bg-forest/40" aria-hidden="true" />
      <div>
        <p className={`font-serif font-semibold ${u.judul}`}>{judul}</p>
        <p className={`mt-1 font-bold text-forest/80 ${u.penulis}`}>{penulis}</p>
      </div>
    </div>
  );
}
