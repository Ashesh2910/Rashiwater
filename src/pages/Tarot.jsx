import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateTarotReading } from '../services/geminiService';


const MAJOR_ARCANA = [
  { id: 0, name: 'The Fool', numeral: '0', meaning: 'New beginnings, spontaneity, and a free spirit. Trust the journey ahead.', reversed: 'Recklessness, risk-taking, or holding back from a leap of faith.', emoji: '🃏', color: '#fbbf24' },
  { id: 1, name: 'The Magician', numeral: 'I', meaning: 'Manifestation, resourcefulness, and power. You have all the tools you need.', reversed: 'Manipulation, poor planning, or untapped talents.', emoji: '🎩', color: '#8b5cf6' },
  { id: 2, name: 'The High Priestess', numeral: 'II', meaning: 'Intuition, sacred knowledge, and divine feminine. Trust your inner voice.', reversed: 'Secrets, withdrawal, or silenced intuition.', emoji: '🌙', color: '#818cf8' },
  { id: 3, name: 'The Empress', numeral: 'III', meaning: 'Fertility, beauty, nature, and abundance. Nurture creativity and growth.', reversed: 'Dependence, smothering, or creative block.', emoji: '👑', color: '#34d399' },
  { id: 4, name: 'The Emperor', numeral: 'IV', meaning: 'Authority, structure, and a solid foundation. Take charge with wisdom.', reversed: 'Tyranny, rigidity, or lack of discipline.', emoji: '🏛️', color: '#f87171' },
  { id: 5, name: 'The Hierophant', numeral: 'V', meaning: 'Tradition, conformity, and spiritual wisdom. Seek guidance from a mentor.', reversed: 'Rebellion, subversiveness, or new approaches.', emoji: '📿', color: '#a78bfa' },
  { id: 6, name: 'The Lovers', numeral: 'VI', meaning: 'Love, harmony, and relationships. A meaningful connection or choice approaches.', reversed: 'Disharmony, imbalance, or misalignment of values.', emoji: '💕', color: '#f472b6' },
  { id: 7, name: 'The Chariot', numeral: 'VII', meaning: 'Willpower, determination, and triumph. Victory through confidence and control.', reversed: 'Aggression, lack of direction, or obstacles.', emoji: '⚡', color: '#60a5fa' },
  { id: 8, name: 'Strength', numeral: 'VIII', meaning: 'Inner strength, bravery, and compassion. Gentle power overcomes all.', reversed: 'Self-doubt, weakness, or raw emotion.', emoji: '🦁', color: '#fbbf24' },
  { id: 9, name: 'The Hermit', numeral: 'IX', meaning: 'Soul-searching, introspection, and inner guidance. Seek solitude for answers.', reversed: 'Isolation, loneliness, or withdrawal.', emoji: '🏔️', color: '#94a3b8' },
  { id: 10, name: 'Wheel of Fortune', numeral: 'X', meaning: 'Good luck, karma, and life cycles. Destiny is turning in your favour.', reversed: 'Bad luck, resistance to change, or breaking cycles.', emoji: '🎡', color: '#c084fc' },
  { id: 11, name: 'Justice', numeral: 'XI', meaning: 'Fairness, truth, and cause and effect. The universe weighs your actions.', reversed: 'Unfairness, lack of accountability, or dishonesty.', emoji: '⚖️', color: '#67e8f9' },
  { id: 12, name: 'The Hanged Man', numeral: 'XII', meaning: 'Surrender, new perspective, and letting go. Pause to gain clarity.', reversed: 'Stalling, resistance, or indecision.', emoji: '🙃', color: '#a78bfa' },
  { id: 13, name: 'Death', numeral: 'XIII', meaning: 'Endings, change, and transformation. The old makes way for the new.', reversed: 'Resistance to change, inability to move on.', emoji: '🦋', color: '#1e1b4b' },
  { id: 14, name: 'Temperance', numeral: 'XIV', meaning: 'Balance, moderation, and patience. Harmony comes through middle paths.', reversed: 'Imbalance, excess, or lack of long-term vision.', emoji: '⏳', color: '#34d399' },
  { id: 15, name: 'The Devil', numeral: 'XV', meaning: 'Shadow self, attachment, and restrictions. Examine what binds you.', reversed: 'Release, breaking free, or reclaiming power.', emoji: '🔥', color: '#ef4444' },
  { id: 16, name: 'The Tower', numeral: 'XVI', meaning: 'Sudden upheaval, revelation, and awakening. Destruction precedes rebuilding.', reversed: 'Avoidance of disaster, fear of change.', emoji: '⚡', color: '#f59e0b' },
  { id: 17, name: 'The Star', numeral: 'XVII', meaning: 'Hope, faith, and renewal. The universe is guiding you toward healing.', reversed: 'Despair, disconnection, or lack of faith.', emoji: '⭐', color: '#c4b5fd' },
  { id: 18, name: 'The Moon', numeral: 'XVIII', meaning: 'Illusion, fear, and the subconscious. Not everything is as it seems.', reversed: 'Release of fear, repressed emotion, or inner confusion.', emoji: '🌕', color: '#e0d8ff' },
  { id: 19, name: 'The Sun', numeral: 'XIX', meaning: 'Joy, success, and vitality. Positivity radiates from within you today.', reversed: 'Inner child, sadness, or overly optimistic.', emoji: '☀️', color: '#fbbf24' },
  { id: 20, name: 'Judgement', numeral: 'XX', meaning: 'Rebirth, inner calling, and absolution. Answer your higher calling.', reversed: 'Self-doubt, refusal of self-examination.', emoji: '📯', color: '#f472b6' },
  { id: 21, name: 'The World', numeral: 'XXI', meaning: 'Completion, accomplishment, and travel. A cycle reaches its beautiful end.', reversed: 'Incompletion, shortcuts, or delays.', emoji: '🌍', color: '#34d399' },
];

const POSITIONS = ['Past', 'Present', 'Future'];

const TarotCard = ({ card, isRevealed, isReversed, index, onReveal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      style={{ perspective: '800px', cursor: isRevealed ? 'default' : 'pointer' }}
      onClick={() => !isRevealed && onReveal(index)}
    >
      {/* Position label */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.15em', color: '#8b5cf6', textTransform: 'uppercase' }}>
          {POSITIONS[index]}
        </span>
      </div>

      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        style={{ width: '220px', height: '340px', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #1a0b3e, #2d1062)',
          border: '2px solid rgba(139,92,246,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}>
          {/* Decorative pattern */}
          <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '12px' }} />
          <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(139,92,246,0.1)', borderRadius: '8px' }} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '48px', filter: 'drop-shadow(0 0 16px rgba(139,92,246,0.5))' }}
          >
            ✦
          </motion.div>
          <span style={{ fontFamily: 'Great Vibes, cursive', fontSize: '22px', color: '#c4b5fd' }}>
            Tap to Reveal
          </span>
        </div>

        {/* Card Front */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: '16px',
          background: `linear-gradient(160deg, rgba(16,10,50,0.98), rgba(8,4,28,0.98))`,
          border: `2px solid ${card.color}40`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${card.color}15`,
          overflow: 'hidden',
          transform: isReversed ? 'rotateY(180deg) rotateZ(180deg)' : 'rotateY(180deg)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }} />

          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: card.color, letterSpacing: '0.2em', marginBottom: '8px' }}>
            {card.numeral}
          </span>
          <span style={{ fontSize: '52px', marginBottom: '12px', filter: `drop-shadow(0 0 12px ${card.color}60)` }}>
            {card.emoji}
          </span>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#f0eeff', fontWeight: 600, textAlign: 'center', marginBottom: '4px' }}>
            {card.name}
          </span>
          {isReversed && (
            <span style={{ fontFamily: 'Inter', fontSize: '9px', color: '#f87171', letterSpacing: '0.15em', background: 'rgba(248,113,113,0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(248,113,113,0.2)', marginBottom: '8px' }}>
              REVERSED
            </span>
          )}
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#8070a8', lineHeight: 1.7, textAlign: 'center', margin: '8px 0 0' }}>
            {isReversed ? card.reversed : card.meaning}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Tarot = () => {
  const [phase, setPhase] = useState('intro'); // intro | spread | reading
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [reversals, setReversals] = useState([]);
  const [aiReading, setAiReading] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (revealedCards.length === 3 && !aiReading && !isGenerating) {
      const getAiReading = async () => {
        setIsGenerating(true);
        const cardsForAi = drawnCards.map((c, i) => ({
          ...c,
          isReversed: reversals[i],
          position: POSITIONS[i]
        }));
        const reading = await generateTarotReading(cardsForAi);
        setAiReading(reading);
        setIsGenerating(false);
      };
      getAiReading();
    }
  }, [revealedCards, drawnCards, reversals, aiReading, isGenerating]);

  const drawCards = useCallback(() => {
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, 3);
    const revs = chosen.map(() => Math.random() > 0.7); // 30% chance reversed
    setDrawnCards(chosen);
    setReversals(revs);
    setRevealedCards([]);
    setAiReading(null);
    setPhase('spread');
  }, []);

  const revealCard = (index) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards(prev => [...prev, index]);
    }
  };

  const allRevealed = revealedCards.length === 3;

  const reset = () => {
    setPhase('intro');
    setDrawnCards([]);
    setRevealedCards([]);
    setReversals([]);
    setAiReading(null);
  };


  return (
    <section style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px' }}>
            Mystic Guidance
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)', background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 20px 0', fontWeight: 400 }}>
            Daily Tarot Reading
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: '16px', color: '#8070a8', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
            The cards hold ancient wisdom. Draw three cards to reveal insights about your past, present, and future.
          </motion.p>
        </div>

        {phase === 'intro' && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ textAlign: 'center' }}>
            {/* Card deck animation */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px', position: 'relative', height: '200px' }}>
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0], rotate: (i - 2) * 5 }}
                  transition={{ y: { duration: 2, repeat: Infinity, delay: i * 0.2 } }}
                  style={{
                    position: 'absolute',
                    width: '140px', height: '200px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${i === 2 ? '#2d1062' : '#1a0b3e'}, ${i === 2 ? '#3d1082' : '#1a0b3e'})`,
                    border: '1.5px solid rgba(139,92,246,0.25)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    left: `calc(50% - 70px + ${(i - 2) * 15}px)`,
                    top: `${Math.abs(i - 2) * 5}px`,
                    zIndex: 5 - Math.abs(i - 2),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '28px', opacity: 0.5 }}>✦</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139,92,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={drawCards}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff', border: 'none', borderRadius: '999px',
                padding: '16px 48px', fontSize: '14px', fontFamily: 'Inter, sans-serif',
                cursor: 'pointer', fontWeight: 700, letterSpacing: '0.1em',
                boxShadow: '0 4px 24px rgba(109,40,217,0.4)',
              }}
            >
              ✦ Draw Three Cards
            </motion.button>
          </motion.div>
        )}

        {phase === 'spread' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginBottom: '48px' }}>
              {drawnCards.map((card, i) => (
                <TarotCard
                  key={card.id}
                  card={card}
                  index={i}
                  isRevealed={revealedCards.includes(i)}
                  isReversed={reversals[i]}
                  onReveal={revealCard}
                  position={POSITIONS[i]}
                />
              ))}
            </div>

            {!allRevealed && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '13px', color: '#5b4e78', fontStyle: 'italic' }}>
                ✦ Tap each card to reveal your reading
              </motion.p>
            )}

            {allRevealed && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginTop: '32px' }}>
                <div style={{
                  background: 'rgba(10,6,38,0.85)', border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: '20px', padding: '32px', maxWidth: '600px', margin: '0 auto 32px', backdropFilter: 'blur(14px)',
                }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#c4b5fd', margin: '0 0 16px' }}>
                    ✦ Your AI-Synthesized Reading
                  </h3>
                  {isGenerating ? (
                    <div style={{ padding: '20px' }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block', fontSize: '24px', color: '#8b5cf6', marginBottom: '12px' }}>
                        ✦
                      </motion.div>
                      <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#5b4e78' }}>Gemini is interpreting the cards...</p>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#c4b5fd', lineHeight: 1.85, marginBottom: '20px', fontStyle: 'italic' }}>
                        &quot;{aiReading || 'The cards are aligning for you...'}&quot;
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                         {drawnCards.map((c, i) => (
                           <span key={i} style={{ fontSize: '10px', color: '#5b4e78', border: '1px solid rgba(139,92,246,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                             {c.name} {reversals[i] ? 'rev' : ''}
                           </span>
                         ))}
                      </div>
                    </>
                  )}

                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  style={{
                    background: 'transparent', color: '#c4b5fd',
                    border: '1px solid rgba(139,92,246,0.3)', borderRadius: '999px',
                    padding: '14px 36px', fontSize: '13px', fontFamily: 'Inter', fontWeight: 600,
                    cursor: 'pointer', letterSpacing: '0.08em',
                  }}
                >
                  ← Draw Again
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tarot;
