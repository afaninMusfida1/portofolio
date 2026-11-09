import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { AnimatePresence, motion } from 'framer-motion';
import IdCard from './IdCard';
import World from './World3D';
import { WebGroup, AppGroup, ArvrGroup } from './ProjectGroups';
import ResumeClipboard from './ResumeClipboard';
import ContactFooter from './ContactFooter';
import { bouncyTransition } from '../../utils/animations';

/* ================= Konten tiap langkah (memakai komponen asli) ================= */
const Head = ({ tag, h1, h2, p }) => (
  <div className="mb-6">
    <div className="inline-block bg-neon-green text-ink-black px-4 py-1 -rotate-2 font-fredoka font-semibold text-sm md:text-base border-[3px] border-ink-black shadow-hard rounded-[50px]">★ {tag} ★</div>
    <h2 className="font-fredoka font-semibold text-white leading-[1.05] mt-3 text-[clamp(1.7rem,3.6vw,3rem)] [text-shadow:3px_3px_0_#1a1a1a]">
      {h1} <span className="text-neon-green">{h2}</span>
    </h2>
    {p && <p className="font-patrick text-white text-lg md:text-xl mt-1.5 leading-snug max-w-[560px]">{p}</p>}
  </div>
);

const HeroView = () => (
  <div className="max-w-[540px]">
    <motion.div className="inline-block bg-neon-green text-ink-black px-5 py-2 -rotate-2 font-fredoka font-semibold text-lg border-[3px] border-ink-black shadow-hard rounded-[50px] cursor-default"
      whileHover={{ rotate: 0, scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>★ FRONTEND DEVELOPER ★</motion.div>
    <h1 className="font-fredoka font-semibold text-white leading-[1.02] mt-5 text-[clamp(2.4rem,6vw,4.8rem)] [text-shadow:4px_4px_0_#1a1a1a]">
      Halo, saya <span className="text-neon-green">Afanin.</span>
    </h1>
    <p className="font-patrick text-white text-xl md:text-2xl mt-3 leading-snug">
      Bukan sekadar tukang ketik kode, tapi <b>Frontend Wizard</b> yang <i>lowkey obsessed</i> sama <i>smooth animation</i> dan <i>clean architecture</i>.
    </p>
    <div className="mt-5 flex flex-wrap gap-3">
      <motion.a href="#web" className="inline-block bg-ink-black text-neon-green px-7 py-3 font-fredoka text-xl -rotate-2 border-2 border-white rounded-[10px] no-underline"
        whileHover={{ rotate: 0, scale: 1.08, backgroundColor: '#ccff00', color: '#000', borderColor: '#000' }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Lihat proyek</motion.a>
      <motion.a href="#contact" className="inline-block bg-paper-white text-ink-black px-7 py-3 font-fredoka text-xl rotate-1 border-[3px] border-ink-black rounded-[10px] no-underline shadow-hard"
        whileHover={{ rotate: 0, scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Let's Cook!</motion.a>
    </div>
  </div>
);

const VIEWS = [
  () => <HeroView />,
  () => (<><Head tag="WEB" h1="Proyek Web," h2="dari Web-GIS ke Arsip." p="NAPAK, Reksa, AIPRA, dan proyek web lainnya." /><WebGroup /></>),
  () => (<><Head tag="MOBILE" h1="Aplikasi Mobile," h2="Antrean sampai IoT." p="Dari rancangan UI/UX sampai perangkat ESP32." /><AppGroup /></>),
  () => (<><Head tag="AR / VR" h1="Dunia 3D di Browser," h2="AR dan VR." p="Simulasi interaktif yang bisa dijelajahi dengan WASD, mouse, atau headset." /><ArvrGroup /></>),
  () => (<><Head tag="RESUME" h1="Belajar di Polines," h2="Memimpin di Yhoiki." /><ResumeClipboard /></>),
  () => (<><Head tag="CONTACT" h1="Ada Proyek?" h2="Ayo Kerja Bareng." p="Info project lucu dungs. Japri is the key!!!" /><ContactFooter /></>),
];

/* ================= Panggung: satu layar, isi berganti & bergeser saat scroll ================= */
const NAV = ['home', 'web', 'app', 'arvr', 'resume', 'contact'];
const LABELS = ['Profil', 'Web', 'App', 'AR/VR', 'Resume', 'Kontak'];

const Scene3D = () => {
  const sec = useRef();
  const panel = useRef();
  const conts = useRef([]);
  const track = useRef({ t: 0 });
  const geo = useRef({ starts: [0, 1, 2, 3, 4, 5], lens: [1, 1, 1, 1, 1, 1], extras: [0, 0, 0, 0, 0, 0], walk: 1 });
  const [ui, setUi] = useState({ step: 0, f: 0 });
  const [layout, setLayout] = useState({ starts: [0, 1, 2, 3, 4, 5], total: typeof window !== 'undefined' ? window.innerHeight * 6 : 4000 });

  const onScroll = () => {
    const g = geo.current;
    const y = Math.max(0, -sec.current.getBoundingClientRect().top);
    let i = 5;
    for (let k = 0; k < 5; k++) { if (y < g.starts[k + 1]) { i = k; break; } }
    const local = y - g.starts[i];
    const range = Math.max(1, g.lens[i] - (i < 5 ? g.walk : 0));
    const off = g.extras[i] * Math.min(1, local / range);
    const el = conts.current[i];
    if (el) el.style.transform = `translate3d(0, ${-off}px, 0)`;

    let t = i;
    if (i < 5) { const k = THREE.MathUtils.clamp(1 - (g.starts[i + 1] - y) / g.walk, 0, 1); t = i + k * k * (3 - 2 * k); }
    track.current.t = t;

    const n = { step: i, f: Math.round(Math.min(1, local / g.lens[i]) * 50) / 50 };
    setUi((u) => (u.step === n.step && u.f === n.f ? u : n));
  };

  const measure = () => {
    if (!panel.current) return;
    const vh = window.innerHeight;
    const ph = panel.current.clientHeight;
    const walk = vh * 0.6;
    const extras = conts.current.map((el) => Math.max(0, (el ? el.offsetHeight : 0) - ph));
    const lens = extras.map((e, i) => (i < 5 ? walk + Math.max(e, vh * 0.5) : Math.max(e, vh * 0.5) + vh * 0.2));
    const starts = []; let acc = 0;
    lens.forEach((l) => { starts.push(acc); acc += l; });
    geo.current = { starts, lens, extras, walk };
    setLayout((l) => (Math.abs(l.total - acc) < 2 ? l : { starts, total: acc }));
    onScroll();
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    conts.current.forEach((el) => el && ro.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); };
    // eslint-disable-next-line
  }, []);

  const goStep = (i) => {
    const top = sec.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + geo.current.starts[i] + 1, behavior: 'smooth' });
  };

  const fade = 'linear-gradient(to bottom, transparent 0, #000 22px, #000 calc(100% - 22px), transparent 100%)';

  return (
    <section ref={sec} className="relative" style={{ height: `calc(100vh + ${layout.total}px)` }}>
      {NAV.map((id, i) => <div key={id} id={id} aria-hidden="true" className="absolute left-0 w-px h-px" style={{ top: `${layout.starts[i] + 1}px` }} />)}

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Canvas flat orthographic shadows dpr={[1, 1.5]} gl={{ powerPreference: 'high-performance' }} camera={{ position: [9, 9, 9], zoom: 50, near: -50, far: 100 }}>
            <World track={track} />
          </Canvas>
        </div>

        {/* ID card berdiri sendiri (di luar wrapper bertransform) */}
        <AnimatePresence>
          {ui.step === 0 && (
            <motion.div key="idcard" className="absolute right-[5vw] top-[100px] md:top-[150px] w-[120px] sm:w-[200px] md:w-[240px] xl:w-[270px] z-20"
              initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -80 }} transition={{ duration: 0.35 }}>
              <IdCard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panel konten: isi tiap langkah bergeser ke atas sesuai scroll */}
        <div ref={panel} className="absolute left-[5vw] right-[5vw] lg:right-auto lg:w-[min(780px,56vw)] top-[44vh] lg:top-24 bottom-16 overflow-hidden font-poppins text-ink-black"
          style={{ WebkitMaskImage: fade, maskImage: fade }}>
          {VIEWS.map((V, i) => (
            <div key={i} ref={(el) => (conts.current[i] = el)}
              className={`absolute inset-x-0 top-0 min-h-full flex flex-col justify-center px-2 py-3 transition-opacity duration-300 ${ui.step === i ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
              <V />
            </div>
          ))}
        </div>

        <div className="absolute left-[5vw] right-[5vw] md:right-[200px] bottom-5 grid grid-cols-6 gap-2 md:gap-4 font-poppins">
          {LABELS.map((l, i) => {
            const fill = ui.step > i ? 100 : ui.step === i ? ui.f * 100 : 0;
            return (
              <button key={l} onClick={() => goStep(i)} className={`text-left cursor-pointer bg-transparent border-0 p-0 ${ui.step === i ? 'text-white' : 'text-white/60'}`}>
                <span className="block text-[10px] md:text-xs font-semibold mb-1"><span className="mr-1">{String(i + 1).padStart(2, '0')}</span><span className="hidden md:inline">{l}</span></span>
                <span className="block h-[3px] rounded-full bg-white/25 overflow-hidden"><span className="block h-full bg-neon-green" style={{ width: `${fill}%` }} /></span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Scene3D;