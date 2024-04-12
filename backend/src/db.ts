import mongoose from 'mongoose';
import { env } from './helpers';

const uri = env('MONGO_URI', 'mongodb://mongodb:27017/help_harbor');

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export { connectToDatabase };
