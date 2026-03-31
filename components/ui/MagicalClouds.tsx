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

  // Extended range for smoother feel
  const progress = useTransform(scrollY, [0, vh * 0.9], [0, 1]);

  // Desktop
  const dLeftX   = useTransform(progress, [0, 1], ["0%", "-115%"]);
  const dLeftX2  = useTransform(progress, [0, 1], ["0%", "-95%"]);
  const dRightX  = useTransform(progress, [0, 1], ["0%", "115%"]);
  const dRightX2 = useTransform(progress, [0, 1], ["0%", "95%"]);
  const dDownY   = useTransform(progress, [0, 1], ["0%", "70%"]);

  // Mobile — gentler movement
  const mLeftX  = useTransform(progress, [0, 1], ["0%", "-108%"]);
  const mRightX = useTransform(progress, [0, 1], ["0%", "108%"]);
  const mDownY  = useTransform(progress, [0, 1], ["0%", "60%"]);

  // Stays solid until 80% scrolled, then fades
  const opacity    = useTransform(progress, [0, 0.8, 1], [1, 1, 0]);
  const rayOpacity = useTransform(progress, [0.25, 0.5, 0.82], [0, 0.85, 0]);

  if (isMobile) {
    return (
      // NO overflow-hidden here — that was clipping the clouds
      <motion.div
        className="fixed bottom-0 left-0 w-full z-50 pointer-events-none"
        style={{ height: "55vh", opacity }}
      >
        {/* LEFT — cloud2, 75% wide, anchored bottom-left */}
        <motion.div
          className="absolute bottom-0 left-0"
          style={{ width: "75%", height: "100%", x: mLeftX, willChange: "transform" }}
        >
          <img
            src="/cloud2.png" alt="" draggable={false}
            className="w-full h-full object-contain object-bottom-right"
            style={{ objectPosition: "right bottom" }}
          />
        </motion.div>

        {/* RIGHT — cloud2, 75% wide, mirrored, anchored bottom-right */}
        <motion.div
          className="absolute bottom-0 right-0"
          style={{ width: "75%", height: "100%", x: mRightX, willChange: "transform" }}
        >
          <img
            src="/cloud2.png" alt="" draggable={false}
            className="w-full h-full object-contain scale-x-[-1]"
            style={{ objectPosition: "left bottom" }}
          />
        </motion.div>

        {/* CENTRE bottom — cloud2, full natural shape, drops down */}
        <motion.div
          className="absolute bottom-0 left-[12%]"
          style={{ width: "76%", height: "70%", y: mDownY, willChange: "transform" }}
        >
          <img
            src="/cloud2.png" alt="" draggable={false}
            className="w-full h-full object-contain object-bottom"
          />
        </motion.div>

        {/* Ray */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from 270deg at 50% 110%, transparent 30%, rgba(212,175,55,0.12) 42%, rgba(255,240,180,0.2) 50%, rgba(212,175,55,0.12) 58%, transparent 70%)",
            filter: "blur(14px)",
            opacity: rayOpacity,
          }}
        />
      </motion.div>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-none"
      style={{ height: "65vh", opacity }}
    >
      {/* LEFT main */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ width: "58%", height: "100%", x: dLeftX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" />
      </motion.div>

      {/* LEFT depth */}
      <motion.div
        className="absolute bottom-0 left-0"
        style={{ width: "55%", height: "65%", x: dLeftX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-right" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* RIGHT main */}
      <motion.div
        className="absolute top-0 right-0"
        style={{ width: "58%", height: "100%", x: dRightX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" />
      </motion.div>

      {/* RIGHT depth */}
      <motion.div
        className="absolute bottom-0 right-0"
        style={{ width: "55%", height: "65%", x: dRightX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-cover object-left scale-x-[-1]" style={{ opacity: 0.9 }} />
      </motion.div>

      {/* CENTRE left puff */}
      <motion.div
        className="absolute bottom-0"
        style={{ left: "15%", width: "40%", height: "55%", y: dDownY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom" />
      </motion.div>

      {/* CENTRE main puff */}
      <motion.div
        className="absolute bottom-0"
        style={{ left: "28%", width: "44%", height: "62%", y: dDownY, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      {/* CENTRE right puff */}
      <motion.div
        className="absolute bottom-0"
        style={{ right: "15%", width: "40%", height: "55%", y: dDownY, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          className="w-full h-full object-contain object-bottom scale-x-[-1]" />
      </motion.div>

      {/* Ray */}
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
