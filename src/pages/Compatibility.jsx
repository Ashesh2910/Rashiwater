import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire', color: '#ff6b8a', dates: 'Mar 21 – Apr 19' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', color: '#8bc34a', dates: 'Apr 20 – May 20' },
  { name: 'Gemini', symbol: '♊', element: 'Air', color: '#ffeb3b', dates: 'May 21 – Jun 20' },
  { name: 'Cancer', symbol: '♋', element: 'Water', color: '#b3e5fc', dates: 'Jun 21 – Jul 22' },
  { name: 'Leo', symbol: '♌', element: 'Fire', color: '#ff9800', dates: 'Jul 23 – Aug 22' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', color: '#a1887f', dates: 'Aug 23 – Sep 22' },
  { name: 'Libra', symbol: '♎', element: 'Air', color: '#f48fb1', dates: 'Sep 23 – Oct 22' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', color: '#e53935', dates: 'Oct 23 – Nov 21' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', color: '#9c27b0', dates: 'Nov 22 – Dec 21' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', color: '#607d8b', dates: 'Dec 22 – Jan 19' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', color: '#00bcd4', dates: 'Jan 20 – Feb 18' },
  { name: 'Pisces', symbol: '♓', element: 'Water', color: '#7c4dff', dates: 'Feb 19 – Mar 20' },
];

const ELEMENT_COMPAT = {
  'Fire-Fire': { score: 80, desc: 'Passionate and explosive! Two fire signs create incredible energy but may clash over dominance.' },
  'Fire-Air': { score: 90, desc: 'A dynamic duo! Air fans the flames of Fire, creating an exciting, adventurous bond.' },
  'Fire-Earth': { score: 55, desc: 'A challenging mix. Fire\'s spontaneity clashes with Earth\'s need for stability, but opposites can complement.' },
  'Fire-Water': { score: 50, desc: 'Steam or sizzle? Water can dampen Fire\'s spirit, but with effort, they create a transformative bond.' },
  'Earth-Earth': { score: 85, desc: 'A solid foundation! Two Earth signs build lasting, stable relationships grounded in mutual respect.' },
  'Earth-Air': { score: 60, desc: 'Different wavelengths. Earth finds Air too flighty, while Air feels Earth is too rigid — but they can learn from each other.' },
  'Earth-Water': { score: 88, desc: 'A nurturing match! Water nourishes Earth, and Earth provides the stability Water craves.' },
  'Air-Air': { score: 75, desc: 'Intellectually stimulating! Two Air signs enjoy endless conversations but may lack emotional depth.' },
  'Air-Water': { score: 55, desc: 'A misty combination. Air can feel overwhelmed by Water\'s emotions, but together they create beautiful rain.' },
  'Water-Water': { score: 82, desc: 'Deep, intuitive connection! Two Water signs understand each other\'s emotions like no one else.' },
};

const ASPECTS = {
  love: ['deeply passionate', 'tender and caring', 'magnetically attracted', 'soulful and intimate', 'playful and romantic'],
  friendship: ['loyal and supportive', 'adventurous together', 'intellectually connected', 'emotionally bonded', 'complementary energies'],
  work: ['productive team', 'creative collaborators', 'strategic partners', 'balanced decision-makers', 'inspiring duo'],
};

function getCompatibility(sign1, sign2) {
  const el1 = sign1.element;
  const el2 = sign2.element;
  const key1 = `${el1}-${el2}`;
  const key2 = `${el2}-${el1}`;
  const base = ELEMENT_COMPAT[key1] || ELEMENT_COMPAT[key2] || { score: 65, desc: 'An interesting cosmic connection with room to grow.' };

  // Add variation based on sign names for uniqueness
  const hash = (sign1.name.charCodeAt(0) + sign2.name.charCodeAt(0)) % 15;
  const love = Math.min(100, Math.max(30, base.score + (hash - 7) * 2));
  const friendship = Math.min(100, Math.max(30, base.score + ((hash + 3) % 10 - 5) * 2));
  const work = Math.min(100, Math.max(30, base.score + ((hash + 6) % 12 - 6) * 2));
  const overall = Math.round((love + friendship + work) / 3);

  const dayHash = new Date().getDate();
  return {
    overall, love, friendship, work,
    desc: base.desc,
    loveDesc: ASPECTS.love[(hash + dayHash) % ASPECTS.love.length],
    friendDesc: ASPECTS.friendship[(hash + dayHash + 1) % ASPECTS.friendship.length],
    workDesc: ASPECTS.work[(hash + dayHash + 2) % ASPECTS.work.length],
    strengths: [
      sign1.element === sign2.element ? 'Shared elemental understanding' : 'Complementary elements',
      love > 75 ? 'Strong romantic chemistry' : 'Room for romantic growth',
      friendship > 75 ? 'Natural friendship bond' : 'Friendship needs nurturing',
    ],
    challenges: [
      sign1.element === sign2.element ? 'May mirror each other\'s weaknesses' : 'Different approaches to life',
      base.score < 65 ? 'Communication styles may differ' : 'Managing shared intensity',
    ],
  };
}

const ScoreBar = ({ label, value, color, icon, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    style={{ marginBottom: '20px' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#c4b5fd', fontWeight: 600 }}>
        {icon} {label}
      </span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color, fontWeight: 700 }}>{value}%</span>
    </div>
    <div style={{ height: '8px', background: 'rgba(139,92,246,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ delay: delay + 0.2, duration: 1, ease: [0.33, 1, 0.68, 1] }}
        style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: '4px', boxShadow: `0 0 12px ${color}40` }}
      />
    </div>
    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#5b4e78', marginTop: '4px', display: 'block', fontStyle: 'italic' }}>
      {desc}
    </span>
  </motion.div>
);

const SignSelector = ({ selected, onSelect, label }) => (
  <div>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.15em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>
      {label}
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {SIGNS.map((sign) => (
        <motion.button
          key={sign.name}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(sign)}
          style={{
            background: selected?.name === sign.name
              ? `linear-gradient(135deg, ${sign.color}30, ${sign.color}15)`
              : 'rgba(12,8,45,0.7)',
            border: `1.5px solid ${selected?.name === sign.name ? sign.color : 'rgba(139,92,246,0.15)'}`,
            borderRadius: '12px',
            padding: '14px 6px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
            boxShadow: selected?.name === sign.name ? `0 0 20px ${sign.color}25` : 'none',
          }}
        >
          <span style={{ fontSize: '24px', filter: `drop-shadow(0 0 6px ${sign.color}50)` }}>{sign.symbol}</span>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', color: selected?.name === sign.name ? sign.color : '#6b5e88', fontWeight: 600, letterSpacing: '0.05em' }}>
            {sign.name}
          </span>
        </motion.button>
      ))}
    </div>
  </div>
);

const Compatibility = () => {
  const [sign1, setSign1] = useState(null);
  const [sign2, setSign2] = useState(null);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleCheck = () => {
    if (!sign1 || !sign2) return;
    const r = getCompatibility(sign1, sign2);
    setResult(r);
    setShowResult(true);
  };

  const handleReset = () => {
    setSign1(null);
    setSign2(null);
    setResult(null);
    setShowResult(false);
  };

  return (
    <section style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(196,51,153,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px' }}>
            Cosmic Chemistry
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)', background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 20px 0', fontWeight: 400 }}>
            Zodiac Compatibility
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: '16px', color: '#8070a8', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
            Discover how the stars align between two zodiac signs. Select your sign and your partner&apos;s to reveal your cosmic chemistry.
          </motion.p>
        </div>

        {!showResult ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '32px', alignItems: 'center', marginBottom: '48px' }}>
              <SignSelector selected={sign1} onSelect={setSign1} label="Your Sign" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '40px', filter: 'drop-shadow(0 0 12px rgba(196,51,153,0.5))' }}
                >
                  💫
                </motion.div>
                <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#5b4e78', letterSpacing: '0.1em' }}>×</span>
              </div>
              <SignSelector selected={sign2} onSelect={setSign2} label="Partner's Sign" />
            </div>

            <div style={{ textAlign: 'center' }}>
              <motion.button
                whileHover={sign1 && sign2 ? { scale: 1.05, boxShadow: '0 0 40px rgba(196,51,153,0.5)' } : {}}
                whileTap={sign1 && sign2 ? { scale: 0.95 } : {}}
                onClick={handleCheck}
                disabled={!sign1 || !sign2}
                style={{
                  background: sign1 && sign2 ? 'linear-gradient(135deg, #c43399, #9d1773)' : 'rgba(100,70,200,0.2)',
                  color: sign1 && sign2 ? '#fff' : '#5b4e78',
                  border: 'none', borderRadius: '999px', padding: '16px 48px',
                  fontSize: '14px', fontFamily: 'Inter, sans-serif',
                  cursor: sign1 && sign2 ? 'pointer' : 'not-allowed', fontWeight: 700,
                  letterSpacing: '0.1em',
                  boxShadow: sign1 && sign2 ? '0 4px 20px rgba(196,51,153,0.4)' : 'none',
                  transition: 'all 0.3s',
                }}
              >
                ✦ Check Compatibility
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Result Header */}
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginBottom: '24px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px', filter: `drop-shadow(0 0 12px ${sign1.color}60)` }}>{sign1.symbol}</div>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', color: sign1.color, fontWeight: 600 }}>{sign1.name}</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    style={{
                      width: '100px', height: '100px', borderRadius: '50%',
                      background: `conic-gradient(${sign1.color} 0%, ${sign2.color} 50%, ${sign1.color} 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 30px ${sign1.color}30, 0 0 30px ${sign2.color}30`,
                    }}
                  >
                    <div style={{
                      width: '80px', height: '80px', borderRadius: '50%',
                      background: 'rgba(8,4,28,0.95)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexDirection: 'column',
                    }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 800, color: '#f0eeff' }}>{result.overall}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '8px', color: '#8b5cf6', letterSpacing: '0.15em' }}>MATCH</span>
                    </div>
                  </motion.div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px', filter: `drop-shadow(0 0 12px ${sign2.color}60)` }}>{sign2.symbol}</div>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', color: sign2.color, fontWeight: 600 }}>{sign2.name}</span>
                  </div>
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8, fontStyle: 'italic' }}>
                  &quot;{result.desc}&quot;
                </motion.p>
              </div>

              {/* Score Bars */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '48px' }}>
                <div style={{ background: 'rgba(10,6,38,0.85)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '20px', padding: '32px', backdropFilter: 'blur(14px)' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#c4b5fd', margin: '0 0 24px' }}>Compatibility Scores</h3>
                  <ScoreBar label="Love & Romance" value={result.love} color="#f472b6" icon="💕" desc={result.loveDesc} delay={0.3} />
                  <ScoreBar label="Friendship" value={result.friendship} color="#8b5cf6" icon="🤝" desc={result.friendDesc} delay={0.5} />
                  <ScoreBar label="Work & Career" value={result.work} color="#34d399" icon="💼" desc={result.workDesc} delay={0.7} />
                </div>

                <div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    style={{ background: 'rgba(10,6,38,0.85)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: '20px', padding: '24px', marginBottom: '20px' }}>
                    <h4 style={{ fontFamily: 'Inter', fontSize: '13px', color: '#34d399', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>✦ Strengths</h4>
                    {result.strengths.map((s, i) => (
                      <div key={i} style={{ fontFamily: 'Inter', fontSize: '13px', color: '#8070a8', lineHeight: 1.8, paddingLeft: '16px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#34d399' }}>+</span> {s}
                      </div>
                    ))}
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    style={{ background: 'rgba(10,6,38,0.85)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '20px', padding: '24px' }}>
                    <h4 style={{ fontFamily: 'Inter', fontSize: '13px', color: '#f87171', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>⚡ Challenges</h4>
                    {result.challenges.map((c, i) => (
                      <div key={i} style={{ fontFamily: 'Inter', fontSize: '13px', color: '#8070a8', lineHeight: 1.8, paddingLeft: '16px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#f87171' }}>–</span> {c}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  style={{
                    background: 'transparent', color: '#c4b5fd',
                    border: '1px solid rgba(139,92,246,0.3)', borderRadius: '999px',
                    padding: '14px 36px', fontSize: '13px', fontFamily: 'Inter', fontWeight: 600,
                    cursor: 'pointer', letterSpacing: '0.08em', transition: 'all 0.2s',
                  }}
                >
                  ← Try Another Pair
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Compatibility;
