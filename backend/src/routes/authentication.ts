import express from 'express';
import { body } from 'express-validator'
import authenticationController from '../controllers/authenticationController';

const router = express.Router();

router.post('/register', [
    body('data.username').trim().notEmpty().withMessage('username cannot be empty'),
    body('data.email').isEmail().normalizeEmail({ all_lowercase: true }).withMessage('invalid email'),
    body('data.password').trim().isLength({ min: 8 }).withMessage('password must be at least 8 chars'),
], authenticationController.register);

router.post('/login', [
    body('data.email').isEmail().normalizeEmail({ all_lowercase: true }).withMessage('invalid email'),
    body('data.password').trim().isLength({ min: 8 }).withMessage('invalid password'),
], authenticationController.login);

router.get('/logout', authenticationController.logout);

export default router;