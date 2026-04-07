import React from 'react'

const Skills = () => {
  const technicalStack = [
    {
      category: 'Development Architecture',
      skills: ['React.js', 'Next.js', 'PHP', 'Node.js', 'C++', 'JavaScript (ES6+)'],
      color: '#2563EB'
    },
    {
      category: 'Data & Systems',
      skills: ['Firebase/Firestore', 'MongoDB', 'Python (ML)', 'Predictive Analytics', 'Linear Regression'],
      color: '#DC2626'
    },
    {
      category: 'Tools & Infrastructure',
      skills: ['Git/GitHub', 'TailwindCSS', 'YouTube API', 'Web3 Concepts', 'System Auditing'],
      color: '#000000'
    }
  ];

  const accomplishments = [
    {
      title: '2nd Runner Up',
      organization: 'Code for Change +2 Grads Hackathon',
      description: 'Awarded for technical execution and innovative problem solving among top secondary graduates.',
      icon: '🏆'
    },
    {
      title: 'Certified Developer',
      organization: 'freeCodeCamp',
      description: 'Completed comprehensive curriculum covering Responsive Web Design and JavaScript Algorithms.',
      icon: '📜'
    },
    {
      title: 'Systems Auditor',
      organization: 'Freelance & Open Source',
      description: 'Managing and optimizing technical infrastructure for clients with a focus on clean execution.',
      icon: '⚙️'
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-4 sm:px-6 bg-[#8A1515] !opacity-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 inline-block">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-[#FFFFFF]">Technical Arsenal</h2>
          <div className="h-4 bg-[#000000] w-full mt-2"></div>
        </div>

        {/* Accomplishments Section - THE HIGHLIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {accomplishments.map((item, idx) => (
            <div key={idx} className="bg-[#FFFFFF] border-4 border-[#000000] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-black uppercase leading-tight mb-1 text-[#000000]">{item.title}</h3>
              <p className="text-xs font-black text-[#DC2626] uppercase tracking-widest mb-4">{item.organization}</p>
              <p className="text-sm font-bold text-[#4B5563] leading-relaxed uppercase">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {technicalStack.map((stack, idx) => (
            <div key={idx} className="bg-[#FFFFFF] border-4 border-[#000000] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="bg-[#000000] p-4 border-b-4 border-[#000000]">
                <h3 className="text-lg font-black text-[#FFFFFF] uppercase tracking-widest text-center">
                  {stack.category}
                </h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {stack.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-4 group">
                      <div className="h-4 w-4 bg-[#DC2626] border-2 border-[#000000] group-hover:rotate-45 transition-transform"></div>
                      <span className="text-lg font-black text-[#000000] uppercase tracking-tighter">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="mt-20 border-t-4 border-[#000000] pt-8 flex justify-between items-end">
          <div className="max-w-md">
            <p className="text-2xl font-black text-[#FFFFFF] uppercase leading-none">
              Always optimizing. <br />Always building.
            </p>
          </div>
          <div className="bg-[#000000] text-[#FFFFFF] px-6 py-3 font-black uppercase text-sm tracking-widest border-2 border-[#FFFFFF]">
            Ver. 2.0.26
          </div>
        </div>

      </div>
    </section>
  )
}

export default Skills