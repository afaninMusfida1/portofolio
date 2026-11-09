import React, { useState } from 'react';
import ChatRoom from './ChatRoom';

/* Chat mengambang di pojok kanan bawah, tidak memakan ruang scroll */
const ChatDock = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <button
        onClick={() => { setOpen((o) => !o); setMounted(true); }}
        className="fixed bottom-5 right-5 z-[60] bg-neon-green text-ink-black font-fredoka font-semibold text-lg px-5 py-3 border-[3px] border-ink-black rounded-[50px] shadow-hard cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      >
        {open ? 'Tutup ✕' : 'Say Hi! 👋'}
      </button>
      {mounted && (
        <div className={`fixed bottom-24 right-5 z-[60] w-[min(92vw,380px)] text-ink-black [&>div]:!h-[min(500px,65vh)] [&>div]:!mt-0 ${open ? '' : 'hidden'}`}>
          <ChatRoom />
        </div>
      )}
    </>
  );
};

export default ChatDock;  