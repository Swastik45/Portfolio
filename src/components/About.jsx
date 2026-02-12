import React, { useEffect, useState } from 'react'
import profileImg from '../../public/swastik.png'

function TypingSimple({ texts, typingSpeed = 100, deletingSpeed = 60, pause = 1000 }) {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing mode
        if (charIndex < currentText.length) {
          setCharIndex(prev => prev + 1);
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Deleting mode
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts, typingSpeed, deletingSpeed, pause]);

  return (
    <div className="flex items-center h-12">
      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        {texts[index].slice(0, charIndex)}
      </span>
      <span className="inline-block w-0.5 h-8 sm:h-10 bg-gradient-to-b from-cyan-400 to-blue-500 ml-1 animate-pulse"></span>
    </div>
  );
}

const About = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 about-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left column - Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent animate-fade-in">
                  About Me
                </h2>
                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent rounded-full"></div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:border-cyan-400/30 group">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-light">
                Hello Everyone! I'm{' '}
                <span className="font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                  Swastik Paudel
                </span>
                , a passionate developer who builds dynamic and responsive web applications.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-400/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-sm sm:text-base text-gray-400 uppercase tracking-wider font-semibold">Current Role</span>
              </div>
              <TypingSimple 
                texts={[
                  "Swastik Paudel",
                  "Full Stack Developer",
                  "Machine Learning Enthusiast",
                  "Builder Mindset"
                ]} 
                typingSpeed={100}
                deletingSpeed={50}
                pause={2000}
              />
            </div>
          </div>

          {/* Right column - Profile Image */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative group">
              {/* Gradient background blur effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-3xl"></div>
                <img 
                  src={profileImg} 
                  alt="Swastik Paudel - Profile" 
                  onLoad={() => setImageLoaded(true)}
                  className={`relative max-w-md w-full rounded-3xl shadow-2xl border-2 border-white/20 transition-all duration-700 hover:scale-[1.02] hover:rotate-1 ${
                    imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About