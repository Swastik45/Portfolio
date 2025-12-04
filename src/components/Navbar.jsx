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

  const onLinkClick = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand / logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-cyan-300 hover:to-teal-300 transition-all duration-300"
            >
              Swastik
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-1 lg:space-x-2 items-center">
            {links.map((l) => (
              <Link
                key={l.id}
                to={l.id}
                smooth={true}
                duration={600}
                offset={-70}
                className="cursor-pointer px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium text-sm lg:text-base relative group"
              >
                {l.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile burger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-lg bg-black/70 border-b border-white/10 ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pt-3 pb-4 space-y-1">
          {links.map((l, index) => (
            <Link
              key={l.id}
              to={l.id}
              smooth={true}
              duration={600}
              offset={-70}
              onClick={onLinkClick}
              className="block px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-base sm:text-lg border-l-4 border-transparent hover:border-blue-400"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: open ? 'slideIn 0.3s ease-out forwards' : 'none'
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}