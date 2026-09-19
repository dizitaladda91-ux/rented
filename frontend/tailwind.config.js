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
          red: "#EF4444",         // Lighter fresh vibrant red (red-500)
          "red-hover": "#DC2626", // Soft hover red (red-600)
          "red-light": "#FEF2F2", // Soft light red tint (red-50)
          "red-border": "#FECACA", // Light red border (red-200)
          "red-dark": "#DC2626",  // Rich red accent
          white: "#FFFFFF",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#64748B",
        },
        luxury: {
          dark: "#0F172A",
          emerald: "#EF4444",     // Lighter red compatibility
          accent: "#F87171",      // Light rose-red accent
          "accent-hover": "#EF4444",
          bronze: "#DC2626",
          cream: "#FFFFFF",
          card: "#FFFFFF",
          border: "rgba(239, 68, 68, 0.15)",
          muted: "#64748B",
        }
      },
      fontFamily: {
        serif: ["Outfit", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "red-gradient": "linear-gradient(135deg, #F87171 0%, #EF4444 50%, #DC2626 100%)",
        "gold-gradient": "linear-gradient(135deg, #F87171 0%, #EF4444 100%)",
        "dark-emerald": "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
        'red-glow': '0 0 25px rgba(239, 68, 68, 0.25)',
        'gold-glow': '0 0 25px rgba(239, 68, 68, 0.25)',
      }
    },
  },
  plugins: [],
}
