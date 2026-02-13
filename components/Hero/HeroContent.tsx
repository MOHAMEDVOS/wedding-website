"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function HeroContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-wedding-clay/60 font-light">Scroll Down</span>
                <span className="font-arabic text-sm text-wedding-clay/60">مرر لأسفل</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-wedding-clay to-transparent animate-pulse-slow" />
            </motion.div>
        </div>
    );
}
