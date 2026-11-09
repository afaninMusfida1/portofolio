import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/* ---------- Palet (sama dengan palet situs) ---------- */
const C = {
  white: '#fbf8ff', cream: '#f3ecdc', plate: '#ece7ff', lilac: '#b9acff', lilacD: '#8f82f0',
  purple: '#4c35de', purpleD: '#2a1a9e', lime: '#ccff00', dark: '#1a1a1a', navy: '#232a52',
  pink: '#ff99cc', blue: '#31a8ff', orange: '#ff922b', leaf: '#3fcf3f', leafL: '#8be05a',
  skin: '#f1c4a0', wood: '#8a5a3b', gold: '#ffd23f',
};

/* ---------- Cache geometri & material agar ringan ---------- */
const GEO = new Map();
const rbox = (w, h, d, r) => {
  const k = [w, h, d, r].map((n) => n.toFixed(3)).join('|');
  let g = GEO.get(k);
  if (!g) { g = new RoundedBoxGeometry(w, h, d, 3, r); GEO.set(k, g); }
  return g;
};
const MAT = new Map();
const mat = (c) => {
  let m = MAT.get(c);
  if (!m) { m = new THREE.MeshStandardMaterial({ color: c, roughness: 0.62 }); MAT.set(c, m); }
  return m;
};
const HAIR = '#16161c';
const rnd = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* ---------- Primitif ---------- */
const Box = ({ p = [0, 0, 0], s = [1, 1, 1], c = C.white, r, rot, sh = true }) => {
  const rad = Math.min(r ?? 0.09, Math.min(...s) * (r === undefined ? 0.3 : 0.48));
  return <mesh geometry={rbox(s[0], s[1], s[2], rad)} material={mat(c)} position={[p[0], p[1] + s[1] / 2, p[2]]} rotation={rot} castShadow={sh} receiveShadow />;
};
const Ball = ({ p = [0, 0, 0], r = 0.1, c = C.white, s = [1, 1, 1], sh = false }) => (
  <mesh position={p} scale={s} material={mat(c)} castShadow={sh}><sphereGeometry args={[r, 18, 14]} /></mesh>
);
const Cyl = ({ p = [0, 0, 0], r = 0.1, h = 0.2, c = C.white, rot, sh = true }) => (
  <mesh position={[p[0], p[1] + h / 2, p[2]]} rotation={rot} material={mat(c)} castShadow={sh} receiveShadow><cylinderGeometry args={[r, r, h, 20]} /></mesh>
);
const Glow = ({ p, r = 0.1, c = C.lime }) => (
  <mesh position={p}><sphereGeometry args={[r, 14, 12]} /><meshBasicMaterial color={c} toneMapped={false} /></mesh>
);

/* ---------- Layar bertekstur kanvas (hidup, bukan gambar statis) ---------- */
const useScreen = (w, h, draw, fps = 10) => {
  const tex = useMemo(() => {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return t;
  }, [w, h]);
  const last = useRef(-1);
  useFrame((st) => {
    const now = st.clock.elapsedTime;
    if (now - last.current < 1 / fps) return;
    last.current = now;
    draw(tex.image.getContext('2d'), now, w, h);
    tex.needsUpdate = true;
  });
  return tex;
};
const Screen = ({ tex, p, size, rot }) => (
  <mesh position={p} rotation={rot}><planeGeometry args={size} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
);

const drawCode = (ctx, t, w, h) => {
  ctx.fillStyle = '#1b1450'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#2e2190'; ctx.fillRect(0, 0, w, 20);
  ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(12 + i * 14, 10, 4, 0, 7); ctx.fill(); });
  const cols = [C.lime, C.white, C.pink, C.blue, C.lilac];
  const lh = 16, sp = 20, off = (t * sp) % lh, base = Math.floor((t * sp) / lh);
  for (let r = 0; r < 11; r++) {
    const n = base + r;
    let x = 14 + Math.floor(rnd(n) * 3) * 14;
    const segs = 1 + Math.floor(rnd(n + 9) * 3);
    for (let k = 0; k < segs; k++) {
      const wd = 22 + rnd(n * 3 + k) * 80;
      ctx.fillStyle = cols[Math.floor(rnd(n + k * 5) * cols.length)];
      ctx.fillRect(x, 30 + r * lh - off, wd, 7);
      x += wd + 8;
    }
  }
  ctx.fillStyle = '#1b1450'; ctx.fillRect(0, 0, w, 20);
  ctx.fillStyle = '#2e2190'; ctx.fillRect(0, 0, w, 20);
  ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(12 + i * 14, 10, 4, 0, 7); ctx.fill(); });
};
const drawWire = (ctx, t, w, h) => {
  ctx.fillStyle = '#f4f0ff'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = C.lime; ctx.fillRect(0, 0, w, 22);
  const pulse = Math.floor(t * 0.8) % 3;
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i === pulse ? C.lilacD : C.lilac; ctx.fillRect(10 + i * 50, 34, 44, 40);
    ctx.fillStyle = '#d9d2ff'; ctx.fillRect(10 + i * 50, 80, 44, 6); ctx.fillRect(10 + i * 50, 90, 30, 6);
  }
  ctx.fillStyle = C.dark; ctx.fillRect(10, 104, 60, 10);
};
const drawKliq = (ctx, t, w, h) => {
  ctx.fillStyle = C.white; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = C.purple; ctx.fillRect(0, 0, w, 54);
  ctx.fillStyle = '#fff'; ctx.font = '700 26px Fredoka, Poppins, sans-serif'; ctx.fillText('KliQ', 18, 36);
  ctx.fillStyle = '#7a7a8a'; ctx.font = '500 16px Poppins, sans-serif'; ctx.fillText('Nomor antrean Anda', 18, 96);
  ctx.fillStyle = C.dark; ctx.font = '700 62px Fredoka, Poppins, sans-serif';
  ctx.fillText(`A-0${12 + (Math.floor(t / 3) % 9)}`, 18, 160);
  ctx.fillStyle = C.lime; ctx.fillRect(18, 182, 124, 30);
  ctx.fillStyle = C.dark; ctx.font = '700 15px Poppins, sans-serif'; ctx.fillText(`Estimasi ${14 - (Math.floor(t / 3) % 9)} mnt`, 26, 203);
  for (let i = 0; i < 3; i++) { ctx.fillStyle = i === Math.floor(t) % 3 ? C.purple : '#e4dfff'; ctx.fillRect(18, 236 + i * 26, 200 - i * 40, 14); }
};
const drawGluver = (ctx, t, w, h) => {
  ctx.fillStyle = C.dark; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#9a9ab0'; ctx.font = '500 16px Poppins, sans-serif'; ctx.fillText('Gula darah', 18, 40);
  ctx.fillStyle = C.lime; ctx.font = '700 72px Fredoka, Poppins, sans-serif'; ctx.fillText(`${96 + Math.round(Math.sin(t) * 3)}`, 18, 120);
  ctx.fillStyle = '#fff'; ctx.font = '500 16px Poppins, sans-serif'; ctx.fillText('mg/dL', 128, 118);
  ctx.strokeStyle = C.pink; ctx.lineWidth = 4; ctx.beginPath();
  for (let x = 0; x <= 204; x += 6) { const y = 190 + Math.sin(x * 0.05 + t * 2) * 22 + Math.sin(x * 0.13 + t) * 8; x === 0 ? ctx.moveTo(18 + x, y) : ctx.lineTo(18 + x, y); }
  ctx.stroke();
  ctx.fillStyle = '#2a2a3a'; ctx.fillRect(18, 250, 204, 30);
  ctx.fillStyle = C.lime; ctx.beginPath(); ctx.arc(34, 265, 5, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = '600 14px Poppins, sans-serif'; ctx.fillText('Terhubung ke ESP32', 46, 270);
};

/* ---------- Efek kecil ---------- */
const Ping = ({ p, color = C.lime, size = 2.2, n = 3, period = 2.6 }) => {
  const refs = useRef([]);
  useFrame((st) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const k = (st.clock.elapsedTime / period + i / n) % 1;
      m.scale.setScalar(0.25 + k * size);
      m.material.opacity = (1 - k) * 0.85;
    });
  });
  return (
    <group position={p}>
      {Array.from({ length: n }).map((_, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.035, 8, 40]} />
          <meshBasicMaterial color={color} transparent opacity={0} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};
const Bubble = ({ p, delay = 0 }) => {
  const g = useRef();
  useFrame((st) => {
    const t = st.clock.elapsedTime + delay;
    g.current.position.y = p[1] + Math.sin(t * 1.4) * 0.1;
    g.current.scale.setScalar(1 + Math.max(0, Math.sin(t * 2.2)) * 0.08);
  });
  return (
    <group ref={g} position={p}>
      <Box s={[0.62, 0.26, 0.08]} c={C.white} r={0.12} />
      <Ball p={[-0.2, 0.13, 0.05]} r={0.05} c={C.lime} />
      <Box p={[-0.08, 0.1, 0.05]} s={[0.3, 0.04, 0.02]} c={C.lilac} sh={false} />
    </group>
  );
};
const Tree = ({ p, k = 1, seed = 0 }) => {
  const g = useRef();
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    g.current.rotation.z = Math.sin(t * 0.9 + seed) * 0.035;
    g.current.rotation.x = Math.cos(t * 0.7 + seed) * 0.025;
  });
  return (
    <group position={p} scale={k}>
      <Cyl r={0.08} h={0.75} c={C.wood} />
      <group ref={g} position={[0, 0.7, 0]}>
        <Ball p={[0, 0.5, 0]} r={0.6} c={C.leaf} sh />
        <Ball p={[0.38, 0.95, 0.1]} r={0.38} c={C.leafL} sh />
        <Ball p={[-0.35, 0.8, -0.15]} r={0.32} c={C.leafL} sh />
      </group>
    </group>
  );
};
const Pot = ({ p, k = 1 }) => (
  <group position={p} scale={k}>
    <Box s={[0.5, 0.4, 0.5]} c={C.lime} r={0.12} />
    <Ball p={[0, 0.75, 0]} r={0.22} c={C.leaf} s={[0.55, 1.7, 0.55]} sh />
    <Ball p={[0.15, 0.65, 0.05]} r={0.2} c={C.leafL} s={[0.5, 1.4, 0.5]} />
    <Ball p={[-0.15, 0.62, -0.05]} r={0.2} c={C.leaf} s={[0.5, 1.3, 0.5]} />
  </group>
);

/* ---------- Stasiun 0: Studio (Profil) ---------- */
const Windows = () => {
  const spots = useMemo(() => {
    const a = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) a.push({ p: [-0.55 + c * 0.55, 1.95 + r * 0.8, 0.98], rot: 0, seed: r * 3 + c });
      for (let c = 0; c < 2; c++) a.push({ p: [0.98, 1.95 + r * 0.8, 0.3 + c * 0.45], rot: Math.PI / 2, seed: 10 + r * 2 + c });
    }
    return a;
  }, []);
  const mats = useMemo(() => spots.map(() => new THREE.MeshStandardMaterial({ color: '#2b2a5a', emissive: C.lime, emissiveIntensity: 0, roughness: 0.4 })), [spots]);
  useFrame((st, dt) => {
    spots.forEach((s, i) => {
      const on = Math.sin(st.clock.elapsedTime * 0.35 + s.seed * 2.3) > 0.1 ? 0.9 : 0;
      mats[i].emissiveIntensity = THREE.MathUtils.damp(mats[i].emissiveIntensity, on, 3, Math.min(dt, 0.05));
    });
  });
  return spots.map((s, i) => <mesh key={i} geometry={rbox(0.36, 0.5, 0.06, 0.05)} material={mats[i]} position={s.p} rotation={[0, s.rot, 0]} />);
};
const Beacon = ({ p }) => {
  const m = useRef();
  useFrame((st) => { m.current.scale.setScalar(1 + Math.max(0, Math.sin(st.clock.elapsedTime * 3)) * 0.5); });
  return <mesh ref={m} position={p}><sphereGeometry args={[0.1, 14, 12]} /><meshBasicMaterial color={C.pink} toneMapped={false} /></mesh>;
};
const Studio = () => (
  <group>
    <Box s={[2.6, 0.4, 2.6]} c={C.cream} r={0.12} />
    <Box p={[0, 0.4, 0]} s={[1.95, 3.7, 1.95]} c={C.white} r={0.16} />
    <Box p={[0, 4.1, 0]} s={[2.15, 0.22, 2.15]} c={C.lime} r={0.1} />
    <Box p={[1.15, 0.4, -0.6]} s={[0.4, 3.9, 0.85]} c={C.lime} r={0.12} />
    <Windows />
    <Box p={[0, 0.4, 0.97]} s={[0.75, 0.9, 0.05]} c={C.purple} />
    <Box p={[0, 1.3, 1.05]} s={[1.15, 0.1, 0.55]} c={C.lime} />
    <Cyl p={[0.45, 4.32, 0.2]} r={0.04} h={0.85} c={C.dark} />
    <Beacon p={[0.45, 5.22, 0.2]} />
    <Ping p={[0.45, 5.22, 0.2]} color={C.pink} size={1.6} n={2} period={2.2} />
    <Tree p={[1.2, 0, 1.45]} k={0.6} seed={1} />
  </group>
);

/* ---------- Stasiun 1: Workstation (Web) ---------- */
const WebDesk = () => {
  const code = useScreen(256, 160, drawCode, 12);
  const wire = useScreen(160, 120, drawWire, 2);
  const win = useRef();
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    win.current.position.y = 3.0 + Math.sin(t * 1.2) * 0.1;
    win.current.rotation.y = Math.sin(t * 0.6) * 0.35;
  });
  return (
    <group>
      <Box p={[0, 0.78, 0]} s={[3.0, 0.12, 1.4]} c={C.white} />
      <Box p={[-1.35, 0, 0]} s={[0.12, 0.78, 1.2]} c={C.lilac} />
      <Box p={[1.35, 0, 0]} s={[0.12, 0.78, 1.2]} c={C.lilac} />
      <Box p={[0, 0.9, -0.4]} s={[0.2, 0.42, 0.12]} c={C.dark} />
      <Box p={[0, 1.3, -0.42]} s={[1.8, 1.05, 0.08]} c={C.dark} r={0.05} />
      <Screen tex={code} p={[0, 1.825, -0.375]} size={[1.66, 0.92]} />
      <group position={[-1.2, 0.9, 0.05]} rotation={[0, 0.55, 0]}>
        <Box p={[0, 0, 0]} s={[0.12, 0.2, 0.08]} c={C.dark} />
        <Box p={[0, 0.2, 0]} s={[0.9, 0.62, 0.06]} c={C.dark} r={0.04} />
        <Screen tex={wire} p={[0, 0.51, 0.035]} size={[0.8, 0.52]} />
      </group>
      <Box p={[0, 0.9, 0.35]} s={[1.1, 0.05, 0.34]} c={C.dark} />
      <Box p={[0, 0.95, 0.35]} s={[0.9, 0.02, 0.12]} c={C.lilacD} sh={false} />
      <Box p={[0.85, 0.9, 0.35]} s={[0.18, 0.07, 0.28]} c={C.white} r={0.08} />
      <Cyl p={[1.15, 0.9, -0.1]} r={0.12} h={0.22} c={C.lime} />
      <Box p={[1.25, 0.9, -0.5]} s={[0.3, 0.06, 0.3]} c={C.dark} />
      <Cyl p={[1.25, 0.96, -0.5]} r={0.03} h={0.7} c={C.dark} />
      <Box p={[1.12, 1.62, -0.5]} s={[0.4, 0.1, 0.22]} c={C.lime} r={0.05} />
      <Glow p={[1.12, 1.58, -0.5]} r={0.07} />
      <Cyl p={[0, 0, 1.3]} r={0.06} h={0.5} c={C.dark} />
      <Box p={[0, 0, 1.3]} s={[0.75, 0.06, 0.75]} c={C.dark} />
      <Box p={[0, 0.5, 1.3]} s={[0.85, 0.14, 0.8]} c={C.lime} r={0.12} />
      <Box p={[0, 0.64, 1.72]} s={[0.85, 0.85, 0.12]} c={C.lime} r={0.1} rot={[-0.1, 0, 0]} />
      <Pot p={[-1.95, 0, 0.6]} />
      <group ref={win} position={[1.35, 3.0, -0.2]}>
        <Box s={[1.1, 0.75, 0.06]} c={C.white} r={0.08} />
        <Box p={[0, 0.6, 0.035]} s={[1.1, 0.15, 0.03]} c={C.lilac} r={0.04} sh={false} />
        {[C.pink, C.gold, C.leaf].map((c, i) => <Ball key={c} p={[-0.45 + i * 0.12, 0.675, 0.07]} r={0.028} c={c} />)}
        <Box p={[-0.25, 0.28, 0.035]} s={[0.5, 0.18, 0.03]} c={C.lime} r={0.04} sh={false} />
        <Box p={[0.25, 0.1, 0.035]} s={[0.4, 0.3, 0.03]} c={C.lilac} r={0.04} sh={false} />
      </group>
    </group>
  );
};

/* ---------- Stasiun 2: Mobile ---------- */
const PhoneUnit = ({ p, rotY = 0, tex, speed = 1, phase = 0 }) => {
  const g = useRef();
  useFrame((st) => {
    const t = st.clock.elapsedTime * speed + phase;
    g.current.position.y = 0.6 + Math.sin(t * 1.3) * 0.08;
    g.current.rotation.y = rotY + Math.sin(t * 0.7) * 0.22;
  });
  return (
    <group position={p}>
      <Box s={[1.3, 0.16, 0.9]} c={C.white} r={0.07} />
      <group ref={g} position={[0, 0.6, 0]}>
        <Box s={[1.0, 2.0, 0.13]} c={C.dark} r={0.12} />
        <Screen tex={tex} p={[0, 1.0, 0.07]} size={[0.88, 1.84]} />
      </group>
    </group>
  );
};
const Phones = () => {
  const kliq = useScreen(240, 512, drawKliq, 6);
  const glu = useScreen(240, 512, drawGluver, 12);
  return (
    <group>
      <PhoneUnit p={[-1.1, 0, -0.7]} rotY={0.35} tex={kliq} />
      <PhoneUnit p={[0.7, 0, 0.1]} rotY={-0.3} tex={glu} speed={1.15} phase={2} />
      <Bubble p={[-1.1, 3.15, -0.5]} />
      <Bubble p={[-0.3, 3.45, -0.8]} delay={1.4} />
      <Box p={[1.75, 0, 1.05]} s={[0.75, 0.08, 0.42]} c={C.dark} r={0.04} />
      <Box p={[1.8, 0.08, 1.05]} s={[0.22, 0.05, 0.22]} c={C.lime} r={0.03} />
      <Ping p={[1.75, 0.5, 1.05]} size={1.6} n={3} period={2.4} />
      <Pot p={[-2.3, 0, 0.6]} k={0.9} />
    </group>
  );
};

/* ---------- Stasiun 3: AR / VR ---------- */
const VR = () => {
  const head = useRef(), o1 = useRef(), o2 = useRef();
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    head.current.position.y = 2.1 + Math.sin(t * 1.4) * 0.1;
    head.current.rotation.y = t * 0.5;
    o1.current.rotation.y = t * 0.8;
    o2.current.rotation.y = -t * 0.5;
  });
  return (
    <group>
      <Box s={[1.9, 0.8, 1.9]} c={C.white} r={0.25} />
      <Box p={[0, 0.8, 0]} s={[1.5, 0.1, 1.5]} c={C.lime} r={0.05} />
      <group ref={head} position={[0, 2.1, 0]}>
        <Box p={[0, -0.36, 0]} s={[1.5, 0.72, 0.85]} c={C.white} r={0.25} />
        <Box p={[0, -0.3, 0.4]} s={[1.32, 0.56, 0.14]} c={C.dark} r={0.12} />
        {[-0.33, 0.33].map((x) => (
          <mesh key={x} position={[x, 0, 0.49]}><torusGeometry args={[0.15, 0.035, 10, 24]} /><meshBasicMaterial color={C.lime} toneMapped={false} /></mesh>
        ))}
        <mesh position={[0, -0.02, -0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow material={mat(C.purple)}><torusGeometry args={[0.8, 0.07, 10, 28]} /></mesh>
      </group>
      <mesh position={[0, 1.6, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.7, 0.012, 6, 64]} /><meshBasicMaterial color={C.lilac} toneMapped={false} /></mesh>
      <group ref={o1} position={[0, 1.6, 0]}>
        <Ball p={[1.7, 0, 0]} r={0.2} c={C.lilacD} sh />
        <mesh position={[1.7, 0, 0]} rotation={[1.2, 0.3, 0]} material={mat(C.lime)}><torusGeometry args={[0.34, 0.02, 8, 32]} /></mesh>
        <Ball p={[-1.2, 0.35, 1.2]} r={0.11} c={C.pink} />
      </group>
      <group ref={o2} position={[0, 1.6, 0]}>
        <Box p={[0, 0.1, -1.5]} s={[0.2, 0.2, 0.2]} c={C.lime} rot={[0.6, 0.6, 0]} />
        <Ball p={[1.1, -0.3, -1.1]} r={0.09} c={C.blue} />
      </group>
      <Ping p={[0, 0.82, 0]} size={3.2} n={2} period={3} />
    </group>
  );
};

/* ---------- Stasiun 4: Resume ---------- */
const Shelf = () => {
  const cols = [C.lime, C.pink, C.blue, C.purple, C.orange, C.white, C.lilac];
  return (
    <group>
      <Box s={[3.0, 2.5, 0.45]} c={C.white} r={0.1} />
      <Box p={[0, 0.12, 0.05]} s={[2.76, 2.26, 0.4]} c={C.lilac} r={0.06} sh={false} />
      {[0, 1, 2].map((k) => (
        <group key={k}>
          <Box p={[0, 0.1 + k * 0.78, 0.1]} s={[2.8, 0.08, 0.45]} c={C.white} />
          {Array.from({ length: 10 }).map((_, i) => (
            <Box key={i} p={[-1.2 + i * 0.27, 0.18 + k * 0.78, 0.12]} s={[0.2, 0.4 + Math.floor(rnd(i + k * 11) * 4) * 0.08, 0.32]} c={cols[Math.floor(rnd(i * 3 + k) * cols.length)]} r={0.04} />
          ))}
        </group>
      ))}
      <group position={[-0.7, 2.5, 0.05]}>
        <Box p={[0, 0, 0]} s={[0.5, 0.2, 0.5]} c={C.dark} r={0.08} />
        <Box p={[0, 0.2, 0]} s={[0.95, 0.05, 0.95]} c={C.dark} r={0.02} rot={[0, Math.PI / 4, 0]} />
        <Cyl p={[0.38, 0.0, 0.38]} r={0.02} h={0.25} c={C.lime} />
        <Ball p={[0.38, -0.05, 0.38]} r={0.06} c={C.lime} />
      </group>
      <group position={[0.7, 2.5, 0.1]}>
        <Cyl r={0.2} h={0.1} c={C.dark} />
        <Cyl p={[0, 0.1, 0]} r={0.05} h={0.2} c={C.gold} />
        <Ball p={[0, 0.42, 0]} r={0.2} c={C.gold} s={[1, 1.1, 1]} sh />
      </group>
      <Box p={[0.7, 0, 2.2]} s={[1.6, 0.5, 0.9]} c={C.lilac} r={0.12} />
      <Box p={[0.3, 0.5, 2.2]} s={[0.55, 0.12, 0.4]} c={C.lime} r={0.04} />
      <Box p={[0.3, 0.62, 2.2]} s={[0.5, 0.1, 0.36]} c={C.pink} r={0.04} />
      <Box p={[0.3, 0.72, 2.2]} s={[0.45, 0.1, 0.32]} c={C.blue} r={0.04} />
      <Cyl p={[1.0, 0.65, 2.2]} r={0.07} h={0.6} c={C.cream} rot={[0, 0, Math.PI / 2]} />
      <Cyl p={[1.0, 0.65, 2.2]} r={0.075} h={0.12} c={C.lime} rot={[0, 0, Math.PI / 2]} />
      <Pot p={[-1.9, 0, 0.9]} k={0.9} />
    </group>
  );
};

/* ---------- Stasiun 5: Contact ---------- */
const Mailbox = () => {
  const flag = useRef(), plane = useRef(), env = useRef();
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    flag.current.rotation.z = 0.05 + Math.sin(t * 2.2) * 0.14;
    const a = t * 0.7;
    plane.current.position.set(Math.cos(a) * 2.1, 2.6 + Math.sin(a * 2) * 0.25, Math.sin(a) * 2.1);
    plane.current.rotation.y = -a;
    env.current.position.y = 2.7 + Math.sin(t * 1.5) * 0.12;
    env.current.rotation.y = t * 0.6;
  });
  return (
    <group>
      <Box s={[0.22, 1.1, 0.22]} c={C.wood} r={0.05} />
      <Box p={[0, 1.1, 0]} s={[1.3, 0.8, 0.9]} c={C.lime} r={0.28} />
      <Box p={[0, 1.55, 0.44]} s={[0.7, 0.09, 0.05]} c={C.dark} r={0.03} />
      <group ref={flag} position={[0.7, 1.55, 0]}>
        <Box s={[0.07, 0.55, 0.07]} c={C.dark} r={0.03} />
        <Box p={[0.12, 0.35, 0]} s={[0.3, 0.2, 0.05]} c={C.pink} r={0.05} />
      </group>
      <group ref={env} position={[0, 2.7, 0]}>
        <Box s={[0.9, 0.06, 0.6]} c={C.white} r={0.03} />
        <Box p={[0, 0.06, 0.02]} s={[0.46, 0.03, 0.46]} c={C.lime} r={0.02} rot={[0, Math.PI / 4, 0]} sh={false} />
      </group>
      <group ref={plane}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={mat(C.white)} castShadow><coneGeometry args={[0.13, 0.5, 3]} /></mesh>
      </group>
      <Ping p={[0, 2.2, 0]} size={3.2} n={3} period={2.4} />
      <Ping p={[0, 0.7, 0]} color={C.pink} size={1.8} n={2} period={2.4} />
      <Pot p={[1.9, 0, 1.0]} k={0.9} />
      <Tree p={[-1.7, 0, 0.8]} k={0.7} seed={3} />
    </group>
  );
};

/* ---------- Tata letak diorama ---------- */
const STOPS = [[0, 0], [7, 0], [7, 7], [14, 7], [14, 14], [21, 14]];
const PATH = STOPS.map(([x, z]) => new THREE.Vector3(x, 0, z));
const STATIONS = [
  { C: Studio, at: [-1.9, -0.5] },
  { C: WebDesk, at: [0.6, -1.7] },
  { C: Phones, at: [-1.5, -0.3] },
  { C: VR, at: [0.7, -1.6] },
  { C: Shelf, at: [-1.7, -1.1] },
  { C: Mailbox, at: [0.8, -1.5] },
];
const TOP = 0.59;

const Plate = ({ children }) => (
  <group>
    <Box s={[6.0, 0.45, 6.0]} c={C.purpleD} r={0.12} />
    <Box p={[0, 0.45, 0]} s={[6.4, 0.14, 6.4]} c={C.plate} r={0.07} />
    <group position={[0, TOP, 0]}>{children}</group>
  </group>
);

const Character = ({ rig }) => {
  const set = (k) => (el) => { rig.current[k] = el; };
  const NAVY2 = '#171d3a';
  return (
    <group ref={set('root')}>
      <group ref={set('body')}>
        {/* celana panjang + sepatu hitam berhak kecil */}
        {[-1, 1].map((sd) => (
          <group key={sd} ref={set(sd < 0 ? 'legL' : 'legR')} position={[sd * 0.09, 0.62, 0]}>
            <Box p={[0, -0.57, 0]} s={[0.14, 0.6, 0.17]} c={C.navy} r={0.06} />
            <Box p={[0, -0.62, 0.04]} s={[0.15, 0.09, 0.27]} c={C.dark} r={0.05} />
            <Box p={[0, -0.62, -0.06]} s={[0.07, 0.13, 0.06]} c={C.dark} r={0.02} />
          </group>
        ))}
        <Box p={[0, 0.48, 0]} s={[0.4, 0.2, 0.25]} c={C.navy} r={0.08} />
        {/* blazer navy + kemeja putih berkerah */}
        <Box p={[0, 0.5, 0]} s={[0.42, 0.58, 0.27]} c={C.navy} r={0.12} />
        <Box p={[0, 0.58, 0.128]} s={[0.14, 0.46, 0.02]} c={C.white} r={0.01} sh={false} />
        <Box p={[-0.085, 0.62, 0.136]} s={[0.08, 0.4, 0.02]} c={NAVY2} r={0.01} rot={[0, 0, 0.18]} sh={false} />
        <Box p={[0.085, 0.62, 0.136]} s={[0.08, 0.4, 0.02]} c={NAVY2} r={0.01} rot={[0, 0, -0.18]} sh={false} />
        <Box p={[-0.07, 1.04, 0.115]} s={[0.09, 0.05, 0.03]} c={C.white} r={0.01} rot={[0, 0, 0.6]} sh={false} />
        <Box p={[0.07, 1.04, 0.115]} s={[0.09, 0.05, 0.03]} c={C.white} r={0.01} rot={[0, 0, -0.6]} sh={false} />
        <Ball p={[0, 0.6, 0.145]} r={0.012} c={C.dark} />
        <Box p={[-0.13, 0.82, 0.138]} s={[0.07, 0.09, 0.012]} c={C.lime} r={0.01} sh={false} />
        {/* lengan blazer dengan manset putih */}
        {[-1, 1].map((sd) => (
          <group key={sd} ref={set(sd < 0 ? 'armL' : 'armR')} position={[sd * 0.27, 1.02, 0]}>
            <Box p={[0, -0.46, 0]} s={[0.11, 0.46, 0.13]} c={C.navy} r={0.055} />
            <Box p={[0, -0.5, 0]} s={[0.115, 0.04, 0.135]} c={C.white} r={0.02} sh={false} />
            <Ball p={[0, -0.55, 0]} r={0.062} c={C.skin} />
          </group>
        ))}
        {/* kepala: rambut bob hitam berponi */}
        <group ref={set('head')} position={[0, 1.08, 0]}>
          <Cyl p={[0, -0.05, 0]} r={0.05} h={0.12} c={C.skin} sh={false} />
          <Ball p={[0, 0.2, 0]} r={0.2} c={C.skin} sh />
          <Ball p={[0, 0.22, -0.04]} r={0.23} c={HAIR} s={[1, 1.05, 0.97]} sh />
          <Ball p={[0, 0.02, -0.07]} r={0.22} c={HAIR} s={[1, 0.8, 0.92]} sh />
          <Ball p={[-0.185, 0.07, 0]} r={0.16} c={HAIR} s={[0.42, 1.15, 0.85]} sh />
          <Ball p={[0.185, 0.07, 0]} r={0.16} c={HAIR} s={[0.42, 1.15, 0.85]} sh />
          <Ball p={[0, 0.345, 0.1]} r={0.19} c={HAIR} s={[1, 0.4, 0.7]} />
          <Ball p={[-0.12, 0.3, 0.115]} r={0.09} c={HAIR} s={[0.7, 1.1, 0.5]} />
          <Ball p={[0.12, 0.3, 0.115]} r={0.09} c={HAIR} s={[0.7, 1.1, 0.5]} />
          {[-1, 1].map((sd) => (
            <group key={sd}>
              <Ball p={[sd * 0.075, 0.215, 0.188]} r={0.032} c="#3a2a24" s={[0.9, 1.2, 0.5]} />
              <Ball p={[sd * 0.068, 0.228, 0.208]} r={0.01} c={C.white} />
              <Box p={[sd * 0.075, 0.262, 0.185]} s={[0.055, 0.009, 0.01]} c={HAIR} r={0.003} rot={[0, 0, sd * -0.15]} sh={false} />
              <Ball p={[sd * 0.125, 0.15, 0.162]} r={0.034} c={C.pink} s={[1, 0.7, 0.4]} />
            </group>
          ))}
          <mesh position={[0, 0.135, 0.192]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.03, 0.007, 6, 12, Math.PI]} /><meshBasicMaterial color="#b4574f" /></mesh>
        </group>
      </group>
    </group>
  );
};

/* ---------- Dunia + kamera ---------- */
const World = ({ track }) => {
  const rig = useRef({});
  const light = useRef();
  const cur = useRef(0);
  const offX = useRef(null);
  const phase = useRef(0);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const tgt = useMemo(() => new THREE.Object3D(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const focus = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();

  useEffect(() => {
    const w = size.width;
    camera.zoom = w >= 1280 ? 50 : w >= 768 ? 42 : 27;
    camera.updateProjectionMatrix();
    offX.current = null;
  }, [size, camera]);

  useEffect(() => {
    const move = (e) => { mouse.current.tx = (e.clientX / window.innerWidth) * 2 - 1; mouse.current.ty = -((e.clientY / window.innerHeight) * 2 - 1); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useFrame((st, dt) => {
    dt = Math.min(dt, 0.05);
    const T = st.clock.elapsedTime;
    const M = THREE.MathUtils;
    const t = track.current.t;
    cur.current = M.damp(cur.current, t, 4, dt);

    const w = size.width;
    const ox = w >= 1024 ? M.lerp(-w * 0.08, -w * 0.27, M.clamp(cur.current, 0, 1)) : 0;
    if (offX.current === null || Math.abs(ox - offX.current) > 0.5) {
      offX.current = ox;
      camera.setViewOffset(w, size.height, ox, w < 768 ? size.height * 0.2 : 0, w, size.height);
      camera.updateProjectionMatrix();
    }

    const i = Math.min(4, Math.floor(cur.current));
    const k = M.clamp(cur.current - i, 0, 1);
    pos.copy(PATH[i]).lerp(PATH[i + 1], k);

    const R = rig.current;
    const mv = M.clamp(Math.abs(t - cur.current) * 12, 0, 1);
    phase.current += dt * 9 * mv;
    const sw = Math.sin(phase.current);
    const idle = 1 - mv;

    R.root.position.set(pos.x, TOP, pos.z);
    const segAng = Math.atan2(PATH[i + 1].x - PATH[i].x, PATH[i + 1].z - PATH[i].z);
    R.root.rotation.y = M.damp(R.root.rotation.y, mv > 0.12 ? segAng : Math.PI / 4, 6, dt);
    R.legL.rotation.x = sw * 0.75 * mv;
    R.legR.rotation.x = -sw * 0.75 * mv;
    R.armL.rotation.x = -sw * 0.7 * mv;
    const wave = idle * (T % 8 < 1.8 ? 1 : 0);
    R.armR.rotation.x = M.damp(R.armR.rotation.x, sw * 0.7 * mv, 10, dt);
    R.armR.rotation.z = M.damp(R.armR.rotation.z, wave * 2.6 + Math.sin(T * 10) * 0.18 * wave, 8, dt);
    R.body.position.y = Math.abs(Math.cos(phase.current)) * 0.07 * mv + Math.sin(T * 2) * 0.012 * idle;
    R.body.rotation.x = M.damp(R.body.rotation.x, 0.1 * mv, 8, dt);
    R.head.rotation.z = Math.sin(T * 1.3) * 0.05 * idle;

    focus.x = M.damp(focus.x, pos.x - 0.6, 5, dt);
    focus.y = 0.9;
    focus.z = M.damp(focus.z, pos.z - 0.6, 5, dt);
    const m = mouse.current;
    m.x = M.damp(m.x, m.tx, 3, dt); m.y = M.damp(m.y, m.ty, 3, dt);
    camera.position.set(focus.x + 9 + m.x * 1.1, focus.y + 9 + m.y * 0.6, focus.z + 9 - m.x * 1.1);
    camera.lookAt(focus);

    light.current.position.set(focus.x + 7, 14, focus.z + 4);
    tgt.position.copy(focus);
    tgt.updateMatrixWorld();
  });

  return (
    <>
      <fog attach="fog" args={['#4c35de', 20, 44]} />
      <ambientLight intensity={0.95} color="#fff7ee" />
      <hemisphereLight args={['#ffffff', '#8f82f0', 0.55]} />
      <directionalLight ref={light} target={tgt} castShadow intensity={1.7} color="#fff1dc"
        shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} shadow-radius={5}
        shadow-camera-left={-14} shadow-camera-right={14} shadow-camera-top={14} shadow-camera-bottom={-14} shadow-camera-near={1} shadow-camera-far={50} />
      <primitive object={tgt} />

      {/* bayangan lembut di bawah pulau */}
      <mesh rotation-x={-Math.PI / 2} position-y={-1.6} receiveShadow><planeGeometry args={[240, 240]} /><shadowMaterial opacity={0.28} color="#12084f" /></mesh>

      {/* jalur lime di atas pulau */}
      {PATH.slice(0, -1).map((a, i) => {
        const b = PATH[i + 1];
        const alongX = a.z === b.z;
        const len = Math.abs(alongX ? b.x - a.x : b.z - a.z) + 0.55;
        return (
          <group key={i} position={[(a.x + b.x) / 2, TOP, (a.z + b.z) / 2]}>
            <Box s={alongX ? [len + 0.1, 0.04, 0.95] : [0.95, 0.04, len + 0.1]} c={C.dark} r={0.02} sh={false} />
            <Box p={[0, 0.02, 0]} s={alongX ? [len, 0.05, 0.62] : [0.62, 0.05, len]} c={C.lime} r={0.02} sh={false} />
          </group>
        );
      })}

      {PATH.map((a, i) => {
        const S = STATIONS[i];
        return (
          <group key={i} position={[a.x, 0, a.z]}>
            <Plate>
              <group position={[S.at[0], 0, S.at[1]]}><S.C /></group>
            </Plate>
          </group>
        );
      })}

      <Character rig={rig} />
    </>
  );
};

export default World;