/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        // New Vibrant Color Palette
        primary: '#8B5CF6',     // Violet
        secondary: '#EC4899',   // Pink
        dark: {
          background: '#0b1120', // Deep Navy/Slate
          container: '#1e293b',  // Dark Slate for cards
          text: '#e2e8f0',       // Light Slate
        },
        light: {
          background: '#F9FAFB', // Original Light Gray
          container: '#FFFFFF',  // White for cards
          text: '#111827',       // Original Dark Gray
        }
      },
      keyframes: {
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        'playing-bar': {
          '0%, 100%': { transform: 'scaleY(0.2)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        wave: 'wave 2.5s infinite',
        'playing-bar1': 'playing-bar 1.2s ease-in-out infinite',
        'playing-bar2': 'playing-bar 1.2s ease-in-out 0.2s infinite',
        'playing-bar3': 'playing-bar 1.2s ease-in-out 0.4s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

