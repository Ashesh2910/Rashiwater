import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, Heart, Gem, Calendar, Sun, Moon, Flame, Wind, Droplets, Mountain } from 'lucide-react';
import { getDailyHoroscope } from '../data/zodiacData';

const elementIcons = {
  Fire: Flame,
  Earth: Mountain,
  Air: Wind,
  Water: Droplets,
};

const elementGradients = {
  Fire: 'linear-gradient(135deg, #ff6b6b22, #ffa50022)',
  Earth: 'linear-gradient(135deg, #4ade8022, #84cc1622)',
  Air: 'linear-gradient(135deg, #fbbf2422, #38bdf822)',
  Water: 'linear-gradient(135deg, #93c5fd22, #8b5cf622)',
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25, mass: 0.8 },
  },
  exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.25 } },
};

const ZodiacDetailModal = ({ sign, isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!sign) return null;

  const dailyHoroscope = getDailyHoroscope(sign.name);
  const ElementIcon = elementIcons[sign.element] || Star;

  const sectionStyle = {
    background: 'rgba(15, 10, 45, 0.5)',
    border: '1px solid rgba(139, 92, 246, 0.12)',
    borderRadius: '16px',
    padding: '20px',
  };

  const labelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#8b7ab8',
    marginBottom: '6px',
  };

  const valueStyle = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '15px',
    color: '#e8e0ff',
    fontWeight: 600,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="zodiac-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(4, 2, 20, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            overflowY: 'auto',
          }}
        >
          <motion.div
            key="zodiac-modal-card"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'linear-gradient(180deg, rgba(18, 12, 50, 0.97) 0%, rgba(8, 5, 25, 0.98) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '24px',
              position: 'relative',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(139,92,246,0.3) transparent',
            }}
          >
            {/* ── Close Button ── */}
            <motion.button
              whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                position: 'sticky',
                top: '16px',
                float: 'right',
                marginRight: '16px',
                zIndex: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#c4b5fd',
              }}
            >
              <X size={18} />
            </motion.button>

            <div style={{ padding: '40px 36px 36px' }}>

              {/* ── Header ── */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                {/* Glow behind symbol */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${sign.color}35, transparent 70%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${sign.color}40`,
                  boxShadow: `0 0 40px ${sign.color}20`,
                }}>
                  <span style={{ fontSize: '48px', lineHeight: 1 }}>{sign.symbol}</span>
                </div>

                <h2 style={{
                  fontFamily: 'Great Vibes, cursive',
                  fontSize: 'clamp(42px, 6vw, 58px)',
                  margin: '0 0 4px',
                  background: `linear-gradient(135deg, #ffffff, ${sign.color})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 400,
                }}>
                  {sign.name}
                </h2>

                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#7a6b9e',
                  letterSpacing: '0.08em',
                  margin: '0 0 12px',
                }}>
                  {sign.dates}
                </p>

                {/* Element & Modality badges */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: elementGradients[sign.element],
                    border: `1px solid ${sign.color}30`,
                    borderRadius: '999px',
                    padding: '6px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: sign.color,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                  }}>
                    <ElementIcon size={13} />
                    {sign.element}
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(139,92,246,0.08)',
                    border: '1px solid rgba(139,92,246,0.15)',
                    borderRadius: '999px',
                    padding: '6px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: '#a78bfa',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                  }}>
                    {sign.modality}
                  </span>
                </div>
              </div>

              {/* ── Daily Horoscope ── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  background: `linear-gradient(135deg, ${sign.color}10, rgba(139,92,246,0.08))`,
                  border: `1px solid ${sign.color}25`,
                  borderRadius: '20px',
                  padding: '24px 28px',
                  marginBottom: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative sparkle */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: `radial-gradient(circle, ${sign.color}15, transparent 70%)`,
                  borderRadius: '50%',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${sign.color}, #8b5cf6)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Sparkles size={16} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#f0eeff',
                      margin: 0,
                    }}>
                      Today&apos;s Horoscope
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      color: '#6b5e88',
                      margin: 0,
                      letterSpacing: '0.1em',
                    }}>
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.85,
                  color: '#c8bfe6',
                  margin: 0,
                  fontStyle: 'italic',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  &quot;{dailyHoroscope}&quot;
                </p>
              </motion.div>

              {/* ── Personality ── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ ...sectionStyle, marginBottom: '20px' }}
              >
                <h4 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#e0d8ff',
                  margin: '0 0 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Sun size={15} color={sign.color} /> Personality
                </h4>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  lineHeight: 1.8,
                  color: '#9a8dc0',
                  margin: 0,
                }}>
                  {sign.personality}
                </p>
              </motion.div>

              {/* ── Strengths & Weaknesses ── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}
              >
                <div style={sectionStyle}>
                  <h4 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#4ade80',
                    margin: '0 0 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Star size={14} color="#4ade80" /> Strengths
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {sign.strengths.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          background: 'rgba(74, 222, 128, 0.08)',
                          border: '1px solid rgba(74, 222, 128, 0.2)',
                          borderRadius: '999px',
                          padding: '5px 14px',
                          color: '#6ee7a0',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={sectionStyle}>
                  <h4 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#f87171',
                    margin: '0 0 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Heart size={14} color="#f87171" /> Weaknesses
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {sign.weaknesses.map((w) => (
                      <span
                        key={w}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          background: 'rgba(248, 113, 113, 0.08)',
                          border: '1px solid rgba(248, 113, 113, 0.2)',
                          borderRadius: '999px',
                          padding: '5px 14px',
                          color: '#fca5a5',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── Details Grid ── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                {[
                  { label: 'Ruling Planet', value: `${sign.rulingPlanetSymbol} ${sign.rulingPlanet}` },
                  { label: 'Lucky Day', value: sign.luckyDay },
                  { label: 'Gemstone', value: `💎 ${sign.gemstone}` },
                  { label: 'Lucky Numbers', value: sign.luckyNumbers.join(', ') },
                  { label: 'Lucky Colors', value: sign.luckyColors.join(', ') },
                  { label: 'Modality', value: sign.modality },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      ...sectionStyle,
                      padding: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={labelStyle}>{item.label}</div>
                    <div style={valueStyle}>{item.value}</div>
                  </div>
                ))}
              </motion.div>

              {/* ── Compatibility ── */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ ...sectionStyle }}
              >
                <h4 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#e0d8ff',
                  margin: '0 0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <Heart size={15} color="#f472b6" /> Compatibility
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <p style={{ ...labelStyle, color: '#4ade80' }}>Best Matches</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {sign.compatibility.best.map((name) => (
                        <span
                          key={name}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            background: 'rgba(74, 222, 128, 0.08)',
                            border: '1px solid rgba(74, 222, 128, 0.2)',
                            borderRadius: '10px',
                            padding: '6px 14px',
                            color: '#6ee7a0',
                            fontWeight: 600,
                          }}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p style={{ ...labelStyle, color: '#f87171' }}>Challenging Matches</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {sign.compatibility.challenging.map((name) => (
                        <span
                          key={name}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                            background: 'rgba(248, 113, 113, 0.08)',
                            border: '1px solid rgba(248, 113, 113, 0.2)',
                            borderRadius: '10px',
                            padding: '6px 14px',
                            color: '#fca5a5',
                            fontWeight: 600,
                          }}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ZodiacDetailModal;
