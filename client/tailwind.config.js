module.exports = {

    content: [
    './src/**/*.{js,ts,jsx,tsx}', 
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            backgroundImage: {
                'radial-purple': 'radial-gradient(ellipse at center, #4e0a8e 0%, #1d043a 100%)',
            },
        },
    },

    plugins: [],

}
