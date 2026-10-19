
function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "PostgreSQL",
    "Git & GitHub",
  ];

  return (
    <section
      id="skills"
      className="bg-slate-100 px-6 py-16 text-slate-800"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Current Learning
        </h2>

        <div className="mx-auto mb-10 h-1 w-20 rounded bg-cyan-500"></div>

        <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
          Berikut adalah beberapa teknologi dan keterampilan
          yang sedang saya pelajari dan kembangkan.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white px-6 py-4 font-semibold shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-md"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
