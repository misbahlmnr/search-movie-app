/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope"],
      },
      colors: {
        primary: "#423F71",
        header: "#292841",
        body: "#1C1B29",
      },
      screens: {
        mobile: {
          max: "768px",
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/line-clamp"),
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar"),
  ],
};
