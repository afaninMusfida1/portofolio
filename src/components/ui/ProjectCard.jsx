import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { bouncyTransition } from '../../utils/animations';

const ProjectCard = ({ title, desc, tags, color, rotation, repoLink, demoLink, label = "PROJECT" }) => (
  <motion.div
    className={`relative bg-white border-[3px] border-black rounded-[15px] p-0 overflow-hidden shadow-[8px_8px_0_black] ${rotation}`}
    whileHover={{ 
      y: -10, 
      boxShadow: "12px 12px 0 black", 
      rotate: 0,
      scale: 1.02
    }}
    whileTap={{ scale: 0.98, rotate: 0, y: 0, boxShadow: "4px 4px 0 black" }}
    transition={bouncyTransition}
  >
    <div className="bg-black p-3 flex gap-2 border-b-[3px] border-black">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-white/20"></div>
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-white/20"></div>
      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-white/20"></div>
    </div>

    <div className="p-6">
      <div className={`inline-block px-3 py-1 rounded-md border-2 border-black font-bold text-xs mb-3 shadow-[2px_2px_0_black] ${color}`}>
        PROJECT
      </div>
      
      <h3 className="font-fredoka text-2xl font-bold mb-2">{title}</h3>
      <p className="font-patrick text-lg text-gray-600 mb-4 leading-tight">{desc}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, i) => (
          <span key={i} className="bg-gray-100 px-2 py-1 text-xs font-bold border border-black rounded-md text-gray-700">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        
        {repoLink && repoLink !== '#' && (
            <a href={repoLink} target="_blank" rel="noreferrer" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 p-5 bg-black text-white font-fredoka py-2 rounded-lg border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all cursor-pointer active:scale-95">
                <Github size={16} /> Code
            </button>
            </a>
        )}
        
        {demoLink && demoLink !== '#' && (
            <a href={demoLink} target="_blank" rel="noreferrer" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 p-5 bg-[#ccff00] text-black font-fredoka py-2 rounded-lg border-2 border-black shadow-[3px_3px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer active:scale-95 active:shadow-none">
                <ExternalLink size={16} /> Demo
            </button>
            </a>
        )}
      </div>
    </div>
  </motion.div>
);
export default ProjectCard;