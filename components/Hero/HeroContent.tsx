"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// A single floating gold dust particle
function GoldParticle({ index }: { index: number }) {
    const drift = ((index % 7) - 3) * 18;
    const delay = (index * 0.37) % 4;
    const size = 2 + (index % 3);
    const left = 10 + (index * 13.7) % 80;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: "15%",
                background: `radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0) 70%)`,
                "--drift": `${drift}px`,
            } as React.CSSProperties}
            animate={{
                y: [-0, -110 - (index % 40)],
                x: [0, drift],
                opacity: [0, 0.85, 0.6, 0],
                scale: [0.5, 1, 0.7, 0],
            }}
            transition={{
                duration: 4 + (index % 3),
                repeat: Infinity,
                delay: delay,
                ease: "easeOut",
            }}
        />
    );
}

export default function HeroContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const particleCount = 14;

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none px-4"
        >
            {/* Floating gold dust particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: particleCount }).map((_, i) => (
                    <GoldParticle key={i} index={i} />
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                {/* Arabic label */}
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="font-arabic text-sm tracking-[0.25em] text-wedding-gold/70"
                    style={{ direction: "rtl" }}
                >
                    مرر لأسفل
                </motion.span>

                {/* Breathing vertical line */}
                <div className="relative w-[1px] h-16 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-wedding-gold/0 via-wedding-gold/80 to-wedding-gold/0"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    {/* Static background line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-gold/20 to-transparent" />
                </div>

                {/* Small chevron dot */}
                <motion.div
                    className="w-1 h-1 rounded-full bg-wedding-gold/60"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
}
