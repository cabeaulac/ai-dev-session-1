import type { Config } from "tailwindcss";

const config: Config = {
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
        primary: {
          50: "#e6f2ff",
          100: "#b3d9ff",
          200: "#80c0ff",
          300: "#4da7ff",
          400: "#1a8eff",
          500: "#0070f3",
          600: "#005bbf",
          700: "#00468c",
          800: "#003159",
          900: "#001c33",
        },
        accent: {
          50: "#e6f7ff",
          100: "#b3e5ff",
          200: "#80d4ff",
          300: "#4dc2ff",
          400: "#1ab1ff",
          500: "#0099e6",
          600: "#007ab3",
          700: "#005c80",
          800: "#003d4d",
          900: "#001f26",
        },
      },
    },
  },
  plugins: [],
};
export default config;
