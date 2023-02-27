import { body, param, query } from "express-validator";

export const startGameSchema = [
    body('userId').isFloat({ min: 1 })
];

export const gameAttemptSchema = [
    body('word').isLength({ min: 5, max: 5 }).toUpperCase().withMessage("Must send a word with a size of 5 letters")
];

export const gameSummaryByUserIdSchema = [
    query('userId').isFloat({ min: 1 })
];

export const gameSummaryTop = [
    param('topNumber').isFloat({ min: 1, max: 20 })
];