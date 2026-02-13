"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface Petal {
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    rotation: number;
}

export default function FallingPetals() {
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Transform velocity into additional movement/rotation
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityValue = useTransform(smoothVelocity, [-2000, 0, 2000], [-30, 0, 30]);

    // Generate static petal data on mount to avoid hydration mismatch
    const petals = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage
            delay: Math.random() * 10,
            duration: 25 + Math.random() * 30,
            size: 4 + Math.random() * 10,
            rotation: Math.random() * 360,
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {petals.map((petal) => (
                <PetalItem
                    key={petal.id}
                    petal={petal}
                    velocityValue={velocityValue}
                />
            ))}
        </div>
    );
}

function PetalItem({ petal, velocityValue }: { petal: Petal; velocityValue: any }) {
    // Additional vertical drift based on scroll velocity
    const drift = useTransform(velocityValue, (v: number) => v * (petal.size / 5));

    return (
        <motion.div
            initial={{ y: "-10%", x: `${petal.x}%`, opacity: 0, rotate: petal.rotation }}
            animate={{
                y: "110%",
                x: [`${petal.x}%`, `${petal.x + (Math.random() * 10 - 5)}%`, `${petal.x}%`],
                opacity: [0, 0.6, 0.6, 0],
                rotate: petal.rotation + 360
            }}
            transition={{
                duration: petal.duration,
                repeat: Infinity,
                delay: petal.delay,
                ease: "linear",
            }}
            style={{
                position: "absolute",
                width: petal.size,
                height: petal.size,
                y: drift, // Reactive drift
            }}
        >
            {/* Simple golden petal/sparkle shape */}
            <div
                className="w-full h-full rounded-full bg-gradient-to-br from-wedding-gold/40 to-wedding-gold/10 blur-[1px]"
                style={{
                    borderRadius: "60% 40% 70% 30% / 40% 50% 60% 70%" // Organic shape
                }}
            />
        </motion.div>
    );
}
