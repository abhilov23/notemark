/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}', './src/renderer/src/assets/**/*.{css}'],
  theme: {
    extend: {
      fontFamily:{
                mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],

      }
    },
  },
  plugins: [typography],
}