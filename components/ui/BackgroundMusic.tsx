"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!audioRef.current) return;
            if (document.hidden) {
                audioRef.current.pause();
            } else if (isPlaying && !isMuted) {
                audioRef.current.play().catch(() => {});
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isPlaying, isMuted]);

    const startMusic = () => {
        setIsOpening(true);

        // Start music after a short delay for the flap animation
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().catch((err) => {
                    console.error("Audio playback failed:", err);
                });
                setIsPlaying(true);
            }
        }, 500);

        // Fade out the whole overlay after the animation completes
        setTimeout(() => {
            setShowOverlay(false);
        }, 1500);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/HOW.mp3"
                loop
                preload="auto"
            />

            {/* Envelope Overlay */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-wedding-navy flex-col text-center px-6 overflow-hidden"
                    >
                        {/* Ambient Background */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/royal-frame.png')] bg-center bg-no-repeat bg-contain scale-125" />

                        <motion.div
                            animate={isOpening ? { y: 100, scale: 0.9, opacity: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="relative"
                        >

                            {/* Envelope Container */}
                            <div
                                className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px] cursor-pointer group"
                                onClick={!isOpening ? startMusic : undefined}
                            >
                                {/* Envelope Body */}
                                <div className="absolute inset-0 bg-[#2a3b2a] border-2 border-wedding-gold/30 rounded-lg shadow-2xl overflow-hidden">
                                    {/* Inner Content Preview */}
                                    <div className="absolute inset-4 border border-wedding-gold/10 rounded flex flex-col items-center justify-center">
                                        <div className="w-1/2 h-0.5 bg-wedding-gold/20 mb-2" />
                                        <div className="w-1/3 h-0.5 bg-wedding-gold/20" />
                                    </div>

                                    {/* Decorative Lines */}
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-wedding-gold/5 to-transparent" />
                                </div>

                                {/* Envelope Flap */}
                                <motion.div
                                    initial={{ rotateX: 0 }}
                                    animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    style={{ transformOrigin: "top" }}
                                    className="absolute inset-0 z-20"
                                >
                                    <div className="w-full h-full bg-[#1e2f1e] border-2 border-wedding-gold/40 rounded-lg shadow-xl"
                                        style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)" }} />
                                </motion.div>

                                {/* Wax Seal */}
                                {!isOpening && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                                    >
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-wedding-gold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center border-4 border-[#2a3b2a] transition-transform duration-300">
                                            <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#2a3b2a] fill-current" />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Instruction Text */}
                                {!isOpening && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="absolute -bottom-16 left-0 w-full text-wedding-gold/60 font-cormorant tracking-[0.2em] uppercase text-xs animate-pulse"
                                    >
                                        اضغط على الختم لفتح
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Control Button */}
            {!showOverlay && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 py-4"
                >
                    <AnimatePresence>
                        {isPlaying && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-wedding-navy/80 backdrop-blur-md border border-wedding-gold/30 text-wedding-ivory px-4 py-2 rounded-full text-xs tracking-widest uppercase flex items-center gap-2"
                            >
                                <div className="flex gap-1 h-3 items-end pb-1">
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                height: isMuted ? 2 : [2, 10, 2],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.1,
                                                ease: "easeInOut",
                                            }}
                                            className="w-0.5 bg-wedding-gold rounded-full"
                                        />
                                    ))}
                                </div>
                                الموسيقى تعزف
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={toggleMute}
                        className="group relative w-12 h-12 bg-wedding-navy border border-wedding-gold/50 rounded-full flex items-center justify-center text-wedding-gold hover:bg-wedding-navy/90 hover:border-wedding-gold transition-all duration-300 shadow-lg shadow-black/20 overflow-hidden"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                        ) : (
                            <Volume2 className="w-5 h-5" />
                        )}
                        <div className="absolute inset-0 bg-wedding-gold/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                    </button>
                </motion.div>
            )}
        </>
    );
}
