const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const checkProduct = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('MONGO_URI not set in .env');
      process.exit(1);
    }
    
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Find the product named "Ahmad"
    const product = await Product.findOne({ name: 'Ahmad' });
    if (product) {
      console.log('Product found:');
      console.log('Name:', product.name);
      console.log('Images:', product.images);
      console.log('Full product:', JSON.stringify(product, null, 2));
    } else {
      console.log('Product "Ahmad" not found');
      // Let's see all products
      const allProducts = await Product.find({}, 'name images').limit(5);
      console.log('Recent products:');
      allProducts.forEach(p => {
        console.log(`- ${p.name}: ${JSON.stringify(p.images)}`);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

checkProduct();
