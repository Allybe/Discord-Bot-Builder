/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["dist/web/**/*.html", "dist/web/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans-serif"]
      },
      colors: {
        "background": "#121212"
      }
    },
  },
  plugins: [],
};
