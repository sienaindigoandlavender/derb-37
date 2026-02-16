/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        ink: '#222222',
        body: '#333333',
        secondary: '#555555',
        muted: '#888888',
        light: '#cccccc',
        border: '#ddd',
        link: '#222222',
        herb: { DEFAULT: '#5a7247', light: '#6d8a5a' },
        saffron: { DEFAULT: '#c9a04a' },
        clay: { DEFAULT: '#b8856e' },
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
