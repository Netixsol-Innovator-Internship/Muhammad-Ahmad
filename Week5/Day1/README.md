# Real-Time Comment System

A modern real-time comment system built with Next.js and NestJS, featuring WebSocket communication for instant messaging.

## 🚀 Features

### Frontend (Next.js + TailwindCSS)
- **Modern UI**: Clean, responsive design with TailwindCSS
- **Real-time Communication**: Instant comment updates via Socket.io
- **Input Validation**: Comprehensive client-side validation
- **Error Handling**: Graceful error handling with toast notifications
- **Connection Status**: Real-time connection status indicator
- **Auto-scroll**: Automatic scrolling to new comments
- **Loading States**: Visual feedback during comment submission
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines
- **Character Limits**: Username (30 chars) and comment (500 chars) validation

### Backend (NestJS + Socket.io)
- **WebSocket Gateway**: Efficient real-time communication
- **Input Validation**: Server-side validation and sanitization
- **Error Handling**: Comprehensive error handling and logging
- **CORS Configuration**: Proper CORS setup for development
- **Connection Management**: Client connection/disconnection logging

## 🛠️ Technology Stack

**Frontend:**
- Next.js 15.5.0 (React 19.1.0)
- TailwindCSS 4
- Socket.io-client 4.8.1
- React Hot Toast 2.6.0
- TypeScript 5

**Backend:**
- NestJS 11.0.1
- Socket.io 4.8.1
- TypeScript
- RxJS

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Quick Setup
```bash
# Clone and setup the project
npm run setup:env     # Creates environment files
npm run install:all   # Installs all dependencies
```

### 2. Manual Setup

**Install Dependencies:**
```bash
# Root dependencies
npm install

# Client dependencies
cd client && npm install

# Server dependencies  
cd ../server && npm install
```

**Environment Variables:**
Copy the example files and update them:
```bash
# Client
cp client/.env.example client/.env.local

# Server  
cp server/.env.example server/.env
```

### 3. Start Development Servers

**Option 1 - Both servers at once:**
```bash
npm run dev
```

**Option 2 - Individual servers:**
```bash
# Start Backend (Terminal 1)
cd server && npm run start:dev

# Start Frontend (Terminal 2)  
cd client && npm run dev
```

### 4. Open Application
Navigate to `http://localhost:3000` in your browser.

## 🔧 Configuration

### Environment Variables

**Client (.env.local):**
```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:3001  # Development
# NEXT_PUBLIC_SERVER_URL=https://your-server-url.vercel.app  # Production
```

**Server (.env):**
```bash
PORT=3001  # Development port
CLIENT_URL=http://localhost:3000  # Development  
# CLIENT_URL=https://your-client-url.vercel.app  # Production
```

### Production URLs
- Client: `https://ahmad-week5-day1-client.vercel.app`
- Server: `https://ahmad-week5-day1-server.vercel.app`

> **Note**: Update environment variables with your actual production URLs when deploying.

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Quick Deployment Summary:

1. **Push to GitHub**
2. **Deploy Server to Vercel/Railway:**
   - Set `CLIENT_URL` environment variable
3. **Deploy Client to Vercel:**
   - Set `NEXT_PUBLIC_SERVER_URL` environment variable
4. **Update CORS settings and redeploy**

### Recommended Platforms:
- **Client**: Vercel (excellent Next.js support)
- **Server**: Railway or Render (better WebSocket support)

> ⚠️ **WebSocket Note**: Vercel has limitations with WebSockets. For production, consider Railway or Render for the backend.

## 🎯 Usage

1. **Enter Username**: Optional, defaults to "Anonymous"
2. **Type Comment**: Enter your message (max 500 characters)
3. **Send**: Click "Send Comment" or press Enter
4. **Real-time Updates**: See comments from other users instantly

## ✨ Enhancements Made

### UI/UX Improvements
- ✅ Replaced inline styles with TailwindCSS classes
- ✅ Added modern gradient background and card-based layout
- ✅ Implemented responsive design
- ✅ Added user avatars with initials
- ✅ Improved typography and spacing
- ✅ Added connection status indicator
- ✅ Loading states and disabled states for better UX

### Validation & Error Handling
- ✅ Client-side input validation
- ✅ Server-side validation and sanitization
- ✅ Character limits for username and comments
- ✅ Empty message prevention
- ✅ Real-time error feedback
- ✅ Toast notifications for system events

### Code Quality
- ✅ Fixed TypeScript issues in layout.tsx
- ✅ Implemented proper ErrorBoundary component
- ✅ Added connection management
- ✅ Improved socket error handling
- ✅ Added logging and debugging
- ✅ Better code organization and comments

### Performance & Reliability
- ✅ Connection timeout and retry logic
- ✅ Auto-scroll to new comments
- ✅ Optimized re-renders
- ✅ Memory leak prevention
- ✅ Proper cleanup in useEffect

## 🐛 Issues Fixed

1. **Layout.tsx**: Removed unused `Metadata` import from client component
2. **Styling**: Replaced all inline styles with TailwindCSS
3. **ErrorBoundary**: Implemented proper error boundary component
4. **Validation**: Added comprehensive input validation
5. **Socket Management**: Improved connection handling and cleanup
6. **Type Safety**: Enhanced TypeScript types and interfaces

## 🚀 Future Improvements

- [ ] User authentication
- [ ] Message persistence (database)
- [ ] Message reactions/likes
- [ ] File/image sharing
- [ ] Message editing/deletion
- [ ] Private messaging
- [ ] Room-based chat
- [ ] Message search functionality
- [ ] Dark mode support
- [ ] Emoji picker

## 📝 Scripts

**Client:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Server:**
- `npm run start:dev` - Start development server with watch mode
- `npm run start` - Start production server
- `npm run build` - Build the application
- `npm run test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes.
