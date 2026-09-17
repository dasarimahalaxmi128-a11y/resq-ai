/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        resq: {
          base: '#080B0D',
          surface: '#0D1214',
          'surface-2': '#11181B',
          'surface-3': '#161E22',
          border: '#1E2830',
          'border-light': '#2A3740',
          text: '#F4F1EA',
          'text-bright': '#F8F7F3',
          'text-dim': '#8A9499',
          'text-faint': '#5A6670',
          teal: '#4FB3A8',
          'teal-bright': '#67C7BC',
          'teal-dim': '#2E7A72',
          coral: '#E45B61',
          'coral-dim': '#8A3940',
          'coral-bright': '#F07379',
          amber: '#E8A838',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Manrope', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.5s ease-out infinite',
        'draw-line': 'draw-line 1.5s ease-in-out forwards',
        'scan': 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};
