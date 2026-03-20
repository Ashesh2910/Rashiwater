import React from 'react';
import { motion } from 'framer-motion';

const moonPhases = [
    { label: 'New Moon', symbol: '🌑', color: '#6d28d9' },
    { label: 'Waxing Crescent', symbol: '🌒', color: '#7c3aed' },
    { label: 'First Quarter', symbol: '🌓', color: '#8b5cf6' },
    { label: 'Waxing Gibbous', symbol: '🌔', color: '#a78bfa' },
    { label: 'Full Moon', symbol: '🌕', color: '#c4b5fd' },
    { label: 'Waning Gibbous', symbol: '🌖', color: '#a78bfa' },
    { label: 'Last Quarter', symbol: '🌗', color: '#8b5cf6' },
    { label: 'Waning Crescent', symbol: '🌘', color: '#7c3aed' },
];

const MoonPhases = () => (
    <section style={{
        width: '100%', padding: '80px 0 100px',
        position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(139,92,246,0.15)',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
    }}>
        {/* Atmospheric center glow */}
        <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '700px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(109,40,217,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 48px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            {/* Label */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '12px' }}
            >
                Lunar Calendar
            </motion.p>

            {/* Moon phases row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ display: 'flex', justifyContent: 'center', gap: '28px', flexWrap: 'wrap', marginBottom: '56px' }}
            >
                {moonPhases.map((phase, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                        whileHover={{ scale: 1.25, y: -6 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                    >
                        {/* Glowing ring around each moon */}
                        <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Outer pulse ring */}
                            <motion.div
                                animate={{ scale: [1, 1.6, 1], opacity: [0.18, 0, 0.18] }}
                                transition={{ repeat: Infinity, duration: 2.5 + i * 0.2, ease: 'easeInOut' }}
                                style={{
                                    position: 'absolute', width: '64px', height: '64px', borderRadius: '50%',
                                    border: `1px solid ${phase.color}`,
                                }}
                            />
                            {/* Inner glow circle */}
                            <div style={{
                                position: 'absolute', width: '52px', height: '52px', borderRadius: '50%',
                                background: `radial-gradient(circle, ${phase.color}22 0%, transparent 70%)`,
                                border: `1px solid ${phase.color}30`,
                            }} />
                            <span style={{ fontSize: '34px', lineHeight: 1, filter: `drop-shadow(0 0 12px ${phase.color}aa)`, position: 'relative', zIndex: 1 }}>
                                {phase.symbol}
                            </span>
                        </div>
                        <span style={{
                            fontFamily: 'Inter, sans-serif', fontSize: '9px',
                            letterSpacing: '0.12em', color: '#6b5e88',
                            textTransform: 'uppercase', lineHeight: 1.4,
                            textAlign: 'center', maxWidth: '65px',
                        }}>
                            {phase.label}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Heading with gradient */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    fontStyle: 'italic',
                    background: 'linear-gradient(135deg, #f0eeff 0%, #c4b5fd 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '18px',
                }}
            >
                Psychic Readings
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#7060a0', lineHeight: 1.85, maxWidth: '520px', margin: '0 auto 36px' }}
            >
                Unlock the mysteries of your future with our lunar psychic readings.
                Each moon phase carries unique energies that shape your destiny.
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(139,92,246,0.6)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    color: '#fff', border: 'none',
                    borderRadius: '999px', padding: '14px 36px',
                    fontSize: '13px', fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer', fontWeight: 600, letterSpacing: '0.1em',
                    boxShadow: '0 4px 24px rgba(109,40,217,0.35)',
                }}
            >
                ✦ Schedule a Reading Now
            </motion.button>
        </div>
    </section>
);

export default MoonPhases;
