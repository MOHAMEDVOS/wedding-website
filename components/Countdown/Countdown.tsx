"use client";

import { useEffect, useState } from "react";
import Noise from "../ui/Noise";

const TIME_UNITS = [
    { key: "days",    label: "Days",   labelAr: "أيام"   },
    { key: "hours",   label: "Hours",  labelAr: "ساعات"  },
    { key: "minutes", label: "Mins",   labelAr: "دقائق"  },
    { key: "seconds", label: "Secs",   labelAr: "ثواني"  },
];

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date("2026-06-28T15:00:00");
        const tick = () => {
            const diff = targetDate.getTime() - Date.now();
            if (diff > 0) {
                setTimeLeft({
                    days:    Math.floor(diff / 86_400_000),
                    hours:   Math.floor((diff / 3_600_000) % 24),
                    minutes: Math.floor((diff / 60_000) % 60),
                    seconds: Math.floor((diff / 1_000) % 60),
                });
            }
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <Noise />

            {/* Moon glow from top */}
            <div className="absolute top-0 inset-x-0 h-72 bg-moon-glow pointer-events-none" />

            {/* Bottom emerald ambient */}
            <div className="aurora-blob absolute -bottom-12 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-wedding-emerald/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">

                {/* ── Section header ── */}
                <div className="mb-16 space-y-3">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-wedding-gold/40" />
                        <span className="text-wedding-gold/50 text-[10px] tracking-[0.35em] uppercase">
                            Counting Down To
                        </span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-wedding-gold/40" />
                    </div>

                    <span className="shimmer-text font-script text-5xl md:text-6xl block w-fit mx-auto">
                        The Big Day
                    </span>
                    <span className="shimmer-text font-arabic text-4xl block w-fit mx-auto">
                        يوم الزفاف
                    </span>
                    <p className="text-foreground/35 tracking-[0.25em] text-xs mt-5 uppercase">
                        June 28, 2026 · 3:00 PM · Cairo, Egypt
                    </p>
                </div>

                {/* ── Circular countdown rings ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {TIME_UNITS.map(({ key, label, labelAr }) => {
                        const value = timeLeft[key as keyof typeof timeLeft];
                        return (
                            <div key={key} className="flex flex-col items-center group">
                                {/* Ring stack */}
                                <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">

                                    {/* Outermost static ghost ring */}
                                    <div className="absolute inset-0 rounded-full border border-wedding-gold/10" />

                                    {/* Rotating conic-gradient ring */}
                                    <div
                                        className="absolute inset-0 rounded-full rotate-ring"
                                        style={{
                                            background: "conic-gradient(from 0deg, transparent 0%, rgba(196,149,106,0.55) 20%, transparent 40%, rgba(196,149,106,0.2) 70%, transparent 100%)",
                                            borderRadius: "50%",
                                        }}
                                    />

                                    {/* Static mid ring */}
                                    <div className="absolute inset-[3px] rounded-full border border-wedding-gold/20" />

                                    {/* Inner circle face */}
                                    <div
                                        className="absolute inset-[7px] rounded-full flex flex-col items-center justify-center glow-gold"
                                        style={{
                                            background: "radial-gradient(circle at 40% 35%, #2D1E14 0%, #1A0E06 100%)",
                                        }}
                                    >
                                        {/* Number */}
                                        <span
                                            className="shimmer-text font-serif text-4xl md:text-5xl font-light tabular-nums leading-none"
                                        >
                                            {String(value).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Hover glow pulse */}
                                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                        style={{ boxShadow: "0 0 50px rgba(196,149,106,0.25)" }}
                                    />
                                </div>

                                {/* Label */}
                                <div className="mt-4 space-y-1">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-wedding-gold/45 block">
                                        {label}
                                    </span>
                                    <span className="font-arabic text-base text-wedding-gold/35 block">
                                        {labelAr}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Footer ornament ── */}
                <div className="mt-20 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-4 opacity-40">
                        <div className="h-px w-16 bg-wedding-gold/50" />
                        <span className="text-wedding-gold text-xs">◆</span>
                        <div className="h-px w-16 bg-wedding-gold/50" />
                    </div>
                    <p className="text-foreground/35 text-xs tracking-[0.3em] uppercase">
                        See You There · نراكم هناك
                    </p>
                </div>
            </div>
        </section>
    );
}
