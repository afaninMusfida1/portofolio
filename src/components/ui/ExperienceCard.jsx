import React from 'react';
import { motion } from 'framer-motion';
import { bouncyTransition } from '../../utils/animations';

const ExperienceCard = ({ title, year, desc, bgClass, rotateClass }) => (
  <motion.div
    className={`p-5 mb-5 rounded-xl border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)] relative cursor-pointer ${bgClass} ${rotateClass}`}
    whileHover={{
      scale: 1.05,
      rotate: 3,
      y: -10,
      boxShadow: "8px 8px 0 black",
      borderColor: "#4c35de",
      zIndex: 5
    }}
    // FIX HP: Efek tekan (scale down sedikit)
    whileTap={{ scale: 0.98, rotate: 0, boxShadow: "2px 2px 0 black" }}
    transition={bouncyTransition}
  >
    <h4 className="font-fredoka font-bold text-base m-0">{title}</h4>
    <small className="text-[#666] font-bold text-[0.85rem]">{year}</small>
    <p className="font-patrick text-[1.1rem] mt-[5px] m-0">{desc}</p>
  </motion.div>
);
export default ExperienceCard;