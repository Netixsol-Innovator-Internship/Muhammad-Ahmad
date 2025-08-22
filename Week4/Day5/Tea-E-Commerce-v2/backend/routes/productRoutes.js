const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/productController');
const validationHandler = require('../middleware/validationHandler');
const { productManagement } = require('../middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The product name
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           description: Product price
 *         weight:
 *           type: string
 *           description: Product weight
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         collection:
 *           type: string
 *           description: Tea collection type
 *         origin:
 *           type: string
 *           description: Origin country/region
 *         flavours:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of flavour tags
 *         quality:
 *           type: string
 *           description: Quality grade
 *         caffeine:
 *           type: string
 *           description: Caffeine level
 *         stock:
 *           type: number
 *           description: Available stock quantity
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Creation date
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with filtering and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: Number of items per page
 *       - in: query
 *         name: collection
 *         schema:
 *           type: string
 *         description: Filter by tea collection
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         description: Filter by origin
 *       - in: query
 *         name: quality
 *         schema:
 *           type: string
 *         description: Filter by quality
 *       - in: query
 *         name: caffeine
 *         schema:
 *           type: string
 *         description: Filter by caffeine level
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     pagination:
 *                       type: object
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number')
], validationHandler, productController.getProducts);

/**
 * @swagger
 * /api/products/filters:
 *   get:
 *     summary: Get available filter options
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Available filter options
 */
router.get('/filters', productController.getFilterOptions);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid product ID')
], validationHandler, productController.getProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', [
  body('name').notEmpty().withMessage('Product name is required').isLength({ max: 100 }).withMessage('Name too long'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Description too long'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('weight').optional().isString(),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('collection').optional().isString(),
  body('origin').optional().isString(),
  body('flavours').optional().isArray().withMessage('Flavours must be an array'),
  body('quality').optional().isString(),
  body('caffeine').optional().isString(),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], validationHandler, productManagement('create'), productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid product ID'),
  body('name').optional().notEmpty().withMessage('Product name cannot be empty').isLength({ max: 100 }).withMessage('Name too long'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Description too long'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('weight').optional().isString(),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('collection').optional().isString(),
  body('origin').optional().isString(),
  body('flavours').optional().isArray().withMessage('Flavours must be an array'),
  body('quality').optional().isString(),
  body('caffeine').optional().isString(),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], validationHandler, productManagement('update'), productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid product ID')
], validationHandler, productManagement('delete'), productController.deleteProduct);

module.exports = router;
