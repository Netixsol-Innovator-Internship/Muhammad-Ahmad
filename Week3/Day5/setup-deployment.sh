#!/bin/bash

# Deployment Setup Script for TeaBliss
# This script helps set up environment variables for Vercel deployment

echo "=== TeaBliss Deployment Setup ==="
echo ""

echo "Step 1: Backend Environment Variables"
echo "Set these in your Vercel backend project:"
echo ""
echo "MONGO_URI=your_mongodb_atlas_connection_string"
echo "JWT_SECRET=your_secure_jwt_secret"
echo "PORT=5000"
echo "FRONTEND_URL=https://your-frontend-domain.vercel.app"
echo ""

echo "Step 2: Frontend Environment Variables" 
echo "Set these in your Vercel frontend project:"
echo ""
echo "VITE_API_URL=https://your-backend-domain.vercel.app/api"
echo ""

echo "Step 3: Deployment Order"
echo "1. Deploy backend first"
echo "2. Note the backend URL"
echo "3. Update VITE_API_URL with backend URL"
echo "4. Update FRONTEND_URL in backend with frontend URL"
echo "5. Deploy frontend"
echo "6. Redeploy backend with correct FRONTEND_URL"
echo ""

echo "Step 4: Testing"
echo "1. Visit your frontend URL"
echo "2. Check browser console for errors"
echo "3. Test collections page"
echo "4. Verify no CORS errors"
echo ""

echo "For detailed instructions, see DEPLOY.md"
