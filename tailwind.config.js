/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          // A deep, professional crimson for the background
          redBg: '#8A1515', 
          gray: {
            50:  '#F9FAFB',
            100: '#F3F4F6',
            500: '#6B7280',
            900: '#111827',
          }
        },
        utility: {
          // True primary colors for buttons, links, and accents
          red:   '#DC2626', 
          blue:  '#2563EB',
        }
      },
      animation: {
        // Kept your typing logic but set it to a solid "step" feel
        typing: 'typing 3s steps(30) forwards',
        blink: 'blink .7s step-end infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        blink: {
          '50%': { borderColor: 'transparent' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      // Added custom shadows for that Neo-brutalist "normal" look
      boxShadow: {
        'brutal': '12px 12px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
      }
    }
  },
  plugins: []
}