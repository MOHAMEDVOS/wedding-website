"use client";

import { useEffect, useState } from "react";
import Noise from "../ui/Noise";

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date("2026-06-28T15:00:00"); // 3:00 PM Wedding start

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-32 bg-wedding-olive text-wedding-parchment relative overflow-hidden">
            <Noise />
            <div className="container mx-auto px-6 relative z-10 text-center">

                <div className="mb-16 space-y-4">
                    <span className="font-script text-5xl bg-gold-lustre bg-clip-text text-transparent block mb-2 w-fit mx-auto">The Big Day</span>
                    <span className="font-arabic text-4xl bg-gold-lustre bg-clip-text text-transparent block w-fit mx-auto">يوم الزفاف</span>
                    <h2 className="font-serif text-3xl text-white/80">June 28, 2026</h2>
                    <h2 className="font-arabic text-2xl text-white/80">٢٨ يونيو ٢٠٢٦</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {/* Days */}
                    <div className="bg-white/5 border border-wedding-clay/20 p-8 md:p-12 rounded-sm backdrop-blur-sm relative group overflow-hidden">
                        <div className="absolute inset-0 bg-wedding-clay/0 group-hover:bg-wedding-clay/5 transition-colors duration-500" />
                        <span className="font-serif text-5xl md:text-7xl block mb-2 text-wedding-clay">{timeLeft.days}</span>
                        <div className="flex flex-col gap-1 border-t border-wedding-clay/20 pt-4 mt-4">
                            <span className="text-xs uppercase tracking-[0.2em] opacity-60">Days</span>
                            <span className="font-arabic text-lg opacity-60">أيام</span>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="bg-white/5 border border-wedding-clay/20 p-8 md:p-12 rounded-sm backdrop-blur-sm relative group overflow-hidden">
                        <div className="absolute inset-0 bg-wedding-clay/0 group-hover:bg-wedding-clay/5 transition-colors duration-500" />
                        <span className="font-serif text-5xl md:text-7xl block mb-2 text-wedding-clay">{timeLeft.hours}</span>
                        <div className="flex flex-col gap-1 border-t border-wedding-clay/20 pt-4 mt-4">
                            <span className="text-xs uppercase tracking-[0.2em] opacity-60">Hours</span>
                            <span className="font-arabic text-lg opacity-60">ساعات</span>
                        </div>
                    </div>

                    {/* Minutes */}
                    <div className="bg-white/5 border border-wedding-clay/20 p-8 md:p-12 rounded-sm backdrop-blur-sm relative group overflow-hidden">
                        <div className="absolute inset-0 bg-wedding-clay/0 group-hover:bg-wedding-clay/5 transition-colors duration-500" />
                        <span className="font-serif text-5xl md:text-7xl block mb-2 text-wedding-clay">{timeLeft.minutes}</span>
                        <div className="flex flex-col gap-1 border-t border-wedding-clay/20 pt-4 mt-4">
                            <span className="text-xs uppercase tracking-[0.2em] opacity-60">Mins</span>
                            <span className="font-arabic text-lg opacity-60">دقائق</span>
                        </div>
                    </div>

                    {/* Seconds */}
                    <div className="bg-white/5 border border-wedding-clay/20 p-8 md:p-12 rounded-sm backdrop-blur-sm relative group overflow-hidden">
                        <div className="absolute inset-0 bg-wedding-clay/0 group-hover:bg-wedding-clay/5 transition-colors duration-500" />
                        <span className="font-serif text-5xl md:text-7xl block mb-2 text-wedding-clay">{timeLeft.seconds}</span>
                        <div className="flex flex-col gap-1 border-t border-wedding-clay/20 pt-4 mt-4">
                            <span className="text-xs uppercase tracking-[0.2em] opacity-60">Secs</span>
                            <span className="font-arabic text-lg opacity-60">ثواني</span>
                        </div>
                    </div>
                </div>

                <div className="mt-16 opacity-60 text-sm md:text-base tracking-widest font-light">
                    SEE YOU THERE / نراكم هناك
                </div>
            </div>
        </section>
    );
}
