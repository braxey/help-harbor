import { Request, Response, NextFunction } from 'express';
import { verifyJwtToken } from '../services/authService';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // first see if the user is logged in
    if (req.session && req.session.isLoggedIn && req.session.email) {
        // then see if a vaild jwt token was provided
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (typeof token === 'string' && verifyJwtToken(req.session.email, token)) {
            if (process.env.NODE_ENV === 'test' && req.body.dryRun === true) {
                return res.status(201).json({ message: 'passes authenticationMiddleware' });
            }

            return next();
        }
    }

    return res.status(401).json({ errors: 'Unauthorized' });
};

export default authenticationMiddleware;
