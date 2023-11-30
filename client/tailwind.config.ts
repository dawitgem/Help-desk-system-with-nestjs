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
      keyframes: {
        reveal: {
          "0%": {
            transform: "scaleX(0)",
            transformOrigin: "100% 50%",
            opacity: "0",
          },
          "100%": {
            transform: "scaleX(1)",
            transformOrigin: "100% 50%",
            opacity: "1",
          },
        },
        topToPlace: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        reveal: "reveal 0.2s ease-out",
        toptoplace: "topToPlace 0.1s ease-in",
      },
    },
  },

  plugins: [],
};
export default config;
