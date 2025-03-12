import Joi from "joi";

export const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});