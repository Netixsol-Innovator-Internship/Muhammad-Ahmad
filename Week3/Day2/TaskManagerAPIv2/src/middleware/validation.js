const { body } = require('express-validator');

// User validation rules
const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one letter and one number')
];

const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Task validation rules
const validateCreateTask = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Task title is required')
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters'),
    
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot be more than 500 characters'),
    
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date in ISO format')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('Due date cannot be in the past');
            }
            return true;
        })
];

const validateUpdateTask = [
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Task title cannot be empty')
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters'),
    
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot be more than 500 characters'),
    
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),
    
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date in ISO format')
];

module.exports = {
    validateRegister,
    validateLogin,
    validateCreateTask,
    validateUpdateTask
};
