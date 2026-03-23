"use client";

import { useRef, useEffect } from "react";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const storyItems = [
    {
        year: "7:00 PM",
        yearAr: "٧:٠٠ م",
        title: "Guest Gathering",
        titleAr: "استقبال الضيوف",
        description: "Welcome drinks and gathering at the venue.",
        descriptionAr: "مشروبات ترحيبية واستقبال الضيوف في القاعة.",
        alignment: "right",
        image: "/Guest Gathering.jpg",
    },
    {
        year: "7:30 PM",
        yearAr: "٧:٣٠ م",
        title: "Grand Entrance",
        titleAr: "الزفة ودخول العرسان",
        description: "Mohamed & Aya arrive to start the night!",
        descriptionAr: "وصول محمد وآية لبدء الاحتفال!",
        alignment: "left",
        image: "/Grand Entrance.png",
    },
    {
        year: "10:00 PM",
        yearAr: "١٠:٠٠ م",
        title: "The Last Dance",
        titleAr: "الرقصة الأخيرة",
        description: "End the night with love, laughter & memories forever.",
        descriptionAr: "نختم الليلة بالحب والضحكات وذكريات للأبد.",
        alignment: "right",
        image: "/Conclusion.png",
    },
];

export default function Story() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate section header - Majestic Reveal
        gsap.fromTo(".story-header",
            { opacity: 0, y: 40, filter: "blur(12px)" },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".story-header",
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        // Animate the vertical line - Golden Thread
        if (lineRef.current) {
            gsap.fromTo(lineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 40%",
                        end: "bottom center",
                        scrub: 1.5,
                    }
                }
            );
        }

        // Animate story items - Pure Fading Reveal
        const items = gsap.utils.toArray<HTMLElement>(".story-item");
        items.forEach((item) => {
            // Image Pure Fade (No sliding/masking)
            gsap.fromTo(item.querySelector(".story-image-inner"),
                { opacity: 0, filter: "blur(10px)" },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            // Content Pure Fade (No sliding/masking)
            gsap.fromTo(item.querySelector(".story-content"),
                { opacity: 0, filter: "blur(5px)" },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.8,
                    delay: 0.4,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

        // Background Glow Pulse
        gsap.to(".story-bg-glow", {
            scale: 1.3,
            opacity: 0.4,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);



    return (
        <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
            {/* Soft Glow Background */}
            <div className="story-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wedding-gold/10 blur-[100px] rounded-full pointer-events-none opacity-50" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Section Header */}
                <div className="story-header text-center mb-24 space-y-4">
                    <div className="space-y-1">
                        <span className="font-great-victorian text-3xl md:text-4xl text-wedding-gold opacity-90 block tracking-wider">June 28, 2026</span>
                        <span className="font-amiri text-2xl md:text-3xl text-wedding-gold opacity-80 block">٢٨ يونيو ٢٠٢٦</span>
                    </div>
                    <div className="space-y-0">
                        <h2 className="font-great-victorian text-5xl md:text-8xl text-foreground leading-tight">The Wedding Day</h2>
                        <h2 className="font-amiri text-4xl md:text-6xl text-foreground mt-[-10px]">برنامج الزفاف</h2>
                    </div>
                </div>

                {/* Vertical Line - Golden Thread */}
                <div className="absolute left-1/2 top-64 bottom-0 w-[1px] bg-wedding-gold/10 -translate-x-1/2 block">
                    <div ref={lineRef} className="w-full bg-gradient-to-b from-wedding-gold/0 via-wedding-gold to-wedding-gold/0 absolute top-0 left-0" />
                </div>

                <div className="space-y-40 relative z-10">
                    {storyItems.map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "story-item flex items-center gap-6 md:gap-20",
                                item.alignment === "right" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            {/* Image Side — Glassmorphic floating card */}
                            <div className="story-image w-1/2 aspect-[4/3] relative overflow-hidden rounded-lg bg-white/[0.03] backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_40px_rgba(212,175,55,0.06)]">
                                <div className="story-image-inner w-full h-full relative p-1 md:p-2 border border-wedding-gold/15 rounded-lg">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-[3s] ease-out"
                                        />
                                    ) : (
                                        <ImagePlaceholder
                                            text={item.year}
                                            className="w-full h-full"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={cn(
                                "story-content w-1/2",
                                item.alignment === "right" ? "text-right" : "text-left"
                            )}>
                                <div className="flex flex-col gap-0 mb-4">
                                    <span className="text-wedding-gold font-great-victorian text-3xl md:text-6xl opacity-30 block">
                                        {item.year}
                                    </span>
                                    <span className="text-wedding-gold font-amiri text-2xl md:text-4xl opacity-30 block">
                                        {item.yearAr}
                                    </span>
                                </div>

                                <h3 className="font-great-victorian text-2xl md:text-5xl text-foreground tracking-wide leading-tight">{item.title}</h3>
                                <h3 className="font-amiri text-xl md:text-3xl text-foreground mb-4">{item.titleAr}</h3>

                                <div className="space-y-2">
                                    <p className="text-muted-foreground/80 leading-relaxed font-light text-sm md:text-xl max-w-md inline-block">
                                        {item.description}
                                    </p>
                                    <p className="text-muted-foreground/80 leading-relaxed font-amiri text-sm md:text-xl" dir="rtl">
                                        {item.descriptionAr}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
