import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());

// Example route
app.get('/api/example', (req: Request, res: Response) => {
    res.send('This is an example route');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
