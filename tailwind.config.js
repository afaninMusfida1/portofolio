/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#ccff00',
        'electric-purple': '#4c35de',
        'ink-black': '#1a1a1a',
        'paper-white': '#ffffff',
      },
      fontFamily: {
        fredoka: ['"Fredoka"', 'sans-serif'],
        patrick: ['"Patrick Hand"', 'cursive'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'hard': '6px 6px 0px 0px #1a1a1a', // --hard-shadow
      },
      backgroundImage: {
        // Pattern background body
        'dots': 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)',
        // Pattern selotip (Washi Tape)
        'tape': 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)',
        // Pattern garis buku
        'lined': 'linear-gradient(#eee 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}