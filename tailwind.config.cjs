/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3FEF54',
        secondary: '#9AECCE',
        tertiary: '#5CEF79',
        quarternary: '#78EA9C',
      },
    },
  },
  plugins: [],
};
