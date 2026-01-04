import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Mail, Github } from 'lucide-react';
import { bouncyTransition } from '../../utils/animations';

const ProfileSidebar = () => {
  return (
    <div className="relative z-10 md:mx-0 mx-auto max-w-[300px] md:max-w-none mt-24 md:mt-24">
        {/* ID Card Wrapper */}
        <motion.div 
            className="relative z-20 flex flex-col items-center cursor-grab active:cursor-grabbing"
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} 
            dragElastic={0.2} 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.05 }}
        >
            {/* Tali ID Card (Sama) */}
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[20px] h-[150px] bg-ink-black border-l-2 border-r-2 border-dashed border-[#555] -z-10"></div>

            {/* Jepitan ID Card */}
            <div className="relative z-20 flex flex-col items-center -mb-6">
                <div className="w-[50px] h-[30px] bg-[#ddd] rounded-[5px] border-[3px] border-ink-black shadow-md flex justify-center items-center">
                    <div className="w-[60%] h-[40%] bg-white border-2 border-black rounded-[2px]"></div>
                </div>
                <motion.div 
                    className="font-fredoka font-semibold text-ink-black text-[1.8rem] uppercase bg-neon-green px-[10px] py-[2px] border-2 border-black -rotate-2 -mt-2 shadow-sm relative z-30"
                    whileHover={{ rotate: 2 }}
                    // FIX HP:
                    whileTap={{ rotate: -2, scale: 0.9 }} 
                >
                    ID CARD
                </motion.div>
            </div>

            {/* Kartu Fisik (Sama) */}
            <div className="bg-paper-white p-5 pb-10 rounded-[20px] border-[3px] border-ink-black shadow-hard -rotate-3 text-center w-full relative z-10 mt-2">
                <div className="w-full aspect-[3/4] bg-neon-green rounded-[12px] overflow-hidden mb-[15px] border-[3px] border-ink-black relative group mt-4">
                    <img 
                        src="/assets/Afanin.png" 
                        alt="Profile" 
                        className="w-full h-full object-cover grayscale sepia-[0.2] transition-all duration-500 group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-110 group-hover:rotate-2"
                    />
                </div>
                <h2 className="font-fredoka mt-[10px] text-2xl font-bold">Afanin Musfida</h2>
                <p className="font-patrick text-[#666] text-[1.1rem]">FrontEnd Developer</p>
            </div>
        </motion.div>

        {/* Sticky Note */}
        <motion.div
            className="bg-neon-green p-[25px] font-patrick text-[1.2rem] border-[3px] border-ink-black shadow-hard rotate-3 mt-[40px] relative z-10 w-[110%] -ml-[5%] text-black md:max-w-none max-w-[320px] md:mx-0 mx-auto md:-ml-[5%]"
            whileHover={{ rotate: 5, y: -5 }}
            // FIX HP:
            whileTap={{ rotate: 0, scale: 0.98 }}
            transition={bouncyTransition}
        >
            <motion.div className="absolute -top-[15px] left-[35%] w-[100px] h-[30px] bg-ink-black/80 -rotate-2 bg-tape"></motion.div>
            
            <h3 className="border-b-2 border-dashed border-black mb-[10px] font-fredoka font-semibold text-lg">Say Hi!</h3>
            
            <div className="flex items-center gap-[10px] mb-[10px] border-b-2 border-dotted border-black pb-[5px] hover:text-electric-purple active:text-electric-purple cursor-pointer">
                <Github size={18} /> <span>AfaninMusfida1</span>
            </div>
            <div className="flex items-center gap-[10px] mb-[10px] border-b-2 border-dotted border-black pb-[5px] hover:text-electric-purple active:text-electric-purple cursor-pointer">
                <Linkedin size={18} /> <span>afanin musfida</span>
            </div>
            <div className="flex items-center gap-[10px] mb-[10px] border-b-2 border-dotted border-black pb-[5px] hover:text-electric-purple active:text-electric-purple cursor-pointer">
                <Instagram size={18} /> <span>@afaniwn</span>
            </div>
            <div className="flex items-center gap-[10px] border-none hover:text-electric-purple active:text-electric-purple cursor-pointer">
                <Mail size={18} /> <span>afaninmusfida1@gmail.com</span>
            </div>
        </motion.div>
    </div>
  );
};
export default ProfileSidebar;