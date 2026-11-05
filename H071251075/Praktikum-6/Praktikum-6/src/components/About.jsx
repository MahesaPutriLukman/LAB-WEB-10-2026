function About(){
    const saya = [
        {
            id: 1,
            title: "Pendidikan",
            isi: "Mahasiswa Sistem Informasi Universitas Hasanuddin"
        },
        {
            id: 2,
            title: "Minat",
            isi: "Saya Tertarik pada Data Science dan Machine Learning"
        },
        {
            id: 3,
            title: "Motto",
            isi: "Jika kau tak sanggup menahan lelahnya belajar, maka kau akan menanggung perihnya kebodohan"
        }
    ]

    return(
        <section id="about" className="bg-slate-950 px-6 py-16 text-white md:px-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
                Tentang Saya
            </h2>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                {saya.map((item) =>(
                   <div key={item.id} className="rounded-xl border border-slate-700 bg-slate-800 p-6">
                    <h3 className="mb-3 text-xl font-semibold text-indigo-400">
                        {item.title}
                    </h3> 
                    <p className="leading-7 text-slate-300">
                        {item.isi}
                        
                        {item.id === 3 && (
                            <span className="flex justify-center mt-4 block text-right italic">
                            - Imam Syafi'i -
                            </span>
                        )}
                    </p>
                   </div> 
                ))} 
            </div>
        </section>
    )
}
export default About;