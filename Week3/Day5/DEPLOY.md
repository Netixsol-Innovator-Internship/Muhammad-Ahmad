Deployment guide — Vercel / Render / Railway
===========================================

This project has a separate `frontend` (Vite + React) and `backend` (Express + Mongoose). You can deploy frontend and backend to different providers. This guide explains recommended settings for Vercel, Render, and Railway and how to prepare the repo for deployment.

Summary
- Frontend: `frontend/` — build command `npm run build`, publish directory `dist`
- Backend: `backend/` — start command `npm start` (or `npm run dev` for dev). Exposes API under `/api` and serves media under `/images`.

Required environment variables (backend)
- `MONGO_URI` — MongoDB connection string (Atlas etc.)
- `JWT_SECRET` — secret for signing JWTs
- `NODE_ENV` — `production` in production
- `PORT` — optional (platforms usually provide one)
- `FRONTEND_URL` — URL of your deployed frontend (used by CORS)
- Optional for seeding: `BACKEND_URL` — public backend base URL, used by `scripts/seedProducts.js` to construct absolute image URLs

Frontend env (client)
- Set `VITE_API_URL` to your backend base URL (for example `https://api.example.com/api`). The frontend uses `import.meta.env.VITE_API_URL`.

Seeding products (so they point to backend images)
-----------------------------------------------
To seed the DB with products that point to your backend-hosted images, run the seed script with `BACKEND_URL` set to your backend base URL.

Example (local):
```cmd
cd backend
set "BACKEND_URL=http://localhost:5000"
npm run seed
```

Quick checklist before deploying
---------------------------------
1. Add production environment variables to your chosen platform.
2. Copy assets into `backend/public/images` or use a cloud storage path.
3. Seed the DB (optional) with `BACKEND_URL` set to the backend URL so stored image URLs are absolute.
4. Deploy backend, get its public URL, set `VITE_API_URL` in the frontend project, and deploy frontend.

Fixing CORS Issues
------------------
If you encounter CORS errors after deployment:

1. **Backend CORS Configuration**: Ensure your backend allows your frontend domain. The backend is configured to accept:
   - localhost (for development)
   - All Vercel domains (*.vercel.app)
   - Your specific frontend domain via FRONTEND_URL environment variable

2. **Environment Variables**: Set these in your Vercel dashboard:
   - Backend: `FRONTEND_URL=https://your-frontend-domain.vercel.app`
   - Frontend: `VITE_API_URL=https://your-backend-domain.vercel.app/api`

3. **Redeploy**: After updating environment variables, redeploy both frontend and backend.

Common Error: "Cross-Origin Request Blocked"
This happens when:
- Frontend URL is not added to backend CORS origins
- Environment variables are not set correctly
- API URLs are hardcoded to localhost
