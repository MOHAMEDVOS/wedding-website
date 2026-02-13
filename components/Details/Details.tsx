"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Sparkles } from "lucide-react";

const details = [
    {
        icon: Clock,
        title: "Ceremony",
        titleAr: "مراسم الزفاف",
        desc: "3:00 PM - Start",
        descAr: "الثالثة مساءً",
        sub: "Please arrive 15 mins early",
        subAr: "يرجى الحضور قبل الموعد بـ ١٥ دقيقة"
    },
    {
        icon: MapPin,
        title: "Reception",
        titleAr: "حفل الاستقبال",
        desc: "The Plaza Hotel",
        descAr: "فندق بلازا",
        sub: "Grand Ballroom",
        subAr: "قاعة الاحتفالات الكبرى"
    },
    {
        icon: Sparkles,
        title: "Dress Code",
        titleAr: "الملابس",
        desc: "Black Tie Optional",
        descAr: "ملابس سهرة رسمية",
        sub: "Glamorous & Elegant",
        subAr: "أنيق ورسمي"
    }
];

export default function Details() {
    return (
        <section className="py-24 bg-wedding-olive text-wedding-parchment relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <span className="font-script text-4xl text-wedding-clay opacity-90 block">
                        The Celebration
                    </span>
                    <span className="font-arabic text-4xl text-wedding-clay opacity-90 block">
                        تفاصيل الحفل
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {details.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="bg-white/5 backdrop-blur-sm border border-wedding-clay/20 p-8 md:p-12 rounded-sm text-center group hover:bg-white/10 transition-colors duration-500"
                        >
                            <div className="w-12 h-12 mx-auto mb-6 text-wedding-clay opacity-80 group-hover:scale-110 transition-transform duration-500">
                                <item.icon strokeWidth={1} size={48} />
                            </div>

                            <h3 className="font-serif text-3xl mb-1 text-wedding-clay">{item.title}</h3>
                            <h3 className="font-arabic text-2xl mb-4 text-wedding-clay opacity-90">{item.titleAr}</h3>

                            <p className="font-sans text-lg tracking-wide uppercase mb-1">{item.desc}</p>
                            <p className="font-arabic text-lg tracking-wide opacity-90 mb-4">{item.descAr}</p>

                            <p className="font-serif italic text-white/60 text-sm">{item.sub}</p>
                            <p className="font-arabic text-white/60 text-sm mt-1">{item.subAr}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
