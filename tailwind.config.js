/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#faf9f5',
        'paper-soft': '#f3f1ea',
        ink: '#1f1d1a',
        'ink-soft': '#3a3631',
        secondary: '#6a6359',
        rule: '#cfc6b6',
        herb: '#5a6b3f',
        rust: '#9a4a26',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sc: ['var(--font-sc)', 'serif'],
      },
      maxWidth: {
        column: '620px',
      },
    },
  },
  plugins: [],
};
