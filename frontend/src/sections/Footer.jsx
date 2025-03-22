import React from "react";
import { Element } from "react-scroll";

const Footer = () => {
  return (
    <Element name="about">
      <footer className="backdrop-blur-md text-gray-400 text-center p-10 py-32">
        <div className="grid grid-cols-3 items-center justify-center">
          <p className="text-xl font-extrabold uppercase bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text tracking-[0.4em]">
            Sentinel
          </p>

          <p>By Arkadip Das</p>
          <p>Arkade &copy; 2025</p>
        </div>
      </footer>
    </Element>
  );
};

export default Footer;
