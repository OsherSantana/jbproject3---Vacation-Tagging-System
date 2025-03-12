import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";

export default function validation(validator: ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        console.log('Request body before validation:', req.body);
        try {
            req.body = await validator.validateAsync(req.body);
            console.log('Request body after validation:', req.body);
            next();
        } catch (e: any) {
            console.log('Validation error:', e.message);
            next(new AppError(StatusCodes.UNPROCESSABLE_ENTITY, e.message));
        }
    }
}