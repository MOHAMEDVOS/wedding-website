"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, useSpring, useTime, useMotionTemplate } from "framer-motion";
import { useState, useRef, useMemo, useEffect } from "react";

export default function ScrollFairy() {
    const { scrollYProgress } = useScroll();
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left

    // ------------------------------------------------------------------
    // FLIGHT PATH LOGIC
    // ------------------------------------------------------------------

    // 1. Wavy Horizontal Motion (Sine Wave)
    const xRaw = useTransform(scrollYProgress, [0, 1], [-1, 1]); // Raw -1 to 1
    const x = useSpring(useTransform(xRaw, (v) => {
        // Use Viewport Width (vw) units for responsiveness
        // Amplitude: 35vw (keeps it well within edges)
        return `${Math.sin(scrollYProgress.get() * Math.PI * 4) * 35}vw`;
    }), { stiffness: 60, damping: 20 });

    // 2. Vertical Motion (Bobbing handled by CSS/Framer separately)

    // 3. Rotation / Banking
    const rotate = useTransform(scrollYProgress, (v) => Math.cos(v * Math.PI * 4) * 15);

    // 4. Direction Flipping
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const velocity = Math.cos(latest * Math.PI * 4);
        if (velocity > 0.05) setDirection(1);
        if (velocity < -0.05) setDirection(-1);
    });

    // 5. Wing Flap Animation Loop
    const time = useTime();
    const wingRotate = useTransform(time, [0, 1000], [0, 360], { clamp: false });
    const flap = useTransform(wingRotate, (r) => Math.sin(r * 0.1) * 20); // Flap between -20 and 20 degrees

    // ------------------------------------------------------------------
    // SPARKLES LOGIC
    // ------------------------------------------------------------------
    const [sparkles, setSparkles] = useState<{ id: number; left: string; top: string; size: number; delay: number; duration: number; xOffset: number; yOffset: number; }[]>([]);

    useEffect(() => {
        const generatedSparkles = [...Array(20)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2, // 2px to 6px
            delay: Math.random() * 2,
            duration: Math.random() * 1 + 1,
            xOffset: Math.random() * 20 - 10,
            yOffset: Math.random() * -20 - 10, // Float up
        }));
        setSparkles(generatedSparkles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <motion.div
                style={{
                    x,
                    y: "40vh",
                    rotate,
                    scaleX: direction,
                }}
                className="absolute top-0 left-1/2 w-32 h-32 md:w-40 md:h-40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                {/* === CUSTOM CARTOON FAIRY (MATCHING USER IMAGE) === */}
                <div className="relative w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">

                        {/* WINGS (Back) - Teal with Yellow Border */}
                        <motion.g style={{ rotate: flap, originX: 0.5, originY: 0.5 }}>
                            {/* Top Right Wing */}
                            <path d="M110 90 Q 150 40, 180 60 Q 190 80, 160 100 Q 140 105, 110 95" fill="#4ECDC4" stroke="#FFD700" strokeWidth="3" />
                            {/* Bottom Right Wing */}
                            <path d="M115 105 Q 160 120, 150 150 Q 130 160, 110 130" fill="#4ECDC4" stroke="#FFD700" strokeWidth="3" />
                            {/* Top Left Wing */}
                            <path d="M90 90 Q 50 40, 20 60 Q 10 80, 40 100 Q 60 105, 90 95" fill="#4ECDC4" stroke="#FFD700" strokeWidth="3" />
                            {/* Bottom Left Wing */}
                            <path d="M85 105 Q 40 120, 50 150 Q 70 160, 90 130" fill="#4ECDC4" stroke="#FFD700" strokeWidth="3" />
                        </motion.g>

                        {/* BODY GROUP */}
                        <g transform="translate(100, 100)">

                            {/* Legs */}
                            <path d="M-5 15 L -8 40" stroke="#FFE0BD" strokeWidth="3" strokeLinecap="round" />
                            <path d="M5 15 L 8 40" stroke="#FFE0BD" strokeWidth="3" strokeLinecap="round" />
                            {/* Shoes */}
                            <ellipse cx="-9" cy="40" rx="4" ry="2" fill="#8B4513" />
                            <ellipse cx="9" cy="40" rx="4" ry="2" fill="#8B4513" />

                            {/* Dress - Yellow A-line */}
                            <path d="M-12 15 L -8 -5 L 8 -5 L 12 15 Q 0 20, -12 15 Z" fill="#FFD700" />
                            {/* Green Leaf Patterns on Dress */}
                            <path d="M-5 5 Q -2 8, 0 5 Q 2 8, 5 5" stroke="#4CAF50" strokeWidth="1.5" fill="none" />
                            <circle cx="0" cy="10" r="1.5" fill="#4CAF50" />

                            {/* Arms */}
                            <path d="M-8 -2 L -18 5" stroke="#FFE0BD" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M8 -2 L 18 0" stroke="#FFE0BD" strokeWidth="2.5" strokeLinecap="round" />

                            {/* Head */}
                            <circle cx="0" cy="-18" r="14" fill="#FFE0BD" />

                            {/* Face */}
                            <circle cx="-4" cy="-16" r="1.5" fill="black" /> {/* left eye */}
                            <circle cx="4" cy="-16" r="1.5" fill="black" /> {/* right eye */}
                            <path d="M-2 -12 Q 0 -10, 2 -12" stroke="black" strokeWidth="1" fill="none" /> {/* mouth */}
                            <circle cx="-10" cy="-16" r="2" fill="#FFB6C1" opacity="0.5" /> {/* blush */}
                            <circle cx="10" cy="-16" r="2" fill="#FFB6C1" opacity="0.5" /> {/* blush */}

                            {/* Hair - Brown, Ponytail */}
                            <path d="M-14 -18 Q 0 -35, 14 -18 Q 14 -10, 10 -5 L -10 -5 Q -14 -10, -14 -18" fill="#8B4513" /> {/* bangs */}
                            <circle cx="12" cy="-20" r="8" fill="#8B4513" /> {/* side ponytail/bun */}
                            <circle cx="16" cy="-25" r="3" fill="#FFD700" /> {/* hair tie */}

                        </g>

                        {/* WAND (In Right Hand) */}
                        <motion.g animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                            <line x1="118" y1="100" x2="125" y2="85" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                            {/* Star Tip */}
                            <polygon points="125,80 127,84 131,84 128,87 129,91 125,88 121,91 122,87 119,84 123,84" fill="#4CAF50" stroke="#FFD700" strokeWidth="1" />
                        </motion.g>

                    </svg>

                    {/* SPARKLES - Dynamic Cloud */}
                    <div className="absolute inset-0 pointer-events-none">
                        {sparkles.map((s) => (
                            <motion.div
                                key={s.id}
                                className="absolute rounded-full bg-wedding-gold"
                                style={{
                                    left: s.left,
                                    top: s.top,
                                    width: s.size,
                                    height: s.size,
                                    boxShadow: "0 0 6px #FFD700",
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    y: [0, s.yOffset],
                                    x: [0, s.xOffset],
                                }}
                                transition={{
                                    duration: s.duration,
                                    repeat: Infinity,
                                    delay: s.delay,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
