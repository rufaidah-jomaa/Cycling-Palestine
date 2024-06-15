import Joi from "joi";
import { generalValidation } from "../../middleware/validation.middleware.js";

export const addToCartSchema = Joi.object({
    productId:generalValidation.id
})
export const removeItemSchema = Joi.object({
    productId:generalValidation.id
})
export const updateQuantitySchema = Joi.object({
    productId:generalValidation.id,
    quantity:Joi.number().required(),
    operatorQ:Joi.string().valid('+','-').required()
})