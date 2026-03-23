"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparkDot {
    id: number;
    x: number;
    y: number;
}

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [sparks, setSparks] = useState<SparkDot[]>([]);
    const idRef = useRef(0);
    const throttleRef = useRef(0);

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothOptions = { damping: 22, stiffness: 320, mass: 0.5 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouse.x.set(e.clientX - 8);
            mouse.y.set(e.clientY - 8);

            // Throttle sparkle creation to ~10 per second
            const now = Date.now();
            if (now - throttleRef.current > 100) {
                throttleRef.current = now;
                const id = idRef.current++;
                setSparks(prev => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);
                setTimeout(() => {
                    setSparks(prev => prev.filter(s => s.id !== id));
                }, 700);
            }
        };

        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("mouseenter", onEnter);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mouseenter", onEnter);
        };
    }, [isVisible, mouse.x, mouse.y]);

    return (
        <>
            {/* Sparkle trail dots */}
            {sparks.map((s) => (
                <motion.div
                    key={s.id}
                    className="fixed pointer-events-none hidden md:block"
                    style={{ left: s.x - 3, top: s.y - 3, zIndex: 9997 }}
                    initial={{ opacity: 0.9, scale: 1.2, y: 0 }}
                    animate={{ opacity: 0, scale: 0, y: -14 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div
                        className="w-[6px] h-[6px] rounded-full bg-wedding-gold"
                        style={{ boxShadow: "0 0 8px #C4956A, 0 0 16px rgba(212,175,55,0.4)" }}
                    />
                </motion.div>
            ))}

            {/* Golden diamond cursor */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block",
                    !isVisible && "opacity-0"
                )}
                style={{
                    translateX: smoothMouse.x,
                    translateY: smoothMouse.y,
                    width: 16,
                    height: 16,
                    rotate: 45,
                    background: "linear-gradient(135deg, #E8C9A0 0%, #C4956A 50%, #6B4226 100%)",
                    boxShadow: "0 0 12px rgba(196,149,106,0.7), 0 0 24px rgba(196,149,106,0.3)",
                    transition: "opacity 0.2s",
                }}
            />
        </>
    );
}
