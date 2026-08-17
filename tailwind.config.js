/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    { pattern: /^(text|border|hover:border|hover:text|bg)-(cyan|yellow|green|purple|orange|red|blue)-(300|400|500)$/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
