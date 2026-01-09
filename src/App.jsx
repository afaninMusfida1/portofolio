import React from 'react';
import { motion } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProfileSidebar from './components/sections/ProfileSidebar';
import AboutSection from './components/sections/AboutSection';
import ChatRoom from './components/sections/ChatRoom';
import ProjectGallery from './components/sections/ProjectGallery';
import ResumeClipboard from './components/sections/ResumeClipboard';
import ContactFooter from './components/sections/ContactFooter';
import { bouncyTransition } from './utils/animations';

const App = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div className="container mx-auto max-w-[1000px] pt-[50px] px-5 relative pb-10 font-poppins text-ink-black">

            {/* --- HEADER STICKER --- */}
            <motion.div
                className="bg-neon-green text-ink-black p-[15px] -rotate-2 text-center font-fredoka font-semibold mb-10 border-[3px] border-ink-black shadow-hard rounded-[50px] text-[1.2rem] cursor-default mx-auto"
                whileHover={{ rotate: 0, scale: 1.05, boxShadow: "10px 10px 0px #1a1a1a" }}
                // FIX HP:
                whileTap={{ scale: 0.95 }}
                transition={bouncyTransition}
            >
                ★ FRONTEND DEVELOPER ★
            </motion.div>

            {/* --- GRID UTAMA (2 KOLOM: Kiri & Kanan) --- */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-[60px] items-start">
                
                {/* 1. LEFT COLUMN (KIRI) - ID Card & Sticky Note */}
                <ProfileSidebar />

                {/* 2. RIGHT COLUMN (KANAN) - About & Chat */}
                <div>
                    <AboutSection />
                    <ChatRoom />
                </div>

            </div>

            {/* --- PROJECT GALLERY SECTION --- */}
            <ProjectGallery />

            {/* --- CLIPBOARD / RESUME SECTION --- */}
            <ResumeClipboard />

            <ContactFooter />

        </div>
    </GoogleOAuthProvider>
  );
};

export default App;