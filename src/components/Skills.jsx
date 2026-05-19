import React from 'react'

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
]

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
]

const Skills = () => {
  return (
    <section
      id="skills"
      className="section-split min-h-screen py-20 px-4 sm:px-6 bg-transparent"
    >
      <div className="section-content relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 inline-block">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white">
            Technical Arsenal
          </h2>
          <div className="h-4 bg-gradient-to-r from-blue-600 via-black to-red-600 w-full mt-2" />
        </div>

        {/* ACCOMPLISHMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {(accomplishments || []).map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="bg-white/95 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">{item.icon}</div>

              <h3 className="text-xl font-black uppercase leading-tight mb-1 text-black">
                {item.title}
              </h3>

              <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-4">
                {item.organization}
              </p>

              <p className="text-sm font-bold text-gray-600 leading-relaxed uppercase">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(technicalStack || []).map((stack, idx) => (
            <div
              key={`${stack.category}-${idx}`}
              className="relative bg-white/95 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden backdrop-blur-sm"
            >

              {/* HEADER */}
              <div className="bg-black p-4 border-b-4 border-black">
                <h3 className="text-lg font-black text-white uppercase tracking-widest text-center">
                  {stack.category}
                </h3>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <ul className="space-y-4">
                  {(stack.skills || []).map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-4 group"
                    >
                      <div className="h-4 w-4 bg-red-600 border-2 border-black group-hover:rotate-45 transition-transform" />
                      <span className="text-lg font-black text-black uppercase tracking-tighter">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-20 border-t-4 border-black pt-8 flex justify-between items-end">
          <div className="max-w-md">
            <p className="text-2xl font-black text-white uppercase leading-none">
              Always optimizing. <br /> Always building.
            </p>
          </div>

          <div className="bg-black text-white px-6 py-3 font-black uppercase text-sm tracking-widest border-2 border-white">
            Ver. 2.0.26
          </div>
        </div>

      </div>
    </section>
  )
}

export default Skills