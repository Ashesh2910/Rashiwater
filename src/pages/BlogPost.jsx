import React, { useEffect, useState, useRef } from 'react';

import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { generateDailyBlogs } from '../services/geminiService';

// Static posts fallback (kept for non-AI routes)
const STATIC_POSTS = {
    '1': {
        title: 'The Great Conjunction & Your Hydration: How Planetary Shifts Affect Water Frequencies',
        category: 'Astrology News', date: 'March 15, 2026', author: 'Dr. Ananya Dev',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
        content: `<p>The upcoming planetary alignment is one of the most powerful we've seen this decade.</p><h3>Understanding Water Memory</h3><p>Vedic science has long held that water is pliant and receptive to frequency. During a Great Conjunction, the overlapping magnetic fields of Jupiter and Saturn create a unique resonance.</p><p>By consuming hydration that has been deliberately charged during these windows, you align your internal biology with external cosmic currents.</p>`
    },
    '2': {
        title: 'Top 5 Crystals to Combine With Moon Rituals This Spring',
        category: 'Crystals', date: 'March 10, 2026', author: 'Rashi Editorial',
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1200&auto=format&fit=crop',
        content: `<p>Spring is a time of renewal. The equinox brings balance.</p><ul><li><strong>Clear Quartz:</strong> The ultimate amplifier.</li><li><strong>Rose Quartz:</strong> To soften the heart chakra after winter.</li><li><strong>Amethyst:</strong> For spiritual protection.</li></ul>`
    },
    'eclipse-season': {
        title: 'Navigating the Upcoming Eclipse Season with Grace and Grounding',
        category: 'Trending Article ✨', date: 'March 20, 2026', author: 'Dr. Ananya Dev',
        image: 'https://images.unsplash.com/photo-1464624328812-32b0204b3eb0?q=80&w=1200&auto=format&fit=crop',
        content: `<p>Eclipses represent portals—sudden beginnings and abrupt endings.</p><h3>Grounding Practices</h3><p>During eclipse season, the ambient energy is chaotic. We recommend increasing your intake of mineral-rich Earth-aligned water and keeping Black Tourmaline near your root chakra.</p>`
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        const synth = synthRef.current;
        return () => {
            if (synth) synth.cancel();
        };
    }, []);


    const handlePlayVoice = () => {
        if (isPlaying) {
            synthRef.current.cancel();
            setIsPlaying(false);
            return;
        }

        if (!post?.content) return;

        // Strip HTML tags for clean reading
        const cleanContent = post.content.replace(/<[^>]*>?/gm, ' ');
        const textToRead = `${post.title}. By ${post.author || 'Rashi Editorial'}. ${cleanContent}`;

        setIsPlaying(true);
        const utterance = new SpeechSynthesisUtterance(textToRead);

        const voices = synthRef.current.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Samantha') || v.name.includes('Female')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        synthRef.current.speak(utterance);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        let cancelled = false;


        const loadPost = async () => {
            setLoading(true);

            // Check if it's an AI-generated post
            if (id && id.startsWith('ai-')) {
                const posts = await generateDailyBlogs();
                const found = posts.find(p => p.id === id);
                if (!cancelled && found) {
                    setPost({
                        ...found,
                        author: '🤖 Gemini AI',
                    });
                    setLoading(false);
                    return;
                }
            }

            // Fall back to static posts
            if (!cancelled) {
                setPost(STATIC_POSTS[id] || STATIC_POSTS['1']);
                setLoading(false);
            }
        };

        loadPost();
        return () => { cancelled = true; };
    }, [id]);

    if (loading || !post) {
        return (
            <section style={{ minHeight: '100vh', paddingTop: '200px', textAlign: 'center' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', fontSize: '36px' }}>
                    ✦
                </motion.div>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#5b4e78', marginTop: '16px' }}>
                    Loading cosmic insights...
                </p>
            </section>
        );
    }

    return (
        <section style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

                <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', textDecoration: 'none', fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, marginBottom: '40px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8b5cf6'}
                >
                    <ArrowLeft size={16} /> Back to Journal
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {post.category}
                        </span>
                        {post.isAI && (
                            <span style={{ fontFamily: 'Inter', fontSize: '10px', color: '#34d399', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '999px', padding: '2px 8px' }}>
                                🤖 AI Generated
                            </span>
                        )}
                    </div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '44px', color: '#fff', marginBottom: '24px', lineHeight: 1.2 }}>
                        {post.title}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'Inter', fontSize: '14px', color: '#6b5e88', marginBottom: '40px' }}>
                        <span>By {post.author || 'Rashi Editorial'}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        {post.readTime && <><span>•</span><span>{post.readTime}</span></>}
                        
                        <button 
                            onClick={handlePlayVoice}
                            style={{
                                marginLeft: 'auto',
                                background: isPlaying ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(139,92,246,0.3)',
                                borderRadius: '20px', padding: '6px 16px',
                                color: '#c4b5fd', fontSize: '11px', fontWeight: 600,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                transition: 'all 0.2s',
                                boxShadow: isPlaying ? '0 0 15px rgba(139,92,246,0.2)' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '14px' }}>{isPlaying ? '⏹' : '🔊'}</span>
                            {isPlaying ? 'STOP LISTENING' : 'VOICE ORACLE'}
                        </button>
                    </div>


                    {post.image && (
                        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', marginBottom: '60px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}

                    <div
                        style={{
                            fontFamily: 'Inter', fontSize: '17px', color: '#c4b5fd', lineHeight: 1.85,
                        }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* AI attribution */}
                    {post.isAI && (
                        <div style={{
                            marginTop: '48px', padding: '20px', background: 'rgba(52,211,153,0.06)',
                            border: '1px solid rgba(52,211,153,0.15)', borderRadius: '14px',
                            textAlign: 'center',
                        }}>
                            <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#34d399', margin: '0 0 4px' }}>
                                🤖 This article was generated by Google Gemini AI
                            </p>
                            <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#3b3058', margin: 0 }}>
                                Content refreshes daily · {post.date}
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default BlogPost;
