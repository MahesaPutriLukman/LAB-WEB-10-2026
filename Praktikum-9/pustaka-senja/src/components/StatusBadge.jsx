export default function StatusBadge({ tersedia }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
        tersedia ? "bg-sage/70 text-forest" : "bg-blush/70 text-rose-900"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${tersedia ? "bg-green-700" : "bg-rose-700"}`} aria-hidden="true" />
      {tersedia ? "Tersedia" : "Sedang Dipinjam"}
    </span>
  );
}
