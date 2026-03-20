import React from 'react';
import { motion } from 'framer-motion';

/**
 * RashiLogo – SVG zodiac wheel logo
 * Outer ring (with 12 zodiac medallions) rotates continuously.
 * Inner circle with "राशी" text stays static.
 */
const RashiLogo = ({ size = 52 }) => {
    const cx = 100;
    const cy = 100;
    const R_outer = 96;   // outermost decorative border
    const R_ring = 82;   // center of zodiac sign medallions
    const R_inner = 60;   // inner border of sign ring
    const R_center = 54;   // inner dark circle radius
    const MEDALLION_R = 13; // radius of each sign circle
    const NUM = 12;
    const SLICE = (2 * Math.PI) / NUM;

    const SIGNS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    const GOLD = '#c9a84c';
    const GOLD_LIGHT = '#f0d080';
    const GOLD_DARK = '#8b6914';
    const DARK = '#0a0800';

    const pos = (r, i) => ({
        x: cx + r * Math.cos(SLICE * i - Math.PI / 2),
        y: cy + r * Math.sin(SLICE * i - Math.PI / 2),
    });



    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            {/* ── Rotating outer ring ── */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                style={{
                    position: 'absolute', top: 0, left: 0,
                    width: size, height: size,
                    transformOrigin: 'center center',
                }}
            >
                <svg width={size} height={size} viewBox="0 0 200 200">
                    <defs>
                        <radialGradient id="goldRing" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={GOLD_LIGHT} />
                            <stop offset="60%" stopColor={GOLD} />
                            <stop offset="100%" stopColor={GOLD_DARK} />
                        </radialGradient>
                        <radialGradient id="medallionBg" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#1a1400" />
                            <stop offset="100%" stopColor="#0a0800" />
                        </radialGradient>
                    </defs>

                    {/* Outer decorative border ring */}
                    <circle cx={cx} cy={cy} r={R_outer} fill="url(#goldRing)" />
                    <circle cx={cx} cy={cy} r={R_outer - 4} fill={DARK} />
                    <circle cx={cx} cy={cy} r={R_outer - 6} fill="none" stroke={GOLD} strokeWidth="0.6" />

                    {/* Inner border of sign ring */}
                    <circle cx={cx} cy={cy} r={R_inner} fill="url(#goldRing)" />
                    <circle cx={cx} cy={cy} r={R_inner - 3} fill={DARK} />

                    {/* Slice dividers */}
                    {SIGNS.map((_, i) => {
                        const angle = SLICE * i - Math.PI / 2;
                        const inner = { x: cx + (R_inner - 3) * Math.cos(angle), y: cy + (R_inner - 3) * Math.sin(angle) };
                        const outer = { x: cx + (R_outer - 4) * Math.cos(angle), y: cy + (R_outer - 4) * Math.sin(angle) };
                        return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={GOLD} strokeWidth="0.5" opacity="0.4" />;
                    })}

                    {/* Zodiac sign medallions */}
                    {SIGNS.map((sym, i) => {
                        const p = pos(R_ring, i);
                        return (
                            <g key={i}>
                                {/* Medallion ring */}
                                <circle cx={p.x} cy={p.y} r={MEDALLION_R + 2} fill={GOLD} />
                                <circle cx={p.x} cy={p.y} r={MEDALLION_R} fill="url(#medallionBg)" />
                                {/* Sign symbol */}
                                <text
                                    x={p.x} y={p.y}
                                    textAnchor="middle" dominantBaseline="middle"
                                    fontSize="11" fill={GOLD_LIGHT}
                                    fontFamily="serif"
                                >
                                    {sym}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </motion.div>

            {/* ── Static center ── */}
            <div style={{
                position: 'absolute', top: 0, left: 0,
                width: size, height: size,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
            }}>
                <svg width={size} height={size} viewBox="0 0 200 200">
                    <defs>
                        <radialGradient id="centerBg" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#1a1400" />
                            <stop offset="100%" stopColor={DARK} />
                        </radialGradient>
                        <linearGradient id="textGold" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={GOLD_LIGHT} />
                            <stop offset="50%" stopColor={GOLD} />
                            <stop offset="100%" stopColor={GOLD_DARK} />
                        </linearGradient>
                    </defs>
                    {/* Dark center disc */}
                    <circle cx={cx} cy={cy} r={R_center} fill="url(#centerBg)" />
                    <circle cx={cx} cy={cy} r={R_center} fill="none" stroke={GOLD} strokeWidth="0.8" />
                    {/* "राशी" text */}
                    <text
                        x={cx} y={cy + 4}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="22" fontWeight="bold"
                        fill="url(#textGold)"
                        fontFamily="'Noto Sans Devanagari', 'Mangal', serif"
                    >
                        राशी
                    </text>
                </svg>
            </div>
        </div>
    );
};

export default RashiLogo;
