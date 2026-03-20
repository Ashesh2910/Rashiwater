import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BAR_COUNT = 5;

const AmbientMusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-dismiss the tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Smooth fade out
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          audio.volume = 0.4; // reset for next play
        }
      }, 60);
      setIsPlaying(false);
    } else {
      try {
        audio.volume = 0;
        await audio.play();
        setIsPlaying(true);
        setShowTooltip(false);
        // Smooth fade in
        const fadeIn = setInterval(() => {
          if (audio.volume < 0.35) {
            audio.volume = Math.min(0.4, audio.volume + 0.02);
          } else {
            clearInterval(fadeIn);
            audio.volume = 0.4;
          }
        }, 60);
      } catch (err) {
        console.warn('Audio play failed:', err);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/ambient-music.mp3"
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      <div style={{
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: isPlaying
              ? 'linear-gradient(135deg, #8b5cf6, #c43399)'
              : 'rgba(20, 15, 50, 0.85)',
            border: `2px solid ${isPlaying ? 'rgba(196,51,153,0.6)' : 'rgba(139,92,246,0.3)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: isPlaying
              ? '0 0 20px rgba(139,92,246,0.4)'
              : '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Animated equalizer bars */}
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              animate={isPlaying ? {
                height: [6, 14 + (i * 3) % 8, 6, 18 + (i * 2) % 4, 8],
              } : { height: 6 }}
              transition={isPlaying ? {
                duration: 0.8 + i * 0.15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              } : { duration: 0.3 }}
              style={{
                width: '3px',
                height: '6px',
                borderRadius: '2px',
                background: isPlaying ? '#fff' : 'rgba(139,92,246,0.6)',
              }}
            />
          ))}
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              style={{
                background: 'rgba(20, 15, 50, 0.9)',
                border: '1px solid rgba(139,92,246,0.25)',
                borderRadius: '10px',
                padding: '8px 14px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#c4b5fd',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {isPlaying ? '🕉 Now playing' : '🕉 Play spiritual ambient'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AmbientMusicPlayer;
