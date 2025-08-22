const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

console.log('Starting seedProducts script...');

// Images available in frontend/public/images/products
const availableImages = [
	'products/product-1.jpg',
	'products/product-2.jpg',
	'products/product-3.jpg',
	'products/product-4.jpg',
	'products/product-5.jpg',
	'products/product-6.jpg',
	'products/product-7.jpg',
	'products/product-8.jpg',
	'products/product-9.jpg'
];

const products = [
	// Black Tea Collection (5 products)
	{
		name: 'Classic English Breakfast',
		description: 'Traditional full-bodied blend perfect for morning rituals.',
		price: 7.99,
		weight: '100g',
		collection: 'Black Tea',
		origin: 'Ceylon & Assam',
		flavours: ['Malty', 'Bold'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 45
	},
	{
		name: 'Earl Grey Supreme',
		description: 'Classic Earl Grey with bergamot and lavender flowers.',
		price: 9.50,
		weight: '100g',
		collection: 'Black Tea',
		origin: 'Ceylon, Sri Lanka',
		flavours: ['Bergamot', 'Citrus', 'Floral'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 38
	},
	{
		name: 'Assam Gold',
		description: 'Strong, malty Assam tea with golden tips.',
		price: 8.25,
		weight: '100g',
		collection: 'Black Tea',
		origin: 'Assam, India',
		flavours: ['Malty', 'Honey'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 52
	},
	{
		name: 'Ceylon Orange Pekoe',
		description: 'Bright, citrusy Ceylon tea with excellent color.',
		price: 7.75,
		weight: '100g',
		collection: 'Black Tea',
		origin: 'Ceylon, Sri Lanka',
		flavours: ['Citrus', 'Bright'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 41
	},
	{
		name: 'Russian Caravan',
		description: 'Smoky blend reminiscent of ancient trade routes.',
		price: 10.99,
		weight: '100g',
		collection: 'Black Tea',
		origin: 'China & India',
		flavours: ['Smoky', 'Complex'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 28
	},

	// Green Tea Collection (5 products)
	{
		name: 'Sencha Premium',
		description: 'Fresh, grassy Japanese green tea with umami notes.',
		price: 12.50,
		weight: '50g',
		collection: 'Green Tea',
		origin: 'Shizuoka, Japan',
		flavours: ['Grassy', 'Umami'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 35
	},
	{
		name: 'Jasmine Phoenix Pearls',
		description: 'Hand-rolled green tea pearls scented with jasmine flowers.',
		price: 18.99,
		weight: '50g',
		collection: 'Green Tea',
		origin: 'Fujian, China',
		flavours: ['Floral', 'Sweet'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 22
	},
	{
		name: 'Gunpowder Green',
		description: 'Bold Chinese green tea with tightly rolled leaves.',
		price: 8.99,
		weight: '100g',
		collection: 'Green Tea',
		origin: 'Zhejiang, China',
		flavours: ['Bold', 'Earthy'],
		quality: 'Standard',
		caffeine: 'Medium',
		stock: 48
	},
	{
		name: 'Gyokuro Shade-Grown',
		description: 'Premium shade-grown Japanese green tea.',
		price: 24.99,
		weight: '30g',
		collection: 'Green Tea',
		origin: 'Uji, Japan',
		flavours: ['Umami', 'Sweet'],
		quality: 'Ceremonial',
		caffeine: 'Medium',
		stock: 15
	},
	{
		name: 'Moroccan Mint Green',
		description: 'Refreshing blend of green tea and spearmint.',
		price: 9.75,
		weight: '100g',
		collection: 'Green Tea',
		origin: 'China & Morocco',
		flavours: ['Mint', 'Refreshing'],
		quality: 'Standard',
		caffeine: 'Medium',
		stock: 55
	},

	// White Tea Collection (3 products)
	{
		name: 'Silver Needle (Bai Hao Yin Zhen)',
		description: 'Premium white tea with silvery buds and delicate flavor.',
		price: 28.99,
		weight: '50g',
		collection: 'White Tea',
		origin: 'Fujian, China',
		flavours: ['Delicate', 'Sweet'],
		quality: 'Premium',
		caffeine: 'Low',
		stock: 18
	},
	{
		name: 'White Peony (Bai Mu Dan)',
		description: 'Smooth white tea with larger leaves and subtle sweetness.',
		price: 16.50,
		weight: '50g',
		collection: 'White Tea',
		origin: 'Fujian, China',
		flavours: ['Floral', 'Honey'],
		quality: 'Premium',
		caffeine: 'Low',
		stock: 25
	},
	{
		name: 'Moonlight White',
		description: 'Rare white tea with complex flavor and natural sweetness.',
		price: 32.99,
		weight: '50g',
		collection: 'White Tea',
		origin: 'Yunnan, China',
		flavours: ['Complex', 'Sweet'],
		quality: 'Premium',
		caffeine: 'Low',
		stock: 12
	},

	// Oolong Tea Collection (4 products)
	{
		name: 'Ti Kuan Yin (Iron Goddess)',
		description: 'Classic Chinese oolong with floral aroma and lasting sweetness.',
		price: 15.99,
		weight: '50g',
		collection: 'Oolong',
		origin: 'Fujian, China',
		flavours: ['Floral', 'Sweet'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 32
	},
	{
		name: 'Formosa High Mountain',
		description: 'Taiwanese high-altitude oolong with complex flavors.',
		price: 22.50,
		weight: '50g',
		collection: 'Oolong',
		origin: 'Taiwan',
		flavours: ['Complex', 'Fruity'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 19
	},
	{
		name: 'Da Hong Pao (Big Red Robe)',
		description: 'Famous rock oolong with mineral notes and roasted flavor.',
		price: 35.99,
		weight: '50g',
		collection: 'Oolong',
		origin: 'Wuyi Mountains, China',
		flavours: ['Roasted', 'Mineral'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 14
	},
	{
		name: 'Milk Oolong',
		description: 'Creamy oolong with natural milk-like sweetness.',
		price: 18.75,
		weight: '50g',
		collection: 'Oolong',
		origin: 'Taiwan',
		flavours: ['Creamy', 'Sweet'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 26
	},

	// Herbal Tea Collection (4 products)
	{
		name: 'Chamomile Dreams',
		description: 'Pure Egyptian chamomile flowers for relaxation.',
		price: 6.99,
		weight: '50g',
		collection: 'Herbal Tea',
		origin: 'Egypt',
		flavours: ['Floral', 'Honey'],
		quality: 'Premium',
		caffeine: 'None',
		stock: 65
	},
	{
		name: 'Peppermint Fresh',
		description: 'Refreshing peppermint leaves for digestive wellness.',
		price: 5.75,
		weight: '50g',
		collection: 'Herbal Tea',
		origin: 'Oregon, USA',
		flavours: ['Mint', 'Cool'],
		quality: 'Standard',
		caffeine: 'None',
		stock: 78
	},
	{
		name: 'Rooibos Vanilla',
		description: 'South African red bush tea with natural vanilla notes.',
		price: 8.25,
		weight: '100g',
		collection: 'Rooibos',
		origin: 'South Africa',
		flavours: ['Vanilla', 'Sweet'],
		quality: 'Premium',
		caffeine: 'None',
		stock: 42
	},
	{
		name: 'Lemon Ginger Wellness',
		description: 'Energizing blend of lemon, ginger, and healing herbs.',
		price: 7.50,
		weight: '50g',
		collection: 'Herbal Tea',
		origin: 'Various',
		flavours: ['Citrus', 'Spicy'],
		quality: 'Standard',
		caffeine: 'None',
		stock: 58
	},

	// Chai & Spiced Tea Collection (4 products)
	{
		name: 'Masala Chai Traditional',
		description: 'Authentic Indian spice blend with cardamom, cinnamon, and ginger.',
		price: 9.99,
		weight: '100g',
		collection: 'Chai',
		origin: 'India',
		flavours: ['Spicy', 'Warm'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 47
	},
	{
		name: 'Vanilla Chai',
		description: 'Smooth chai blend with natural vanilla and warming spices.',
		price: 10.50,
		weight: '100g',
		collection: 'Chai',
		origin: 'India',
		flavours: ['Vanilla', 'Spicy'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 33
	},
	{
		name: 'Golden Turmeric Chai',
		description: 'Anti-inflammatory blend with turmeric, ginger, and spices.',
		price: 11.75,
		weight: '100g',
		collection: 'Chai',
		origin: 'India',
		flavours: ['Earthy', 'Warming'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 29
	},
	{
		name: 'Chocolate Chai',
		description: 'Decadent chai blend with cocoa and warming spices.',
		price: 12.25,
		weight: '100g',
		collection: 'Chai',
		origin: 'India',
		flavours: ['Chocolate', 'Spicy'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 24
	}
];

const run = async () => {
	const uri = process.env.MONGO_URI;
	// Optional base URL for building absolute image URLs (useful when frontend
	// is hosted separately from backend). If not set, the script will use
	// root-relative URLs like /images/products/xxx which rely on the backend
	// serving /images/ at runtime.
	const BACKEND_URL = process.env.BACKEND_URL || '';
	if (!uri) {
		console.error('MONGO_URI not set in .env');
		process.exit(1);
	}
	await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log('Connected to MongoDB for seeding');

	try {
		// Attach image URLs to products (reuse images as needed)
		const enriched = products.map((p, i) => {
			// pick 1-3 images per product
			const imgs = [];
			const imgCount = 1 + (i % 3); // 1..3
			for (let k = 0; k < imgCount; k++) {
				const idx = (i + k) % availableImages.length;
				// Images will be served from /images/<path> by server.
				// If BACKEND_URL is provided, build absolute URLs so images resolve
				// correctly when frontend is served from a different host.
				const rel = `/images/${availableImages[idx]}`;
				imgs.push(BACKEND_URL ? `${BACKEND_URL.replace(/\/$/, '')}${rel}` : rel);
			}
			return { ...p, images: imgs };
		});

			// Insert or replace - explicit find then create/update to avoid upsert casting issues
			for (const prod of enriched) {
				const existing = await Product.findOne({ name: prod.name });
				if (existing) {
					await Product.updateOne({ _id: existing._id }, prod, { runValidators: true });
					console.log(`Updated product: ${prod.name}`);
				} else {
					await Product.create(prod);
					console.log(`Created product: ${prod.name}`);
				}
			}

			console.log('Seeding complete');
	} catch (err) {
		console.error('Seeding error:', err);
	} finally {
		mongoose.connection.close();
	}
};

run();

