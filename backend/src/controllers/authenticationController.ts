import { Request, Response } from 'express';
import { validationResult } from 'express-validator'
import { hashPassword, comparePasswords, generateJwtToken } from '../services/authService';
import { User, UserInterface } from '../models/user';

const authenticationController = {
    register: async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let data = {
                username: req.body.data.username,
                email: req.body.data.email,
                password: await hashPassword(req.body.data.password),
            };

            // see if the email is already in use
            let user: UserInterface | null = await User.findOne({ email: data.email });
            if (user) {
                return res.status(409).json({ errors: 'email already in use' });
            }

            const newUser = new User(data);
            await newUser.save();

            return res.status(200).json({ message: 'success' });
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

            const creds = {
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
            req.session.email = user.email;

            return res.status(200).json({ token: generateJwtToken(user.email) });
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
