import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLANET_OF_DAY = {
    0: { planet: 'Sun ☀️', energy: 'Vitality & Leadership', color: '#fbbf24', tip: "Sunday favours bold decisions. The Sun's energy amplifies your natural leadership." },
    1: { planet: 'Moon 🌙', energy: 'Emotion & Intuition', color: '#c4b5fd', tip: "Monday is ruled by the Moon. Trust your instincts and nurture your relationships." },
    2: { planet: 'Mars ♂', energy: 'Action & Courage', color: '#f87171', tip: "Tuesday channels Martian fire. Ideal for starting new initiatives and physical activity." },
    3: { planet: 'Mercury ☿', energy: 'Communication', color: '#6ee7b7', tip: "Wednesday belongs to Mercury. Perfect for negotiations, writing, and travel plans." },
    4: { planet: 'Jupiter ♃', energy: 'Expansion & Wisdom', color: '#fb923c', tip: "Thursday is blessed by Jupiter. Seek growth, learning, and long-term investments." },
    5: { planet: 'Venus ♀', energy: 'Love & Beauty', color: '#f9a8d4', tip: "Friday radiates Venusian charm. Perfect for romance, creativity, and self-care." },
    6: { planet: 'Saturn ♄', energy: 'Discipline & Karma', color: '#94a3b8', tip: "Saturday calls for patience and structure. Saturn rewards consistent effort over time." },
};

const LUNAR_TIPS = [
    "✦ Mercury enters Pisces — avoid signing contracts today",
    "✦ Venus trine Jupiter — favourable for financial decisions",
    "✦ Full Moon energy peaks — heightened intuition and emotions",
    "✦ Saturn squares the Sun — stay grounded, avoid impulsive choices",
    "✦ Mars in Gemini — excellent for bold communication",
];

const CosmicWeatherBanner = () => {
    const now = new Date();
    const dayData = PLANET_OF_DAY[now.getDay()];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${dayNames[now.getDay()]}, ${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const [tipIndex, setTipIndex] = useState(0);
    const [show, setShow] = useState(true);

    // Rotate tips every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex(i => (i + 1) % LUNAR_TIPS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    if (!show) return null;

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            style={{
                width: '100%',
                background: `linear-gradient(90deg, rgba(4,2,14,0.98) 0%, rgba(${dayData.color === '#fbbf24' ? '60,35,5' : '30,5,60'},0.98) 50%, rgba(4,2,14,0.98) 100%)`,
                borderBottom: `1px solid ${dayData.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 52px', height: '36px', fontSize: '11px',
                fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em',
                position: 'fixed', top: 0, zIndex: 102, overflow: 'hidden',
            }}
        >
            {/* Left: date + planetary ruler */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ color: '#4b3e68' }}>{dateStr}</span>
                <div style={{ width: '1px', height: '14px', background: 'rgba(139,92,246,0.25)' }} />
                <span style={{ color: dayData.color, fontWeight: 600 }}>
                    Today&apos;s Ruler: {dayData.planet}
                </span>
                <span style={{ color: '#4b3e68' }}>·</span>
                <span style={{ color: '#5b4e78' }}>{dayData.energy}</span>
            </div>

            {/* Center: rotating tips ticker */}
            <div style={{ flex: 1, textAlign: 'center', overflow: 'hidden', padding: '0 40px' }}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={tipIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        style={{ color: '#7060a0', fontStyle: 'italic', whiteSpace: 'nowrap' }}
                    >
                        {LUNAR_TIPS[tipIndex]}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Right: close */}
            <motion.button
                whileHover={{ color: '#c4b5fd' }}
                onClick={() => setShow(false)}
                style={{ background: 'none', border: 'none', color: '#3b3058', cursor: 'pointer', fontSize: '14px', padding: '0', fontFamily: 'Inter' }}
            >
                ×
            </motion.button>
        </motion.div>
    );
};

export default CosmicWeatherBanner;
