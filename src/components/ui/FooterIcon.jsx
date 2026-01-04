import React from 'react';
import { motion } from 'framer-motion';

const FooterIcon = ({ icon: Icon, bg }) => (
  <motion.span
    className="inline-flex items-center justify-center text-white w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer"
    style={{ background: bg }}
    whileHover={{
      y: -5,
      scale: 1.1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      backgroundColor: bg,
      color: "white",
      borderColor: "white"
    }}
    // FIX HP: Efek membal saat ditekan
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <Icon size={20} />
  </motion.span>
);
export default FooterIcon;