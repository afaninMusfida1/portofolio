import React from 'react';
import { motion } from 'framer-motion';

/* Jendela transparan: scene 3D di belakang menampilkan stasiun section ini */
const SceneBand = ({ id, tag, h1, h2, p }) => (
  <div id={id} className="relative left-1/2 w-screen -translate-x-1/2 min-h-[85vh] flex items-end md:items-center px-[6vw] pt-24 pb-14 mb-[60px] scroll-mt-0 font-poppins pointer-events-none">
    <motion.div
      className="w-full max-w-[520px] pointer-events-auto"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-block bg-neon-green text-ink-black px-5 py-1.5 -rotate-2 font-fredoka font-semibold text-base border-[3px] border-ink-black shadow-hard rounded-[50px]">
        ★ {tag} ★
      </div>
      <h2 className="font-fredoka font-semibold text-white leading-[1.04] mt-5 text-[clamp(2.2rem,5.5vw,4rem)] [text-shadow:4px_4px_0_#1a1a1a]">
        {h1}<br /><span className="text-neon-green">{h2}</span>
      </h2>
      <p className="font-patrick text-white text-xl md:text-2xl mt-3 leading-snug">{p}</p>
      <p className="font-patrick text-white/80 text-lg mt-6">Scroll ↓</p>
    </motion.div>
  </div>
);

export default SceneBand;