/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rented: {
          red: "#F87171",         // Soft coral-red
          "red-hover": "#EF4444", // Gentle hover red
          "red-light": "#FFF5F5", // Crisp light red-white tint
          "red-border": "#FECACA", // Light red border
          "red-soft": "#FED7D7",  // Delicate pastel red
          "red-dark": "#F87171",  // Light accent
          white: "#FFFFFF",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#64748B",
        },
        red: {
          50: "#FFF5F5",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FED7D7",
          400: "#FCA5A5",         // Soft light pastel red for all red-400 elements
          500: "#F87171",         // Soft coral red on hover/accents
          600: "#EF4444",         // Gentle accent
          700: "#F87171",
          800: "#EF4444",
          900: "#991B1B",
          950: "#450A0A",
        },
        luxury: {
          dark: "#0F172A",
          emerald: "#FCA5A5",     // Light soft red compatibility
          accent: "#FED7D7",      // Light rose-red accent
          "accent-hover": "#F87171",
          bronze: "#EF4444",
          cream: "#FFFFFF",
          card: "#FFFFFF",
          border: "rgba(252, 165, 165, 0.2)",
          muted: "#64748B",
        }
      },
      fontFamily: {
        serif: ["Outfit", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "red-gradient": "linear-gradient(135deg, #FED7D7 0%, #FCA5A5 50%, #F87171 100%)",
        "gold-gradient": "linear-gradient(135deg, #FED7D7 0%, #FCA5A5 100%)",
        "dark-emerald": "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
        'red-glow': '0 0 25px rgba(252, 165, 165, 0.3)',
        'gold-glow': '0 0 25px rgba(252, 165, 165, 0.3)',
      }
    },
  },
  plugins: [],
}
