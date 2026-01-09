import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { bouncyTransition } from '../../utils/animations';

const ContactFooter = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); 

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFx5sGr3zpbkbhrn9ZOtvF0XG0AbaJb23IbXjq22gNzZlIV2wsjW3CEr3K90QBU70W/exec"; 

  const socials = [
    { id: 1, name: "GitHub", icon: <Github size={20} />, url: "https://github.com/AfaninMusfida1", color: "bg-[#333] text-white", hover: "hover:bg-[#000]" },
    { id: 2, name: "LinkedIn", icon: <Linkedin size={20} />, url: "https://linkedin.com/in/afanin-musfida", color: "bg-[#0077b5] text-white", hover: "hover:bg-[#005582]" },
    { id: 3, name: "Instagram", icon: <Instagram size={20} />, url: "https://instagram.com/afaniwn", color: "bg-[#e1306c] text-white", hover: "hover:bg-[#b01e4e]" },
    { id: 4, name: "Email", icon: <Mail size={20} />, url: "mailto:afaninmusfida1@gmail.com", color: "bg-[#EA4335] text-white", hover: "hover:bg-[#c5221f]" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            mode: 'no-cors', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => setStatus('idle'), 3000);

    } catch (error) {
        console.error("Error:", error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div id="contact" className="mt-[80px] mb-10">
      <motion.div 
        className="bg-[#FFD600] border-[3px] border-black rounded-[20px] p-6 md:p-10 relative shadow-[10px_10px_0_black] overflow-hidden"
        whileHover={{ scale: 1.005, boxShadow: "14px 14px 0 black" }}
        transition={bouncyTransition}
      >
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white opacity-20 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          
          <div className="flex flex-col justify-between">
            <div>
                <h2 className="font-fredoka font-black text-4xl md:text-5xl text-black leading-tight mb-4">
                  LETS WORK <br/> TOGETHER!
                </h2>
                <p className="font-patrick text-xl text-black/80 mb-8">
                  Info project lucu dungs. Japri is the key!!! 
                </p>
            </div>
            <div>
                <p className="font-fredoka font-bold mb-3 text-sm uppercase tracking-wide opacity-80 flex items-center gap-2">
                    Let's Mutual! 
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {socials.map((item) => (
                    <motion.a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${item.color} ${item.hover} border-[3px] border-black p-3 rounded-[10px] flex items-center justify-center gap-2 font-fredoka font-bold shadow-[4px_4px_0_black] transition-colors relative text-sm`}
                        whileHover={{ scale: 1.05, y: -2, boxShadow: "6px 6px 0 black" }}
                        whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0 black" }}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </motion.a>
                    ))}
                </div>
            </div>
          </div>

          <div className="bg-white border-[3px] border-black rounded-[15px] p-6 shadow-[8px_8px_0_rgba(0,0,0,0.1)] relative">
            <h3 className="font-fredoka font-bold text-2xl mb-4 border-b-2 border-dashed border-black pb-2">
                Kirim Pesan Rahasia ke Gue!
            </h3>

            <AnimatePresence mode='wait'>
                {status === 'success' ? (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-[300px] flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center border-[3px] border-black mb-4 shadow-[4px_4px_0_black]">
                            <CheckCircle2 size={40} />
                        </div>
                        <h4 className="font-fredoka text-2xl font-bold">Terkirim!</h4>
                        <p className="font-patrick text-lg">Pesan lo udah masuk database gue.</p>
                    </motion.div>
                ) : (
                    <motion.form 
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="flex flex-col gap-4"
                    >
                        {/* Input Nama */}
                        <div>
                            <label className="font-fredoka text-sm font-bold mb-1 block ml-1">Nama Lo</label>
                            <input 
                                type="text" 
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Siapa nih?"
                                className="w-full bg-gray-50 border-[2px] border-black rounded-[10px] px-4 py-3 font-patrick focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] transition-all"
                            />
                        </div>
                        
                        {/* Input Email */}
                        <div>
                            <label className="font-fredoka text-sm font-bold mb-1 block ml-1">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@keren.com"
                                className="w-full bg-gray-50 border-[2px] border-black rounded-[10px] px-4 py-3 font-patrick focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] transition-all"
                            />
                        </div>

                        {/* Input Pesan */}
                        <div>
                            <label className="font-fredoka text-sm font-bold mb-1 block ml-1">Pesan</label>
                            <textarea 
                                name="message"
                                rows="3"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Mau ngajak collab project..."
                                className="w-full bg-gray-50 border-[2px] border-black rounded-[10px] px-4 py-3 font-patrick focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Button Submit */}
                        <motion.button 
                            type="submit"
                            disabled={status === 'submitting'}
                            className="bg-black text-white font-fredoka font-bold py-3 rounded-[10px] border-[2px] border-black flex items-center justify-center gap-2 mt-2 hover:bg-neon-green hover:text-black disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status === 'submitting' ? (
                                <> <Loader2 className="animate-spin" /> Mengirim... </>
                            ) : (
                                <> <Send size={18} /> Kirim Pesan </>
                            )}
                        </motion.button>
                        
                        {status === 'error' && (
                            <p className="text-red-500 font-bold text-center text-sm font-patrick">Yah, gagal kirim. Coba lagi bentar ya.</p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-12 border-t-[3px] border-black/20 pt-4 flex flex-col md:flex-row justify-between items-center font-patrick text-sm font-bold opacity-70">
           <p>© {new Date().getFullYear()} Afanin Musfida. All rights reserved.</p>
           <p>Made with ☕ and React</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactFooter;