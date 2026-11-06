/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "system-ui", "sans-serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      colors: {
        board: {
          light: "#f0d9b5",
          dark: "#b58863",
        },
        mentor: {
          sky: "#7dd3fc",
          mint: "#6ee7b7",
          sun: "#fcd34d",
          coral: "#fda4af",
          grape: "#c4b5fd",
        },
      },
    },
  },
  plugins: [],
};
