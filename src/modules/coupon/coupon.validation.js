import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const createCouponSchema = Joi.object({
     code:Joi.string().min(3).required(),
     discountPercentage:Joi.number().integer().min(1).max(50),
     expiredDate:Joi.date().greater('now')
})

export const updateCouponSchema = Joi.object({
     id:generalValidation.id,
     code:Joi.string().min(3),
     discountPercentage:Joi.number().integer().min(1).max(50),
     expiredDate:Joi.date().greater('now')
})

export const deleteCouponSchema = Joi.object({
     id:generalValidation.id
})