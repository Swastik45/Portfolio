import { Link } from "react-scroll";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  // close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 h-16 sm:h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">

          {/* LOGO */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-xl sm:text-2xl font-black text-white tracking-wider flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              SWASTIK
            </a>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center h-full space-x-1">
            {links.map((l) => (
              <Link
                key={l.id}
                to={l.id}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="text-blue-400 font-semibold border-b-2 border-blue-400"
                className="
                  cursor-pointer h-full flex items-center px-4 text-slate-300
                  font-medium text-sm transition-colors hover:text-white
                "
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setOpen((prev) => !prev);
              }
            }}
            className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-lg
          border-b border-slate-800 overflow-hidden transition-all duration-300
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col py-2 px-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.id}
              to={l.id}
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => setOpen(false)}
              className="
                px-4 py-3 text-slate-300 font-medium text-sm rounded-lg
                hover:bg-slate-900 hover:text-white transition-colors
              "
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  );
}