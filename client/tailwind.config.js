module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{jsx,js,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
};