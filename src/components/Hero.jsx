import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';



/* ── Count-up (fires once via IntersectionObserver) ─────── */
const Counter = ({ to, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            let start = 0;
            const step = ts => {
                if (!start) start = ts;
                const p = Math.min((ts - start) / 1200, 1);
                setCount(Math.floor(p * to));
                if (p < 1) requestAnimationFrame(step); else setCount(to);
            };
            requestAnimationFrame(step);
            obs.disconnect();
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [to]);
    return <span ref={ref}>{count}{suffix}</span>;
};

const EASE = [0.33, 1, 0.68, 1];

/* ── Hero ──────────────────────────────────────────────────── */
const Hero = () => {
    return (
        <section
            style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '220px 0 80px', overflow: 'hidden' }}
        >
            {/* Static atmospheric nebula blobs */}
            <div style={{ position: 'absolute', top: '20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(150,20,130,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '40%', right: '0%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(196,51,153,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '35%', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(80,20,180,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Two-column layout */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 10 }}>

                {/* LEFT */}
                <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }} initial="hidden" animate="show">

                    <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
                        style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '10px' }}>
                        ✦ Welcome To
                    </motion.p>

                    <motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
                        style={{
                            fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(80px, 12vw, 130px)', fontWeight: 400, lineHeight: 1, marginBottom: '22px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 40%, #f472b6 72%, #c43399 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            filter: 'drop-shadow(0 0 30px rgba(196,51,153,0.3))'
                        }}>
                        Rashi Waters
                    </motion.h1>

                    <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
                        style={{ fontFamily: 'Inter', fontSize: '15px', color: '#7060a0', lineHeight: 1.85, maxWidth: '380px', marginBottom: '36px' }}>
                        When you think of energized drinking water, Rashi Waters is the first name that comes to mind. We set the benchmark for zodiac-aligned hydration.
                    </motion.p>

                    <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(196,51,153,0.6)' }}
                            whileTap={{ scale: 0.96 }}
                            style={{ background: 'linear-gradient(135deg, #c43399, #9d1773)', color: '#fff', border: 'none', borderRadius: '999px', padding: '16px 38px', fontSize: '13px', fontFamily: 'Inter', cursor: 'pointer', fontWeight: 700, letterSpacing: '0.1em', uppercase: true, boxShadow: '0 4px 28px rgba(196,51,153,0.4)' }}>
                            Shop Collection
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* RIGHT */}
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5, ease: EASE }}>

                    <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #8b5cf6, transparent)', marginBottom: '24px' }} />

                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.45, ease: EASE }}
                        style={{
                            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,3.5vw,44px)', lineHeight: 1.2, marginBottom: '20px', fontStyle: 'italic',
                            background: 'linear-gradient(135deg, #f0eeff 0%, #c4b5fd 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                        }}>
                        Purity That Goes Beyond the Bottle
                    </motion.h2>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34, duration: 0.4 }}
                        style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6b5e88', lineHeight: 1.9, marginBottom: '36px', maxWidth: '400px' }}>
                        Every Rashi Waters bottle goes through a stringent 10-step purification and crystal-infusion process, ensuring safe, consistent, and chakra-balanced hydration.
                    </motion.p>

                    {/* Stats */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
                        style={{ display: 'flex', gap: '36px', marginBottom: '36px', paddingBottom: '28px', borderBottom: '1px solid rgba(139,92,246,0.12)' }}>
                        {[[15000, 'K+', 'Happy Customers'], [98, '%', 'Positive Energy'], [12, '+', 'Zodiac Collections']].map(([num, suf, label]) => (
                            <div key={label}>
                                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#c4b5fd', marginBottom: '4px' }}><Counter to={num} suffix={suf} /></div>
                                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#5b4e78', letterSpacing: '0.05em' }}>{label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(139,92,246,0.45)' }} whileTap={{ scale: 0.96 }}
                        style={{ background: 'transparent', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '6px', padding: '14px 32px', fontSize: '13px', fontFamily: 'Inter', cursor: 'pointer', fontWeight: 600, letterSpacing: '0.09em' }}>
                        Explore the Shop →
                    </motion.button>


                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
