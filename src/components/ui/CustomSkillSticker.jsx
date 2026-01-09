import React from 'react';
import { motion } from 'framer-motion';

const CustomSkillSticker = ({ text, style, rotate }) => (
  <motion.div
    className={`px-[18px] py-[8px] rounded-[30px] font-fredoka font-semibold text-[0.9rem] border-2 border-black shadow-[2px_2px_0_black] cursor-pointer ${rotate}`}
    style={style}
    whileHover={{
      backgroundColor: "#1a1a1a",
      color: "#ccff00",
      rotate: [0, 5, -5, 3, 0],
      transition: { duration: 0.4 }
    }}
    whileTap={{
      scale: 0.9,
      rotate: [0, 5, -5, 3, 0], 
      transition: { duration: 0.2 }
    }}
  >
    {text}
  </motion.div>
);
export default CustomSkillSticker;