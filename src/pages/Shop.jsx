import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const SIGN_RECS = {
    Aries: { symbol: '♈', color: '#ff6b8a', crystal: 'Red Jasper', benefit: 'Ignites courage and inner fire', element: 'Fire' },
    Taurus: { symbol: '♉', color: '#8bc34a', crystal: 'Rose Quartz', benefit: 'Attracts love and abundance', element: 'Earth' },
    Gemini: { symbol: '♊', color: '#ffeb3b', crystal: 'Blue Lace Agate', benefit: 'Enhances communication clarity', element: 'Air' },
    Cancer: { symbol: '♋', color: '#b3e5fc', crystal: 'Moonstone', benefit: 'Balances emotions and intuition', element: 'Water' },
    Leo: { symbol: '♌', color: '#ff9800', crystal: 'Citrine', benefit: 'Amplifies confidence and warmth', element: 'Fire' },
    Virgo: { symbol: '♍', color: '#a1887f', crystal: 'Amazonite', benefit: 'Promotes analytical clarity', element: 'Earth' },
    Libra: { symbol: '♎', color: '#f48fb1', crystal: 'Opal', benefit: 'Harmonises relationships', element: 'Air' },
    Scorpio: { symbol: '♏', color: '#e53935', crystal: 'Obsidian', benefit: 'Deepens transformation', element: 'Water' },
    Sagittarius: { symbol: '♐', color: '#9c27b0', crystal: 'Turquoise', benefit: 'Expands wisdom and adventure', element: 'Fire' },
    Capricorn: { symbol: '♑', color: '#607d8b', crystal: 'Garnet', benefit: 'Strengthens discipline', element: 'Earth' },
    Aquarius: { symbol: '♒', color: '#00bcd4', crystal: 'Amethyst', benefit: 'Awakens innovation', element: 'Air' },
    Pisces: { symbol: '♓', color: '#7c4dff', crystal: 'Aquamarine', benefit: 'Enhances spiritual connection', element: 'Water' },
};

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [selectedSign, setSelectedSign] = useState(null);
    const { addToCart, openCart } = useCartStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // In a real app, this would point to the deployed backend URL or a relative path in production
                const res = await fetch('http://localhost:3001/api/products');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Fallback dummy data if backend is unreachable during dev
                setProducts([
                    { id: '1', name: 'Aries Energized Water', price: 45, category: 'Water', description: 'Infused with Red Jasper to ignite your inner fire.', image: '💧' },
                    { id: '2', name: 'Taurus Wealth Pyrite', price: 65, category: 'Bracelets', description: 'Attract abundance with this premium pyrite stack.', image: '✨' },
                    { id: '3', name: 'Gemini Communication Set', price: 80, category: 'Merchandise', description: 'Clear quartz and blue lace agate tools.', image: '🪐' },
                    { id: '4', name: 'Cancer Moon Water', price: 50, category: 'Water', description: 'Charged under the full moon for emotional balance.', image: '🌊' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['All', 'Water', 'Bracelets', 'Merchandise'];
    const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

    const handleAddToCart = (e, product) => {
        e.preventDefault(); // Prevent navigating to product details if they click the button
        addToCart(product);
        openCart(); // Show drawer
    };

    return (
        <section style={{
            minHeight: '100vh',
            paddingTop: '160px',
            paddingBottom: '100px',
            position: 'relative'
        }}>
            {/* Background glow for shop */}
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(196,51,153,0.1) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '16px' }}>
                        Cosmic Collection
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(50px, 8vw, 80px)',
                            background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            margin: '0 0 20px 0', fontWeight: 400,
                        }}>
                        Align Your Inner Frequency
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontFamily: 'Inter', fontSize: '16px', color: '#8070a8', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                        Discover our premium range of zodiac-energized water bottles and crystal healing bracelets, designed to bring purity and balance to your life.
                    </motion.p>
                </div>

                {/* Zodiac Sign Recommendations (F4) */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    style={{ marginBottom: '48px' }}>
                    <p style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.15em', color: '#8b5cf6', textTransform: 'uppercase', textAlign: 'center', marginBottom: '16px' }}>
                        ✦ Recommended For Your Sign
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {Object.entries(SIGN_RECS).map(([name, s]) => (
                            <motion.button key={name} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedSign(selectedSign === name ? null : name)}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: selectedSign === name ? `${s.color}25` : 'rgba(12,8,45,0.7)',
                                    border: `1.5px solid ${selectedSign === name ? s.color : 'rgba(139,92,246,0.15)'}`,
                                    fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    boxShadow: selectedSign === name ? `0 0 12px ${s.color}30` : 'none',
                                }}
                                title={name}
                            >
                                {s.symbol}
                            </motion.button>
                        ))}
                    </div>
                    {selectedSign && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            style={{
                                maxWidth: '500px', margin: '0 auto',
                                background: `linear-gradient(135deg, ${SIGN_RECS[selectedSign].color}10, rgba(10,6,38,0.8))`,
                                border: `1px solid ${SIGN_RECS[selectedSign].color}30`,
                                borderRadius: '14px', padding: '20px 24px',
                                display: 'flex', alignItems: 'center', gap: '16px',
                            }}>
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '50%', flexShrink: 0,
                                background: `radial-gradient(circle, ${SIGN_RECS[selectedSign].color}30, transparent)`,
                                border: `1.5px solid ${SIGN_RECS[selectedSign].color}50`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
                            }}>
                                💎
                            </div>
                            <div>
                                <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: SIGN_RECS[selectedSign].color }}>
                                    {selectedSign} → {SIGN_RECS[selectedSign].crystal}
                                </div>
                                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#8070a8', marginTop: '4px' }}>
                                    {SIGN_RECS[selectedSign].benefit} · {SIGN_RECS[selectedSign].element} element
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
                {/* AR Crystal Viewer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        marginBottom: '80px', background: 'rgba(10,6,38,0.5)',
                        border: '1px solid rgba(139,92,246,0.2)', borderRadius: '32px',
                        padding: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center', gap: '60px', overflow: 'hidden', position: 'relative'
                    }}
                >
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(139,92,246,0.1), transparent)', pointerEvents: 'none' }} />
                    
                    <div>
                        <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#f472b6', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Featured Artifact</span>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', color: '#fff', margin: '16px 0 20px' }}>
                            Sacred Amethyst <br/>Focus Point (3D)
                        </h2>
                        <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', lineHeight: 1.8, marginBottom: '32px' }}>
                            Experience our flagship crystal in your own space using Augmented Reality. This Amethyst has been precision-cut to amplify cognitive frequencies.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px 20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ fontSize: '10px', color: '#5b4e78', marginBottom: '4px' }}>PRICE</div>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#fbcfe8' }}>$240.00</div>
                            </div>
                            <button 
                                onClick={() => addToCart({ id: 'feature-crystal', name: 'Sacred Amethyst Focus Point', price: 240, category: 'Crystals', image: '💎' })}
                                style={{
                                    flex: 1, background: 'linear-gradient(135deg, #8b5cf6, #c43399)',
                                    color: '#fff', border: 'none', borderRadius: '12px',
                                    fontWeight: 700, cursor: 'pointer', fontSize: '14px'
                                }}
                            >
                                PURCHASE AR ARTIFACT
                            </button>
                        </div>
                        <p style={{ marginTop: '20px', fontSize: '11px', color: '#4b3e68', fontStyle: 'italic' }}>
                            * AR viewing requires iOS 12+ or Android 8+ with ARCore.
                        </p>
                    </div>

                    <div style={{ height: '400px', background: 'rgba(0,0,0,0.2)', borderRadius: '24px', border: '1px solid rgba(139,92,246,0.1)', overflow: 'hidden' }}>
                        <model-viewer 
                            src="https://modelviewer.dev/shared-assets/models/Astronaut.glb" 
                            ios-src=""
                            poster="https://modelviewer.dev/assets/poster-astronaut.png"
                            alt="A 3D model of a sacred crystal"
                            ar
                            ar-modes="webxr scene-viewer quick-look"
                            camera-controls
                            auto-rotate
                            style={{ width: '100%', height: '100%', '--poster-color': 'transparent' }}
                        >
                            <button slot="ar-button" style={{
                                position: 'absolute', bottom: '16px', right: '16px',
                                background: '#8b5cf6', color: '#white', border: 'none',
                                borderRadius: '8px', padding: '10px 20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                            }}>
                                VIEW IN YOUR ROOM (AR)
                            </button>
                        </model-viewer>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '60px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                background: filter === cat ? 'linear-gradient(135deg, #c43399, #9d1773)' : 'transparent',
                                border: filter === cat ? '1px solid transparent' : '1px solid rgba(139, 92, 246, 0.4)',
                                color: filter === cat ? '#fff' : '#c4b5fd',
                                padding: '10px 24px',
                                borderRadius: '999px',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '13px',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: filter === cat ? '0 4px 20px rgba(196,51,153,0.3)' : 'none'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Products Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#8070a8', padding: '100px 0', fontFamily: 'Inter' }}>
                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>✨</div>
                        <p>Channeling cosmic energies...</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
                        {filteredProducts.map((product, i) => (
                            <Link to={`/shop/${product.id}`} key={product.id} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(196,51,153,0.15)' }}
                                    style={{
                                        background: 'rgba(12, 8, 30, 0.6)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        display: 'flex', flexDirection: 'column',
                                        height: '100%',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {/* Image placeholder */}
                                    <div style={{
                                        height: '240px',
                                        background: 'linear-gradient(180deg, rgba(20, 15, 45, 0.8) 0%, rgba(10, 5, 25, 0.8) 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '80px',
                                        borderBottom: '1px solid rgba(139, 92, 246, 0.1)'
                                    }}>
                                        {product.image || '✨'}
                                    </div>

                                    {/* Content */}
                                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                                            {product.category}
                                        </div>
                                        <h3 style={{
                                            margin: '0 0 12px 0', fontFamily: 'Playfair Display, serif', fontSize: '22px',
                                            color: '#f0eeff', lineHeight: 1.3
                                        }}>
                                            {product.name}
                                        </h3>
                                        <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#6b5e88', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                                            {product.description}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                            <span style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#fbcfe8' }}>
                                                ${parseFloat(product.price).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={(e) => handleAddToCart(e, product)}
                                                style={{
                                                    background: 'transparent', color: '#c4b5fd',
                                                    border: '1px solid rgba(196,51,153,0.5)',
                                                    borderRadius: '999px', padding: '8px 20px',
                                                    fontSize: '12px', fontFamily: 'Inter', fontWeight: 600,
                                                    cursor: 'pointer', transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => { e.target.style.background = 'rgba(196,51,153,0.1)'; e.target.style.borderColor = '#c43399'; }}
                                                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(196,51,153,0.5)'; }}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shop;
