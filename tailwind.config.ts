import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral1: "#F2F2F2",
        neutral2: "#161616",
        neutral3: "#353535",
        neutral4: "#757575",

        primary1: "#00E0FF",
      },

      fontFamily: {
        space_mono: ["var(--font-space-mono)", "sans-serif"],
        roboto_mono: ["var(--font-roboto-mono)", "sans-serif"],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
