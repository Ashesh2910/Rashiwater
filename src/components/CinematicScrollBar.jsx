import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CinematicScrollBar — thin glowing progress bar fixed at the very top of the page.
 * The purple-to-lavender gradient with bloom glow fills left-to-right as user scrolls.
 */
const CinematicScrollBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: '2.5px',
            background: 'rgba(60,20,120,0.25)', zIndex: 10000,
        }}>
            <motion.div
                style={{
                    height: '100%',
                    scaleX: progress,
                    transformOrigin: 'left center',
                    background: 'linear-gradient(90deg, #6d28d9, #8b5cf6, #c4b5fd)',
                    boxShadow: '0 0 8px 2px rgba(196,181,253,0.7), 0 0 20px 4px rgba(139,92,246,0.4)',
                }}
            />
            {/* Leading glow pulse */}
            <div style={{
                position: 'absolute', top: '-3px',
                left: `calc(${progress * 100}% - 6px)`,
                width: '12px', height: '8px',
                background: 'radial-gradient(circle, rgba(220,200,255,0.95), transparent 70%)',
                borderRadius: '50%',
                transition: 'left 0.05s linear',
            }} />
        </div>
    );
};

export default CinematicScrollBar;
