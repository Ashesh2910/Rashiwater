import React from 'react';
import { motion } from 'framer-motion';
import RashiLogo from './RashiLogo';
import PlanetaryHoursClock from './PlanetaryHoursClock';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer style={{
        width: '100%',
        background: 'rgba(5,3,20,0.98)',
        borderTop: '1px solid rgba(139,92,246,0.15)',
        padding: '60px 0 0',
    }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

                {/* Brand column */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <RashiLogo size={48} />
                        <span style={{ fontFamily: 'Noto Sans Devanagari, Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#c9a84c' }}>राशी</span>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5b4e78', lineHeight: 1.8, marginBottom: '20px', maxWidth: '260px' }}>
                        Your cosmic source for zodiac-energized water bottles, premium crystal healing bracelets, and spiritual alignment tools.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {['f', '𝕏', '◎', 'in'].map((icon, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ borderColor: 'rgba(139,92,246,0.7)', color: '#c4b5fd' }}
                                style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    border: '1px solid rgba(139,92,246,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#5b4e78', cursor: 'pointer', fontSize: '12px',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {icon}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.15em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '20px' }}>
                        Quick Links
                    </h4>
                    {[{l:'Home',p:'/'}, {l:'Shop',p:'/shop'}, {l:'Compatibility',p:'/compatibility'}, {l:'Tarot Reading',p:'/tarot'}, {l:'Constellations',p:'/constellations'}, {l:'Quiz',p:'/quiz'}].map((item) => (
                        <Link key={item.l} to={item.p} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5b4e78', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s', textDecoration: 'none', display: 'block' }}>
                            {item.l}
                        </Link>
                    ))}
                </div>

                {/* Services */}
                <div>
                    <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.15em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '20px' }}>
                        Services
                    </h4>
                    {['Zodiac Bracelets', 'Pyrite Collection', 'Energized Waters', 'Birthstone Jewelry', 'Cosmic Merch'].map((s) => (
                        <p key={s} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5b4e78', marginBottom: '10px', cursor: 'pointer' }}>
                            {s}
                        </p>
                    ))}
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.15em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '20px' }}>
                        Get In Touch
                    </h4>
                    {[
                        { icon: '✉', text: 'contact@rashi.com' },
                        { icon: '✆', text: '+91 98765 43210' },
                        { icon: '📍', text: 'New Delhi, India' },
                    ].map((c) => (
                        <p key={c.text} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5b4e78', marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span>{c.icon}</span>
                            <span>{c.text}</span>
                        </p>
                    ))}
                </div>
            </div>

            {/* Planetary Hours Clock */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                <PlanetaryHoursClock />
            </div>

            {/* Bottom bar */}
            <div style={{
                borderTop: '1px solid rgba(139,92,246,0.1)',
                padding: '20px 0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#3d3555', margin: 0 }}>
                    © 2026 Rashi Waters. All rights reserved.
                </p>
                <div style={{ display: 'flex', gap: '24px' }}>
                    {['Privacy Policy', 'Terms of Service'].map(l => (
                        <span key={l} style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#3d3555', cursor: 'pointer' }}>
                            {l}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
