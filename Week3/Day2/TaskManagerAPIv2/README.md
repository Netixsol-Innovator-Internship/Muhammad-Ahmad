# Week 03 - Day 02

RESTful API for task management with MongoDB integration, JWT authentication, input validation, and comprehensive documentation.

## Features

- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **JWT Authentication**: Secure user authentication and authorization
- **Input Validation**: Comprehensive request validation using express-validator
- **User Isolation**: Users can only access their own tasks
- **Advanced Task Management**: Priority levels, due dates, filtering, and pagination
- **Rate Limiting**: Protection against abuse and spam
- **Security**: Helmet.js for security headers, CORS support
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Error Handling**: Comprehensive error handling with detailed responses

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: express-validator
- **Documentation**: swagger-ui-express + swagger-jsdoc
- **Security**: helmet, cors, express-rate-limit
- **Environment**: dotenv

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TaskManagerAPIv2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string in `.env`
   - Set your JWT secret key

4. **Start the server**
   ```bash
   npm run dev  # Development with nodemon
   # or
   node server.js  # Production
   ```

5. **Access the API**
   - Server: `http://localhost:3000`
   - Documentation: `http://localhost:3000/api-docs`

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | ❌ |
| POST | `/api/users/login` | Login user | ❌ |
| GET | `/api/users/me` | Get user profile | ✅ |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| GET | `/api/tasks/:id` | Get specific task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

### Utility
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Welcome message | ❌ |
| GET | `/health` | Health check | ❌ |
| GET | `/api-docs` | API documentation | ❌ |

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

## Task Properties

| Field | Type | Required | Options | Description |
|-------|------|----------|---------|-------------|
| title | String | ✅ | max 100 chars | Task title |
| description | String | ❌ | max 500 chars | Task description |
| completed | Boolean | ❌ | true/false | Completion status |
| priority | String | ❌ | low/medium/high | Priority level |
| dueDate | Date | ❌ | ISO 8601 format | Due date |

## Testing

### Using Swagger UI
1. Visit `http://localhost:3000/api-docs`
2. Register a new user
3. Login to get JWT token
4. Click "Authorize" and enter: `Bearer <your-token>`
5. Test all endpoints interactively

### Using Postman
1. Import `TaskManager-v2.postman_collection.json`
2. Update base URL if needed
3. Run the authentication requests first
4. The collection automatically sets auth tokens

### Testing Checklist
- ✅ Register a user
- ✅ Login and get JWT
- ✅ Access protected routes with JWT
- ✅ Test CRUD functionality for tasks
- ✅ Send invalid data to check validation errors
- ✅ Test filtering and pagination
- ✅ Test rate limiting

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

## Error Handling

The API handles various error scenarios:
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid/missing token)
- **404**: Not Found (resource doesn't exist)
- **429**: Too Many Requests (rate limit exceeded)
- **500**: Internal Server Error

## 🌐 Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
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
---

### Create a New Task
**Request:**
```
POST /api/tasks
Content-Type: application/json
{
	"title": "Buy groceries",
	"completed": false
}
```
**Response:**
```json
{
	"success": true,
	"data": { "id": 3, "title": "Buy groceries", "completed": false },
	"message": "Task created successfully"
}
```

### Update a Task
**Request:**
```
PUT /api/tasks/1
Content-Type: application/json
{
	"title": "Learn Node.js and Express",
	"completed": true
}
```
**Response:**
```json
{
	"success": true,
	"data": { "id": 1, "title": "Learn Node.js and Express", "completed": true },
	"message": "Task updated successfully"
}
```

### Delete a Task
**Request:**
```
DELETE /api/tasks/1
```
**Response:**
```json
{
	"success": true,
	"data": { "id": 1, "title": "Learn Node.js", "completed": false },
	"message": "Task deleted successfuly"
}
```

## Live Preview:
Preview: [ahmad-week3-day2-api-docs.vercel.app](https://ahmad-week3-day2-api-docs.vercel.app/)
