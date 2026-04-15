/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2bee6c",
        primaryDark: "#25c95b",

        background: "#f6f8f6",
        surface: "#ffffff",
        border: "#e5e7eb",

        textPrimary: "#111827",
        textSecondary: "#6b7280",
        textInverse: "#ffffff",

        black: "#000000",
        white: "#ffffff",

        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",
      },
    },
  },
  plugins: [],
};
