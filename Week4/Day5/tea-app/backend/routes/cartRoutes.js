const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const validationHandler = require('../middleware/validationHandler');
const cartController = require('../controllers/cartController');

// All cart routes require authentication
router.use(auth);

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Cart item ID
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         qty:
 *           type: integer
 *           description: Quantity of the product
 *         priceAtAdd:
 *           type: number
 *           description: Price when item was added to cart
 *     Cart:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: User ID
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         total:
 *           type: number
 *           description: Total cart value
 *         itemCount:
 *           type: integer
 *           description: Total number of items in cart
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Last updated date
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */
router.get('/', cartController.getCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: Product ID to add
 *               qty:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *                 description: Quantity to add
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       400:
 *         description: Validation error or insufficient stock
 *       404:
 *         description: Product not found
 */
router.post('/', [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isMongoId()
    .withMessage('Invalid product ID format'),
  body('qty')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
], validationHandler, cartController.addToCart);

/**
 * @swagger
 * /api/cart/item/{itemId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - qty
 *             properties:
 *               qty:
 *                 type: integer
 *                 minimum: 1
 *                 description: New quantity
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Validation error or insufficient stock
 *       404:
 *         description: Cart or item not found
 */
router.put('/item/:itemId', [
  param('itemId')
    .isMongoId()
    .withMessage('Invalid item ID format'),
  body('qty')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
], validationHandler, cartController.updateItem);

/**
 * @swagger
 * /api/cart/item/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       404:
 *         description: Cart or item not found
 */
router.delete('/item/:itemId', [
  param('itemId')
    .isMongoId()
    .withMessage('Invalid item ID format')
], validationHandler, cartController.removeItem);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Cart not found
 */
router.delete('/clear', cartController.clearCart);

module.exports = router;
