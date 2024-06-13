import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const addSchema = Joi.object({
    title:Joi.string().required(),
   content:Joi.string().required() ,
   date:Joi.date().required(),
  video:Joi.array().items(generalValidation.video),
  images:Joi.array().items(generalValidation.image)
})

export const updateNewsSchema = Joi.object({
    id:generalValidation.id,
    content:Joi.string() ,
    date:Joi.date(),
    video:generalValidation.video
})

export const deleteNewsSchema = Joi.object({
    id:generalValidation.id
})