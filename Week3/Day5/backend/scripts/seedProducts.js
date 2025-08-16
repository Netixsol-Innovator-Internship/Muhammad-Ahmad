const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const products = [
	{
		name: 'Classic Black Tea',
		description: 'Strong, malty black tea perfect for morning.',
		price: 6.99,
		weight: '100g',
		images: [],
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
		images: [],
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
		images: [],
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
		images: [],
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
		images: [],
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
		const count = await Product.countDocuments();
		if (count === 0) {
			await Product.insertMany(products);
			console.log('Seeded products collection');
		} else {
			console.log('Products collection already has data. Skipping seed.');
		}
	} catch (err) {
		console.error('Seeding error:', err);
	} finally {
		mongoose.connection.close();
	}
};

run();

