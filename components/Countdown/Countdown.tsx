"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTimeLeft() {
    const target = new Date("2026-06-28T15:00:00").getTime();
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1_000) % 60),
    };
}

const units = [
    { key: "days",    label: "أيام"   },
    { key: "hours",   label: "ساعات"  },
    { key: "minutes", label: "دقائق"  },
    { key: "seconds", label: "ثواني"  },
];

export default function Countdown() {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setTime(getTimeLeft());
        const id = setInterval(() => setTime(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="py-32 bg-background relative overflow-hidden">

            {/* Ambient glow */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 65%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px w-20" style={{ background: "linear-gradient(to left, rgba(212,175,55,0.5), transparent)" }} />
                        <span className="text-wedding-gold/50 text-sm">✦</span>
                        <div className="h-px w-20" style={{ background: "linear-gradient(to right, rgba(212,175,55,0.5), transparent)" }} />
                    </div>

                    <h2 className="font-arabic text-5xl md:text-7xl text-foreground mb-4"
                        style={{ textShadow: "0 0 40px rgba(212,175,55,0.25)" }}>
                        يوم الزفاف
                    </h2>
                    <p className="font-arabic text-sm text-foreground/40 tracking-widest">
                        القاهرة، مصر
                    </p>
                </motion.div>

                {/* Countdown rings */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {units.map(({ key, label }, i) => {
                        const val = String(time[key as keyof typeof time]).padStart(2, "0");
                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-center gap-5"
                            >
                                {/* Ring */}
                                <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">

                                    {/* Outer static ring */}
                                    <div className="absolute inset-0 rounded-full"
                                        style={{ border: "1px solid rgba(212,175,55,0.15)" }} />

                                    {/* Spinning shimmer ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            background: "conic-gradient(from 0deg, transparent 0%, rgba(212,175,55,0.6) 25%, transparent 50%)",
                                            borderRadius: "50%",
                                        }}
                                    />

                                    {/* Inner face */}
                                    <div
                                        className="absolute inset-[4px] rounded-full flex items-center justify-center"
                                        style={{
                                            background: "radial-gradient(circle at 40% 35%, #1a0e06 0%, #0d0704 100%)",
                                            border: "1px solid rgba(212,175,55,0.1)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: "'Courier New', Courier, monospace",
                                                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                                                fontWeight: 300,
                                                color: "#d4af37",
                                                letterSpacing: "0.08em",
                                                direction: "ltr",
                                                unicodeBidi: "isolate" as any,
                                                textShadow: "0 0 20px rgba(212,175,55,0.5)",
                                            }}
                                        >
                                            {val}
                                        </span>
                                    </div>

                                    {/* Pulse glow */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full pointer-events-none"
                                        animate={{ opacity: [0.1, 0.25, 0.1] }}
                                        transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                                        style={{
                                            boxShadow: "0 0 30px rgba(212,175,55,0.2)",
                                        }}
                                    />
                                </div>

                                {/* Label */}
                                <span className="font-arabic text-sm text-wedding-gold/50 tracking-wide">
                                    {label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="mt-20 flex flex-col items-center gap-3"
                >
                    <div className="flex items-center gap-4 opacity-30">
                        <div className="h-px w-16 bg-wedding-gold" />
                        <span className="text-wedding-gold text-xs">◆</span>
                        <div className="h-px w-16 bg-wedding-gold" />
                    </div>
                    <p className="font-arabic text-xs text-foreground/30 tracking-widest mt-1">نراكم هناك</p>
                </motion.div>

            </div>
        </section>
    );
}
