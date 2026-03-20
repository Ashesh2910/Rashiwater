import React, { useState } from 'react';
import { motion } from 'framer-motion';
import zodiacData from '../data/zodiacData';
import ZodiacDetailModal from '../components/ZodiacDetailModal';

const Discovery = () => {
    const [selectedSign, setSelectedSign] = useState(null);

    return (
        <section style={{
            minHeight: '100vh',
            paddingTop: '160px',
            paddingBottom: '100px',
            position: 'relative'
        }}>
            {/* Background effects */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px' }}>
                    Cosmic Identity
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)',
                        background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        margin: '0 0 20px 0', fontWeight: 400,
                    }}>
                    Discover Your Zodiac Energy
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ fontFamily: 'Inter', fontSize: '16px', color: '#8070a8', maxWidth: '600px', margin: '0 auto 60px', lineHeight: 1.8 }}>
                    Select your sun sign below to reveal your core traits, planetary rulers, and the perfect Rashi Waters alignment tools for your frequency.
                </motion.p>

                {/* Zodiac Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginBottom: '80px' }}
                >
                    {zodiacData.map((sign) => (
                        <motion.button
                            key={sign.name}
                            onClick={() => setSelectedSign(sign)}
                            whileHover={{ y: -5, boxShadow: `0 10px 30px ${sign.color}30`, borderColor: `${sign.color}80` }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: 'rgba(12, 8, 30, 0.6)',
                                border: `1px solid rgba(139, 92, 246, 0.2)`,
                                borderRadius: '16px', padding: '24px 16px',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                                cursor: 'pointer', transition: 'all 0.3s'
                            }}
                        >
                            <img
                                src={`/zodiac/${sign.name.toLowerCase()}.png`}
                                alt={sign.name}
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    objectFit: 'contain',
                                    filter: `drop-shadow(0 0 10px ${sign.color}50)`,
                                }}
                            />
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#f0eeff' }}>{sign.name}</div>
                            <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6b5e88', letterSpacing: '0.05em' }}>{sign.dates}</div>
                        </motion.button>
                    ))}
                </motion.div>
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

export default Discovery;
