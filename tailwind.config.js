/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#191919",
        darkText: "#D4D4D4",
        darkTextSecondary: "#838383",
        darkBgSecondary: "#5A5A5A",
        sidebarBg: "#202020",
      },
    },
  },
  plugins: [],
};
