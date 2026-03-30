"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { animate, stagger } from "animejs";

// Corner ornament SVG — delicate gold filigree
function CornerOrnament({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 60 60"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 2 L2 22 M2 2 L22 2"
                stroke="rgba(212,175,55,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M2 12 Q12 2 22 12"
                stroke="rgba(212,175,55,0.35)"
                strokeWidth="0.75"
                fill="none"
            />
            <circle cx="2" cy="2" r="2" fill="rgba(212,175,55,0.7)" />
            <circle cx="12" cy="7" r="1" fill="rgba(212,175,55,0.4)" />
        </svg>
    );
}

// Staggered text reveal line by line
const storyLines = [
    { text: "الأحد ٢٨ يونيو ٢٠٢٦", isDate: true },
    { text: "اليوم الذي نصبح فيه واحداً، محاطين بمن نحب.", isDate: false },
];

export default function Introduction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const hasRevealed = useRef(false);

    // Anime.js reveal — fires once when section enters viewport (clouds finish parting)
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasRevealed.current) {
                    hasRevealed.current = true;

                    // Gold ornament lines grow outward
                    animate(".intro-separator", {
                        scaleX: [0, 1],
                        opacity: [0, 1],
                        duration: 1200,
                        ease: "cubicBezier(0.16, 1, 0.3, 1)",
                        delay: stagger(150, { start: 200 }),
                    });

                    // Invitation tagline floats up with blur
                    animate(".intro-tagline", {
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 1400,
                        ease: "cubicBezier(0.16, 1, 0.3, 1)",
                        delay: 300,
                    });

                    // Names cascade in with spring
                    animate(".intro-name", {
                        opacity: [0, 1],
                        translateY: [80, 0],
                        scale: [0.82, 1],
                        duration: 1800,
                        ease: "spring(1, 68, 10, 0)",
                        delay: stagger(260, { start: 550 }),
                    });

                    // Ampersand spins in
                    animate(".intro-ampersand", {
                        opacity: [0, 1],
                        rotate: [-30, 0],
                        scale: [0.4, 1],
                        duration: 1000,
                        ease: "spring(1, 55, 12, 0)",
                        delay: 750,
                    });

                    // Story lines reveal with stagger + blur
                    animate(".intro-story-line", {
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 1100,
                        ease: "cubicBezier(0.16, 1, 0.3, 1)",
                        delay: stagger(180, { start: 1000 }),
                    });

                    // Couple photo scales up from slightly below
                    animate(".intro-photo", {
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        translateY: [40, 0],
                        duration: 1600,
                        ease: "cubicBezier(0.16, 1, 0.3, 1)",
                        delay: 900,
                    });
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0]);
    const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-50, 50]);
    const overlayY1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-20, 80]);
    const overlayY2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -20]);
    const rotateZ = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-5, 5]);
    const rotateL1 = useTransform(rotateZ, (v) => v + 15);
    const rotateR1 = useTransform(rotateZ, (v) => -v - 15);
    const rotateL2 = useTransform(rotateZ, (v) => -v + 60);
    const rotateR2 = useTransform(rotateZ, (v) => v - 60);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.18,
            },
        },
    };

    const lineVariants = {
        hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as any },
        },
    };

    return (
        <section ref={containerRef} className="py-24 md:py-40 bg-background relative overflow-hidden">
            {/* Radial ambient glow — centre */}
            <motion.div
                animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.03) 40%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Side accent glows */}
            <div
                className="absolute top-1/4 left-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />
            <div
                className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* === Header: Invitation + Names + Date === */}
                <div className="text-center mb-20 md:mb-28 space-y-6 md:space-y-8">

                    {/* Gold ornamental rule above — anime.js controlled */}
                    <div
                        className="intro-separator section-separator max-w-xs mx-auto mb-8"
                        style={{ opacity: 0, willChange: "transform, opacity" }}
                    />

                    {/* Invitation line */}
                    <p
                        className="intro-tagline font-arabic text-lg md:text-xl text-wedding-gold/80 tracking-wide"
                        dir="rtl"
                        style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                        نتشرف بدعوتكم لحضور حفل زفافنا
                    </p>

                    {/* Names — monumental with shimmer */}
                    <div className="flex flex-col md:flex-row items-center justify-center md:gap-8 leading-none">
                        <div
                            className="intro-name relative"
                            style={{ opacity: 0, willChange: "transform, opacity" }}
                        >
                            {/* Soft glow behind name */}
                            <div
                                className="absolute inset-0 blur-[30px] opacity-30 pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)" }}
                            />
                            <span className="font-arabic text-6xl md:text-8xl lg:text-9xl font-light relative z-10 block text-foreground">
                                محمد
                            </span>
                        </div>

                        {/* Ampersand divider */}
                        <div
                            className="intro-ampersand flex flex-col items-center my-4 md:my-0"
                            style={{ opacity: 0, willChange: "transform, opacity" }}
                        >
                            <span className="text-2xl md:text-4xl font-light text-wedding-gold/50 font-arabic italic">
                                &amp;
                            </span>
                        </div>

                        <div
                            className="intro-name relative"
                            style={{ opacity: 0, willChange: "transform, opacity" }}
                        >
                            <div
                                className="absolute inset-0 blur-[30px] opacity-30 pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)" }}
                            />
                            <span className="font-arabic text-6xl md:text-8xl lg:text-9xl font-light relative z-10 block text-foreground">
                                آية
                            </span>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="intro-separator flex flex-col items-center gap-2 pt-4"
                        style={{ opacity: 0, willChange: "transform, opacity" }}
                    >
                        <div className="flex items-center gap-3 opacity-60">
                            <div className="h-px w-10 bg-wedding-gold/50" />
                            <span className="text-wedding-gold text-xs">◆</span>
                            <div className="h-px w-10 bg-wedding-gold/50" />
                        </div>
                    </div>
                </div>

                {/* === Text above, centered photo below === */}
                {/* Story text — anime.js controlled */}
                <div className="text-center space-y-4 mb-12" dir="rtl">
                    {storyLines.map((line, i) => (
                        <div
                            key={i}
                            className="intro-story-line"
                            style={{ opacity: 0, willChange: "transform, opacity" }}
                        >
                            {line.isDate ? (
                                <p className="font-arabic text-3xl md:text-5xl text-wedding-gold leading-tight">
                                    {line.text}
                                </p>
                            ) : (
                                <p className="font-arabic text-2xl md:text-3xl leading-relaxed text-foreground/85">
                                    {line.text}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center">

                    {/* Image centered */}
                    <div className="w-full md:w-1/2 relative">
                        {/* Outer decorative offset border */}
                        <div
                            className="absolute top-5 left-5 w-full h-full rounded-t-[10rem] pointer-events-none z-0"
                            style={{
                                border: "1px solid rgba(212,175,55,0.2)",
                            }}
                        />
                        {/* Second offset border for depth */}
                        <div
                            className="absolute top-2.5 left-2.5 w-full h-full rounded-t-[10rem] pointer-events-none z-0"
                            style={{
                                border: "1px solid rgba(212,175,55,0.12)",
                            }}
                        />

                        {/* Main image frame — anime.js controlled */}
                        <motion.div
                            className="intro-photo aspect-[3/4] rounded-t-[10rem] overflow-hidden relative z-10"
                            style={{
                                border: "1px solid rgba(212,175,55,0.25)",
                                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(212,175,55,0.08)",
                                opacity: 0,
                                willChange: "transform, opacity",
                            }}
                        >
                            <motion.img
                                src="/couple2.jpg"
                                alt="Mohamed & Aya"
                                className="w-full h-full object-cover scale-110"
                                style={{ y: imageY, willChange: isMobile ? 'auto' : 'transform' }}
                            />

                            {/* Inner gold vignette overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: "radial-gradient(ellipse at center, transparent 55%, rgba(10,8,5,0.4) 100%)",
                                }}
                            />

                            {/* Floral Frame Overlays — hidden on mobile */}
                            {!isMobile && <>
                                <motion.div
                                    style={{ y: overlayY1, rotate: rotateL1 }}
                                    className="absolute bottom-[2%] left-[-2%] w-36 z-50 pointer-events-none origin-bottom-left"
                                >
                                    <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                                </motion.div>

                                <motion.div
                                    style={{ y: overlayY2, rotate: rotateR1 }}
                                    className="absolute bottom-[2%] right-[-2%] w-36 z-50 pointer-events-none scale-x-[-1] origin-bottom-right"
                                >
                                    <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                                </motion.div>

                                <motion.div
                                    style={{ y: overlayY2, rotate: rotateL2 }}
                                    className="absolute top-[12%] left-[-5%] w-32 z-50 pointer-events-none origin-center"
                                >
                                    <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                                </motion.div>

                                <motion.div
                                    style={{ y: overlayY1, rotate: rotateR2 }}
                                    className="absolute top-[12%] right-[-5%] w-32 z-50 pointer-events-none scale-x-[-1] origin-center"
                                >
                                    <img src="/Flowers Spring.gif" alt="" className="w-full h-full object-contain" />
                                </motion.div>
                            </>}
                        </motion.div>

                        {/* Corner ornaments — 4 corners of the image frame */}
                        <CornerOrnament className="absolute top-[-8px] left-[-8px] w-10 h-10 z-20" />
                        <CornerOrnament className="absolute top-[-8px] right-[-8px] w-10 h-10 z-20 rotate-90" />

                        {/* Bird animations (confined) */}
                        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden rounded-t-[10rem]">
                            {[
                                { delay: 0, top: 12, size: "w-24 md:w-20", opacity: "opacity-100", visibility: "block" },
                                { delay: 3, top: 22, size: "w-12 md:w-10", opacity: "opacity-60", visibility: "hidden md:block" },
                                { delay: 6, top: 17, size: "w-16 md:w-14", opacity: "opacity-85", visibility: "hidden md:block" }
                            ].map((bird, i) => (
                                <motion.img
                                    key={`bird1-${i}`}
                                    src="/bird-intro1.gif"
                                    alt=""
                                    className={`absolute ${bird.size} ${bird.opacity} ${bird.visibility} h-auto object-contain will-change-transform`}
                                    style={{ top: `${bird.top}%` }}
                                    initial={{ left: "-20%" }}
                                    animate={{ left: "110%" }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: bird.delay }}
                                />
                            ))}

                            {[
                                { delay: 1.5, top: 15, size: "w-18 md:w-14", opacity: "opacity-90", visibility: "hidden md:block" },
                                { delay: 4.5, top: 25, size: "w-24 md:w-20", opacity: "opacity-100", visibility: "block" },
                                { delay: 7.5, top: 20, size: "w-12 md:w-9", opacity: "opacity-50", visibility: "hidden md:block" }
                            ].map((bird, i) => (
                                <motion.img
                                    key={`bird2-${i}`}
                                    src="/bird-intro2.gif"
                                    alt=""
                                    className={`absolute ${bird.size} ${bird.opacity} ${bird.visibility} h-auto object-contain scale-x-[-1] will-change-transform`}
                                    style={{ top: `${bird.top}%` }}
                                    initial={{ right: "-20%" }}
                                    animate={{ right: "110%" }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: bird.delay }}
                                />
                            ))}

                            <div className="absolute bottom-[-2%] left-0 right-0 h-24 pointer-events-none">
                                <div className="absolute inset-0 flex items-end justify-center">
                                    <img src="/poky.gif" alt="Poky Cat" className="w-20 md:w-32 h-auto object-contain" />
                                </div>
                                <motion.img
                                    src="/yoda.gif"
                                    alt="Yoda Cat"
                                    className="absolute bottom-0 w-16 md:w-24 h-auto object-contain scale-x-[-1] will-change-transform"
                                    initial={{ left: "110%" }}
                                    animate={{ left: "-30%" }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 0 }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
