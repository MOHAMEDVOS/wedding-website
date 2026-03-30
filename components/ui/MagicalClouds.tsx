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

  // Desktop: left/right sweep
  const leftX  = useTransform(progress, [0, 1], ["0%", "-110%"]);
  const leftX2 = useTransform(progress, [0, 1], ["0%", "-90%"]);
  const rightX  = useTransform(progress, [0, 1], ["0%", "110%"]);
  const rightX2 = useTransform(progress, [0, 1], ["0%", "90%"]);

  // Mobile: everything drops down + fades
  const mobileY  = useTransform(progress, [0, 1], ["0%", "50%"]);
  const mobileY2 = useTransform(progress, [0, 1], ["0%", "40%"]);

  // Shared
  const downY = useTransform(progress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(progress, [0, 0.7, 1], [1, 1, 0]);
  const rayOpacity = useTransform(progress, [0.2, 0.5, 0.85], [0, 0.9, 0]);

  if (isMobile) {
    // ══════════════════════════════════════════
    // MOBILE LAYOUT — full-width clouds, drop down on scroll
    // No left/right split — avoids the ugly centre seam
    // ══════════════════════════════════════════
    return (
      <motion.div
        className="fixed bottom-0 left-0 w-full z-50 pointer-events-none overflow-hidden"
        style={{ height: "45vh", opacity }}
      >
        {/* Full-width bottom cloud layer — anchored to bottom */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: "100%", y: mobileY, willChange: "transform" }}
        >
          <img src="/cloud2.png" alt="" draggable={false}
            className="w-full h-full object-cover object-top" />
        </motion.div>

        {/* Second cloud layer for depth — slightly offset */}
        <motion.div
          className="absolute bottom-0 left-[-8%] w-[116%]"
          style={{ height: "85%", y: mobileY2, willChange: "transform" }}
        >
          <img src="/clouds.png" alt="" draggable={false}
            className="w-full h-full object-cover object-top" style={{ opacity: 0.9 }} />
        </motion.div>

        {/* Third puff on top for natural edge */}
        <motion.div
          className="absolute bottom-[25%] left-[5%] w-[50%]"
          style={{ height: "55%", y: mobileY, willChange: "transform" }}
        >
          <img src="/clouds.png" alt="" draggable={false}
            className="w-full h-full object-contain object-bottom" style={{ opacity: 0.85 }} />
        </motion.div>

        <motion.div
          className="absolute bottom-[25%] right-[5%] w-[50%]"
          style={{ height: "55%", y: mobileY, willChange: "transform" }}
        >
          <img src="/clouds.png" alt="" draggable={false}
            className="w-full h-full object-contain object-bottom scale-x-[-1]" style={{ opacity: 0.85 }} />
        </motion.div>

        {/* Top puff to soften the upper edge */}
        <motion.div
          className="absolute bottom-[40%] left-[15%] w-[70%]"
          style={{ height: "45%", y: mobileY2, willChange: "transform" }}
        >
          <img src="/cloud2.png" alt="" draggable={false}
            className="w-full h-full object-contain object-bottom scale-x-[-1]" style={{ opacity: 0.7, filter: "blur(1px)" }} />
        </motion.div>

        {/* Golden light ray */}
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

  // ══════════════════════════════════════════
  // DESKTOP LAYOUT — left/right parting curtain
  // ══════════════════════════════════════════
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-none overflow-hidden"
      style={{ height: "65vh", opacity }}
    >
      {/* LEFT HALF — sweeps left */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ width: "58%", height: "100%", x: leftX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0"
        style={{ width: "55%", height: "65%", x: leftX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* RIGHT HALF — sweeps right */}
      <motion.div
        className="absolute top-0 right-0"
        style={{ width: "58%", height: "100%", x: rightX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0"
        style={{ width: "55%", height: "65%", x: rightX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* CENTRE BOTTOM — 3 natural puffs */}
      <motion.div
        className="absolute bottom-0"
        style={{ left: "15%", width: "40%", height: "55%", y: downY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom" />
      </motion.div>

      <motion.div
        className="absolute bottom-0"
        style={{ left: "28%", width: "44%", height: "62%", y: downY, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      <motion.div
        className="absolute bottom-0"
        style={{ right: "15%", width: "40%", height: "55%", y: downY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      {/* GOLDEN LIGHT RAY */}
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
