import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const uploadPicSchema = Joi.object({
    image:generalValidation.image
})

export const updateProfileSchema = Joi.object({
    id:generalValidation.id,
    userName:Joi.string().pattern(/^[a-zA-Z0-9_-]{3,20}$/),
    gender:Joi.string().valid("ذكر", "أنثى"),
    birthdate:Joi.date(),
    phone:Joi.number(),
    Address:Joi.string(),
    image:generalValidation.image
})

export const deleteAccountSchema = Joi.object({
    id:generalValidation.id
})

export const blockUserSchema = Joi.object({
    id:generalValidation.id
})

export const unblockUserSchema = Joi.object({
    id:generalValidation.id
})

export const addAdminSchema = Joi.object({
    id:generalValidation.id
})

export const removeAdminSchema = Joi.object({
    id:generalValidation.id
})