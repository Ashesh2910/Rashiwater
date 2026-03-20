import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, Sparkles } from 'lucide-react';
import { generateAuraReading } from '../services/geminiService';

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user"
};

// Standard RGB to HSL conversion
const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
};

// Helper to map RGB to a named spiritual color
const getAuraColorName = (r, g, b) => {
  const hsl = rgbToHsl(r, g, b);
  const h = hsl[0];
  const s = hsl[1];
  
  if (s < 0.2) return "Ethereal White / Clear";
  if (h >= 0 && h < 30) return "Root Red / Passion";
  if (h >= 30 && h < 60) return "Sacral Orange / Creativity";
  if (h >= 60 && h < 90) return "Solar Yellow / Confidence";
  if (h >= 90 && h < 160) return "Heart Green / Healing";
  if (h >= 160 && h < 200) return "Throat Blue / Truth";
  if (h >= 200 && h < 260) return "Indigo / Intuition";
  if (h >= 260 && h <= 360) return "Crown Violet / Spiritual";
  return "Mystic Plasma";
};

const AuraReader = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [auraColor, setAuraColor] = useState(null);
  const [reading, setReading] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const captureAndAnalyze = useCallback(async () => {
    setIsCapturing(true);
    // Simple flash effect simulate
    setTimeout(async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setIsCapturing(false);
      setIsAnalyzing(true);
      
      // Load image into a canvas to get average color
      const img = new Image();
      img.src = imageSrc;
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Sample pixels - Focus on the center 50% of the image
        const startX = Math.floor(canvas.width * 0.25);
        const startY = Math.floor(canvas.height * 0.25);
        const width = Math.floor(canvas.width * 0.5);
        const height = Math.floor(canvas.height * 0.5);
        
        const imageData = ctx.getImageData(startX, startY, width, height).data;
        let r = 0, g = 0, b = 0;
        let count = 0;
        const step = 4 * 10; // check every 10th pixel for speed
        
        for (let i = 0; i < imageData.length; i += step) {
          r += imageData[i];
          g += imageData[i+1];
          b += imageData[i+2];
          count++;
        }
        
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        
        // Ensure some saturation for the aura effect but don't distort categories
        const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        const name = getAuraColorName(r, g, b);
        
        setAuraColor({ hex, name, r, g, b });

        // Call Gemini with error handling
        try {
          const result = await generateAuraReading(hex, name);
          setReading(result);
        } catch (error) {
          console.error("Aura reading failed:", error);
          // The service has its own fallback, so we don't need to set one here,
          // but we must ensure we don't get stuck in isAnalyzing state.
        } finally {
          setIsAnalyzing(false);
        }
      };
    }, 400);
  }, [webcamRef]);

  const reset = () => {
    setImgSrc(null);
    setAuraColor(null);
    setReading(null);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '12px' }}>
          ✦ AI Bio-Energy Scan
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(40px, 6vw, 64px)', background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 16px 0', fontWeight: 400 }}>
          Digital Aura Reader
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: 'Inter', fontSize: '15px', color: '#a78bfa', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Allow access to your camera to scan your bio-luminescent energy field. Our AI will analyze your frequency and provide a personalized spirit reading.
        </motion.p>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', width: '100%', padding: '0 24px' }}>
        
        {/* WEBCAM SECTION */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ 
            background: 'rgba(10,6,38,0.7)', border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: '24px', padding: '24px', backdropFilter: 'blur(20px)',
            width: '100%', maxWidth: '500px', position: 'relative', overflow: 'hidden',
            boxShadow: auraColor ? `0 0 60px ${auraColor.hex}40` : '0 20px 50px rgba(0,0,0,0.5)',
            transition: 'box-shadow 1s ease'
          }}
        >
          {/* Subtle live aura overlay if color is known */}
          <AnimatePresence>
            {auraColor && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: `radial-gradient(circle at center, ${auraColor.hex}40 0%, transparent 70%)`,
                  pointerEvents: 'none', zIndex: 10
                }}
              />
            )}
          </AnimatePresence>

          <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', aspectRatio: '1/1', background: '#000' }}>
            {!imgSrc ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img src={imgSrc} alt="User Aura" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}

            {/* Flash Effect */}
            <AnimatePresence>
              {isCapturing && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 20 }}
                />
              )}
            </AnimatePresence>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            {!imgSrc ? (
              <button 
                onClick={captureAndAnalyze}
                disabled={isCapturing || isAnalyzing}
                style={{
                  background: 'linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)', border: 'none',
                  color: '#fff', padding: '14px 32px', borderRadius: '30px', fontFamily: 'Inter',
                  fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(139,92,246,0.3)',
                  transition: 'transform 0.2s', transform: isCapturing ? 'scale(0.95)' : 'scale(1)'
                }}
              >
                <Camera size={18} />
                SCAN AURA
              </button>
            ) : (
              <button 
                onClick={reset}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', padding: '14px 32px', borderRadius: '30px', fontFamily: 'Inter',
                  fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s'
                }}
              >
                <RefreshCw size={18} />
                RESCAN
              </button>
            )}
          </div>
        </motion.div>

        {/* RESULTS SECTION */}
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {!imgSrc && !isAnalyzing && (
              <motion.div 
                key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}
              >
                <Sparkles size={48} color="#8b5cf6" style={{ marginBottom: '16px' }} />
                <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#c4b5fd' }}>Waiting for capture...</p>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div 
                key="analyzing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '40px' }}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '16px' }}>
                  <Sparkles size={40} color={auraColor ? auraColor.hex : "#8b5cf6"} />
                </motion.div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#fff', marginBottom: '8px' }}>
                  Channeling Cosmic Insights...
                </h3>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#a78bfa' }}>
                  {auraColor ? `Analyzing ${auraColor.name} frequencies...` : 'Extracting bio-luminescent data...'}
                </p>
              </motion.div>
            )}

            {reading && !isAnalyzing && (
              <motion.div 
                key="reading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: auraColor.hex, boxShadow: `0 0 20px ${auraColor.hex}80` }} />
                  <div>
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#a78bfa', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Dominant Energy</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#fff', margin: 0 }}>
                      {auraColor.name}
                    </h2>
                  </div>
                </div>

                <div style={{ 
                  background: `linear-gradient(135deg, rgba(10,6,38,0.8) 0%, ${auraColor.hex}20 100%)`, 
                  border: `1px solid ${auraColor.hex}40`, borderRadius: '24px', padding: '32px',
                  boxShadow: `0 20px 50px rgba(0,0,0,0.3)`
                }}>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#e2e8f0', lineHeight: 1.8, marginBottom: '24px' }}>
                    {reading.reading}
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: `1px solid ${auraColor.hex}30`, paddingTop: '24px' }}>
                    <div>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Suggested Crystal</span>
                      <p style={{ fontFamily: 'Inter', fontSize: '16px', color: '#fff', fontWeight: 600, margin: '4px 0 0' }}>{reading.crystal}</p>
                    </div>
                    <div>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', color: '#a78bfa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>State of Flow</span>
                      <p style={{ fontFamily: 'Inter', fontSize: '16px', color: '#fff', fontWeight: 600, margin: '4px 0 0' }}>{reading.energyLevel}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuraReader;
