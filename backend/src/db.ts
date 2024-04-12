import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { env } from './helpers';

let uri = env('MONGO_URI', 'mongodb://mongodb:27017/help_harbor');

export async function connectToDatabase() {
    let mongod = null;
    if (process.env.NODE_ENV === 'test') {
        mongod = await MongoMemoryServer.create();
        uri = mongod.getUri();
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export async function disconnectFromDatabase() {
    await mongoose.disconnect();
}
