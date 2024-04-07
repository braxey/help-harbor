// exampleController.ts
import { Request, Response } from 'express';

const exampleController = {
    getExampleData: (req: Request, res: Response) => {
        return res.json({ data: 'This is example data' });
    }
};

export default exampleController;
