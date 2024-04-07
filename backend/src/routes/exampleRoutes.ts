// exampleRoutes.ts
import express from 'express';
import exampleController from '../controllers/exampleController';

const router = express.Router();

// Define route using the controller method
router.get('/example', exampleController.getExampleData);

export default router;
