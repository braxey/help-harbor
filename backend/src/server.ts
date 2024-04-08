// dependencies
import dotenv from 'dotenv';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';

// database connection
import { connectToDatabase } from './db';

// routes
import exampleRoutes from './routes/exampleRoutes';
import userRoutes from './routes/user';
import authenticationRoutes from './routes/authentication';

// error handler
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();
const app = express();

declare module "express-session" {
    interface SessionData {
        email: string;
        isLoggedIn: boolean;
    }
}

app.use(cors(), bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    genid: (request) => uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE) : undefined,
        secure: process.env.APP_ENV === 'production'
    }
}));

// routes
app.use('/api', exampleRoutes);
app.use('/user', userRoutes);
app.use('/authentication', authenticationRoutes);

// error handler
app.use(errorMiddleware);

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToDatabase();
});
