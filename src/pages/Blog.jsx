import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { generateDailyBlogs } from '../services/geminiService';
import CosmicNewsletter from '../components/CosmicNewsletter';

// Skeleton loader component
const SkeletonCard = ({ index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    style={{
      background: 'rgba(12, 8, 30, 0.4)',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      borderRadius: '20px', overflow: 'hidden',
    }}
  >
    <div style={{ height: '220px', background: 'linear-gradient(90deg, rgba(20,15,50,0.8) 25%, rgba(30,22,70,0.8) 50%, rgba(20,15,50,0.8) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
    <div style={{ padding: '28px' }}>
      <div style={{ height: '12px', width: '60px', background: 'rgba(139,92,246,0.15)', borderRadius: '6px', marginBottom: '14px' }} />
      <div style={{ height: '20px', width: '90%', background: 'rgba(139,92,246,0.1)', borderRadius: '6px', marginBottom: '10px' }} />
      <div style={{ height: '20px', width: '70%', background: 'rgba(139,92,246,0.08)', borderRadius: '6px', marginBottom: '20px' }} />
      <div style={{ height: '12px', width: '40%', background: 'rgba(139,92,246,0.06)', borderRadius: '6px' }} />
    </div>
    <style>{`
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `}</style>
  </motion.div>
);

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let cancelled = false;
    const loadPosts = async () => {
      setLoading(true);
      const aiPosts = await generateDailyBlogs();
      if (!cancelled) {
        setPosts(aiPosts);
        setLoading(false);
      }
    };
    loadPosts();
    return () => { cancelled = true; };
  }, []);

  const categories = ['All', ...new Set(posts.map(p => p.category))];
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <section style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(196,51,153,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#c4b5fd', textTransform: 'uppercase', marginBottom: '16px' }}>
            🤖 AI-Powered · Updated Daily
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)', background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 20px 0', fontWeight: 400 }}>
            The Cosmic Journal
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            Fresh articles generated daily by AI — covering cosmic energy, crystal healing, zodiac waters, gemstones, and spiritual wellness trends.
          </motion.p>

          {/* Date badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '999px', padding: '8px 20px' }}>
            <span style={{ fontSize: '14px' }}>✦</span>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#c4b5fd', fontWeight: 500 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.div>
        </div>

        {/* Category filters */}
        {!loading && posts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {categories.map(cat => (
              <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'rgba(196,51,153,0.2)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'rgba(196,51,153,0.5)' : 'rgba(139,92,246,0.15)'}`,
                  borderRadius: '999px', padding: '8px 18px',
                  fontFamily: 'Inter', fontSize: '12px',
                  color: activeCategory === cat ? '#fbcfe8' : '#5b4e78',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {[0, 1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} index={i} />)}
          </div>
        )}

        {/* AI Posts Grid */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
            {filtered.map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, borderColor: 'rgba(196,51,153,0.4)', boxShadow: '0 20px 40px rgba(196,51,153,0.12)' }}
                style={{
                  background: 'rgba(12, 8, 30, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.12)',
                  borderRadius: '20px', overflow: 'hidden',
                  cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', flexDirection: 'column',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '200px', background: `url(${post.image}) center/cover`, position: 'relative' }}>
                    {/* Category badge */}
                    <div style={{
                      position: 'absolute', top: '14px', left: '14px',
                      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(139,92,246,0.2)', borderRadius: '999px',
                      padding: '5px 12px', fontFamily: 'Inter', fontSize: '10px',
                      color: '#c4b5fd', letterSpacing: '0.08em',
                    }}>
                      {post.category}
                    </div>
                    {/* AI badge */}
                    {post.isAI && (
                      <div style={{
                        position: 'absolute', top: '14px', right: '14px',
                        background: 'rgba(52,211,153,0.15)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(52,211,153,0.3)', borderRadius: '999px',
                        padding: '4px 10px', fontFamily: 'Inter', fontSize: '9px',
                        color: '#34d399', letterSpacing: '0.1em',
                      }}>
                        🤖 AI
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(transparent, rgba(12,8,30,0.8))' }} />
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif', fontSize: '19px',
                      color: '#f0eeff', margin: '0 0 12px', lineHeight: 1.35,
                    }}>
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#6b5e88', lineHeight: 1.6, margin: '0 0 16px' }}>
                        {post.summary}
                      </p>
                    )}
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Inter', fontSize: '11px', color: '#4a3d6b' }}>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <CosmicNewsletter />
    </section>
  );
};

export default Blog;
