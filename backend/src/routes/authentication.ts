import express from 'express';
import { body } from 'express-validator'
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import authenticationController from '../controllers/authenticationController';

const router = express.Router();

router.post('/register', [
    body('data.first_name').trim().notEmpty().withMessage('first name cannot be empty'),
    body('data.last_name').trim().notEmpty().withMessage('last name cannot be empty'),
    body('data.username').trim().notEmpty().withMessage('username cannot be empty'),
    body('data.email').isEmail().normalizeEmail({ all_lowercase: true }).withMessage('invalid email'),
    body('data.password').trim().isLength({ min: 8 }).withMessage('password must be at least 8 chars'),
], authenticationController.register);

router.post('/login', [
    body('data.email').isEmail().normalizeEmail({ all_lowercase: true }).withMessage('invalid email'),
    body('data.password').trim().isLength({ min: 8 }).withMessage('invalid password'),
], authenticationController.login);

router.get('/logout', authenticationMiddleware, authenticationController.logout);

export default router;