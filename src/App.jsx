import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import ShinyText from "./components/ShinyText";
import BlurText from "./components/BlurText";
import Lanyard from "./components/Lanyard";
import { listTools, listProject } from "./data";
import ChromaGrid from "./components/ChromaGrid";
import ProjectModal from "./components/ProjectModal";
import Aurora from "./components/Aurora";
import ChatRoom from "./components/ChatRoom";
import FadeUp from "./components/animations/FadeUp";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO SECTION */}
        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1" id="home">
          
          {/* Bungkus dengan FadeUp sebagai pengganti animate.css/AOS */}
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
              <img src="/assets/afanin1.png" className="w-10 rounded-md" alt="Afanin Small" />
              <q className="text-gray-300 italic">Avoid or just undertake it</q>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Afanin Musfida" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="A passionate web developer dedicated to crafting modern, high-performance digital experiences."
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-6 text-gray-300"
            />
            <div className="flex items-center sm:gap-4 gap-2">
              <a 
                href="/assets/CV.pdf" 
                download="Afanin_CV.pdf" 
                className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="Explore Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>
          </FadeUp>

          {/* LANYARD / PROFILE CARD */}
          <FadeUp delay={0.4} className="md:ml-auto h-125 flex items-center justify-center relative w-full">
             <div className="absolute inset-0 z-0">
                <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
             </div>
             <div className="z-10 pointer-events-none"> 
                <ProfileCard
                  name="Afanin Musfida"
                  title="Web Developer"
                  handle="afaninmusfida"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/assets/afanin.png"
                  showUserInfo={true}
                  enableTilt={true}
                />
             </div>
          </FadeUp>
        </div>

        {/* ABOUT SECTION */}
        <FadeUp delay={0.2} className="mt-32 mx-auto w-full max-w-400 rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-zinc-900/80 p-6" id="about">
           <h2 className="text-3xl font-bold mb-4">About Me</h2>
           <p className="text-gray-300 leading-relaxed text-lg">
             I’m Afanin Musfida, a full-stack developer passionate about building modern, high-performance applications with an intuitive user experience. I enjoy working with the latest technologies like Artificial Intelligence, Machine Learning, and cloud-based development.
           </p>
           
           {/* Stats */}
           <div className="flex flex-wrap gap-10 mt-8">
              <div>
                <h3 className="text-4xl font-bold">20<span className="text-violet-500">+</span></h3>
                <p className="text-gray-400">Projects Finished</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold">3<span className="text-violet-500">+</span></h3>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold">3.81<span className="text-violet-500">/4.00</span></h3>
                <p className="text-gray-400">GPA</p>
              </div>
           </div>
        </FadeUp>

        {/* TOOLS SECTION */}
        <div className="mt-32">
            <FadeUp>
                <h1 className="text-4xl font-bold mb-4">Tools & Technologies</h1>
                <p className="text-gray-400 mb-10">My Professional Skills</p>
            </FadeUp>
            
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {listTools.map((tool, index) => (
                  <FadeUp key={tool.id} delay={index * 0.1}> {/* Stagger effect */}
                    <div className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg">
                      <img
                        src={tool.gambar}
                        alt={tool.nama}
                        className="w-12 h-12 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{tool.nama}</h3>
                        <p className="text-sm text-zinc-400">{tool.ket}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
            </div>
        </div>

        {/* PROJECT SECTION */}
        <div className="Project mt-32 py-10" id="project">
            <FadeUp>
                <h1 className="text-center text-4xl font-bold mb-2">Selected Projects</h1>
                <p className="text-center text-gray-400 mb-14">Showcasing a selection of projects that reflect my skills.</p>
            </FadeUp>
            <FadeUp delay={0.2} style={{ height: 'auto', position: 'relative' }}>
                <ChromaGrid
                  items={listProject}
                  onItemClick={handleProjectClick}
                  radius={500}
                />
            </FadeUp>
        </div>

        {/* CONTACT & CHAT */}
        <div className="kontak mt-32 mb-20" id="contact">
            <FadeUp>
                <h1 className="text-4xl font-bold text-center mb-10">Contact & Chat</h1>
            </FadeUp>
            <FadeUp delay={0.2} className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <ChatRoom />
                </div>
            </FadeUp>
        </div>

      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App