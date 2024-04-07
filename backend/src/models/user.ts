import mongoose, { Document } from 'mongoose';

interface UserInterface extends Document {
    username: string;
    email: string;
    age: number;
}

const userSchema = new mongoose.Schema<UserInterface>({
    username: String,
    email: String,
    age: Number,
})

const User = mongoose.model<UserInterface>('user', userSchema);

export default User;