import mongoose from 'mongoose';

interface UserInterface extends Document {
    username: string;
    email: string;
    password: String,
}

const userSchema = new mongoose.Schema<UserInterface>({
    username: String,
    email: String,
    password: String,
})

const User = mongoose.model<UserInterface>('user', userSchema);

export default User;