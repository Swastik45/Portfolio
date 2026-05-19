import React, { useState } from 'react'

const personalProjects = [
  {
    title: 'ShareAudit',
    description: 'A high-performance financial auditing dashboard designed to analyze stock portfolio risk concentration and growth metrics. Built with a focus on data accuracy and automated scraping logic for Nepal\'s NEPSE market.',
    link: 'https://share-audit.vercel.app/', 
    image: 'https://raw.githubusercontent.com/Swastik45/ShareAudit/refs/heads/main/public/dashboard.png',
    technologies: ['Next.js', 'TypeScript', 'Tremor', 'Tailwind CSS'],
    github: 'https://github.com/Swastik45/ShareAudit',
    date: '2026',
    role: 'Systems Architect',
    features: [
      'Tax & WACC auditing logic',
      'Risk concentration analysis',
      'Privacy-first data processing'
    ],
    techHighlights: [
      'High-performance NEPSE scraping',
      'Real-time financial dashboarding',
      'Self-healing data pipeline'
    ]
  },
  {
    title: 'GovAudit NP',
    description: 'An autonomous accountability dashboard leveraging OSINT data collection to verify and track government reform agendas. Built to provide real-time, data-driven insights into governance milestones.',
    link: 'https://gova-audit-np.vercel.app/', 
    image: 'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/053c8b2987d3dd816c8ac6c3584f5bd3?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDg3NDbZSS6Dp2azUaHcLmutz04PunjJo5BRzRCHMeZXwIgC1cDGVcqyOBVnIAajUg98RwjKvp%2FOhQiuNVRkcP2zPwqmwUI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3Mzk5MzkxNzM4MTkiDLqa7kb%2BWpmWmOa6WCrvBEqQAu%2BAP8JcYZW4RVpGTInx6N6HZTEVUeVXVRzB%2FZ1M%2B2sHxFKkOs%2BleO7GkuhFpKrPsAPA9oVOII4jZVRMsFqlN%2F2kp6X2CTa0fJbc2a3xXQocrd7%2BoLYOvWSP2UAtaMrA2%2FkkVKFDHG33zRTPjKQ%2FVZtfXJV0TmT6rMMu0ASpnObkvPIXnUHbbL1fWyRq7W6J79gpNAsTb%2BZDN1MO3t1bCg16TGob1OihQFa8%2BtXlmaMBGFMGqzXh5g5yWQEizX9%2Bg9HPRriXleBGOsxmH0PRkpUTrfl3XEu0N5AdH34mcloaE5bz8mBiy1B30YnO2IwcgN9hZAsOWTaks%2FTsOKPajcrhcG0jpNOCYMHNoXREUhcIr9WoiBRD%2BQ2802vKj3uDLfVZi%2FruuL%2B5C2ry7gy2NfN3C2Qp1Qb1KaX58fBmANUOpdxAlC3cScYyd0OOYoLSWJWbgZ%2Fz6a%2Bs15F6639dvBI%2Fnaa%2BCYgKoua2x5fVMuI9zaDi6bHojeNcCoh4G6X9S5roIskErvzBb81RNg%2FTkJurpsdhlxPp4cxbiYWkC3JKyCgIj8PZcOFKZ9UmwH2BRr4dVhtXAeYhV7qsMBqq1oJDAaW0cdQw5%2BORcL7%2BAa8jF88WyJc4q993bSKZFq0mwUevM7HaXnHiSwK0wwmIi3kI0pta3ir%2FCgclDC0FUbk0OJrzfT90LnD92kqE1Fo9OjWRwP6Ft1gjopnOCSsjOm8FUEHf7J7o4aLjxI4EOu39L6%2BZS8k6%2FFilb8uE4U73KKpsrHwFsWrsxUxxzwk8ZsUswCUMOQvWNZhP%2FY03C4i3zkSSRsfODh9s7JGOMK2QsdAGOpkB%2BmwQ2byRsmZf1IDEXP%2Bu3%2FTN58oas8fjRf8zNVN7Pq9r0OOAoV39E6vIoVQmKXn93MdfLd3zrMkvZ%2FChq4BTZ%2B24aBkea6PelbAjoPfdMV9GaG%2F15Mv85uWKptetoe9oF7hxO%2BKMhXmNYt3vla%2FBVFs6bJrX18jGcT7nDQb%2FhJegu8knTPlnE8FZFEIjPLbqKbdTm5iAjn%2Bp&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260519T112729Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5QR4Q3F75%2F20260519%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=1bbc150710aaef9c9cbe174f5dda1afb844269b2d98f6590e2ce269b57fe570d',
    technologies: ['Next.js', 'TypeScript', 'Python', 'jsPDF'],
    github: 'https://github.com/Swastik45/GovaAuditNP',
    date: '2026',
    role: 'Lead Systems Architect',
    features: [
      'Autonomous OSINT verification engine',
      'Real-time accountability metrics',
      'Programmatic PDF report generation'
    ],
    techHighlights: [
      'Automated public data parsing',
      'Archive snapshots for historical review',
      'Mission-critical data tracking'
    ]
  },
  {
    title: 'CarbonCredit',
    description: 'A decentralized marketplace for tracking and trading verified carbon credits. Uses satellite-derived NDVI analysis to automate plantation health verification and ensure data-driven transparency in carbon sequestration.',
    link: 'https://carbon-credit-opal.vercel.app/', 
    image: 'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/1e43249778e7b74d185982bf18d5b9dc?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJIMEYCIQDkms32chC52%2F2mpQBah9sNgQ2dUK0ZR2B9CX6k3Za8ewIhANaruiMV1vuCWfiql9QiOOzqZy1yE4ApGIi77v8Bb%2F8CKpsFCNT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNzM5OTM5MTczODE5IgwA8KXdXI%2FRqiZ38aEq7wRBNQjjJweLUciXRGQ64qmayRIKuNjp%2FFEY17g1cp%2FVM9Mt6A1JKalrMIZrozrDrHomgJHITTi5n8Y12aT%2B2tClUnZDy%2Fq0FWxL4qWSdz2PKWpIjk6yzb0XVK2dqsNFJrqe5SzqzZNTIPKOnE66nEmAYWJ7CbGl4r5SD6WqdlYaOmU95oGF2%2BGR4hNW%2BDRw3IhBvKpPTogBjtSQu1eDjhV22qoYDw0%2Bo6l653W0thtBPptVRG2VK0m12MxKtBGYm%2Ff2zdE319VnS3p6t5uGh10qxm8v%2BiV14F50Edhz%2FOcXazJUdNA9FSLYHd1RQfDXyrkk1sAZnS1JiHgkoI35VsbhjXmTzKCMRjzG82wSwODbYLLFxInZo%2BHsgzH1b%2BKRE6aN30MuZMFkbNv%2BV3YzILDCxkBeGiIo1%2FdhWUjOj%2Bc%2FfC3DM0II8KowfmmNk%2BbyM12lWCYTtco5Jw0po2OUj1eAomMXzw5Zkph5T%2FowAnqavP7RYM3jESmjFJ2MrPw6Wto6eaqZGQItksYafUZPMRKv%2BxZIydLW5Dp3g5bOqwirFgkLaVuE2o8lHz4BS11KMcHHGb7JytHh2m7C%2BF3knOTosmIhMxZRp1B%2FNYXNLAcHtbBTwHBLtIpRVSATheHrRHwMOFDi974uGSJLxY6%2BgFq9V7A29jOJhH3IBTcAVfMBo2MRipXqoHspxotQepeeogUt68UBzzTPMr8tF4URVOieIHbsBvBV4q%2Biuw1oRHNWj6GKdqi889gCgGogNNcMYjqt0M4keKt%2Fd9%2B5BpB1wGMZstI%2BFIosVTBJ40gy1w4ui2QivdPDPzpnpaZxj0bU8zDGgbHQBjqYAZpCxuVdGpCvLI6KXe6cHYozrLR3JBsP9YBpvdU98W2GL3KzpjqTPDztzpYAw53IQopbLUM0XYsoaTYUDc%2BppoRZSJg%2BQ2olMWetlSQto9GvrR0bIFSpxfYPeeB8utmSGrrR0KmP%2BgckK%2BW8R8xeCjC2Ke49AYLkdOEjwkzBeUvftdOnB0vesAjiL7du6aRigOi1XXm%2FMdYm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260519T112848Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5U4NG2ZPG%2F20260519%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=56bf9b1a0c0c227c7d9643f2af616ebe68dcb28c396dff2547be481a85a1ba90',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Leaflet'],
    github: 'https://github.com/Swastik45/CarbonCredit',
    date: '2026',
    role: 'Full-Stack Developer',
    features: [
      'Multi-role authentication system',
      'Interactive plantation mapping',
      'NDVI satellite verification'
    ],
    techHighlights: [
      'Satellite data integration',
      'Real-time verification workflow',
      'Farmer & Business dashboards'
    ]
  },
  {
    title: 'Lumino',
    description: 'An AI-powered image discovery platform that combines curated stock photography from Unsplash with AI-generated imagery. Search millions of photos or create unique visuals from text prompts in one beautiful interface.',
    link: 'https://lumino-five.vercel.app/',
    image: 'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/0c56d6c708b8c023924b1a89ed412bd3?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAsaCXVzLXdlc3QtMiJHMEUCIHBbrhJ0AHDr3QLQspHloGNz98DY8RyUGQUFr9t2lX0ZAiEAwvaW4GeOW02CxE5NVqJuUg%2Bo6zL4cbcf8jrM8C2Id30qmwUI1P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3Mzk5MzkxNzM4MTkiDGNQCw%2BMq0rgRwLg6CrvBKL7zQP%2BXsh34a3cCYhU05672TmTxyDLZHSIMOHsRjwwBJgWaWRHLXCTf7TC02A0f%2Fvb3DwkiNoaf83fi0sAQxirltQjKtuopshXJR7WRbIM%2FLqivL2BtHyeIewmS93fI8JysEC1o%2Be6toH3VpS%2BkBMnXYSgAyF7t9sAfATxa%2BvpeLYhpe9raM3%2FgUGirTKqUsx2HZtQvYCocBHlksNr98JYUPgoo%2FIRMl97MZLVoHC5DsvY1%2BdEFBJ%2F4FlSLEvWJobDInkINwFqt%2Fe0j%2Fqa8VvoqwaLSd6CzxpY%2Bj71%2BqziJXwDic5uMWgsmCsLv5xh%2Bq4TbhP8IMCv%2BNqtNC7tws2G2SQMGeGUixjq3vzIjnOapRZn2eW%2Bd2L%2BzuQB%2B3mgKVvxBirlsr3Unnvwbt4b%2FC7T9l3AfJqSM1m7Ih11rs13WfS9uB%2BFqsqoYJMRoRXnf%2BMDLlTqWbvjbYBsoctZ4xdlR%2BODILvLnRvZGPNj1slVP%2FaZEn4glfwneQX%2B4NZwdNyR%2BcPWpT%2FuvfA6ASriXGrFRbVKw8xP9V5d0A0GKnbrGoIXZQ%2B21Q5mhaNlyi3C6sFWAzDkhA3vRV621S2co4R6%2FsjH4ojrlsI5hvfw5YaGb0jaWQQIEBAqJ%2BVUbOqs5h%2BHuc1SXOc5uG4S3jeNyKx4QhT6iDiYvhNYifwK9pT5CRi1mHruY1raGwiE5Ij%2FP2HHtGv47cVqkjf471wAX51QNoP5kDNjZWoC4sbGdAn8ZIBWhULHX95jdPxa26FEoBmxLstgJ1ky89riFvFchQxjttslMfXvRYHelFbjUNOeb7ryhLlhhnqcvmb%2BJZHCMI%2BCsdAGOpkBrTxloRa0h9uPD7BTbWc4hKBFq3OBvXl2TTmyGH%2BxaDHp%2B0eKR9BkyyR2D2vlFZj0AsGgOqYHZZWpePovCydnHwu9BqD%2FhvT9cW4W0a8Y9LR7o%2BVl4uFkTWUtVx1BJ4B8OJVLc9HgpuT9uMf5vQStqvdu3R%2FHvTk7JRDcdhSEsapY1NQIzJXUZtgVsDh8phW8yJkLutWRVko1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260519T113000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5SUREXMW2%2F20260519%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=8a51286394bfedf12abef8f60c2e61c38dd976c0761775d2d1f750bdf9fbeb6b',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Swastik45/Lumino',
    date: '2026',
    role: 'Full-Stack Developer',
    features: ['Unsplash stock photo search', 'AI image generation', 'Theme system'],
    techHighlights: ['Pollinations.ai integration', 'Responsive masonry grid', 'Dark/Light mode']
  },
  {
    title: '2D Shooting Game',
    description: 'A dynamic action game where you control a player character that must survive waves of enemies. Defeat enemies by shooting them with your gun while managing your health and avoiding enemy fire.',
    link: 'https://github.com/Swastik45/2D-Shooting-Game',
    image: 'https://raw.githubusercontent.com/Swastik45/2D-Shooting-Game/refs/heads/main/Screenshot%20from%202026-04-30%2018-26-25.png',
    technologies: ['Rust', 'Bevy Engine'],
    github: 'https://github.com/Swastik45/2D-Shooting-Game',
    date: '2026',
    role: 'Game Developer',
    features: ['Enemy AI waves', 'Combat system', 'Score tracking'],
    techHighlights: ['ECS architecture', 'Collision detection', 'Tile-based world']
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