import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Weather-specific colors
        sun: "hsl(var(--sun-color))",
        moon: "hsl(var(--moon-color))",
        rain: "hsl(var(--rain-color))",
        snow: "hsl(var(--snow-color))",
        cloud: "hsl(var(--cloud-color))",
        lightning: "hsl(var(--lightning-color))",
        // AQI colors
        aqi: {
          good: "hsl(var(--aqi-good))",
          moderate: "hsl(var(--aqi-moderate))",
          sensitive: "hsl(var(--aqi-sensitive))",
          unhealthy: "hsl(var(--aqi-unhealthy))",
          "very-unhealthy": "hsl(var(--aqi-very-unhealthy))",
          hazardous: "hsl(var(--aqi-hazardous))",
        },
        // UV colors
        uv: {
          low: "hsl(var(--uv-low))",
          moderate: "hsl(var(--uv-moderate))",
          high: "hsl(var(--uv-high))",
          "very-high": "hsl(var(--uv-very-high))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        glass: "0 8px 32px hsl(var(--glass-shadow)), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
        "glass-lg": "0 20px 50px hsl(var(--glass-shadow)), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
        glow: "0 0 40px hsl(var(--primary) / 0.4)",
        "glow-sm": "0 0 20px hsl(var(--primary) / 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
