import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2d6a2d",
          "green-dark": "#234f23",
          "green-darker": "#1a3a1a",
          gold: "#f5a623",
          "gold-dark": "#e0951a",
          dark: "#1a1a1a",
          gray: "#f7f7f7",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
