"use client";

import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function SplineHero() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 h-screen w-full filter sepia-[0.5] hue-rotate-[170deg] saturate-[1.5] brightness-[0.9] contrast-[1.1]"
        >
            <Spline scene="https://prod.spline.design/jdTN4VDCXmSY8utE/scene.splinecode" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80 pointer-events-none" />
        </motion.div>
    );
}
