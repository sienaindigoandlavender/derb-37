/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff',
        'paper-soft': '#f7f6f4',
        ink: '#0a0a0a',
        body: '#171717',
        secondary: '#1a1a1a',
        muted: '#2a2a2a',
        light: '#a8a5a0',
        border: '#e6e3dd',
        link: '#0a0a0a',
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
