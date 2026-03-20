import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const orbRef = useRef(null);
    const trailRefs = useRef([]);
    const ringRef = useRef(null);

    useEffect(() => {
        // Hide system cursor globally
        const style = document.createElement('style');
        style.id = 'custom-cursor-style';
        style.textContent = '*, *::before, *::after { cursor: none !important; }';
        document.head.appendChild(style);

        const TRAIL = 6;
        // All positions start off-screen; we fill them on first move
        const positions = Array.from({ length: TRAIL + 1 }, () => ({ x: -200, y: -200 }));
        let visible = false;
        let hovering = false;
        let raf;

        const tick = () => {
            // Main orb already updated synchronously on mousemove for zero-lag
            // Trail dots chase each other with damping
            for (let i = 1; i <= TRAIL; i++) {
                positions[i].x += (positions[i - 1].x - positions[i].x) * 0.42;
                positions[i].y += (positions[i - 1].y - positions[i].y) * 0.42;
                const el = trailRefs.current[i - 1];
                if (el) {
                    const progress = 1 - i / (TRAIL + 1);
                    el.style.transform = `translate(${positions[i].x - 3}px, ${positions[i].y - 3}px)`;
                    el.style.opacity = String(progress * 0.55);
                    el.style.transform = `translate(${positions[i].x - 4}px, ${positions[i].y - 4}px)`;
                }
            }
            raf = requestAnimationFrame(tick);
        };

        let checkCounter = 0;
        const onMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (!visible) {
                // First move: seed all positions to current location
                for (const p of positions) { p.x = x; p.y = y; }
                visible = true;
                if (orbRef.current) orbRef.current.style.opacity = '1';
                trailRefs.current.forEach(el => el && (el.style.opacity = '1'));
            }

            positions[0] = { x, y };

            // Move orb synchronously (no lag)
            if (orbRef.current) {
                orbRef.current.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
            }

            // Detect interactive elements via pointermove target (optimized: every 4th move)
            checkCounter++;
            if (checkCounter % 4 === 0) {
                const tag = e.target?.tagName?.toLowerCase?.() || '';
                const role = e.target?.getAttribute?.('role');
                const isInteractive = ['button', 'a', 'input', 'select', 'textarea', 'label'].includes(tag)
                    || role === 'button'
                    || e.target?.style?.cursor === 'pointer'
                    || e.target?.closest?.('button, a, [data-hover]');

                if (isInteractive !== hovering) {
                    hovering = isInteractive;
                    const orb = orbRef.current;
                    const ring = ringRef.current;
                    if (orb) {
                        orb.style.width = hovering ? '36px' : '24px';
                        orb.style.height = hovering ? '36px' : '24px';
                        orb.style.marginLeft = hovering ? '-6px' : '0';
                        orb.style.marginTop = hovering ? '-6px' : '0';
                        orb.style.boxShadow = hovering
                            ? '0 0 20px 8px rgba(139,92,246,0.7), 0 0 50px 16px rgba(109,40,217,0.4)'
                            : '0 0 12px 4px rgba(139,92,246,0.5), 0 0 28px 8px rgba(109,40,217,0.2)';
                    }
                    if (ring) {
                        ring.style.opacity = hovering ? '1' : '0';
                    }
                }
            }
        };


        const onDown = () => {
            if (orbRef.current) {
                orbRef.current.style.transform += ' scale(0.75)';
                orbRef.current.style.boxShadow = '0 0 30px 12px rgba(139,92,246,0.9), 0 0 70px 24px rgba(109,40,217,0.5)';
            }
        };
        const onUp = () => {
            // restore will happen via next mousemove
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        raf = requestAnimationFrame(tick);

        return () => {
            const s = document.getElementById('custom-cursor-style');
            if (s) s.remove();
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
        };
    }, []);

    const base = {
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 99999,
        borderRadius: '50%',
        mixBlendMode: 'screen',
        willChange: 'transform',
    };

    return (
        <>
            {/* Orb */}
            <div
                ref={orbRef}
                style={{
                    ...base,
                    width: '24px', height: '24px',
                    background: 'radial-gradient(circle at 35% 35%, rgba(220,200,255,0.95), rgba(139,92,246,0.6))',
                    boxShadow: '0 0 12px 4px rgba(139,92,246,0.5), 0 0 28px 8px rgba(109,40,217,0.2)',
                    opacity: 0,
                    transition: 'width 0.18s, height 0.18s, box-shadow 0.18s',
                }}
            />

            {/* Hover expand ring */}
            <div
                ref={ringRef}
                style={{
                    ...base,
                    width: '48px', height: '48px',
                    border: '1px solid rgba(196,181,253,0.5)',
                    background: 'transparent',
                    mixBlendMode: 'normal',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    transform: 'translate(-200px, -200px)',
                }}
            />

            {/* Trail dots */}
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    ref={el => trailRefs.current[i] = el}
                    style={{
                        ...base,
                        width: `${8 - i}px`,
                        height: `${8 - i}px`,
                        background: `rgba(${196 - i * 10},${181 - i * 8},253,0.85)`,
                        opacity: 0,
                        transform: 'translate(-200px,-200px)',
                    }}
                />
            ))}
        </>
    );
};

export default CustomCursor;
