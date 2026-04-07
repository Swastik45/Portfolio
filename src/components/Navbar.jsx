import { Link } from "react-scroll";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    // FIX 1: Removed backdrop-blur-lg and bg-black/70. 
    // Using bg-[#000000] directly to bypass any config issues.
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#000000] border-b-4 border-[#DC2626] h-16 lg:h-20">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo - Pure White */}
          <div className="flex items-center">
            <a href="#" className="text-2xl font-black text-[#FFFFFF] tracking-tighter">
              SWASTIK
            </a>
          </div>

          {/* Desktop Links - No transparency */}
          <div className="hidden md:flex items-center h-full">
            {links.map((l) => (
              <Link
                key={l.id}
                to={l.id}
                smooth={true}
                className="cursor-pointer h-full flex items-center px-6 text-[#FFFFFF] font-bold uppercase hover:bg-[#DC2626] transition-colors border-l border-white/10"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile Button - Solid Background */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 bg-[#FFFFFF] text-[#000000] border-2 border-[#000000]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={3} d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Forced Solid Black */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#000000] border-b-4 border-[#DC2626] transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible h-0"
        }`}
      >
        <div className="flex flex-col">
          {links.map((l) => (
            <Link
              key={l.id}
              to={l.id}
              onClick={() => setOpen(false)}
              className="px-8 py-5 text-[#FFFFFF] font-black uppercase border-b border-white/10 hover:bg-[#DC2626]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}