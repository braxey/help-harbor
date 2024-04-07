import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/create', userController.create);

export default router;