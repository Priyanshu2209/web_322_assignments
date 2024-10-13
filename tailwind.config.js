module.exports = {
  content: ['./views/**/*.html', './public/**/*.js'], // make sure Tailwind watches these files
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['fantasy'], // you can change the theme here
  },
};
