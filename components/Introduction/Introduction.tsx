"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function Introduction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Parallax transforms for depth
    const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const overlayY1 = useTransform(scrollYProgress, [0, 1], [-20, 80]);
    const overlayY2 = useTransform(scrollYProgress, [0, 1], [80, -20]);
    const rotateZ = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const rotateL1 = useTransform(rotateZ, (v) => v + 15);
    const rotateR1 = useTransform(rotateZ, (v) => -v - 15);
    const rotateL2 = useTransform(rotateZ, (v) => -v + 60);
    const rotateR2 = useTransform(rotateZ, (v) => v - 60);

    return (
        <section ref={containerRef} className="py-24 md:py-40 bg-background relative overflow-hidden">
            {/* Soft Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wedding-gold/5 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* === Hero Text Relocated Here === */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6"
                >
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-wedding-gold tracking-[0.2em] uppercase text-xs md:text-sm font-sans font-medium">
                            Cordially Invited to the Wedding of
                        </p>
                        <p className="text-wedding-gold font-arabic text-lg md:text-xl opacity-90">
                            نتشرف بدعوتكم لحضور حفل زفافنا
                        </p>
                    </div>

                    <h1 className="flex flex-col md:flex-row items-center justify-center font-serif text-5xl md:text-7xl lg:text-8xl text-foreground font-light tracking-tight leading-none md:gap-6">
                        <div className="flex flex-col items-center">
                            <span className="font-great-victorian text-6xl md:text-8xl bg-gold-lustre bg-clip-text text-transparent relative block z-10 animate-pulse-slow">
                                Mohamed
                            </span>
                            <span className="font-arabic text-3xl md:text-4xl text-wedding-gold/90 -mt-2">
                                محمد
                            </span>
                        </div>

                        <span className="text-xl md:text-3xl font-light italic text-wedding-gold/60 my-2 md:my-0 font-serif block md:inline-block">
                            &
                        </span>

                        <div className="flex flex-col items-center">
                            <span className="font-great-victorian text-6xl md:text-8xl bg-gold-lustre bg-clip-text text-transparent relative block z-10 animate-pulse-slow">
                                Aya
                            </span>
                            <span className="font-arabic text-3xl md:text-4xl text-wedding-gold/90 mt-2">
                                آية
                            </span>
                        </div>
                    </h1>

                    <div className="flex flex-col items-center gap-1 pt-4 opacity-70">
                        <span className="font-sans tracking-[0.2em] text-xs md:text-sm uppercase">June 28, 2026</span>
                        <span className="font-arabic text-base md:text-lg text-wedding-gold/90">٢٨ يونيو ٢٠٢٦</span>
                    </div>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">

                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[3/4] rounded-t-[10rem] overflow-hidden border border-wedding-gold/20 relative z-10">
                            <motion.img
                                src="/couple.jpg"
                                alt="Mohamed & Aya"
                                className="w-full h-full object-cover scale-110"
                                style={{ y: imageY }}
                            />

                            {/* === Floral Frame Overlays (High-end: flowers in, stems out) === */}
                            {/* Bottom Left */}
                            <motion.div
                                style={{ y: overlayY1, rotate: rotateL1 }}
                                className="absolute bottom-[-2%] left-[-5%] w-28 md:w-36 z-50 pointer-events-none origin-bottom-left"
                            >
                                <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                            </motion.div>

                            {/* Bottom Right */}
                            <motion.div
                                style={{ y: overlayY2, rotate: rotateR1 }}
                                className="absolute bottom-[-2%] right-[-5%] w-28 md:w-36 z-50 pointer-events-none scale-x-[-1] origin-bottom-right"
                            >
                                <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                            </motion.div>

                            {/* Top Left Shoulder */}
                            <motion.div
                                style={{ y: overlayY2, rotate: rotateL2 }}
                                className="absolute top-[12%] left-[-5%] w-24 md:w-32 z-50 pointer-events-none origin-center"
                            >
                                <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                            </motion.div>

                            {/* Top Right Shoulder */}
                            <motion.div
                                style={{ y: overlayY1, rotate: rotateR2 }}
                                className="absolute top-[12%] right-[-5%] w-24 md:w-32 z-50 pointer-events-none scale-x-[-1] origin-center"
                            >
                                <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                            </motion.div>
                        </div>
                        {/* Decorative Border */}
                        <div className="absolute top-4 left-4 w-full h-full border border-wedding-gold/30 rounded-t-[10rem] -z-0" />

                        {/* === Bird Animations (Confined) === */}
                        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden rounded-t-[10rem]">
                            {/* group 1: bird-intro1.gif (Left to Right) */}
                            {[
                                { delay: 0, top: 12, size: "w-24 md:w-20", opacity: "opacity-100", visibility: "block" }, // Close (Visible on mobile)
                                { delay: 3, top: 22, size: "w-12 md:w-10", opacity: "opacity-60", visibility: "hidden md:block" },    // Far (Hidden on mobile)
                                { delay: 6, top: 17, size: "w-16 md:w-14", opacity: "opacity-85", visibility: "hidden md:block" }   // Mid (Hidden on mobile)
                            ].map((bird, i) => (
                                <motion.img
                                    key={`bird1-${i}`}
                                    src="/bird-intro1.gif"
                                    alt=""
                                    className={`absolute ${bird.size} ${bird.opacity} ${bird.visibility} h-auto object-contain will-change-transform`}
                                    style={{ top: `${bird.top}%` }}
                                    initial={{ left: "-20%" }}
                                    animate={{ left: "110%" }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: bird.delay
                                    }}
                                />
                            ))}

                            {/* group 2: bird-intro2.gif (Right to Left) */}
                            {[
                                { delay: 1.5, top: 15, size: "w-18 md:w-14", opacity: "opacity-90", visibility: "hidden md:block" }, // Mid (Hidden on mobile)
                                { delay: 4.5, top: 25, size: "w-24 md:w-20", opacity: "opacity-100", visibility: "block" }, // Close (Visible on mobile)
                                { delay: 7.5, top: 20, size: "w-12 md:w-9", opacity: "opacity-50", visibility: "hidden md:block" }    // Far (Hidden on mobile)
                            ].map((bird, i) => (
                                <motion.img
                                    key={`bird2-${i}`}
                                    src="/bird-intro2.gif"
                                    alt=""
                                    className={`absolute ${bird.size} ${bird.opacity} ${bird.visibility} h-auto object-contain scale-x-[-1] will-change-transform`}
                                    style={{ top: `${bird.top}%` }}
                                    initial={{ right: "-20%" }}
                                    animate={{ right: "110%" }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: bird.delay
                                    }}
                                />
                            ))}

                            {/* === Cat Animations (Mixed behavior: Yoda moves, Poky sits) === */}
                            <div className="absolute bottom-[-2%] left-0 right-0 h-24 pointer-events-none">
                                {/* Poky Cat (Stationary center) */}
                                <div className="absolute inset-0 flex items-end justify-center">
                                    <img
                                        src="/poky.gif"
                                        alt="Poky Cat"
                                        className="w-20 md:w-32 h-auto object-contain"
                                    />
                                </div>
                                {/* Yoda Cat (Moving across) */}
                                <motion.img
                                    src="/yoda.gif"
                                    alt="Yoda Cat"
                                    className="absolute bottom-0 w-16 md:w-24 h-auto object-contain scale-x-[-1] will-change-transform"
                                    initial={{ left: "110%" }}
                                    animate={{ left: "-30%" }}
                                    transition={{
                                        duration: 12,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: 0
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <motion.div
                        style={{ y, opacity }}
                        className="w-full md:w-1/2 text-center md:text-left space-y-8"
                    >
                        <div className="space-y-8">
                            {/* First Paragraph (Removed) */}

                            {/* Second Paragraph - Enhanced */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="font-serif text-3xl md:text-5xl text-wedding-gold leading-tight">
                                        June 28, 2026
                                    </p>
                                    <p className="font-serif text-xl md:text-3xl leading-relaxed text-foreground/90 italic">
                                        The day we become one, surrounded by those we love.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-arabic text-3xl md:text-5xl text-wedding-gold leading-tight text-right" dir="rtl">
                                        ٢٨ يونيو ٢٠٢٦
                                    </p>
                                    <p className="font-arabic text-2xl md:text-3xl leading-relaxed text-foreground/90 text-right" dir="rtl">
                                        اليوم الذي نصبح فيه واحداً، محاطين بمن نحب.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <p className="font-script text-4xl md:text-6xl text-wedding-gold opacity-80">
                                With Love,
                            </p>
                            <p className="font-arabic text-3xl md:text-4xl text-wedding-gold opacity-80 text-right mt-2">
                                بكل الحب
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
