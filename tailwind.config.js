/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            animation: {
                typing: 'typing 3s steps(30) forwards',
                blink: 'blink .7s step-end infinite'
            },
            keyframes: {
                typing: {
                    '0%': { width: '0' },
                    '100%': { width: '100%' }
                },
                blink: {
                    '50%': { borderColor: 'transparent' }
                }
            }
        }
    },
    plugins: []
}