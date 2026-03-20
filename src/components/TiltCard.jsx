import React, { useRef } from 'react';

/**
 * TiltCard — wraps any content with interactive 3D perspective tilt on hover.
 * A specular glare highlight follows the mouse for a glass-like sheen.
 */
const TiltCard = ({ children, style, intensity = 14, glare = true, scale = 1.03 }) => {
    const ref = useRef(null);
    const glareRef = useRef(null);
    const frameRef = useRef(null);

    const onMove = (e) => {
        if (!ref.current) return;
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
            const rect = ref.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
            const y = (e.clientY - rect.top) / rect.height;    // 0 → 1
            const rotX = (0.5 - y) * intensity;
            const rotY = (x - 0.5) * intensity;

            ref.current.style.transform =
                `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`;
            ref.current.style.boxShadow =
                `${-rotY * 1.2}px ${rotX * 1.2}px 40px rgba(139,92,246,0.18), 0 8px 32px rgba(0,0,0,0.3)`;

            if (glareRef.current) {
                glareRef.current.style.background =
                    `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12), transparent 65%)`;
                glareRef.current.style.opacity = '1';
            }
        });
    };

    const onLeave = () => {
        cancelAnimationFrame(frameRef.current);
        if (!ref.current) return;
        ref.current.style.transform =
            'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        ref.current.style.boxShadow = '';
        ref.current.style.transition = 'transform 0.55s cubic-bezier(0.33,1,0.68,1), box-shadow 0.55s ease';
        if (glareRef.current) glareRef.current.style.opacity = '0';
        // reset transition after spring-back
        setTimeout(() => {
            if (ref.current) ref.current.style.transition = '';
        }, 600);
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
                ...style,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {children}
            {glare && (
                <div
                    ref={glareRef}
                    style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        opacity: 0, transition: 'opacity 0.2s', borderRadius: 'inherit',
                        background: 'transparent',
                    }}
                />
            )}
        </div>
    );
};

export default TiltCard;
