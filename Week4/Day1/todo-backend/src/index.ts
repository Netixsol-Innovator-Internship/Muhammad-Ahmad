import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
