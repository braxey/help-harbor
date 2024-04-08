import { Request, Response } from 'express';
import { validationResult } from 'express-validator'
import { hashPassword, comparePasswords } from '../services/authService';
import Credentials from '../types/Credentials';
import User from '../models/user';

const authenticationController = {
    register: async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            req.body.data.password = await hashPassword(req.body.data.password);

            let data = req.body.data;
            let validPayload: boolean = (
                typeof data === 'object' &&
                Object.keys(data).length === 3 &&
                'username' in data &&
                'email' in data &&
                'password' in data &&
                typeof data.username === 'string' &&
                typeof data.email === 'string' &&
                typeof data.password === 'string'
            );

            if (validPayload) {
                const newUser = new User(data);
                await newUser.save();

                return res.status(200).json({ message: 'success' });
            }

            console.log('registration payload not consistent with userinterface');
            return res.status(400).json({ errors: 'bad request' });
            
        } catch (error: any) {
            console.error('ERROR CREATING USER:', error);
            res.status(500).json({ errors: 'Internal server error' });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const creds: Credentials = {
                email: req.body.data.email,
                password: req.body.data.password
            };

            const user = await User.findOne({ 'email': creds.email });
            if (!user) {
                return res.status(404).json({ errors: 'user not found' });
            }

            if (!(await comparePasswords(creds.password, user.password.toString()))) {
                return res.status(401).json({ errors: 'invalid password' });
            }

            req.session.isLoggedIn = true;
            req.session.user = user;

            return res.status(200).json({ message: 'success' });
        } catch (error: any) {
            console.error('Error during login:', error)
            res.status(500).json({ errors: 'Internal server error'});
        }
    },

    logout: async (req: Request, res: Response) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    throw new err;
                }

                res.status(200).json({ message: 'success' });
            })
        } catch (error: any) {
            console.error('Error during logout:', error)
            res.status(500).json({ errors: 'Internal server error'});
        }
    }
}

export default authenticationController;