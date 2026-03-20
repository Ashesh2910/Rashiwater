import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Chaldean planetary hour order
const CHALDEAN_ORDER = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];
const PLANET_DATA = {
  Sun: { symbol: '☀️', color: '#fbbf24', energy: 'Vitality, leadership, and creative expression' },
  Moon: { symbol: '🌙', color: '#c4b5fd', energy: 'Intuition, emotions, and nurturing energy' },
  Mars: { symbol: '♂', color: '#f87171', energy: 'Action, courage, and physical drive' },
  Mercury: { symbol: '☿', color: '#6ee7b7', energy: 'Communication, intellect, and travel' },
  Jupiter: { symbol: '♃', color: '#fb923c', energy: 'Expansion, wisdom, and abundance' },
  Venus: { symbol: '♀', color: '#f9a8d4', energy: 'Love, beauty, and harmony' },
  Saturn: { symbol: '♄', color: '#94a3b8', energy: 'Discipline, structure, and karma' },
};

// Day rulers in Chaldean order (Sun=0, Mon=1, etc.)
const DAY_RULERS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

function getPlanetaryHour() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  const dayRuler = DAY_RULERS[dayOfWeek];

  // Approximate sunrise/sunset for calculation (6am/6pm simplification)
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  const sunriseMin = 6 * 60;  // 6:00 AM
  const sunsetMin = 18 * 60;  // 6:00 PM

  let planetaryHourIndex;
  let isDay;
  let hoursElapsed;

  if (totalMinutes >= sunriseMin && totalMinutes < sunsetMin) {
    // Daytime: 12 hours from sunrise to sunset, each planetary hour ≈ 60 min
    isDay = true;
    hoursElapsed = Math.floor((totalMinutes - sunriseMin) / 60);
    if (hoursElapsed > 11) hoursElapsed = 11;
  } else {
    // Nighttime: 12 hours from sunset to next sunrise
    isDay = false;
    let nightMinutes;
    if (totalMinutes >= sunsetMin) {
      nightMinutes = totalMinutes - sunsetMin;
    } else {
      nightMinutes = (24 * 60 - sunsetMin) + totalMinutes;
    }
    hoursElapsed = Math.floor(nightMinutes / 60);
    if (hoursElapsed > 11) hoursElapsed = 11;
  }

  // Find the starting index in the Chaldean order for this day's ruler
  const rulerIdx = CHALDEAN_ORDER.indexOf(dayRuler);
  // The first hour of the day is ruled by the day ruler
  // For night hours, we continue from hour 12 (after 12 day hours)
  const offset = isDay ? hoursElapsed : hoursElapsed + 12;
  planetaryHourIndex = (rulerIdx + offset) % 7;

  const currentPlanet = CHALDEAN_ORDER[planetaryHourIndex];
  
  // Calculate progress through the current hour
  let minutesIntoCurrent;
  if (isDay) {
    minutesIntoCurrent = (totalMinutes - sunriseMin) % 60;
  } else {
    let nightMinutes;
    if (totalMinutes >= sunsetMin) {
      nightMinutes = totalMinutes - sunsetMin;
    } else {
      nightMinutes = (24 * 60 - sunsetMin) + totalMinutes;
    }
    minutesIntoCurrent = nightMinutes % 60;
  }
  const progress = minutesIntoCurrent / 60;

  // Next planet
  const nextPlanetIdx = (planetaryHourIndex + 1) % 7;
  const nextPlanet = CHALDEAN_ORDER[nextPlanetIdx];
  const minutesRemaining = 60 - minutesIntoCurrent;

  return {
    planet: currentPlanet,
    data: PLANET_DATA[currentPlanet],
    progress,
    minutesRemaining,
    nextPlanet,
    nextData: PLANET_DATA[nextPlanet],
    isDay,
    hourNumber: (isDay ? hoursElapsed : hoursElapsed + 12) + 1,
  };
}

const PlanetaryHoursClock = () => {
  const [hourInfo, setHourInfo] = useState(getPlanetaryHour());

  useEffect(() => {
    const interval = setInterval(() => {
      setHourInfo(getPlanetaryHour());
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const offset = circumference * (1 - hourInfo.progress);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '14px 20px',
      background: 'rgba(12,8,45,0.5)',
      border: '1px solid rgba(139,92,246,0.12)',
      borderRadius: '14px',
      backdropFilter: 'blur(10px)',
    }}>
      {/* Circular progress */}
      <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="3" />
          <motion.circle
            cx="22" cy="22" r="18" fill="none"
            stroke={hourInfo.data.color}
            strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 22 22)"
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px',
        }}>
          {hourInfo.data.symbol}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: hourInfo.data.color }}>
            {hourInfo.planet} Hour
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: '9px', color: '#3b3058', background: 'rgba(139,92,246,0.08)', padding: '1px 6px', borderRadius: '4px' }}>
            {hourInfo.isDay ? '☀️' : '🌙'} {hourInfo.minutesRemaining}m left
          </span>
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#5b4e78', marginTop: '3px', lineHeight: 1.4 }}>
          {hourInfo.data.energy}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '9px', color: '#3b3058', marginTop: '2px' }}>
          Next: {hourInfo.nextData.symbol} {hourInfo.nextPlanet}
        </div>
      </div>
    </div>
  );
};

export default PlanetaryHoursClock;
