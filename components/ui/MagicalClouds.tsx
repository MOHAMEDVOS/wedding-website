"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MagicalClouds() {
  const scrollY = useMotionValue(0);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    setVh(window.innerHeight);

    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  // Clouds part during the first 80% of viewport height scrolled
  // scrollY 0 → vh*0.8: clouds fully covering bottom half
  // scrollY vh*0.8+: clouds fully gone

  const progress = useTransform(scrollY, [0, vh * 0.8], [0, 1]);

  // Left half sweeps left
  const leftX  = useTransform(progress, [0, 1], ["0%", "-110%"]);
  const leftX2 = useTransform(progress, [0, 1], ["0%", "-90%"]);

  // Right half sweeps right
  const rightX  = useTransform(progress, [0, 1], ["0%", "110%"]);
  const rightX2 = useTransform(progress, [0, 1], ["0%", "90%"]);

  // Bottom row drops down
  const downY = useTransform(progress, [0, 1], ["0%", "60%"]);

  // Fade out after parting
  const opacity = useTransform(progress, [0, 0.7, 1], [1, 1, 0]);

  // Light ray through the gap
  const rayOpacity = useTransform(progress, [0.2, 0.5, 0.85], [0, 0.9, 0]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-none overflow-hidden"
      style={{ height: "65vh", opacity }}
    >
      {/* ═══════════════════════════════════════
          LEFT HALF — sweeps left on scroll
          Covers left 55% of screen
      ═══════════════════════════════════════ */}

      {/* Left — main cloud bank, full height */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ width: "58%", height: "100%", x: leftX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" />
      </motion.div>

      {/* Left — cloud2 layered on top for depth */}
      <motion.div
        className="absolute bottom-0 left-0"
        style={{ width: "55%", height: "65%", x: leftX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* ═══════════════════════════════════════
          RIGHT HALF — sweeps right on scroll
          Covers right 55% of screen
      ═══════════════════════════════════════ */}

      {/* Right — main cloud bank, full height */}
      <motion.div
        className="absolute top-0 right-0"
        style={{ width: "58%", height: "100%", x: rightX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" />
      </motion.div>

      {/* Right — cloud2 layered for depth */}
      <motion.div
        className="absolute bottom-0 right-0"
        style={{ width: "55%", height: "65%", x: rightX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* ═══════════════════════════════════════
          CENTRE BOTTOM — 3 overlapping clouds
          with natural rounded tops, no hard cuts
      ═══════════════════════════════════════ */}

      {/* Centre-left puff — natural cloud shape */}
      <motion.div
        className="absolute bottom-0"
        style={{ left: "15%", width: "40%", height: "55%", y: downY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom" />
      </motion.div>

      {/* Centre puff — slightly taller for visual hierarchy */}
      <motion.div
        className="absolute bottom-0"
        style={{ left: "28%", width: "44%", height: "62%", y: downY, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      {/* Centre-right puff */}
      <motion.div
        className="absolute bottom-0"
        style={{ right: "15%", width: "40%", height: "55%", y: downY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      {/* ═══════════════════════════════════════
          GOLDEN LIGHT RAY — bursts through gap
      ═══════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "conic-gradient(from 270deg at 50% 110%, transparent 30%, rgba(212,175,55,0.15) 42%, rgba(255,240,180,0.25) 50%, rgba(212,175,55,0.15) 58%, transparent 70%)",
          filter: "blur(10px)",
          opacity: rayOpacity,
        }}
      />

      {/* Soft gradient fade at very top of cloud band so it blends into hero */}
      <div
        className="absolute top-0 left-0 w-full h-1/4 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}
