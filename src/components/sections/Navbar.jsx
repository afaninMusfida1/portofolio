import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bouncyTransition } from '../../utils/animations';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'web', label: 'Web' },
  { id: 'app', label: 'App' },
  { id: 'arvr', label: 'AR/VR' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const NavBar = () => {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      let current = 'home';
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = id;
        }
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="sticky top-3 z-50 px-3 pt-3">
      <div className="mx-auto max-w-[1000px] flex justify-center">
        <div className="flex gap-2 overflow-x-auto max-w-full bg-white border-[3px] border-ink-black rounded-[50px] shadow-hard p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <motion.button
                key={id}
                onClick={() => goTo(id)}
                whileHover={{ scale: 1.08, rotate: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={bouncyTransition}
                className={`shrink-0 px-4 py-1.5 rounded-full border-2 border-ink-black font-fredoka font-semibold text-sm md:text-base cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-neon-green text-ink-black shadow-[2px_2px_0_#1a1a1a]'
                    : 'bg-white text-ink-black hover:bg-gray-100'
                }`}
              >
                {label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;