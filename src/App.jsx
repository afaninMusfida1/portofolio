import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Mail, Github, Figma, ExternalLink } from 'lucide-react';
import { SiPostman } from "react-icons/si";

const bouncyTransition = {
  type: "spring",
  stiffness: 300,
  damping: 15,
  mass: 1
};

const wiggleHover = {
  rotate: [0, 5, -5, 3, 0],
  scale: [1, 1.1, 1.1, 1.05, 1],
  transition: { duration: 0.5, ease: "easeInOut" }
};



const CustomSkillSticker = ({ text, style, rotate }) => (
    <motion.div
        className={`px-[18px] py-[8px] rounded-[30px] font-fredoka font-semibold text-[0.9rem] border-2 border-black shadow-[2px_2px_0_black] cursor-pointer ${rotate}`}
        style={style}
        whileHover={{
            backgroundColor: "#1a1a1a",
            color: "#ccff00",
            rotate: [0, 5, -5, 3, 0],
            transition: { duration: 0.4 }
        }}
    >
        {text}
    </motion.div>
);

const ExperienceCard = ({ title, year, desc, bgClass, rotateClass }) => (
  <motion.div
    className={`p-5 mb-5 rounded-xl border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)] relative cursor-pointer ${bgClass} ${rotateClass}`}
    whileHover={{
      scale: 1.05,
      rotate: 3,
      y: -10,
      boxShadow: "8px 8px 0 black",
      borderColor: "#4c35de",
      zIndex: 5
    }}
    transition={bouncyTransition}
  >
    <h4 className="font-fredoka font-bold text-base m-0">{title}</h4>
    <small className="text-[#666] font-bold text-[0.85rem]">{year}</small>
    <p className="font-patrick text-[1.1rem] mt-[5px] m-0">{desc}</p>
  </motion.div>
);

const FooterIcon = ({ icon: Icon, bg }) => (
  <motion.span
    // Gunakan 'shadow-md' dari Tailwind untuk bayangan lembut di state normal
    className="inline-flex items-center justify-center text-white w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer"
    style={{ background: bg }}
    whileHover={{
      y: -5, // Gerakan ke atas sedikit saja
      scale: 1.1, // Perbesar sedikit
      // Ganti boxShadow menjadi lebih lembut dan terpusat saat di-hover, meniru shadow-lg
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      backgroundColor: bg, // Tetap gunakan warna asli, atau ganti jika mau
      color: "white", // Tetap putih
      borderColor: "white" // Tetap putih
    }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }} // Transisi yang lebih halus
  >
    <Icon size={20} />
  </motion.span>
);

const ProjectCard = ({ title, desc, tags, color, rotation, repoLink, demoLink }) => (
  <motion.div
    className={`relative bg-white border-[3px] border-black rounded-[15px] p-0 overflow-hidden shadow-[8px_8px_0_black] ${rotation}`}
    whileHover={{ 
      y: -10, 
      boxShadow: "12px 12px 0 black", 
      rotate: 0,
      scale: 1.02
    }}
    transition={bouncyTransition}
  >
    {/* Browser Header Bar */}
    <div className="bg-black p-3 flex gap-2 border-b-[3px] border-black">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-white/20"></div>
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-white/20"></div>
      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-white/20"></div>
    </div>

    {/* Content */}
    <div className="p-6">
      <div className={`inline-block px-3 py-1 rounded-md border-2 border-black font-bold text-xs mb-3 shadow-[2px_2px_0_black] ${color}`}>
        PROJECT
      </div>
      
      <h3 className="font-fredoka text-2xl font-bold mb-2">{title}</h3>
      <p className="font-patrick text-lg text-gray-600 mb-4 leading-tight">{desc}</p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, i) => (
          <span key={i} className="bg-gray-100 px-2 py-1 text-xs font-bold border border-black rounded-md text-gray-700">
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <div className="flex gap-3">
  {repoLink && (
    <a href={repoLink} target="_blank" rel="noreferrer" className="flex-1">
      <button className="w-full flex items-center justify-center gap-2 p-5 bg-black text-white font-fredoka py-2 rounded-lg border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all cursor-pointer">
        <Github size={16} /> Code
      </button>
    </a>
  )}

  {demoLink && (
    <a href={demoLink} target="_blank" rel="noreferrer" className="flex-1">
      <button className="w-full flex items-center justify-center gap-2 p-5 bg-[#ccff00] text-black font-fredoka py-2 rounded-lg border-2 border-black shadow-[3px_3px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer">
        <ExternalLink size={16} /> Demo
      </button>
    </a>
  )}
</div>

      </div>
    </div>
  </motion.div>
);

const MiniProjectCard = ({ title, desc, lang, link, color }) => (
  <motion.a
    href={link}
    target="_blank"
    className={`block p-5 border-[3px] border-black rounded-[10px] shadow-[4px_4px_0_black] bg-white relative overflow-hidden group no-underline text-black hover:text-black`}
    whileHover={{ y: -5, boxShadow: "8px 8px 0 black" }}
    transition={bouncyTransition}
  >
    {/* Decoration Circle */}
    <div className={`absolute -right-4 -top-4 w-12 h-12 rounded-full border-2 border-black ${color}`}></div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-fredoka font-bold text-lg leading-tight">{title}</h4>
        <span className="text-xs font-bold border border-black px-2 py-0.5 rounded-md bg-gray-100">{lang}</span>
      </div>
      <p className="font-patrick text-sm text-gray-600 line-clamp-2">{desc}</p>
    </div>
  </motion.a>
);







const App = () => {
  return (
    <div className="container mx-auto max-w-[1000px] pt-[50px] px-5 relative pb-10 font-poppins text-ink-black">

      {/* --- HEADER STICKER --- */}
      <motion.div
        className="bg-neon-green text-ink-black p-[15px] -rotate-2 text-center font-fredoka font-semibold mb-10 border-[3px] border-ink-black shadow-hard rounded-[50px] text-[1.2rem] cursor-default mx-auto"
        whileHover={{ rotate: 0, scale: 1.05, boxShadow: "10px 10px 0px #1a1a1a" }}
        transition={bouncyTransition}
      >
        ★ FRONTEND DEVELOPER ★
      </motion.div>

      {/* --- TOP SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-[60px] items-start">
        
        {/* ID Card Wrapper */}
        <div className="relative z-10 md:mx-0 mx-auto max-w-[300px] md:max-w-none">
         
          <motion.div 
            className="relative z-20 flex flex-col items-center cursor-grab active:cursor-grabbing"
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} 
            dragElastic={0.2} 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.05 }}
          >
            
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[20px] h-[150px] bg-ink-black border-l-2 border-r-2 border-dashed border-[#555] -z-10"></div>

            <div className="relative z-20 flex flex-col items-center -mb-6">
               
                <div className="w-[50px] h-[30px] bg-[#ddd] rounded-[5px] border-[3px] border-ink-black shadow-md flex justify-center items-center">
                    <div className="w-[60%] h-[40%] bg-white border-2 border-black rounded-[2px]"></div>
                </div>
                
                <motion.div 
                    className="font-fredoka font-semibold text-ink-black text-[1.8rem] uppercase bg-neon-green px-[10px] py-[2px] border-2 border-black -rotate-2 -mt-2 shadow-sm relative z-30"
                    whileHover={{ rotate: 2 }} 
                >
                    ID CARD
                </motion.div>
            </div>

            <div className="bg-paper-white p-5 pb-10 rounded-[20px] border-[3px] border-ink-black shadow-hard -rotate-3 text-center w-full relative z-10 mt-2">
                
                {/* Foto Profile */}
                <div className="w-full aspect-[3/4] bg-neon-green rounded-[12px] overflow-hidden mb-[15px] border-[3px] border-ink-black relative group mt-4">
                    <img 
                        src="/assets/Afanin.png" 
                        alt="Profile" 
                        className="w-full h-full object-cover grayscale sepia-[0.2] transition-all duration-500 group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-110 group-hover:rotate-2"
                    />
                </div>
                
                {/* Teks Nama */}
                <h2 className="font-fredoka mt-[10px] text-2xl font-bold">Afanin Musfida</h2>
                <p className="font-patrick text-[#666] text-[1.1rem]">FrontEnd Developer</p>
            </div>

          </motion.div>

          {/* Contact Note (Sticky Note) */}
          <motion.div
            className="bg-neon-green p-[25px] font-patrick text-[1.2rem] border-[3px] border-ink-black shadow-hard rotate-3 mt-[40px] relative z-10 w-[110%] -ml-[5%] text-black md:max-w-none max-w-[320px] md:mx-0 mx-auto md:-ml-[5%]"
            whileHover={{ rotate: 5, y: -5 }}
            transition={bouncyTransition}
          >
            {/* Washi Tape */}
            <motion.div 
              className="absolute -top-[15px] left-[35%] w-[100px] h-[30px] bg-ink-black/80 -rotate-2 bg-tape"
            ></motion.div>
            
            {/* Contact Note (Sticky Note) */}
          <motion.div
            className="bg-neon-green p-[25px] font-patrick text-[1.2rem] border-[3px] border-ink-black shadow-hard rotate-3 -mt-[40px] relative z-10 w-[110%] -ml-[5%] text-black md:max-w-none max-w-[320px] md:mx-0 mx-auto md:-ml-[5%]"
            whileHover={{ rotate: 5, y: -5 }}
            transition={bouncyTransition}
          >
            {/* Washi Tape */}
            <motion.div 
              className="absolute -top-[15px] left-[35%] w-[100px] h-[30px] bg-ink-black/80 -rotate-2 bg-tape"
            ></motion.div>
            
            <h3 className="border-b-2 border-dashed border-black mb-[10px] font-fredoka font-semibold text-lg">Say Hi!</h3>
            
            {/* GitHub - Teks Saja */}
            <div className="flex items-center gap-[10px] mb-[10px] border-b-2 border-dotted border-black pb-[5px] transition-all duration-200 hover:translate-x-[10px] hover:text-electric-purple cursor-default">
              <Github size={18} /> 
              <span>AfaninMusfida1</span>
            </div>

            {/* LinkedIn - Teks Saja */}
            <div className="flex items-center gap-[10px] mb-[10px] border-b-2 border-dotted border-black pb-[5px] transition-all duration-200 hover:translate-x-[10px] hover:text-electric-purple cursor-default">
              <Linkedin size={18} />
              <span>afanin musfida</span>
            </div>

            {/* Instagram - Teks Saja */}
            <div className="flex items-center gap-[10px] mb-[10px] border-b-2 border-dotted border-black pb-[5px] transition-all duration-200 hover:translate-x-[10px] hover:text-electric-purple cursor-default">
              <Instagram size={18} />
              <span>@afaniwn</span>
            </div>

            {/* Email - Teks Saja */}
            <div className="flex items-center gap-[10px] border-none transition-all duration-200 hover:translate-x-[10px] hover:text-electric-purple cursor-default">
              <Mail size={18} />
              <span>afaninmusfida1@gmail.com</span>
            </div>
          </motion.div>
          </motion.div>
        </div>

        {/* About Paper */}
        <motion.div
          className="bg-paper-white p-[40px] rounded-[10px] border-[3px] mt-5 border-ink-black shadow-hard relative rotate-1 bg-lined bg-[length:100%_35px] leading-[35px]"
          whileHover={{ 
            rotate: 3, 
            y: -15, 
            boxShadow: "15px 15px 0px #1a1a1a",
            zIndex: 8
          }}
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
          >
            HI! 👋
          </motion.div>

          {/* Tags / Tech Stack di Sebelah Kanan */}
          <div className="absolute -right-[45px] top-[80px] hidden md:flex flex-col gap-[15px]">
            
            {/* React */}
            <CustomSkillSticker 
              text={
                <div className="flex items-center gap-2">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-5 h-5" alt="React" />
                  <span>React</span>
                </div>
              } 
              style={{ background: '#222', color: '#61DAFB' }} 
              rotate="rotate-[5deg]" 
            />

            {/* Tailwind */}
            <CustomSkillSticker 
              text={
                <div className="flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" className="w-5 h-5" alt="Tailwind" />
                  <span>Tailwind</span>
                </div>
              } 
              style={{ background: '#fff', color: '#38BDF8' }} 
              rotate="-rotate-[3deg]" 
            />

            {/* Laravel */}
            <CustomSkillSticker 
              text={
                <div className="flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" className="w-5 h-5" alt="Laravel" />
                  <span>Laravel</span>
                </div>
              } 
              style={{ background: '#fff', color: '#FF2D20' }} 
              rotate="-rotate-[4deg]" 
            />

            {/* Figma */}
            <CustomSkillSticker 
              text={
                <div className="flex items-center gap-2">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" className="w-5 h-5" alt="Figma" />
                  <span>Figma</span>
                </div>
              } 
              style={{ background: '#1a1a1a', color: '#fff' }} 
              rotate="rotate-[2deg]" 
            />

          </div>

          <div className="group">
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
              href="#"
              className="inline-block bg-ink-black text-neon-green px-[35px] py-[15px] font-fredoka text-[1.5rem] mt-[30px] -rotate-2 shadow-[5px_5px_0_rgba(255,255,255,0.5)] border-2 border-white rounded-[10px] no-underline"
              whileHover={{ 
                rotate: 0, 
                scale: 1.1, 
                backgroundColor: "#ccff00", 
                color: "black", 
                borderColor: "black", 
                boxShadow: "8px 8px 0 black" 
              }}
              transition={bouncyTransition}
            >
              Let's Cook!
            </motion.a>
          </div>
        </motion.div>
      </div>

{/* --- NEW SECTION: PROJECT GALLERY --- */}
      <div className="mb-[80px]">
        <div className="flex items-center gap-4 mb-6 px-4 md:px-0">
          <div className="h-[3px] bg-black flex-1"></div>
          <h3 className="font-fredoka font-bold text-xl uppercase bg-black text-white px-4 py-1 rounded-md -rotate-1">
            Check This Out!
          </h3>
          <div className="h-[3px] bg-black flex-1"></div>
        </div>
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
          
          {/* GUGAH (Flagship Project) */}
          <ProjectCard 
            title="Gugah"
            desc="Platform edukasi. Fitur chat real-time, artikel, game, dan lokasi aman terdekat."
            tags={["react", "Tailwind"]}
            color="bg-[#ff99cc]"
            rotation="rotate-1"
            repoLink="#"
            demoLink="https://gugah-ten.vercel.app/" 
          />

          {/* Project 2 */}
          <ProjectCard 
            title="NgeQuiz"
            desc="Platform kuis online."
            tags={["React", "Tailwind"]}
            color="bg-[#33cc33] text-white"
            rotation="-rotate-1"
            repoLink="#"
            demoLink="https://ngequiz.netlify.app/" 
          />

          {/* AIPRA INVENTARIS (Management System) */}
          <ProjectCard 
            title="AIPRA Inventaris"
            desc="Sistem manajemen aset untuk Pramuka. Fitur pendataan barang, puncatatan peminjaman, dan pelaporan stok otomatis."
            tags={["PHP", "laravel", "MySQL", "Filament"]}
            color="bg-[#33cc33] text-white"
            rotation="-rotate-1"
            repoLink="https://github.com/afaninMusfida1/AIPRA"
            demoLink="#" 
          />

          {/* 1. Sistem Surat (Private - PHP) */}
          <ProjectCard 
            title="Sistem Surat"
            desc="Sistem informasi pengarsipan surat untuk Techarea."
            tags={["PHP", "Laravel", "MySQL"]}
            color="bg-blue-300"            
            rotation="-rotate-1"
            repoLink="#"
            demoLink="#"
          />

          {/* 7. Seattle (JS) */}
           <ProjectCard 
            title="Seattle"
            desc="Web App presensi siswa Seattle."
            tags={["React", "Tailwind"]}
            color="bg-teal-300"
            repoLink="https://github.com/afaninMusfida1/Seattle"
            demoLink="https://seattle-ten.vercel.app/"
          />

          {/* MOVIE LIST */}
          <ProjectCard 
            title="Movie Katalog"
            desc="Aplikasi pencarian film interaktif."
            tags={["JavaScript", "HTML/CSS"]}
            color="bg-[#31a8ff] text-white" 
            rotation="-rotate-2"
            repoLink="https://github.com/afaninMusfida1/Movie-list"
            demoLink="#" 
          />
        </div>
      </div>

      <div className="mb-[80px]">
        <div className="flex items-center gap-4 mb-6 px-4 md:px-0">
          <div className="h-[3px] bg-black flex-1"></div>
          <h3 className="font-fredoka font-bold text-xl uppercase bg-black text-white px-4 py-1 rounded-md -rotate-1">
            More Experiments
          </h3>
          <div className="h-[3px] bg-black flex-1"></div>
        </div>

        {/* Grid Kecil untuk sisa project */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-0">

          {/* 2. ToDoList (PHP) */}
          <MiniProjectCard 
            title="ToDo List"
            desc="Aplikasi manajemen tugas sederhana dengan fitur CRUD."
            lang="PHP"
            color="bg-yellow-300"
            link="https://github.com/afaninMusfida1/ToDoList"
          />

          {/* 3. Expense Tracker (HTML) */}
          <MiniProjectCard 
            title="Expense Tracker"
            desc="Pencatat pengeluaran harian berbasis web."
            lang="HTML/JS"
            color="bg-green-300"
            link="https://github.com/afaninMusfida1/Expense-Tracker"
          />

           {/* 4. Photostrip (HTML) */}
           <MiniProjectCard 
            title="Photostrip"
            desc="Web kreasi layout foto ala photobooth."
            lang="HTML"
            color="bg-pink-300"
            link="https://github.com/afaninMusfida1/Photostrip"
          />

          {/* 5. Note App (JS) */}
          <MiniProjectCard 
            title="Note App"
            desc="Aplikasi catatan digital dengan local storage."
            lang="JS"
            color="bg-purple-300"
            link="https://github.com/afaninMusfida1/Note-App"
          />

          {/* 6. Convert Bilangan (HTML) */}
          <MiniProjectCard 
            title="Konversi Bilangan"
            desc="Tools konversi Desimal, Biner, Oktal, Hex."
            lang="JS"
            color="bg-red-300"
            link="https://github.com/afaninMusfida1/convert-bilangan"
          />

           {/* 8. Tour (HTML) */}
           <MiniProjectCard 
            title="Tour & Travel"
            desc="Website profil untuk agen travel."
            lang="HTML"
            color="bg-orange-300"
            link="https://github.com/afaninMusfida1/tour"
          />

          {/* Link ke GitHub Profile buat sisanya */}
          <motion.a
            href="https://github.com/afaninMusfida1"
            target="_blank"
            className="flex flex-col items-center justify-center p-5 border-[3px] border-dashed border-white rounded-[10px] text-white hover:border-black hover:text-black hover:bg-gray-50 transition-all"
            whileHover={{ scale: 0.98 }}
          >
            <span className="font-fredoka font-bold text-lg">View All Repos</span>
            <span className="text-sm">on GitHub →</span>
          </motion.a>

        </div>
      </div>

      {/* --- CLIPBOARD SECTION --- */}
      <div className="mt-[60px] relative group/clipboard">
        {/* Metal Clip */}
        <div className="absolute -top-[25px] left-1/2 -translate-x-1/2 w-[160px] h-[60px] bg-white rounded-[10px] z-30 border-[3px] border-ink-black shadow-[4px_4px_0_black] flex justify-center items-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/clipboard:-translate-y-[5px] group-hover/clipboard:-rotate-1">
          <div className="w-[80%] h-[15px] bg-[#ccc] border-2 border-ink-black rounded-[20px]"></div>
        </div>

        <motion.div
          className="bg-[#222] rounded-[20px] p-[15px] pt-[60px] shadow-hard border-[3px] border-ink-black relative"
          whileHover={{ y: -5, boxShadow: "10px 10px 0 black" }}
          transition={bouncyTransition}
        >
          <div className="bg-paper-white min-h-[500px] rounded-[10px] p-[40px] grid grid-cols-1 md:grid-cols-2 gap-[50px] border-2 border-black">
            
            {/* Left Column */}
            <section>
              <motion.div 
                className="inline-block px-[25px] py-[8px] font-fredoka font-semibold uppercase text-[1.4rem] mb-[25px] border-2 border-black shadow-[4px_4px_0_black] cursor-default bg-neon-green -rotate-2"
                whileHover={wiggleHover}
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

            {/* Right Column */}
            <section>
              <motion.div 
                className="inline-block px-[25px] py-[8px] font-fredoka font-semibold uppercase text-[1.4rem] mb-[25px] border-2 border-black shadow-[4px_4px_0_black] cursor-default bg-electric-purple text-white rotate-2"
                whileHover={wiggleHover}
              >
                Experience
              </motion.div>

              <ExperienceCard 
                title="Internhip Web Developer" 
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

    </div>
  );
};

export default App;