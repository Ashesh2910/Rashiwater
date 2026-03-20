import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import useCartStore from '../store/cartStore';
import '../components/OrderButton.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const { addToCart, openCart } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // In a real app we would fetch the specific product by ID
                const res = await fetch('http://localhost:3001/api/products');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();

                // Find the specific product
                const foundProduct = data.find(p => p.id === parseInt(id) || p.id === id);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    throw new Error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);

                // Fallback dummy data if backend fails
                const dummyData = [
                    { id: '1', name: 'Aries Energized Water', price: 45, category: 'Water', description: 'Infused with Red Jasper to ignite your inner fire, courage, and vitality. Every drop is charged under a Mars planetary alignment to perfectly resonate with the Aries fiery spirit.', image: '💧' },
                    { id: '2', name: 'Taurus Wealth Pyrite', price: 65, category: 'Bracelets', description: 'Attract abundance and ground your energy with this premium pyrite and emerald stack, attuned precisely to Venus and the reliable, sensual nature of Taurus.', image: '✨' },
                    { id: '3', name: 'Gemini Communication Set', price: 80, category: 'Merchandise', description: 'Clear quartz and blue lace agate tools to amplify your dual nature. Perfect for enhancing clarity, quick thinking, and adaptability in all your interactions.', image: '🪐' },
                    { id: '4', name: 'Cancer Moon Water', price: 50, category: 'Water', description: 'Gently charged under the full moon for deep emotional balance, intuition, and nurturing. Perfect for the sensitive, soul-seeking Cancerian.', image: '🌊' }
                ];

                const foundDummy = dummyData.find(p => p.id === id || p.id === parseInt(id));
                setProduct(foundDummy || dummyData[0]);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        // Reset added state on unmount or id change
        return () => setAddedToCart(false);
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        addToCart(product, quantity);
        setAddedToCart(true);
        openCart(); // Show drawer

        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px', color: '#8b5cf6' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                    ✨
                </motion.div>
                <span style={{ marginLeft: '12px', fontFamily: 'Inter' }}>Reading the stars...</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '100px', color: '#8b5cf6' }}>
                <h2>Product not found in this realm.</h2>
                <Link to="/shop" style={{ color: '#c43399', textDecoration: 'none', borderBottom: '1px solid currentColor', marginTop: '16px' }}>Return to Shop</Link>
            </div>
        );
    }

    return (
        <section style={{
            minHeight: '100vh',
            paddingTop: '160px',
            paddingBottom: '100px',
            position: 'relative'
        }}>
            {/* Background effects */}
            <div style={{ position: 'absolute', top: '15%', left: '0%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>

                {/* Back button */}
                <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', textDecoration: 'none', fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, marginBottom: '40px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c4b5fd'}
                    onMouseLeave={e => e.currentTarget.style.color = '#8b5cf6'}
                >
                    <ArrowLeft size={16} /> Back to Collection
                </Link>

                {/* Product Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1fr', gap: '80px', alignItems: 'start' }}>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                        style={{
                            height: '600px',
                            background: 'linear-gradient(160deg, rgba(16,10,50,0.8) 0%, rgba(8,4,28,0.8) 100%)',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            borderRadius: '24px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '140px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 0 80px rgba(139,92,246,0.05)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Glow behind object */}
                        <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'rgba(196,51,153,0.2)', filter: 'blur(60px)', borderRadius: '50%' }} />
                        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative', zIndex: 2 }}>
                            {product.image || '✨'}
                        </motion.div>
                    </motion.div>

                    {/* Details Side */}
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '20px' }}>
                        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
                            {product.category}
                        </div>

                        <h1 style={{
                            margin: '0 0 20px 0', fontFamily: 'Playfair Display, serif', fontSize: '48px', lineHeight: 1.1,
                            background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>
                            {product.name}
                        </h1>

                        <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 300, color: '#fbcfe8', marginBottom: '40px' }}>
                            ${parseFloat(product.price).toFixed(2)}
                        </div>

                        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, rgba(139,92,246,0.6), transparent)', marginBottom: '40px' }} />

                        <p style={{ fontFamily: 'Inter', fontSize: '15px', color: '#8070a8', lineHeight: 1.8, marginBottom: '48px' }}>
                            {product.description}
                        </p>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: 'auto' }}>

                            {/* Quantity Selector */}
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px',
                                padding: '4px', background: 'rgba(12,8,30,0.6)'
                            }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'transparent', color: '#c4b5fd', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.1)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <Minus size={16} />
                                </button>
                                <span style={{ fontFamily: 'Inter', fontSize: '15px', width: '40px', textAlign: 'center', color: '#fff' }}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'transparent', color: '#c4b5fd', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.1)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <button 
                                onClick={handleAddToCart}
                                className="order product-order-btn"
                                style={{
                                    flex: 1,
                                    background: addedToCart ? '#10b981' : 'linear-gradient(135deg, #c43399, #9d1773)',
                                    color: '#fff', border: 'none',
                                    borderRadius: '999px', padding: '0 32px', height: '50px',
                                    fontSize: '13px', fontFamily: 'Inter',
                                    cursor: 'pointer', fontWeight: 700, letterSpacing: '0.1em', uppercase: true,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    transition: 'background 0.3s'
                                }}
                            >
                              <span className="default">{addedToCart ? <><Check size={18} /> Added to Universe</> : "Add Details to Cart"}</span>

                              <span className="success">
                                Order Placed
                                <svg viewBox="0 0 12 10">
                                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </svg>
                              </span>

                              <div className="box"></div>

                              <div className="truck">
                                <div className="back"></div>
                                <div className="front">
                                  <div className="window"></div>
                                </div>
                                <div className="light top"></div>
                                <div className="light bottom"></div>
                              </div>

                              <div className="lines"></div>
                            </button>
                        </div>

                        {/* Highlights */}
                        <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid rgba(139, 92, 246, 0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ color: '#c4b5fd' }}><Check size={16} /></div>
                                <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#6b5e88' }}>Cosmically Aligned</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ color: '#c4b5fd' }}><Check size={16} /></div>
                                <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#6b5e88' }}>Doorstep Delivery</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
