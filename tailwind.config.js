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
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        atelier: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#E6DFD5',
          300: '#D5C7B7',
          400: '#B8A189',
          500: '#9C7F65',
          600: '#7E634D',
          700: '#5F4A39',
          800: '#3D3025',
          900: '#1F1812',
          950: '#0C0A08',
        },
        gold: {
          300: '#E5C687',
          400: '#D4AF37',
          500: '#C59E2B',
          600: '#A37E1C',
        },
        obsidian: {
          900: '#0E1015',
          950: '#08090C',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
