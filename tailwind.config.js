/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-red': {
          '0%, 100%': {
            borderColor: 'rgb(248 113 113)',
            boxShadow: '0 0 0 0 rgba(248, 113, 113, 0.7)',
          },
          '50%': {
            borderColor: 'rgb(239 68 68)',
            boxShadow: '0 0 0 8px rgba(248, 113, 113, 0)',
          },
        },
        'pulse-green': {
          '0%, 100%': {
            borderColor: 'rgb(74 222 128)',
            boxShadow: '0 0 0 0 rgba(74, 222, 128, 0.7)',
          },
          '50%': {
            borderColor: 'rgb(34 197 94)',
            boxShadow: '0 0 0 8px rgba(74, 222, 128, 0)',
          },
        },
        'slot-roll': {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(-496px)',
          },
        },
        'avatar-appear': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'avatar-disappear': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
        },
      },
      animation: {
        'pulse-red': 'pulse-red 1s ease-in-out infinite',
        'pulse-green': 'pulse-green 1s ease-in-out infinite',
        'slot-roll': 'slot-roll 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'avatar-appear': 'avatar-appear 0.4s ease-out forwards',
        'avatar-disappear': 'avatar-disappear 0.4s ease-in forwards',
      },
    },
  },
  plugins: [],
}

