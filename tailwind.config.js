/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          surface: '#1F2937',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        neon: {
          cyan: '#00F2FE',
          blue: '#4FACFE',
          emerald: '#10B981',
          purple: '#8B5CF6',
          pink: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -5px rgba(0, 242, 254, 0.4)',
        'neon-blue': '0 0 20px -5px rgba(79, 172, 254, 0.4)',
        'neon-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(0, 242, 254, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(0, 242, 254, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
