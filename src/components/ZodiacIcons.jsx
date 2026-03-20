import React from 'react';

// Proper zodiac sign SVG line-art icons
const ZodiacIcons = {
  Aries: ({ size = 48, color = '#ff6b8a' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 56V16M32 16C32 16 28 8 20 8C12 8 8 14 8 20C8 26 12 30 16 34" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 16C32 16 36 8 44 8C52 8 56 14 56 20C56 26 52 30 48 34" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Taurus: ({ size = 48, color = '#4ade80' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="40" r="16" stroke={color} strokeWidth="3"/>
      <path d="M12 12C12 12 16 22 24 22C28 22 32 18 32 18C32 18 36 22 40 22C48 22 52 12 52 12" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Gemini: ({ size = 48, color = '#fbbf24' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 8C10 8 20 16 32 16C44 16 54 8 54 8" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M10 56C10 56 20 48 32 48C44 48 54 56 54 56" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="22" y1="16" x2="22" y2="48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="42" y1="16" x2="42" y2="48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),

  Cancer: ({ size = 48, color = '#93c5fd' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 20C48 20 44 12 32 12C20 12 14 20 14 28" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="22" cy="24" r="8" stroke={color} strokeWidth="3"/>
      <path d="M16 44C16 44 20 52 32 52C44 52 50 44 50 36" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="42" cy="40" r="8" stroke={color} strokeWidth="3"/>
    </svg>
  ),

  Leo: ({ size = 48, color = '#f59e0b' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="22" r="10" stroke={color} strokeWidth="3"/>
      <path d="M34 22C34 22 40 22 44 28C48 34 44 42 38 44C32 46 28 42 28 38C28 34 32 32 36 34C40 36 42 40 42 46C42 52 46 56 52 56" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Virgo: ({ size = 48, color = '#84cc16' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 8L10 40C10 40 10 48 18 48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M10 24C10 24 14 16 20 8L20 40C20 40 20 48 28 48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M20 24C20 24 24 16 30 8L30 40C30 40 30 48 38 48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M38 48C38 48 46 48 50 40C54 32 48 28 44 30C40 32 42 38 48 42L54 56" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Libra: ({ size = 48, color = '#f472b6' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="48" x2="56" y2="48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="8" y1="38" x2="56" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M16 38C16 38 16 20 32 20C48 20 48 38 48 38" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),

  Scorpio: ({ size = 48, color = '#8b5cf6' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8L8 40C8 40 8 48 16 48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M8 24C8 24 12 16 18 8L18 40C18 40 18 48 26 48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M18 24C18 24 22 16 28 8L28 40C28 40 28 48 36 48L44 48L44 40" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38 44L44 50L50 44" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Sagittarius: ({ size = 48, color = '#c084fc' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="14" y1="50" x2="50" y2="14" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <polyline points="36,14 50,14 50,28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="24" y1="40" x2="40" y2="24" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="24" y1="40" x2="16" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="24" y1="40" x2="24" y2="48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),

  Capricorn: ({ size = 48, color = '#9ca3af' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10L16 42C16 42 20 52 28 48C36 44 32 34 28 30C24 26 20 28 20 32C20 36 24 40 30 40L42 40C42 40 50 40 50 48C50 56 42 56 42 56" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="46" cy="52" r="6" stroke={color} strokeWidth="3"/>
    </svg>
  ),

  Aquarius: ({ size = 48, color = '#2dd4bf' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 22L16 14L24 22L32 14L40 22L48 14L56 22" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 38L16 30L24 38L32 30L40 38L48 30L56 38" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Pisces: ({ size = 48, color = '#38bdf8' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8C16 8 28 16 28 32C28 48 16 56 16 56" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M48 8C48 8 36 16 36 32C36 48 48 56 48 56" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
};

const ZodiacIcon = ({ name, size = 48, color }) => {
  const Icon = ZodiacIcons[name];
  if (!Icon) return null;
  return <Icon size={size} color={color} />;
};

export default ZodiacIcon;
