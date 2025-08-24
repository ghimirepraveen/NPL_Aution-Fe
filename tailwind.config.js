// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRed: "#DC143C",
        primaryBlue: "#003893",
        primaryWhite: "#FFFFFF",
        accentYellow: "#FFD700",
        accentGrey: "#E5E7EB",
      },
      fontFamily: {
        roboto: ["'Roboto'", "sans-serif"],
        SeaweedScript: ["'SeaweedScript'", "sans-serif"],

        // lato: ["'Lato'", "sans-serif"],
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
  },
  plugins: [],
};
