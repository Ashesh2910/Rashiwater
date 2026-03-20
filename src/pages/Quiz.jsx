import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    q: 'How do you usually start your mornings?',
    options: [
      { text: 'Jump right into action — no time to waste!', scores: { Aries: 3, Leo: 2, Sagittarius: 1 } },
      { text: 'A slow, cosy routine with coffee and comfort', scores: { Taurus: 3, Cancer: 2, Pisces: 1 } },
      { text: 'Scroll my phone, catch up on everything new', scores: { Gemini: 3, Aquarius: 2, Libra: 1 } },
      { text: 'Plan and organise my entire day ahead', scores: { Virgo: 3, Capricorn: 2, Scorpio: 1 } },
    ],
  },
  {
    q: 'At a party, you\'re most likely to…',
    options: [
      { text: 'Be the centre of attention, telling stories', scores: { Leo: 3, Sagittarius: 2, Aries: 1 } },
      { text: 'Find the deepest conversation in the room', scores: { Scorpio: 3, Pisces: 2, Aquarius: 1 } },
      { text: 'Mingle with everyone, making new friends', scores: { Gemini: 3, Libra: 2, Sagittarius: 1 } },
      { text: 'Stick with my close friends in a quiet corner', scores: { Cancer: 3, Taurus: 2, Virgo: 1 } },
    ],
  },
  {
    q: 'Your ideal vacation would be…',
    options: [
      { text: 'An adventurous trek through mountains', scores: { Sagittarius: 3, Aries: 2, Capricorn: 1 } },
      { text: 'A luxury resort with spa and fine dining', scores: { Taurus: 3, Libra: 2, Leo: 1 } },
      { text: 'Exploring historic ruins and museums', scores: { Virgo: 3, Capricorn: 2, Scorpio: 1 } },
      { text: 'A quiet beach with a stack of books', scores: { Pisces: 3, Cancer: 2, Aquarius: 1 } },
    ],
  },
  {
    q: 'When facing a tough decision, you…',
    options: [
      { text: 'Trust your gut and decide immediately', scores: { Aries: 3, Sagittarius: 2, Leo: 1 } },
      { text: 'Analyse every pro and con methodically', scores: { Virgo: 3, Capricorn: 2, Libra: 1 } },
      { text: 'Ask friends and family for their opinions', scores: { Libra: 3, Gemini: 2, Cancer: 1 } },
      { text: 'Sleep on it and let intuition guide you', scores: { Pisces: 3, Scorpio: 2, Aquarius: 1 } },
    ],
  },
  {
    q: 'Your friends would describe you as…',
    options: [
      { text: 'Bold, fearless, and a natural leader', scores: { Aries: 3, Leo: 2, Capricorn: 1 } },
      { text: 'Loyal, dependable, and always there', scores: { Taurus: 3, Cancer: 2, Virgo: 1 } },
      { text: 'Witty, curious, and never boring', scores: { Gemini: 3, Aquarius: 2, Sagittarius: 1 } },
      { text: 'Deep, mysterious, and intensely passionate', scores: { Scorpio: 3, Pisces: 2, Leo: 1 } },
    ],
  },
  {
    q: 'What matters most in a relationship?',
    options: [
      { text: 'Passion and excitement', scores: { Aries: 3, Leo: 2, Scorpio: 1 } },
      { text: 'Security and commitment', scores: { Taurus: 3, Cancer: 2, Capricorn: 1 } },
      { text: 'Intellectual connection', scores: { Gemini: 3, Aquarius: 2, Virgo: 1 } },
      { text: 'Emotional depth and soulful bond', scores: { Pisces: 3, Scorpio: 2, Cancer: 1 } },
    ],
  },
  {
    q: 'Pick a superpower:',
    options: [
      { text: 'Super strength — unstoppable force', scores: { Aries: 3, Leo: 2, Capricorn: 1 } },
      { text: 'Telepathy — read everyone\'s mind', scores: { Scorpio: 3, Pisces: 2, Gemini: 1 } },
      { text: 'Time travel — explore all eras', scores: { Sagittarius: 3, Aquarius: 2, Gemini: 1 } },
      { text: 'Healing — help everyone around you', scores: { Virgo: 3, Cancer: 2, Libra: 1 } },
    ],
  },
  {
    q: 'Your dream home is…',
    options: [
      { text: 'A penthouse in the heart of the city', scores: { Leo: 3, Gemini: 2, Aries: 1 } },
      { text: 'A cosy cottage in the countryside', scores: { Cancer: 3, Taurus: 2, Virgo: 1 } },
      { text: 'A modern, minimalist smart home', scores: { Aquarius: 3, Capricorn: 2, Libra: 1 } },
      { text: 'A seaside villa with ocean views', scores: { Pisces: 3, Libra: 2, Sagittarius: 1 } },
    ],
  },
];

const SIGN_DATA = {
  Aries: { symbol: '♈', color: '#ff6b8a', trait: 'The Bold Pioneer', desc: 'You are a natural-born leader who thrives on challenge and competition. Your energy is magnetic, your courage is admirable, and your passion is contagious.' },
  Taurus: { symbol: '♉', color: '#8bc34a', trait: 'The Steadfast Guardian', desc: 'You value stability, comfort, and the finer things in life. Patient and reliable, you build lasting foundations and appreciate beauty in all forms.' },
  Gemini: { symbol: '♊', color: '#ffeb3b', trait: 'The Curious Communicator', desc: 'Your mind is always buzzing with ideas. Adaptable and social, you light up every room with your wit and charm.' },
  Cancer: { symbol: '♋', color: '#b3e5fc', trait: 'The Nurturing Soul', desc: 'Deeply intuitive and emotional, you create safe havens for those you love. Your empathy and loyalty are your greatest strengths.' },
  Leo: { symbol: '♌', color: '#ff9800', trait: 'The Radiant Ruler', desc: 'Born to shine, you exude confidence and charisma. Generous and warm-hearted, you inspire everyone around you.' },
  Virgo: { symbol: '♍', color: '#a1887f', trait: 'The Analytical Healer', desc: 'Detail-oriented and thoughtful, you see what others miss. Your desire to help and perfect makes you invaluable.' },
  Libra: { symbol: '♎', color: '#f48fb1', trait: 'The Harmonious Diplomat', desc: 'You seek beauty, balance, and fairness in all things. Your charm and grace make you a natural peacemaker.' },
  Scorpio: { symbol: '♏', color: '#e53935', trait: 'The Deep Transformer', desc: 'Intense and magnetic, you feel everything deeply. Your determination and insight make you a powerful force for change.' },
  Sagittarius: { symbol: '♐', color: '#9c27b0', trait: 'The Free Explorer', desc: 'Adventurous and optimistic, you live for new experiences. Your philosophical mind seeks meaning in everything.' },
  Capricorn: { symbol: '♑', color: '#607d8b', trait: 'The Ambitious Strategist', desc: 'Disciplined and determined, you climb every mountain in your path. Your patience and persistence always pay off.' },
  Aquarius: { symbol: '♒', color: '#00bcd4', trait: 'The Visionary Rebel', desc: 'Original and independent, you think ahead of your time. Your humanitarian spirit and unique perspective change the world.' },
  Pisces: { symbol: '♓', color: '#7c4dff', trait: 'The Mystical Dreamer', desc: 'Imaginative and compassionate, you feel the world deeply. Your artistic soul and spiritual insight connect you to the divine.' },
};

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (option) => {
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([sign, pts]) => {
      newScores[sign] = (newScores[sign] || 0) + pts;
    });
    setScores(newScores);

    if (current + 1 >= QUESTIONS.length) {
      // Calculate result
      const topSign = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult({ sign: topSign, ...SIGN_DATA[topSign] });
    } else {
      setCurrent(current + 1);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScores({});
    setResult(null);
  };

  return (
    <section style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px' }}>
            Personality Test
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(46px, 7vw, 72px)', background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 20px 0', fontWeight: 400 }}>
            What&apos;s Your Sign?
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            Answer 8 personality questions to discover which zodiac energy resonates most with your soul.
          </motion.p>
        </div>

        {!result ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress bar */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#5b4e78' }}>Question {current + 1} of {QUESTIONS.length}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#8b5cf6' }}>{Math.round(((current + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(139,92,246,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: `${(current / QUESTIONS.length) * 100}%` }}
                    animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #c43399)', borderRadius: '2px' }}
                  />
                </div>
              </div>

              {/* Question */}
              <div style={{ background: 'rgba(10,6,38,0.85)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '20px', padding: '36px', backdropFilter: 'blur(14px)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: '#f0eeff', margin: '0 0 28px', lineHeight: 1.4 }}>
                  {QUESTIONS[current].q}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {QUESTIONS[current].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 6, background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt)}
                      style={{
                        background: 'rgba(12,8,45,0.6)',
                        border: '1px solid rgba(139,92,246,0.15)',
                        borderRadius: '12px', padding: '16px 20px',
                        textAlign: 'left', cursor: 'pointer',
                        fontFamily: 'Inter', fontSize: '14px', color: '#c4b5fd',
                        lineHeight: 1.5, transition: 'all 0.2s',
                      }}
                    >
                      {opt.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 24px',
                background: `radial-gradient(circle, ${result.color}30, transparent)`,
                border: `2px solid ${result.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '56px', boxShadow: `0 0 40px ${result.color}30`,
              }}
            >
              {result.symbol}
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.2em', color: result.color, textTransform: 'uppercase', marginBottom: '8px' }}>
              Your Zodiac Energy
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ fontFamily: 'Great Vibes, cursive', fontSize: '56px', color: '#f0eeff', margin: '0 0 8px', fontWeight: 400 }}>
              {result.sign}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: result.color, fontStyle: 'italic', margin: '0 0 24px' }}>
              &quot;{result.trait}&quot;
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              style={{ background: 'rgba(10,6,38,0.85)', border: `1px solid ${result.color}20`, borderRadius: '20px', padding: '32px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', lineHeight: 1.85, margin: 0 }}>
                {result.desc}
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              style={{
                background: 'transparent', color: '#c4b5fd',
                border: '1px solid rgba(139,92,246,0.3)', borderRadius: '999px',
                padding: '14px 36px', fontSize: '13px', fontFamily: 'Inter', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '0.08em',
              }}
            >
              ← Take Quiz Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Quiz;
