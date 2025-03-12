import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// Define the UserPayload type
export interface UserPayload {
    id: string;
    role: string;
}

// Extend Request to create UserRequest
export interface UserRequest<
    P = ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user?: UserPayload;
}

// No need to use global declaration anymore since we're exporting UserRequest

export function authenticate(req: UserRequest, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Access denied. No token provided");
        }

        try {
            const decoded = jwt.verify(token, config.get<string>("app.jwtSecret")) as UserPayload;
            req.user = decoded;
            next();
        } catch (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
        }
    } catch (e) {
        next(e);
    }
}

export function authorizeAdmin(req: UserRequest, res: Response, next: NextFunction) {
    try {
        if (!req.user) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Not authenticated");
        }

        if (req.user.role !== 'admin') {
            throw new AppError(StatusCodes.FORBIDDEN, "Access denied. Admin role required");
        }

        next();
    } catch (e) {
        next(e);
    }
}