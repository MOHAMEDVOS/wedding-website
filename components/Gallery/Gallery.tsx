"use client";

import { motion } from "framer-motion";

export default function Location() {

    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Pulsing aurora glow */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wedding-gold/10 blur-[100px] rounded-full pointer-events-none"
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header — shimmer text */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 space-y-4"
                >
                    <span className="shimmer-text font-script text-4xl md:text-5xl block">
                        Venue Location
                    </span>
                    <span className="shimmer-text font-arabic text-3xl md:text-4xl block">
                        موقع الحفل
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    {/* Left Column: Text Info — glassmorphic floating card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center md:text-left space-y-8 p-8 md:p-10 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-wedding-gold/10 shadow-[0_20px_50px_rgba(0,0,0,0.2),0_0_40px_rgba(212,175,55,0.04)]"
                    >
                        <div className="space-y-4">
                            <h3 className="font-serif text-3xl md:text-4xl text-foreground">Fleet Club El Zamalk</h3>
                            <h3 className="font-arabic text-2xl md:text-3xl text-foreground">فليت كلوب الزمالك</h3>
                        </div>

                        <div className="w-12 h-[1px] bg-gradient-to-r from-wedding-gold/40 to-transparent mx-auto md:mx-0" />

                        <div className="space-y-2 text-muted-foreground">
                            <p className="font-sans text-lg">Cairo, Egypt</p>
                            <p className="font-arabic text-xl" dir="rtl">القاهرة، مصر</p>
                        </div>

                        <div className="space-y-2 text-muted-foreground">
                            <p className="font-sans text-lg">June 28, 2026</p>
                            <p className="font-arabic text-xl" dir="rtl">٢٨ يونيو ٢٠٢٦</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Map & Magnetic Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        {/* Map — glassmorphic border */}
                        <div className="w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border border-wedding-gold/15 shadow-[0_20px_50px_rgba(0,0,0,0.25),0_0_30px_rgba(212,175,55,0.06)] relative">
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

                        <a
                            href="https://maps.app.goo.gl/r1Sa9gBWP4Dwwbg87"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block bg-gold-lustre text-wedding-navy font-sans uppercase tracking-[0.2em] py-4 text-center shadow-[0_8px_30px_rgba(212,175,55,0.25)] rounded-lg flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)]"
                        >
                            <span className="font-bold">Get Directions</span>
                            <span className="font-arabic text-sm tracking-normal font-bold">احصل على الاتجاهات</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
