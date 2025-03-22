import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link as LinkScroll } from "react-scroll";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NavLink = ({ title, className }) => (
    <LinkScroll
      to={title}
      offset={-40}
      smooth
      className={`cursor-pointer transition-all duration-300 ${className}`}
    >
      // {title}
    </LinkScroll>
  );

  return (
    <header className={clsx("fixed top-0 left-0 w-full z-50 p-10 transition-all duration-300", 
        hasScrolled && "bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md py-7 transition-all duration-300"
    )}>
      <div className="bg-transparent flex justify-center items-center">
        <nav>
          <ul className="flex space-x-16 text-gray-400 text-xl group">
            <NavLink title="home" className="peer opacity-100 group-hover:opacity-50 hover:opacity-100 transition-all duration-400"/>
            <NavLink title="analyse" className="peer opacity-100 group-hover:opacity-50 hover:opacity-100 transition-all duration-400"/>
            <NavLink title="about" className="peer opacity-100 group-hover:opacity-50 hover:opacity-100 transition-all duration-400"/>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
