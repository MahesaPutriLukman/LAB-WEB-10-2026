export default function About() {
  const personalData = [
    { id: 1, label: 'Name', value: 'Salwa Ainiyyah' },
    { id: 2, label: 'University', value: 'Universitas Hasanuddin' },
    { id: 3, label: 'Major', value: 'Sistem Informasi' },
    { id: 4, label: 'Interest', value: 'Chao Yufan, 14 Oktober 2005' },
  ];

  return (
    <section id="about" className="w-full bg-gradient-to-b from-white via-[#C2F2E4]/40 to-[#EDF7BE]/40">
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#FF8FB3] uppercase mb-4">Meri Kenalan!</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#0F4C3A] tracking-tighter">About Me</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-xl font-bold text-[#0F4C3A] mb-4 border-b border-[#35C8B4]/30 pb-4">Who Am I?</h4>
            <p className="text-[#226E54] leading-relaxed font-medium"> </p>
              Aku adalah mahasiswi yang memiliki minat besar pada dunia Seni. Kalau mampu, ingin rasanya ku kuasai semua bidang seni, mulai dari seni visual, seni musik, tari, hingga seni pertunjukan!. Apalah arti hidup tanpa seni! Untuk itu, Aku ingin terus mengembangkan kemampuan ku dan mencoba banyakkk hal baru.
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white">
            <h4 className="text-xl font-bold text-[#0F4C3A] mb-6 border-l-4 border-[#35C8B4] pl-4">Personal Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {personalData.map((item) => (
                <div key={item.id} className="flex flex-col p-3 rounded-xl hover:bg-[#C2F2E4]/50 transition-colors duration-300">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#FF8FB3] mb-1">{item.label}</span>
                  <span className="text-sm font-bold text-[#0F4C3A]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}