/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography"

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media",
  plugins: [typography],
}

export default config
