import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import MiniProjectCard from '../ui/MiniProjectCard';

const SectionTitle = ({ children }) => (
  <div className="flex items-center gap-4 mb-6 px-4 md:px-0">
    <div className="h-[3px] bg-black flex-1"></div>
    <h3 className="font-fredoka font-bold text-xl uppercase bg-black text-white px-4 py-1 rounded-md -rotate-1">
      {children}
    </h3>
    <div className="h-[3px] bg-black flex-1"></div>
  </div>
);

const ProjectGallery = () => {
  return (
    <>
        {/* ===================== WEB ===================== */}
        <div id="web" className="mb-[80px] scroll-mt-24">
        <SectionTitle>Web Projects</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
                <ProjectCard
                    label="WEB"
                    title="NAPAK"
                    desc="Platform Web-GIS dan simulasi 3D untuk mitigasi longsor di Semarang."
                    tags={["Next.js", "TypeScript", "Three.js", "PostgreSQL"]}
                    color="bg-orange-300"
                    rotation="rotate-1"
                    repoLink="#"
                    demoLink="https://napak.web.id/"
                />
                <ProjectCard
                    label="WEB"
                    title="Reksa"
                    desc="Platform WebGIS pelaporan banjir dan kerusakan infrastruktur di Semarang."
                    tags={["WebGIS", "Semarang"]}
                    color="bg-sky-300"
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="https://reksa.web.id/"
                />
                <ProjectCard
                    label="WEB"
                    title="Gugah"
                    desc="Platform edukasi. Fitur chat real-time, artikel, game, dan lokasi aman terdekat."
                    tags={["react", "Tailwind"]}
                    color="bg-[#ff99cc]"
                    rotation="rotate-1"
                    repoLink="#"
                    demoLink="https://gugah-ten.vercel.app/"
                />
                <ProjectCard
                    label="WEB"
                    title="NgeQuiz"
                    desc="Platform kuis online."
                    tags={["React", "Tailwind"]}
                    color="bg-[#33cc33] text-white"
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="https://ngequiz.netlify.app/"
                />
                <ProjectCard
                    label="WEB"
                    title="AIPRA"
                    desc="Sistem manajemen aset untuk Pramuka. Fitur pendataan barang, pencatatan peminjaman, dan pelaporan stok otomatis."
                    tags={["PHP", "laravel", "MySQL", "Filament"]}
                    color="bg-[#33cc33] text-white"
                    rotation="-rotate-1"
                    repoLink="https://github.com/afaninMusfida1/AIPRA"
                    demoLink="https://aipra-4bm9.vercel.app/"
                />
                <ProjectCard
                    label="WEB"
                    title="Sistem Surat"
                    desc="Sistem informasi pengarsipan surat untuk Techarea."
                    tags={["PHP", "Laravel", "MySQL"]}
                    color="bg-blue-300"
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="#"
                />
                <ProjectCard
                    label="WEB"
                    title="Seattle"
                    desc="Web App presensi siswa Seattle."
                    tags={["React", "Tailwind"]}
                    color="bg-teal-300"
                    repoLink="https://github.com/afaninMusfida1/Seattle"
                    demoLink="https://seattle-ten.vercel.app/"
                />
            </div>
        </div>

        {/* ===================== APP ===================== */}
        <div id="app" className="mb-[80px] scroll-mt-24">
            <SectionTitle>Mobile Apps</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
                <ProjectCard
                    label="APP"
                    title="KliQ"
                    desc="Aplikasi digitalisasi antrean dan administrasi pasien dengan Smart ETA berbasis Dynamic Moving Average."
                    tags={["UI/UX", "Figma", "QR Check-in"]}
                    color="bg-purple-300"
                    rotation="rotate-1"
                    repoLink="#"
                    demoLink="https://youtu.be/ZIx9REMy0Vs"
                />
                <ProjectCard
                    label="APP · IN PROGRESS"
                    title="Gluver"
                    desc="Aplikasi mobile monitoring gula darah berbasis IoT, terhubung ke perangkat ESP32 dan prediksi ML."
                    tags={["Flutter", "IoT", "ESP32"]}
                    color="bg-yellow-300"
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="#"
                />
            </div>
        </div>

        {/* ===================== AR / VR ===================== */}
        <div id="arvr" className="mb-[80px] scroll-mt-24">
            <SectionTitle>AR / VR</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
                <ProjectCard
                    label="AR"
                    title="E-Lens"         
                    image="/assets/projects/elens.png"
                    desc="Pengenalan budaya rumah adat lewat AR. Scan card bergambar orang berpakaian adat, lalu rumah adatnya muncul."
                    tags={["AR", "Edukasi Budaya"]}
                    color="bg-amber-300"
                    rotation="rotate-1"
                    repoLink="#"
                    demoLink="#"
                />
                <ProjectCard
                    label="VR"
                    title="Ward 13"         
                    image="/assets/projects/ward13.png"
                    desc="Horror walking simulator 3D di browser dengan movement engine custom, tekstur prosedural, dan sound Web Audio API."
                    tags={["A-Frame", "Web Audio API"]}
                    color="bg-red-400 text-white"
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="https://ward13-three.vercel.app/"
                />
                <ProjectCard
                    label="VR"
                    title="Simulasi NAPAK"                    
                    image="/assets/projects/napak.png"
                    desc="Simulasi 3D interaktif longsor pada NAPAK, dengan kontrol WASD dan kontrol VR untuk mobile."
                    tags={["Three.js", "React Three Fiber"]}
                    color="bg-orange-300"
                    rotation="rotate-1"
                    repoLink="#"
                    demoLink="https://napak.web.id/"
                />
                <ProjectCard
                    label="AR/VR"
                    title="Tata Surya XR"
                    image="/assets/projects/tatasurya.png"
                    desc="Simulasi tata surya 3D interaktif. Klik planet untuk info, jelajahi dengan WASD + mouse, atau masuk lewat mode VR/AR."
                    tags={["WebXR", "3D", "Edukasi"]}
                    color="bg-indigo-300"
                    rotation="-rotate-1"
                    repoLink="#"
                    demoLink="https://tatasurya-xi.vercel.app/"
                />
                <ProjectCard
                    label="AR.VR"
                    title="Anatomi 3D Interaktif"
                    image="/assets/projects/anatomi.png"
                    desc="Model anatomi tubuh manusia 3D dengan label organ, isolasi organ, putar otomatis, dan zoom. Model: HuBMAP (CC BY 4.0)."
                    tags={["3D", "Edukasi", "Interaktif"]}
                    color="bg-rose-300"
                    rotation="rotate-1"
                    repoLink="#"
                    demoLink="https://anatomi-one.vercel.app/"
                />
            </div>
        </div>

        {/* ===================== WEB — MINI ===================== */}
        <div className="mb-[80px]">
            <SectionTitle>More Experiments</SectionTitle>

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