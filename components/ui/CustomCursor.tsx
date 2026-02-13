"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorSize = 15;

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouse.x.set(e.clientX - cursorSize / 2);
            mouse.y.set(e.clientY - cursorSize / 2);
        };

        const manageMouseLeave = () => setIsVisible(false);
        const manageMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", manageMouseMove);
        window.addEventListener("mouseleave", manageMouseLeave);
        window.addEventListener("mouseenter", manageMouseEnter);

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener("mouseleave", manageMouseLeave);
            window.removeEventListener("mouseenter", manageMouseEnter);
        };
    }, [isVisible, mouse.x, mouse.y]);

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-[15px] h-[15px] bg-wedding-clay rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block",
                !isVisible && "opacity-0"
            )}
            style={{
                translateX: smoothMouse.x,
                translateY: smoothMouse.y,
            }}
        />
    );
}
