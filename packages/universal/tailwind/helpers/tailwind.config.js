const { colors } = require('./colors')
const { MAX_CONTENT_WIDTH, MAX_HEADER_WIDTH } = require('./layout')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // @template Some custom tailwind configuration as examples
      maxWidth: {
        screen: '100vw',
        'screen-xl': `${MAX_CONTENT_WIDTH}px`,
        'screen-2xl': `${MAX_HEADER_WIDTH}px`,
        'screen-3xl': '1680px',
      },
      colors: {
        indigo: colors.indigo,
      },
    },
  },
}
