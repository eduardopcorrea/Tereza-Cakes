import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosa: "#D4A5A5",
        creme: "#FAF3EC",
        chocolate: "#4A2C2A",
        "rosa-escuro": "#B98383",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(74, 44, 42, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
