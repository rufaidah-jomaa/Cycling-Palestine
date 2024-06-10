import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const participateSchema = Joi.object({
    t_id:generalValidation.id
})

export const cancelSchema = Joi.object({
    t_id:generalValidation.id
})