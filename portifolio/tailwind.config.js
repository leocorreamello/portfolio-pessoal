/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        ssm: '320px',
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      maxWidth: {
        '8xl': '90rem',
        '10xl': '110rem',
      },
      colors: {
        background: 'var(--bg-color-dark)',
        backgroundDeep: 'var(--bg-color-deep)',
        surface: 'var(--primary-color-dark)',
        surfaceSoft: 'var(--surface-soft)',
        surfaceMuted: 'var(--secondary-color-dark)',
        textMain: 'var(--text-color-dark)',
        textMuted: 'var(--text-color-muted)',
        textSoft: 'var(--text-color-soft)',
        accentStart: 'var(--accent-start)',
        accentEnd: 'var(--accent-end)',
        accentViolet: 'var(--accent-violet)',
        borderSoft: 'var(--border-color)',
      },
      boxShadow: {
        card: '0 14px 36px rgba(4, 8, 20, 0.45)',
        glow: '0 0 0 1px rgba(34, 211, 238, 0.2), 0 18px 50px rgba(8, 18, 48, 0.55)',
      },
      animation: {
        'button-hover': 'buttonHover 0.22s ease-out',
      },
      keyframes: {
        buttonHover: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}