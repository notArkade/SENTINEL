import React from "react";
import Rings from "../components/Rings";
import { Element } from "react-scroll";

const Hero = () => {
  return (
    <Element name="home">
    <section className="relative min-h-[calc(100vh-4rem)] flex justify-center items-center">
      <Rings position1="top-[-70px] right-[-100px]" position2="bottom-[-70px] left-[-100px]"/>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="text-center relative z-10">
        <h1 className="text-7xl font-extrabold uppercase mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text tracking-[0.4em]">Sentinel</h1>
        <p className="text-gray-400 text-2xl">
           A Machine Learning-Based NIDS for Cybersecurity Threat Detection 
        </p>
      </div>
    </section>
    </Element>
  );
};

export default Hero;
