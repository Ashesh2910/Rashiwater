import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESETS = [
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '15 min', seconds: 900 },
  { label: '20 min', seconds: 1200 },
];

// Plays a singing bowl sound using Web Audio API
function playSingingBowl(audioCtx) {
  const now = audioCtx.currentTime;
  const freqs = [528, 396, 432];

  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.15 - i * 0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.3);
    osc.stop(now + 7);
  });
}

const MeditationTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const progress = 1 - timeLeft / duration;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const circumference = 2 * Math.PI * 90;
  const strokeOffset = circumference * (1 - progress);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsComplete(true);
            // Play singing bowl
            if (!audioCtxRef.current) {
              audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            playSingingBowl(audioCtxRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => {
    setIsComplete(false);
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    clearInterval(intervalRef.current);
    setTimeLeft(duration);
  }, [duration]);

  const selectDuration = (secs) => {
    setDuration(secs);
    setTimeLeft(secs);
    setIsRunning(false);
    setIsComplete(false);
    clearInterval(intervalRef.current);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '28px', left: '88px', zIndex: 9990,
          width: '42px', height: '42px', borderRadius: '50%',
          background: isRunning ? 'linear-gradient(135deg, #34d399, #059669)' : 'rgba(20, 15, 50, 0.85)',
          border: `2px solid ${isRunning ? 'rgba(52,211,153,0.5)' : 'rgba(139,92,246,0.3)'}`,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px',
          boxShadow: isRunning ? '0 0 20px rgba(52,211,153,0.3)' : '0 4px 15px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)', transition: 'all 0.3s',
        }}
      >
        🧘
      </motion.button>

      {/* Timer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'fixed', bottom: '80px', left: '28px', zIndex: 9989,
              width: '280px',
              background: 'rgba(10, 6, 38, 0.95)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '20px', padding: '28px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.15em', color: '#8b5cf6', textTransform: 'uppercase' }}>
                Meditation Timer
              </span>
            </div>

            {/* Circular Timer */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="4" />
                {/* Progress circle */}
                <motion.circle
                  cx="100" cy="100" r="90" fill="none"
                  stroke={isComplete ? '#34d399' : '#8b5cf6'}
                  strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 100 100)"
                  transition={{ duration: 0.5 }}
                />
                {/* Time text */}
                <text x="100" y="92" textAnchor="middle" fill="#f0eeff" fontFamily="Inter" fontSize="36" fontWeight="300">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </text>
                <text x="100" y="115" textAnchor="middle" fill="#5b4e78" fontFamily="Inter" fontSize="10" letterSpacing="2">
                  {isComplete ? 'NAMASTE 🙏' : isRunning ? 'BREATHING…' : 'READY'}
                </text>
              </svg>
            </div>

            {/* Preset buttons */}
            {!isRunning && !isComplete && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                {PRESETS.map(p => (
                  <button
                    key={p.seconds}
                    onClick={() => selectDuration(p.seconds)}
                    style={{
                      background: duration === p.seconds ? 'rgba(139,92,246,0.2)' : 'transparent',
                      border: `1px solid ${duration === p.seconds ? '#8b5cf6' : 'rgba(139,92,246,0.15)'}`,
                      borderRadius: '8px', padding: '6px 12px',
                      fontFamily: 'Inter', fontSize: '11px',
                      color: duration === p.seconds ? '#c4b5fd' : '#5b4e78',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {isComplete ? (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                    color: '#fff', border: 'none', borderRadius: '999px',
                    padding: '10px 28px', fontSize: '12px', fontFamily: 'Inter',
                    fontWeight: 600, cursor: 'pointer', letterSpacing: '0.08em',
                  }}
                >
                  ✦ Again
                </motion.button>
              ) : (
                <>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={isRunning ? pause : start}
                    style={{
                      background: isRunning ? 'rgba(248,113,113,0.15)' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                      color: isRunning ? '#f87171' : '#fff',
                      border: isRunning ? '1px solid rgba(248,113,113,0.3)' : 'none',
                      borderRadius: '999px', padding: '10px 28px', fontSize: '12px',
                      fontFamily: 'Inter', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.08em',
                    }}
                  >
                    {isRunning ? '⏸ Pause' : '▶ Start'}
                  </motion.button>
                  {(isRunning || timeLeft !== duration) && (
                    <button onClick={reset} style={{
                      background: 'transparent', color: '#5b4e78',
                      border: '1px solid rgba(139,92,246,0.15)', borderRadius: '999px',
                      padding: '10px 20px', fontSize: '12px', fontFamily: 'Inter',
                      cursor: 'pointer',
                    }}>
                      Reset
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MeditationTimer;
