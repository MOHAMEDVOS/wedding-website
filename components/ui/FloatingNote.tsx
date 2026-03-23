"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Send } from "lucide-react";

export default function FloatingNote() {
    const [isOpen, setIsOpen] = useState(false);
    const [song, setSong] = useState("");
    const [name, setName] = useState("");

    // Golden Sparkles Logic (Matching ScrollFairy)
    const [sparkles, setSparkles] = useState<{ id: number; left: string; top: string; size: number; delay: number; duration: number; xOffset: number; yOffset: number; }[]>([]);

    useEffect(() => {
        const generatedSparkles = [...Array(40)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2, // 2px to 6px
            delay: Math.random() * 2,
            duration: Math.random() * 1.5 + 1.5, // 1.5s to 3s
            xOffset: Math.random() * 30 - 15,
            yOffset: Math.random() * -30 - 15, // Float up more
        }));
        setSparkles(generatedSparkles);
    }, []);

    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!song.trim() || sending) return;

        setSending(true);
        try {
            const res = await fetch("/api/songs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ song: song.trim(), name: name.trim() || "Anonymous" }),
            });
            if (res.ok) {
                setSent(true);
                setSong("");
                setName("");
                setTimeout(() => {
                    setIsOpen(false);
                    setSent(false);
                }, 1500);
            }
        } catch {
            // silently fail
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            {/* Floating Pile Button with AMPLIFIED Wind Sway */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -12, 0], // Vertical floating
                    x: [0, 8, -8, 0], // Pronounced Horizontal wind drift
                    rotate: [0, 5, -5, 0] // More visible wind rotation
                }}
                transition={{
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                className="fixed bottom-8 right-8 z-[100] cursor-pointer group"
                onClick={() => setIsOpen(true)}
            >
                {/* Pile Image with shadow */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
                    <Image
                        src="/pile.png"
                        alt="Paper Pile"
                        fill
                        className="object-contain transition-transform group-hover:brightness-110"
                    />

                    {/* SPARKLES (Matching ScrollFairy) */}
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
                                    boxShadow: "0 0 10px #FFD700, 0 0 5px #FFA500",
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

                {/* Optional "Click Me" label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: -5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-wedding-navy/80 text-wedding-gold px-3 py-1 rounded-full text-xs font-scripalt tracking-widest uppercase pointer-events-none whitespace-nowrap border border-wedding-gold/30"
                >
                    Song Request
                </motion.div>
            </motion.div>

            {/* Note Unfolding Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-wedding-navy/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Medieval Scroll Wrapper */}
                        <div className="relative w-[95%] max-w-sm md:max-w-md flex flex-col items-center">

                            {/* Wooden Top Rod */}
                            <div className="w-[110%] h-[18px] bg-gradient-to-b from-[#7a4e2d] via-[#5a3a21] to-[#7a4e2d] rounded-full shadow-[inset_0_0_6px_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.5)] z-30 relative -mb-[9px]" />

                            {/* Unrolling Scroll Container */}
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: "auto",
                                    opacity: 1,
                                    transition: { duration: 1.5, ease: [0.33, 1, 0.68, 1] }
                                }}
                                exit={{ height: 0, opacity: 0, transition: { duration: 0.8 } }}
                                className="w-full overflow-hidden shadow-2xl origin-top"
                                style={{
                                    background: `
                                        radial-gradient(circle at 20% 20%, rgba(0,0,0,0.05) 0%, transparent 40%),
                                        radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0%, transparent 50%),
                                        #f5e6c8
                                    `,
                                    borderLeft: "4px solid #d2b48c",
                                    borderRight: "4px solid #d2b48c",
                                    boxShadow: "inset 0 0 25px rgba(0,0,0,0.15)"
                                }}
                            >
                                {/* AMPLIFIED Continuous Wind Flutter Effect */}
                                <motion.div
                                    animate={{
                                        rotateX: [0, 1.5, -1.5, 0],
                                        rotateY: [0, 2.5, -2.5, 0],
                                        skewX: [0, 0.8, -0.8, 0]
                                    }}
                                    transition={{
                                        duration: 4.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative w-full"
                                >
                                    {/* Paper Content */}
                                    <div className="relative w-full py-16 px-8 md:px-12 flex flex-col items-center">
                                        {/* Subtle Parchment Texture Layer */}
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]" />

                                        {/* Secret Note Image as background texture (extremely subtle) */}
                                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                                            <Image
                                                src="/note.png"
                                                alt=""
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Form Content */}
                                        <div className="relative z-10 w-full flex flex-col items-center">
                                            {sent ? (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="flex flex-col items-center space-y-4 py-8"
                                                >
                                                    <span className="text-4xl">✨</span>
                                                    <p className="font-scripalt text-[#4b2e1f] text-xl italic">Thank you!</p>
                                                    <p className="font-amiri text-[#4b2e1f] text-lg">!شكراً ليك</p>
                                                </motion.div>
                                            ) : (
                                            <>
                                            {/* Form Body */}
                                            <form
                                                onSubmit={handleSend}
                                                className="flex flex-col items-center justify-center w-full space-y-8 md:space-y-10"
                                            >
                                                <div className="space-y-4 text-center">
                                                    <h3 className="font-scripalt text-[#4b2e1f] text-xl md:text-3xl leading-relaxed italic font-medium">
                                                        What song will make you jump out of your seat?
                                                    </h3>
                                                    <h3 className="font-amiri text-[#4b2e1f] text-xl md:text-2xl leading-relaxed font-bold">
                                                        إيه الأغنية اللي هتخليك تقوم من مكانك؟
                                                    </h3>
                                                </div>

                                                <div className="w-full max-w-[260px] space-y-6 flex flex-col items-center">
                                                    <div className="w-full relative">
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder="Your name... / اسمك..."
                                                            className="w-full bg-transparent border-b-2 border-[#4b2e1f]/20 focus:border-[#4b2e1f]/40 outline-none text-[#4b2e1f] font-scripalt text-lg py-2 px-1 text-center transition-colors placeholder:text-[#4b2e1f]/30 italic"
                                                            disabled={sending}
                                                        />
                                                    </div>
                                                    <div className="w-full relative">
                                                        <input
                                                            type="text"
                                                            value={song}
                                                            onChange={(e) => setSong(e.target.value)}
                                                            placeholder="Your song... / أغنيتك المفضلة..."
                                                            className="w-full bg-transparent border-b-2 border-[#4b2e1f]/20 focus:border-[#4b2e1f]/40 outline-none text-[#4b2e1f] font-scripalt text-xl py-2 px-1 text-center transition-colors placeholder:text-[#4b2e1f]/30 italic"
                                                            required
                                                            disabled={sending}
                                                        />
                                                    </div>

                                                    {/* Wax Seal Submit Button */}
                                                    <button
                                                        type="submit"
                                                        disabled={sending}
                                                        className="relative group transition-transform hover:scale-105 active:scale-95 mb-4 disabled:opacity-60"
                                                    >
                                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <span className="font-scripalt text-[#4b2e1f]/60 text-xs italic tracking-widest uppercase">
                                                                {sending ? "Sending..." : "Seal Your Answer"}
                                                            </span>
                                                        </div>

                                                        {/* Wax Seal Shape */}
                                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#8b1a1a] rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.5),inset_0_-4px_8px_rgba(0,0,0,0.4),inset_0_4px_8px_rgba(255,255,255,0.1)] flex items-center justify-center border-2 border-[#6d1313] relative overflow-hidden">
                                                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
                                                            <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 border-2 border-[#bd3a3a]/40 rounded-full flex items-center justify-center">
                                                                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#bd3a3a]/20 rounded-full flex items-center justify-center" />
                                                            </div>
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <span className="text-[#6d1313]/60 font-serif text-4xl md:text-5xl select-none">M</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Footer Decorative Line */}
                                            <div className="w-32 h-[1px] bg-[#4b2e1f]/10 mt-12" />
                                            </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Wooden Bottom Rod */}
                            <div className="w-[110%] h-[18px] bg-gradient-to-t from-[#7a4e2d] via-[#5a3a21] to-[#7a4e2d] rounded-full shadow-[inset_0_0_6px_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.5)] z-30 relative -mt-[9px]" />
                        </div>
                    </div>
                )}
            </AnimatePresence >
        </>
    );
}
