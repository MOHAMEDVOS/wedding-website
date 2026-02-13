"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BirdProps {
    id: number;
    direction: "left" | "right";
    top: number;
    delay: number;
    duration: number;
    scale: number;
}

export default function FlyingBirds() {
    const [birds, setBirds] = useState<BirdProps[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile
        const mobileCheck = window.innerWidth < 768;
        setIsMobile(mobileCheck);

        // Generate random birds
        const birdCount = 5;
        const newBirds: BirdProps[] = Array.from({ length: birdCount }, (_, i) => ({
            id: i,
            direction: Math.random() > 0.5 ? "left" : "right",
            top: 10 + Math.random() * 60, // Top 10% to 70% of screen
            delay: Math.random() * 20,
            duration: mobileCheck
                ? 7 + Math.random() * 5   // Mobile: 7-12s (faster relative speed)
                : 20 + Math.random() * 15, // Desktop: 20-35s (slow cinematic)
            scale: mobileCheck
                ? 0.3 + Math.random() * 0.3 // Mobile: smaller birds
                : 0.5 + Math.random() * 0.5, // Desktop: larger
        }));
        setBirds(newBirds);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {birds.map((bird) => (
                <Bird key={bird.id} {...bird} isMobile={isMobile} />
            ))}
        </div>
    );
}

function Bird({ direction, top, delay, duration, scale, isMobile }: BirdProps & { isMobile: boolean }) {
    const isLeft = direction === "left";

    return (
        <motion.div
            initial={{
                x: isLeft ? "-20vw" : "120vw",
                y: 0,
                opacity: 0,
            }}
            animate={{
                x: isLeft ? "120vw" : "-20vw",
                y: [0, -20, 0, 20, 0], // Slight wave motion
                opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
                x: {
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    ease: "linear",
                },
                y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                opacity: {
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    times: [0, 0.05, 0.8, 0.95, 1],
                },
            }}
            style={{
                top: `${top}%`,
                scale: scale,
                scaleX: isLeft ? 1 : -1, // Flip for right-to-left
            }}
            className={`absolute ${isMobile ? 'w-12 h-12' : 'w-24 h-24'}`}
        >
            {/* Dove GIF */}
            <img
                src="/dove.gif"
                alt="Flying dove"
                className="w-full h-full object-contain opacity-80"
            />
        </motion.div>
    );
}
