
import foto1 from "../assets/Project/foto1.png";
import foto2 from "../assets/Project/foto2.png";
import foto3 from "../assets/Project/foto3.png";
import foto4 from "../assets/Project/foto4.png";

function Project() {
  const foto = [
    { id: 1, gambar: foto1, judul: "p1" },
    { id: 2, gambar: foto2, judul: "p2" },
    { id: 3, gambar: foto3, judul: "p3" },
    { id: 4, gambar: foto4, judul: "p4" },
  ];

  return (
    <section
      id="gallery"
      className="bg-slate-100 px-6 py-16 text-slate-800"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Project saya
        </h2>

        <div className="mx-auto mb-10 h-1 w-20 rounded bg-cyan-500"></div>

        <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
          Beberapa dokumentasi project saya selama belajar.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foto.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={item.gambar}
                alt={item.judul}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{item.judul}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Project;
