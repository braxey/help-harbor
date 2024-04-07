import dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './db';
import bodyParser from 'body-parser';
import cors from 'cors';
import exampleRoutes from './routes/exampleRoutes';
import userRoutes from './routes/user';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();
const app = express();

// Middleware
app.use(cors(), bodyParser.json());

// Routes
app.use('/api', exampleRoutes);
app.use('/user', userRoutes);

// Error handling middleware
app.use(errorMiddleware);

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToDatabase();
});
