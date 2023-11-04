/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './dist/*.html',
    './src/*.js'
  ],
  theme: {
    extend: {
      colors: {
        "test": "#f2b452" //bg-test for example
      },
    },
  },
  plugins: [],
}

