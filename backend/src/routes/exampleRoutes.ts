// exampleRoutes.ts
import express from 'express';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import exampleController from '../controllers/exampleController';

const router = express.Router();

// Define route using the controller method
router.get('/example', authenticationMiddleware, exampleController.getExampleData);

export default router;
