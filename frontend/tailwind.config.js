const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    defaultTheme,
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'slide-y': 'height 0.4s linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
