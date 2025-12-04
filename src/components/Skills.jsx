import React from 'react'

const Skills = () => {
  return (
    <div className="min-h-screen bg-linear-to-br bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-8 text-center text-white">Skills & Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-center text-white">Programming Languages</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                JavaScript
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
                Python
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                PHP
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                Java
              </li>
            </ul>
          </div>

          {/* Frameworks & Libraries */}
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-center text-white">Frameworks & Libraries</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
                React
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                Node.js
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Tailwind CSS
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                TensorFlow
              </li>
            </ul>
          </div>

          {/* Tools & Technologies */}
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-center text-white">Tools & Technologies</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                Git
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                Firebase
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-3"></span>
                Docker
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                MongoDB
              </li>
            </ul>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-white">Soft Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-2">🤝</div>
              <h4 className="text-lg font-semibold text-white">Teamwork</h4>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-2">💡</div>
              <h4 className="text-lg font-semibold text-white">Problem Solving</h4>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-2">📚</div>
              <h4 className="text-lg font-semibold text-white">Continuous Learning</h4>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-xl border border-white/20 hover:border-white/30 transition-all duration-300 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="text-lg font-semibold text-white">Goal Oriented</h4>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-white">Certifications</h3>
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">AWS Certified Developer - Associate</h4>
                  <p className="text-gray-300 mb-2">Amazon Web Services</p>
                  <p className="text-sm text-gray-400">Issued: 2023 • Expires: 2026</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Verified</span>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Google Cloud Professional Cloud Architect</h4>
                  <p className="text-gray-300 mb-2">Google Cloud</p>
                  <p className="text-sm text-gray-400">Issued: 2023 • Expires: 2025</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Verified</span>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">React Developer Certification</h4>
                  <p className="text-gray-300 mb-2">Meta (Facebook)</p>
                  <p className="text-sm text-gray-400">Issued: 2024 • No Expiration</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
