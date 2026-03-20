import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
    {
        category: 'MYSTICISM',
        title: 'Tarot Reading',
        image: 'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?auto=format&fit=crop&w=600&q=80',
    },
    {
        category: 'COSMOS',
        title: 'Nebula Gazing',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80',
    },
    {
        category: 'FUTURE',
        title: 'Palmistry',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    },
];

const Gallery = () => {
    return (
        <section style={{ width: '100%', padding: '0 0 100px', background: '#0a0000' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

                {/* Gallery Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '32px',
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 'clamp(20px, 2.5vw, 28px)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#f5f5f5',
                            margin: 0,
                        }}
                    >
                        Gallery
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            height: '2px', width: '48px',
                            background: '#d82323',
                            transformOrigin: 'left',
                        }}
                    />
                </div>

                {/* Gallery Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {galleryItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.55, delay: i * 0.12 }}
                            whileHover={{ y: -8 }}
                            style={{
                                position: 'relative',
                                height: '300px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: '1px solid #2a0a0a',
                            }}
                        >
                            {/* Image */}
                            <motion.img
                                src={item.image}
                                alt={item.title}
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute', inset: 0,
                                    width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.7,
                                }}
                            />

                            {/* Gradient overlay */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                            }} />

                            {/* Label + Title */}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0,
                                padding: '20px 16px',
                            }}>
                                <span style={{
                                    display: 'block',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    letterSpacing: '0.12em',
                                    color: '#d82323',
                                    textTransform: 'uppercase',
                                    marginBottom: '4px',
                                }}>
                                    {item.category}
                                </span>
                                <span style={{
                                    display: 'block',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#f5f5f5',
                                    letterSpacing: '0.05em',
                                }}>
                                    {item.title}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
