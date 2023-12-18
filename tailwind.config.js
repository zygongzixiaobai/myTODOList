module.exports = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'check': "url('/image/check.png')",
        'delete':"url('/image/delete.png')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
