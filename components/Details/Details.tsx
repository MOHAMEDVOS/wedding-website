"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { useLang } from "@/components/providers/language-context";

const details = [
    {
        icon: Clock,
        titleAr: "مراسم الزفاف",
        descAr: "الثالثة مساءً",
        subAr: "يرجى الحضور قبل الموعد بـ ١٥ دقيقة",
        titleEn: "Wedding Ceremony",
        descEn: "3:00 PM",
        subEn: "Please arrive 15 minutes early",
    },
    {
        icon: MapPin,
        titleAr: "حفل الاستقبال",
        descAr: "فندق بلازا",
        subAr: "قاعة الاحتفالات الكبرى",
        titleEn: "Reception",
        descEn: "Fleet Club El Gezirah",
        subEn: "Grand Celebration Hall",
    },
    {
        icon: Sparkles,
        titleAr: "الملابس",
        descAr: "ملابس سهرة رسمية",
        subAr: "أنيق ورسمي",
        titleEn: "Dress Code",
        descEn: "Formal Evening Wear",
        subEn: "Elegant & Formal",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any },
    },
};

export default function Details() {
    const { isAr } = useLang();
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

            {/* Ambient radial glow */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(212,175,55,0.06) 0%, transparent 65%)",
                    filter: "blur(70px)",
                }}
            />

            {/* Gold top border glow */}
            <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }}
            />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-wedding-gold/40" />
                        <span className="text-wedding-gold/40 text-[10px]">✦</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-wedding-gold/40" />
                    </div>
                    <span className="shimmer-text font-arabic text-4xl block" dir={isAr ? "rtl" : "ltr"}>
                        {isAr ? "تفاصيل الحفل" : "Event Details"}
                    </span>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="section-separator max-w-xs mx-auto mt-4"
                    />
                </motion.div>

                {/* Cards grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                    {details.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative p-8 md:p-10 rounded-xl text-center group cursor-default overflow-hidden"
                            style={{
                                background: "rgba(255,255,255,0.025)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                border: "1px solid rgba(212,175,55,0.1)",
                                boxShadow: "0 16px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
                                transition: "box-shadow 0.5s ease, border-color 0.5s ease",
                            }}
                            whileHover={{
                                boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                        >
                            {/* Top border shimmer */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px opacity-60"
                                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)" }}
                            />

                            {/* Icon */}
                            <div
                                className="w-12 h-12 mx-auto mb-6 text-wedding-gold/60 group-hover:text-wedding-gold/90 transition-colors duration-500 group-hover:scale-110 transform"
                                style={{ transition: "transform 0.5s ease, color 0.5s ease" }}
                            >
                                <item.icon strokeWidth={1} size={48} />
                            </div>

                            {/* Gold ornament line */}
                            <div className="flex items-center justify-center gap-2 mb-4 opacity-40">
                                <div className="h-px w-6 bg-wedding-gold/50" />
                                <span className="text-wedding-gold text-[8px]">◆</span>
                                <div className="h-px w-6 bg-wedding-gold/50" />
                            </div>

                            <h3 className="font-arabic text-2xl mb-3 text-wedding-gold/80 group-hover:text-wedding-gold transition-colors duration-500" dir={isAr ? "rtl" : "ltr"}>
                                {isAr ? item.titleAr : item.titleEn}
                            </h3>

                            <p className="font-arabic text-lg tracking-wide text-foreground/80 mb-3" dir={isAr ? "rtl" : "ltr"}>
                                {isAr ? item.descAr : item.descEn}
                            </p>

                            <p className="font-arabic text-foreground/40 text-sm" dir={isAr ? "rtl" : "ltr"}>
                                {isAr ? item.subAr : item.subEn}
                            </p>

                            {/* Bottom corner accent on hover */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)" }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
