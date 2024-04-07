import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import exampleRoutes from './routes/exampleRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();
const app = express();

// Middleware
app.use(cors(), bodyParser.json());

// Routes
app.use('/api', exampleRoutes);

// Error handling middleware
app.use(errorMiddleware);

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
