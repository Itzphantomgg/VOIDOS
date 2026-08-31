/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#020307',
          900: '#050814',
          850: '#0a0e20',
          800: '#0f162c',
          750: '#151f3d',
          700: '#1b284e',
          600: '#26386d',
          500: '#344c92',
        },
        retro: {
          cyan: '#00f0ff',
          cyanDim: '#0099aa',
          magenta: '#ff007f',
          magentaDim: '#aa0055',
          purple: '#b24bf3',
          purpleDim: '#7022a3',
          violet: '#8a2be2',
          hotpink: '#ff1493',
          blue: '#0066ff',
          amber: '#ffaa00',
          red: '#ff3366',
          green: '#00ff66',
          darkBevel: '#090d18',
          lightBevel: '#2e3d66',
          panel: '#0c1122',
          panelBorder: '#1c2744',
          panelHeader: '#121b33',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'Consolas', 'Courier New', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        'retro-out': 'inset 1px 1px 0px rgba(255, 255, 255, 0.2), inset -1px -1px 0px rgba(0, 0, 0, 0.8), 2px 2px 8px rgba(0, 0, 0, 0.7)',
        'retro-in': 'inset 1px 1px 0px rgba(0, 0, 0, 0.9), inset -1px -1px 0px rgba(255, 255, 255, 0.15)',
        'retro-cyan': '0 0 10px rgba(0, 240, 255, 0.4), inset 0 0 5px rgba(0, 240, 255, 0.2)',
        'retro-magenta': '0 0 10px rgba(255, 0, 127, 0.4), inset 0 0 5px rgba(255, 0, 127, 0.2)',
        'retro-purple': '0 0 10px rgba(178, 75, 243, 0.4), inset 0 0 5px rgba(178, 75, 243, 0.2)',
      },
      animation: {
        'glitch-pulse': 'glitchPulse 3s infinite',
        'flicker': 'screenFlicker 0.15s infinite',
        'scanline': 'scanlineScroll 8s linear infinite',
        'marquee': 'marquee 15s linear infinite',
      },
      keyframes: {
        glitchPulse: {
          '0%, 100%': { transform: 'translate(0)' },
          '2%': { transform: 'translate(-2px, 1px)' },
          '4%': { transform: 'translate(2px, -1px)' },
          '6%': { transform: 'translate(0)' },
          '48%': { transform: 'translate(0)' },
          '50%': { transform: 'translate(-1px, -2px)' },
          '52%': { transform: 'translate(1px, 2px)' },
          '54%': { transform: 'translate(0)' },
        },
        screenFlicker: {
          '0%': { opacity: '0.98' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.96' },
        },
        scanlineScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
    },
  },
  plugins: [],
}
