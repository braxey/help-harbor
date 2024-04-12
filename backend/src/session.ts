import RedisStore from 'connect-redis';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from 'redis';
import { env } from './helpers';

declare module "express-session" {
    interface SessionData {
        email: string;
        isLoggedIn: boolean;
    }
}

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

export function createSession() {
    return session({
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
    })
}
