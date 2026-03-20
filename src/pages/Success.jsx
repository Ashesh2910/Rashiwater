import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            paddingTop: '80px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    background: 'linear-gradient(160deg, rgba(16,10,50,0.8) 0%, rgba(8,4,28,0.8) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '24px',
                    padding: '60px 48px',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 0 80px rgba(16,185,129,0.05)',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.3 }}
                    style={{ color: '#10b981', marginBottom: '32px', display: 'flex', justifyContent: 'center' }}
                >
                    <CheckCircle size={80} strokeWidth={1.5} />
                </motion.div>

                <h1 style={{
                    margin: '0 0 16px 0', fontFamily: 'Playfair Display, serif', fontSize: '36px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                    Order Confirmed
                </h1>

                <p style={{ fontSize: '15px', color: '#a78bfa', lineHeight: 1.6, marginBottom: '40px' }}>
                    Your Rashi Waters sequence has been successfully processed and recorded in the stars. You will receive tracking details via WhatsApp shortly.
                </p>

                <Link to="/shop">
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(16,185,129,0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: '#fff', border: 'none',
                            borderRadius: '999px', padding: '0', height: '54px',
                            fontSize: '14px', fontFamily: 'Inter',
                            cursor: 'pointer', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                            transition: 'background 0.3s'
                        }}
                    >
                        Return to Shop
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
};

export default Success;
