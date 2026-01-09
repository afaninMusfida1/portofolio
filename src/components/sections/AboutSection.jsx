import React from 'react';
import { motion } from 'framer-motion';
import CustomSkillSticker from '../ui/CustomSkillSticker';
import { bouncyTransition, wiggleHover } from '../../utils/animations';

const AboutSection = () => {
  return (
    <motion.div
        className="bg-paper-white p-[40px] rounded-[10px] border-[3px] mt-5 border-ink-black shadow-hard relative rotate-1 bg-lined bg-[length:100%_35px] leading-[35px] mb-10"
        whileHover={{ 
            rotate: 3, 
            y: -15, 
            boxShadow: "15px 15px 0px #1a1a1a",
            zIndex: 8
        }}
        // FIX HP:
        whileTap={{ scale: 0.98, rotate: 1 }}
        transition={bouncyTransition}
    >
        {/* About Sticker */}
        <motion.div
            className="absolute -top-[30px] right-[20px] bg-electric-purple text-neon-green px-[25px] py-[10px] font-fredoka text-[2rem] -rotate-5 border-[3px] border-ink-black shadow-[4px_4px_0_white] z-20 rounded-[50px] cursor-pointer"
            whileHover={{
                ...wiggleHover,
                backgroundColor: "#ccff00",
                color: "#1a1a1a",
                boxShadow: "4px 4px 0 black"
            }}
            // FIX HP:
            whileTap={{ scale: 0.9, rotate: -10 }}
        >
            HI! 👋
        </motion.div>

        {/* Skill Stickers (Sama seperti sebelumnya) */}
        <div className="absolute -right-[95px] top-[80px] hidden md:flex flex-col gap-[15px] mb">
            <CustomSkillSticker 
                text={<div className="flex items-center gap-2"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-5 h-5" alt="React" /><span>React</span></div>} 
                style={{ background: '#222', color: '#61DAFB' }} rotate="rotate-[5deg]" 
            />
            <CustomSkillSticker 
                text={<div className="flex items-center gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" className="w-5 h-5" alt="Tailwind" /><span>Tailwind</span></div>} 
                style={{ background: '#fff', color: '#38BDF8' }} rotate="-rotate-[3deg]" 
            />
            <CustomSkillSticker 
                text={<div className="flex items-center gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" className="w-5 h-5" alt="Laravel" /><span>Laravel</span></div>} 
                style={{ background: '#fff', color: '#FF2D20' }} rotate="-rotate-[4deg]" 
            />
            <CustomSkillSticker 
                text={<div className="flex items-center gap-2"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" className="w-5 h-5" alt="Figma" /><span>Figma</span></div>} 
                style={{ background: '#1a1a1a', color: '#fff' }} rotate="rotate-[2deg]" 
            />
        </div>

        <div className="group ">
            <div className="font-patrick bg-black text-neon-green inline-block px-[15px] py-[5px] rounded-[20px] mb-[10px] -rotate-2">
                It's me! 👋
            </div>
            
            <h1 className="font-fredoka text-[3.5rem] text-ink-black mb-[15px] leading-none shadow-neon-green transition-all duration-300 group-hover:-skew-x-[5deg] group-hover:[text-shadow:5px_5px_0px_#4c35de]">
                Afanin
            </h1>
            
            <p className="font-patrick text-[1.4rem] font-medium text-ink-black">
                Bukan sekadar tukang ketik kode, tapi <b>Frontend Wizard</b> yang <i>lowkey obsessed</i> sama <i>smooth animation</i> dan <i>clean architecture</i>. Hidup di antara tumpukan `div` dan <i>state management</i>. 😆🖐️
            </p>

            <motion.a 
                href="#contact"
                className="inline-block bg-ink-black text-neon-green px-[35px] py-[15px] font-fredoka text-[1.5rem] mt-[30px] -rotate-2 shadow-[5px_5px_0_rgba(255,255,255,0.5)] border-2 border-white rounded-[10px] no-underline"
                whileHover={{ 
                    rotate: 0, 
                    scale: 1.1, 
                    backgroundColor: "#ccff00", 
                    color: "black", 
                    borderColor: "black", 
                    boxShadow: "8px 8px 0 black" 
                }}
                // FIX HP:
                whileTap={{ scale: 0.95, rotate: -2 }}
                transition={bouncyTransition}
            >
                Let's Cook!
            </motion.a>
        </div>
    </motion.div>
  );
};
export default AboutSection;