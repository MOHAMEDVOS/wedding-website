"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    size: number;
    baseOpacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
}

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;
        let stars: Star[] = [];

        const buildStars = (w: number, h: number) => {
            const count = Math.min(180, Math.floor((w * h) / 5500));
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 1.6 + 0.3,
                baseOpacity: Math.random() * 0.55 + 0.2,
                twinkleSpeed: Math.random() * 0.7 + 0.25,
                twinkleOffset: Math.random() * Math.PI * 2,
            }));
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            buildStars(canvas.width, canvas.height);
        };

        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.016;

            for (const star of stars) {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
                const o = Math.max(0, star.baseOpacity * (0.35 + twinkle * 0.65));

                // Glow halo for larger stars
                if (star.size > 1.1) {
                    const grad = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 5
                    );
                    grad.addColorStop(0, `rgba(212,175,55,${(o * 0.38).toFixed(3)})`);
                    grad.addColorStop(1, "rgba(212,175,55,0)");
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
                    ctx.fillStyle = grad;
                    ctx.fill();
                }

                // Core dot — warm ivory-gold
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(252,246,186,${o.toFixed(3)})`;
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1, opacity: 0.7 }}
            aria-hidden="true"
        />
    );
}
