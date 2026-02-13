"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Noise from "../ui/Noise";

export default function RSVP() {
    const [attendance, setAttendance] = useState<"attending" | "declining" | null>(null);

    return (
        <section className="py-32 bg-wedding-olive text-wedding-parchment relative overflow-hidden">
            <Noise />
            <div className="container mx-auto px-6 max-w-2xl relative z-10 text-center">

                <div className="mb-12 space-y-4">
                    <span className="font-script text-5xl text-wedding-clay block mb-2">RSVP</span>
                    <span className="font-arabic text-4xl text-wedding-clay block">تأكيد الحضور</span>
                    <h2 className="font-serif text-3xl text-white/80">Kindly Respond by May 1st</h2>
                    <h2 className="font-arabic text-2xl text-white/80">يرجى الرد قبل ١ مايو</h2>
                </div>


                <form className="space-y-8 text-left">
                    <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-widest text-wedding-clay/80">Full Name / الاسم بالكامل</label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b border-wedding-clay/30 py-4 text-xl focus:border-wedding-clay outline-none transition-colors placeholder:text-white/20"
                            placeholder="Enter your name / أدخل اسمك"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-xs uppercase tracking-widest text-wedding-clay/80 mb-4">Will you be joining us? / هل ستحضر؟</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setAttendance("attending")}
                                className={`flex-1 py-4 border border-wedding-clay/30 transition-all duration-300 ${attendance === "attending" ? "bg-wedding-clay text-wedding-olive" : "hover:bg-white/5"}`}
                            >
                                <span className="block font-serif text-lg">Joyfully Accept</span>
                                <span className="block font-arabic text-lg mt-1">سأحضر بكل سرور</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setAttendance("declining")}
                                className={`flex-1 py-4 border border-wedding-clay/30 transition-all duration-300 ${attendance === "declining" ? "bg-white/10" : "hover:bg-white/5"}`}
                            >
                                <span className="block font-serif text-lg">Regretfully Decline</span>
                                <span className="block font-arabic text-lg mt-1">أعتذر عن الحضور</span>
                            </button>
                        </div>
                    </div>

                    {/* Conditional Guest Count */}
                    <AnimatePresence>
                        {attendance === "attending" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden space-y-8"
                            >
                                <div className="space-y-2 pt-4">
                                    <label className="block text-xs uppercase tracking-widest text-wedding-clay/80">Number of Guests / عدد الضيوف</label>
                                    <select className="w-full bg-transparent border-b border-wedding-clay/30 py-4 text-xl focus:border-wedding-clay outline-none text-white [&>option]:bg-wedding-olive">
                                        <option value="1">1 Guest / ضيف واحد</option>
                                        <option value="2">2 Guests / ضيفان</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs uppercase tracking-widest text-wedding-clay/80">Dietary Requirements / متطلبات غذائية</label>
                                    <textarea
                                        className="w-full bg-transparent border-b border-wedding-clay/30 py-4 text-xl focus:border-wedding-clay outline-none transition-colors placeholder:text-white/20 min-h-[100px]"
                                        placeholder="Any allergies? / هل لديك أي حساسية؟"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button className="w-full bg-wedding-clay text-wedding-olive font-sans uppercase tracking-[0.2em] py-5 mt-8 hover:bg-white transition-colors duration-500 font-medium">
                        Send RSVP / إرسال
                    </button>
                </form>
            </div>
        </section>
    );
}
