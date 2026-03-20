import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLANET_SYMBOLS = {
    Sun: '☀️', Moon: '🌙', Mercury: '☿', Venus: '♀', Mars: '♂',
    Jupiter: '♃', Saturn: '♄', Uranus: '⛢', Neptune: '♆', Pluto: '♇',
    Rahu: '🐉', Ketu: '☊',
};
const PLANET_COLORS = {
    Sun: '#fbbf24', Moon: '#e0d8ff', Mercury: '#6ee7b7', Venus: '#f9a8d4',
    Mars: '#f87171', Jupiter: '#fb923c', Saturn: '#94a3b8', Uranus: '#67e8f9',
    Neptune: '#818cf8', Pluto: '#c084fc', Rahu: '#a78bfa', Ketu: '#34d399',
};
const ZODIAC_SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const API_KEY = '1K2Y0mXWGKabd30tA79P98a41vScjRI95nNkKlnA';
const API_URL = 'https://json.freeastrologyapi.com/planets';

// Rough timezone from longitude (good enough for most cases; India is special-cased by Nominatim's country_code)
const estimateTimezone = (lng, countryCode) => {
    if (countryCode === 'in') return 5.5;
    if (countryCode === 'np') return 5.75;
    if (countryCode === 'ir') return 3.5;
    if (countryCode === 'af') return 4.5;
    if (countryCode === 'pk') return 5;
    if (countryCode === 'lk') return 5.5;
    if (countryCode === 'bd') return 6;
    if (countryCode === 'mm') return 6.5;
    if (countryCode === 'th' || countryCode === 'vn' || countryCode === 'kh' || countryCode === 'la') return 7;
    if (countryCode === 'cn' || countryCode === 'ph' || countryCode === 'my' || countryCode === 'sg' || countryCode === 'tw') return 8;
    if (countryCode === 'jp' || countryCode === 'kr') return 9;
    if (countryCode === 'au') return 10;
    if (countryCode === 'nz') return 12;
    if (countryCode === 'gb' || countryCode === 'ie' || countryCode === 'pt') return 0;
    return Math.round(lng / 15);
};

const getSign = (longitude) => {
    const idx = Math.floor(longitude / 30) % 12;
    return { sign: ZODIAC_SIGNS[idx], symbol: ZODIAC_SYMBOLS[idx], degree: (longitude % 30).toFixed(2) };
};

// LocationSearch: text field → Nominatim suggestions dropdown
const LocationSearch = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searching, setSearching] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [open, setOpen] = useState(false);
    const debounceRef = useRef(null);
    const wrapRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const search = (q) => {
        if (!q || q.length < 2) { setSuggestions([]); return; }
        setSearching(true);
        fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&q=${encodeURIComponent(q)}`, {
            headers: { 'Accept-Language': 'en' },
        })
            .then(r => r.json())
            .then(data => { setSuggestions(data); setOpen(true); })
            .catch(() => setSuggestions([]))
            .finally(() => setSearching(false));
    };

    const handleInput = (e) => {
        setQuery(e.target.value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => search(e.target.value), 400);
    };

    const handleSelect = (place) => {
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);
        const cc = place.address?.country_code || '';
        const tz = estimateTimezone(lng, cc);
        const label = place.display_name;
        setSelectedLabel(label);
        setQuery('');
        setSuggestions([]);
        setOpen(false);
        onSelect({ lat, lng, tz, label });
    };

    const inputStyle = {
        background: 'rgba(12,8,45,0.8)', border: '1px solid rgba(139,92,246,0.35)',
        borderRadius: '8px', padding: '11px 14px', color: '#e0d8ff',
        fontFamily: 'Inter, sans-serif', fontSize: '13px', width: '100%',
        outline: 'none', boxSizing: 'border-box',
    };

    return (
        <div ref={wrapRef} style={{ position: 'relative', marginBottom: '14px' }}>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#6b5e88', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
                📍 Birth Place — Search City / District / Village
            </label>

            {selectedLabel && !query && (
                <div style={{ marginBottom: '6px', padding: '8px 12px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '6px', fontFamily: 'Inter', fontSize: '12px', color: '#c4b5fd', lineHeight: 1.4 }}>
                    ✓ {selectedLabel}
                </div>
            )}

            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder={selectedLabel ? 'Change location…' : 'e.g. Lucknow, Rajkot, Amritsar…'}
                    value={query}
                    onChange={handleInput}
                    onFocus={() => suggestions.length > 0 && setOpen(true)}
                    style={inputStyle}
                />
                {searching && (
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8b5cf6', fontSize: '12px' }}>
                        ●
                    </span>
                )}
            </div>

            <AnimatePresence>
                {open && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        style={{
                            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 999,
                            background: 'rgba(12,6,40,0.98)', border: '1px solid rgba(139,92,246,0.3)',
                            borderRadius: '10px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        }}
                    >
                        {suggestions.map((place, i) => {
                            const addr = place.address || {};
                            const parts = [addr.city || addr.town || addr.village || addr.county, addr.state, addr.country].filter(Boolean);
                            return (
                                <div
                                    key={place.place_id}
                                    onClick={() => handleSelect(place)}
                                    style={{
                                        padding: '10px 14px', cursor: 'pointer',
                                        borderBottom: i < suggestions.length - 1 ? '1px solid rgba(139,92,246,0.1)' : 'none',
                                        transition: 'background 0.15s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.15)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#e0d8ff', marginBottom: '2px' }}>
                                        {parts[0] || place.name}
                                    </div>
                                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#5b4e78', lineHeight: 1.3 }}>
                                        {parts.slice(1).join(', ') || place.display_name.split(',').slice(1, 3).join(',')}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const PlanetCard = ({ name, data, index }) => {
    const color = PLANET_COLORS[name] || '#c4b5fd';
    const long = data.longitude ?? data.fullDegree ?? 0;
    const { sign, symbol, degree } = getSign(long);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
            style={{
                background: 'rgba(12,8,45,0.9)', border: `1px solid ${color}30`,
                borderRadius: '14px', padding: '16px',
                display: 'flex', alignItems: 'center', gap: '12px',
                backdropFilter: 'blur(10px)',
            }}
        >
            <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: `radial-gradient(circle, ${color}30, transparent)`,
                border: `1.5px solid ${color}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            }}>
                {PLANET_SYMBOLS[name] || '✦'}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 600, color: '#f0eeff' }}>{name}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color, letterSpacing: '0.1em', fontWeight: 600 }}>{symbol} {sign}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#5b4e78' }}>{degree}° in {sign}</span>
                    {(data.isRetro === 'true' || data.isRetro === true) && (
                        <span style={{ fontFamily: 'Inter', fontSize: '9px', color: '#f87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '4px', padding: '1px 5px', letterSpacing: '0.08em' }}>℞</span>
                    )}
                </div>
                <div style={{ marginTop: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '2px', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }} animate={{ width: `${(long % 30) / 30 * 100}%` }}
                        transition={{ delay: index * 0.06 + 0.3, duration: 0.8 }}
                        style={{ height: '100%', background: `linear-gradient(90deg, ${color}80, ${color})`, borderRadius: '4px' }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const BirthChart = () => {
    const [form, setForm] = useState({ year: 2000, month: 1, date: 1, hours: 6, minutes: 0, seconds: 0 });
    const [location, setLocation] = useState({ lat: null, lng: null, tz: 5.5, label: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: parseInt(value) || 0 }));
    };

    const fetchChart = async () => {
        if (!location.lat || !location.lng) {
            setError('Please search and select a birth place first.');
            return;
        }
        setLoading(true); setError(null); setResult(null);
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
                body: JSON.stringify({
                    ...form, latitude: location.lat, longitude: location.lng, timezone: location.tz,
                    settings: { observation_point: 'topocentric', ayanamsha: 'lahiri' },
                }),
            });
            if (!res.ok) throw new Error(`API error ${res.status}`);
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch chart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        background: 'rgba(12,8,45,0.8)', border: '1px solid rgba(139,92,246,0.25)',
        borderRadius: '8px', padding: '10px 14px', color: '#e0d8ff',
        fontFamily: 'Inter, sans-serif', fontSize: '13px', width: '100%',
        outline: 'none', boxSizing: 'border-box',
    };
    const labelStyle = { fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#6b5e78', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', display: 'block' };

    const planets = result?.output
        ? Object.entries(result.output).filter(([k]) => k !== 'Ascendant')
        : [];

    return (
        <section style={{ width: '100%', padding: '80px 0 100px', borderTop: '1px solid rgba(139,92,246,0.12)', background: 'rgba(8,4,28,0.35)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        style={{ fontFamily: 'Inter', fontSize: '11px', letterSpacing: '0.22em', color: '#8b5cf6', textTransform: 'uppercase', marginBottom: '10px' }}>
                        Vedic Astrology
                    </motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                        style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: '#f0eeff', margin: '0 0 12px' }}>
                        Your Birth Blueprint
                    </motion.h2>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#5b4e78', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
                        Enter your birth details to reveal your exact planetary positions using Vedic (Lahiri) calculations.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1.4fr' : '1fr', gap: '32px', maxWidth: result ? '100%' : '620px', margin: '0 auto', transition: 'all 0.5s' }}>

                    {/* Form */}
                    <motion.div layout style={{ background: 'rgba(10,6,38,0.85)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: '32px', backdropFilter: 'blur(14px)' }}>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#c4b5fd', margin: '0 0 24px' }}>Birth Details</h3>

                        {/* Date row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            {[['year', 'Year'], ['month', 'Month'], ['date', 'Day']].map(([n, l]) => (
                                <div key={n}>
                                    <label style={labelStyle}>{l}</label>
                                    <input type="number" name={n} value={form[n]} onChange={handleChange} style={inputStyle} />
                                </div>
                            ))}
                        </div>

                        {/* Time row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                            {[['hours', 'Hour'], ['minutes', 'Minute'], ['seconds', 'Second']].map(([n, l]) => (
                                <div key={n}>
                                    <label style={labelStyle}>{l}</label>
                                    <input type="number" name={n} value={form[n]} onChange={handleChange} style={inputStyle} min="0" max={n === 'hours' ? 23 : 59} />
                                </div>
                            ))}
                        </div>

                        {/* Location search */}
                        <LocationSearch onSelect={(loc) => { setLocation(loc); setError(null); }} />

                        {/* Detected coords hint */}
                        {location.lat && (
                            <div style={{ marginBottom: '20px', padding: '8px 14px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '8px', fontFamily: 'Inter', fontSize: '11px', color: '#34d399', display: 'flex', gap: '16px' }}>
                                <span>Lat: {location.lat.toFixed(4)}°</span>
                                <span>Lng: {location.lng.toFixed(4)}°</span>
                                <span>TZ: UTC {location.tz >= 0 ? '+' : ''}{location.tz}</span>
                            </div>
                        )}

                        {/* Generate button */}
                        <motion.button
                            whileHover={{ boxShadow: '0 0 30px rgba(124,58,237,0.55)', scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={fetchChart}
                            disabled={loading}
                            style={{
                                width: '100%', background: loading ? 'rgba(100,70,200,0.4)' : '#7c3aed',
                                color: '#fff', border: 'none', borderRadius: '10px',
                                padding: '15px', fontSize: '14px', fontFamily: 'Inter, sans-serif',
                                cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700,
                                letterSpacing: '0.08em', transition: 'all 0.2s',
                            }}
                        >
                            {loading ? '✦  Reading the Stars…' : '✦  Generate Birth Chart'}
                        </motion.button>

                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ marginTop: '14px', padding: '12px 16px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', fontFamily: 'Inter', fontSize: '13px', color: '#f87171' }}>
                                ⚠ {error}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Results */}
                    <AnimatePresence>
                        {result && (
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#c4b5fd', margin: 0 }}>
                                        Planetary Positions
                                    </h3>
                                    {location.label && (
                                        <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#5b4e78' }}>
                                            📍 {location.label.split(',').slice(0, 2).join(',')}
                                        </span>
                                    )}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxHeight: '540px', overflowY: 'auto', paddingRight: '4px' }}>
                                    {planets.map(([name, data], i) => (
                                        <PlanetCard key={name} name={name} data={data} index={i} />
                                    ))}
                                </div>
                                {result.output?.Ascendant && (() => {
                                    const long = result.output.Ascendant.longitude ?? result.output.Ascendant.fullDegree ?? 0;
                                    const { sign, symbol, degree } = getSign(long);
                                    return (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                                            style={{ marginTop: '14px', padding: '14px 20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(60,20,120,0.15))', border: '1px solid rgba(139,92,246,0.35)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', color: '#f0eeff' }}>↑ Ascendant (Lagna)</span>
                                            <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#c4b5fd', fontWeight: 600 }}>{symbol} {sign} — {degree}°</span>
                                        </motion.div>
                                    );
                                })()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default BirthChart;
