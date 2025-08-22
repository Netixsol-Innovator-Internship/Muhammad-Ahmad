# Tea App Admin Dashboard Implementation Plan

## Current State Analysis

**Backend:**
- Basic JWT authentication with User model (name, email, password, createdAt)
- Product CRUD operations with comments indicating future admin functionality
- MongoDB with Mongoose
- Express.js REST API

**Frontend:**
- React with Vite
- Context API for state management (Auth, Cart, Toast)
- Axios for HTTP requests
- React Router for navigation
- Tailwind CSS for styling

## Implementation Plan

### Phase 1: Backend Role System Foundation 🔧

**1.1 Update User Model**
- Add `role` field (enum: 'user', 'admin', 'superAdmin', default: 'user')
- Add `isBlocked` field (boolean, default: false)
- Update user responses to include role

**1.2 Create Role-Based Middleware**
- Create `roleAuth.js` middleware for checking user roles
- Create `blockCheck.js` middleware to prevent blocked users from accessing protected routes

**1.3 Update Authentication Controller**
- Modify login to check if user is blocked
- Include role in JWT payload and responses
- Add profile update functionality

**1.4 Create Admin Controllers**
- `adminUserController.js` - User management (view all, change roles, block/unblock)
- Update `productController.js` with role-based permissions

**1.5 Add Admin Routes**
- `/api/admin/users` - User management endpoints
- Update product routes with role-based protection

### Phase 2: Frontend RTK Query Integration ⚡

**2.1 Setup RTK Query**
- Install `@reduxjs/toolkit` and `react-redux`
- Create Redux store with RTK Query API slices
- Create API slices for: auth, products, cart, admin

**2.2 Replace Axios with RTK Query**
- Replace all Axios calls in services/api.js
- Update contexts to use RTK Query hooks
- Implement caching and automatic refetching

### Phase 3: Admin Dashboard UI 🎨

**3.1 Admin Layout & Navigation**
- Create `AdminLayout.jsx` component
- Add admin navigation sidebar
- Create protected admin routes

**3.2 Product Management**
- `AdminProducts.jsx` - Product listing with edit/delete actions
- `ProductForm.jsx` - Add/Edit product form
- Role-based button visibility (only superAdmin sees delete)

**3.3 User Management**
- `AdminUsers.jsx` - User listing with role change and block/unblock
- Role change logic based on current admin level
- Block/unblock functionality

### Phase 4: Role-Based Routing & Access Control 🛡️

**4.1 Enhanced Route Protection**
- Create `AdminRoute.jsx` component for admin-only routes
- Update `ProtectedRoute.jsx` to handle blocked users

**4.2 Login Redirect Logic**
- Update login success to redirect based on role:
  - `user` → Main app (`/`)
  - `admin/superAdmin` → Admin dashboard (`/admin`)

**4.3 Navigation Updates**
- Add admin panel link in header for admin users
- Hide/show navigation items based on role

## Requirements Summary

### 1. Admin Dashboard
- **Product Management**: View all products, Add new products, Edit title and price
- **User Management**: View all users, Change user roles, Block/Unblock users
- **Role-Based Permissions**: user, admin, superAdmin hierarchy

### 2. Role Management Rules
- **Admin can**: Change role of users only, Cannot change roles of other admins or superAdmins
- **SuperAdmin can**: Change role of users and admins, Only superAdmins can assign/demote admin or superAdmin

### 3. Product Management Rules
- **Admin**: Update title and price only
- **Super Admin**: Update title, price, and delete products

### 4. RTK Query Integration
- Replace all Axios/Fetch calls with RTK Query
- Implement caching and automatic updates
- Focus on product listing and admin dashboard

### 5. Role-Based Login Redirect
- **admin/superAdmin** → Admin Dashboard
- **user** → Main Tea App interface
- **Blocked users** → Cannot sign in

## Technical Implementation Details

### User Model Updates
```javascript
role: {
  type: String,
  enum: ['user', 'admin', 'superAdmin'],
  default: 'user'
},
isBlocked: {
  type: Boolean,
  default: false
}
```

### JWT Payload Updates
```javascript
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};
```

### Role-Based Middleware
```javascript
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};
```

## Estimated Timeline
- **Phase 1**: 2-3 hours (Backend Role System)
- **Phase 2**: 1-2 hours (RTK Query Setup)
- **Phase 3**: 3-4 hours (Admin Dashboard UI)
- **Phase 4**: 2-3 hours (Role-Based Features)

**Total**: 8-12 hours

## Success Criteria
✅ Three-tier role system (user, admin, superAdmin)  
✅ Admin dashboard with product and user management  
✅ Role-based permissions and restrictions  
✅ RTK Query integration for data fetching  
✅ Smart login redirects based on role  
✅ User blocking/unblocking functionality  
✅ Product CRUD with role-based restrictions  

## Notes
- This is a practice project - focus on functionality over production-grade code
- Keep implementation simple and straightforward
- Test each phase before moving to the next
- Fresh database - no existing data to migrate
