import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#1c261e", // Dark Olive
                foreground: "#F6F2EC", // Ivory
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "#D4AF37", // Gold Ring
                primary: {
                    DEFAULT: "#044d29", // Emerald
                    foreground: "#F6F2EC",
                },
                secondary: {
                    DEFAULT: "#D4AF37", // Gold
                    foreground: "#1c261e",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "#2d3828", // Lighter Olive
                    foreground: "#a3b19a", // Sage Grey
                },
                accent: {
                    DEFAULT: "#D4AF37",
                    foreground: "#1c261e",
                },
                popover: {
                    DEFAULT: "#1c261e",
                    foreground: "#F6F2EC",
                },
                card: {
                    DEFAULT: "#1c261e",
                    foreground: "#F6F2EC",
                },
                wedding: {
                    navy: "#1c261e", // Replaced Navy with Dark Olive for legacy compatibility
                    emerald: "#044d29",
                    gold: "#D4AF37",
                    ivory: "#F6F2EC",
                    charcoal: "#F6F2EC", // Replaced Charcoal with Ivory for text
                    clay: "#B45309",
                },
            },
            backgroundImage: {
                'olive-gradient': 'linear-gradient(to bottom, #2d3828, #1a2118)',
                'gold-lustre': 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
                'copper-lustre': 'linear-gradient(to right, #B45309, #d68a5c, #B45309)',
                'velvet-emerald': 'radial-gradient(circle at center, #0a3d24 0%, #1c261e 100%)',
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                serif: ["var(--font-cormorant)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
                script: ["var(--font-pinyon)", "cursive"],
                arabic: ["var(--font-amiri)", "serif"],
                "great-victorian": ["var(--font-great-victorian)", "serif"],
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};
export default config;
