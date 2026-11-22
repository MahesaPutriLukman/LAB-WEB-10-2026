function Footer() {
  return (
    <footer className="mt-14 border-t border-amber-950/20 bg-[#1A120C] px-4 py-8 text-center text-stone-400">
      <div className="mx-auto max-w-6xl space-y-3">
        <div className="flex items-center justify-center gap-2 text-amber-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" x2="6" y1="2" y2="4" />
            <line x1="10" x2="10" y1="2" y2="4" />
            <line x1="14" x2="14" y1="2" y2="4" />
          </svg>
          <span className="font-extrabold tracking-wide text-amber-100">Kedai Kopi Senja</span>
        </div>
        <p className="text-xs text-stone-400">
          Menghadirkan kehangatan aroma kopi dan santapan lezat di setiap senja.
        </p>
        <div className="pt-2 text-[11px] text-stone-500">
          <p>© 2026 Kedai Kopi Senja. Terima kasih sudah berkunjung!</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;