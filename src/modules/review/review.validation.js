import Joi from 'joi'
import { generalValidation } from '../../middleware/validation.middleware.js'

export const createReviewSchema = Joi.object({
    productId:generalValidation.id,
    comment: Joi.string(),
    rating:Joi.number().max(5)
})

export const updateReviewSchema = Joi.object({
    reviewId:generalValidation.id,
    productId:generalValidation.id,
    comment: Joi.string(),
    rating:Joi.number().max(5)
})

export const deleteReviewSchema = Joi.object({
    reviewId:generalValidation.id,
    productId:generalValidation.id,
})