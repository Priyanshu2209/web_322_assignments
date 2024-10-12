module.exports = {
  content: [
    './views/**/*.html',
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwind.css/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ["fantasy"],  
  },
}