const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
	qty: { type: Number, default: 1 },
	priceAtAdd: { type: Number, required: true }
});

const CartSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	items: { type: [CartItemSchema], default: [] },
	updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
