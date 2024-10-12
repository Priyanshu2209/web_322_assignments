module.exports = {
  content: [
    './views/**/*.html',  // Watch HTML files in the "views" folder
    './public/**/*.js',   // Watch JS files in the "public" folder
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['fantasy'],  // You can choose a different theme if you like
  },
}
