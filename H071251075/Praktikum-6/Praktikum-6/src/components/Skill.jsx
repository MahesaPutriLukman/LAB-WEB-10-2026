function Skills(){
    const skills = [
        { id: 1, title: "HTML", tingkatan: "Pemula"},
        { id: 2, title: "CSS & Tailwind CSS", tingkatan: "Pemula" },
        { id: 3, title: "JavaScript", tingkatan: "Pemula" },
        { id: 4, title: "React JS", tingkatan: "Sedang Dipelajari" },
        { id: 5, title: "Python", tingkatan: "Pemula" },
        { id: 6, title: "Data Analysis", tingkatan: "Sedang Dipelajari" }
    ] 

    return(
        <section id="skills" className="bg-slate-950 px-6 py-16 text-white md:px-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
                Skills Saya
            </h2>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {skills.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-indigo-500">
                        <h3 className="text-lg font-semibold text-indigo-400">
                            {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            {item.tingkatan}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Skills;