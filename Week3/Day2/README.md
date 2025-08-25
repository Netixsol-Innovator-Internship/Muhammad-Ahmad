# Week 03 - Day 02

## 1. ResponsivePage
**Task Summary:**
Responsive hero section and navigation for a web page.

**Implementation Details:**
- Built with HTML, CSS (Tailwind), and JavaScript.
- Features a modern hero section, navigation bar, and dark mode toggle.
- Mobile-friendly and visually appealing layout.

### Live Preview:
**Preview**: [ahmad-week3-day2-landing-page.vercel.app](https://ahmad-week3-day2-landing-page.vercel.app/)

## 2. TaskManagerAPIv2
**Task Summary:**
RESTful API for task management with user authentication and MongoDB integration.

**Implementation Details:**
- Node.js, Express, MongoDB (Mongoose).
- JWT authentication, input validation, user isolation.
- Advanced task features: priority, due dates, filtering, pagination.
- Security: Helmet, CORS, rate limiting.
- Interactive API docs via Swagger.
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After login/register, include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Request Examples

### Register User
```json
POST /api/users/register
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password123"
}
```

### Login
```json
POST /api/users/login
{
    "email": "john@example.com",
    "password": "Password123"
}
```

### Create Task
```json
POST /api/tasks
Authorization: Bearer <token>
{
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "priority": "high",
    "dueDate": "2024-12-31T23:59:59.000Z"
}
```

### Get Tasks with Filtering
```
GET /api/tasks?completed=false&priority=high&page=1&limit=10
Authorization: Bearer <token>
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates all user inputs
- **Security Headers**: Helmet.js for security headers
- **CORS**: Cross-origin resource sharing
- **Error Handling**: No sensitive data in error responses

## Response Format

All API responses follow this consistent format:

```json
{
    "success": true/false,
    "data": {
        // Response data
    },
    "message": "Descriptive message",
    "errors": [
        // Validation errors (if any)
    ]
}
```

## Project Structure

```
src/
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── taskController.js    # Task management logic
├── models/
│   ├── User.js             # User schema
│   └── Task.js             # Task schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   └── taskRoutes.js       # Task endpoints
├── middleware/
│   ├── auth.js             # JWT verification
│   ├── validateRequest.js  # Request validation
│   ├── validation.js       # Validation rules
│   ├── errorHandler.js     # Error handling
│   └── rateLimiter.js      # Rate limiting
└── config/
    └── db.js               # Database connection
```
## Live Preview:
**Preview:** [ahmad-week3-day2-backend.vercel.app](https://ahmad-week3-day2-backend.vercel.app/api-docs)
