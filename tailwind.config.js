/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1F16',
        cream: '#F7F4EC',
        sand: '#EFE9DB',
        forest: {
          50: '#F1F8F3',
          100: '#DCF0E2',
          200: '#BBE3C8',
          300: '#8CCFA6',
          400: '#58B47E',
          500: '#34985F',
          600: '#237C4B',
          700: '#1D633E',
          800: '#1A4F33',
          900: '#123A25',
          950: '#082115',
        },
        lime: {
          100: '#F3FBD4',
          200: '#E7F7A8',
          300: '#DCF275',
          400: '#CCE84E',
          500: '#B5D62F',
          600: '#93B31F',
        },
        coral: '#FF7A59',
        amber: '#F2B34B',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 12px 40px -18px rgba(8, 33, 21, 0.25)',
        lift: '0 24px 60px -24px rgba(8, 33, 21, 0.35)',
        glow: '0 0 0 6px rgba(220, 242, 117, 0.25)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.65)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(1.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
