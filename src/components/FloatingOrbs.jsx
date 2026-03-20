import React from 'react';

// Pre-generate orb positions at module level (deterministic)
const ORBS = Array.from({ length: 8 }, (_, i) => ({
  size: 60 + (i * 37 % 80),
  left: `${(i * 13 + 5) % 90}%`,
  top: `${(i * 19 + 10) % 85}%`,
  color: [
    'rgba(139,92,246,0.06)',
    'rgba(196,51,153,0.05)',
    'rgba(52,211,153,0.04)',
    'rgba(124,77,255,0.05)',
    'rgba(244,114,182,0.04)',
    'rgba(99,102,241,0.05)',
    'rgba(167,139,250,0.06)',
    'rgba(59,130,246,0.04)',
  ][i],
  duration: 20 + (i * 7 % 15),
  delay: i * 2,
}));

const FloatingOrbs = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {ORBS.map((orb, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: orb.left,
          top: orb.top,
          width: `${orb.size}px`,
          height: `${orb.size}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          filter: 'blur(30px)',
          animation: `orbFloat${i} ${orb.duration}s ease-in-out ${orb.delay}s infinite alternate`,
        }}
      />
    ))}
    <style>{`
      ${ORBS.map((orb, i) => `
        @keyframes orbFloat${i} {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(${(i % 2 === 0 ? 30 : -20)}px, ${-30 + (i * 5)}px) scale(1.1); }
          66% { transform: translate(${(i % 2 === 0 ? -15 : 25)}px, ${20 - (i * 3)}px) scale(0.9); }
          100% { transform: translate(${(i * 7 % 20) - 10}px, ${(i * 5 % 30) - 15}px) scale(1.05); }
        }
      `).join('\n')}
    `}</style>
  </div>
);

export default FloatingOrbs;
