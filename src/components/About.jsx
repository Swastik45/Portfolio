import React, { useEffect, useState } from 'react'

function TypingSimple({ texts, typingSpeed = 100, deletingSpeed = 60, pause = 1000 }) {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts, typingSpeed, deletingSpeed, pause]);

  return (
    <div className="flex items-center h-12">
      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#000000] uppercase tracking-tighter">
        {texts[index].slice(0, charIndex)}
      </span>
      {/* Solid Red Cursor */}
      <span className="inline-block w-2 h-8 sm:h-10 bg-[#DC2626] ml-2 animate-pulse border border-[#000000]"></span>
    </div>
  );
}

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#8A1515]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left column - Content */}
          <div className="order-2 lg:order-1 space-y-10">
            <div className="space-y-4">
              <div className="inline-block">
                <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-2 text-[#FFFFFF] tracking-tighter uppercase">
                  About Me
                </h2>
                <div className="h-4 bg-[#000000] w-full max-w-[250px]"></div>
              </div>
            </div>

            {/* Bio Box */}
            <div className="bg-[#FFFFFF] p-8 sm:p-12 border-4 border-[#000000] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xl sm:text-2xl text-[#111827] leading-tight font-black uppercase tracking-tight">
                Hello Everyone! I'm{' '}
                <span className="text-[#2563EB] underline decoration-4 underline-offset-4">
                  Swastik Paudel
                </span>
                , a developer building high-execution web systems with a focus on logical infrastructure.
              </p>
            </div>

            {/* Status Box */}
            <div className="bg-[#F3F4F6] p-6 sm:p-8 border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-4 bg-[#DC2626] border-2 border-[#000000] animate-ping"></div>
                <span className="text-sm sm:text-base text-[#000000] uppercase tracking-[0.2em] font-black">
                  System Status // Active
                </span>
              </div>
              
              <TypingSimple 
                texts={[
                  "Full Stack Developer",
                  "Systems Auditor",
                  "BCA Student",
                  "Swastik Paudel"
                ]} 
              />
            </div>
          </div>

          {/* Right Column - Profile Image (FULL COLOR) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* This frame still moves on hover, but the picture stays color */}
              <div className="relative p-4 sm:p-6 bg-[#FFFFFF] border-[6px] border-[#000000] shadow-[20px_20px_0px_0px_#000000] transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none">
                
                <div className="relative aspect-square w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 border-4 border-[#000000] bg-[#000000] overflow-hidden">
                  <img 
                    src="https://avatars.githubusercontent.com/u/149481053?v=4" 
                    alt="Swastik Paudel" 
                    // CHANGE: Removed grayscale, brightness, and color hover transition. 
                    // It's now standard full color.
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>

                <div className="absolute -top-5 -left-5 bg-[#000000] text-[#FFFFFF] px-4 py-2 font-black text-xs tracking-tighter border-2 border-[#FFFFFF]">
                  ID: SWASTIK_45
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-[#DC2626] text-[#FFFFFF] px-4 py-2 font-black text-xs tracking-tighter border-2 border-[#000000]">
                  VERIFIED BUILDER
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About