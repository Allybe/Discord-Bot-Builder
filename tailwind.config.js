/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans-serif"]
      },
      colors: {
        "background": "#121212",
        "background-1": "#181818",
        "text-link": "#82BCFF",
        "green-button": "#66C661"
      }
    },
  },
  plugins: [],
};
