import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const createCategorySchema = Joi.object({
    name:Joi.string().min(3).max(20).required(), //اي اشي مبعوث غير الموجود بالسكيما حيرفضه و يعطي عليه "not allowed"
    image:generalValidation.image.required()
})
export const getDetailsSchema= Joi.object({
    id:generalValidation.id
})
export const updateCategorySchema= Joi.object({
    id:generalValidation.id,
    name:Joi.string().min(3).max(20).required(),
    status:Joi.string().valid('Active','notActive'),
    image:generalValidation.image
})
export const deleteCategorySchema = Joi.object({
    id:generalValidation.id
})