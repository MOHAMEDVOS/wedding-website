"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const groomColors = ["#c9b87a", "#b8a55e", "#a08840"];
const brideColors  = ["#3d1a0e", "#4a2518", "#2e1710"];

export default function DressCode() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(107,58,42,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-24 md:w-40" style={{ background: "linear-gradient(to left, rgba(212,175,55,0.5), transparent)" }} />
                        <span className="text-wedding-gold/60">✦</span>
                        <div className="h-px w-24 md:w-40" style={{ background: "linear-gradient(to right, rgba(212,175,55,0.5), transparent)" }} />
                    </div>
                    <h2 className="font-arabic text-5xl md:text-7xl text-foreground mb-3"
                        style={{ textShadow: "0 0 40px rgba(212,175,55,0.2)" }}>
                        كود اللبس
                    </h2>
                    <p className="font-arabic text-lg text-wedding-gold/60">الألوان المقترحة للضيوف</p>
                </motion.div>

                {/* Two columns */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

                    {/* GROOM */}
                    <motion.div
                        className="flex flex-col items-center gap-10 w-full md:w-[42%]"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.h3
                            className="font-arabic text-2xl md:text-3xl text-wedding-gold/80"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            الرجال
                        </motion.h3>

                        {/* Color dots */}
                        <motion.div
                            className="flex items-center gap-5"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            {groomColors.map((c, i) => (
                                <motion.div
                                    key={c}
                                    className="rounded-full"
                                    style={{
                                        backgroundColor: c,
                                        width: i === 1 ? 56 : 44,
                                        height: i === 1 ? 56 : 44,
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Divider */}
                    <div className="hidden md:flex flex-col items-center self-stretch justify-center gap-2 opacity-25">
                        <div className="flex-1 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.6), transparent)" }} />
                        <span className="text-wedding-gold text-xl">✦</span>
                        <div className="flex-1 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.6), transparent)" }} />
                    </div>

                    {/* BRIDE */}
                    <motion.div
                        className="flex flex-col items-center gap-10 w-full md:w-[42%]"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.h3
                            className="font-arabic text-2xl md:text-3xl text-wedding-gold/80"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            السيدات
                        </motion.h3>

                        {/* Color dots */}
                        <motion.div
                            className="flex items-center gap-5"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            {brideColors.map((c, i) => (
                                <motion.div
                                    key={c}
                                    className="rounded-full"
                                    style={{
                                        backgroundColor: c,
                                        width: i === 1 ? 56 : 44,
                                        height: i === 1 ? 56 : 44,
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
