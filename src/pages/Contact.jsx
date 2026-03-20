import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => setFormStatus('sent'), 1500);
    };

    return (
        <section style={{
            minHeight: '100vh',
            paddingTop: '160px',
            paddingBottom: '100px',
            position: 'relative'
        }}>
            {/* Background effects */}
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px' }}>
                        Reach Out
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)',
                            background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            margin: '0 0 20px 0', fontWeight: 400,
                        }}>
                        Connect With Your Cosmos
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontFamily: 'Inter', fontSize: '16px', color: '#8070a8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                        Whether you have questions about your birth chart, or need assistance selecting the perfect energized water bottle, our astrologers are here to guide you.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '80px' }}>

                    {/* Info Side */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#f0eeff', marginBottom: '32px' }}>
                            Cosmic Support
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ color: '#c43399', background: 'rgba(196,51,153,0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,51,153,0.3)' }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'Inter', fontSize: '16px', color: '#fff', margin: '0 0 8px 0' }}>Astrology HQ</h3>
                                    <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#8070a8', margin: 0, lineHeight: 1.6 }}>123 Celestial Avenue<br />Mumbai, MH 400001, India</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ color: '#c43399', background: 'rgba(196,51,153,0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,51,153,0.3)' }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'Inter', fontSize: '16px', color: '#fff', margin: '0 0 8px 0' }}>Phone</h3>
                                    <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#8070a8', margin: 0 }}>+91-9993174081</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ color: '#c43399', background: 'rgba(196,51,153,0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,51,153,0.3)' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'Inter', fontSize: '16px', color: '#fff', margin: '0 0 8px 0' }}>Email</h3>
                                    <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#8070a8', margin: 0 }}>contact@rashiwaters.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                        style={{ background: 'rgba(12, 8, 30, 0.6)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '24px', padding: '40px' }}
                    >
                        {formStatus === 'sent' ? (
                            <div style={{ textAlign: 'center', py: '60px' }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
                                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#f0eeff', marginBottom: '16px' }}>Message Received</h3>
                                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#8070a8' }}>Our astrologers will tune into your frequency and reply shortly.</p>
                                <button onClick={() => setFormStatus('idle')} style={{ background: 'transparent', border: '1px solid rgba(139,92,246,0.5)', color: '#c4b5fd', borderRadius: '6px', padding: '10px 24px', fontSize: '13px', cursor: 'pointer', marginTop: '24px' }}>Send Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', gap: '24px' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontFamily: 'Inter', fontSize: '12px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>First Name</label>
                                        <input required type="text" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'Inter' }} />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontFamily: 'Inter', fontSize: '12px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Last Name</label>
                                        <input type="text" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'Inter' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontFamily: 'Inter', fontSize: '12px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                                    <input required type="email" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'Inter' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontFamily: 'Inter', fontSize: '12px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message</label>
                                    <textarea required rows="5" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'Inter', resize: 'vertical' }} />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(196,51,153,0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={formStatus === 'sending'}
                                    style={{
                                        background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                                        color: '#fff', border: 'none',
                                        borderRadius: '8px', padding: '16px',
                                        fontSize: '14px', fontFamily: 'Inter, sans-serif',
                                        cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer', fontWeight: 600,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        opacity: formStatus === 'sending' ? 0.7 : 1
                                    }}
                                >
                                    {formStatus === 'sending' ? 'Sending...' : <><Send size={18} /> Transmit Message</>}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
