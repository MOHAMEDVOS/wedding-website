"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MagicalClouds() {
  const scrollY = useMotionValue(0);
  const [vh, setVh] = useState(600);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVh(window.innerHeight);
    setIsMobile(window.innerWidth < 768);
    setMounted(true);
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  const progress = useTransform(scrollY, [0, vh * 0.85], [0, 1]);

  const leftX   = useTransform(progress, [0, 1], ["0%", "-120%"]);
  const rightX  = useTransform(progress, [0, 1], ["0%", "120%"]);
  const downY   = useTransform(progress, [0, 1], ["0%", "70%"]);
  const leftX2  = useTransform(progress, [0, 1], ["0%", "-95%"]);
  const rightX2 = useTransform(progress, [0, 1], ["0%", "95%"]);

  const opacity    = useTransform(progress, [0, 0.78, 1], [1, 1, 0]);
  const rayOpacity = useTransform(progress, [0.2, 0.48, 0.78], [0, 0.8, 0]);

  // Don't render until client — avoids SSR/hydration mismatch
  if (!mounted) return null;

  // No clouds on mobile
  if (isMobile) return null;

  // ── DESKTOP ──────────────────────────────────────────────
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-none"
      style={{ height: "65vh", opacity }}
    >
      <motion.div className="absolute top-0 left-0" style={{ width: "58%", height: "100%", x: leftX, willChange: "transform" }}>
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "right bottom", display: "block" }} />
      </motion.div>

      <motion.div className="absolute bottom-0 left-0" style={{ width: "55%", height: "65%", x: leftX2, willChange: "transform" }}>
        <img src="/cloud2.png" alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "right bottom", opacity: 0.9, display: "block" }} />
      </motion.div>

      <motion.div className="absolute top-0 right-0" style={{ width: "58%", height: "100%", x: rightX, willChange: "transform" }}>
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left bottom", transform: "scaleX(-1)", display: "block" }} />
      </motion.div>

      <motion.div className="absolute bottom-0 right-0" style={{ width: "55%", height: "65%", x: rightX2, willChange: "transform" }}>
        <img src="/cloud2.png" alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left bottom", transform: "scaleX(-1)", opacity: 0.9, display: "block" }} />
      </motion.div>

      <motion.div className="absolute bottom-0" style={{ left: "15%", width: "40%", height: "55%", y: downY, willChange: "transform" }}>
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", display: "block" }} />
      </motion.div>

      <motion.div className="absolute bottom-0" style={{ left: "28%", width: "44%", height: "62%", y: downY, willChange: "transform" }}>
        <img src="/cloud2.png" alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", transform: "scaleX(-1)", display: "block" }} />
      </motion.div>

      <motion.div className="absolute bottom-0" style={{ right: "15%", width: "40%", height: "55%", y: downY, willChange: "transform" }}>
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom", transform: "scaleX(-1)", display: "block" }} />
      </motion.div>

      <motion.div className="absolute inset-0"
        style={{
          background: "conic-gradient(from 270deg at 50% 110%, transparent 30%, rgba(212,175,55,0.15) 42%, rgba(255,240,180,0.25) 50%, rgba(212,175,55,0.15) 58%, transparent 70%)",
          filter: "blur(10px)", opacity: rayOpacity,
        }}
      />
    </motion.div>
  );
}
