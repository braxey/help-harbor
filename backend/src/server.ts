// dependencies
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { env } from './helpers';
import { createSession } from './session';
import { connectToDatabase } from './db';

// routes
import exampleRoutes from './routes/exampleRoutes';
import authenticationRoutes from './routes/authentication';

// error handler
import errorMiddleware from './middlewares/errorMiddleware';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: './.env.testing'})
} else {
    dotenv.config();
}

const app = express();

const corsOptions = {
    origin: env('FRONTEND_URL', 'http://localhost:3000'),
    credentials: true, // allow cookies to be sent with requests
};

app.use(cors(corsOptions), bodyParser.json(), createSession());

// routes
app.use('/api', exampleRoutes);
app.use('/authentication', authenticationRoutes);

// error handler
app.use(errorMiddleware);

const port = env('APP_PORT', 5000);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    if (process.env.NODE_ENV !== 'test') {
        connectToDatabase();
    }
});

export { app, server };
