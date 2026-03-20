// Gemini AI Service — generates daily blog content & horoscopes
// Uses Google Gemini 2.0 Flash (free tier)

const GEMINI_API_KEY = 'PASTE_YOUR_GEMINI_API_KEY_HERE'; // Replace with your key from https://aistudio.google.com/apikey
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Deterministic daily topic rotation
const BLOG_TOPICS = [
  { category: '🌌 Cosmic Energy', prompt: 'Write a trending blog article about cosmic energy and how current planetary alignments affect human energy fields, chakras, and spiritual wellness today. Include practical tips.' },
  { category: '💎 Crystal Healing', prompt: 'Write a trending blog article about a specific healing crystal that is particularly powerful right now. Cover its properties, chakra alignment, cleansing methods, and how to use it for manifestation.' },
  { category: '💧 Zodiac Waters', prompt: 'Write a trending blog article about zodiac-infused water, water frequencies, moon water rituals, and how to energize water based on current astrological transits.' },
  { category: '🪨 Gemstone Trends', prompt: 'Write a trending blog article about a gemstone that is trending in the spiritual wellness community. Cover its metaphysical properties, fashion uses, and astrological significance.' },
  { category: '⭐ Astrology Trends', prompt: 'Write a trending blog article about current astrology trends, upcoming retrogrades, eclipses, or planetary transits. Make it accessible and practical for daily life.' },
  { category: '🧘 Spiritual Wellness', prompt: 'Write a trending blog article about spiritual wellness practices combining meditation, crystals, astrology, and holistic healing. Focus on what is trending and actionable.' },
];

// Curated category-specific imagery
// Curated category-specific imagery
const CATEGORY_IMAGES = {
  '🌌 Cosmic Energy': [
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop', // Aurora
    'https://images.unsplash.com/photo-1506443432602-ac2fc315e91c?q=80&w=800&auto=format&fit=crop', // Deep space
  ],
  '💎 Crystal Healing': [
    'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop', // Crystals
    'https://images.unsplash.com/photo-1587823521235-961d318e87ad?q=80&w=800&auto=format&fit=crop', // Healing stones
  ],
  '💧 Zodiac Waters': [
    'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=800&auto=format&fit=crop', // Rippling water
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop', // Ocean moon
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop', // Waves
    'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=800&auto=format&fit=crop', // Water drops
    'https://images.unsplash.com/photo-1555580399-565b931758c2?q=80&w=800&auto=format&fit=crop', // Glass
  ],
  '🪨 Gemstone Trends': [
    'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800&auto=format&fit=crop', // Tarot/Crystal
    'https://images.unsplash.com/photo-1582213768222-7724aab0dbb7?q=80&w=800&auto=format&fit=crop', // Gemstone rings
    'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800&auto=format&fit=crop', // Tarot and crystals
    'https://images.unsplash.com/photo-1615112110292-66ebd3661be4?q=80&w=800&auto=format&fit=crop', // Colorful gems
    'https://images.unsplash.com/photo-1643444983084-297ebce35da4?q=80&w=800&auto=format&fit=crop', // Emerald
    'https://images.unsplash.com/photo-1601614217154-20ce4130f40d?q=80&w=800&auto=format&fit=crop', // Colorful stones
  ],
  '⭐ Astrology Trends': [
    'https://images.unsplash.com/photo-1544979500-fa71d3ce884e?q=80&w=800&auto=format&fit=crop', // Telescope
    'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=800&auto=format&fit=crop', // Astrology wheel
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop', // Zodiac sky
    'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?q=80&w=800&auto=format&fit=crop', // Astrolabe
    'https://images.unsplash.com/photo-1502691857151-1cb5d2ea37b5?q=80&w=800&auto=format&fit=crop', // Night sky
  ],
  '🧘 Spiritual Wellness': [
    'https://images.unsplash.com/photo-1502581827181-9cf3c3ee0106?q=80&w=800&auto=format&fit=crop', // Hands
    'https://images.unsplash.com/photo-1545389336-eaee310af14a?q=80&w=800&auto=format&fit=crop', // Yoga mat
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', // Incense smoke
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop', // Meditation
  ]
};

function getTopicImage(topicStr, dateSeed, index = 0) {
  const images = CATEGORY_IMAGES[topicStr] || CATEGORY_IMAGES['🧘 Spiritual Wellness'];
  // Complex hash to ensure maximum variety over time without repeating the same combinations
  const numericDate = parseInt(dateSeed.replace(/-/g, ''));
  // Different categories will cycle on different rhythms, preventing the entire grid from feeling stagnant
  const offset = index * 17 + numericDate; 
  return images[offset % images.length];
}

function getDateSeed() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getCacheKey(prefix) {
  return `rashi_${prefix}_v6_${getDateSeed()}`;
}

// Call Gemini API
async function callGemini(prompt) {
  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1200,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error('Gemini API call failed:', error);
    return null;
  }
}

// Generate daily blog posts
export async function generateDailyBlogs() {
  const cacheKey = getCacheKey('blogs');
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* fall through */ }
  }

  const date = getDateSeed();
  const posts = [];

  // Generate 6 articles, one per topic
  for (let i = 0; i < BLOG_TOPICS.length; i++) {
    const topic = BLOG_TOPICS[i];
    const fullPrompt = `${topic.prompt}

Date context: ${date}. Make it feel fresh and relevant to today.

IMPORTANT FORMAT:
- Return ONLY a JSON object with these fields: { "title": "...", "summary": "...", "content": "..." }
- title: catchy, engaging headline (max 80 chars)
- summary: 1-2 sentence preview (max 150 chars)
- content: full article body in HTML format (use <h3>, <p>, <ul>, <li>, <blockquote> tags). About 400-600 words.
- Do NOT include markdown code fences or any text outside the JSON.`;

    const raw = await callGemini(fullPrompt);
    if (raw) {
      try {
        // Extract JSON from response (handle potential markdown wrapping)
        const jsonStr = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        const parsed = JSON.parse(jsonStr);
        posts.push({
          id: `ai-${date}-${i}`,
          title: parsed.title || `Trending ${topic.category}`,
          summary: parsed.summary || '',
          content: parsed.content || '<p>Content is being channeled from the cosmos...</p>',
          category: topic.category,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          readTime: `${Math.floor(Math.random() * 5) + 4} min read`,
          image: getTopicImage(topic.category, date, i),
          isAI: true,
        });
      } catch (e) {
        console.warn('Failed to parse Gemini response for topic', i, e);
        posts.push(getFallbackPost(i, topic, date));
      }
    } else {
      posts.push(getFallbackPost(i, topic, date));
    }
  }

  // Cache for the day
  localStorage.setItem(cacheKey, JSON.stringify(posts));
  return posts;
}

function getFallbackPost(i, topic, date) {
  const fallbackTitles = [
    'How Today\'s Cosmic Energy Shifts Your Aura and Vitality',
    'The Crystal Everyone Is Talking About This Week',
    'Moon Water Ritual: Aligning Hydration With Lunar Cycles',
    'This Ancient Gemstone Is Making a Major Comeback',
    'Mercury Retrograde Is Coming: Here\'s How to Prepare',
    'Morning Spiritual Wellness Routine for Inner Peace',
  ];
  const fallbackContent = [
    '<p>The cosmos is alive with transformative energy today. As celestial bodies shift their positions, they create powerful energetic currents that influence our daily lives.</p><h3>What This Means for You</h3><p>Today\'s planetary alignment amplifies your intuitive abilities. Take time to meditate and connect with your inner wisdom. Crystals like Amethyst and Clear Quartz can help amplify these cosmic frequencies.</p><p>Consider setting intentions during the evening hours when the energy peaks. Use grounding techniques if you feel overwhelmed by the intensity of today\'s cosmic weather.</p>',
    '<p>Crystal healing continues to gain mainstream recognition as more people discover the profound effects of these natural energy tools.</p><h3>Today\'s Power Crystal</h3><p>Rose Quartz is experiencing a renaissance in the spiritual community. Known as the stone of unconditional love, it works on the heart chakra to open you up to giving and receiving love.</p><p>Place it on your nightstand for deeper sleep, or carry a tumbled stone in your pocket for all-day positive vibes.</p>',
    '<p>Water holds memory and frequency — this is the foundation of zodiac water therapy. By aligning your hydration with lunar cycles, you can enhance your body\'s natural healing abilities.</p><h3>Today\'s Moon Water Practice</h3><p>During the current moon phase, water charged overnight absorbs lunar energy that supports emotional clarity and intuitive development.</p><p>Add a few drops of lemon and a small amethyst crystal (externally, not submerged) near your water vessel to amplify the charging effect.</p>',
    '<p>The gemstone world is buzzing with excitement as ancient stones find new relevance in modern spiritual practice.</p><h3>Trending Now</h3><p>Labradorite — the stone of transformation — is the gemstone of the moment. Its mesmerizing play of colours (called labradorescence) mirrors the northern lights, connecting you to higher consciousness.</p><p>Wear it as a pendant near your throat chakra for enhanced communication and psychic protection.</p>',
    '<p>The astrological calendar is packed with significant transits this season. Understanding these movements helps you navigate life\'s currents with greater awareness.</p><h3>Key Transits to Watch</h3><p>Venus is moving through a sensitive house, amplifying themes of love, beauty, and financial matters. This is an excellent time for self-care rituals and reviewing your relationship with abundance.</p><p>Saturn\'s steady influence reminds us that lasting results come from consistent effort and patience.</p>',
    '<p>Spiritual wellness is about integrating mind, body, and spirit into a harmonious daily practice.</p><h3>Your Morning Ritual</h3><p>Start your day with a 5-minute meditation holding your birthstone. Follow with mindful hydration — drink your first glass of water while setting a clear intention for the day.</p><p>End your morning ritual with three deep breaths and a moment of gratitude. These simple practices compound over time into profound transformation.</p>',
  ];

  return {
    id: `ai-${date}-${i}`,
    title: fallbackTitles[i] || `Trending in ${topic.category}`,
    summary: 'Discover the latest cosmic insights and spiritual trends.',
    content: fallbackContent[i] || '<p>Fresh cosmic content is being channeled...</p>',
    category: topic.category,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.floor(5 + i)} min read`,
    image: getTopicImage(topic.category, date, i),
    isAI: true,
    isFallback: true,
  };
}

// Generate daily horoscope for a sign
export async function generateDailyHoroscope(sign) {
  const cacheKey = getCacheKey(`horoscope_${sign}`);
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  const prompt = `Write a brief, inspiring daily horoscope for ${sign} for today (${getDateSeed()}). 
Keep it 2-3 sentences, warm and encouraging. Include a lucky colour, lucky number, and energy rating (1-10).
Return ONLY a JSON: { "horoscope": "...", "luckyColor": "...", "luckyNumber": X, "energy": X }
No markdown fences.`;

  const raw = await callGemini(prompt);
  if (raw) {
    try {
      const jsonStr = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      const result = JSON.stringify(parsed);
      localStorage.setItem(cacheKey, result);
      return result;
    } catch { /* fall through */ }
  }

  // Fallback
  const fallback = JSON.stringify({
    horoscope: `Today brings a wave of positive energy for ${sign}. Trust your instincts and embrace new opportunities. The stars favour bold decisions and creative expression.`,
    luckyColor: 'Amethyst Purple',
    luckyNumber: Math.floor(Math.random() * 99) + 1,
    energy: Math.floor(Math.random() * 3) + 7,
  });
  localStorage.setItem(cacheKey, fallback);
  return fallback;
}

/**
 * Generates an aura reading based on detected color
 */
export async function generateAuraReading(hex, colorName) {
  const entropy = Math.random().toString(36).substring(7);
  const prompt = `Analyze a spiritual aura with the dominant color ${colorName} (Exact Hex: ${hex}). 
Provide a mystical, insightful 2-3 sentence reading about the person's current energy.
Seed ID: ${entropy} (use this to ensure a unique perspective, do not repeat previous interpretations).
Suggest a healing crystal and a "State of Flow" percentage (0-100%).
Return ONLY a JSON: { "reading": "...", "crystal": "...", "energyLevel": "X%" }
No markdown code fences.`;


  const raw = await callGemini(prompt);
  if (raw) {
    try {
      const jsonStr = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      return parsed;
    } catch { /* fall through */ }
  }

  // Dynamic Fallback if API fails
  const randomEnergy = Math.floor(Math.random() * 15) + 80; // 80-95%
  const fallbacks = [
    `Your ${colorName} aura suggests a period of vibrant growth and spiritual expansion. You are vibrating at a frequency that attracts abundance.`,
    `A significant ${colorName} presence in your aura indicates deep emotional intelligence and a strong connection to your inner truth right now.`,
    `The ${colorName} light surrounding you point towards a powerful transition phase. Your energy is aligning with new creative possibilities.`,
    `You are radiating a steady ${colorName} glow, which reflects technical precision balanced with spiritual grounding. A very rare alignment.`
  ];
  
  const randomReading = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  
  return {
    reading: randomReading,
    crystal: colorName.includes('Red') ? 'Red Jasper' : colorName.includes('Blue') ? 'Lapis Lazuli' : colorName.includes('Green') ? 'Jade' : colorName.includes('Violet') ? 'Amethyst' : 'Clear Quartz',
    energyLevel: `${randomEnergy}%`
  };
}


/**
 * Generates a full synthesized tarot reading using Gemini
 */
export async function generateTarotReading(cards) {
  const cardsStr = cards.map(c => `${c.name} (${c.isReversed ? 'Reversed' : 'Upright'}) in the ${c.position} position`).join(', ');
  
  const prompt = `Perform a deep, mystical tarot reading based on these three cards drawn for Past, Present, and Future: ${cardsStr}.
Provide a cohesive narrative that connects the cards (about 100-150 words). 
Focus on spiritual growth, hidden energies, and actionable cosmic advice.
Return ONLY a JSON: { "reading": "..." }
No markdown code fences.`;

  const raw = await callGemini(prompt);
  if (raw) {
    try {
      const jsonStr = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      return parsed.reading;
    } catch { /* fall through */ }
  }

  return `The sequence of ${cards[0].name}, ${cards[1].name}, and ${cards[2].name} suggests a powerful cycle of transformation. Your journey from the past into the future is guided by strong intuition and cosmic alignment. Trust the process as the universe unfolds its mysteries before you.`;
}

export { getDateSeed };

