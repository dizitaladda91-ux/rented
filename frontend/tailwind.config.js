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
          red: "#DC2626",         // Primary vibrant red
          "red-hover": "#B91C1C", // Darker red on hover
          "red-light": "#FEE2E2", // Soft red background badge
          "red-dark": "#991B1B",  // Deep wine crimson
          white: "#FFFFFF",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#64748B",
        },
        luxury: {
          dark: "#0F172A",
          emerald: "#DC2626",     // Map old emerald to red for compatibility
          accent: "#EF4444",      // Map old gold accent to bright red
          "accent-hover": "#DC2626",
          bronze: "#991B1B",
          cream: "#FFFFFF",
          card: "#FFFFFF",
          border: "rgba(220, 38, 38, 0.15)",
          muted: "#64748B",
        }
      },
      fontFamily: {
        serif: ["Outfit", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "red-gradient": "linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)",
        "gold-gradient": "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
        "dark-emerald": "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
        'red-glow': '0 0 25px rgba(220, 38, 38, 0.25)',
        'gold-glow': '0 0 25px rgba(220, 38, 38, 0.25)',
      }
    },
  },
  plugins: [],
}
