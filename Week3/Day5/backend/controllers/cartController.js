const Cart = require('../models/Cart');
const Product = require('../models/Product');

/**
 * Get user's cart
 */
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      return res.json({ 
        success: true,
        data: { 
          user: req.user._id, 
          items: [], 
          total: 0,
          itemCount: 0
        } 
      });
    }

    // Filter out items where product no longer exists
    const validItems = cart.items.filter(item => item.product);
    
    const total = validItems.reduce((sum, item) => sum + (item.qty * item.priceAtAdd), 0);
    const itemCount = validItems.reduce((sum, item) => sum + item.qty, 0);

    res.json({ 
      success: true,
      data: {
        user: cart.user, 
        items: validItems, 
        total: Number(total.toFixed(2)),
        itemCount
      }
    });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching cart', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Add item to cart
 */
exports.addToCart = async (req, res) => {
  const { productId, qty = 1 } = req.body;
  
  try {
    // Validate quantity
    if (qty <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be greater than 0' 
      });
    }

    // Check if product exists and has sufficient stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    if (product.stock < qty) {
      return res.status(400).json({ 
        success: false, 
        message: `Insufficient stock. Only ${product.stock} items available.` 
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId.toString()
    );

    if (existingItemIndex > -1) {
      // Update existing item
      const newQty = cart.items[existingItemIndex].qty + qty;
      
      if (product.stock < newQty) {
        return res.status(400).json({ 
          success: false, 
          message: `Cannot add ${qty} more items. Only ${product.stock - cart.items[existingItemIndex].qty} more available.` 
        });
      }

      cart.items[existingItemIndex].qty = newQty;
    } else {
      // Add new item
      cart.items.push({ 
        product: product._id, 
        qty, 
        priceAtAdd: product.price 
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    // Populate the cart for response
    await cart.populate('items.product');

    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding to cart', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Update cart item quantity
 */
exports.updateItem = async (req, res) => {
  const { itemId } = req.params;
  const { qty } = req.body;
  
  try {
    if (qty <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be greater than 0' 
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found in cart' 
      });
    }

    // Check stock availability
    const product = await Product.findById(item.product);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product no longer exists' 
      });
    }

    if (product.stock < qty) {
      return res.status(400).json({ 
        success: false, 
        message: `Insufficient stock. Only ${product.stock} items available.` 
      });
    }

    item.qty = qty;
    cart.updatedAt = Date.now();
    await cart.save();

    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: cart
    });
  } catch (err) {
    console.error('Update cart item error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid item ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating cart item', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Remove item from cart
 */
exports.removeItem = async (req, res) => {
  const { itemId } = req.params;
  
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found in cart' 
      });
    }

    // Remove the item using splice instead of the deprecated remove() method
    cart.items.splice(itemIndex, 1);
    cart.updatedAt = Date.now();
    await cart.save();

    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart
    });
  } catch (err) {
    console.error('Remove cart item error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid item ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while removing cart item', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Clear entire cart
 */
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart not found' 
      });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while clearing cart', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};
