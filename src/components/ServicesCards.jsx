import React from 'react';
import { motion } from 'framer-motion';

// Mini zodiac wheel SVG for each card
const MiniZodiacRing = ({ size = 260, accentColor = '#8b5cf6' }) => {
    const cx = size / 2;
    const cy = size / 2;
    const R_outer = size / 2 - 4;
    const R_mid = R_outer - 30;
    const R_inner = R_mid - 22;
    const NUM = 12;
    const SLICE = (2 * Math.PI) / NUM;

    const ZODIAC = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    const COLORS = ['#ff6b8a', '#ff9f43', '#ffd32a', '#0be881', '#ff9f43', '#c4b5fd', '#54a0ff', '#ff4757', '#a29bfe', '#00cec9', '#74b9ff', '#fd79a8'];

    const pos = (r, i) => ({
        x: cx + r * Math.cos(SLICE * i - Math.PI / 2 + SLICE / 2),
        y: cy + r * Math.sin(SLICE * i - Math.PI / 2 + SLICE / 2),
    });

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
                <radialGradient id={`rg_${size}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={accentColor} stopOpacity="0.05" />
                    <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Outer glow */}
            <circle cx={cx} cy={cy} r={R_outer} fill={`url(#rg_${size})`} stroke={`${accentColor}55`} strokeWidth="1.5" />

            {/* Mid ring */}
            <circle cx={cx} cy={cy} r={R_mid} stroke={`${accentColor}40`} strokeWidth="1" fill="none" />

            {/* Inner ring */}
            <circle cx={cx} cy={cy} r={R_inner} stroke={`${accentColor}35`} strokeWidth="1" fill="rgba(8,6,28,0.6)" />

            {/* Divider lines and symbols */}
            {ZODIAC.map((sym, i) => {
                const startAngle = SLICE * i - Math.PI / 2;
                const outerP = { x: cx + R_outer * Math.cos(startAngle), y: cy + R_outer * Math.sin(startAngle) };
                const innerP = { x: cx + R_inner * Math.cos(startAngle), y: cy + R_inner * Math.sin(startAngle) };
                const midP = pos(R_mid - 12, i);
                const dotP = pos(R_outer - 16, i);

                return (
                    <g key={i}>
                        {/* Divider */}
                        <line x1={innerP.x} y1={innerP.y} x2={outerP.x} y2={outerP.y} stroke={`${accentColor}25`} strokeWidth="0.7" />
                        {/* Colored dot in outer band */}
                        <circle cx={dotP.x} cy={dotP.y} r="9" fill={COLORS[i]} opacity="0.85" />
                        {/* Zodiac symbol */}
                        <text x={midP.x} y={midP.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill={`${accentColor}cc`}>
                            {sym}
                        </text>
                    </g>
                );
            })}

            {/* Center black circle (empty / profile space) */}
            <circle cx={cx} cy={cy} r={R_inner - 4} fill="rgba(5,3,18,0.95)" stroke={`${accentColor}30`} strokeWidth="1" />
        </svg>
    );
};

const cards = [
    {
        title: 'KNOW YOUR DAY',
        desc: 'Get personalized daily cosmic guidance based on your birth chart and current planetary alignments.',
        cta: 'Check Today',
        accent: '#8b5cf6',
        delay: 0,
    },
    {
        title: 'BIRTH BLUEPRINT',
        desc: 'Uncover your complete natal chart — your cosmic DNA — revealing strengths, challenges, and life purpose.',
        cta: 'Get Blueprint',
        accent: '#e879f9',
        delay: 0.12,
        featured: true,
    },
    {
        title: 'KNOW YOUR TEAM',
        desc: 'Analyze astrological compatibility within your team or relationship to unlock better communication.',
        cta: 'Analyse Now',
        accent: '#38bdf8',
        delay: 0.24,
    },
];

const ServicesCards = () => (
    <section style={{
        width: '100%',
        padding: '80px 0 100px',
        background: 'linear-gradient(180deg, rgba(12,8,35,0.3) 0%, rgba(8,6,28,0.3) 100%)',
        borderTop: '1px solid rgba(139,92,246,0.1)',
    }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '10px' }}
                >
                    Our Services
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: '#f0eeff', margin: 0 }}
                >
                    Cosmic Readings, Tailored For You
                </motion.h2>
            </div>

            {/* 3 Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'end' }}>
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: i === 1 ? -20 : 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: card.delay }}
                        whileHover={{ y: i === 1 ? -28 : -8, boxShadow: `0 24px 60px ${card.accent}22` }}
                        style={{
                            background: 'rgba(12,8,38,0.9)',
                            border: `1px solid ${card.accent}30`,
                            borderRadius: '20px',
                            padding: '32px 24px 28px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.35s ease',
                            backdropFilter: 'blur(12px)',
                            ...(card.featured ? {
                                border: `1px solid ${card.accent}50`,
                                background: 'rgba(16,8,48,0.95)',
                                boxShadow: `0 0 40px ${card.accent}18`,
                            } : {}),
                        }}
                    >
                        {/* Rotating mini zodiac ring */}
                        <motion.div
                            animate={{ rotate: i === 1 ? -360 : 360 }}
                            transition={{ repeat: Infinity, duration: i === 1 ? 60 : 80, ease: 'linear' }}
                        >
                            <MiniZodiacRing size={220} accentColor={card.accent} />
                        </motion.div>

                        {/* Title badge */}
                        <div style={{
                            border: `1px solid ${card.accent}60`,
                            borderRadius: '6px',
                            padding: '10px 20px',
                            textAlign: 'center',
                            width: '100%',
                        }}>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '15px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: '#f0eeff',
                                margin: 0,
                            }}>
                                {card.title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            color: '#6b5e88',
                            lineHeight: 1.7,
                            margin: 0,
                            textAlign: 'center',
                        }}>
                            {card.desc}
                        </p>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${card.accent}55` }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                background: card.featured ? card.accent : 'transparent',
                                color: card.featured ? '#fff' : card.accent,
                                border: `1px solid ${card.accent}60`,
                                borderRadius: '999px',
                                padding: '11px 28px',
                                fontSize: '12px',
                                fontFamily: 'Inter, sans-serif',
                                cursor: 'pointer',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                transition: 'all 0.2s',
                            }}
                        >
                            {card.cta}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default ServicesCards;
