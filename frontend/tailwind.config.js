/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Indigo (accent)
        secondary: "#8B5CF6", // Violet
        darkBg: "#0F172A", // Slate-900
        lightBg: "#F8FAFC", // Slate-50
        cardDark: "#1E293B",
        cardLight: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
