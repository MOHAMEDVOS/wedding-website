"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MagicalClouds() {
  const scrollY = useMotionValue(0);
  const [vh, setVh] = useState(600);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const h = window.innerHeight;
    setVh(h);
    setIsMobile(window.innerWidth < 768);
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  // Single progress value drives everything — smooth, 1 RAF tick
  const progress = useTransform(scrollY, [0, vh * 0.85], [0, 1]);

  // ── SHARED: fade out
  const opacity = useTransform(progress, [0, 0.78, 1], [1, 1, 0]);

  // ── MOBILE transforms (only 2 layers + 1 centre)
  const mLX = useTransform(progress, [0, 1], [0, -window.innerWidth * 1.1]);
  const mRX = useTransform(progress, [0, 1], [0,  window.innerWidth * 1.1]);
  const mCY = useTransform(progress, [0, 1], [0,  vh * 0.55]);

  // ── DESKTOP transforms
  const dLX  = useTransform(progress, [0, 1], [0, -window.innerWidth * 1.15]);
  const dLX2 = useTransform(progress, [0, 1], [0, -window.innerWidth * 0.95]);
  const dRX  = useTransform(progress, [0, 1], [0,  window.innerWidth * 1.15]);
  const dRX2 = useTransform(progress, [0, 1], [0,  window.innerWidth * 0.95]);
  const dCY  = useTransform(progress, [0, 1], [0,  vh * 0.65]);

  const rayOpacity = useTransform(progress, [0.2, 0.48, 0.78], [0, 0.8, 0]);

  if (isMobile) {
    return (
      <motion.div
        className="fixed bottom-0 left-0 w-full z-50 pointer-events-none"
        style={{ height: "52vh", opacity }}
      >
        {/* LEFT wing — clouds.png, sweeps left */}
        <motion.div
          className="absolute bottom-0 left-0 w-[62%] h-full"
          style={{ x: mLX, willChange: "transform" }}
        >
          <img
            src="/clouds.png" alt="" draggable={false}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "right bottom",
              display: "block",
            }}
          />
        </motion.div>

        {/* RIGHT wing — clouds.png mirrored, sweeps right */}
        <motion.div
          className="absolute bottom-0 right-0 w-[62%] h-full"
          style={{ x: mRX, willChange: "transform" }}
        >
          <img
            src="/clouds.png" alt="" draggable={false}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "left bottom",
              transform: "scaleX(-1)",
              display: "block",
            }}
          />
        </motion.div>

        {/* CENTRE puff — cloud2.png, fills the seam, drops down */}
        <motion.div
          className="absolute bottom-0 left-[8%] w-[84%]"
          style={{ height: "72%", y: mCY, willChange: "transform" }}
        >
          <img
            src="/cloud2.png" alt="" draggable={false}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center bottom",
              display: "block",
            }}
          />
        </motion.div>

        {/* Golden ray */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from 270deg at 50% 110%, transparent 28%, rgba(212,175,55,0.13) 40%, rgba(255,240,180,0.22) 50%, rgba(212,175,55,0.13) 60%, transparent 72%)",
            filter: "blur(14px)",
            opacity: rayOpacity,
          }}
        />
      </motion.div>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────────
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full z-50 pointer-events-none"
      style={{ height: "65vh", opacity }}
    >
      {/* LEFT main */}
      <motion.div
        className="absolute top-0 left-0 w-[58%] h-full"
        style={{ x: dLX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"right bottom", display:"block" }} />
      </motion.div>

      {/* LEFT depth */}
      <motion.div
        className="absolute bottom-0 left-0 w-[55%]"
        style={{ height: "65%", x: dLX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"right bottom", opacity:0.9, display:"block" }} />
      </motion.div>

      {/* RIGHT main */}
      <motion.div
        className="absolute top-0 right-0 w-[58%] h-full"
        style={{ x: dRX, willChange: "transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"left bottom", transform:"scaleX(-1)", display:"block" }} />
      </motion.div>

      {/* RIGHT depth */}
      <motion.div
        className="absolute bottom-0 right-0 w-[55%]"
        style={{ height: "65%", x: dRX2, willChange: "transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"left bottom", transform:"scaleX(-1)", opacity:0.9, display:"block" }} />
      </motion.div>

      {/* CENTRE left puff */}
      <motion.div
        className="absolute bottom-0"
        style={{ left:"15%", width:"40%", height:"55%", y: dCY, willChange:"transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center bottom", display:"block" }} />
      </motion.div>

      {/* CENTRE main puff */}
      <motion.div
        className="absolute bottom-0"
        style={{ left:"28%", width:"44%", height:"62%", y: dCY, willChange:"transform" }}
      >
        <img src="/cloud2.png" alt="" draggable={false}
          style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center bottom", transform:"scaleX(-1)", display:"block" }} />
      </motion.div>

      {/* CENTRE right puff */}
      <motion.div
        className="absolute bottom-0"
        style={{ right:"15%", width:"40%", height:"55%", y: dCY, willChange:"transform" }}
      >
        <img src="/clouds.png" alt="" draggable={false}
          style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center bottom", transform:"scaleX(-1)", display:"block" }} />
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
