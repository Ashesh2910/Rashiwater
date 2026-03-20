import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Package, Save } from 'lucide-react';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form state
    const [newProduct, setNewProduct] = useState({
        name: '', description: '', price: '', category: 'Water', image: '✨'
    });

    // Mock authentication for demonstration
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Very simple auth for standard scope
            setIsAuthenticated(true);
            fetchProducts();
        } else {
            alert('Incorrect admin password. Try "admin123"');
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products for admin', error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price) return;

        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (res.ok) {
                fetchProducts();
                setNewProduct({ name: '', description: '', price: '', category: 'Water', image: '✨' });
            }
        } catch (error) {
            console.error('Add failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Erase this item from existence?')) return;

        try {
            const res = await fetch(`http://localhost:3001/api/products/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <section style={{ minHeight: '100vh', paddingTop: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'rgba(12, 8, 30, 0.8)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px', padding: '60px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#f0eeff', marginBottom: '8px' }}>Admin Portal</h2>
                    <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#8070a8', marginBottom: '32px' }}>Enter the cosmic key to access.</p>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', padding: '16px', color: '#fff', outline: 'none', fontFamily: 'Inter', textAlign: 'center' }}
                        />
                        <button type="submit" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: '#fff', border: 'none', borderRadius: '8px', padding: '16px', fontFamily: 'Inter', fontWeight: 600, cursor: 'pointer' }}>
                            Access
                        </button>
                    </form>
                </motion.div>
            </section>
        );
    }

    return (
        <section style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', color: '#fff', margin: 0 }}>
                        Dashboard <span style={{ color: '#8b5cf6', fontSize: '24px' }}>{`// Constellation Management`}</span>
                    </h1>
                    <button onClick={() => setIsAuthenticated(false)} style={{ background: 'transparent', border: '1px solid rgba(139,92,246,0.5)', color: '#c4b5fd', borderRadius: '999px', padding: '8px 24px', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px' }}>
                        Logout
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>

                    {/* Add Product Form */}
                    <div style={{ background: 'rgba(12, 8, 30, 0.6)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '24px', padding: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ color: '#c43399' }}><Plus size={20} /></div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#f0eeff', margin: 0 }}>Create Artifact</h2>
                        </div>

                        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontFamily: 'Inter', fontSize: '11px', color: '#a78bfa', textTransform: 'uppercase' }}>Name</label>
                                <input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} type="text" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'Inter' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontFamily: 'Inter', fontSize: '11px', color: '#a78bfa', textTransform: 'uppercase' }}>Price</label>
                                    <input required value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} type="number" step="0.01" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'Inter' }} />
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontFamily: 'Inter', fontSize: '11px', color: '#a78bfa', textTransform: 'uppercase' }}>Category</label>
                                    <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'Inter', cursor: 'pointer' }}>
                                        <option value="Water">Water</option>
                                        <option value="Bracelets">Bracelets</option>
                                        <option value="Merchandise">Merchandise</option>
                                        <option value="Subscription">Subscription</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontFamily: 'Inter', fontSize: '11px', color: '#a78bfa', textTransform: 'uppercase' }}>Image Emoji</label>
                                    <input value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} type="text" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'Inter' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label style={{ fontFamily: 'Inter', fontSize: '11px', color: '#a78bfa', textTransform: 'uppercase' }}>Description</label>
                                <textarea required value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} rows="3" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', fontFamily: 'Inter', resize: 'vertical' }} />
                            </div>

                            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px', fontFamily: 'Inter', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
                                <Save size={16} /> {loading ? 'Saving...' : 'Save Product'}
                            </button>
                        </form>
                    </div>

                    {/* Product List */}
                    <div style={{ background: 'rgba(12, 8, 30, 0.6)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ color: '#8b5cf6' }}><Package size={20} /></div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#f0eeff', margin: 0 }}>Active Manifestations ({products.length})</h2>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '600px' }}>
                            {products.length === 0 ? (
                                <p style={{ color: '#6b5e88', fontFamily: 'Inter', textAlign: 'center', marginTop: '40px' }}>No products found in the database.</p>
                            ) : (
                                products.map(product => (
                                    <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(139,92,246,0.1)', borderRadius: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ fontSize: '24px' }}>{product.image}</div>
                                            <div>
                                                <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#f0eeff', marginBottom: '4px' }}>{product.name}</div>
                                                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category} • ${parseFloat(product.price).toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(product.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Admin;
