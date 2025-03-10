import { NextFunction, Request, Response } from "express";
import Genre from "../../models/vacation-tag";
import Book from "../../models/user";

export async function getAllGenres(req: Request, res: Response, next: NextFunction) {
    try {
        const genres = await Genre.findAll({
            include: [Book]
        })
        res.json(genres)
    } catch (e) {
        next(e)
    }
}