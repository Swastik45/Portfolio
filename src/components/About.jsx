import React, { useEffect, useState } from 'react'


function TypingSimple({ texts, typingSpeed = 100, deletingSpeed = 60, pause = 1000 }) {

  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [mode, setMode] = useState("typing");

  useEffect(() => {
    const currentText = texts[index];

    if (mode === "typing") {
      if (charIndex < currentText.length) {
        const t = setTimeout(() => {
          setCharIndex(c => c + 1);
        }, typingSpeed);

        return () => clearTimeout(t);
      } else {
        // text finished, start pause
        const t = setTimeout(() => setMode("deleting"), pause);
        return () => clearTimeout(t);
      }
    }

    if (mode === "deleting") {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setCharIndex(c => c - 1);
        }, deletingSpeed);

        return () => clearTimeout(t);
      } else {
        // finished deleting → next text
        const nextIndex = (index + 1) % texts.length;
        setIndex(nextIndex);
        setMode("typing");
      }
    }
  }, [texts, index, charIndex, mode, typingSpeed, deletingSpeed, pause]);
  // until these parameters change we keep typing/deleting as useEffect wroks on state change but dont interfare main function

  return (
    <div className="text-3xl font-bold text-white">
      {texts[index].slice(0, charIndex)}
      <span className="inline-block w-1 h-6 bg-white ml-1 animate-pulse"></span>
    </div>
  );
}


const About = () => {


  return (
    <div className="min-h-screen flex items-center text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 about-section">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="backdrop-blur-md bg-linear-to-br from-black/40 via-black/30 to-transparent p-10 sm:p-8 lg:p-12 rounded-2xl shadow-2xl mt-40 border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              About Me
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-prose">
              Hello Everyone! I'm <span className="font-semibold text-blue-300">Swastik Paudel</span>, a passionate developer who builds dynamic and responsive web applications.
            </p>

            <TypingSimple texts={["Swastik Paudel",
              "Full Stack Developer",
              "Machine Learning Enthusiast",
              "Builder Mindset"]} />
          </div>

          {/* Right column left intentionally blank — background image is on the section */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </div>
  )
}

export default About