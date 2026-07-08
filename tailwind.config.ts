import type { Config } from "tailwindcss"; 

const config: Config = {
  content: [
   "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        success: "#FF0000"
      },
    },
  },
  plugins: [],
};

export default config;