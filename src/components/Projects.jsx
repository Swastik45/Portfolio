import React from 'react'

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '1rem',
  padding: '1.5rem',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  marginTop: '2rem'
};

const personalProjects = [
  {
    title: 'Project 1: Youtube Clone For Old TV',
    description: 'A Youtube clone designed for old TV interfaces, providing a simplified and accessible video browsing experience with no extra loads only video links.',
    link: 'https://youtube-clone.kesug.com/?i=1',
    image: '/youtube.png',
    technologies: ['php', 'CSS', 'YouTube API'],
     github: 'https://github.com/Swastik45/Youtube-Clone-Old-TV/',
    date: '2024',
    role: 'Full-Stack Developer',
    features: [
     'Old-TV friendly minimal UI',
      'Ultra-low resource loading',
      'Direct video link streaming',
      'No user tracking or heavy scripts'
    ],
    techHighlights: [
      'Optimized for weak devices',
      'API rate-limit safe structure',
      'Lightweight PHP backend'
    ]
  },
  {
    title: 'Project 2: Content Creating Platform',
    description: 'A content creating platform where users can create and share articles, blogs, and multimedia content with a community of readers.',
    link: 'https://content-creating-platform.web.app/',
    image: '/content.png',
    technologies: ['React', 'Firebase', 'tailwindCSS'],
     github: 'https://github.com/Swastik45/ContentCreatingSite',
    date: '2024',
    role: 'Full-Stack Developer',
    features: [
      'Rich text blog editor',
      'User authentication + profiles',
      'Image upload support',
      'Real-time comments',
      'Admin moderation panel'
    ],
    techHighlights: [
      'Firestore real-time sync',
      'Modular React component system',
      'Fully responsive UI'
    ]
  }
];

const Projects = () => {
 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 text-white py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-bold mb-8 text-center text-red-600">Projects</h2>
      <p className="text-lg text-gray-900 leading-relaxed text-center mb-12">
        Here are some of the projects I've worked on recently. Check back soon for updates as I continue to build and showcase more of my work!
      </p>
      
      {personalProjects.map((project, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex flex-col md:flex-row gap-6 p-8">
            {project.image && (
    <div className="md:w-2/5 shrink-0 flex flex-col items-start">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-auto rounded-xl shadow-md border border-gray-200"
      />

      <div className="mt-6 text-gray-700 space-y-1 text-base">
        <div><span className="font-semibold text-gray-900">Completion Date:</span> {project.date}</div>
        <div><span className="font-semibold text-gray-900">Role:</span> {project.role}</div>
      </div>
    </div>
  )}
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">Technologies Used:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <li 
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                </div>
                <div style={cardStyle} className="mb-6">
                  <h4 className="text-xl font-semibold mb-2 text-black">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-900">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-1">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div style={cardStyle} className="mb-6">
                  <h4 className="text-xl font-semibold mb-2 text-black">Tech Highlights:</h4>
                  <ul className="list-disc list-inside text-gray-900">
                    {project.techHighlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="mb-1">{highlight}</li>
                    ))}
                  </ul>

                  </div>
              </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg w-fit"
              >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg w-fit "
              >
                View GitHub
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default Projects