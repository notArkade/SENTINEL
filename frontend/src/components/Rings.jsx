import React from "react";

const Rings = ({position1, position2, position3, position4}) => {
  return (
    <>
      {/* Top Left Ring with Soft Glow */}
      <div className={`absolute ${position1} w-[50rem] h-[50rem] border-[10rem] border-black/5 rounded-full opacity-60 animate-pulse shadow-[0_0_50px_#a855f7]`}></div>
      {/* Bottom Left Ring with Soft Glow */}
      <div className={`absolute ${position2} w-[50rem] h-[50rem] border-[97rem] border-gray-900 rounded-full opacity-60 animate-pulse shadow-[0_0_50px_#a855f7]`}></div>
      {/* Top RIght Ring with Soft Glow */}
      {/* <div className={`absolute ${position3} ${position4} w-[50rem] h-[50rem] border-[10rem] border-black/5 rounded-full opacity-60 animate-pulse shadow-[0_0_50px_#a855f7]`}></div> */}
      {/* Bottom Right Ring with Soft Glow */}
      {/* <div className={`absolute ${position3} ${position4} w-[50rem] h-[50rem] border-[97rem] border-gray-900 rounded-full opacity-60 animate-pulse shadow-[0_0_50px_#a855f7]`}></div> */}
    </>
  );
};

export default Rings;

// top-[-70px] left-[-100px]
// bottom-[-70px] right-[-100px]