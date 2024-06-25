/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      ArchitectsDaughter: ["Architects Daughter", "cursive"],
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-architects-daughter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      keyframes: {
        fly: {
          "50%": { transform: "rotate(20deg)" },
        },
      },
      animation: {
        fly: "fly 2s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
