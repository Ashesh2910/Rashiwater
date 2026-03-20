import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDailyBlogs } from '../services/geminiService';
import { X, Mail, Sparkles, Send } from 'lucide-react';

export const EmailPreviewModal = ({ isOpen, onClose }) => {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    if (isOpen) {
      generateDailyBlogs().then(setBlogs);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(5, 3, 20, 0.85)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#ffffff', width: '100%', maxWidth: '600px',
            height: '85vh', borderRadius: '16px', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {/* Email Client Header Mockup */}
          <div style={{ background: '#f3f4f6', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>
              Preview: The Cosmic Daily
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
              <X size={18} />
            </button>
          </div>

          {/* Email Content */}
          <div style={{ overflowY: 'auto', flex: 1, background: '#f9fafb', padding: '0 0 40px 0' }}>
            <div style={{ background: '#0c0822', padding: '40px 20px', textAlign: 'center' }}>
              <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: '48px', color: '#fff', margin: '0 0 10px 0', fontWeight: 400 }}>Rashi</h1>
              <p style={{ color: '#c4b5fd', fontSize: '14px', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Your Daily Cosmic Digest</p>
              <p style={{ color: '#8b5cf6', fontSize: '12px', marginTop: '10px' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div style={{ padding: '30px 20px', maxWidth: '500px', margin: '0 auto' }}>
              <p style={{ color: '#374151', fontSize: '16px', lineHeight: 1.6, marginBottom: '30px' }}>
                Good morning, cosmic explorer. The universe is buzzing with fresh energy today. 
                Here are your personalized insights crafted by our celestial AI to guide your path.
              </p>

              {blogs.slice(0, 3).map((blog, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '24px' }}>
                    <span style={{ fontSize: '11px', color: '#c43399', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{blog.category}</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#111827', margin: '8px 0 12px 0', lineHeight: 1.3 }}>{blog.title}</h2>
                    <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: '0 0 20px 0' }}>{blog.summary}</p>
                    <a href={`/blog/${blog.id}`} style={{ display: 'inline-block', background: '#0c0822', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: 500 }}>Read Full Article</a>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'center', marginTop: '40px', padding: '30px', borderTop: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '10px' }}>You received this because you subscribed to Rashi Premium.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '12px', color: '#8b5cf6', textDecoration: 'underline', cursor: 'pointer' }}>Manage Preferences</span>
                  <span style={{ fontSize: '12px', color: '#8b5cf6', textDecoration: 'underline', cursor: 'pointer' }}>Unsubscribe</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CosmicNewsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <>
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              background: 'rgba(12, 8, 30, 0.6)', 
              border: '1px solid rgba(196, 51, 153, 0.2)', 
              borderRadius: '24px', 
              padding: '48px', 
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 60%)', pointerEvents: 'none' }} />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <div style={{ width: '64px', height: '64px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                    <Sparkles size={28} color="#34d399" />
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#fff', marginBottom: '16px' }}>Aligned with the Cosmos</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#c4b5fd', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                    Your celestial alignment is complete. You will now receive daily AI-crafted insights directly in your inbox.
                  </p>
                  <button 
                    onClick={() => setShowPreview(true)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(196, 51, 153, 0.2))',
                      border: '1px solid rgba(196, 51, 153, 0.5)',
                      borderRadius: '999px',
                      padding: '12px 28px',
                      color: '#fbcfe8',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(196, 51, 153, 0.4))'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(196, 51, 153, 0.2))'}
                  >
                    <Mail size={16} /> View Sample Email
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', color: '#fff', marginBottom: '16px' }}>The Cosmic Daily</h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#c4b5fd', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                    Subscribe to receive personalized, AI-generated daily blogs covering your cosmic transits, crystal affinities, and spiritual trends.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#8b5cf6', pointerEvents: 'none' }}>
                        <Mail size={18} />
                      </div>
                      <input 
                        type="email" 
                        required
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading'}
                        style={{
                          width: '100%',
                          background: 'rgba(12, 8, 30, 0.8)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '8px',
                          padding: '14px 16px 14px 44px',
                          color: '#fff',
                          fontFamily: 'Inter',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(196, 51, 153, 0.6)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)'}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #c43399)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0 24px',
                        color: '#fff',
                        fontFamily: 'Inter',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: status === 'loading' ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s',
                        opacity: status === 'loading' ? 0.7 : 1
                      }}
                    >
                      {status === 'loading' ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                          <Sparkles size={18} />
                        </motion.div>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </form>
                  <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6b5e88', marginTop: '16px', letterSpacing: '0.05em' }}>
                    Join 10,000+ astral subscribers. Unsubscribe anytime.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <EmailPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </>
  );
};

export default CosmicNewsletter;
