/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Raleway"],
      },
      colors: {
        primary: "#292929",
        header: "#1C1C1C",
        body: "#0F0F0F",
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
