const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const { requireAdmin } = require('../middleware/roleAuth');
const validationHandler = require('../middleware/validationHandler');
const adminUserController = require('../controllers/adminUserController');
const { uploadMultiple, handleUploadError } = require('../middleware/upload');

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

/**
 * @swagger
 * /api/admin/upload/images:
 *   post:
 *     summary: Upload product images (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: Invalid file format or size
 */
router.post('/upload/images', uploadMultiple, handleUploadError, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images provided'
      });
    }

    // With Cloudinary, the URLs are available in req.files[].path
    const imageUrls = req.files.map(file => file.path);

    res.json({
      success: true,
      message: 'Images uploaded successfully to Cloudinary',
      data: {
        images: imageUrls
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images'
    });
  }
});

module.exports = router;
