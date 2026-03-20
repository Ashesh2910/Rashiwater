import React from 'react';
import { motion } from 'framer-motion';

const zodiacSigns = [
    { name: 'Aries', symbol: '♈' },
    { name: 'Taurus', symbol: '♉' },
    { name: 'Gemini', symbol: '♊' },
    { name: 'Cancer', symbol: '♋' },
    { name: 'Leo', symbol: '♌' },
    { name: 'Virgo', symbol: '♍' },
    { name: 'Libra', symbol: '♎' },
    { name: 'Scorpio', symbol: '♏' },
    { name: 'Sagittarius', symbol: '♐' },
    { name: 'Capricorn', symbol: '♑' },
];

const itemV = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
};

const ZodiacFeatures = () => {
    return (
        <section style={{ width: '100%', padding: '80px 0 100px', background: '#0a0000' }}>
            {/* Header */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(20px, 2.5vw, 28px)',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#f5f5f5',
                        marginBottom: '32px',
                    }}
                >
                    YOUR PATH TO UNDERSTANDING{' '}
                    <span style={{ color: '#d82323' }}>ZODIAC</span>
                </motion.h2>

                {/* Main grid: zodiac icons left, discover card right */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>

                    {/* Zodiac icon grid */}
                    <div style={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '4px',
                        background: '#150000',
                        border: '1px solid #2a0a0a',
                        padding: '8px',
                        borderRadius: '8px',
                    }}>
                        {zodiacSigns.map((sign, i) => (
                            <motion.div
                                key={sign.name}
                                custom={i}
                                variants={itemV}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                whileHover={{ background: 'rgba(216,35,35,0.12)', borderColor: 'rgba(216,35,35,0.3)' }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '16px 8px',
                                    border: '1px solid transparent',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s, border-color 0.2s',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ fontSize: '28px', color: '#f5f5f5', lineHeight: 1 }}>
                                    {sign.symbol}
                                </span>
                                <span style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '10px',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: '#a39b9b',
                                    fontWeight: 500,
                                }}>
                                    {sign.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Discover card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{
                            width: '280px',
                            flexShrink: 0,
                            background: '#150000',
                            border: '1px solid #2a0a0a',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Image area */}
                        <div style={{
                            width: '100%',
                            height: '140px',
                            background: 'linear-gradient(135deg, #1a0808 0%, #3a1010 100%)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1532968961801-d0f07c97edfd?auto=format&fit=crop&w=600&q=80"
                                alt="Mystical"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                            />
                        </div>

                        {/* Text area */}
                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <h3 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#f5f5f5',
                                lineHeight: 1.3,
                                margin: 0,
                            }}>
                                DISCOVER EVERYTHING YOURSELF WITH RASHI
                            </h3>
                            <p style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '12px',
                                color: '#6b6060',
                                lineHeight: 1.7,
                                margin: 0,
                                flex: 1,
                            }}>
                                Explore the depths of your personality and future with our comprehensive charts.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(216,35,35,0.4)' }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                    background: '#d82323',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '999px',
                                    padding: '10px 24px',
                                    fontSize: '12px',
                                    fontFamily: 'Inter, sans-serif',
                                    letterSpacing: '0.06em',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    alignSelf: 'flex-start',
                                }}
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ZodiacFeatures;
