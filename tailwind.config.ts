import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xxs: "0.625rem", // 10px
        tiny: "0.7rem",  // Between xs and sm
        '2.5xl': "1.75rem", // Between 2xl and 3xl
      },
    },
  },
  plugins: [],
} satisfies Config;
