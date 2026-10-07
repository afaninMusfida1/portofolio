import React from 'react';
import { motion } from 'framer-motion';
import { Github, Figma } from 'lucide-react';
import { SiPostman } from "react-icons/si";
import CustomSkillSticker from '../ui/CustomSkillSticker';
import ExperienceCard from '../ui/ExperienceCard';
import FooterIcon from '../ui/FooterIcon';
import { bouncyTransition, wiggleHover } from '../../utils/animations';

const ResumeClipboard = () => {
  return (
    <div id="resume" className="mt-[60px] relative group/clipboard scroll-mt-24">
        {/* Metal Clip */}
        <div className="absolute -top-[25px] left-1/2 -translate-x-1/2 w-[160px] h-[60px] bg-white rounded-[10px] z-30 border-[3px] border-ink-black shadow-[4px_4px_0_black] flex justify-center items-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/clipboard:-translate-y-[5px] group-hover/clipboard:-rotate-1">
            <div className="w-[80%] h-[15px] bg-[#ccc] border-2 border-ink-black rounded-[20px]"></div>
        </div>

        <motion.div
            className="bg-[#222] rounded-[20px] p-[15px] pt-[60px] shadow-hard border-[3px] border-ink-black relative"
            whileHover={{ y: -5, boxShadow: "10px 10px 0 black" }}
            whileTap={{ scale: 0.99 }} 
            transition={bouncyTransition}
        >
            <div className="bg-paper-white min-h-[500px] rounded-[10px] p-[40px] grid grid-cols-1 md:grid-cols-2 gap-[50px] border-2 border-black">
                <section>
                    <motion.div 
                        className="inline-block px-[25px] py-[8px] font-fredoka font-semibold uppercase text-[1.4rem] mb-[25px] border-2 border-black shadow-[4px_4px_0_black] cursor-default bg-neon-green -rotate-2"
                        whileHover={wiggleHover}
                        whileTap={{ scale: 0.95, rotate: 2 }}
                    >
                        Education
                    </motion.div>
                    
                    <div className="mb-[25px] border-l-[4px] border-black pl-[20px] relative transition-all duration-300 group/timeline hover:translate-x-[10px] hover:border-l-neon-green">
                        <div className="absolute -left-[9px] top-0 w-[14px] h-[14px] bg-neon-green border-2 border-black rounded-full transition-all duration-300 group-hover/timeline:scale-150 group-hover/timeline:bg-electric-purple"></div>
                        <span className="bg-black text-white px-[10px] py-[4px] text-[0.8rem] font-bold rounded-[4px] mb-[5px] inline-block -rotate-1">2025 - Now</span>
                        <h3 className="font-fredoka text-[1.1rem] m-0">Politeknik Negeri Semarang</h3>
                        <p className="font-patrick text-[1.1rem] m-0">Teknik Informatika</p>
                    </div>

                    <div className="mb-[25px] border-l-[4px] border-black pl-[20px] relative transition-all duration-300 group/timeline hover:translate-x-[10px] hover:border-l-neon-green">
                        <div className="absolute -left-[9px] top-0 w-[14px] h-[14px] bg-neon-green border-2 border-black rounded-full transition-all duration-300 group-hover/timeline:scale-150 group-hover/timeline:bg-electric-purple"></div>
                        <span className="bg-black text-white px-[10px] py-[4px] text-[0.8rem] font-bold rounded-[4px] mb-[5px] inline-block -rotate-1">2022 - 2025</span>
                        <h3 className="font-fredoka text-[1.1rem] m-0">SMKN 1 Kandeman</h3>
                        <p className="font-patrick text-[1.1rem] m-0">Pengembangan Perangkat Lunak dan Gim</p>
                    </div>

                    <div className="mt-[40px]">
                        <motion.div 
                            className="inline-block px-[25px] py-[8px] font-fredoka font-semibold uppercase text-[1.4rem] mb-[25px] border-2 border-black shadow-[4px_4px_0_black] cursor-default bg-[#ff922b] text-white rotate-1"
                            whileHover={wiggleHover}
                            whileTap={{ scale: 0.95, rotate: -2 }}
                        >
                            Skill
                        </motion.div>
                        <div className="flex gap-[10px] mt-[5px] flex-wrap">
                            <CustomSkillSticker text="React" style={{ background: '#ffee00' }} rotate="rotate-0" />
                            <CustomSkillSticker text="Tailwind" style={{ background: '#38bdf8', color: 'white' }} rotate="rotate-2" />
                            <CustomSkillSticker text="Laravel" style={{ background: '#33cc33', color: 'white' }} rotate="rotate-3" />
                            <CustomSkillSticker text="Mysql" style={{ background: '#3399ff', color: 'white' }} rotate="-rotate-2" />
                            <CustomSkillSticker text="Next.js" style={{ background: '#000000', color: 'white' }} rotate="-rotate-1" />
                        </div>
                    </div>
                </section>

                <section>
                    <motion.div 
                        className="inline-block px-[25px] py-[8px] font-fredoka font-semibold uppercase text-[1.4rem] mb-[25px] border-2 border-black shadow-[4px_4px_0_black] cursor-default bg-electric-purple text-white rotate-2"
                        whileHover={wiggleHover}
                        whileTap={{ scale: 0.95, rotate: -2 }}
                    >
                        Experience
                    </motion.div>

                    <ExperienceCard 
                        title="Co-Founder & CTO - PT Yhoiki Digital Nusantara" 
                        year="Now" 
                        desc="Memimpin arsitektur dan pengembangan produk digital perusahaan, mulai dari aplikasi web hingga platform berbasis GIS, serta mengoordinasikan tim teknis."
                        bgClass="bg-[#d4f5ff]" 
                        rotateClass="-rotate-1"
                    />

                    <ExperienceCard 
                        title="Internship Web Developer" 
                        year="2024" 
                        desc="Mengembangkan fitur baru, meningkatkan fungsionalitas sistem, merancang antarmuka pengguna (UI), serta berkolaborasi dengan tim untuk mengembangkan proyek."
                        bgClass="bg-[#fffcd4]" 
                        rotateClass="rotate-1"
                    />

                    <div className="mt-[30px] flex justify-center gap-[20px]">
                        <FooterIcon icon={Github} bg="#ff9a00" />
                        <FooterIcon icon={Figma} bg="#31a8ff" />
                        <FooterIcon icon={SiPostman} bg="#9933ff" />
                    </div>
                </section>
            </div>
        </motion.div>
    </div>
  );
};
export default ResumeClipboard;