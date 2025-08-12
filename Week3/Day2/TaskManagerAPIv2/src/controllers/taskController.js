const Task = require('../models/Task');

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10, completed, priority } = req.query;
        
        // Build query
        const query = { user: req.user.id };
        
        if (completed !== undefined) {
            query.completed = completed === 'true';
        }
        
        if (priority) {
            query.priority = priority;
        }

        // Execute query with pagination
        const tasks = await Task.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Task.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                tasks,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            },
            message: 'Tasks retrieved successfully'
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve tasks'
        });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { task },
            message: 'Task retrieved successfully'
        });
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve task'
        });
    }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            data: { task },
            message: 'Task created successfully'
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create task'
        });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const { title, description, completed, priority, dueDate } = req.body;

        let task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed, priority, dueDate },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: { task },
            message: 'Task updated successfully'
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update task'
        });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: { task },
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete task'
        });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};
