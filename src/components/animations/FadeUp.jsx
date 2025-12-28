import { motion } from 'framer-motion';

export default function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Posisi awal (transparan & agak ke bawah)
      whileInView={{ opacity: 1, y: 0 }} // Saat terlihat di layar (muncul & naik)
      viewport={{ once: true, margin: "-100px" }} // Animasi jalan sekali saja
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.25, 0.4, 0.25, 1] // Easing halus
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}