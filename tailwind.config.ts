import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta cálida y emocional — verde salvia + azul suave + durazno tenue
        sage: {
          50: '#F4F8F5',
          100: '#E3EEE6',
          200: '#C5DCCB',
          300: '#9EC3A8',
          400: '#7FB89E',
          500: '#5E9F80',
          600: '#4A8168',
          700: '#3C6854',
          800: '#325345',
          900: '#2B443A',
        },
        sky: {
          50: '#F4F9FC',
          100: '#E4F0F7',
          200: '#C8E0EC',
          300: '#A8C5D6',
          400: '#7FA8BE',
          500: '#5C8BA5',
        },
        peach: {
          50: '#FDF6F2',
          100: '#FAEAE0',
          200: '#F4D5BF',
          300: '#EBBA9B',
          400: '#DE9D75',
        },
        warm: {
          bg: '#FAF8F4',
          surface: '#F5F2EC',
          muted: '#E8E4DA',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'breathe': 'breathe 10s ease-in-out infinite',
        'drift': 'drift 18s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.08)', opacity: '0.75' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -20px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
