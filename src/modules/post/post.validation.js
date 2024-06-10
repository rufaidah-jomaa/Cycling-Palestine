import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const getDetailesSchema = Joi.object({
    id:generalValidation.id
})

export const createPostSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    mainImage:generalValidation.image,
    images:generalValidation.image //يمكن مش صح 
})

export const updatePostSchema = Joi.object({
    id : generalValidation.id,
    title:Joi.string(),
    description:Joi.string(),
    mainImage:generalValidation.image,
    images:generalValidation.image //يمكن مش صح 
})

export const likePostSchema = Joi.object({
    id:generalValidation.id
})

export const createCommentSchema = Joi.object({
    id:generalValidation.id,
    text:Joi.string().required(),
    image:generalValidation.image
})

export const deleteCommentSchema = Joi.object({
    id:generalValidation.id
})
export const deletePostSchema = Joi.object({
    id:generalValidation.id
})