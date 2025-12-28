import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// ❌ HAPUS IMPORT CSS
// import "./ChromaGrid.css";

export const ChromaGrid = ({
  items,
  onItemClick,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      // GANTI CLASS CSS DENGAN TAILWIND GRID
      // Kita gunakan grid responsive Tailwind (md:grid-cols-2, lg:grid-cols-3)
      // agar lebih aman di mobile daripada fix columns prop
      className={`relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full ${className}`}
      style={{
        "--r": `${radius}px`,
        // Kita biarkan GSAP mengontrol variabel CSS ini di root elemen
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => onItemClick(c)}
          // STYLE KARTU (Tailwind)
          className="group relative w-full h-75 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors cursor-pointer"
          style={{
            "--card-border": c.borderColor || "transparent",
            "--card-gradient": c.gradient,
          }}
        >
          {/* GAMBAR */}
          <div className="w-full h-full">
            <img 
              src={c.image} 
              alt={c.title} 
              loading="lazy" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
            />
          </div>

          {/* OVERLAY GRADIENT BAWAH (Agar teks terbaca) */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />

          {/* SPOTLIGHT EFFECT (Menggunakan CSS Variable dari handleCardMove) */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)`
            }}
          />

          {/* INFO TEXT */}
          <footer className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white leading-tight">{c.title}</h3>
            {c.handle && <span className="text-xs font-mono text-zinc-400">{c.handle}</span>}
            <p className="text-sm text-zinc-300 line-clamp-2 mt-1">{c.subtitle}</p>
            {c.location && <span className="text-xs text-zinc-500 mt-2 block">{c.location}</span>}
          </footer>
        </article>
      ))}

      {/* OVERLAY GLOBAL (Flashlight effect besar) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
            background: `radial-gradient(var(--r) circle at var(--x) var(--y), rgba(255,255,255,0.03), transparent 40%)`,
            mixBlendMode: 'overlay'
        }} 
      />
      
      {/* FADE OVERLAY */}
      <div 
        ref={fadeRef} 
        className="pointer-events-none absolute inset-0 bg-black/0 transition-opacity" 
      />
    </div>
  );
};

export default ChromaGrid;