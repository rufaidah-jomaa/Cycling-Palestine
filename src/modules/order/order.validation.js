import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const createOrderSchema = Joi.object({
   // couponCode:,
   address:Joi.string(),
   phone:Joi.string()
})

export const changeStatusSchema = Joi.object({
    orderId:generalValidation.id,
    status:Joi.string().valid('pending','cancelled','confirmed','onway','delivered').required()
})