module.exports = {
  content: ["./views/**/*.html", "./public/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ["fantasy"], // Or any other theme you prefer
  },
}
