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
        ink: '#222222',
        body: '#333333',
        secondary: '#555555',
        muted: '#888888',
        light: '#cccccc',
        border: '#dcd6c8',
        link: '#222222',
        rust: '#9a4a26',
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'Times', 'serif'],
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        column: '710px',
      },
    },
  },
  plugins: [],
};
