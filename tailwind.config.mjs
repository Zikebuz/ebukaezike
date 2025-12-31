// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#915EFF',   // Bright blue accent
        secondary: '#ffffff', // Amber accent for highlights
      },
      boxShadow: {
        'top': '0 -4px 6px -1px rgba(0,0,0,0.1)',
        'bottom': '0 4px 6px -1px rgba(0,0,0,0.1)',
        'left': '-4px 0 6px -1px rgba(0,0,0,0.1)',
        'right': '4px 0 6px -1px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
