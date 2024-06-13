import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const getDetailesSchema = Joi.object({
    id:generalValidation.id
})

export const createPostSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    
    mainImage:Joi.array().items({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg','image/svg+xml').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(1000000).required(),
       }).required(),
    
    images:Joi.array().items(
        generalValidation.image
     ).max(20), 
})

export const updatePostSchema = Joi.object({
    id : generalValidation.id,
    title:Joi.string(),
    description:Joi.string(),
    mainImage:Joi.array().items({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg','image/svg+xml').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(1000000).required(),}),
    images:Joi.array().items(
        generalValidation.image
     ).max(20), 
})

export const likePostSchema = Joi.object({
    id:generalValidation.id
})

export const createCommentSchema = Joi.object({
    id:generalValidation.id,
    text:Joi.string(),
    image:generalValidation.image
})

export const deleteCommentSchema = Joi.object({
    id:generalValidation.id
})
export const deletePostSchema = Joi.object({
    id:generalValidation.id
})