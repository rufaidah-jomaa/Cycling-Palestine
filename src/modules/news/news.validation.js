import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const addSchema = Joi.object({
    title:Joi.string().required(),
   content:Joi.string().required() ,
   date:Joi.date().required()
})

export const updateNewsSchema = Joi.object({
    id:generalValidation.id,
    content:Joi.string().required() 
})

export const deleteNewsSchema = Joi.object({
    id:generalValidation.id
})