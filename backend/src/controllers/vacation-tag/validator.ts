import Joi from "joi";

export const tagVacationValidator = Joi.object({
    vacationId: Joi.string().uuid().required()
});

export const untagValidator = Joi.object({
    vacationId: Joi.string().uuid().required()
});