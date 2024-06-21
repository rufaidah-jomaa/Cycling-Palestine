import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const createProductSchema = Joi.object({
    name:Joi.string().min(3).required(),
    description:Joi.string().required(),
    stock:Joi.number().min(0).default(1),
    price:Joi.number().min(1).required(),
    discount:Joi.number().min(0).default(0),
    mainImage:Joi.array().items({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg','image/svg+xml').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(1000000).required(),//1MB
    }).required(),

    subImages:Joi.array().items(
      generalValidation.image
   ).max(4),
   categoryId:generalValidation.id
})

export const getDetailsSchema = Joi.object({
    id:generalValidation.id
})

export const getallStatus = Joi.object({
    id:generalValidation.id
})

export const updateProductSchema=Joi.object({
    id:generalValidation.id,
    status:Joi.string().valid('Active','notActive'),
    name:Joi.string().min(3),
    description:Joi.string(),
    stock:Joi.number().min(0).default(1),
    price:Joi.number().min(1),
    discount:Joi.number().min(0).default(0),
    mainImage:Joi.array().items({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg','image/svg+xml').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(5000000).required(),//5MB
    }),

    subImages:Joi.array().items(
      generalValidation.image
   ).max(4),
})

export const changeStatusSchema= Joi.object({
    id:generalValidation.id,
    status:Joi.string().valid('Active','notActive').required()
})

export const deleteProductSchema = Joi.object({
    id:generalValidation.id
})