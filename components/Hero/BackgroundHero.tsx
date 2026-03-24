"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FlyingBirds from "../ui/FlyingBirds";

// Twinkling star dot
function Star({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                background: "rgba(212,175,55,0.85)",
                boxShadow: `0 0 ${size * 2}px rgba(212,175,55,0.5)`,
            }}
            animate={{
                opacity: [0.15, 0.9, 0.15],
                scale: [0.8, 1.3, 0.8],
            }}
            transition={{
                duration: 2.5 + delay,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
            }}
        />
    );
}

const STARS = Array.from({ length: 28 }, (_, i) => ({
    x: (i * 37.3 + 5) % 98,
    y: (i * 23.7 + 3) % 65,
    size: 1 + (i % 2),
    delay: (i * 0.41) % 3,
}));

export default function BackgroundHero() {
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        setTimestamp(new Date().getTime());

        const playVideo = () => {
            const video = document.getElementById('hero-video') as HTMLVideoElement;
            if (video) {
                video.play().catch(e => console.log("Autoplay blocked:", e));
            }
        };
        playVideo();

        const handleInteraction = () => {
            playVideo();
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('click', handleInteraction);
        };

        window.addEventListener('touchstart', handleInteraction);
        window.addEventListener('click', handleInteraction);

        return () => {
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('click', handleInteraction);
        };
    }, []);

    return (
        <div className="absolute inset-0 h-[100dvh] w-full overflow-hidden bg-wedding-ivory">
            {/* Background Video Layer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center bg-wedding-ivory"
            >
                <div
                    dangerouslySetInnerHTML={{
                        __html: `
                        <video
                            id="hero-video"
                            autoplay
                            loop
                            muted
                            playsinline
                            webkit-playsinline
                            style="object-fit: cover; width: 100%; height: 100%; opacity: 0.55; mix-blend-mode: normal; filter: blur(3px);"
                        >
                            <source src="/gif.mp4?v=${timestamp}" type="video/mp4" />
                        </video>
                    `}}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Deep darkening overlay for cinematic feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

                {/* Warm gold overlay tint */}
                <div className="absolute inset-0 bg-wedding-ivory/25" />
            </motion.div>

            {/* Starfield — gold dust stars */}
            <div className="absolute inset-0 pointer-events-none z-[3]">
                {STARS.map((s, i) => (
                    <Star key={i} {...s} />
                ))}
            </div>

            {/* Flying Birds (Doves) */}
            <FlyingBirds />

            {/* Golden aurora glow — top celestial light */}
            <div className="absolute top-0 inset-x-0 h-64 bg-moon-glow pointer-events-none z-[5]" />

            {/* Side ambient glows */}
            <motion.div
                animate={{ opacity: [0.12, 0.25, 0.12] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-1/3 w-72 h-72 rounded-full pointer-events-none z-[4]"
                style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <motion.div
                animate={{ opacity: [0.1, 0.22, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute right-0 top-1/2 w-72 h-72 rounded-full pointer-events-none z-[4]"
                style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Enchanted vignette — darkens edges for depth */}
            <div className="absolute inset-0 bg-enchanted-vignette pointer-events-none z-[5]" />

            {/* Pulsing orb — golden ambient light centre */}
            <motion.div
                animate={{ opacity: [0.06, 0.14, 0.06], scale: [1, 1.12, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-[4]"
                style={{
                    background: "radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 65%)",
                    filter: "blur(50px)",
                }}
            />

            {/* Subtle Gradient Fade for Transition */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
        </div>
    );
}
