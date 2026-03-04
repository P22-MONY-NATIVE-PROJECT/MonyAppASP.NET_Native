/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#00D09E',
        'primary-light': '#F4FFF8',
        'primary-button-light': '#E5F9F0',
      },
      fontFamily: {
        'poppins-semibold': ['Poppins-SemiBold'],
        'spartan-regular': ['LeagueSpartan-Regular'],
        'spartan-semibold': ['LeagueSpartan-SemiBold'],
      },
    },
  },
  plugins: [],
}