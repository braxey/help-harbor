import { Request, Response } from 'express';
import User from '../models/user';
import router from '../routes/exampleRoutes';

const userController = {
    create: async (req: Request, res: Response) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).json(newUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default userController;
