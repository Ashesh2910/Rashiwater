import React, { useEffect, useRef } from 'react';

// Saptarishi (Big Dipper / Ursa Major) — 7 Vedic sages
// Positions are fractions [0..1] of canvas width/height
const SAPTARISHI = [
    { name: 'Kratu', sanskrit: 'क्रतु', rx: 0.69, ry: 0.10, r: 2.8 },
    { name: 'Pulaha', sanskrit: 'पुलह', rx: 0.73, ry: 0.14, r: 2.5 },
    { name: 'Pulastya', sanskrit: 'पुलस्त्य', rx: 0.76, ry: 0.17, r: 2.5 },
    { name: 'Atri', sanskrit: 'अत्रि', rx: 0.72, ry: 0.21, r: 2.6 },
    { name: 'Angiras', sanskrit: 'अंगिरस', rx: 0.66, ry: 0.19, r: 2.8 },
    { name: 'Vasishtha', sanskrit: 'वशिष्ठ', rx: 0.61, ry: 0.14, r: 2.6 },
    { name: 'Marichi', sanskrit: 'मरीचि', rx: 0.57, ry: 0.09, r: 3.0 },
];
// Line connections: handle 6→5→4, bowl 4→3→2→1→0 and close 0→4
const CONNECTIONS = [[6, 5], [5, 4], [4, 3], [3, 2], [2, 1], [1, 0], [0, 4]];

const StarryBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Scroll parallax for constellation
        let scrollTarget = 0;
        let scrollCurrent = 0;
        const onScroll = () => { scrollTarget = window.scrollY; };
        window.addEventListener('scroll', onScroll, { passive: true });

        // Background drifting stars
        const stars = Array.from({ length: 280 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.4 + 0.2,
            vx: (Math.random() - 0.5) * 0.15,
            vy: -(Math.random() * 0.12 + 0.04),
            opacity: Math.random() * 0.6 + 0.3,
            twinkleSpeed: Math.random() * 0.008 + 0.003,
            twinkleDir: Math.random() > 0.5 ? 1 : -1,
            isPurple: Math.random() > 0.65,
        }));

        // Per-sage twinkle phase offset so they don't all pulse together
        const sapPhase = SAPTARISHI.map(() => Math.random() * Math.PI * 2);

        const shootingStars = [];
        let frameCount = 0;

        const spawnShootingStar = () => {
            shootingStars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.5,
                length: Math.random() * 120 + 60,
                speed: Math.random() * 6 + 4,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
                opacity: 1,
                life: 0,
                maxLife: 40 + Math.random() * 20,
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ── Regular drifting stars ──────────────────────────
            stars.forEach(star => {
                star.opacity += star.twinkleSpeed * star.twinkleDir;
                if (star.opacity >= 1) star.twinkleDir = -1;
                if (star.opacity <= 0.15) star.twinkleDir = 1;

                star.x += star.vx;
                star.y += star.vy;

                if (star.y < -5) { star.y = canvas.height + 5; star.x = Math.random() * canvas.width; }
                if (star.x < -5) { star.x = canvas.width + 5; }
                if (star.x > canvas.width + 5) { star.x = -5; }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.isPurple
                    ? `rgba(180,140,255,${star.opacity})`
                    : `rgba(240,235,255,${star.opacity})`;
                ctx.fill();
            });

            // Note: Removed proximity line loop (O(N^2)) to improve performance

            // ── Saptarishi Constellation ───────────────────────
            // Smooth scroll easing (spring)
            scrollCurrent += (scrollTarget - scrollCurrent) * 0.06;
            // Parallax: moves at 30% of scroll speed
            const scrollParallax = scrollCurrent * 0.30;

            const pts = SAPTARISHI.map((s, i) => ({
                x: s.rx * canvas.width,
                // scrollParallax shifts whole constellation down as user scrolls
                y: (s.ry * canvas.height) + scrollParallax,
                r: s.r,
                tw: 0.6 + 0.4 * Math.sin(frameCount * 0.016 + sapPhase[i]),
                data: s,
            }));

            // Connecting lines (draw first, beneath stars)
            CONNECTIONS.forEach(([a, b]) => {
                const pa = pts[a], pb = pts[b];
                const lineAlpha = 0.22 * ((pa.tw + pb.tw) / 2);
                ctx.save();
                const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
                grad.addColorStop(0, `rgba(255,215,100,${lineAlpha})`);
                grad.addColorStop(0.5, `rgba(240,195,90,${lineAlpha * 0.8})`);
                grad.addColorStop(1, `rgba(255,215,100,${lineAlpha})`);
                ctx.beginPath();
                ctx.moveTo(pa.x, pa.y);
                ctx.lineTo(pb.x, pb.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 0.9;
                ctx.stroke();
                ctx.restore();
            });

            // Each sage star
            pts.forEach((pt) => {
                const alpha = pt.tw;

                // Broad outer glow halo
                const halo = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.r * 8);
                halo.addColorStop(0, `rgba(255,230,140,${0.5 * alpha})`);
                halo.addColorStop(0.5, `rgba(255,200,80,${0.18 * alpha})`);
                halo.addColorStop(1, 'rgba(255,180,60,0)');
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pt.r * 8, 0, Math.PI * 2);
                ctx.fillStyle = halo;
                ctx.fill();

                // Inner tight glow
                const inner = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.r * 2.5);
                inner.addColorStop(0, `rgba(255,250,220,${alpha})`);
                inner.addColorStop(1, `rgba(255,210,100,0)`);
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pt.r * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = inner;
                ctx.fill();

                // Bright star core
                ctx.save();
                ctx.shadowColor = 'rgba(255,220,100,0.9)';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pt.r * alpha, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,248,210,${0.92 * alpha})`;
                ctx.fill();
                ctx.restore();

                // Sanskrit name label
                if (canvas.width > 700) {
                    ctx.save();
                    ctx.font = '11px "Noto Sans Devanagari", "Mangal", serif';
                    ctx.fillStyle = `rgba(255,215,110,${0.5 * alpha})`;
                    ctx.textAlign = 'center';
                    ctx.fillText(pt.data.sanskrit, pt.x, pt.y - pt.r * 7 - 2);
                    ctx.restore();
                }
            });

            // "SAPTARISHI" heading label above constellation
            if (canvas.width > 700) {
                const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
                const topY = Math.min(...pts.map(p => p.y)) - 40;
                const pulse = 0.3 + 0.12 * Math.sin(frameCount * 0.012);
                ctx.save();
                ctx.font = '500 9px "Inter", sans-serif';
                ctx.fillStyle = `rgba(255,210,100,${pulse})`;
                ctx.textAlign = 'center';
                ctx.letterSpacing = '4px';
                ctx.fillText('✦  S A P T A R I S H I  ✦', cx, topY);
                ctx.restore();
            }
            // ── Shooting stars ─────────────────────────────────
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                s.life++;
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity = 1 - s.life / s.maxLife;

                if (s.opacity <= 0 || s.life >= s.maxLife) { shootingStars.splice(i, 1); continue; }

                const grad = ctx.createLinearGradient(
                    s.x, s.y,
                    s.x - Math.cos(s.angle) * s.length,
                    s.y - Math.sin(s.angle) * s.length
                );
                grad.addColorStop(0, `rgba(200,180,255,${s.opacity})`);
                grad.addColorStop(1, 'rgba(139,92,246,0)');
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            frameCount++;
            if (frameCount % 200 === 0 && shootingStars.length < 3) spawnShootingStar();

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default StarryBackground;
