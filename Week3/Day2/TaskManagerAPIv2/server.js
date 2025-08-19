// Import required packages
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error(' Missing required environment variables:', missingVars.join(', '));
    console.error(' Please check your .env file');
}

// Import database connection
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');
const { generalLimiter, authLimiter } = require('./src/middleware/rateLimiter');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(generalLimiter);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API v2',
      version: '2.0.0',
      description: 'A robust Task Manager API with authentication, validation, and MongoDB integration.',
    },
    servers: [
      {
        url: 'https://ahmad-week3-day2-backend.vercel.app',
        description: 'Production server (Vercel)',
      },
      {
        url: `http://localhost:${port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './server.js'], // Path to route files for API documentation
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Task Manager API v2!',
    documentation: 'https://ahmad-week3-day2-backend.vercel.app/api-docs',
    status: 'Server is running perfectly! 🚀'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const mongoose = require('mongoose');
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: {
      connected: mongoose.connection.readyState === 1,
      status: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    }
  });
});

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// Mount routes
app.use('/api/users', authLimiter, authRoutes);
app.use('/api/tasks', taskRoutes);

// Global error handler
app.use(errorHandler);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API Documentation: https://ahmad-week3-day2-backend.vercel.app/api-docs`);
});

module.exports = app;
