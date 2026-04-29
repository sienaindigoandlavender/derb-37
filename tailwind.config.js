/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#faf6ec',
        'paper-soft': '#f4eedf',
        ink: '#0e0c08',
        body: '#1a1714',
        secondary: '#3a342a',
        muted: '#6b6356',
        light: '#bcb3a0',
        border: '#d6cbb4',
        link: '#0e0c08',
        rust: '#9a4a26',
        herb: '#5a6b3f',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sc: ['var(--font-sc)', 'Georgia', 'serif'],
      },
      maxWidth: {
        column: '720px',
      },
    },
  },
  plugins: [],
};
