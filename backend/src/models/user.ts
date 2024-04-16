import mongoose, { Document } from 'mongoose';

interface UserInterface extends Document {
    uuid: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string,
}

const userSchema = new mongoose.Schema<UserInterface>({
    uuid: String,
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String,
})

const User = mongoose.model<UserInterface>('user', userSchema);

export { User, UserInterface };
