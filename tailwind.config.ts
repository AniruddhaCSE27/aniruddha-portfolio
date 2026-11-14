import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0D10",
        paper: "#F4F1EA",
        champagne: "#C6A66B",
        slate: "#7A808A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        halo: "0 0 0 1px rgba(198,166,107,.24), 0 24px 80px rgba(0,0,0,.24)",
      },
    },
  },
  plugins: [],
};

export default config;
