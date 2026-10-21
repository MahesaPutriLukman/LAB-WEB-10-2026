export default function Skills() {
  const skills = [
    'tidur kayak mayat',
    'canva',
    'ibispaintX',
    'Figma',
    'ngoding dibantu sahabat',
  ];

  return (
    <section id="skills" className="w-full bg-gradient-to-r from-[#C2F2E4] via-[#35C8B4]/40 to-[#FF8FB3]/30">
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#0F4C3A] uppercase mb-4">Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-md">My Magic Spells</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="group px-8 py-6 bg-white/80 backdrop-blur-md border border-white hover:border-[#FF8FB3] rounded-2xl transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl flex items-center justify-center cursor-default"
            >
              <span className="text-base font-bold text-[#1A7A5D] group-hover:text-[#FF8FB3] transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}