/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                spacemono: ['"Space Mono"', 'monospace'],
                worksans: ['"Work Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}