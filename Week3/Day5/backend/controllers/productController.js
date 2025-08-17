const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, collection, q } = req.query;
    const filter = {};
    if (collection) filter.collection = collection;
    if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }];
    const skip = (page - 1) * limit;
    const items = await Product.find(filter).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
