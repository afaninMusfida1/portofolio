import React, { useEffect, useRef, useCallback, useMemo } from "react";

// KONFIGURASI WARNA & ANIMASI
const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
};

// HELPER FUNCTIONS (Logika Matematika)
const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const ProfileCardComponent = ({
  avatarUrl = "https://placehold.co/400",
  miniAvatarUrl,
  name = "Afanin Musfida",
  title = "Web Developer",
  handle = "afaninmusfida",
  status = "Online",
  contactText = "Contact Me",
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  onContactClick,
  className = "", // <--- SAYA TAMBAHKAN INI (Tadi ketinggalan)
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  // --- 1. LOGIKA ANIMASI 3D (JAVASCRIPT) ---
  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;
    let rafId = null;

    const updateCardTransform = (offsetX, offsetY, card, wrap) => {
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
        "--card-opacity": "1",
      };

      Object.entries(properties).forEach(([key, val]) => {
        wrap.style.setProperty(key, val);
      });
    };

    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);
        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);
        updateCardTransform(currentX, currentY, card, wrap);
        if (progress < 1) rafId = requestAnimationFrame(animationLoop);
      };
      rafId = requestAnimationFrame(animationLoop);
    };

    return { updateCardTransform, createSmoothAnimation, cancelAnimation: () => rafId && cancelAnimationFrame(rafId) };
  }, [enableTilt]);

  // --- 2. EVENT LISTENERS ---
  const handlePointerMove = useCallback((e) => {
    if (!cardRef.current || !wrapRef.current || !animationHandlers) return;
    const rect = cardRef.current.getBoundingClientRect();
    animationHandlers.updateCardTransform(e.clientX - rect.left, e.clientY - rect.top, cardRef.current, wrapRef.current);
  }, [animationHandlers]);

  const handlePointerEnter = useCallback(() => {
    if (!animationHandlers) return;
    animationHandlers.cancelAnimation();
    wrapRef.current?.classList.add("active");
  }, [animationHandlers]);

  const handlePointerLeave = useCallback((e) => {
    if (!cardRef.current || !wrapRef.current || !animationHandlers) return;
    animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, e.offsetX, e.offsetY, cardRef.current, wrapRef.current);
    wrapRef.current?.classList.remove("active");
  }, [animationHandlers]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !enableTilt) return;
    
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointerleave", handlePointerLeave);

    // Initial Animation
    if (wrapRef.current && animationHandlers) {
        const initialX = wrapRef.current.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
        const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
        animationHandlers.updateCardTransform(initialX, initialY, card, wrapRef.current);
        animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY, card, wrapRef.current);
    }

    return () => {
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [handlePointerMove, handlePointerEnter, handlePointerLeave, enableTilt, animationHandlers]);


  // --- 3. CSS INJECTION (PENTING UNTUK EFEK HOLO) ---
  const styles = `
    .pc-card-wrapper {
        perspective: 500px;
        --card-radius: 24px;
        --sunpillar-1: hsl(2, 100%, 73%);
        --sunpillar-2: hsl(53, 100%, 69%);
        --sunpillar-3: hsl(93, 100%, 69%);
        --sunpillar-4: hsl(176, 100%, 76%);
        --sunpillar-5: hsl(228, 100%, 74%);
        --sunpillar-6: hsl(283, 100%, 73%);
    }
    
    .pc-card {
        transform-style: preserve-3d;
        transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
        background-image: radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(266, 100%, 90%, var(--card-opacity)) 4%, hsla(266, 50%, 80%, calc(var(--card-opacity) * 0.75)) 10%, hsla(266, 25%, 70%, calc(var(--card-opacity) * 0.5)) 50%, hsla(266, 0%, 60%, 0) 100%), radial-gradient(35% 52% at 55% 20%, #00ffaac4 0%, #073aff00 100%), radial-gradient(100% 100% at 50% 50%, #00c1ffff 1%, #073aff00 76%), conic-gradient(from 124deg at 50% 50%, #c137ffff 0%, #07c6ffff 40%, #07c6ffff 60%, #c137ffff 100%);
        background-size: 100% 100%;
        background-position: 0 0, 0 0, 50% 50%, 0 0;
        background-blend-mode: color-dodge, normal, normal, normal;
        animation: glow-bg 12s linear infinite;
    }

    .pc-shine {
        mask-image: none;
        mask-mode: luminance;
        mask-repeat: repeat;
        mask-position: top calc(200% - (var(--background-y) * 5)) left calc(100% - var(--background-x));
        mix-blend-mode: color-dodge;
        filter: brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.5);
        animation: holo-bg 18s linear infinite;
        background-image: repeating-linear-gradient(0deg, var(--sunpillar-1) calc(5% * 1), var(--sunpillar-2) calc(5% * 2), var(--sunpillar-3) calc(5% * 3), var(--sunpillar-4) calc(5% * 4), var(--sunpillar-5) calc(5% * 5), var(--sunpillar-6) calc(5% * 6), var(--sunpillar-1) calc(5% * 7)), repeating-linear-gradient(-45deg, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%), radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsla(0, 0%, 0%, 0.1) 12%, hsla(0, 0%, 0%, 0.15) 20%, hsla(0, 0%, 0%, 0.25) 120%);
        background-blend-mode: color, hard-light;
        background-size: 500% 500%, 300% 300%, 200% 200%;
        background-position: 0 var(--background-y), var(--background-x) var(--background-y), center;
    }

    .pc-shine::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(45deg, var(--sunpillar-4), var(--sunpillar-5), var(--sunpillar-6), var(--sunpillar-1), var(--sunpillar-2), var(--sunpillar-3)), radial-gradient(circle at var(--pointer-x) var(--pointer-y), hsl(0, 0%, 70%) 0%, hsla(0, 0%, 30%, 0.2) 90%);
        background-size: 250% 250%, 100% 100%;
        background-position: var(--pointer-x) var(--pointer-y), center;
        background-blend-mode: color-dodge;
        filter: brightness(calc(2 - var(--pointer-from-center))) contrast(calc(var(--pointer-from-center) + 2)) saturate(calc(0.5 + var(--pointer-from-center)));
        mix-blend-mode: luminosity;
        opacity: 0;
        transition: opacity 0.5s;
    }

    .pc-card:hover .pc-shine::before { opacity: 1; }

    .pc-glare {
        background-image: radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsl(248, 25%, 80%) 12%, hsla(207, 40%, 30%, 0.8) 90%);
        mix-blend-mode: overlay;
        filter: brightness(0.8) contrast(1.2);
        opacity: var(--card-opacity);
    }

    @keyframes glow-bg {
        0% { --bgrotate: 0deg; }
        100% { --bgrotate: 360deg; }
    }
    @keyframes holo-bg {
        0% { background-position: 0 var(--background-y), 0 0, center; }
        100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        ref={wrapRef}
        className={`pc-card-wrapper relative flex justify-center items-center ${className}`}
        style={{
            "--pointer-x": "50%",
            "--pointer-y": "50%",
            "--card-opacity": "0",
            "--rotate-x": "0deg",
            "--rotate-y": "0deg"
        }}
      >
        <section
          ref={cardRef}
          className="pc-card relative w-[320px] h-112.5 md:w-87.5 md:h-125 rounded-3xl cursor-pointer"
        >
          {/* Layer Dalam */}
          <div className="absolute inset-px bg-black/90 rounded-3xl z-0 overflow-hidden backface-hidden">
             
             {/* Shine / Hologram Layer */}
             <div className="pc-shine absolute inset-0 z-10 transition-all duration-500" />
             
             {/* Glare Layer */}
             <div className="pc-glare absolute inset-0 z-20 pointer-events-none" />

             {/* KONTEN UTAMA */}
             <div className="relative z-30 h-full flex flex-col justify-between">
                
                {/* Bagian Foto */}
                <div className="relative h-[60%] w-full overflow-hidden group">
                    <img 
                        src={avatarUrl} 
                        alt="Avatar" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Bagian Info (Bawah) */}
                <div className="p-6 bg-white/5 backdrop-blur-md border-t border-white/10 h-[40%] flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${status === 'Online' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-500'}`}></div>
                            <p className="text-xs font-mono text-violet-300">@{handle}</p>
                        </div>
                        <h3 className="text-2xl font-bold text-white leading-tight">{name}</h3>
                        <p className="text-sm text-gray-400">{title}</p>
                    </div>

                    {showUserInfo && (
                    <div className="flex gap-3 mt-2">
                        <div className="flex-1 bg-black/40 rounded-xl flex flex-col items-center justify-center py-2 border border-white/5">
                            <span className="text-lg font-bold text-white">20+</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Projects</span>
                        </div>
                        <button 
                            onClick={onContactClick}
                            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] active:scale-95"
                        >
                            {contactText}
                        </button>
                    </div>
                    )}
                </div>
             </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default React.memo(ProfileCardComponent);