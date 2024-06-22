import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        mine: "0px 0px 8px #dfdfdf",
        upperBar: "1.5px 2px 6px #dfdfdf",
      },
      backgroundColor: {
        dark: "#202936",
        darkOffset: "#ffffff2a",
      },
      borderColor: {
        dark: "#81a5d8",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
export default config;
