/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#f0f8ff",
        "secondary": "#f5f5f5",
        'interbook': {
          '50': '#f1fcfb',
          '100': '#cef9f5',
          '200': '#9df2ec',
          '300': '#64e4e0',
          '400': '#33cccc',
          '500': '#1bafb1',
          '600': '#138a8e',
          '700': '#146c71',
          '800': '#15555a',
          '900': '#16474b',
          '950': '#06292d',
        },
      }
    },
  },
  plugins: [],
}

