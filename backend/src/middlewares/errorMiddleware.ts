import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('ERROR HANDLER: ', err.stack);
    res.status(500).send('Something went wrong!');
};

export default errorMiddleware;
