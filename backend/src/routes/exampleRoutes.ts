// exampleRoutes.ts
import express from 'express';
import sessionMiddleware from '../middlewares/sessionMiddleware';
import exampleController from '../controllers/exampleController';

const router = express.Router();

// Define route using the controller method
router.get('/example', sessionMiddleware, exampleController.getExampleData);

export default router;
