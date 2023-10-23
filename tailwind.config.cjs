/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        'primary-light': 'hsl(var(--color-primary-light) / <alpha-value>)',
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        black: 'hsl(var(--color-black) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
