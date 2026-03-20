import React, { useState } from 'react';
import { motion } from 'framer-motion';
import zodiacData from '../data/zodiacData';
import ZodiacDetailModal from './ZodiacDetailModal';

const ZodiacFan = () => {
    const [selectedSign, setSelectedSign] = useState(null);

    return (
        <section style={{
            width: '100%', padding: '80px 0 80px',
            background: 'rgba(8,6,28,0.2)',
            overflow: 'hidden'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <motion.p
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '10px' }}
                    >
                        Zodiac Signs
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        style={{
                            fontFamily: 'Great Vibes, cursive',
                            fontSize: 'clamp(48px, 6vw, 68px)',
                            background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            margin: '0 0 10px', fontWeight: 400,
                        }}
                    >
                        Know Yourself Through Your Sign
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5b4e78' }}
                    >
                        Discover the unique cosmic energy your zodiac sign carries
                    </motion.p>
                </div>

                {/* Fan card layout */}
                <div style={{ position: 'relative', height: '380px', display: 'flex', justifyContent: 'center' }}>
                    {zodiacData.map((card, i) => {
                        const centerOffset = i - 5.5; // -5.5 to 5.5
                        const rotate = centerOffset * 4; // -22 to +22 degrees
                        const x = centerOffset * 45; // -247.5 to +247.5px
                        const yOffset = Math.abs(centerOffset) * Math.abs(centerOffset) * 1.5; // Add arc shape

                        return (
                            <motion.div
                                key={card.name}
                                initial={{ opacity: 0, y: 60 + yOffset, rotate: rotate }}
                                whileInView={{ opacity: 1, y: yOffset, rotate: rotate }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                                whileHover={{
                                    y: yOffset - 25,
                                    rotate: 0,
                                    scale: 1.15,
                                    zIndex: 50,
                                    boxShadow: '0 20px 60px rgba(139,92,246,0.5)',
                                    transition: { duration: 0.25 },
                                }}
                                onClick={() => setSelectedSign(card)}
                                style={{
                                    position: 'absolute',
                                    left: `calc(50% + ${x}px - 70px)`,
                                    bottom: 0,
                                    width: '140px',
                                    height: '200px',
                                    background: 'rgba(15,10,45,0.92)',
                                    border: '1px solid rgba(139,92,246,0.25)',
                                    borderRadius: '10px',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    gap: '14px',
                                    cursor: 'pointer',
                                    transformOrigin: 'bottom center',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 20 - Math.floor(Math.abs(centerOffset)),
                                }}
                            >
                                {/* Constellation lines decoration */}
                                <svg width="80" height="80" viewBox="0 0 80 80" style={{ opacity: 0.6 }}>
                                    <circle cx="40" cy="40" r="36" stroke="rgba(180,140,255,0.2)" strokeWidth="0.8" fill="none" />
                                    {/* Random star dots */}
                                    {[[20, 20], [60, 15], [70, 50], [50, 65], [15, 55], [40, 30], [55, 40]].map(([sx, sy], j) => (
                                        <circle key={j} cx={sx} cy={sy} r="2" fill="rgba(200,180,255,0.8)" />
                                    ))}
                                    {/* Connect with lines */}
                                    <polyline
                                        points="20,20 40,30 60,15 70,50 55,40 50,65 15,55 20,20"
                                        stroke="rgba(180,140,255,0.35)" strokeWidth="0.8" fill="none"
                                    />
                                    <text x="40" y="44" textAnchor="middle" dominantBaseline="middle"
                                        fontSize="20" fill="rgba(200,180,255,0.9)" fontFamily="serif"
                                    >
                                        {card.symbol}
                                    </text>
                                </svg>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '15px', fontWeight: 600,
                                        color: '#e0d8ff', marginBottom: '4px',
                                    }}>
                                        {card.name}
                                    </div>
                                    <div style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '10px', color: '#4b3e68',
                                        letterSpacing: '0.04em',
                                    }}>
                                        {card.dates}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Zodiac Detail Modal */}
            <ZodiacDetailModal
                sign={selectedSign}
                isOpen={!!selectedSign}
                onClose={() => setSelectedSign(null)}
            />
        </section>
    );
};

export default ZodiacFan;
