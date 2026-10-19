
function About() {
  const dataDiri = [
    { id: 1, label: "Status", nilai: "Mahasiswa" },
    { id: 2, label: "Bidang", nilai: "Web Development" },
    { id: 3, label: "Hobi", nilai: "Belajar Teknologi" },
    { id: 4, label: "Tujuan", nilai: "Menjadi Web Developer" },
  ];

  return (
    <section
      id="about"
      className="bg-white px-6 py-16 text-slate-800"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Tentang Saya
        </h2>

        <div className="mx-auto mb-10 h-1 w-20 rounded bg-cyan-500"></div>

        <p className="mx-auto mb-10 max-w-2xl text-center leading-relaxed text-slate-600">
          Saya adalah mahasiswa yang tertarik pada teknologi
          dan pengembangan website. Saat ini saya sedang
          mempelajari React untuk membangun website yang
          menarik, responsif, dan mudah digunakan.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dataDiri.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="mb-2 font-bold text-cyan-600">
                {item.label}
              </h3>

              <p className="text-slate-700">
                {item.nilai}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
