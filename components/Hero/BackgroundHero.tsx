"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import FlyingBirds from "../ui/FlyingBirds";

export default function BackgroundHero() {
    const [timestamp, setTimestamp] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setTimestamp(new Date().getTime());

        // Attempt to play on load
        const playVideo = () => {
            const video = document.getElementById('hero-video') as HTMLVideoElement;
            if (video) {
                video.play().catch(e => console.log("Autoplay blocked:", e));
            }
        };
        playVideo();

        // Fallback: Play on first touch/click
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
                transition={{ duration: 2, ease: "easeOut" }}
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
                            style="object-fit: cover; width: 100%; height: 100%; opacity: 0.6; mix-blend-mode: normal; filter: blur(4px);"
                        >
                            <source src="/gif.mp4?v=${timestamp}" type="video/mp4" />
                        </video>
                    `}}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Light Ivory Overlay */}
                <div className="absolute inset-0 bg-wedding-ivory/30" />
            </motion.div>

            {/* Flying Birds (Doves) */}
            <FlyingBirds />

            {/* Golden aurora glow — top celestial light */}
            <div className="absolute top-0 inset-x-0 h-64 bg-moon-glow pointer-events-none z-[5]" />

            {/* Enchanted vignette — darkens edges for depth */}
            <div className="absolute inset-0 bg-enchanted-vignette pointer-events-none z-[5]" />

            {/* Pulsing orb — golden ambient light centre */}
            <div
                className="aurora-blob absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-[4]"
                style={{
                    background: "radial-gradient(circle at center, rgba(196,149,106,0.08) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Subtle Gradient Fade for Transition */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />
        </div>
    );
}
