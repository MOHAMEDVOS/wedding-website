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
                background: "#1E1008", // Deep Dark Brown
                foreground: "#F5E6D3", // Warm Beige
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "#C4956A", // Warm Bronze
                primary: {
                    DEFAULT: "#6B4226", // Rich Chocolate Brown
                    foreground: "#F5E6D3",
                },
                secondary: {
                    DEFAULT: "#C4956A", // Warm Bronze
                    foreground: "#1E1008",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "#2D1E14", // Lighter Dark Brown
                    foreground: "#A89080", // Dusty Brown
                },
                accent: {
                    DEFAULT: "#C4956A",
                    foreground: "#1E1008",
                },
                popover: {
                    DEFAULT: "#1E1008",
                    foreground: "#F5E6D3",
                },
                card: {
                    DEFAULT: "#1E1008",
                    foreground: "#F5E6D3",
                },
                wedding: {
                    navy: "#1E1008", // Deep Dark Brown (legacy)
                    emerald: "#6B4226", // Chocolate Brown
                    gold: "#C4956A", // Warm Bronze
                    ivory: "#F5E6D3", // Warm Beige
                    charcoal: "#F5E6D3", // Beige for text
                    clay: "#A0522D", // Sienna
                },
            },
            backgroundImage: {
                'olive-gradient': 'linear-gradient(to bottom, #2D1E14, #1A0E06)',
                'gold-lustre': 'linear-gradient(to right, #8B5E3C, #D4A574, #6B4226, #E8C9A0, #8B5E3C)',
                'copper-lustre': 'linear-gradient(to right, #A0522D, #C4956A, #A0522D)',
                'velvet-emerald': 'radial-gradient(circle at center, #3D2414 0%, #1E1008 100%)',
                'moon-glow': 'radial-gradient(ellipse at top center, rgba(196,149,106,0.18) 0%, transparent 65%)',
                'enchanted-vignette': 'radial-gradient(ellipse at center, transparent 40%, rgba(20,10,4,0.6) 100%)',
                'golden-aurora': 'linear-gradient(135deg, rgba(196,149,106,0.06) 0%, rgba(107,66,38,0.1) 50%, rgba(196,149,106,0.06) 100%)',
                'celestial': 'radial-gradient(ellipse at 50% 0%, rgba(196,149,106,0.12) 0%, transparent 60%)',
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
                "shimmer": "shimmer-gold 4s linear infinite",
                "twinkle": "twinkle 2.5s ease-in-out infinite",
                "glow-pulse": "glow-pulse 3.5s ease-in-out infinite",
                "rotate-ring": "rotate-ring 10s linear infinite",
                "spin-slow": "spin 12s linear infinite",
                "aurora": "aurora-drift 10s ease-in-out infinite",
                "float-sparkle": "float-sparkle 5s ease-in infinite",
            },
        },
    },
    plugins: [],
};
export default config;
