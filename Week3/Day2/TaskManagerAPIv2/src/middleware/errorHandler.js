// Handle MongoDB cast errors
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return {
        success: false,
        message,
        statusCode: 400
    };
};

// Handle MongoDB duplicate key errors
const handleDuplicateKeyErrorDB = (err) => {
    const value = err.keyValue ? Object.values(err.keyValue)[0] : 'duplicate value';
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return {
        success: false,
        message,
        statusCode: 400
    };
};

// Handle MongoDB validation errors
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return {
        success: false,
        message,
        statusCode: 400
    };
};

// Handle JWT errors
const handleJWTError = () => {
    return {
        success: false,
        message: 'Invalid token. Please log in again!',
        statusCode: 401
    };
};

const handleJWTExpiredError = () => {
    return {
        success: false,
        message: 'Your token has expired! Please log in again.',
        statusCode: 401
    };
};

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        error = handleCastErrorDB(error);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        error = handleDuplicateKeyErrorDB(error);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        error = handleValidationErrorDB(error);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = handleJWTError();
    }

    if (err.name === 'TokenExpiredError') {
        error = handleJWTExpiredError();
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
