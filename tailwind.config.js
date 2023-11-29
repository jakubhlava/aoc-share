/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      "aoc-text": "#cccccc",
      "aoc-emph": "#ffffff",
      "aoc-gold": "#ffff66",
      "aoc-silver": "#9999cc",
      "aoc-link": "#009900",
      "aoc-link-focus": "#99ff99",
      "aoc-link-highlight": "#00cc00",
      "aoc-background": "#0f0f23",
    },
    extend: {
      dropShadow: {
        aoc: "0 0 5px rgba(255, 255, 255)",
      },
    },
  },
  plugins: [],
};
