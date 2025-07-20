/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // App Router pages
    "./pages/**/*.{js,ts,jsx,tsx}",     // Page Router (if used)
    "./components/**/*.{js,ts,jsx,tsx}", // Your components
    "./src/**/*.{js,ts,jsx,tsx}",       // If you use a src directory
  ],
    theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo
        accent: '#F97316',  // Orange
        background: '#F1F5F9', // Light gray
        textDark: '#1E293B', // Slate
        textLight: '#64748B', // Gray
      },
      fontFamily: {
        fancy: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
