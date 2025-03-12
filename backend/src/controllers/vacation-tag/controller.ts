import { NextFunction, Response } from "express";
import VacationTag from "../../models/vacation-tag";
import Vacation from "../../models/vacation";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import { UserRequest } from "../../middlewares/auth"; // Import the extended request type

export async function tagVacation(req: UserRequest<{}, {}, {
    vacationId: string
}>, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
        }

        const { vacationId } = req.body;

        // Check if vacation exists
        const vacation = await Vacation.findByPk(vacationId);
        if (!vacation) {
            throw new AppError(StatusCodes.NOT_FOUND, "Vacation not found");
        }

        // Check if already tagged
        const existingTag = await VacationTag.findOne({
            where: {
                userId,
                vacationId
            }
        });

        if (existingTag) {
            throw new AppError(StatusCodes.CONFLICT, "You have already tagged this vacation");
        }

        // Create new tag record
        await VacationTag.create({
            userId,
            vacationId
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Vacation tagged successfully"
        });
    } catch (e) {
        next(e);
    }
}

export async function untagVacation(req: UserRequest<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
        }

        const { vacationId } = req.params;

        // Check if vacation exists
        const vacation = await Vacation.findByPk(vacationId);
        if (!vacation) {
            throw new AppError(StatusCodes.NOT_FOUND, "Vacation not found");
        }

        // Find and delete the tag record
        const deleted = await VacationTag.destroy({
            where: {
                userId,
                vacationId
            }
        });

        if (deleted === 0) {
            throw new AppError(StatusCodes.NOT_FOUND, "You have not tagged this vacation");
        }

        res.json({
            success: true,
            message: "Vacation untagged successfully"
        });
    } catch (e) {
        next(e);
    }
}

export async function getUserTaggedVacations(req: UserRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
        }

        const taggedVacations = await Vacation.findAll({
            include: [{
                model: VacationTag,
                where: { userId },
                required: true
            }]
        });

        // Transform response to add isTagged flag
        const transformedVacations = taggedVacations.map(vacation => {
            const vacationData = vacation.toJSON();
            return {
                ...vacationData,
                isTagged: true,
                vacationTags: undefined // Remove vacationTags array from response
            };
        });

        res.json(transformedVacations);
    } catch (e) {
        next(e);
    }
}