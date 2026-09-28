import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f9f7',
          100: '#dff5ed',
          200: '#bfeadd',
          300: '#8ad5c4',
          400: '#58ba9b',
          500: '#2d9a7f',
          600: '#1f7b65',
          700: '#1d6554',
          800: '#1b4d42',
          900: '#183c35',
        },
        accent: {
          gold: '#d4a94d',
          slate: '#102b39',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(25, 55, 65, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
