/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#303841",
        tealAccent: "#76ABAE",
        lightGray: "#F5F5F5",
        orangeAccent: "#FF5722",
        lacivert: "#303841",
        mavi: "#76ABAE",
        acikGri: "#F5F5F5",
        koyuGri: "#303841",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(-100% - var(--marquee-gap, 3rem)))' },
        },
      },
    },
  },
  plugins: [],
}
