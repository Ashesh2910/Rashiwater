import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.33, 1, 0.68, 1];

const Newsletter = () => (
    <section style={{ width: '100%', padding: '40px 0 100px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', width: '100%', padding: '0 48px' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '16px',
                    padding: '50px 60px',
                    background: 'linear-gradient(135deg, #190b39, #2b1154, #190b39)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}
            >
                {/* Decorative background blur overlay */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(196,51,153,0.15), transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>

                    <div style={{ maxWidth: '340px' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.4 }}
                            style={{
                                fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(44px, 5vw, 54px)',
                                color: '#ffffff', marginBottom: '8px', fontWeight: 400, lineHeight: 1.1,
                            }}
                        >
                            Subscribe Newsletter
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#c4b5fd', lineHeight: 1.6, margin: 0 }}
                        >
                            Subscribe to our newsletter for latest updates & psychic insights directly to your inbox.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        style={{ display: 'flex', gap: '12px', flex: '1 1 300px', maxWidth: '440px' }}
                    >
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            style={{
                                flex: 1,
                                padding: '14px 24px',
                                borderRadius: '999px',
                                border: 'none',
                                outline: 'none',
                                background: '#ffffff',
                                fontFamily: 'Inter',
                                fontSize: '13px',
                                color: '#100328',
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: 'linear-gradient(135deg, #c43399, #9d1773)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '999px',
                                padding: '14px 32px',
                                fontSize: '12px',
                                fontFamily: 'Inter',
                                fontWeight: 700,
                                cursor: 'pointer',
                                letterSpacing: '0.1em',
                                boxShadow: '0 4px 16px rgba(196,51,153,0.4)',
                            }}
                        >
                            SUBSCRIBE
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </section>
);

export default Newsletter;
