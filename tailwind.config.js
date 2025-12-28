/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['League Spartan', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: '#0f0f0f',
        fg: '#fafafa',
        accent: '#f43f5e',
        muted: '#71717a',
        card: '#1a1a1a',
      },
    },
  },
  plugins: [],
}


