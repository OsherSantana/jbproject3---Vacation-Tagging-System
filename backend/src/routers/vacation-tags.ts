import { Router } from "express";
import {
    tagVacation,
    getUserTaggedVacations,
    untagVacation
} from "../controllers/vacation-tag/controller";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/params-validation";
import {
    tagVacationValidator,
    untagValidator
} from "../controllers/vacation-tag/validator";
import { authenticate } from "../middlewares/auth";

const vacationTagRouter = Router();

// All routes require authentication
vacationTagRouter.post('/', authenticate, validation(tagVacationValidator), tagVacation);
vacationTagRouter.delete('/:vacationId', authenticate, paramsValidation(untagValidator), untagVacation);
vacationTagRouter.get('/user', authenticate, getUserTaggedVacations);

export default vacationTagRouter;