// dependencies
import dotenv from 'dotenv';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import bodyParser from 'body-parser';
import cors from 'cors';
import { env } from './helpers';
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

const corsOptions = {
    origin: env('FRONTEND_URL', 'http://localhost:3000'),
    credentials: true, // allow cookies to be sent with requests
};
  
app.use(cors(corsOptions));
app.use(bodyParser.json());

// session setup
let redisClient = createClient({
    socket: {
        host: env('REDIS_HOST', 'redis'),
        port: env('REDIS_PORT', 6379)
    }
});
redisClient.connect();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
  
redisClient.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "help-harbor:",
});

app.use(session({
    store: redisStore,
    secret: env('SESSION_SECRET', 'secret'),
    genid: (request) => uuidv4(),
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: env('SESSION_MAX_AGE', 60000),
        secure: env('APP_ENV', 'local') === 'production'
    }
}));

// routes
app.use('/api', exampleRoutes);
app.use('/user', userRoutes);
app.use('/authentication', authenticationRoutes);

// error handler
app.use(errorMiddleware);

const port = env('APP_PORT', 5000);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToDatabase();
});
