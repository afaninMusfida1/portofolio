import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Send } from 'lucide-react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { bouncyTransition } from '../../utils/animations'; 
import { db } from '../../utils/firebase'; 
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  limit, 
  serverTimestamp 
} from "firebase/firestore";

const ChatRoom = () => {
  // UBAH 1: Ganti dummyDiv jadi ref untuk container chat agar scrollnya spesifik di box ini aja
  const chatContainerRef = useRef(null);

  // --- USER STATE (Tetap pakai localStorage biar user ga logout pas refresh) ---
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('chatUser');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // --- 1. MAGIC FIREBASE: DENGARKAN PESAN MASUK (REALTIME) ---
  useEffect(() => {
    // Query: Ambil dari koleksi 'messages', urutkan berdasarkan waktu buat
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(100) // Batasi 100 pesan terakhir biar ga berat
    );

    // onSnapshot: Ini yang bikin chat muncul sendiri tanpa refresh
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pushedMessages = [];
      querySnapshot.forEach((doc) => {
        pushedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(pushedMessages);
      
      // UBAH 2: Logic scroll aman (tidak menarik halaman ke bawah)
      setTimeout(() => {
        if (chatContainerRef.current) {
          // Set scrollbar container ke paling bawah
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    });

    return () => unsubscribe(); // Matikan pendengar kalau pindah halaman
  }, []);

  // Simpan session user
  useEffect(() => {
    if (user) {
      localStorage.setItem('chatUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('chatUser');
    }
  }, [user]);

  // --- GOOGLE LOGIN ---
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        setUser(userInfo.data); 
      } catch (error) {
        console.error("Login Error", error);
      }
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const handleLogout = () => {
    setUser(null);
  };

  // --- KIRIM PESAN KE FIREBASE ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      // Kirim data ke database "cloud"
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        uid: user.sub,
        photoURL: user.picture,
        displayName: user.name,
        createdAt: serverTimestamp() // Pakai jam server Google biar sinkron
      });

      setNewMessage(""); // Kosongkan input
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Gagal kirim pesan. Cek koneksi internetmu.");
    }
  };

  return (
    <motion.div
      className="bg-white border-[3px] border-black rounded-[15px] p-0 shadow-[8px_8px_0_black] overflow-hidden flex flex-col h-[500px] mt-10 md:mt-0"
      whileHover={{ scale: 1.01, boxShadow: "12px 12px 0 black" }}
      whileTap={{ scale: 0.99 }}
      transition={bouncyTransition}
    >
      {/* Header */}
      <div className="bg-[#31a8ff] p-3 border-b-[3px] border-black flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-black"></div>
           <h3 className="font-fredoka font-bold text-white text-lg tracking-wide">SAY HI!!</h3>
        </div>
        {user && (
            <button onClick={handleLogout} className="bg-black text-white text-xs px-2 py-1 rounded border border-white hover:bg-red-500 transition-colors cursor-pointer">
                <LogOut size={12} />
            </button>
        )}
      </div>

      {/* Chat Area */}
      {/* UBAH 3: Pasang ref disini (chatContainerRef) */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4 font-patrick"
      >
        {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                <span className="text-4xl mb-2">🔥</span>
                <p className="font-fredoka text-lg">Chatroom Online!</p>
                <p className="text-sm">Jadilah yang pertama chat disini.</p>
            </div>
        )}

        {messages.map((msg) => {
            const isMe = user ? msg.uid === user.sub : false;

            return (
                <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                    <img 
                      src={msg.photoURL} 
                      alt="avatar" 
                      className="w-9 h-9 rounded-full border-2 border-black bg-white object-cover"
                      onError={(e) => {e.target.src="https://api.dicebear.com/9.x/avataaars/svg?seed=Guest"}}
                    />
                    
                    <div className="max-w-[80%]">
                        <p className={`font-bold text-[10px] mb-0.5 opacity-70 ${isMe ? "text-right" : "text-left"}`}>
                          {msg.displayName}
                        </p>
                        
                        <div 
                          className={`px-3 py-2 rounded-lg border-2 border-black text-sm relative shadow-[2px_2px_0_rgba(0,0,0,0.1)] 
                          ${isMe 
                            ? "bg-neon-green rounded-tr-none" 
                            : "bg-white rounded-tl-none"
                          }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                </div>
            )
        })}
        {/* UBAH 4: Hapus <div ref={dummyDiv}></div> karena sudah tidak dipakai */}
      </div>

      {/* Footer / Input */}
      <div className="p-3 bg-[#eee] border-t-[3px] border-black relative z-20">
        {!user ? (
            <div className="flex flex-col items-center gap-2">
                <p className="font-patrick text-sm text-gray-600">Login untuk mengirim pesan</p>
                <button 
                    onClick={() => login()}
                    className="w-full flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[3px_3px_0_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer hover:bg-gray-50"
                >
                   <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
                   <span className="font-bold font-fredoka">Login with Google</span>
                </button>
            </div>
        ) : (
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tulis pesan..."
                    className="flex-1 bg-white border-2 border-black rounded-lg px-3 py-2 font-patrick focus:outline-none focus:shadow-[2px_2px_0_#31a8ff] transition-all"
                />
                <button 
                  type="submit" 
                  className="bg-black text-white p-2 rounded-lg hover:bg-neon-green hover:text-black hover:border-black border-2 border-transparent transition-all cursor-pointer"
                >
                    <Send size={20} />
                </button>
            </form>
        )}
      </div>
    </motion.div>
  );
};

export default ChatRoom;