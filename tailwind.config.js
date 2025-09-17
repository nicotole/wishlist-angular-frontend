/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans"', 'sans-serif'],
      },
      fontSize: {
        h1: ['22px', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      colors: {
        textPrimary: '#111518',
        textSecondary: '#637888',
        countdownBg: '#f0f3f4',
        btnPrimary: '#309be8',
        btnSecondary: '#f0f3f4',
      },
      letterSpacing: {
        title: '-0.015em',
      },
    },
  },
  plugins: [],
};
