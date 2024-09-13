/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        cc: {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      },
    },
  },
  plugins: [],
};
