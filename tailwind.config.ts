import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#6B46C1',
          600: '#525CEB',
          700: '#2B3CE4',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
