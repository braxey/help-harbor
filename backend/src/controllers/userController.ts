import { Request, Response } from 'express';
import { hashPassword } from '../services/authService';
import User from '../models/user';

const userController = {
    create: async (req: Request, res: Response) => {
        try {
            try {
                req.body.password = hashPassword(req.body.password);
            } catch (error) {
                console.error(error);
            }
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).json(newUser);
        } catch (error: any) {
            console.error('ERROR CREATING USER:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default userController;
