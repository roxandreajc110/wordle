import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CustomResponse } from '../customResponse';

export const validateRequest = (schemas: any) => {
    return async (req: Request, res: Response, next: () => any) => {
        await Promise.all(schemas.map((schema: any) => schema.run(req)));
        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }
        const errors = result.array();
        return res.send( new CustomResponse('Validation error', { errors: errors }));
    };
}