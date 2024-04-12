import mongoose, { Document } from 'mongoose';

interface UserInterface extends Document {
    username: string;
    email: string;
    password: string,
}

const userSchema = new mongoose.Schema<UserInterface>({
    username: String,
    email: String,
    password: String,
})

const User = mongoose.model<UserInterface>('user', userSchema);

export { User, UserInterface };
