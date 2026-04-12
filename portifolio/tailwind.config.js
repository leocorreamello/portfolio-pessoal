/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        surface: 'var(--primary-color-dark)',
        surfaceMuted: 'var(--secondary-color-dark)',
        textMain: 'var(--text-color-dark)',
        accentStart: 'var(--accent-start)',
        accentEnd: 'var(--accent-end)',
      },
      animation: {
        'button-hover': 'buttonHover 0.3s ease-in-out',
      },
      keyframes: {
        buttonHover: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}