/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                boodoo: {
                    dark: '#0a0000',
                    card: '#150000',
                    red: '#d82323',
                    text: '#f5f5f5',
                    muted: '#a39b9b',
                    border: '#2a0a0a'
                }
            },
            boxShadow: {
                card: "0px 10px 30px -10px rgba(0,0,0,0.5)",
            },
            screens: {
                xs: "450px",
            },
        },
    },
    plugins: [],
}
