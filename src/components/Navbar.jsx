import React from 'react';
import { motion } from 'framer-motion';
import RashiLogo from './RashiLogo';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import useCartStore from '../store/cartStore';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Discovery', path: '/discovery' },
    { name: 'Compatibility', path: '/compatibility' },
    { name: 'Tarot', path: '/tarot' },
    { name: 'Constellations', path: '/constellations' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Aura', path: '/aura' },
    { name: 'Blog', path: '/blog' },
];


const Navbar = () => {
    const location = useLocation();
    
    const openCart = useCartStore(state => state.openCart);
    const getCartItemsCount = useCartStore(state => state.getCartItemsCount);    return (
        <>
            {/* Top utility bar */}
            <div style={{
                width: '100%', background: 'rgba(4,2,16,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 52px', fontSize: '11px', color: '#5b4e78',
                fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em',
                position: 'fixed', top: '36px', zIndex: 101,
            }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#c4b5fd'} onMouseLeave={e => e.target.style.color = '#5b4e78'}>✉ contact@rashi.com</span>
                    <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#c4b5fd'} onMouseLeave={e => e.target.style.color = '#5b4e78'}>✆ +91-9993174081</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {['FAQ', 'Privacy', 'Terms'].map(l => (
                        <span key={l} style={{ cursor: 'pointer', padding: '0 10px', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.target.style.color = '#c4b5fd'}
                            onMouseLeave={e => e.target.style.color = '#5b4e78'}>
                            {l}
                        </span>
                    ))}
                </div>
            </div>

            {/* Main Navbar */}
            <motion.nav
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                style={{
                    position: 'fixed', top: '65px', width: '100%', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 52px', height: '60px',
                    background: 'rgba(6,4,22,0.88)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 1px 40px rgba(0,0,0,0.5)',
                }}
            >
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div style={{
                            fontFamily: 'Great Vibes, cursive',
                            fontSize: '44px', fontWeight: 400,
                            color: '#ffffff',
                            lineHeight: 1,
                            textShadow: '0 0 20px rgba(196,51,153,0.6)',
                        }}>Rashi</div>
                    </Link>
                </div>

                {/* Nav Links */}
                <ul style={{ display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0 }}>
                    {navLinks.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <motion.li key={item.name}
                                whileHover={{ color: '#c4b5fd' }}
                                style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: '13px',
                                    letterSpacing: '0.06em', color: isActive ? '#c4b5fd' : '#7b6ea0',
                                    cursor: 'pointer', fontWeight: 500,
                                    position: 'relative', transition: 'color 0.2s',
                                }}
                            >
                                <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {item.name}
                                </Link>
                                {/* Active underline */}
                                {isActive && (
                                    <div style={{ position: 'absolute', bottom: '-6px', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #8b5cf6, transparent)' }} />
                                )}
                            </motion.li>
                        )
                    })}
                </ul>

                {/* Cart & CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button
                        onClick={openCart}
                        style={{ background: 'transparent', border: 'none', color: '#c4b5fd', cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative' }}
                    >
                        <ShoppingCart size={22} />
                        {getCartItemsCount() > 0 && (
                            <div style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                background: '#c43399', color: '#fff', fontSize: '10px', fontWeight: 600,
                                width: '18px', height: '18px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {getCartItemsCount()}
                            </div>
                        )}
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(196,51,153,0.6)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'linear-gradient(135deg, #c43399, #9d1773)',
                            color: '#fff', border: 'none',
                            borderRadius: '999px', padding: '12px 28px',
                            fontSize: '12px', fontFamily: 'Inter, sans-serif',
                            cursor: 'pointer', fontWeight: 700, letterSpacing: '0.1em', uppercase: true,
                            boxShadow: '0 4px 20px rgba(196,51,153,0.4)',
                        }}
                    >
                        Book a Reading
                    </motion.button>
                </div>
            </motion.nav>
        </>
    );
};

export default Navbar;
