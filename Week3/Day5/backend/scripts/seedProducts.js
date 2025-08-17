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
	{
		name: 'Classic Black Tea',
		description: 'Strong, malty black tea perfect for morning.',
		price: 6.99,
		weight: '100g',
		collection: 'Black Tea',
		origin: 'Assam, India',
		flavours: ['Malty'],
		quality: 'Premium',
		caffeine: 'High',
		stock: 50
	},
	{
		name: 'Sencha Green Tea',
		description: 'Fresh grassy green tea from Japan.',
		price: 8.5,
		weight: '50g',
		collection: 'Green Tea',
		origin: 'Shizuoka, Japan',
		flavours: ['Grassy', 'Umami'],
		quality: 'Premium',
		caffeine: 'Medium',
		stock: 30
	},
	{
		name: 'Matcha Ceremonial',
		description: 'Finely ground bright green matcha powder.',
		price: 19.99,
		weight: '30g',
		collection: 'Matcha',
		origin: 'Uji, Japan',
		flavours: ['Umami', 'Vegetal'],
		quality: 'Ceremonial',
		caffeine: 'High',
		stock: 20
	},
	{
		name: 'White Peony',
		description: 'Delicate white tea with floral notes.',
		price: 12.0,
		weight: '50g',
		collection: 'White Tea',
		origin: 'Fujian, China',
		flavours: ['Floral'],
		quality: 'Premium',
		caffeine: 'Low',
		stock: 15
	},
	{
		name: 'Chamomile Herbal',
		description: 'Caffeine-free soothing chamomile blend.',
		price: 5.5,
		weight: '40g',
		collection: 'Herbal Tea',
		origin: 'Egypt',
		flavours: ['Floral', 'Honey'],
		quality: 'Standard',
		caffeine: 'None',
		stock: 60
	}
];

const run = async () => {
	const uri = process.env.MONGO_URI;
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
				// Images will be served from /images/<path> by server
				imgs.push(`/images/${availableImages[idx]}`);
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

