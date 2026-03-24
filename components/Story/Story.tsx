"use client";

import { motion } from "framer-motion";

export default function Story() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Ambient radial glow */}
            <motion.div
                animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(212,175,55,0.07) 0%, transparent 65%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 space-y-5"
                >
                    {/* Top ornament */}
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-wedding-gold/50" />
                        <span className="text-wedding-gold/50 text-xs">✦</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-wedding-gold/50" />
                    </div>

                    <h2
                        className="font-amiri text-2xl md:text-4xl lg:text-5xl text-foreground/90 leading-snug max-w-2xl mx-auto"
                        dir="rtl"
                        style={{ textShadow: "0 0 40px rgba(212,175,55,0.12)" }}
                    >
                        احتفالنا من الغروب ٦:٣٠ حتى منتصف الليل ١٢:٠٠
                    </h2>

                    {/* Bottom ornament */}
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <div className="h-px w-10 bg-gradient-to-r from-transparent to-wedding-gold/30" />
                        <span className="text-wedding-gold/30 text-[10px]">◆</span>
                        <div className="h-px w-10 bg-gradient-to-l from-transparent to-wedding-gold/30" />
                    </div>
                </motion.div>

                {/* Guest Gathering Image — glassmorphic card */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-3xl mb-16 group"
                >
                    {/* Outer glow ring on hover */}
                    <div
                        className="relative rounded-xl overflow-hidden transition-shadow duration-700 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.18)]"
                        style={{
                            boxShadow: "0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.07)",
                            border: "1px solid rgba(212,175,55,0.2)",
                        }}
                    >
                        {/* Inner top-border highlight */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
                            style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)" }}
                        />

                        <div className="aspect-[16/9] overflow-hidden">
                            <motion.img
                                src="/Guest Gathering.png"
                                alt="Guest Gathering"
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            />
                        </div>

                        {/* Glass overlay at the bottom */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                            style={{
                                background: "linear-gradient(to top, rgba(10,8,5,0.5), transparent)",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Time Range — luxury watch display */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-6 md:gap-16"
                >
                    {/* Start time */}
                    <div className="text-center space-y-1">
                        <motion.span
                            className="font-amiri text-5xl md:text-7xl text-wedding-gold block watch-display"
                            style={{
                                textShadow: "0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)",
                            }}
                            animate={{ opacity: [0.85, 1, 0.85] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            ٦:٣٠ م
                        </motion.span>
                        <span className="font-amiri text-xs text-wedding-gold/40 tracking-[0.2em] block" dir="rtl">
                            الغروب
                        </span>
                    </div>

                    {/* Animated divider */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="h-px bg-gradient-to-r from-wedding-gold/20 to-wedding-gold/60"
                                animate={{ width: ["24px", "40px", "24px"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                    scale: [0.9, 1.2, 0.9],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-2 h-2 rounded-full bg-wedding-gold/80"
                                style={{ boxShadow: "0 0 8px rgba(212,175,55,0.6)" }}
                            />
                            <motion.div
                                className="h-px bg-gradient-to-l from-wedding-gold/20 to-wedding-gold/60"
                                animate={{ width: ["24px", "40px", "24px"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                            />
                        </div>
                        {/* Small decorative dots */}
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 h-1 rounded-full bg-wedding-gold/30"
                                    animate={{ opacity: [0.2, 0.7, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* End time */}
                    <div className="text-center space-y-1">
                        <motion.span
                            className="font-amiri text-5xl md:text-7xl text-wedding-gold block watch-display"
                            style={{
                                textShadow: "0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)",
                            }}
                            animate={{ opacity: [0.85, 1, 0.85] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        >
                            ١٢:٠٠ ص
                        </motion.span>
                        <span className="font-amiri text-xs text-wedding-gold/40 tracking-[0.2em] block" dir="rtl">
                            منتصف الليل
                        </span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
