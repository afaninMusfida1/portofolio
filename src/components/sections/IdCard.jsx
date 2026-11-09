import React from 'react';
import { motion } from 'framer-motion';

const IdCard = () => (
  <motion.div
    className="relative z-20 flex flex-col items-center cursor-grab active:cursor-grabbing text-ink-black"
    drag
    dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
    dragElastic={0.2}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 1.05 }}
  >
    {/* Tali ID Card */}
    <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[20px] h-[150px] bg-ink-black border-l-2 border-r-2 border-dashed border-[#555] -z-10"></div>

    {/* Jepitan ID Card */}
    <div className="relative z-20 flex flex-col items-center -mb-6">
      <div className="w-[50px] h-[30px] bg-[#ddd] rounded-[5px] border-[3px] border-ink-black shadow-md flex justify-center items-center">
        <div className="w-[60%] h-[40%] bg-white border-2 border-black rounded-[2px]"></div>
      </div>
      <motion.div
        className="font-fredoka font-semibold text-ink-black text-[1.8rem] uppercase bg-neon-green px-[10px] py-[2px] border-2 border-black -rotate-2 -mt-2 shadow-sm relative z-30"
        whileHover={{ rotate: 2 }}
        whileTap={{ rotate: -2, scale: 0.9 }}
      >
        ID CARD
      </motion.div>
    </div>

    {/* Kartu Fisik */}
    <div className="bg-paper-white p-5 pb-10 rounded-[20px] border-[3px] border-ink-black shadow-hard -rotate-3 text-center w-full relative z-10 mt-2">
      <div className="w-full aspect-[3/4] bg-neon-green rounded-[12px] overflow-hidden mb-[15px] border-[3px] border-ink-black relative group mt-4">
        <img
          src="https://res.cloudinary.com/dfwe8am51/image/upload/v1767967813/Afanin_brbmiq.png"
          alt="Foto Afanin Musfida, Frontend Developer"
          draggable={false}
          className="w-full h-full object-cover grayscale sepia-[0.2] transition-all duration-500 group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-110 group-hover:rotate-2"
        />
      </div>
      <h2 className="font-fredoka mt-[10px] text-2xl font-bold">Afanin Musfida</h2>
      <p className="font-patrick text-[#666] text-[1.1rem]">FrontEnd Developer</p>
    </div>
  </motion.div>
);

export default IdCard;