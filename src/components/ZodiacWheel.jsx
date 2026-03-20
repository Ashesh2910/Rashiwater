import React from 'react';
import { motion } from 'framer-motion';

const ZODIAC = [
    { name: 'Aries', symbol: '♈', color: '#ff6b8a', icon: '🐏' },
    { name: 'Taurus', symbol: '♉', color: '#ff9f43', icon: '🐂' },
    { name: 'Gemini', symbol: '♊', color: '#ffd32a', icon: '👥' },
    { name: 'Cancer', symbol: '♋', color: '#0be881', icon: '🦀' },
    { name: 'Leo', symbol: '♌', color: '#ff9f43', icon: '🦁' },
    { name: 'Virgo', symbol: '♍', color: '#c4b5fd', icon: '👩' },
    { name: 'Libra', symbol: '♎', color: '#54a0ff', icon: '⚖️' },
    { name: 'Scorpio', symbol: '♏', color: '#ff4757', icon: '🦂' },
    { name: 'Sagittarius', symbol: '♐', color: '#a29bfe', icon: '🏹' },
    { name: 'Capricorn', symbol: '♑', color: '#00cec9', icon: '🐐' },
    { name: 'Aquarius', symbol: '♒', color: '#74b9ff', icon: '🏺' },
    { name: 'Pisces', symbol: '♓', color: '#fd79a8', icon: '🐟' },
];

// SVG-based zodiac wheel: full circle rendered in SVG, clipped to a half-circle using CSS
const ZodiacWheel = () => {
    const cx = 320; // center x
    const cy = 320; // center y
    const R_outer = 300; // outer edge
    const R_label = 270; // zodiac name text
    const R_icon = 230; // constellation icon
    const R_symbol = 175; // colored symbol circles
    const R_inner = 140; // inner ring
    const R_sun = 80;  // sun center
    const NUM = 12;
    const SLICE = (2 * Math.PI) / NUM;

    const polarToXY = (r, angle) => ({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
    });



    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '640px',
            height: '320px', // half height clips to bottom semicircle
            overflow: 'hidden',
            zIndex: 5,
            pointerEvents: 'none',
        }}>
            {/* Rotating wheel */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    top: '-320px',
                    left: 0,
                    width: '640px',
                    height: '640px',
                    transformOrigin: '320px 320px',
                }}
            >
                <svg width="640" height="640" viewBox="0 0 640 640">
                    <defs>
                        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(220,200,255,0.9)" />
                            <stop offset="60%" stopColor="rgba(139,92,246,0.6)" />
                            <stop offset="100%" stopColor="rgba(80,40,180,0.2)" />
                        </radialGradient>
                        {/* Individual colored gradients for each sign circle */}
                        {ZODIAC.map((z, i) => (
                            <radialGradient key={i} id={`sg${i}`} cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor={z.color} stopOpacity="0.9" />
                                <stop offset="100%" stopColor="rgba(20,10,60,0.8)" />
                            </radialGradient>
                        ))}
                    </defs>

                    {/* Outer glow ring */}
                    <circle cx={cx} cy={cy} r={R_outer + 10} stroke="rgba(139,92,246,0.15)" strokeWidth="1" fill="none" />

                    {/* Outer ring */}
                    <circle cx={cx} cy={cy} r={R_outer} stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" fill="none" />

                    {/* Mid ring */}
                    <circle cx={cx} cy={cy} r={R_inner + 20} stroke="rgba(139,92,246,0.3)" strokeWidth="1" fill="none" />

                    {/* Inner background */}
                    <circle cx={cx} cy={cy} r={R_inner} fill="rgba(12,8,40,0.7)" stroke="rgba(139,92,246,0.35)" strokeWidth="1" />

                    {/* Slice separators + labels + icons per zodiac sign */}
                    {ZODIAC.map((z, i) => {
                        const angle = SLICE * i - Math.PI / 2 + SLICE / 2; // midpoint angle of slice
                        const startAngle = SLICE * i - Math.PI / 2;

                        // Slice divider lines
                        const outer = polarToXY(R_outer, startAngle);
                        const inner = polarToXY(R_inner + 20, startAngle);

                        // Label position
                        const labelPos = polarToXY(R_label, angle);
                        // Icon position
                        const iconPos = polarToXY(R_icon, angle);
                        // Symbol circle position
                        const symPos = polarToXY(R_symbol, angle);

                        return (
                            <g key={i}>
                                {/* Divider line */}
                                <line
                                    x1={inner.x} y1={inner.y}
                                    x2={outer.x} y2={outer.y}
                                    stroke="rgba(139,92,246,0.25)" strokeWidth="0.8"
                                />

                                {/* Zodiac name (rotated along arc) */}
                                <text
                                    x={labelPos.x}
                                    y={labelPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    transform={`rotate(${(angle * 180) / Math.PI + 90}, ${labelPos.x}, ${labelPos.y})`}
                                    fontSize="11"
                                    fill="rgba(180, 160, 255, 0.85)"
                                    fontFamily="Inter, sans-serif"
                                    letterSpacing="2"
                                    fontWeight="500"
                                >
                                    {z.name.toUpperCase()}
                                </text>

                                {/* Zodiac symbol text (in outer band) */}
                                <text
                                    x={iconPos.x}
                                    y={iconPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="22"
                                    fill="rgba(200,185,255,0.75)"
                                >
                                    {z.symbol}
                                </text>

                                {/* Colored circle with gradient */}
                                <circle
                                    cx={symPos.x} cy={symPos.y} r="16"
                                    fill={`url(#sg${i})`}
                                    stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"
                                />

                                {/* Symbol inside colored circle */}
                                <text
                                    x={symPos.x} y={symPos.y}
                                    textAnchor="middle" dominantBaseline="middle"
                                    fontSize="13" fill="white" fontWeight="700"
                                >
                                    {z.symbol}
                                </text>
                            </g>
                        );
                    })}

                    {/* Sun in center */}
                    <circle cx={cx} cy={cy} r={R_sun} fill="url(#sunGrad)" />

                    {/* Sun rays */}
                    {Array.from({ length: 24 }).map((_, i) => {
                        const a = (i * 2 * Math.PI) / 24;
                        const r1 = i % 2 === 0 ? R_sun - 8 : R_sun - 4;
                        const r2 = i % 2 === 0 ? R_sun + 14 : R_sun + 8;
                        const s = polarToXY(r1, a);
                        const e = polarToXY(r2, a);
                        return <line key={i} x1={s.x} y1={s.y} x2={e.x} y2={e.y} stroke="rgba(220,200,255,0.5)" strokeWidth={i % 2 === 0 ? "1.2" : "0.8"} />;
                    })}

                    {/* Sun core */}
                    <circle cx={cx} cy={cy} r="30" fill="rgba(180,140,255,0.9)" />
                    <circle cx={cx} cy={cy} r="15" fill="rgba(240,220,255,1)" />
                </svg>
            </motion.div>

            {/* Edge fade so it blends into page top */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '80px',
                background: 'linear-gradient(to top, #08061c 0%, transparent 100%)',
            }} />
        </div>
    );
};

export default ZodiacWheel;
