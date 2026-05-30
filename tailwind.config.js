/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#353535",
                background: "#F4F1DE",
                danger: "#D44E28",
            },
            fontFamily: {
                shantell: ['"Shantell Sans"', "sans"],
            },
        },
    },
    plugins: [],
};
