import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terminal: "#282828",
        polarblue: "#8AC9DC",
        darkblue: "#3774A0"
      },
    },
    fontFamily: { 
      titles: ['Inter', "sans"],
      monospace: ['Space Mono', "mono"]}
  },
  plugins: [],
} satisfies Config;
