const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const run = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const count = await Product.countDocuments();
  console.log('Product count:', count);
  const first = await Product.findOne().lean();
  console.log('First product:', first);
  await mongoose.connection.close();
};

run().catch(err => { console.error(err); process.exit(1); });
