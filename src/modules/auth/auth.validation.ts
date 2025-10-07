import { body } from 'express-validator';

export const registerValidationSchema = () => [
    body('username')
        .exists()
        .withMessage('Username is required')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long')
        .escape(),
    body('email')
        .exists()
        .withMessage('Email is required')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .isLowercase()
        .withMessage('Email must be lowercase')
        .escape(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .trim()
        .escape(),
];

export const loginValidationSchema = () => [
    body('email')
        .exists()
        .withMessage('Email is required')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .isLowercase()
        .withMessage('Email must be lowercase')
        .escape(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .trim()
        .escape(),
];
