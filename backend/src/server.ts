require('dotenv').config();
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Create an Express application
const app = express();

// Middleware
app.use(cors(), bodyParser.json());

// Example route
app.get('/api/example', (req: Request, res: Response) => {
    res.json({'data': 'goodbye world'});
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
