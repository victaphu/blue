/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{html,js,tsx}',
        './components/**/*.{html,js,tsx}',
        './common/**.*.{html,js,tsx}',
    ],
    theme: {
        typography: (theme) => ({}),
        extend: {},
    },
    daisyui: {
        themes: ["light", "cmyk"],
    },
    plugins: [require("daisyui"), require('@tailwindcss/typography')],
    darkMode: 'class',

}