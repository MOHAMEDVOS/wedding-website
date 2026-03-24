"use client";

import { motion } from "framer-motion";

export default function Location() {

    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Pulsing aurora glow */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 65%)",
                    filter: "blur(70px)",
                }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 space-y-4"
                >
                    {/* Ornamental dividers flanking the heading */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-wedding-gold/50" />
                            <span className="text-wedding-gold/40 text-[10px]">✦</span>
                            <div className="h-px w-6 bg-wedding-gold/30" />
                        </div>

                        <span className="shimmer-text-live font-arabic text-3xl md:text-4xl block" dir="rtl">
                            موقع الحفل
                        </span>

                        <div className="flex items-center gap-2">
                            <div className="h-px w-6 bg-wedding-gold/30" />
                            <span className="text-wedding-gold/40 text-[10px]">✦</span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-wedding-gold/50" />
                        </div>
                    </div>

                    {/* Sub ornament line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="section-separator max-w-sm mx-auto"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

                    {/* Left Column: Venue Info Card — glassmorphic */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center md:text-right space-y-8 p-8 md:p-10 rounded-2xl relative"
                        style={{
                            background: "rgba(255,255,255,0.025)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            border: "1px solid rgba(212,175,55,0.14)",
                            boxShadow:
                                "0 24px 60px rgba(0,0,0,0.35), 0 0 40px rgba(212,175,55,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }}
                        dir="rtl"
                    >
                        {/* Top border highlight */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                            style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)" }}
                        />

                        {/* Venue name */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-end gap-3 mb-1">
                                <div className="h-px w-8 bg-wedding-gold/30" />
                                <span className="text-wedding-gold/40 text-[10px]">◆</span>
                            </div>
                            <h3 className="font-arabic text-2xl md:text-3xl text-foreground/95"
                                style={{ textShadow: "0 0 20px rgba(212,175,55,0.1)" }}>
                                فليت كلوب الزمالك
                            </h3>
                        </div>

                        {/* Gold separator */}
                        <div className="flex items-center justify-end gap-3">
                            <div className="h-px w-full bg-gradient-to-l from-wedding-gold/40 to-transparent" />
                        </div>

                        {/* Location */}
                        <div className="space-y-1">
                            <p className="font-arabic text-xl text-foreground/60">القاهرة، مصر</p>
                        </div>

                        {/* Date */}
                        <div className="space-y-1">
                            <p className="font-arabic text-xl text-wedding-gold/70">٢٨ يونيو ٢٠٢٦</p>
                        </div>

                        {/* Bottom decoration */}
                        <div className="flex items-center justify-center gap-2 pt-2 opacity-40">
                            <div className="h-px w-8 bg-wedding-gold/50" />
                            <span className="text-wedding-gold text-[8px]">✦</span>
                            <div className="h-px w-8 bg-wedding-gold/50" />
                        </div>
                    </motion.div>

                    {/* Right Column: Map + Get Directions button */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-5"
                    >
                        {/* Map — gold border treatment */}
                        <div
                            className="w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden relative"
                            style={{
                                border: "1px solid rgba(212,175,55,0.22)",
                                boxShadow: "0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.06)",
                            }}
                        >
                            {/* Top highlight on map frame */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
                                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)" }}
                            />
                            {/* Corner accent dots */}
                            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-wedding-gold/40 z-10 pointer-events-none" />
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-wedding-gold/40 z-10 pointer-events-none" />
                            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-wedding-gold/40 z-10 pointer-events-none" />
                            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-wedding-gold/40 z-10 pointer-events-none" />

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0!2d31.2235516!3d30.0404173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458410008dedd15%3A0xad624ac096c218b7!2sFLEET%20CLUB%20EL%20GEZIRAH!5e0!3m2!1sen!2seg!4v1707335193000!5m2!1sen!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                            />
                        </div>

                        {/* احصل على الاتجاهات — luxury shimmer button */}
                        <motion.a
                            href="https://maps.app.goo.gl/r1Sa9gBWP4Dwwbg87"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block relative overflow-hidden rounded-lg py-4 text-center group"
                            style={{
                                background: "linear-gradient(90deg, #8B5E3C 0%, #D4A574 25%, #f0d060 50%, #D4A574 75%, #8B5E3C 100%)",
                                backgroundSize: "200% auto",
                                boxShadow: "0 8px 30px rgba(212,175,55,0.25), 0 2px 8px rgba(0,0,0,0.3)",
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Shimmer sweep on hover */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                initial={{ x: "-100%", opacity: 0 }}
                                whileHover={{ x: "100%", opacity: 0.3 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                                }}
                            />
                            <span
                                className="font-arabic text-sm font-bold relative z-10"
                                style={{ color: "#1A0E06" }}
                            >
                                احصل على الاتجاهات
                            </span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
