const Product = require('../models/Product');

/**
 * Get all products for admin management
 */
exports.getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      collection,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (collection) {
      filter.collection = collection;
    }
    
    // Add search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Get products with pagination
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    // Get collection statistics
    const collectionStats = await Product.aggregate([
      { $group: { _id: '$collection', count: { $sum: 1 } } }
    ]);

    const collectionDistribution = collectionStats.reduce((acc, stat) => {
      acc[stat._id || 'uncategorized'] = stat.count;
      return acc;
    }, {});

    // Get stock statistics
    const stockStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          lowStockProducts: {
            $sum: { $cond: [{ $lte: ['$stock', 10] }, 1, 0] }
          },
          outOfStockProducts: {
            $sum: { $cond: [{ $eq: ['$stock', 0] }, 1, 0] }
          },
          averagePrice: { $avg: '$price' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts: total,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1,
          limit: limitNum
        },
        statistics: {
          collectionDistribution,
          stockInfo: stockStats[0] || {
            totalProducts: 0,
            totalStock: 0,
            lowStockProducts: 0,
            outOfStockProducts: 0,
            averagePrice: 0
          }
        },
        filters: {
          search,
          collection,
          sortBy,
          sortOrder
        }
      }
    });

  } catch (error) {
    console.error('Admin get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Update product with role-based field restrictions
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;
    const updateData = req.body;

    // Find the product
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Role-based field restrictions
    const allowedFields = {
      admin: ['name', 'price'], // Admin can only update title and price
      superAdmin: ['name', 'price', 'description', 'stock', 'weight', 'collection', 'origin', 'flavours', 'quality', 'caffeine', 'images'] // SuperAdmin can update all fields
    };

    const userAllowedFields = allowedFields[currentUser.role] || [];
    
    // Filter update data based on user role
    const filteredUpdateData = {};
    const restrictedFields = [];

    Object.keys(updateData).forEach(field => {
      if (userAllowedFields.includes(field)) {
        filteredUpdateData[field] = updateData[field];
      } else {
        restrictedFields.push(field);
      }
    });

    // If no valid fields to update
    if (Object.keys(filteredUpdateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update',
        allowedFields: userAllowedFields,
        restrictedFields
      });
    }

    // Store original values for response
    const originalValues = {};
    Object.keys(filteredUpdateData).forEach(field => {
      originalValues[field] = product[field];
    });

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      filteredUpdateData,
      { 
        new: true, 
        runValidators: true 
      }
    );

    // Log the update
    console.log(`Product update: ${currentUser.email} updated product "${product.name}" (ID: ${id})`);
    console.log('Updated fields:', Object.keys(filteredUpdateData));

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        product: updatedProduct,
        updateInfo: {
          updatedFields: Object.keys(filteredUpdateData),
          restrictedFields,
          updatedBy: {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role
          },
          originalValues,
          updatedAt: new Date()
        }
      }
    });

  } catch (error) {
    console.error('Admin update product error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Delete product (SuperAdmin only)
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    // Find and delete the product
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Log the deletion
    console.log(`Product deletion: ${currentUser.email} deleted product "${product.name}" (ID: ${id})`);

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: {
        deletedProduct: {
          id: product._id,
          name: product.name,
          price: product.price,
          collection: product.collection
        },
        deletionInfo: {
          deletedBy: {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role
          },
          deletedAt: new Date()
        }
      }
    });

  } catch (error) {
    console.error('Admin delete product error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
