const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial products...');

    const products = [
        {
            name: "Aries Fire Agate Bracelet",
            description: "Energize your aura with this authentic fire agate bracelet, specifically attuned for Aries energy.",
            price: 49.99,
            category: "Zodiac Bracelets",
            imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
            zodiacSign: "Aries",
            spiritualBenefit: "Boosts courage and passion",
            stock: 15
        },
        {
            name: "Taurus Emerald Enhancer",
            description: "A grounding emerald bracelet designed to attract abundance for Taurus placements.",
            price: 59.99,
            category: "Zodiac Bracelets",
            imageUrl: "https://images.unsplash.com/photo-1599643477874-9b2f275bd9ce?q=80&w=600&auto=format&fit=crop",
            zodiacSign: "Taurus",
            spiritualBenefit: "Attracts physical and spiritual wealth",
            stock: 10
        },
        {
            name: "Raw Pyrite Wealth Magnet",
            description: "High-grade Peruvian pyrite cluster bracelet. Known as Fool's Gold, it shields against negative energy.",
            price: 39.99,
            category: "Pyrite Bracelets",
            imageUrl: "https://images.unsplash.com/photo-1599643478514-46b1c1e57c6b?q=80&w=600&auto=format&fit=crop",
            zodiacSign: "All",
            spiritualBenefit: "Manifests wealth and blocks negativity",
            stock: 25
        },
        {
            name: "Cosmic Amethyst Water Bottle",
            description: "Glass water bottle featuring a natural amethyst point to infuse your water with calming energy.",
            price: 65.00,
            category: "Water Bottles",
            imageUrl: "https://images.unsplash.com/photo-1523362628745-0c14b2dcd68b?q=80&w=600&auto=format&fit=crop",
            zodiacSign: "All",
            spiritualBenefit: "Promotes peace and inner alignment",
            stock: 8
        },
        {
            name: "Scorpio Obsidian Protector",
            description: "Deep black obsidian bracelet for profound emotional protection and shadow work.",
            price: 45.00,
            category: "Zodiac Bracelets",
            imageUrl: "https://images.unsplash.com/photo-1611591437142-2d14cb32d847?q=80&w=600&auto=format&fit=crop",
            zodiacSign: "Scorpio",
            spiritualBenefit: "Emotional protection and psychic shielding",
            stock: 12
        }
    ];

    for (const product of products) {
        const createdProduct = await prisma.product.create({
            data: product
        });
        console.log(`Created product: ${createdProduct.name}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
