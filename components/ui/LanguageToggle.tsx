"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/providers/language-context";

export default function LanguageToggle() {
    const { lang, toggle } = useLang();
    const isAr = lang === "ar";

    return (
        <motion.button
            onClick={toggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle language"
            className="absolute top-5 right-5 z-[60] flex items-center gap-2 px-4 py-2 rounded-full pointer-events-auto select-none"
            style={{
                background: "rgba(18, 10, 4, 0.65)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(212,175,55,0.25)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.35), 0 0 12px rgba(212,175,55,0.08)",
            }}
        >
            {/* Globe icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="rgba(212,175,55,0.75)" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>

            {/* Pill toggle track */}
            <div className="relative w-12 h-6 rounded-full"
                style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <motion.div
                    className="absolute top-0.5 w-5 h-5 rounded-full"
                    animate={{ left: isAr ? "2px" : "calc(100% - 22px)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ background: "linear-gradient(135deg, #d4af37, #f0d060)", boxShadow: "0 0 8px rgba(212,175,55,0.5)" }}
                />
            </div>

            {/* Label */}
            <span className="text-xs font-medium tracking-wider"
                style={{
                    color: "rgba(212,175,55,0.85)",
                    fontFamily: isAr ? "var(--font-amiri), serif" : "var(--font-milchella), serif",
                    minWidth: "24px",
                    textAlign: "center",
                }}>
                {isAr ? "ع" : "EN"}
            </span>
        </motion.button>
    );
}
