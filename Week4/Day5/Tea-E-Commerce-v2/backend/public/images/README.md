This folder is the canonical location for media served by the backend at /images/*.

How to migrate images from the frontend:

1. Copy product images:
   - frontend/public/images/products/* -> backend/public/images/products/

2. Copy collection images:
   - frontend/public/images/collections/* -> backend/public/images/collections/

3. Copy icon and placeholder images if you want the backend to serve them too:
   - frontend/public/images/icons/* -> backend/public/images/icons/
   - frontend/public/images/placeholders/* -> backend/public/images/placeholders/

Notes:
- The server serves /images/ from backend/public/images first, then falls back to frontend/public/images.
- Ensure the same relative paths are preserved (e.g., /images/products/product-1.jpg).
- You can add a CI or npm script to sync assets automatically if desired.
