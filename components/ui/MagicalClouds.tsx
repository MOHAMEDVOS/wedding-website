"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MagicalClouds() {
  const scrollY = useMotionValue(0);
  const [vh, setVh] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setVh(window.innerHeight);
    setIsMobile(window.innerWidth < 768);

    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  const progress = useTransform(scrollY, [0, vh * 0.8], [0, 1]);

  // Left/right sweep — tighter on mobile so they overlap more at start
  const leftX   = useTransform(progress, [0, 1], ["0%", isMobile ? "-100%" : "-110%"]);
  const rightX  = useTransform(progress, [0, 1], ["0%", isMobile ? "100%" : "110%"]);
  const leftX2  = useTransform(progress, [0, 1], ["0%", isMobile ? "-80%" : "-90%"]);
  const rightX2 = useTransform(progress, [0, 1], ["0%", isMobile ? "80%" : "90%"]);
  const downY   = useTransform(progress, [0, 1], ["0%", "60%"]);

  const opacity    = useTransform(progress, [0, 0.7, 1], [1, 1, 0]);
  const rayOpacity = useTransform(progress, [0.2, 0.5, 0.85], [0, 0.9, 0]);

  // On mobile: wider overlap (65% each side) so no centre gap
  // On desktop: 58% each side with centre puffs filling the seam
  const sideW   = isMobile ? "70%" : "58%";
  const sideW2  = isMobile ? "68%" : "55%";
  const cloudH  = isMobile ? "50vh" : "65vh";

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-none overflow-hidden"
      style={{ height: cloudH, opacity }}
    >
      {/* ═══ LEFT HALF — sweeps left ═══ */}

      <motion.div
        className="absolute top-0 left-0"
        style={{ width: sideW, height: "100%", x: leftX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0"
        style={{ width: sideW2, height: "65%", x: leftX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* ═══ RIGHT HALF — sweeps right ═══ */}

      <motion.div
        className="absolute top-0 right-0"
        style={{ width: sideW, height: "100%", x: rightX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0"
        style={{ width: sideW2, height: "65%", x: rightX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* ═══ CENTRE BOTTOM — fills the seam ═══ */}

      <motion.div
        className="absolute bottom-0"
        style={{ left: isMobile ? "10%" : "15%", width: isMobile ? "45%" : "40%", height: isMobile ? "50%" : "55%", y: downY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom" />
      </motion.div>

      <motion.div
        className="absolute bottom-0"
        style={{ left: isMobile ? "20%" : "28%", width: isMobile ? "60%" : "44%", height: isMobile ? "58%" : "62%", y: downY, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      <motion.div
        className="absolute bottom-0"
        style={{ right: isMobile ? "10%" : "15%", width: isMobile ? "45%" : "40%", height: isMobile ? "50%" : "55%", y: downY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      {/* ═══ GOLDEN LIGHT RAY ═══ */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "conic-gradient(from 270deg at 50% 110%, transparent 30%, rgba(212,175,55,0.15) 42%, rgba(255,240,180,0.25) 50%, rgba(212,175,55,0.15) 58%, transparent 70%)",
          filter: "blur(10px)",
          opacity: rayOpacity,
        }}
      />
    </motion.div>
  );
}
