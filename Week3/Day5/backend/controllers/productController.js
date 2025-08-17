const Product = require('../models/Product');

/**
 * Get all products with filtering and pagination
 */
exports.getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      collection, 
      origin, 
      flavours, 
      quality, 
      caffeine, 
      minPrice, 
      maxPrice, 
      q,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (collection) filter.collection = { $regex: collection, $options: 'i' };
    if (origin) filter.origin = { $regex: origin, $options: 'i' };
    if (quality) filter.quality = { $regex: quality, $options: 'i' };
    if (caffeine) filter.caffeine = { $regex: caffeine, $options: 'i' };
    
    // Handle flavours array filter
    if (flavours) {
      const flavourArray = Array.isArray(flavours) ? flavours : [flavours];
      filter.flavours = { $in: flavourArray.map(f => new RegExp(f, 'i')) };
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Text search filter
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { collection: { $regex: q, $options: 'i' } },
        { origin: { $regex: q, $options: 'i' } }
      ];
    }

    // Only show products with stock > 0
    filter.stock = { $gt: 0 };

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const products = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOptions)
      .lean();

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: Number(page),
          total: totalPages,
          count: products.length,
          totalProducts: total,
          hasNext: Number(page) < totalPages,
          hasPrev: Number(page) > 1
        }
      }
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching products', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Get single product by ID
 */
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error('Get product error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching product', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Create new product (Admin only - will need admin auth later)
 */
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (err) {
    console.error('Create product error:', err);
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while creating product', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Update product (Admin only - will need admin auth later)
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (err) {
    console.error('Update product error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating product', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Delete product (Admin only - will need admin auth later)
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    console.error('Delete product error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting product', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Get all unique filter values for frontend filters
 */
exports.getFilterOptions = async (req, res) => {
  try {
    const filterOptions = await Product.aggregate([
      {
        $group: {
          _id: null,
          collections: { $addToSet: '$collection' },
          origins: { $addToSet: '$origin' },
          qualities: { $addToSet: '$quality' },
          caffeineTypes: { $addToSet: '$caffeine' },
          allFlavours: { $addToSet: '$flavours' },
          priceRange: { 
            $push: { 
              min: { $min: '$price' }, 
              max: { $max: '$price' } 
            } 
          }
        }
      },
      {
        $project: {
          _id: 0,
          collections: { $filter: { input: '$collections', as: 'item', cond: { $ne: ['$$item', null] } } },
          origins: { $filter: { input: '$origins', as: 'item', cond: { $ne: ['$$item', null] } } },
          qualities: { $filter: { input: '$qualities', as: 'item', cond: { $ne: ['$$item', null] } } },
          caffeineTypes: { $filter: { input: '$caffeineTypes', as: 'item', cond: { $ne: ['$$item', null] } } },
          flavours: {
            $reduce: {
              input: '$allFlavours',
              initialValue: [],
              in: { $setUnion: ['$$value', '$$this'] }
            }
          },
          minPrice: { $min: '$priceRange.min' },
          maxPrice: { $max: '$priceRange.max' }
        }
      }
    ]);

    const result = filterOptions.length > 0 ? filterOptions[0] : {
      collections: [],
      origins: [],
      qualities: [],
      caffeineTypes: [],
      flavours: [],
      minPrice: 0,
      maxPrice: 0
    };

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Get filter options error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching filter options', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};
