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
      spacing: {
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        20: '5rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        24: '6rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      fontSize: {
        'display-2xl': [
          '4.5rem',
          {
            letterSpacing: '-0.09rem',
            lineHeight: '5.625rem',
          },
        ],
        'display-xl': [
          '3.75rem',
          {
            letterSpacing: '-0.05625rem',
            lineHeight: '4.5rem',
          },
        ],
        'display-lg': [
          '3rem',
          {
            letterSpacing: '-0.06rem',
            lineHeight: '3.75rem',
          },
        ],
        'display-md': [
          '2.25rem',
          {
            letterSpacing: '-0.045rem',
            lineHeight: '2.75rem',
          },
        ],
        'display-sm': ['1.875rem', '2.375rem'],
        'display-xs': ['1.5rem', '2rem'],
        xl: ['1.25rem', '1.875rem'],
        lg: ['1.125rem', '1.75rem'],
        md: ['1rem', '1.5rem'],
        sm: ['0.875rem', '1.25rem'],
        xs: ['0.75rem', '1.125rem'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      container: {
        center: true,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        '4xl': '1920px',
        '3xl': '1600px',
        hd: '1440px',
        dt: '1024px',
        tb: '768px',
        sm: '640px',
      },
      boxShadow: {
        '3xl': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        '4xl': '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
      },
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
} satisfies Config;
