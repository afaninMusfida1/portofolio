import React from 'react';
import { motion } from 'framer-motion';
import IdCard from './IdCard';
import { bouncyTransition } from '../../utils/animations';

const Hero = () => (
  <section id="home" className="relative z-10 min-h-screen flex flex-col justify-end md:justify-center px-[6vw] pt-24 pb-16 font-poppins">
    <div className="relative z-20 mx-auto mb-10 mt-24 w-[220px] md:absolute md:right-[6vw] md:top-[150px] md:mt-0 md:mb-0 md:w-[260px] xl:w-[280px]">
      <IdCard />
    </div>
    <div className="w-full max-w-[540px]">
      <motion.div
        className="inline-block bg-neon-green text-ink-black px-5 py-2 -rotate-2 font-fredoka font-semibold text-lg border-[3px] border-ink-black shadow-hard rounded-[50px] cursor-default"
        whileHover={{ rotate: 0, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}
      >
        ★ FRONTEND DEVELOPER ★
      </motion.div>

      <h1 className="font-fredoka font-semibold text-white leading-[1.02] mt-6 text-[clamp(2.6rem,7vw,5rem)] [text-shadow:4px_4px_0_#1a1a1a]">
        Halo, saya <span className="text-neon-green">Afanin.</span>
      </h1>

      <p className="font-patrick text-white text-xl md:text-2xl mt-4 leading-snug">
        Bukan sekadar tukang ketik kode, tapi <b>Frontend Wizard</b> yang <i>lowkey obsessed</i> sama <i>smooth animation</i> dan <i>clean architecture</i>.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <motion.a href="#web"
          className="inline-block bg-ink-black text-neon-green px-7 py-3 font-fredoka text-xl -rotate-2 border-2 border-white rounded-[10px] no-underline"
          whileHover={{ rotate: 0, scale: 1.08, backgroundColor: '#ccff00', color: '#000', borderColor: '#000' }}
          whileTap={{ scale: 0.95 }} transition={bouncyTransition}>
          Lihat proyek
        </motion.a>
        <motion.a href="#contact"
          className="inline-block bg-paper-white text-ink-black px-7 py-3 font-fredoka text-xl rotate-1 border-[3px] border-ink-black rounded-[10px] no-underline shadow-hard"
          whileHover={{ rotate: 0, scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>
          Let's Cook!
        </motion.a>
      </div>
    </div>
  </section>
);

export default Hero;