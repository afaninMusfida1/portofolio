import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { bouncyTransition } from '../../utils/animations';

const MiniProjectCard = ({ title, desc, lang, color, repoLink, demoLink }) => {
  return (
    <motion.div
      className="flex flex-col h-full p-5 border-[3px] border-black rounded-[10px] shadow-[4px_4px_0_black] bg-white relative overflow-hidden group text-black cursor-default"
      whileHover={{ y: -5, boxShadow: "8px 8px 0 black" }}
      // Efek tekan pada kartu (hanya visual)
      whileTap={{ scale: 0.99, boxShadow: "2px 2px 0 black", y: 0 }}
      transition={bouncyTransition}
    >
      {/* Dekorasi Bulatan di Pojok */}
      <div className={`absolute -right-4 -top-4 w-12 h-12 rounded-full border-2 border-black ${color}`}></div>
      
      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-fredoka font-bold text-lg leading-tight pr-2">{title}</h4>
          <span className="text-[10px] font-bold border border-black px-1.5 py-0.5 rounded-md bg-gray-100 whitespace-nowrap">
            {lang}
          </span>
        </div>

        {/* Description */}
        <p className="font-patrick text-sm text-gray-600 line-clamp-2 mb-4">
            {desc}
        </p>

        {/* Spacer agar tombol selalu di bawah */}
        <div className="flex-1"></div>

        {/* Action Buttons (Logic Link Valid) */}
        <div className="flex gap-2 mt-2 pt-3 border-t-2 border-dashed border-gray-200">
            
            {/* Tombol Repo / Github */}
            {repoLink && repoLink !== '#' && (
                <a href={repoLink} target="_blank" rel="noreferrer" className="flex-1">
                    <button className="w-full flex items-center justify-center gap-1.5 bg-black text-white text-xs font-bold py-1.5 rounded border border-transparent hover:bg-white hover:text-black hover:border-black transition-all cursor-pointer active:scale-95">
                        <Github size={12} /> Code
                    </button>
                </a>
            )}

            {/* Tombol Demo / Deploy */}
            {demoLink && demoLink !== '#' && (
                <a href={demoLink} target="_blank" rel="noreferrer" className="flex-1">
                    <button className="w-full flex items-center justify-center gap-1.5 bg-[#ccff00] text-black text-xs font-bold py-1.5 rounded border border-black shadow-[2px_2px_0_black] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer active:scale-95">
                        <ExternalLink size={12} /> Demo
                    </button>
                </a>
            )}

            {/* Jika tidak ada link sama sekali */}
            {(!repoLink || repoLink === '#') && (!demoLink || demoLink === '#') && (
                <div className="text-xs text-gray-400 italic w-full text-center py-1">
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
};
export default MiniProjectCard;