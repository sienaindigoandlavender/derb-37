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
        ink: '#0a0a0a',
        body: '#141414',
        secondary: '#3a3a3a',
        muted: '#5a5a5a',
        light: '#bcbcbc',
        border: '#e3ddd0',
        link: '#0a0a0a',
        rust: '#9a4a26',
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'Times', 'serif'],
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        column: '690px',
      },
    },
  },
  plugins: [],
};
