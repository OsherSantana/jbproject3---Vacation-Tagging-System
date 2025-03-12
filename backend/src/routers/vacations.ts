import { Router } from "express";
import {
    createVacation,
    deleteVacation,
    getAllVacations,
    getTaggingStats,
    getVacation,
    updateVacation
} from "../controllers/vacation/controller";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/params-validation";
import {
    newVacationValidator,
    updateVacationValidator,
    vacationIdValidator
} from "../controllers/vacation/validator";
import { authenticate, authorizeAdmin } from "../middlewares/auth";
import { uploadVacationImage } from "../middlewares/upload";

const vacationRouter = Router();

// Public routes (no auth required)
vacationRouter.get('/', getAllVacations);
vacationRouter.get('/:vacationId', paramsValidation(vacationIdValidator), getVacation);

// Admin only routes
vacationRouter.post('/',
    authenticate,
    authorizeAdmin,
    uploadVacationImage,
    validation(newVacationValidator),
    createVacation
);

vacationRouter.put('/:vacationId',
    authenticate,
    authorizeAdmin,
    paramsValidation(vacationIdValidator),
    uploadVacationImage,
    validation(updateVacationValidator),
    updateVacation
);

vacationRouter.delete('/:vacationId',
    authenticate,
    authorizeAdmin,
    paramsValidation(vacationIdValidator),
    deleteVacation
);

// Reports
vacationRouter.get('/reports/tags',
    authenticate,
    authorizeAdmin,
    getTaggingStats
);

export default vacationRouter;