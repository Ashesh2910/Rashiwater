import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';
import useCartStore from '../store/cartStore';
import '../components/OrderButton.css';

const CartDrawer = () => {
    const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCartStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(5, 3, 20, 0.7)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 999
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
                            background: 'linear-gradient(180deg, rgba(20, 15, 45, 0.98) 0%, rgba(10, 5, 25, 0.98) 100%)',
                            borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
                            boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
                            zIndex: 1000,
                            display: 'flex', flexDirection: 'column',
                            color: '#fff',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '24px', borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <h2 style={{
                                margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '24px', fontStyle: 'italic',
                                background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>
                                Your Cart
                            </h2>
                            <button onClick={() => {
                                closeCart();
                                setTimeout(() => setCheckoutComplete(false), 500);
                            }} style={{ background: 'transparent', border: 'none', color: '#c4b5fd', cursor: 'pointer', display: 'flex' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items or Success State */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                            {checkoutComplete ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10, stiffness: 100 }} style={{ color: '#10b981', marginBottom: '24px' }}>
                                        <CheckCircle size={64} />
                                    </motion.div>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#f0eeff', marginBottom: '16px' }}>Cosmic Transaction Complete</h3>
                                    <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#a78bfa', lineHeight: 1.6 }}>Your order has been recorded in the stars. You will receive an email confirmation shortly.</p>
                                    <button onClick={() => {
                                        closeCart();
                                        setTimeout(() => setCheckoutComplete(false), 500);
                                    }} style={{ marginTop: '32px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '999px', padding: '12px 32px', fontFamily: 'Inter', fontWeight: 600, cursor: 'pointer' }}>
                                        Return to Earth
                                    </button>
                                </motion.div>
                            ) : cart.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#6b5e88' }}>
                                    <ShoppingCart size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                                    <p>Your cosmic cart is empty.</p>
                                    <button onClick={closeCart} style={{
                                        marginTop: '16px', background: 'transparent', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '6px', padding: '10px 24px', fontSize: '13px', cursor: 'pointer'
                                    }}>
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {cart.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                                                {item.image || '✨'}
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 500, color: '#f0eeff' }}>{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#8b5cf6', cursor: 'pointer', padding: 0 }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div style={{ fontSize: '14px', color: '#fbcfe8', fontWeight: 600, marginBottom: 'auto' }}>
                                                    ${parseFloat(item.price).toFixed(2)}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'rgba(139, 92, 246, 0.1)', border: 'none', color: '#c4b5fd', padding: '4px 8px', cursor: 'pointer' }}><Minus size={14} /></button>
                                                        <span style={{ fontSize: '13px', width: '30px', textAlign: 'center', color: '#fff' }}>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'rgba(139, 92, 246, 0.1)', border: 'none', color: '#c4b5fd', padding: '4px 8px', cursor: 'pointer' }}><Plus size={14} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && !checkoutComplete && (
                            <div style={{ padding: '24px', background: 'rgba(5, 3, 20, 0.5)', borderTop: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#a78bfa' }}>
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '12px', color: '#6b5e88' }}>
                                    <span>Shipping calculated at checkout</span>
                                </div>

                                <button 
                                    onClick={async () => {
                                        setIsCheckingOut(true);
                                        // The App.jsx listener will intercept the click and run the animation logic independently.
                                        // We just need to manage our React state for removing the cart items. 
                                        setTimeout(() => {
                                            setIsCheckingOut(false);
                                            setCheckoutComplete(true);
                                            clearCart();
                                        }, 10000); // Wait for the 10s truck animation to finish before clearing
                                    }}
                                    disabled={isCheckingOut}
                                    className="order cart-checkout-btn"
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #c43399, #9d1773)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '16px',
                                        fontSize: '14px',
                                        fontFamily: 'Inter',
                                        fontWeight: 700,
                                        letterSpacing: '0.05em',
                                        cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                                        opacity: isCheckingOut ? 0.7 : 1,
                                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                                    }}
                                >
                                  <span className="default">{isCheckingOut ? 'Aligning Frequencies...' : `CHECKOUT - $${getCartTotal().toFixed(2)}`}</span>

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
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
