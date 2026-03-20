import React from 'react';
import { motion } from 'framer-motion';

const plans = [
    { title: 'One-Time Order', price: 'From $45.00', icon: '💧', featured: false },
    { title: 'Monthly Delivery', price: '$40.00/mo', icon: '✨', featured: true },
    { title: 'The Full Cosmic Set', price: '$120.00', icon: '🪐', featured: false }
];

const MembershipCTA = () => (
    <section style={{ width: '100%', padding: '80px 0 100px', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                    style={{
                        fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(48px, 6vw, 68px)',
                        background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        margin: 0, fontWeight: 400,
                    }}
                >
                    One Portal For All Your Cosmic Hydration Needs
                </motion.h2>
            </div>

            {/* Pricing Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', alignItems: 'center' }}>
                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ y: -10 }}
                        style={{
                            background: plan.featured ? 'linear-gradient(160deg, #c43399, #9d1773)' : 'rgba(15,10,45,0.6)',
                            border: `1px solid ${plan.featured ? 'transparent' : 'rgba(196,51,153,0.3)'}`,
                            borderRadius: '12px',
                            padding: '40px 30px',
                            textAlign: 'center',
                            boxShadow: plan.featured ? '0 10px 40px rgba(196,51,153,0.3)' : 'none',
                        }}
                    >
                        <div style={{ fontSize: '42px', marginBottom: '20px' }}>
                            {plan.icon}
                        </div>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
                            {plan.title}
                        </h3>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px', fontWeight: 700, color: plan.featured ? '#fff' : '#fbcfe8', marginBottom: '20px' }}>
                            {plan.price}
                        </div>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: plan.featured ? 'rgba(255,255,255,0.9)' : '#8070a8', lineHeight: 1.6, marginBottom: '30px' }}>
                            Choose a one-time purchase or a subscription and get safe, trusted aura-aligned hydration delivered straight to your doorstep.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: plan.featured ? 'transparent' : 'linear-gradient(135deg, #c43399, #9d1773)',
                                border: plan.featured ? '1px solid #fff' : 'none',
                                color: '#fff',
                                borderRadius: '999px',
                                padding: '12px 32px',
                                fontSize: '13px',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                cursor: 'pointer',
                                letterSpacing: '0.05em',
                                width: '100%',
                            }}
                        >
                            SHOP NOW
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default MembershipCTA;
