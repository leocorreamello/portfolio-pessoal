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
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontSize: {
        'h1-ssm': '1.5rem', // 320px
        'h1-sm': '2rem',    // 640px
        'h1-md': '2.5rem',  // 768px
        'h1-lg': '3rem',    // 1024px
        'h1-xl': '3.5rem',  // 1280px
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