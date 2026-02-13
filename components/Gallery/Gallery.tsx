"use client";

import { motion } from "framer-motion";

export default function Location() {
    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Soft Glow Background */}
            {/* Soft Glow Background */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.6, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wedding-gold/10 blur-[100px] rounded-full pointer-events-none"
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="font-script text-4xl md:text-5xl text-wedding-gold block">
                        Venue Location
                    </span>
                    <span className="font-arabic text-3xl md:text-4xl text-wedding-gold block">
                        موقع الحفل
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    {/* Left Column: Text Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left space-y-8"
                    >
                        <div className="space-y-4">
                            <h3 className="font-serif text-3xl md:text-4xl text-foreground">The Plaza Hotel</h3>
                            <h3 className="font-arabic text-2xl md:text-3xl text-foreground">فندق بلازا</h3>
                        </div>

                        <div className="space-y-2 text-muted-foreground">
                            <p className="font-sans text-lg">Cairo, Egypt</p>
                            <p className="font-arabic text-xl" dir="rtl">القاهرة، مصر</p>
                        </div>

                        <div className="space-y-2 text-muted-foreground">
                            <p className="font-sans text-lg">June 28, 2026</p>
                            <p className="font-arabic text-xl" dir="rtl">٢٨ يونيو ٢٠٢٦</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Map & Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {/* Map Card */}
                        <div className="w-full aspect-square md:aspect-[4/3] bg-white shadow-xl rounded-lg overflow-hidden border-4 border-white relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60389552706!2d31.18842358485233!3d30.0596184702878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79df8294e87b1b6!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1707335193000!5m2!1sen!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            />
                        </div>

                        {/* Button */}
                        <motion.a
                            href="https://goo.gl/maps/cairo"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full block bg-gold-lustre text-wedding-navy font-sans uppercase tracking-[0.2em] py-4 text-center hover:opacity-90 transition-opacity shadow-lg flex flex-col items-center justify-center gap-1 relative overflow-hidden"
                        >
                            <span className="font-bold">Get Directions</span>
                            <span className="font-arabic text-sm tracking-normal font-bold">احصل على الاتجاهات</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
