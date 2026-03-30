/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand palette ──────────────────────────
        cyan:  { DEFAULT: '#02dbda', dim: '#01a8a7', dark: '#017a79', glow: 'rgba(2,219,218,0.35)' },
        slate: { DEFAULT: '#222d37', light: '#2d3d4a', dark: '#161f27', border: 'rgba(34,45,55,0.8)' },
        // ── Pure blacks ────────────────────────────
        dark:  { 950: '#000000', 900: '#050a0e', 800: '#0a1118', 700: '#111a22', 600: '#182230' },
      },
      fontFamily: {
        racing: ['"Racing Sans One"', 'cursive'],
        sans:   ['Roboto', 'system-ui', 'sans-serif'],
        mono:   ['"Roboto Mono"', 'monospace'],
      },
      animation: {
        'spin-slow':  'spin 30s linear infinite',
        'spin-rev':   'spinRev 22s linear infinite',
        'float-1':    'float1 8s ease-in-out infinite',
        'float-2':    'float2 11s ease-in-out 1.5s infinite',
        'float-3':    'float3 13s ease-in-out 3s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'cube-spin':  'cubeSpin 20s ease-in-out infinite',
        'morph':      'morph 12s ease-in-out infinite',
        'shimmer':    'shimmerText 4s linear infinite',
        'twinkle':    'twinkle 3s ease-in-out infinite alternate',
        'orbit-1':    'orbit1 14s linear infinite',
        'orbit-2':    'orbit2 20s linear infinite',
      },
      keyframes: {
        spinRev:  { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        float1: {
          '0%,100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '33%':     { transform: 'translateY(-28px) translateX(12px) rotate(4deg)' },
          '66%':     { transform: 'translateY(-14px) translateX(-10px) rotate(-3deg)' },
        },
        float2: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%':     { transform: 'translateY(-35px) translateX(-18px)' },
        },
        float3: {
          '0%,100%': { transform: 'translateY(0) scale(1)' },
          '50%':     { transform: 'translateY(-22px) scale(1.06)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(2,219,218,0.4), 0 0 60px rgba(2,219,218,0.1)' },
          '50%':     { boxShadow: '0 0 50px rgba(2,219,218,0.9), 0 0 100px rgba(2,219,218,0.4), 0 0 160px rgba(2,219,218,0.15)' },
        },
        twinkle: {
          '0%':   { opacity: '0.3', transform: 'scale(0.8)' },
          '100%': { opacity: '1',   transform: 'scale(1.2)' },
        },
        orbit1: {
          from: { transform: 'rotate(0deg) translateX(160px) rotate(0deg)' },
          to:   { transform: 'rotate(360deg) translateX(160px) rotate(-360deg)' },
        },
        orbit2: {
          from: { transform: 'rotate(180deg) translateX(220px) rotate(-180deg)' },
          to:   { transform: 'rotate(540deg) translateX(220px) rotate(-540deg)' },
        },
        cubeSpin: {
          '0%':   { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '25%':  { transform: 'rotateX(90deg) rotateY(45deg) rotateZ(30deg)' },
          '50%':  { transform: 'rotateX(180deg) rotateY(90deg) rotateZ(60deg)' },
          '75%':  { transform: 'rotateX(270deg) rotateY(135deg) rotateZ(90deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(180deg) rotateZ(120deg)' },
        },
        morph: {
          '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%':     { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%':     { borderRadius: '50% 50% 20% 80% / 25% 80% 20% 75%' },
          '75%':     { borderRadius: '67% 33% 47% 53% / 37% 20% 80% 63%' },
        },
        shimmerText: {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '300% center' },
        },
      },
      boxShadow: {
        'neon':    '0 0 20px rgba(2,219,218,0.55), 0 0 60px rgba(2,219,218,0.25)',
        'neon-lg': '0 0 40px rgba(2,219,218,0.8),  0 0 80px rgba(2,219,218,0.35), 0 0 120px rgba(2,219,218,0.15)',
        'neon-sm': '0 0 10px rgba(2,219,218,0.5),  0 0 30px rgba(2,219,218,0.2)',
        'card':    '0 30px 60px -15px rgba(0,0,0,0.95), inset 0 1px 0 rgba(2,219,218,0.06)',
      },
      backgroundSize: { '200%': '200%', '300%': '300%' },
    },
  },
  plugins: [],
}
