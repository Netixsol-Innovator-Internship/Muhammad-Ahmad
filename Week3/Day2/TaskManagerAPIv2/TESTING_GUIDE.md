# 🧪 Quick Testing Guide - Task Manager API v2

## 🚀 Quick Start Testing

### 1. Access API Documentation
```
http://localhost:3000/api-docs
```

### 2. Test Sequence (Using Swagger UI)

#### Step 1: Register User
```json
POST /api/users/register
{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "Test123456"
}
```

#### Step 2: Login
```json
POST /api/users/login
{
    "email": "test@example.com",
    "password": "Test123456"
}
```
**Copy the `token` from response!**

#### Step 3: Authorize in Swagger
- Click "Authorize" button (🔒)
- Enter: `Bearer YOUR_TOKEN_HERE`
- Click "Authorize"

#### Step 4: Test Protected Endpoints
```json
GET /api/users/me
POST /api/tasks
{
    "title": "My First Task",
    "description": "Testing the API",
    "priority": "high"
}
```

## 🔥 Power Features to Test

### ✅ Task Filtering
```
GET /api/tasks?completed=false&priority=high&page=1&limit=5
```

### ✅ Input Validation
Try invalid data:
```json
POST /api/tasks
{
    "title": "",  // Should fail - empty title
    "priority": "invalid"  // Should fail - invalid priority
}
```

### ✅ Rate Limiting
Make 6+ login requests quickly - should get rate limited!

## 📊 All Available Endpoints

### 🔐 Authentication (No Auth Required)
- `POST /api/users/register` - Register
- `POST /api/users/login` - Login  
- `GET /health` - Health check

### 👤 User (Auth Required)
- `GET /api/users/me` - Get profile

### 📝 Tasks (Auth Required)
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎯 Testing Checklist

- [ ] Register new user
- [ ] Login and get JWT token
- [ ] Access protected endpoints
- [ ] Create tasks
- [ ] Update tasks
- [ ] Delete tasks
- [ ] Test filtering & pagination
- [ ] Test validation errors
- [ ] Test rate limiting
- [ ] Test unauthorized access

## 🚨 Expected Validations

### User Registration
- Name: 2-50 characters
- Email: Valid email format
- Password: Min 6 chars, must contain uppercase, lowercase, and number

### Task Creation
- Title: Required, max 100 characters
- Description: Optional, max 500 characters
- Priority: Optional, must be 'low', 'medium', or 'high'
- Due Date: Optional, must be future date

## 🏆 Success! 
If all tests pass, your Task Manager API v2 is production-ready! 🎉
