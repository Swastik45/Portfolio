import { Link } from "react-scroll";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { id: "about", label: "About" },
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
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#000000] border-b-4 border-[#DC2626] h-16 lg:h-20">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">

          {/* LOGO */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-2xl font-black text-[#FFFFFF] tracking-tighter"
            >
              SWASTIK
            </a>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center h-full">
            {links.map((l) => (
              <Link
                key={l.id}
                to={l.id}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="bg-[#DC2626]"
                className="
                  cursor-pointer h-full flex items-center px-6 text-[#FFFFFF]
                  font-bold uppercase transition-colors border-l border-white/10
                  hover:bg-[#DC2626]
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
            className="md:hidden p-2 bg-[#FFFFFF] text-[#000000] border-2 border-[#000000]"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="square"
                strokeWidth={3}
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 8h16M4 16h16"
                }
              />
            </svg>
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden absolute top-full left-0 w-full bg-[#000000]
          border-b-4 border-[#DC2626] overflow-hidden transition-all duration-300
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col">
          {links.map((l) => (
            <Link
              key={l.id}
              to={l.id}
              smooth={true}
              duration={500}
              offset={-80}
              onClick={() => setOpen(false)}
              className="
                px-8 py-5 text-[#FFFFFF] font-black uppercase
                border-b border-white/10 hover:bg-[#DC2626]
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