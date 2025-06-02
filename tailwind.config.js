/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        extend: {
      colors: {
        primary: {
          50: 'oklch(60.9% 0.126 221.723)',
          100: '#d9e7ff',
          200: '#bcd4ff',
          300: '#8ab5ff',
          400: '#578dff',
          500: '#3366ff',
          600: '#1e47f5',
          700: '#1535e0',
          800: '#172db5',
          900: '#192c8f',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      animation: {
        'expand': 'expand 0.3s ease-out forwards',
        'collapse': 'collapse 0.3s ease-out forwards',
      },
      keyframes: {
        expand: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '1000px', opacity: '1' },
        },
        collapse: {
          '0%': { maxHeight: '1000px', opacity: '1' },
          '100%': { maxHeight: '0', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}