/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./dist/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                imperial: ['"Imperial Script"', 'cursive'],
            }
        },
    },
    plugins: [],
}
