import React, { useState } from 'react'

const personalProjects = [
  {
    title: 'GovAudit NP',
    description: 'An autonomous accountability dashboard that verifies the 100-point government reform agenda through automated OSINT data collection and AI-driven analysis.',
    link: 'https://gova-audit-np.vercel.app/', // Update with your actual deployment link
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=800',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'jsPDF'],
    github: 'https://github.com/Swastik45/GovaAuditNP',
    date: '2026',
    role: 'Lead Systems Architect',
    features: [
      'Autonomous verification engine', 
      'Real-time accountability metrics', 
      'Programmatic PDF report generation'
    ],
    techHighlights: [
      'OSINT data parsing', 
      'Custom PDF vector rendering', 
      'Dynamic mission tracking'
    ]
  },
  {
  title: 'Share Auditor NP',
  description: 'A professional-grade financial auditing dashboard that transforms raw MeroShare transaction histories into actionable risk and growth intelligence.',
  link: 'https://share-auditor-np.vercel.app/', // Update with your actual deployment link
  image: 'https://images.unsplash.com/photo-1611974717482-98252c6a914e?auto=format&fit=crop&q=80&w=800',
  technologies: ['Next.js', 'TypeScript', 'Tremor', 'Tailwind CSS'],
  github: 'https://github.com/Swastik45/share-auditor-np',
  date: '2026',
  role: 'Systems Architect',
  features: [
    'Institutional risk concentration analysis', 
    'Automated NEPSE sector mapping engine', 
    'Privacy-first client-side data processing'
  ],
  techHighlights: [
    'Complex CSV stream parsing', 
    'Dynamic growth trend algorithms', 
    'Low-latency Tremor visualization'
  ]
},
  {
    title: 'CarbonCredit',
    description: 'A platform for tracking and trading carbon credits to incentivize environmental sustainability through a verifiable ledger.',
    link: 'https://carbon-credit-opal.vercel.app/', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    technologies: ['JavaScript', 'Node.js', 'Web3'],
    github: 'https://github.com/Swastik45/CarbonCredit',
    date: '2024',
    role: 'Backend/Logic Developer',
    features: ['Tokenized credits', 'Transaction ledger', 'Emissions calculator'],
    techHighlights: ['Smart contract integration', 'Real-time ledger updates']
  },
  {
    title: 'Lumino',
    description: 'A high-performance TypeScript project focusing on streamlined data processing and UI efficiency.',
    link: 'https://lumino-five.vercel.app/',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    technologies: ['TypeScript', 'React', 'Tailwind'],
    github: 'https://github.com/Swastik45/Lumino',
    date: '2024',
    role: 'Lead Developer',
    features: ['Type-safe architecture', 'Performance optimized hooks'],
    techHighlights: ['Zero-runtime overhead', 'Strict TS implementation']
  },
  {
    title: 'Bill_Prediction',
    description: 'A predictive analytics tool designed to forecast utility bills based on historical consumption patterns.',
    link: 'https://bill-prediction.vercel.app/',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['TypeScript', 'Python', 'ML'],
    github: 'https://github.com/Swastik45/Bill_Prediction',
    date: '2024',
    role: 'ML Engineer',
    features: ['Cost forecasting', 'Usage alerts', 'Comparative analysis'],
    techHighlights: ['Linear regression models', 'CSV data parsing']
  },
  {
    title: 'Content Creating Platform',
    description: 'A full-stack community platform for creators to share blogs and multimedia content.',
    link: 'https://content-creating-platform.web.app/',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800', 
    technologies: ['React', 'Firebase', 'TailwindCSS'],
    github: 'https://github.com/Swastik45/ContentCreatingSite',
    date: '2024',
    role: 'Full-Stack Developer',
    features: ['Rich text editor', 'Firebase Auth', 'Image Storage'],
    techHighlights: ['NoSQL Data Modeling', 'Real-time updates']
  },
  {
    title: 'Youtube Clone For Old TV',
    description: 'Ultra-lightweight PHP interface designed for low-resource hardware like legacy TVs.',
    link: 'https://youtube-clone.kesug.com/?i=1',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', 
    technologies: ['PHP', 'CSS', 'YouTube API'],
    github: 'https://github.com/Swastik45/Youtube-Clone-Old-TV/',
    date: '2024',
    role: 'Full-Stack Developer',
    features: ['Zero JS overhead', 'Direct streaming', 'Simple navigation'],
    techHighlights: ['API Caching', 'Minimalist DOM structure']
  },
];

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  return (
    // Forced background to Solid Crimson Red
    <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 bg-[#8A1515] !opacity-100">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 inline-block">
          <h2 className="text-6xl font-black uppercase tracking-tighter text-[#FFFFFF]">Selected Works</h2>
          <div className="h-4 bg-[#000000] w-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {personalProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-[#FFFFFF] border-4 border-[#000000] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              {/* Header - Solid Black when active */}
              <div 
                className={`p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between transition-all duration-200 ${expandedProject === index ? 'bg-[#000000] text-[#FFFFFF]' : 'hover:bg-[#F3F4F6] text-[#000000]'}`}
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-4xl font-black ${expandedProject === index ? 'text-[#FFFFFF] opacity-40' : 'text-[#000000] opacity-20'}`}>
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((t) => (
                        <span key={t} className={`text-[10px] font-black uppercase tracking-widest border-2 px-2 py-0.5 ${expandedProject === index ? 'border-[#FFFFFF]' : 'border-[#000000]'}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`text-xs font-black uppercase px-4 py-2 border-2 ${expandedProject === index ? 'border-[#FFFFFF]' : 'border-[#000000]'}`}>
                    {expandedProject === index ? 'HIDE DETAILS [-]' : 'VIEW DETAILS [+]'}
                  </span>
                </div>
              </div>

              {/* Expansion - Full Color Images */}
              {expandedProject === index && (
                <div className="p-8 border-t-4 border-[#000000] bg-[#FFFFFF] text-[#000000]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <p className="text-xl font-bold leading-tight border-l-8 border-[#DC2626] pl-4 uppercase">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 border-2 border-[#000000] bg-[#F3F4F6]">
                          <h4 className="font-black uppercase text-xs mb-3 text-[#DC2626] tracking-widest">Core Features</h4>
                          <ul className="text-xs font-black space-y-2">
                            {project.features.map(f => <li key={f} className="flex gap-2"><span>//</span> {f}</li>)}
                          </ul>
                        </div>
                        <div className="p-4 border-2 border-[#000000] bg-[#F3F4F6]">
                          <h4 className="font-black uppercase text-xs mb-3 text-[#2563EB] tracking-widest">Engineering</h4>
                          <ul className="text-xs font-black space-y-2">
                            {project.techHighlights.map(h => <li key={h} className="flex gap-2"><span>&gt;</span> {h}</li>)}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a 
                          href={project.github} 
                          target="_blank"
                          className="flex-1 bg-[#000000] text-[#FFFFFF] text-center py-4 font-black uppercase tracking-widest hover:bg-[#DC2626] transition-colors border-2 border-[#000000]"
                        >
                          Source Code
                        </a>
                        <a 
                          href={project.link} 
                          target="_blank"
                          className="flex-1 border-4 border-[#000000] text-[#000000] text-center py-3 font-black uppercase tracking-widest hover:bg-[#000000] hover:text-[#FFFFFF] transition-all"
                        >
                          Live System
                        </a>
                      </div>
                    </div>

                    <div className="relative border-4 border-[#000000] bg-[#000000] aspect-video lg:aspect-auto">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/800x400/000000/FFFFFF?text=SYSTEM+VISUAL+ERROR" 
                          }}
                        />
                        {/* Decorative Tag */}
                        <div className="absolute bottom-2 right-2 bg-[#000000] text-[#FFFFFF] text-[10px] px-2 py-1 font-bold border border-[#FFFFFF]">
                          REF_IMG_{index + 1}
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;