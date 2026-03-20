import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Waves, Volume2, Square } from 'lucide-react';

const SolfeggioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(432); // 432Hz Healing, 528Hz Transformation
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const subOscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const lfoRef = useRef(null);
  
  const togglePlay = () => {
    if (isPlaying) {
      stopTone();
    } else {
      playTone();
    }
  };
  
  const playTone = React.useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }
    
    // Stop any existing tone first
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (subOscillatorRef.current) {
      subOscillatorRef.current.stop();
      subOscillatorRef.current.disconnect();
    }
    if (lfoRef.current) {
      lfoRef.current.stop();
      lfoRef.current.disconnect();
    }
    
    const ctx = audioCtxRef.current;
    
    // Main oscillator (Sine wave)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    // Sub oscillator for depth/warmth (Triangle wave an octave down)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(frequency / 2, ctx.currentTime);
    
    // Master gain
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime); // start at 0
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2); // fade in over 2s
    
    // LFO for subtle pulsing (binaural beat feel)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.5, ctx.currentTime); // 0.5Hz slow pulse
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.15, ctx.currentTime); // depth of the amplitude modulation
    
    lfo.connect(lfoGain);
    lfoGain.connect(gainNode.gain); // Modulate the master gain
    
    // Filter to make it warmer
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    
    // Connections
    osc.connect(gainNode);
    subOsc.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(ctx.destination);
    
    osc.start();
    subOsc.start();
    lfo.start();
    
    oscillatorRef.current = osc;
    subOscillatorRef.current = subOsc;
    lfoRef.current = lfo;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);
  }, [frequency]);
  
  const stopTone = React.useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const { currentTime } = audioCtxRef.current;
      gainNodeRef.current.gain.cancelScheduledValues(currentTime);
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, currentTime + 1.5); // 1.5s fade out
      
      setIsPlaying(false);
      
      setTimeout(() => {
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop();
            subOscillatorRef.current.stop();
            lfoRef.current.stop();
          } catch {
            // Silence if already stopped
          } 
          
          oscillatorRef.current.disconnect();
          subOscillatorRef.current.disconnect();
          lfoRef.current.disconnect();
          
          oscillatorRef.current = null;
        }
      }, 1600);
    }
  }, []);
  
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          subOscillatorRef.current.stop();
          lfoRef.current.stop();
        } catch {
          // Silence on cleanup
        }
      }
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);
  
  // Re-trigger/sweep frequency smoothly if playing and frequency changes
  useEffect(() => {
    if (isPlaying) {
      if (oscillatorRef.current && audioCtxRef.current && subOscillatorRef.current) {
        const ctx = audioCtxRef.current;
        oscillatorRef.current.frequency.linearRampToValueAtTime(frequency, ctx.currentTime + 1);
        subOscillatorRef.current.frequency.linearRampToValueAtTime(frequency / 2, ctx.currentTime + 1);
      } else {
        playTone();
      }
    }
  }, [frequency, isPlaying, playTone]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 100,
        background: 'rgba(12, 8, 45, 0.85)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${isPlaying ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.15)'}`,
        borderRadius: '24px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: isPlaying ? '0 0 30px rgba(139,92,246,0.2)' : '0 10px 40px rgba(0,0,0,0.5)',
        transition: 'all 0.5s ease'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '10px', color: '#c4b5fd', letterSpacing: '0.15em', fontWeight: 600 }}>
          SOLFEGGIO GENERATOR
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setFrequency(432)}
            style={{ 
              background: frequency === 432 ? 'rgba(139,92,246,0.3)' : 'transparent',
              border: `1px solid ${frequency === 432 ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`, 
              color: frequency === 432 ? '#fff' : '#a78bfa', 
              fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 500,
              borderRadius: '20px', padding: '4px 12px', transition: 'all 0.3s'
            }}
          >
            432Hz Healing
          </button>
          <button 
            onClick={() => setFrequency(528)}
            style={{ 
              background: frequency === 528 ? 'rgba(139,92,246,0.3)' : 'transparent',
              border: `1px solid ${frequency === 528 ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`, 
              color: frequency === 528 ? '#fff' : '#a78bfa', 
              fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 500,
              borderRadius: '20px', padding: '4px 12px', transition: 'all 0.3s'
            }}
          >
            528Hz Transform
          </button>
        </div>
      </div>
      
      <button 
        onClick={togglePlay}
        style={{
          width: '44px', height: '44px', borderRadius: '50%',
          background: isPlaying ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isPlaying ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`, 
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.3s',
          boxShadow: isPlaying ? '0 0 20px rgba(139,92,246,0.5)' : 'none'
        }}
      >
        {isPlaying ? (
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <Waves size={18} />
          </motion.div>
        ) : (
          <Volume2 size={18} />
        )}
      </button>
    </motion.div>
  );
};

export default SolfeggioPlayer;
