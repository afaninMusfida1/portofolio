import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ImageOff, X, ZoomIn } from 'lucide-react';
import { bouncyTransition } from '../../utils/animations';

const ProjectCard = ({ title, desc, tags, color, rotation, repoLink, demoLink, label = "PROJECT", image }) => {
  const [zoom, setZoom] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
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

      {/* Preview Image */}
      {image && (
        failed ? (
          <div className="aspect-video bg-gray-100 border-b-[3px] border-black flex flex-col items-center justify-center text-gray-400 gap-1">
            <ImageOff size={28} />
            <span className="font-patrick text-sm">Preview belum tersedia</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="group/preview relative block w-full aspect-video bg-gray-100 border-b-[3px] border-black overflow-hidden cursor-zoom-in"
          >
            <img
              src={image}
              alt={`Preview ${title}`}
              loading="lazy"
              onError={() => setFailed(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
            />
            <span className="absolute bottom-2 right-2 bg-black text-white p-1.5 rounded-md border border-white/30 opacity-0 group-hover/preview:opacity-100 transition-opacity">
              <ZoomIn size={14} />
            </span>
          </button>
        )
      )}

      <div className="p-6">
        <div className={`inline-block px-3 py-1 rounded-md border-2 border-black font-bold text-xs mb-3 shadow-[2px_2px_0_black] ${color}`}>
          {label}
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

      {/* Lightbox (portal supaya tidak ikut rotate/transform card) */}
      {createPortal(
        <AnimatePresence>
          {zoom && (
            <motion.div
              className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoom(false)}
            >
              <button
                type="button"
                onClick={() => setZoom(false)}
                className="absolute top-4 right-4 bg-white border-2 border-black rounded-full p-2 shadow-[3px_3px_0_black] cursor-pointer"
              >
                <X size={20} />
              </button>
              <motion.img
                src={image}
                alt={`Preview ${title}`}
                className="max-w-full max-h-[90vh] border-[3px] border-black rounded-[12px] bg-white shadow-[8px_8px_0_black]"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                transition={bouncyTransition}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
};
export default ProjectCard;