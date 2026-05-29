/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — change here to re-theme the whole site
        brand: {
          50: '#e7f6f7',
          100: '#c2e8ea',
          200: '#8fd5d9',
          300: '#54bdc3',
          400: '#27a3aa',
          500: '#0e8a92',
          600: '#0a6f76',
          700: '#0a585e',
          800: '#0b474c',
          900: '#0c3c40',
        },
      },
      fontFamily: {
        sans: ['Heebo', 'Rubik', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
