/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B3538",      // primary dark teal
        inkdeep: "#082628",  // deeper teal for shadows/gradients
        signal: "#B3182A",   // crimson accent
        paper: "#EDEAE2",    // warm off-white section bg
        charcoal: "#1C1C1A", // body text on paper
        mist: "#7FA5A3",     // muted teal-grey secondary text
        flare: "#E8C468",    // warm glint accent, used sparingly
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
