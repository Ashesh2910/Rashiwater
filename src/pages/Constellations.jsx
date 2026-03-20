import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeSkyMap from '../components/ThreeSkyMap';
import { Bell } from 'lucide-react';


// Zodiac constellation data with star positions (relative 0-100 grid) and connections
const CONSTELLATIONS = [
  {
    name: 'Aries', symbol: '♈', color: '#ff6b8a', mythology: 'The Golden Ram that carried Phrixus to safety. Its fleece became the legendary Golden Fleece sought by Jason and the Argonauts.',
    stars: [{x:20,y:30},{x:35,y:20},{x:50,y:25},{x:60,y:40}],
    lines: [[0,1],[1,2],[2,3]],
    brightStar: 'Hamal (α Arietis)',
  },
  {
    name: 'Taurus', symbol: '♉', color: '#8bc34a', mythology: 'Zeus disguised himself as a magnificent white bull to carry Europa across the sea. The Pleiades star cluster adorns its shoulder.',
    stars: [{x:15,y:45},{x:30,y:35},{x:45,y:30},{x:55,y:35},{x:65,y:25},{x:40,y:50},{x:55,y:55}],
    lines: [[0,1],[1,2],[2,3],[3,4],[2,5],[5,6]],
    brightStar: 'Aldebaran (α Tauri)',
  },
  {
    name: 'Gemini', symbol: '♊', color: '#ffeb3b', mythology: 'Castor and Pollux, the divine twins of Greek mythology. When Castor died, Pollux shared his immortality so they would never be separated.',
    stars: [{x:30,y:15},{x:55,y:15},{x:25,y:35},{x:60,y:35},{x:20,y:55},{x:65,y:55},{x:30,y:70},{x:55,y:70}],
    lines: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,7]],
    brightStar: 'Pollux (β Geminorum)',
  },
  {
    name: 'Cancer', symbol: '♋', color: '#b3e5fc', mythology: 'The crab sent by Hera to distract Hercules during his battle with the Hydra. Though crushed, Hera placed it among the stars.',
    stars: [{x:30,y:30},{x:50,y:25},{x:65,y:35},{x:40,y:50},{x:55,y:55}],
    lines: [[0,1],[1,2],[0,3],[3,4],[1,3]],
    brightStar: 'Al Tarf (β Cancri)',
  },
  {
    name: 'Leo', symbol: '♌', color: '#ff9800', mythology: 'The Nemean Lion slain by Hercules as his first labour. Its impenetrable hide made it invulnerable to mortal weapons.',
    stars: [{x:25,y:20},{x:40,y:15},{x:55,y:20},{x:65,y:30},{x:60,y:50},{x:45,y:55},{x:30,y:45}],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]],
    brightStar: 'Regulus (α Leonis)',
  },
  {
    name: 'Virgo', symbol: '♍', color: '#a1887f', mythology: 'Astraea, the goddess of justice, was the last immortal to leave Earth during the Golden Age. She holds the scales of justice (Libra).',
    stars: [{x:45,y:15},{x:55,y:30},{x:40,y:40},{x:60,y:50},{x:30,y:55},{x:50,y:65},{x:70,y:60}],
    lines: [[0,1],[1,2],[1,3],[2,4],[3,5],[3,6]],
    brightStar: 'Spica (α Virginis)',
  },
  {
    name: 'Libra', symbol: '♎', color: '#f48fb1', mythology: 'The only zodiac constellation representing an inanimate object — the scales of justice held by Astraea (Virgo).',
    stars: [{x:40,y:20},{x:60,y:20},{x:30,y:45},{x:70,y:45},{x:50,y:65}],
    lines: [[0,1],[0,2],[1,3],[2,4],[3,4]],
    brightStar: 'Zubeneschamali (β Librae)',
  },
  {
    name: 'Scorpio', symbol: '♏', color: '#e53935', mythology: 'The great scorpion sent by Gaia to slay Orion the hunter. They were placed on opposite sides of the sky so they never appear together.',
    stars: [{x:15,y:30},{x:25,y:25},{x:35,y:30},{x:45,y:35},{x:55,y:45},{x:65,y:55},{x:75,y:50},{x:80,y:40}],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
    brightStar: 'Antares (α Scorpii)',
  },
  {
    name: 'Sagittarius', symbol: '♐', color: '#9c27b0', mythology: 'Chiron, the wisest of centaurs, a teacher of heroes. Unlike other centaurs, he was civilised, scholarly, and kind.',
    stars: [{x:30,y:20},{x:45,y:15},{x:50,y:30},{x:40,y:45},{x:55,y:50},{x:65,y:40},{x:60,y:60}],
    lines: [[0,1],[1,2],[2,3],[2,5],[3,4],[4,6],[5,4]],
    brightStar: 'Kaus Australis (ε Sgr)',
  },
  {
    name: 'Capricorn', symbol: '♑', color: '#607d8b', mythology: 'The sea-goat Pricus, father of all sea-goats, who could manipulate time. Unable to prevent his children from becoming land goats.',
    stars: [{x:25,y:30},{x:40,y:20},{x:60,y:25},{x:70,y:40},{x:55,y:55},{x:35,y:50}],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]],
    brightStar: 'Deneb Algedi (δ Cap)',
  },
  {
    name: 'Aquarius', symbol: '♒', color: '#00bcd4', mythology: 'Ganymede, the most beautiful mortal, carried to Olympus by Zeus to serve as cupbearer to the gods for all eternity.',
    stars: [{x:35,y:15},{x:50,y:20},{x:45,y:35},{x:60,y:40},{x:35,y:50},{x:55,y:60},{x:70,y:55}],
    lines: [[0,1],[1,2],[2,3],[2,4],[4,5],[3,6]],
    brightStar: 'Sadalsuud (β Aquarii)',
  },
  {
    name: 'Pisces', symbol: '♓', color: '#7c4dff', mythology: 'Aphrodite and Eros transformed into fish to escape the monster Typhon, tying themselves together with a cord so they would not lose each other.',
    stars: [{x:20,y:30},{x:30,y:20},{x:45,y:25},{x:55,y:35},{x:50,y:50},{x:65,y:55},{x:75,y:45}],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]],
    brightStar: 'Eta Piscium (η Psc)',
  },
];

// Pre-generated background stars (module level, safe from React purity rules)
const BG_STARS = Array.from({ length: 40 }, (_, i) => ({
  cx: ((i * 37 + 13) % 100), cy: ((i * 23 + 7) % 80),
  r: 0.1 + (i % 5) * 0.08, opacity: 0.1 + (i % 4) * 0.1,
}));

const ConstellationViewer = ({ constellation, onClose }) => {
  const bgStars = BG_STARS;

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(4,2,16,0.95)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(12px)',
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={e => e.stopPropagation()}
      style={{
        width: '800px', maxWidth: '90vw', maxHeight: '85vh',
        display: 'grid', gridTemplateColumns: '1.2fr 1fr',
        background: 'rgba(10,6,38,0.95)', border: `1px solid ${constellation.color}30`,
        borderRadius: '24px', overflow: 'hidden',
        boxShadow: `0 0 60px ${constellation.color}15, 0 20px 60px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Star Map */}
      <div style={{ background: 'rgba(4,2,16,0.8)', padding: '40px', position: 'relative' }}>
        <svg viewBox="0 0 100 80" style={{ width: '100%', height: '100%' }}>
          {/* Background stars */}
          {bgStars.map((s, i) => (
            <circle key={`bg-${i}`} cx={s.cx} cy={s.cy} r={s.r}
              fill={`rgba(200,190,255,${s.opacity})`} />
          ))}
          {/* Connection lines */}
          {constellation.lines.map(([a, b], i) => (
            <motion.line key={i}
              x1={constellation.stars[a].x} y1={constellation.stars[a].y}
              x2={constellation.stars[b].x} y2={constellation.stars[b].y}
              stroke={`${constellation.color}60`} strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
          {/* Stars */}
          {constellation.stars.map((star, i) => (
            <g key={i}>
              <motion.circle
                cx={star.x} cy={star.y} r="2.5"
                fill={`${constellation.color}20`}
                initial={{ scale: 0 }} animate={{ scale: [1, 1.5, 1] }}
                transition={{ delay: i * 0.08, duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx={star.x} cy={star.y} r="1.2"
                fill={i === 0 ? constellation.color : '#e0d8ff'}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.08, type: 'spring' }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Info Panel */}
      <div style={{ padding: '40px', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: '#5b4e78', fontSize: '24px', cursor: 'pointer' }}>×</button>

        <div style={{ fontSize: '48px', marginBottom: '8px', filter: `drop-shadow(0 0 12px ${constellation.color}60)` }}>
          {constellation.symbol}
        </div>
        <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '42px', color: '#f0eeff', margin: '0 0 8px', fontWeight: 400 }}>
          {constellation.name}
        </h2>
        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: constellation.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
          {constellation.stars.length} Stars · {constellation.brightStar}
        </div>

        <div style={{ width: '40px', height: '2px', background: `linear-gradient(90deg, ${constellation.color}, transparent)`, marginBottom: '24px' }} />

        <h4 style={{ fontFamily: 'Inter', fontSize: '11px', color: '#8b5cf6', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 12px' }}>
          Mythology & Origin
        </h4>
        <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#8070a8', lineHeight: 1.85, margin: '0 0 24px' }}>
          {constellation.mythology}
        </p>

        <div style={{
          background: `${constellation.color}10`, border: `1px solid ${constellation.color}20`,
          borderRadius: '12px', padding: '16px',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '11px', color: constellation.color, fontWeight: 600, letterSpacing: '0.1em' }}>
            ✦ BRIGHTEST STAR
          </span>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', color: '#f0eeff', margin: '6px 0 0' }}>
            {constellation.brightStar}
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
  );
};

const Constellations = () => {
  const [selected, setSelected] = useState(null);
  const [notifStatus, setNotifStatus] = useState('idle'); // idle | granted | denied

  const requestNotification = async () => {
    if (!('Notification' in window)) {
        alert('This browser does not support cosmic notifications.');
        return;
    }

    const permission = await Notification.requestPermission();
    setNotifStatus(permission);

    if (permission === 'granted') {
        new Notification('✦ Cosmic Connection Established', {
            body: 'You are now subscribed to Rashi Waters Cosmic Alerts. Full Moon update tonight!',
            icon: '/rashi-logo.png'
        });
    }
  };

  return (
    <section style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
      <ThreeSkyMap />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px' }}>
            Celestial Atlas
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)', background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 20px 0', fontWeight: 400 }}>
            Constellation Map
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: '16px', color: '#8070a8', maxWidth: '560px', margin: '0 auto 24px', lineHeight: 1.8 }}>
            Explore the 12 zodiac constellations. Click any constellation to see its star map, mythology, and brightest star.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(139,92,246,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={requestNotification}
            style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: notifStatus === 'granted' ? 'rgba(52,211,153,0.1)' : 'rgba(139,92,246,0.1)',
                border: `1px solid ${notifStatus === 'granted' ? '#34d399' : '#8b5cf6'}`,
                borderRadius: '999px', padding: '10px 24px',
                color: notifStatus === 'granted' ? '#34d399' : '#c4b5fd',
                fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.3s'
            }}
          >
            <Bell size={14} />
            {notifStatus === 'granted' ? 'COSMIC ALERTS ACTIVE' : 'SUBSCRIBE TO COSMIC ALERTS'}
          </motion.button>
        </div>


        {/* Constellation Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {CONSTELLATIONS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${c.color}15` }}
              onClick={() => setSelected(c)}
              style={{
                background: 'rgba(12,8,45,0.7)',
                border: `1px solid ${c.color}20`,
                borderRadius: '16px', padding: '24px',
                cursor: 'pointer', transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${c.color}60, transparent)` }} />

              {/* Mini star map */}
              <svg viewBox="0 0 100 60" style={{ width: '100%', height: '80px', marginBottom: '16px' }}>
                {c.lines.map(([a, b], li) => (
                  <line key={li}
                    x1={c.stars[a].x} y1={c.stars[a].y * 0.75}
                    x2={c.stars[b].x} y2={c.stars[b].y * 0.75}
                    stroke={`${c.color}40`} strokeWidth="0.8"
                  />
                ))}
                {c.stars.map((s, si) => (
                  <circle key={si} cx={s.x} cy={s.y * 0.75} r="1.5"
                    fill={si === 0 ? c.color : '#e0d8ff'}
                  />
                ))}
              </svg>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px', filter: `drop-shadow(0 0 8px ${c.color}60)` }}>{c.symbol}</span>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: '#f0eeff', margin: 0 }}>{c.name}</h3>
                  <span style={{ fontFamily: 'Inter', fontSize: '10px', color: '#5b4e78', letterSpacing: '0.1em' }}>
                    {c.stars.length} stars · {c.brightStar.split('(')[0].trim()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ConstellationViewer constellation={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Constellations;
