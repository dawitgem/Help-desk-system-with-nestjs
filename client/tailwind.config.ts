import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./api/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "100px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        reveal: "opacity-1 duration-150 transition-opacity ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
