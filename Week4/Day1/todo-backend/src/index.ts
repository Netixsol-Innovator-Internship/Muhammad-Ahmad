import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    /\.vercel\.app$/  // Allow any Vercel subdomain
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend API is running!', timestamp: new Date().toISOString() });
});

app.use('/api/tasks', tasksRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
