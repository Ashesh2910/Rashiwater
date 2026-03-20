import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    { stars: 5, text: 'The purity truly goes beyond the bottle. The 10-step purification combined with Aries crystal energy has completely shifted my daily hydration routine.', name: 'Priya S.', role: 'Mumbai', avatar: '💧', color: '#a78bfa' },
    { stars: 5, text: 'Rashi Waters is synonymous with purity and trust. I can feel the safe, consistent, and mineral-balanced hydration every time I drink from my cosmic bottle.', name: 'Rohan M.', role: 'Delhi', avatar: '✨', color: '#f9a8d4' },
    { stars: 5, text: 'Finding a trusted name in zodiac hydration was hard until I found this. The pyrite wealth magnet bracelet perfectly complements the energized water.', name: 'Ananya K.', role: 'Bangalore', avatar: '🪐', color: '#fcd34d' },
    { stars: 4, text: 'I love the doorway delivery subscription! Getting my chakra-balanced hydration safely delivered straight to my doorstep has been a game changer.', name: 'Vikram P.', role: 'Pune', avatar: '🔮', color: '#6ee7b7' },
];

const Stars = ({ count }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ fontSize: '14px', color: i < count ? '#8b5cf6' : '#2d2050' }}>★</span>
        ))}
    </div>
);

const Testimonials = () => (
    <section style={{
        width: '100%', padding: '72px 0 100px',
        position: 'relative', overflow: 'hidden',
    }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '30%', left: '25%', width: '50%', height: '300px', background: 'radial-gradient(ellipse, rgba(109,40,217,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 2 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px' }}>
                <div>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '10px' }}>
                        Client Stories
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        style={{
                            fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(48px, 6vw, 68px)',
                            background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            margin: 0, fontWeight: 400,
                        }}>
                        What My Clients Say
                    </motion.h2>
                </div>
                {/* Nav arrows */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    {['←', '→'].map((a, i) => (
                        <motion.div key={i}
                            whileHover={{ background: 'rgba(196,51,153,0.2)', borderColor: 'rgba(196,51,153,0.7)', scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '42px', height: '42px', borderRadius: '50%',
                                border: '1px solid rgba(196,51,153,0.25)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#c43399', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s',
                            }}>
                            {a}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
                {testimonials.map((t, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07, duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                        whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(139,92,246,0.15)` }}
                        style={{
                            background: 'linear-gradient(160deg, rgba(16,10,50,0.95) 0%, rgba(8,4,28,0.95) 100%)',
                            border: '1px solid rgba(139,92,246,0.12)',
                            borderRadius: '16px', padding: '26px 22px 64px',
                            position: 'relative',
                            minHeight: '200px',
                            cursor: 'default',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {/* Top accent line */}
                        <div style={{ position: 'absolute', top: 0, left: '24px', right: '24px', height: '1px', background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)` }} />

                        <Stars count={t.stars} />
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#8070a8', lineHeight: 1.8, margin: '16px 0 0', fontStyle: 'italic' }}>
                            &quot;{t.text}&quot;
                        </p>

                        {/* Avatar circle overlapping bottom */}
                        <div style={{
                            position: 'absolute', bottom: '-24px', left: '22px',
                            width: '48px', height: '48px', borderRadius: '50%',
                            background: `radial-gradient(circle, ${t.color}30, rgba(16,8,50,0.95))`,
                            border: `2px solid ${t.color}55`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '22px',
                            boxShadow: `0 0 20px ${t.color}22`,
                        }}>
                            {t.avatar}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Names row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginTop: '46px' }}>
                {testimonials.map((t, i) => (
                    <div key={i} style={{ paddingLeft: '22px' }}>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#c4b5fd' }}>{t.name}</div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#4b3e68', marginTop: '2px' }}>{t.role}</div>
                    </div>
                ))}
            </div>
        </div>
    </section >
);

export default Testimonials;
