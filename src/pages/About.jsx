import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sparkles, Heart } from 'lucide-react';

const About = () => {
    return (
        <section style={{
            minHeight: '100vh',
            paddingTop: '160px',
            paddingBottom: '100px',
            position: 'relative'
        }}>
            {/* Background effects */}
            <div style={{ position: 'absolute', top: '20%', right: '0%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(196,51,153,0.1) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#c43399', textTransform: 'uppercase', marginBottom: '16px' }}>
                        Our Philosophy
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)',
                            background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            margin: '0 0 20px 0', fontWeight: 400,
                        }}>
                        Purity Beyond the Bottle
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontFamily: 'Inter', fontSize: '16px', color: '#8070a8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                        Rashi Waters was born from the ancient Vedic understanding that water holds memory and energy. We combine 10-step purification with cosmic frequencies.
                    </motion.p>
                </div>

                {/* Features */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '120px' }}>
                    {[
                        { icon: <Droplets size={32} />, title: "10-Step Purification", desc: "Our water goes through rigorous filtration, ensuring safe, consistent, and mineral-balanced hydration." },
                        { icon: <Sparkles size={32} />, title: "Crystal Infusion", desc: "Each bottle is charged with ethically sourced crystals attuned to specific planetary alignments." },
                        { icon: <Heart size={32} />, title: "Vedic Wisdom", desc: "Guided by expert astrologers, our products are crafted to elevate your aura and spiritual frequency." }
                    ].map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }}
                            style={{ background: 'rgba(12, 8, 30, 0.4)', border: '1px solid rgba(139, 92, 246, 0.15)', borderRadius: '24px', padding: '40px 32px', textAlign: 'center' }}
                        >
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(196,51,153,0.1)', color: '#c4b5fd', marginBottom: '24px', border: '1px solid rgba(196,51,153,0.3)' }}>
                                {feat.icon}
                            </div>
                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#f0eeff', marginBottom: '16px' }}>{feat.title}</h3>
                            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#8070a8', lineHeight: 1.7 }}>{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Story Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ height: '500px', borderRadius: '24px', background: 'linear-gradient(45deg, rgba(30,15,60,0.8), rgba(15,10,40,0.9))', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(196,51,153,0.2) 0%, transparent 60%)' }} />
                        <span style={{ fontSize: '120px', filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.4))' }}>🌙</span>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '40px', color: '#fff', marginBottom: '24px', lineHeight: 1.2 }}>
                            The Universe Within A Drop
                        </h2>
                        <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', lineHeight: 1.8, marginBottom: '20px' }}>
                            We believe that every individual is a reflection of the cosmos. Our journey started when a group of Vedic astrologers and modern hydration experts asked a simple question: What if our daily water intake could carry the intention of the stars?
                        </p>
                        <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', lineHeight: 1.8, marginBottom: '40px' }}>
                            Today, Rashi Waters is India&apos;s most trusted name in cosmic hydration. We provide a bridge between ancient spiritual practices and modern wellness, ensuring that your energy field is supported with every sip.
                        </p>
                        <button style={{ background: 'linear-gradient(135deg, #c43399, #9d1773)', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 36px', fontSize: '13px', fontFamily: 'Inter', fontWeight: 700, letterSpacing: '0.1em', uppercase: true, cursor: 'pointer', boxShadow: '0 4px 20px rgba(196,51,153,0.4)' }}>
                            Join Our Journey
                        </button>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default About;
