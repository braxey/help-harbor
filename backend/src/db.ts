import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export { connectToDatabase };
