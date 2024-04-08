import { Request, Response, NextFunction } from 'express';

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isLoggedIn) {
        return next();
    }

    return res.status(401).json({ 'error': 'Unauthorized' });
};

export default sessionMiddleware;