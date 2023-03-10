/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3765f7",
        text: "#2e2a29",
      },
      fontFamily: {
        jet: ["'JetBrains Mono'", "monospace"],
        merry: ["'Merriweather'", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
