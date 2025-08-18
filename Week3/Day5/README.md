# Week 03 - Day 5

## E-Commerce Tea Website

This project is a full-stack e-commerce platform for tea products, featuring a robust backend API and a modern frontend web application.

---

### 1. Backend
**Task Summary:**
Develop a RESTful API to manage products, collections, users, carts, and orders for an online tea store.

**Implementation Details:**
- Built with Node.js, Express, and MongoDB (Mongoose).
- Provides endpoints for:
	- Product and collection CRUD operations
	- User registration, login, and authentication (JWT)
	- Cart management and order processing
- Middleware for CORS, JSON parsing, and error handling.
- Serves product images from the backend for consistent asset delivery.
- Uses environment variables for secure configuration.
- Organized codebase with controllers, models, routes, and middleware.
- API documentation and deployment-ready structure.

#### Live Preview:
**Preview**: [ahmad-week3-day5-frontend.vercel.app](https://ahmad-week3-day5-frontend.vercel.app/)

---

### 2. Frontend
**Task Summary:**
Create a user-friendly web app for browsing, searching, and purchasing tea products.

**Implementation Details:**
- Built with React and Vite for fast development and performance.
- Features:
	- Product listing, filtering, and detailed views
	- Collections page for curated product groups
	- Shopping cart and checkout flow
	- User authentication (login/register) and profile management
	- Order confirmation and history
	- About and Contact pages
- Uses React Router for navigation and context providers for authentication, cart, and notifications.
- Responsive design with Tailwind CSS for mobile and desktop support.
- Communicates with backend API for real-time data and user actions.
- Deployed and ready for production use.

#### Live Preview:
**Preview**: [ahmad-week3-day5-backend.vercel.app](https://ahmad-week3-day5-backend.vercel.app/)