const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const { requireAdmin } = require('../middleware/roleAuth');
const validationHandler = require('../middleware/validationHandler');
const adminUserController = require('../controllers/adminUserController');

// All admin routes require authentication and admin role
router.use(auth);
router.use(requireAdmin);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       403:
 *         description: Insufficient permissions
 */
router.get('/users', adminUserController.getAllUsers);

/**
 * @swagger
 * /api/admin/users/{userId}/role:
 *   put:
 *     summary: Update user role (Admin/SuperAdmin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin, superAdmin]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: User not found
 */
router.put('/users/:userId/role', [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID'),
  body('role')
    .isIn(['user', 'admin', 'superAdmin'])
    .withMessage('Role must be user, admin, or superAdmin')
], validationHandler, adminUserController.updateUserRole);

/**
 * @swagger
 * /api/admin/users/{userId}/block:
 *   put:
 *     summary: Block/Unblock user (Admin/SuperAdmin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User block status updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: User not found
 */
router.put('/users/:userId/block', [
  param('userId')
    .isMongoId()
    .withMessage('Invalid user ID')
], validationHandler, adminUserController.toggleUserBlock);

module.exports = router;
