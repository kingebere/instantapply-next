/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",

    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-halfcream":
          "linear-gradient(to bottom, #f7f7f8 30% , white 30%)",
        "gradient-bitwhite": "linear-gradient(to top, #f7f7f8 78% , white 30%)",
      },
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
        },
        "instant-600": "#006aff",
        "instant-light-100": "#f7f7f8",
        "instant-light-200": "#f7f7f8",
        "instant-text": "#223140",
        "instant-textgrey": "#737678",
        "instant-textdark": "#00214f",
      },
      fontFamily: {
        silka: ["Silka", "cursive"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
