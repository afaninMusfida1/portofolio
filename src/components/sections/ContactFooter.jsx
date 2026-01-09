import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { bouncyTransition } from '../../utils/animations';

const ContactFooter = () => {
  const socials = [
    { 
      id: 1, 
      name: "GitHub", 
      icon: <Github size={20} />, 
      url: "https://github.com/AfaninMusfida1", 
      color: "bg-[#333] text-white",
      hover: "hover:bg-[#000]"
    },
    { 
      id: 2, 
      name: "LinkedIn", 
      icon: <Linkedin size={20} />, 
      url: "https://linkedin.com/in/afanin-musfida", // Sesuaikan link
      color: "bg-[#0077b5] text-white",
      hover: "hover:bg-[#005582]"
    },
    { 
      id: 3, 
      name: "Instagram", 
      icon: <Instagram size={20} />, 
      url: "https://instagram.com/afaniwn", 
      color: "bg-[#e1306c] text-white",
      hover: "hover:bg-[#b01e4e]"
    },
    { 
      id: 4, 
      name: "Email", 
      icon: <Mail size={20} />, 
      url: "mailto:afaninmusfida1@gmail.com", 
      color: "bg-[#EA4335] text-white",
      hover: "hover:bg-[#c5221f]"
    }
  ];

  return (
    <div id="contact" className="mt-[80px] mb-10">
      <motion.div 
        className="bg-[#FFD600] border-[3px] border-black rounded-[20px] p-8 md:p-12 relative shadow-[10px_10px_0_black] overflow-hidden"
        whileHover={{ scale: 1.01, boxShadow: "14px 14px 0 black" }}
        transition={bouncyTransition}
      >
        {/* Background Pattern (Dot / Hiasan) */}
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white opacity-20 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          
          {/* Kiri: Teks Ajakan */}
          <div className="text-center md:text-left">
            <h2 className="font-fredoka font-black text-3xl md:text-5xl text-black leading-tight mb-2">
              LETS WORK <br/> TOGETHER!
            </h2>
            <p className="font-patrick text-xl md:text-2xl text-black/80">
              Info project lucu dungs. Japri is the key!!!
            </p>
          </div>

          {/* Kanan: Grid Tombol */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {socials.map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${item.color} ${item.hover} border-[3px] border-black p-4 rounded-[12px] flex items-center justify-center gap-2 font-fredoka font-bold shadow-[4px_4px_0_black] transition-colors relative`}
                whileHover={{ scale: 1.05, y: -2, boxShadow: "6px 6px 0 black" }}
                whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0 black" }}
              >
                {item.icon}
                <span>{item.name}</span>
                <ArrowUpRight size={16} className="absolute top-1 right-1 opacity-50" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer Text Kecil */}
        <div className="mt-10 border-t-[3px] border-black/20 pt-4 flex flex-col md:flex-row justify-between items-center font-patrick text-sm font-bold opacity-70">
           <p>© {new Date().getFullYear()} Afanin Musfida. All rights reserved.</p>
           <p>Made with ☕ and React</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFooter;