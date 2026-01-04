import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import MiniProjectCard from '../ui/MiniProjectCard';

const ProjectGallery = () => {
  return (
    <>
        {/* Flagship Projects */}
        <div className="mb-[80px]">
            <div className="flex items-center gap-4 mb-6 px-4 md:px-0">
                <div className="h-[3px] bg-black flex-1"></div>
                <h3 className="font-fredoka font-bold text-xl uppercase bg-black text-white px-4 py-1 rounded-md -rotate-1">
                    Check This Out!
                </h3>
                <div className="h-[3px] bg-black flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
                <ProjectCard 
                    title="Gugah"
                    desc="Platform edukasi. Fitur chat real-time, artikel, game, dan lokasi aman terdekat."
                    tags={["react", "Tailwind"]}
                    color="bg-[#ff99cc]"
                    rotation="rotate-1"
                    repoLink="#"
                    demoLink="https://gugah-ten.vercel.app/" 
                />
                <ProjectCard 
                    title="NgeQuiz"
                    desc="Platform kuis online."
                    tags={["React", "Tailwind"]}
                    color="bg-[#33cc33] text-white"
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="https://ngequiz.netlify.app/" 
                />
                <ProjectCard 
                    title="AIPRA"
                    desc="Sistem manajemen aset untuk Pramuka. Fitur pendataan barang, pencatatan peminjaman, dan pelaporan stok otomatis."
                    tags={["PHP", "laravel", "MySQL", "Filament"]}
                    color="bg-[#33cc33] text-white"
                    rotation="-rotate-1"
                    repoLink="https://github.com/afaninMusfida1/AIPRA"
                    demoLink="https://aipra-4bm9.vercel.app/" 
                />
                <ProjectCard 
                    title="Sistem Surat"
                    desc="Sistem informasi pengarsipan surat untuk Techarea."
                    tags={["PHP", "Laravel", "MySQL"]}
                    color="bg-blue-300"           
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="#"
                />
                 <ProjectCard 
                    title="Seattle"
                    desc="Web App presensi siswa Seattle."
                    tags={["React", "Tailwind"]}
                    color="bg-teal-300"
                    repoLink="https://github.com/afaninMusfida1/Seattle"
                    demoLink="https://seattle-ten.vercel.app/"
                />
            </div>
        </div>

        {/* Mini Projects */}
        <div className="mb-[80px]">
            <div className="flex items-center gap-4 mb-6 px-4 md:px-0">
                <div className="h-[3px] bg-black flex-1"></div>
                <h3 className="font-fredoka font-bold text-xl uppercase bg-black text-white px-4 py-1 rounded-md -rotate-1">
                    More Experiments
                </h3>
                <div className="h-[3px] bg-black flex-1"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0">
                <MiniProjectCard 
                    title="Expense Tracker" 
                    desc="Pencatat pengeluaran." 
                    lang="HTML/JS" 
                    color="bg-green-300" 
                    repoLink="https://github.com/afaninMusfida1/Expense-Tracker" 
                    demoLink="https://expense-tracker-nine-orcin.vercel.app/" 
                />
                <MiniProjectCard 
                    title="Photostrip" 
                    desc="Web kreasi layout foto." 
                    lang="HTML/JS" 
                    color="bg-pink-300" 
                    repoLink="https://github.com/afaninMusfida1/Photostrip" 
                    demoLink="https://photostrip.vercel.app/" 
                />
                <MiniProjectCard 
                    title="Konversi Bilangan" 
                    desc="Tools konversi angka." 
                    lang="HTML/JS" 
                    color="bg-red-300" 
                    repoLink="https://github.com/afaninMusfida1/convert-bilangan" 
                    demoLink="https://convert-bilangan.vercel.app/" 
                />  
                <motion.a
                    href="https://github.com/afaninMusfida1"
                    target="_blank"
                    className="flex flex-col items-center justify-center p-5 border-[3px] border-dashed border-white rounded-[10px] text-white hover:border-black hover:text-black hover:bg-gray-50 transition-all cursor-pointer"
                    whileHover={{ scale: 0.98 }}
                    // FIX HP: Tambah efek tap
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="font-fredoka font-bold text-lg">View All Repos</span>
                    <span className="text-sm">on GitHub →</span>
                </motion.a>
            </div>
        </div>
    </>
  );
};
export default ProjectGallery;