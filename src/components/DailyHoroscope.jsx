import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDailyHoroscope } from '../services/geminiService';

const SIGNS = [
  { name: 'Aries', symbol: '♈', color: '#ff6b8a' },
  { name: 'Taurus', symbol: '♉', color: '#8bc34a' },
  { name: 'Gemini', symbol: '♊', color: '#ffeb3b' },
  { name: 'Cancer', symbol: '♋', color: '#b3e5fc' },
  { name: 'Leo', symbol: '♌', color: '#ff9800' },
  { name: 'Virgo', symbol: '♍', color: '#a1887f' },
  { name: 'Libra', symbol: '♎', color: '#f48fb1' },
  { name: 'Scorpio', symbol: '♏', color: '#e53935' },
  { name: 'Sagittarius', symbol: '♐', color: '#9c27b0' },
  { name: 'Capricorn', symbol: '♑', color: '#607d8b' },
  { name: 'Aquarius', symbol: '♒', color: '#00bcd4' },
  { name: 'Pisces', symbol: '♓', color: '#7c4dff' },
];

const DailyHoroscope = () => {
  const [selected, setSelected] = useState(null);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  // Stop talking when unmounting or changing sign
  useEffect(() => {
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(false);
  }, [selected]);

  const handlePlayVoice = () => {
    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      return;
    }

    if (!horoscopeData?.horoscope) return;
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(horoscopeData.horoscope);
    
    // Try to find an ethereal/female voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Samantha') || v.name.includes('Female')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 0.85; // Slower, more relaxing
    utterance.pitch = 0.9;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    synthRef.current.speak(utterance);
  };

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;

    const fetchHoroscope = async () => {
      setLoading(true);
      setHoroscopeData(null);
      try {
        const raw = await generateDailyHoroscope(selected.name);
        if (!cancelled) {
          const data = JSON.parse(raw);
          setHoroscopeData(data);
        }
      } catch {
        if (!cancelled) {
          setHoroscopeData({
            horoscope: `Today brings powerful energy for ${selected.name}. Trust your instincts and embrace new possibilities. The universe supports your deepest desires.`,
            luckyColor: 'Cosmic Purple',
            luckyNumber: 7,
            energy: 8,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchHoroscope();
    return () => { cancelled = true; };
  }, [selected]);

  return (
    <section style={{ padding: '80px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '12px' }}>
            ✦ AI-Powered Insight
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(40px, 6vw, 64px)', background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 12px 0', fontWeight: 400 }}>
            Today&apos;s Horoscope
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: '14px', color: '#8070a8', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            Select your zodiac sign to receive your personalised cosmic guidance for today.
          </motion.p>
        </div>

        {/* Sign selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {SIGNS.map((sign) => (
            <motion.button
              key={sign.name}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(sign)}
              style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: selected?.name === sign.name ? `${sign.color}25` : 'rgba(12,8,45,0.7)',
                border: `2px solid ${selected?.name === sign.name ? sign.color : 'rgba(139,92,246,0.15)'}`,
                fontSize: '22px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: selected?.name === sign.name ? `0 0 20px ${sign.color}30` : 'none',
                transition: 'all 0.2s',
              }}
              title={sign.name}
            >
              {sign.symbol}
            </motion.button>
          ))}
        </div>

        {/* Horoscope card */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                maxWidth: '600px', margin: '0 auto',
                background: 'rgba(10,6,38,0.85)',
                border: `1px solid ${selected.color}25`,
                borderRadius: '24px', padding: '36px',
                backdropFilter: 'blur(20px)',
                boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${selected.color}08`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Top glow */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${selected.color}, transparent)` }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${selected.color}25, transparent)`,
                  border: `2px solid ${selected.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px',
                }}>
                  {selected.symbol}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#f0eeff', margin: 0 }}>
                    {selected.name}
                  </h3>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', color: selected.color, letterSpacing: '0.1em' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                
                {/* Voice Oracle Button */}
                {horoscopeData && !loading && (
                    <button
                      onClick={handlePlayVoice}
                      style={{
                        marginLeft: 'auto',
                        background: isPlaying ? 'rgba(139,92,246,0.3)' : 'transparent',
                        border: `1px solid ${selected.color}40`,
                        color: isPlaying ? '#fff' : selected.color,
                        padding: '8px 16px', borderRadius: '20px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                        fontFamily: 'Inter', fontSize: '12px', letterSpacing: '0.05em', transition: 'all 0.2s',
                        boxShadow: isPlaying ? `0 0 20px ${selected.color}40` : 'none'
                      }}
                    >
                      {isPlaying ? <Square size={14} /> : <Volume2 size={14} />}
                      {isPlaying ? 'STOP LISTENING' : 'VOICE ORACLE'}
                    </button>
                )}
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', fontSize: '28px' }}
                  >
                    ✦
                  </motion.div>
                  <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#5b4e78', marginTop: '12px' }}>
                    Consulting the stars...
                  </p>
                </div>
              ) : horoscopeData ? (
                <>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#c4b5fd', lineHeight: 1.85, margin: '0 0 24px', fontStyle: 'italic' }}>
                    &quot;{horoscopeData.horoscope}&quot;
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '9px', color: '#5b4e78', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Lucky Colour</span>
                      <p style={{ fontFamily: 'Inter', fontSize: '13px', color: selected.color, margin: '6px 0 0', fontWeight: 600 }}>
                        {horoscopeData.luckyColor}
                      </p>
                    </div>
                    <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '9px', color: '#5b4e78', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Lucky Number</span>
                      <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#c4b5fd', margin: '6px 0 0', fontWeight: 600 }}>
                        {horoscopeData.luckyNumber}
                      </p>
                    </div>
                    <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '9px', color: '#5b4e78', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Energy</span>
                      <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#34d399', margin: '6px 0 0', fontWeight: 600 }}>
                        {horoscopeData.energy}/10 ⚡
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '9px', color: '#3b3058', letterSpacing: '0.1em' }}>
                      🤖 Powered by Gemini AI · Updated daily
                    </span>
                  </div>
                </>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DailyHoroscope;
