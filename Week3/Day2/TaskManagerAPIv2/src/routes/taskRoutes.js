const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const { validateCreateTask, validateUpdateTask } = require('../middleware/validation');
const validateRequest = require('../middleware/validateRequest');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           maxLength: 100
 *           description: The title of the task
 *         description:
 *           type: string
 *           maxLength: 500
 *           description: The description of the task
 *         completed:
 *           type: boolean
 *           default: false
 *           description: Whether the task is completed
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           default: medium
 *           description: The priority level of the task
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the task
 *         user:
 *           type: string
 *           description: The ID of the user who owns the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the task was last updated
 *       example:
 *         _id: 60d0fe4f5311236168a109cb
 *         title: Complete project documentation
 *         description: Write comprehensive documentation for the task manager API
 *         completed: false
 *         priority: high
 *         dueDate: 2023-12-31T23:59:59.000Z
 *         user: 60d0fe4f5311236168a109ca
 *         createdAt: 2021-06-21T09:10:30.000Z
 *         updatedAt: 2021-06-21T09:10:30.000Z
 *
 *     TaskResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             task:
 *               $ref: '#/components/schemas/Task'
 *         message:
 *           type: string
 *
 *     TasksResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             tasks:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             pagination:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter by priority level
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TasksResponse'
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 example: Complete project documentation
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: Write comprehensive documentation for the task manager API
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 default: medium
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-12-31T23:59:59.000Z
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.route('/')
    .get(getTasks)
    .post(validateCreateTask, validateRequest, createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 example: Updated task title
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: Updated task description
 *               completed:
 *                 type: boolean
 *                 example: true
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-12-31T23:59:59.000Z
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
    .get(getTask)
    .put(validateUpdateTask, validateRequest, updateTask)
    .delete(deleteTask);

module.exports = router;
