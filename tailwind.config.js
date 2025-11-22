/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'], // Mantendo por compatibilidade se necessário
        anton: ['Anton', 'sans-serif'],
        oxanium: ['Oxanium', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a0a0a', // Deep black
          surface: '#121212', // Slightly lighter
          primary: '#A50044',
          accent: '#DB0030',
          blue: '#004D98',
          yellow: '#EDBA00',
          gray: '#909090',
          glow: '#FF2332',
        }
      },
      backgroundImage: {
        'mesh-radial': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}