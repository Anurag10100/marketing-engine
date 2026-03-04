import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        // Backgrounds
        "bg-primary": "#080F1A",
        "bg-surface": "#0D1B2A",
        "bg-elevated": "#0A1628",
        // Borders
        "border-default": "#152336",
        "border-active": "#1E3A5F",
        // Text
        "text-primary": "#E2E8F0",
        "text-secondary": "#94A3B8",
        "text-muted": "#64748B",
        "text-disabled": "#2D4A6A",
        // Accents
        accent: {
          DEFAULT: "#F59E0B",
          hover: "#FBBF24",
        },
        success: "#10B981",
        info: "#0969B4",
        danger: "#EF4444",
      },
      borderRadius: {
        DEFAULT: "6px",
        card: "8px",
        chip: "4px",
      },
      maxWidth: {
        content: "1200px",
      },
      width: {
        sidebar: "220px",
      },
      animation: {
        "fade-in-down": "fadeInDown 300ms ease-out",
        "pulse-amber": "pulseAmber 2s ease-in-out infinite",
        "green-flash": "greenFlash 2s ease-out",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseAmber: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        greenFlash: {
          "0%": { backgroundColor: "rgba(16, 185, 129, 0.3)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
