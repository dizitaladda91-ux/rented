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
          red: "#E5484D",         // Balanced Medium Red (soothing, never piercing)
          "red-hover": "#D9383E", // Richer hover red
          "red-light": "#FEF2F2", // Crisp light red-white tint
          "red-border": "#FECACA", // Gentle light red border
          "red-soft": "#FCA5A5",  // Soft red tint
          "red-dark": "#C62A2F",  // Deep accent
          white: "#FFFFFF",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#64748B",
        },
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#E5484D",         // Balanced Medium Red for buttons, accents, highlights
          500: "#D9383E",         // Hover & focus medium red
          600: "#C62A2F",         // Deep accent red
          700: "#B02026",
          800: "#8C181D",
          900: "#601216",
          950: "#38080A",
        },
        luxury: {
          dark: "#0F172A",
          emerald: "#E5484D",     // Medium red compatibility
          accent: "#FCA5A5",
          "accent-hover": "#D9383E",
          bronze: "#C62A2F",
          cream: "#FFFFFF",
          card: "#FFFFFF",
          border: "rgba(229, 72, 77, 0.15)",
          muted: "#64748B",
        }
      },
      fontFamily: {
        serif: ["Outfit", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "red-gradient": "linear-gradient(135deg, #FCA5A5 0%, #E5484D 50%, #D9383E 100%)",
        "gold-gradient": "linear-gradient(135deg, #EB6868 0%, #E5484D 100%)",
        "dark-emerald": "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
        'red-glow': '0 0 25px rgba(229, 72, 77, 0.25)',
        'gold-glow': '0 0 25px rgba(229, 72, 77, 0.25)',
      }
    },
  },
  plugins: [],
}
