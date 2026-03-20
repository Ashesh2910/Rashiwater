import React from 'react';

const AuroraBackground = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
    overflow: 'hidden',
  }}>
    {/* Aurora layer 1 — purple sweep */}
    <div style={{
      position: 'absolute', top: '-20%', left: '-10%', width: '120%', height: '70%',
      background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)',
      animation: 'auroraShift1 18s ease-in-out infinite alternate',
    }} />

    {/* Aurora layer 2 — magenta glow */}
    <div style={{
      position: 'absolute', top: '10%', right: '-10%', width: '80%', height: '60%',
      background: 'radial-gradient(ellipse at 70% 40%, rgba(196,51,153,0.06) 0%, transparent 55%)',
      animation: 'auroraShift2 22s ease-in-out infinite alternate',
    }} />

    {/* Aurora layer 3 — teal accent */}
    <div style={{
      position: 'absolute', bottom: '0%', left: '20%', width: '60%', height: '50%',
      background: 'radial-gradient(ellipse at 50% 80%, rgba(52,211,153,0.04) 0%, transparent 50%)',
      animation: 'auroraShift3 15s ease-in-out infinite alternate',
    }} />

    {/* Nebula mist */}
    <div style={{
      position: 'absolute', top: '30%', left: '40%', width: '40%', height: '40%',
      background: 'radial-gradient(circle, rgba(124,77,255,0.03) 0%, transparent 50%)',
      animation: 'auroraPulse 10s ease-in-out infinite',
      filter: 'blur(40px)',
    }} />

    <style>{`
      @keyframes auroraShift1 {
        0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.7; }
        50% { transform: translateX(5%) translateY(3%) scale(1.1); opacity: 1; }
        100% { transform: translateX(-3%) translateY(-2%) scale(0.95); opacity: 0.8; }
      }
      @keyframes auroraShift2 {
        0% { transform: translateX(0) scale(1); opacity: 0.6; }
        50% { transform: translateX(-4%) scale(1.15); opacity: 0.9; }
        100% { transform: translateX(3%) scale(1.05); opacity: 0.7; }
      }
      @keyframes auroraShift3 {
        0% { transform: translateY(0) scale(1); opacity: 0.5; }
        100% { transform: translateY(-8%) scale(1.2); opacity: 0.8; }
      }
      @keyframes auroraPulse {
        0%, 100% { transform: scale(1); opacity: 0.4; }
        50% { transform: scale(1.3); opacity: 0.7; }
      }
    `}</style>
  </div>
);

export default AuroraBackground;
