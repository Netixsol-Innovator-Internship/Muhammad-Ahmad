const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const validationHandler = require('../middleware/validationHandler');
const { adminAccess, superAdminAccess, userManagement } = require('../middleware');

// Import controllers
const adminUserController = require('../controllers/adminUserController');
const adminProductController = require('../controllers/adminProductController');

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *           description: User role
 *         isBlocked:
 *           type: boolean
 *           description: Whether user is blocked
 *         blockedAt:
 *           type: string
 *           format: date
 *           description: When user was blocked
 *         blockedBy:
 *           type: string
 *           description: ID of admin who blocked user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: User creation date
 */

// =============================================================================
// USER MANAGEMENT ROUTES
// =============================================================================

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users with pagination and filtering
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *         description: Filter by role
 *       - in: query
 *         name: isBlocked
 *         schema:
 *           type: boolean
 *         description: Filter by blocked status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       403:
 *         description: Access denied
 */
router.get('/users', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('role').optional().isIn(['user', 'admin', 'superAdmin']).withMessage('Invalid role'),
  query('isBlocked').optional().isBoolean().withMessage('isBlocked must be a boolean')
], validationHandler, adminAccess(), adminUserController.getUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/users/:id', [
  param('id').isMongoId().withMessage('Invalid user ID')
], validationHandler, adminAccess(), adminUserController.getUserById);

/**
 * @swagger
 * /api/admin/users/{id}/role:
 *   put:
 *     summary: Change user role
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin, superAdmin]
 *                 description: New role for user
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role or permission denied
 *       404:
 *         description: User not found
 */
router.put('/users/:id/role', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('role').isIn(['user', 'admin', 'superAdmin']).withMessage('Role must be user, admin, or superAdmin')
], validationHandler, userManagement(), adminUserController.changeUserRole);

/**
 * @swagger
 * /api/admin/users/{id}/block:
 *   put:
 *     summary: Block or unblock user
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isBlocked
 *             properties:
 *               isBlocked:
 *                 type: boolean
 *                 description: Whether to block or unblock user
 *               reason:
 *                 type: string
 *                 description: Reason for blocking (optional)
 *     responses:
 *       200:
 *         description: User block status updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 */
router.put('/users/:id/block', [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('isBlocked').isBoolean().withMessage('isBlocked must be a boolean'),
  body('reason').optional().isString().isLength({ max: 500 }).withMessage('Reason must be a string with max 500 characters')
], validationHandler, userManagement(), adminUserController.blockUser);

// =============================================================================
// PRODUCT MANAGEMENT ROUTES (Admin-specific)
// =============================================================================

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     summary: Get all products for admin management
 *     tags: [Admin - Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name or description
 *       - in: query
 *         name: collection
 *         schema:
 *           type: string
 *         description: Filter by collection
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, stock, createdAt]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get('/products', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sortBy').optional().isIn(['name', 'price', 'stock', 'createdAt']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
], validationHandler, adminAccess(), adminProductController.getProducts);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     summary: Update product (Admin can update title/price, SuperAdmin can update all)
 *     tags: [Admin - Products]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name/title
 *               price:
 *                 type: number
 *                 description: Product price
 *               description:
 *                 type: string
 *                 description: Product description (SuperAdmin only)
 *               stock:
 *                 type: number
 *                 description: Product stock (SuperAdmin only)
 *               weight:
 *                 type: string
 *                 description: Product weight (SuperAdmin only)
 *               collection:
 *                 type: string
 *                 description: Product collection (SuperAdmin only)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Permission denied for specific fields
 *       404:
 *         description: Product not found
 */
router.put('/products/:id', [
  param('id').isMongoId().withMessage('Invalid product ID'),
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().isString(),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('weight').optional().isString(),
  body('collection').optional().isString()
], validationHandler, adminAccess(), adminProductController.updateProduct);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     summary: Delete product (SuperAdmin only)
 *     tags: [Admin - Products]
 *     security:
 *       - bearerAuth: []
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
 *       403:
 *         description: SuperAdmin access required
 *       404:
 *         description: Product not found
 */
router.delete('/products/:id', [
  param('id').isMongoId().withMessage('Invalid product ID')
], validationHandler, superAdminAccess(), adminProductController.deleteProduct);

// =============================================================================
// DASHBOARD & STATISTICS ROUTES
// =============================================================================

/**
 * @swagger
 * /api/admin/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Admin - Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 */
router.get('/dashboard/stats', adminAccess(), adminUserController.getDashboardStats);

module.exports = router;
